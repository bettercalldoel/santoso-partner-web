// components/Footer.tsx
import Link from 'next/link';
import { JSX } from 'react';
import AuthLink from './AuthLink';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-2xl text-white mb-4">
              Santoso & Partner
            </h3>
            <p className="text-gray-400">
              Your Trusted Partner in Tax Solutions.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Jakarta | Surabaya | Singapura
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/teams" className="hover:text-white">Teams</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li>
                <AuthLink href="/blog/create" className="hover:text-white">
                  Create Blog
                </AuthLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Medium</a>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Email: hello@santosopartner.co.id
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Santoso & Partner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
