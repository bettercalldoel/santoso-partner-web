// app/blog/[slug]/page.tsx

import Link from 'next/link';
import { fetchBlogPostBySlug } from '@/lib/backendless';
import { markdownToHtml } from '@/lib/markdown';
import { formatDate } from '@/lib/date';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="bg-[#f5f1e8] py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            404 - Postingan Tidak Ditemukan
          </h1>
          <p className="text-gray-600">
            Postingan dengan URL "{slug}" tidak ada atau telah dihapus.
          </p>
          <Link href="/blog" className="text-blue-600 mt-4 inline-block hover:underline">
            &larr; Kembali ke Daftar Blog
          </Link>
        </div>
      </div>
    );
  }

  const html = markdownToHtml(post.content || '');

  return (
    <div className="bg-[#f5f1e8]">
      <section className="bg-[#0f3d3e] text-[#f5f1e8] py-12">
        <div className="container mx-auto px-6">
          <Link href="/blog" className="text-sm text-[#f5f1e8]/80 hover:underline">
            &larr; Kembali ke Daftar Blog
          </Link>
          <div className="max-w-3xl mt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5f1e8]/70 mb-4">
              Blog Santoso & Partner
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="text-sm text-[#f5f1e8]/80">
              <span>Oleh: <strong>{post.author}</strong></span> |{' '}
              <span>{formatDate(post.publishDate)}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-10 pb-16">
        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-gray-900">
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2 mb-6">
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

          <div className="blog-content text-gray-800" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="mt-12 pt-6 border-t border-gray-200">
            <Link href="/blog" className="text-blue-600 font-semibold hover:underline">
              &larr; Kembali ke Daftar Blog
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
