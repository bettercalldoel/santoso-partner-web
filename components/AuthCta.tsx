'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AUTH_EVENT, getStoredUser } from '@/lib/auth';

interface AuthCtaProps {
  authedText: string;
  authedHref: string;
  guestText: string;
  guestHref: string;
  className?: string;
}

export default function AuthCta({
  authedText,
  authedHref,
  guestText,
  guestHref,
  className,
}: AuthCtaProps) {
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

  if (!isReady) {
    return null;
  }

  if (isAuthed) {
    return (
      <Link href={authedHref} className={className}>
        {authedText}
      </Link>
    );
  }

  return (
    <Link href={guestHref} className={className}>
      {guestText}
    </Link>
  );
}
