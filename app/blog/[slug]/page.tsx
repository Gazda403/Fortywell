import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogNavbar from '@/components/BlogNavbar';
import { BLOG_POSTS, BlogPost } from '@/lib/blogData';
import { Clock, ShieldCheck, ArrowLeft, Download, ChevronRight, Share2, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found — FortyWell Journal',
    };
  }

  return {
    title: `${post.title} — FortyWell Journal`,
    description: post.summary,
    alternates: {
      canonical: `https://fortywell-app.vercel.app/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://fortywell-app.vercel.app/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FortyWell',
      url: 'https://fortywell-app.vercel.app',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fortywell-app.vercel.app/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2320] flex flex-col font-sans selection:bg-[#92A975]/30">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogNavbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-12 py-10 md:py-16 flex flex-col gap-12">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-xs font-sans text-[#7E726B]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#C96374] transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-[#2A2320]/30" />
          <Link href="/blog" className="hover:text-[#C96374] transition-colors">
            Journal
          </Link>
          <ChevronRight size={13} className="text-[#2A2320]/30" />
          <span className="text-[#2A2320] font-medium truncate max-w-[240px] md:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Article Header (Centered) */}
        <header className="flex flex-col items-center text-center gap-6 border-b border-[#2A2320]/10 pb-10 max-w-3xl mx-auto w-full">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C96374] bg-[#C96374]/15 px-3.5 py-1 rounded-full border border-[#C96374]/30">
              {post.category}
            </span>
            <span className="text-xs text-[#7E726B] flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime}
            </span>
            <span className="text-xs text-[#7E726B]">·</span>
            <span className="text-xs text-[#7E726B]">{post.publishedAt}</span>
          </div>

          <h1 className="font-editorial text-3xl md:text-5xl lg:text-6xl font-light text-[#2A2320] leading-[1.12] tracking-tight text-center">
            {post.title}
          </h1>

          <p className="font-editorial text-xl md:text-2xl text-[#554A44] font-light leading-snug text-center">
            {post.subtitle}
          </p>

          {/* Author & Clinical Review Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-[#2A2320]/8 text-xs text-[#7E726B] w-full">
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-[#2A2320]">{post.author.name}</span>
              <span className="text-[11px] text-[#7E726B]">{post.author.role}</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#2A2320]/10 shadow-2xs">
              <ShieldCheck size={15} className="text-[#92A975]" />
              <span className="text-[11px] font-medium text-[#2A2320]">
                {post.medicalReviewer}
              </span>
            </div>
          </div>
        </header>

        {/* ── KEY TAKEAWAYS BOX ── */}
        <div className="bg-[#FAF2F4] border-l-4 border-[#C96374] rounded-r-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#C96374]" />
            <h3 className="font-editorial text-xl text-[#2A2320] font-medium">
              Executive Clinical Takeaways
            </h3>
          </div>
          <ul className="flex flex-col gap-2.5 pl-2">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="text-sm font-sans text-[#4A403A] leading-relaxed list-disc list-inside">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── ARTICLE BODY ── */}
        <div className="flex flex-col gap-10 text-[#3A332F] text-base md:text-[17px] leading-relaxed font-light">
          {post.sections.map((section, idx) => (
            <section key={idx} className="flex flex-col gap-5">
              <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal tracking-tight pt-2">
                {section.title}
              </h2>

              {section.content.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}

              {section.callout && (
                <div className="my-2 p-6 rounded-2xl bg-white border border-[#C96374]/20 shadow-xs font-editorial text-xl md:text-2xl text-[#2A2320] font-light leading-snug italic text-center">
                  "{section.callout}"
                </div>
              )}

              {section.list && (
                <div className="bg-white/80 border border-[#2A2320]/8 rounded-2xl p-6 my-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#C96374] block mb-3">
                    Actionable Protocol Shifts:
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {section.list.map((li, lIdx) => (
                      <li key={lIdx} className="text-sm text-[#4A403A] flex items-start gap-2.5">
                        <span className="text-[#C96374] font-bold">✦</span>
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ── LEAD MAGNET CALLOUT CARD (PINK ROSE THEME) ── */}
        <div className="bg-gradient-to-br from-[#C96374] via-[#BD5869] to-[#A34354] text-[#FFF9F6] rounded-3xl p-8 md:p-10 border border-[#C96374]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 my-6 text-center md:text-left">
          <div className="flex flex-col gap-2 max-w-lg">
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-white/90 bg-white/20 px-3 py-0.5 rounded-full w-fit mx-auto md:mx-0">
              Free Downloadable Resource
            </span>
            <h3 className="font-editorial text-2xl md:text-3xl font-light text-white">
              {post.leadMagnetTitle}
            </h3>
            <p className="text-xs md:text-sm text-white/85 leading-relaxed">
              Download the accompanying PDF guide for offline reading, checklists, and clinical references.
            </p>
          </div>

          <a
            href={post.leadMagnetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#9E3E4F] hover:bg-[#FFF2F4] font-sans text-xs uppercase tracking-[0.14em] font-bold transition-all shadow-md cursor-pointer hover:scale-[1.02]"
          >
            <Download size={14} />
            <span>Download Free PDF</span>
          </a>
        </div>

        {/* Medical Disclaimer */}
        <div className="p-6 rounded-2xl bg-white/60 border border-[#2A2320]/10 text-xs text-[#7E726B] leading-relaxed">
          <strong>Medical Disclaimer:</strong> The clinical concepts discussed in this article are for informational and educational purposes only. They are not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </div>

        {/* ── RELATED ARTICLES ── */}
        <section className="flex flex-col gap-6 pt-10 border-t border-[#2A2320]/10">
          <h3 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-light text-center">
            Related Clinical Analyses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="bg-white rounded-2xl p-6 border border-[#2A2320]/8 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#C96374]">
                    {related.category}
                  </span>
                  <h4 className="font-editorial text-xl text-[#2A2320] group-hover:text-[#C96374] transition-colors leading-snug">
                    {related.title}
                  </h4>
                  <p className="text-xs text-[#5A4F48] line-clamp-2 mt-1">
                    {related.summary}
                  </p>
                </div>
                <span className="text-xs font-sans uppercase tracking-[0.12em] font-semibold text-[#C96374] group-hover:text-[#A64757] transition-colors inline-flex items-center gap-1 mt-4">
                  <span>Read Article</span>
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Back link */}
        <div className="pt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] font-semibold text-[#C96374] hover:text-[#2A2320] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Journal Articles</span>
          </Link>
        </div>
      </main>

      {/* Editorial Footer (Warm Rose Palette) */}
      <footer className="w-full bg-[#FAF4F0] text-[#2A2320]/75 border-t border-[#C96374]/20 py-12 px-6 text-center text-xs mt-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center">
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-[#C96374] transition-colors">Home</Link>
            <Link href="/#free-guides" className="hover:text-[#C96374] transition-colors">Free Guides</Link>
            <Link href="/blog" className="text-[#C96374] font-bold transition-colors">Journal</Link>
          </div>
          <p className="text-[#7E726B] text-[10px]">
            © {new Date().getFullYear()} FortyWell. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
