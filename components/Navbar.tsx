// components/Navbar.tsx
import Link from 'next/link';
import { JSX } from 'react';

export default function Navbar(): JSX.Element {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl text-gray-800">
          Santoso & Partner
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About Us
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-blue-600">
            Service
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600">
            Blog
          </Link>
        </div>
        <Link
          href="/login"
          className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}