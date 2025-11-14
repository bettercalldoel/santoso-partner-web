// app/blog/[slug]/page.tsx

import Link from "next/link";

// Definisikan Tipe data lengkap untuk postingan blog
interface IBlogPost {
  slug: string;
  title: string;
  author: string;
  publishDate: string;
  body: string; // Konten penuh
}

// Data Dummy Postingan Lengkap
const dummyPosts: IBlogPost[] = [
  {
    slug: '5-kesalahan-wajib-pajak',
    title: '5 Kesalahan Umum Wajib Pajak Perorangan yang Harus Dihindari',
    author: 'Santoso Utama',
    publishDate: '10 November 2025',
    body: `
      <p class="text-lg mb-4">Sebagai wajib pajak perorangan, memahami kewajiban dan menghindari kesalahan umum adalah kunci kepatuhan. Berikut adalah 5 kesalahan yang sering terjadi:</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. Gagal Melaporkan Seluruh Penghasilan</h3>
      <p class="mb-4">Banyak yang lupa melaporkan penghasilan sampingan atau penghasilan dari luar negeri. Pastikan semua sumber penghasilan tercatat.</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. Tidak Memiliki Bukti Potong yang Lengkap</h3>
      <p class="mb-4">Bukti potong (seperti Form 1721-A1 atau Form 1721-A2) adalah dokumen krusial. Simpan dan pastikan Anda mendapatkan semua bukti dari pemberi kerja.</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. Salah Menggunakan Tarif PPh</h3>
      <p class="mb-4">Tarif Pajak Penghasilan bersifat progresif. Kesalahan dalam penerapan lapisan tarif dapat menyebabkan kekurangan bayar.</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. Terlambat Melaporkan SPT</h3>
      <p class="mb-4">Batas waktu pelaporan SPT Tahunan Pribadi adalah 31 Maret. Keterlambatan akan dikenakan sanksi denda administratif.</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. Salah Memasukkan Status Keluarga</h3>
      <p class="mb-4">Kesalahan dalam memasukkan status (TK/K/KI) dan jumlah tanggungan PPh (PTKP) dapat memengaruhi besaran pajak Anda.</p>
      <p class="text-lg mt-6 italic border-t pt-4">Konsultasikan dengan tim kami jika Anda ragu mengenai pelaporan SPT Anda.</p>
    `,
  },
  {
    slug: 'insentif-pajak-umkm-2026',
    title: 'Memahami Insentif Pajak Terbaru untuk UMKM di Tahun 2026',
    author: 'Elisa Putri',
    publishDate: '5 November 2025',
    body: `
      <p class="text-lg mb-4">Pemerintah terus mendukung UMKM melalui berbagai kebijakan pajak. Pada tahun 2026, terdapat beberapa insentif kunci yang perlu Anda ketahui.</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Insentif PPh Final 0.5%</h3>
      <p class="mb-4">Pengusaha yang memiliki omzet bruto sampai dengan Rp 4,8 Miliar dalam satu tahun pajak dapat memilih skema PPh Final 0,5% dari omzet. Ini sangat menyederhanakan kewajiban pajak bulanan.</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Batas Waktu Pemanfaatan</h3>
      <p class="mb-4">Penting untuk mengetahui kapan batas waktu insentif ini berakhir agar Anda dapat merencanakan keuangan jangka panjang.</p>
    `,
  },
  // Data dummy untuk post 'perbedaan-pph-21-dan-23' perlu ditambahkan jika diakses
  {
    slug: 'perbedaan-pph-21-dan-23',
    title: 'Perbedaan PPh 21 dan PPh 23: Panduan Lengkap',
    author: 'Bambang Irawan',
    publishDate: '1 November 2025',
    body: `
      <p class="text-lg mb-4">Memahami perbedaan PPh Pasal 21 dan PPh Pasal 23 sangat penting dalam kepatuhan pajak perusahaan.</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">PPh Pasal 21 (Pajak Penghasilan Pasal 21)</h3>
      <p class="mb-4">PPh 21 adalah pajak yang dikenakan atas penghasilan berupa gaji, upah, honorarium, tunjangan, dan pembayaran lain dengan nama dan dalam bentuk apapun sehubungan dengan **pekerjaan atau jasa pribadi** yang dilakukan oleh Wajib Pajak **Orang Pribadi** dalam negeri.</p>
      <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">PPh Pasal 23 (Pajak Penghasilan Pasal 23)</h3>
      <p class="mb-4">PPh 23 adalah pajak yang dipotong atas penghasilan yang dibayarkan kepada **Wajib Pajak Dalam Negeri atau Bentuk Usaha Tetap** yang berasal dari modal (sewa, bunga, dividen, royalti), penyerahan jasa, atau penyelenggaraan kegiatan selain yang telah dipotong PPh Pasal 21.</p>
      <p class="text-lg mt-6 font-bold text-red-600">Intinya: PPh 21 untuk individu/karyawan, PPh 23 untuk Badan/perusahaan yang menerima jasa.</p>
    `,
  },
];

// Definisikan Tipe Props untuk Halaman Dinamis
interface BlogPostPageProps {
  params: {
    slug: string; // Harus sesuai dengan nama folder [slug]
  };
}

// Fungsi untuk mengambil data postingan berdasarkan slug
function getPostBySlug(slug: string): IBlogPost | undefined {
  return dummyPosts.find((post) => post.slug === slug);
}


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20 text-center min-h-[50vh]">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Postingan Tidak Ditemukan</h1>
        <p className="text-gray-600">Postingan dengan URL "{params.slug}" tidak ada atau telah dihapus.</p>
        <Link href="/blog" className="text-blue-600 mt-4 inline-block hover:underline">
          &larr; Kembali ke Daftar Blog
        </Link>
      </div>
    );
  }

  // Gunakan post.title untuk Metadata Halaman (SEO)
  // Catatan: Jika ingin menggunakan fungsi generateMetadata(), Anda harus membuat fungsi terpisah.
  
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <article className="prose lg:prose-lg mx-auto">
          {/* Judul */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="text-sm text-gray-500 mb-8 border-b pb-4">
            <span>Oleh: <strong>{post.author}</strong></span> | <span>{post.publishDate}</span>
          </div>

          {/* Konten Blog */}
          {/* Dangerously set inner HTML digunakan karena konten body disimulasikan sebagai HTML */}
          <div dangerouslySetInnerHTML={{ __html: post.body }} />

          {/* Kembali ke Blog */}
          <div className="mt-12 pt-6 border-t">
            <Link href="/blog" className="text-blue-600 font-semibold hover:underline">
              &larr; Kembali ke Daftar Blog
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}