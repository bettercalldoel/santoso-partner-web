'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_EVENT, AuthUser, clearStoredUser, getStoredUser } from '@/lib/auth';

export default function AuthFloatingButton() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      const stored = getStoredUser();
      setUser(stored);
      setIsReady(true);
    };

    updateAuth();
    window.addEventListener(AUTH_EVENT, updateAuth);
    return () => {
      window.removeEventListener(AUTH_EVENT, updateAuth);
    };
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    setUser(null);
    router.refresh();
    router.push('/');
  };

  if (!isReady) {
    return null;
  }

  if (!user?.token) {
    return (
      <Link
        href="/login"
        className="fixed bottom-6 right-6 z-50 bg-[#0f3d3e] text-[#f5f1e8] px-5 py-3 rounded-full shadow-lg hover:bg-[#145254] transition"
      >
        Login
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="fixed bottom-6 right-6 z-50 bg-[#f5f1e8] text-[#0f3d3e] px-5 py-3 rounded-full shadow-lg border border-[#e6ddcf] hover:bg-white transition"
    >
      Logout
    </button>
  );
}
