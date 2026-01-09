import { NextResponse } from 'next/server';
import { createBlogPost, fetchBlogPosts } from '@/lib/backendless';

export async function GET() {
  try {
    const posts = await fetchBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch blog posts.';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    title?: string;
    summary?: string;
    author?: string;
    content?: string;
    tags?: string[];
  };
  const userToken =
    request.headers.get('user-token') ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!userToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!body.title || !body.author || !body.content) {
    return NextResponse.json(
      { message: 'Title, author, and content are required.' },
      { status: 400 }
    );
  }

  try {
    const post = await createBlogPost(
      {
        title: body.title,
        summary: body.summary,
        author: body.author,
        content: body.content,
        tags: body.tags,
      },
      userToken
    );

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create blog post.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
