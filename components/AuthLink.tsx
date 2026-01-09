'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AUTH_EVENT, getStoredUser } from '@/lib/auth';

interface AuthLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function AuthLink({ href, className, children }: AuthLinkProps) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      const user = getStoredUser();
      setIsAuthed(Boolean(user?.token));
      setIsReady(true);
    };

    updateAuth();
    window.addEventListener(AUTH_EVENT, updateAuth);
    return () => {
      window.removeEventListener(AUTH_EVENT, updateAuth);
    };
  }, []);

  if (!isReady || !isAuthed) {
    return null;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
