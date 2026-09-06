import { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/BlogNavbar';
import { BLOG_POSTS } from '@/lib/blogData';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Download } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2320] flex flex-col font-sans selection:bg-[#C96374]/20">
      {/* Universal Blog Navigation */}
      <BlogNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col items-center gap-16">
        {/* ── CENTERED HEADER ── */}
        <div className="flex flex-col gap-5 max-w-3xl mx-auto text-center items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C96374]/15 border border-[#C96374]/30 shadow-xs">
            <Sparkles size={13} className="text-[#C96374]" />
            <span className="text-[#C96374] text-[11px] tracking-[0.25em] uppercase font-bold">
              The FortyWell Journal
            </span>
          </div>

          <h1 className="font-editorial text-4xl md:text-6xl font-light text-[#2A2320] leading-[1.12] tracking-tight text-center">
            Evidence-informed insights for your body after 40.
          </h1>

          <p className="text-[#5A4F48] text-base md:text-lg font-light leading-relaxed text-center max-w-2xl">
            Deconstructing nocturnal cortisol spikes, lower-body fluid stagnation, joint stiffness, and the mechanical science of low-impact somatic movement.
          </p>
        </div>

        {/* ── FEATURED SPOTLIGHT ARTICLE (PINK ROSE THEME & CENTERED) ── */}
        {featuredPost && (
          <article className="relative w-full max-w-4xl mx-auto bg-gradient-to-br from-[#C96374] via-[#BD5869] to-[#A34354] text-[#FFF9F6] rounded-3xl p-8 md:p-14 border border-[#C96374]/40 shadow-2xl overflow-hidden group text-center flex flex-col items-center">
            {/* Ambient subtle glow */}
            <div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)' }}
            />
            <div
              className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, #FFAEC0 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto w-full">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-white bg-white/20 px-3.5 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                  Featured Clinical Brief
                </span>
                <span className="text-xs text-white/80 flex items-center gap-1.5">
                  <Clock size={13} />
                  {featuredPost.readTime}
                </span>
                <span className="text-xs text-white/80">·</span>
                <span className="text-xs text-white/80">{featuredPost.publishedAt}</span>
              </div>

              {/* Title & Summary */}
              <div className="flex flex-col items-center gap-3 text-center">
                <Link href={`/blog/${featuredPost.slug}`} className="group-hover:text-[#FFE6EB] transition-colors">
                  <h2 className="font-editorial text-3xl md:text-5xl font-light leading-tight tracking-tight text-white">
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="text-white/90 text-sm md:text-base font-light leading-relaxed">
                  {featuredPost.summary}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="pt-6 border-t border-white/20 flex flex-wrap items-center justify-between w-full gap-4 text-left">
                <div className="flex flex-col">
                  <span className="text-xs text-white font-medium">{featuredPost.author.name}</span>
                  <span className="text-[11px] text-white/70">{featuredPost.author.role}</span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#9E3E4F] hover:bg-[#FFF2F4] font-sans text-xs uppercase tracking-[0.14em] font-bold transition-all shadow-md group-hover:gap-3 cursor-pointer"
                >
                  <span>Read Full Brief</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* ── ARTICLES GRID (CENTERED SECTION HEADER) ── */}
        <section className="w-full flex flex-col gap-10">
          <div className="flex flex-col items-center text-center gap-2 border-b border-[#2A2320]/10 pb-6 max-w-2xl mx-auto w-full">
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#C96374]">
              Curated Clinical Guidance
            </span>
            <h3 className="font-editorial text-3xl md:text-4xl text-[#2A2320] font-light">
              Latest Clinical Analyses
            </h3>
            <p className="text-xs text-[#7E726B] font-sans">
              {BLOG_POSTS.length} Evidence-Informed Guides for Women Over 40
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl p-7 flex flex-col justify-between border border-[#2A2320]/8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              >
                {/* Subtle top rose accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C96374] to-[#E897A4]" />

                <div className="flex flex-col gap-3.5 pt-1">
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
                    className="text-xs uppercase tracking-[0.14em] font-semibold text-[#C96374] hover:text-[#A64757] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── FREE DOWNLOADABLE PDF LEAD MAGNET BANNER (PINK ROSE & CENTERED) ── */}
        <section className="w-full bg-gradient-to-br from-[#FAF0F2] via-[#F7E7EA] to-[#EFE0E4] rounded-3xl p-8 md:p-14 border border-[#C96374]/30 flex flex-col items-center text-center gap-6 shadow-sm">
          <div className="flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#C96374] bg-[#C96374]/15 px-3 py-1 rounded-full">
              Free Downloadable Resources
            </span>
            <h3 className="font-editorial text-3xl md:text-5xl text-[#2A2320] font-light leading-tight">
              Looking for quick, offline clinical guides?
            </h3>
            <p className="text-[#5A4F48] text-sm md:text-base leading-relaxed max-w-xl">
              Download our curated PDF guides including <em>"5 Signs Your Body's Changing After 40"</em> and our printable 7-day habit checklist for instant reference.
            </p>
          </div>

          <Link
            href="/#free-guides"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C96374] hover:bg-[#B85365] text-white font-sans text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <Download size={15} />
            <span>Get Free PDF Guides</span>
          </Link>
        </section>
      </main>

      {/* Editorial Footer (Warm Rose Palette) */}
      <footer className="w-full bg-[#FAF4F0] text-[#2A2320]/75 border-t border-[#C96374]/20 py-12 px-6 text-center text-xs">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center">
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-[#C96374] transition-colors">Home</Link>
            <Link href="/#pillars" className="hover:text-[#C96374] transition-colors">The Method</Link>
            <Link href="/#free-guides" className="hover:text-[#C96374] transition-colors">Guides</Link>
            <Link href="/blog" className="text-[#C96374] font-bold transition-colors">Journal</Link>
          </div>
          <p className="text-[#5A4F48] max-w-xl text-[11px] leading-relaxed">
            The content in The FortyWell Journal is for informational and educational purposes only and does not constitute medical advice. Always consult your qualified healthcare practitioner.
          </p>
          <p className="text-[#7E726B] text-[10px]">
            © {new Date().getFullYear()} FortyWell. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
