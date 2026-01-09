'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUser, clearStoredUser, getStoredUser } from '@/lib/auth';

export default function CreateBlogPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) {
      router.replace('/login');
      return;
    }
    setUser(stored);
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      return;
    }

    if (!title.trim() || !content.trim()) {
      setMessage('Judul dan konten wajib diisi.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setMessageType('');

    try {
      const parsedTags = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      const authorName = user.name || user.email.split('@')[0] || 'User';
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-token': user.token,
        },
        body: JSON.stringify({
          title: title.trim(),
          summary: summary.trim() || undefined,
          author: authorName,
          content: content.trim(),
          tags: parsedTags.length ? parsedTags : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan artikel.');
      }

      setMessage('Artikel berhasil dipublikasikan.');
      setMessageType('success');
      router.push('/blog');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Terjadi kesalahan. Coba lagi.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearStoredUser();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-gray-600">Memeriksa akun Anda...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f1e8]">
      <section className="bg-[#0f3d3e] text-[#f5f1e8] py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[#f5f1e8]/70 mb-4">
                Create Blog
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Tulis Artikel Profesional
              </h1>
              <p className="text-[#f5f1e8]/80">
                Gunakan format Markdown untuk menjaga konsistensi gaya dan struktur konten.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#f5f1e8]/80">
              <span>
                Login sebagai <strong>{user.name || user.email}</strong>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm text-[#f5f1e8] hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="title">
                Judul Artikel
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Strategi Pajak untuk Startup"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="summary">
                Ringkasan (opsional)
              </label>
              <textarea
                id="summary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Ringkasan singkat untuk daftar blog."
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="content">
                Konten (Markdown)
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                rows={12}
                placeholder="# Judul Besar\n\nTulis konten Anda di sini..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="tags">
                Tags (pisahkan dengan koma)
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="pajak, umkm, konsultasi"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Publikasikan Artikel'}
            </button>

            {message && (
              <p
                className={`text-sm text-center ${
                  messageType === 'error' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <aside className="bg-white/70 rounded-2xl p-6 border border-white/60 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Panduan Format
            </h2>
            <ul className="text-sm text-gray-600 space-y-3">
              <li>
                Gunakan `#` untuk judul utama dan `##` untuk subjudul.
              </li>
              <li>
                Pisahkan paragraf dengan satu baris kosong.
              </li>
              <li>
                Tambahkan `**tebal**` atau `*miring*` untuk penekanan.
              </li>
              <li>
                Pastikan ringkasan singkat agar mudah terbaca di daftar blog.
              </li>
            </ul>
            <div className="mt-6 text-sm text-gray-500">
              Konten akan langsung muncul di halaman Blog setelah dipublikasikan.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
