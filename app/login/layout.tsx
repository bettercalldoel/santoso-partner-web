// app/login/layout.tsx
import Link from 'next/link';

// Layout ini hanya untuk /login, tidak akan menampilkan Navbar/Footer utama
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar Sederhana Khusus Halaman Login */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="font-bold text-2xl text-gray-800">
            Santoso & Partner
          </Link>
        </div>
      </nav>
      {/* Konten (page.tsx) akan dirender di sini */}
      {children}
    </div>
  );
}