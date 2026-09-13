import Link from 'next/link';
import { ArrowLeft, BookOpen, Compass, Home } from 'lucide-react';
import BlogNavbar from '@/components/BlogNavbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2320] flex flex-col font-sans selection:bg-[#C96374]/20">
      <BlogNavbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center gap-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C96374]/15 border border-[#C96374]/30">
          <span className="text-[#C96374] text-[11px] tracking-[0.25em] uppercase font-bold">
            Status 404 · Page Not Found
          </span>
        </div>

        <h1 className="font-editorial text-4xl md:text-6xl font-light text-[#2A2320] leading-tight tracking-tight max-w-xl">
          This path seems to have moved or rested.
        </h1>

        <p className="text-[#5A4F48] text-base md:text-lg font-light leading-relaxed max-w-lg">
          The guide, article, or resource you are seeking is no longer at this location. Let&apos;s guide you back to calming movement and clinical insights.
        </p>

        {/* Action recovery buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3A3532] text-[#F5EFE6] hover:bg-[#262220] text-xs uppercase tracking-widest font-medium transition-all shadow-md"
          >
            <Home size={14} />
            <span>Return Home</span>
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#2A2320] border border-[#2A2320]/15 hover:border-[#C96374] text-xs uppercase tracking-widest font-medium transition-all shadow-xs"
          >
            <BookOpen size={14} className="text-[#C96374]" />
            <span>Browse The Journal</span>
          </Link>
        </div>

        {/* Helpful suggested articles */}
        <div className="mt-12 pt-10 border-t border-[#2A2320]/10 w-full max-w-2xl flex flex-col gap-4 text-left">
          <span className="text-xs uppercase tracking-widest font-bold text-[#7E726B]">
            Popular Clinical Articles
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/why-you-wake-up-at-3am-cortisol-after-40"
              className="p-4 rounded-xl bg-white border border-[#2A2320]/8 hover:border-[#C96374]/50 transition-all group"
            >
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C96374] block mb-1">
                Cortisol & Sleep
              </span>
              <span className="text-sm font-medium text-[#2A2320] group-hover:text-[#C96374] transition-colors leading-snug block">
                The 3:00 AM Awakening: Why Cortisol Spikes at Night →
              </span>
            </Link>

            <Link
              href="/blog/heavy-legs-evening-fluid-retention-perimenopause"
              className="p-4 rounded-xl bg-white border border-[#2A2320]/8 hover:border-[#C96374]/50 transition-all group"
            >
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#92A975] block mb-1">
                Fluid Kinetics
              </span>
              <span className="text-sm font-medium text-[#2A2320] group-hover:text-[#92A975] transition-colors leading-snug block">
                Why Lower Legs Feel Heavy by 5 PM →
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
