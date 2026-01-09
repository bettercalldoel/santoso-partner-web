export interface AuthUser {
  name: string;
  email: string;
  token: string;
  role?: 'admin' | 'editor';
}

const STORAGE_KEY = 'sp_auth_user';
export const AUTH_EVENT = 'sp-auth-change';

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function isAdminUser(user: AuthUser | null): boolean {
  if (!user) {
    return false;
  }
  return user.role === 'admin' || user.email.endsWith('@santoso.co.id');
}
