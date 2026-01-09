// app/blog/page.tsx
import Link from 'next/link';
import { fetchBlogPosts } from '@/lib/backendless';
import { formatDate } from '@/lib/date';
import { stripMarkdown } from '@/lib/markdown';
import AuthCta from '@/components/AuthCta';

export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();
  return (
    <div className="bg-[#f5f1e8]">
      <section className="bg-[#0f3d3e] text-[#f5f1e8] py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[#f5f1e8]/70 mb-4">
                Insights & Perspektif
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Wawasan Pajak Terbaru
              </h1>
              <p className="text-[#f5f1e8]/80">
                Kumpulan artikel dari konsultan kami untuk membantu Anda membuat keputusan bisnis
                yang lebih cerdas dan patuh.
              </p>
            </div>
            <AuthCta
              authedHref="/blog/create"
              authedText="Tulis Artikel Baru"
              guestHref="/login"
              guestText="Login untuk Menulis"
              className="inline-flex items-center justify-center bg-[#f5f1e8] text-[#0f3d3e] px-5 py-3 rounded-full font-semibold hover:bg-white transition"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl shadow p-8 text-center">
                <p className="text-gray-600">
                  Belum ada artikel. Mulai dengan menulis artikel pertama Anda.
                </p>
              </div>
            ) : (
              blogPosts.map((post) => (
                <div
                  key={post.objectId}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition hover:-translate-y-1"
                >
                  <div className="h-2 bg-gradient-to-r from-[#0f3d3e] via-[#1f6a6b] to-[#dbe9f4]" />
                  <div className="p-6 grow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                      {post.author} | {formatDate(post.publishDate)}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {post.summary ||
                        stripMarkdown(post.content || '').slice(0, 160) +
                          '...'}
                    </p>
                    {post.tags?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs uppercase tracking-wide bg-[#f5f1e8] text-[#0f3d3e] px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#0f3d3e] font-semibold hover:underline"
                    >
                      Baca Selengkapnya &rarr;
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
