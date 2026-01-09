// app/layout.tsx
import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Pastikan ini mengarah ke globals.css Anda
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthFloatingButton from '../components/AuthFloatingButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Santoso & Partner - Tax Advisory',
  description: 'Your Trusted Partner in Tax Solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${playfair.variable}`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
          <AuthFloatingButton />
        </div>
      </body>
    </html>
  );
}
