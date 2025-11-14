// app/blog/page.tsx
import Link from 'next/link';

// Definisikan tipe
interface IBlogPost {
  id: number;
  title: string;
  summary: string;
  author: string;
  publishDate: string;
  slug: string;
}

// Data Blog Dummy
const blogPosts: IBlogPost[] = [
  { id: 1, title: '5 Kesalahan Umum Wajib Pajak Perorangan', summary: 'Pastikan Anda tidak melakukan kesalahan ini saat lapor SPT...', author: 'Santoso Utama', publishDate: '10 November 2025', slug: '5-kesalahan-wajib-pajak' },
  { id: 2, title: 'Insentif Pajak Terbaru untuk UMKM 2026', summary: 'Pemerintah baru saja merilis insentif baru. Apakah bisnis Anda termasuk?', author: 'Elisa Putri', publishDate: '5 November 2025', slug: 'insentif-pajak-umkm-2026' },
  { id: 3, title: 'Perbedaan PPh 21 dan PPh 23', summary: 'Masih bingung membedakan PPh 21 dan 23? Ini penjelasannya.', author: 'Bambang Irawan', publishDate: '1 November 2025', slug: 'perbedaan-pph-21-dan-23' },
];

export default function BlogPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Wawasan Pajak Terbaru
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="p-6 grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <div className="text-sm text-gray-500 mb-3">
                  <span>Oleh: {post.author}</span> | <span>{post.publishDate}</span>
                </div>
                <p className="text-gray-600 mb-4">{post.summary}</p>
              </div>
              <div className="p-6 pt-0">
                <Link href={`/blog/${post.slug}`} className="text-blue-600 font-semibold hover:underline">
                  Baca Selengkapnya &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}