import { slugify } from './slug';
import { stripMarkdown } from './markdown';

export interface BackendlessUser {
  objectId: string;
  email: string;
  name?: string;
  userStatus?: string;
  userToken: string;
}

export interface BlogPostRecord {
  objectId: string;
  title: string;
  slug: string;
  summary: string;
  author: string;
  publishDate: string;
  content: string;
  tags?: string[];
}

export interface BlogPostInput {
  title: string;
  summary?: string;
  author: string;
  content: string;
  tags?: string[];
  publishDate?: string;
}

const appId = process.env.BACKENDLESS_APP_ID;
const restKey = process.env.BACKENDLESS_REST_API_KEY;
const baseUrl = process.env.BACKENDLESS_BASE_URL || 'https://api.backendless.com';
const blogTable = process.env.BACKENDLESS_TABLE_BLOG || 'BlogPost';

function getApiBase() {
  const trimmed = baseUrl.replace(/\/$/, '');
  if (trimmed.includes('backendless.app')) {
    return `${trimmed}/api`;
  }
  return `${trimmed}/${appId}/${restKey}`;
}

function getAuthHeaders(userToken?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (baseUrl.includes('backendless.app')) {
    if (appId) {
      headers['application-id'] = appId;
    }
    if (restKey) {
      headers['api-key'] = restKey;
    }
  }
  if (userToken) {
    headers['user-token'] = userToken;
  }
  return headers;
}

function normalizeHeaders(headers?: HeadersInit) {
  if (!headers) {
    return {};
  }
  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return headers;
}

async function backendlessFetch(path: string, init?: RequestInit) {
  if (!appId || !restKey) {
    throw new Error('Backendless env vars are missing.');
  }
  const customHeaders = normalizeHeaders(init?.headers);
  const response = await fetch(`${getApiBase()}${path}`, {
    ...init,
    headers: {
      ...getAuthHeaders(),
      ...customHeaders,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Backendless request failed: ${response.status}`);
  }
  return response;
}

export async function loginUser(email: string, password: string) {
  const response = await backendlessFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify({ login: email, password }),
  });
  const data = (await response.json()) as BackendlessUser;
  const token = data.userToken || response.headers.get('user-token') || '';
  return { ...data, userToken: token };
}

export async function registerUser(name: string, email: string, password: string) {
  const response = await backendlessFetch('/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  return (await response.json()) as { objectId: string };
}

export async function fetchBlogPosts(): Promise<BlogPostRecord[]> {
  const response = await backendlessFetch(
    `/data/${blogTable}?pageSize=50&sortBy=publishDate%20desc`
  );
  return (await response.json()) as BlogPostRecord[];
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPostRecord | null> {
  const where = encodeURIComponent(`slug = '${slug}'`);
  const response = await backendlessFetch(
    `/data/${blogTable}?where=${where}&pageSize=1`
  );
  const data = (await response.json()) as BlogPostRecord[];
  return data[0] ?? null;
}

export async function createBlogPost(
  input: BlogPostInput,
  userToken: string
): Promise<BlogPostRecord> {
  const slugBase = slugify(input.title);
  const stripped = stripMarkdown(input.content);
  const summaryText =
    input.summary?.trim() ||
    stripped.slice(0, 160) + (stripped.length > 160 ? '...' : '');

  let slug = slugBase;
  let suffix = 1;
  while (await fetchBlogPostBySlug(slug)) {
    slug = `${slugBase}-${suffix}`;
    suffix += 1;
  }

  const payload: BlogPostInput & { slug: string; summary: string } = {
    title: input.title.trim(),
    author: input.author.trim(),
    content: input.content.trim(),
    tags: input.tags?.length ? input.tags : undefined,
    publishDate: input.publishDate ?? new Date().toISOString(),
    slug,
    summary: summaryText,
  };

  const response = await backendlessFetch(`/data/${blogTable}`, {
    method: 'POST',
    headers: getAuthHeaders(userToken),
    body: JSON.stringify(payload),
  });

  return (await response.json()) as BlogPostRecord;
}
