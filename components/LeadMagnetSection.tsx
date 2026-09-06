'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, Check, Sparkles, FileText, ArrowRight, ShieldCheck, X } from 'lucide-react';
import gsap from 'gsap';

export interface GuideItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  pages: string;
  readTime: string;
  pdfUrl: string;
  highlights: string[];
}

export const GUIDES: GuideItem[] = [
  {
    id: 'signs-40',
    badge: 'Guide 01 · Must Read',
    badgeColor: '#C96374',
    title: "5 Signs Your Body's Changing After 40",
    subtitle: 'And why traditional fitness & dieting backfire',
    description:
      'Understand the 3 AM cortisol awakening, fluid pooling in lower legs, visceral midsection protection, and why your body needs somatic pacing instead of chronic HIIT.',
    pages: '3-Page Clinical Brief',
    readTime: '3 min read',
    pdfUrl: '/guides/5-signs-body-changing-after-40.pdf',
    highlights: ['3 AM Cortisol Spike', 'Heavy Leg Retention', 'Metabolic Calibration'],
  },
  {
    id: 'clinical-qa',
    badge: 'Guide 02 · Clinical Q&A',
    badgeColor: '#92A975',
    title: 'Questions & Clinical Guidance for Women After 40',
    subtitle: 'Straight answers to the questions women ask',
    description:
      'Clinical explanations on perimenopause vs stress, why running stops working, how simple elevation flushes trapped leg fluid, and the single highest-impact 10-minute daily habit.',
    pages: '3-Page Q&A Guide',
    readTime: '4 min read',
    pdfUrl: '/guides/questions-and-clinical-guidance-after-40.pdf',
    highlights: ['Hormones vs Burnout', 'Lymphatic Physics', 'Rest vs Workout'],
  },
  {
    id: 'daily-rhythm',
    badge: 'Guide 03 · Printable Tracker',
    badgeColor: '#C47D5A',
    title: 'The Over-40 Daily Rhythm: 3 Simple Micro-Habits',
    subtitle: 'Zero equipment · Under 10 minutes total',
    description:
      'Light, engaging daily rituals: morning mineral water & daylight anchoring, 2:30 PM ribcage decompression, and evening legs-up fluid drainage with a printable 7-day tracker.',
    pages: '2-Page Guide + Tracker',
    readTime: '2 min read',
    pdfUrl: '/guides/over-40-daily-rhythm-cortisol-reset.pdf',
    highlights: ['Circadian Anchor', 'Legs-Up Drain', 'Printable 7-Day Card'],
  },
];

export default function LeadMagnetSection() {
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [unlocked, setUnlocked] = useState(false);

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  // Check localStorage for previously unlocked lead magnet
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fortywell_guides_unlocked');
      if (saved === 'true') {
        setUnlocked(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Modal open animation
  useEffect(() => {
    if (!isModalOpen) return;
    const overlay = modalOverlayRef.current;
    const panel = modalPanelRef.current;
    if (!overlay || !panel) return;

    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(
      panel,
      { y: 36, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 }
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleOpenModal = (guide: GuideItem) => {
    setSelectedGuide(guide);
    if (unlocked) {
      // If already unlocked, trigger instant download directly
      window.open(guide.pdfUrl, '_blank');
      return;
    }
    setStatus('idle');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    const overlay = modalOverlayRef.current;
    const panel = modalPanelRef.current;
    if (overlay && panel) {
      gsap.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(panel, {
        y: 24,
        opacity: 0,
        scale: 0.98,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setIsModalOpen(false);
        },
      });
    } else {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          guideId: selectedGuide?.id || 'signs-40',
          guideTitle: selectedGuide?.title || "5 Signs Your Body's Changing After 40",
        }),
      });

      if (res.ok) {
        setStatus('success');
        setUnlocked(true);
        try {
          localStorage.setItem('fortywell_guides_unlocked', 'true');
        } catch {
          // ignore
        }

        // Fire Meta Pixel Lead Event
        if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Lead', {
            content_name: selectedGuide?.title || 'FortyWell Free Guides',
            content_category: 'Lead Magnet',
          });
        }

        // If a specific guide was clicked, automatically trigger download in new tab
        if (selectedGuide) {
          setTimeout(() => {
            window.open(selectedGuide.pdfUrl, '_blank');
          }, 800);
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="free-guides"
      className="w-full bg-[#F4EFEA] text-[#2A2320] border-t border-[#2A2320]/10 py-24 md:py-32 flex justify-center relative overflow-hidden"
      aria-label="Free Downloadable Clinical Guides"
    >
      {/* Subtle decorative background blur */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(146,169,117,0.2) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,99,116,0.15) 0%, transparent 70%)' }}
      />

      <div className="flex flex-col gap-16 max-w-[1380px] mx-auto w-full px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#2A2320]/10 shadow-xs">
            <Sparkles size={13} className="text-[#C96374]" />
            <span className="text-[#C96374] text-[11px] tracking-[0.25em] uppercase font-sans font-bold">
              Complimentary Clinical Guides
            </span>
          </div>

          <h2 className="font-editorial text-3xl md:text-5xl lg:text-6xl font-light text-[#2A2320] leading-[1.12] tracking-tight">
            Take clinical guidance with you.
          </h2>

          <p className="text-[#5A4F48] text-sm md:text-base font-sans font-light max-w-2xl leading-relaxed">
            Short, evidence-informed guides decoding cortisol rhythms, fluid kinetics, and daily somatic resets.
            Gated for free—enter your email once to unlock instant downloads for all three.
          </p>

          {unlocked && (
            <div className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#556B3E] bg-[#92A975]/15 px-3.5 py-1.5 rounded-full border border-[#92A975]/30">
              <Check size={14} />
              <span>Guides unlocked on this device · Click any guide below to download instantly</span>
            </div>
          )}
        </div>

        {/* 3 Guide Cards Grid (Larger cards with spacious breathing room) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {GUIDES.map((guide, idx) => (
            <div
              key={guide.id}
              className="group bg-white rounded-3xl p-8 sm:p-9 lg:p-10 flex flex-col justify-between border border-[#2A2320]/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden min-h-[460px] md:min-h-[490px]"
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-opacity"
                style={{ backgroundColor: guide.badgeColor }}
              />

              <div className="flex flex-col gap-5">
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span
                    className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-md"
                    style={{
                      backgroundColor: `${guide.badgeColor}15`,
                      color: guide.badgeColor,
                    }}
                  >
                    {guide.badge}
                  </span>
                  <span className="text-[11px] font-sans font-medium text-[#7E726B]">
                    {guide.readTime}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-editorial text-2xl text-[#2A2320] group-hover:text-[#C96374] transition-colors leading-snug font-normal">
                    {guide.title}
                  </h3>
                  <p className="text-xs font-sans text-[#7E726B] font-medium mt-1.5">
                    {guide.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[#5A4F48] text-[13px] font-sans font-light leading-relaxed">
                  {guide.description}
                </p>

                {/* Highlight pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {guide.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10.5px] font-sans font-normal text-[#5A4F48] bg-[#F4EFEA] px-3 py-1 rounded-lg border border-[#2A2320]/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-6 mt-8 border-t border-[#2A2320]/8 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#7E726B] font-sans">
                  <FileText size={14} className="text-[#7E726B]" />
                  <span>{guide.pages}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenModal(guide)}
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.14em] font-semibold text-[#2A2320] group-hover:text-[#C96374] bg-[#FAF7F2] group-hover:bg-[#FAF0F2] px-4 py-2 rounded-full border border-[#2A2320]/8 transition-all cursor-pointer"
                  aria-label={`Download ${guide.title}`}
                >
                  <span>{unlocked ? 'Download' : 'Get Free PDF'}</span>
                  <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-4 text-xs text-[#7E726B] font-sans text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#92A975]" />
            <span>100% Free · Instant PDF Download</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[#92A975]" />
            <span>Curated by Somatic & Clinical Movement Experts</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#92A975]" />
            <span>Zero Spam Guarantee · Unsubscribe Anytime</span>
          </div>
        </div>
      </div>

      {/* ── MODAL GATE ── */}
      {isModalOpen && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: 'rgba(24, 21, 19, 0.88)', backdropFilter: 'blur(16px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Download FortyWell Clinical Guides"
        >
          <div
            ref={modalPanelRef}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl p-8 md:p-12 flex flex-col justify-center"
            style={{
              background: 'linear-gradient(160deg, #44403c 0%, #3A3532 40%, #322f2c 100%)',
              border: '1px solid rgba(245,239,230,0.14)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.65)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, #92A975 0%, #C96374 50%, #D1A78C 100%)',
              }}
            />

            {/* Close button */}
            <button
              onClick={handleCloseModal}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {status === 'success' ? (
              /* ── Success State ── */
              <div className="flex flex-col gap-6 py-4">
                <div className="w-12 h-12 rounded-full bg-[#92A975]/20 border border-[#92A975]/40 flex items-center justify-center text-[#92A975]">
                  <Check size={26} />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-editorial text-3xl font-light text-[#F5EFE6] leading-tight">
                    Your guides are ready.
                  </h3>
                  <p className="font-sans text-sm text-[#F5EFE6]/70 leading-relaxed">
                    We&apos;ve sent a permanent download link to <strong>{email}</strong>. You can also download any of the 3 guides right now:
                  </p>
                </div>

                {/* Instant Download Links for All 3 */}
                <div className="flex flex-col gap-2.5 pt-2">
                  {GUIDES.map((g) => (
                    <a
                      key={g.id}
                      href={g.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[#F5EFE6] group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-[#92A975] flex-shrink-0" />
                        <span className="text-xs md:text-sm font-sans font-medium line-clamp-1">
                          {g.title}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-sans text-[#92A975] font-semibold flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                        <span>Download</span>
                        <Download size={13} />
                      </span>
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="font-sans uppercase tracking-[0.18em] text-[11px] text-[#92A975] hover:text-[#F5EFE6] transition-colors pt-3 text-left cursor-pointer"
                >
                  Done reading ×
                </button>
              </div>
            ) : (
              /* ── Form State ── */
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[10.5px] uppercase tracking-[0.24em] font-sans font-bold text-[#92A975]">
                    Instant Free Access
                  </span>
                  <h3 className="font-editorial text-2xl md:text-3xl font-light text-[#F5EFE6] leading-tight mt-2 mb-2">
                    {selectedGuide ? selectedGuide.title : 'Download Free Clinical Guides'}
                  </h3>
                  <p className="font-sans text-xs md:text-[13px] text-[#F5EFE6]/65 leading-relaxed">
                    Enter your email to immediately access all three PDF guides. We’ll also email you direct links so you have them whenever you need them.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="lead-magnet-email"
                      className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#F5EFE6]/40"
                    >
                      Your Email Address
                    </label>
                    <input
                      id="lead-magnet-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="w-full font-sans text-sm outline-none px-4 py-3.5 rounded-xl text-[#F5EFE6] bg-white/5 border border-white/15 focus:border-[#92A975] focus:bg-white/10 transition-all placeholder:text-white/30"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-[#D07887] font-sans">
                      Something went wrong. Please check your email address and try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2.5 rounded-full py-4 px-6 font-sans uppercase tracking-[0.16em] text-xs font-semibold text-[#181514] bg-gradient-to-r from-[#92A975] via-[#a8c28a] to-[#92A975] hover:opacity-95 transition-all shadow-md cursor-pointer disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-[#181514] border-t-transparent rounded-full animate-spin" />
                        Unlocking Guides…
                      </span>
                    ) : (
                      <>
                        <span>Get All 3 Guides Free</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] font-sans text-center text-[#F5EFE6]/35 leading-relaxed">
                    No spam ever. You can unsubscribe in one click anytime.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
