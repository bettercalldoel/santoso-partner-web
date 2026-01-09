// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { JSX } from 'react';
import AuthLink from './AuthLink';

export default function Navbar(): JSX.Element {
  return (
    <nav className="sticky top-4 z-50">
      <div className="container mx-auto px-6">
        <div className="bg-white/90 backdrop-blur border border-white/70 shadow-lg rounded-full px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo-mark.svg" alt="Santoso & Partner" width={40} height={40} />
            <div>
              <span className="font-semibold text-lg text-gray-800 block leading-tight">
                Santoso & Partner
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Tax Advisory
              </span>
            </div>
          </Link>
          <div className="flex items-center flex-wrap gap-4 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About Us
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-blue-600">
              Services
            </Link>
            <Link href="/teams" className="text-gray-600 hover:text-blue-600">
              Teams
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600">
              Blog
            </Link>
            <AuthLink href="/blog/create" className="text-gray-600 hover:text-blue-600">
              Create Blog
            </AuthLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
