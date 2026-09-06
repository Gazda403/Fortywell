import { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/BlogNavbar';
import { BLOG_POSTS } from '@/lib/blogData';
import { BookOpen, Sparkles, ArrowRight, Clock, ShieldCheck, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The FortyWell Journal — Science, Hormones & Somatic Movement for Women 40+',
  description:
    'Evidence-informed clinical insights on cortisol management, lower-body fluid kinetics, heavy legs relief, and joint-safe somatic strength training for women over 40.',
  alternates: {
    canonical: 'https://fortywell-app.vercel.app/blog',
  },
  openGraph: {
    title: 'The FortyWell Journal — Science & Movement for Women Over 40',
    description:
      'Explore clinical guidance on cortisol belly, 3 AM wake-ups, swollen legs, and hormone-conscious somatic strength.',
    url: 'https://fortywell-app.vercel.app/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2320] flex flex-col font-sans selection:bg-[#92A975]/30">
      {/* Universal Blog Navigation */}
      <BlogNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col gap-16">
        {/* Header Title */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#92A975]/15 border border-[#92A975]/25 w-fit">
            <Sparkles size={13} className="text-[#556B3E]" />
            <span className="text-[#556B3E] text-[11px] tracking-[0.25em] uppercase font-bold">
              The FortyWell Journal
            </span>
          </div>

          <h1 className="font-editorial text-4xl md:text-6xl font-light text-[#2A2320] leading-[1.1] tracking-tight">
            Evidence-informed insights for your body after 40.
          </h1>

          <p className="text-[#5A4F48] text-base md:text-lg font-light leading-relaxed">
            Deconstructing nocturnal cortisol spikes, lower-body fluid stagnation, joint stiffness, and the mechanical science of low-impact somatic movement.
          </p>
        </div>

        {/* ── FEATURED SPOTLIGHT ARTICLE ── */}
        {featuredPost && (
          <article className="relative bg-[#262220] text-[#F5EFE6] rounded-3xl p-8 md:p-14 border border-[#2A2320]/20 shadow-2xl overflow-hidden group">
            {/* Ambient warm glow */}
            <div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, #92A975 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex flex-col gap-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#92A975] bg-[#92A975]/20 px-3 py-1 rounded-full border border-[#92A975]/30">
                  Featured Clinical Brief
                </span>
                <span className="text-xs text-[#F5EFE6]/50 flex items-center gap-1.5">
                  <Clock size={13} />
                  {featuredPost.readTime}
                </span>
                <span className="text-xs text-[#F5EFE6]/50">·</span>
                <span className="text-xs text-[#F5EFE6]/50">{featuredPost.publishedAt}</span>
              </div>

              <div>
                <Link href={`/blog/${featuredPost.slug}`} className="group-hover:text-[#92A975] transition-colors">
                  <h2 className="font-editorial text-3xl md:text-5xl font-light leading-tight tracking-tight text-[#FAF7F2]">
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="text-[#F5EFE6]/70 text-sm md:text-base font-light mt-3 leading-relaxed">
                  {featuredPost.summary}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-[#F5EFE6] font-medium">{featuredPost.author.name}</span>
                  <span className="text-[11px] text-[#F5EFE6]/50">{featuredPost.author.role}</span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#92A975] hover:bg-[#a8c28a] text-[#181514] font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all group-hover:gap-3"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* ── ARTICLES GRID ── */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-[#2A2320]/10 pb-4">
            <h3 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-light">
              Latest Clinical Analyses
            </h3>
            <span className="text-xs text-[#7E726B] font-sans">
              {BLOG_POSTS.length} Guides Published
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl p-7 flex flex-col justify-between border border-[#2A2320]/8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between text-xs text-[#7E726B]">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#C96374] bg-[#C96374]/10 px-2.5 py-0.5 rounded-md">
                      {post.category}
                    </span>
                    <span className="text-[11px] flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="font-editorial text-2xl text-[#2A2320] group-hover:text-[#C96374] transition-colors leading-snug font-normal">
                      {post.title}
                    </h4>
                  </Link>

                  <p className="text-[#5A4F48] text-[13px] font-light leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2A2320]/6 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#7E726B]">
                    <ShieldCheck size={14} className="text-[#92A975]" />
                    <span>Advisory Reviewed</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs uppercase tracking-[0.14em] font-semibold text-[#2A2320] group-hover:text-[#C96374] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── FREE DOWNLOADABLE PDF LEAD MAGNET BANNER ── */}
        <section className="bg-[#EFE8DE] rounded-3xl p-8 md:p-12 border border-[#2A2320]/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#C96374]">
              Free Downloadable Resources
            </span>
            <h3 className="font-editorial text-3xl md:text-4xl text-[#2A2320] font-light leading-tight">
              Looking for quick, offline clinical guides?
            </h3>
            <p className="text-[#5A4F48] text-sm leading-relaxed">
              Download our curated PDF guides including <em>"5 Signs Your Body's Changing After 40"</em> and our printable 7-day habit checklist for instant reference.
            </p>
          </div>

          <Link
            href="/#free-guides"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#262220] hover:bg-[#3A3532] text-[#F5EFE6] font-sans text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md"
          >
            <Download size={15} className="text-[#92A975]" />
            <span>Get Free PDF Guides</span>
          </Link>
        </section>
      </main>

      {/* Editorial Footer */}
      <footer className="w-full bg-[#201C1A] text-[#F5EFE6]/60 border-t border-white/10 py-12 px-6 text-center text-xs">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center">
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/#pillars" className="hover:text-white transition-colors">The Method</Link>
            <Link href="/#free-guides" className="hover:text-white transition-colors">Guides</Link>
            <Link href="/blog" className="text-[#92A975] hover:text-white transition-colors">Journal</Link>
          </div>
          <p className="text-[#F5EFE6]/40 max-w-xl text-[11px] leading-relaxed">
            The content in The FortyWell Journal is for informational and educational purposes only and does not constitute medical advice. Always consult your qualified healthcare practitioner.
          </p>
          <p className="text-[#F5EFE6]/30 text-[10px]">
            © {new Date().getFullYear()} FortyWell. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
