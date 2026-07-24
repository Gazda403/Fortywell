'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContentFragment {
  index: string;
  heading: string;
  body: string;
}

const fragments: ContentFragment[] = [
  {
    index: '01',
    heading: 'The Cortisol-Fluid Loop',
    body: 'When cortisol—your primary stress hormone—spikes chronically, it triggers aldosterone release. Aldosterone instructs your kidneys to retain sodium, and sodium pulls water into your tissues. The result: heavy, swollen legs that no amount of cardio seems to fix.',
  },
  {
    index: '02',
    heading: 'Why Intense Workouts Make It Worse',
    body: 'High-intensity training is itself a cortisol stressor. In women over 40 with already-elevated baseline cortisol from perimenopause and life load, HIIT sessions and heavy lifting can paradoxically deepen fluid retention, not reduce it. The biology demands a different logic.',
  },
  {
    index: '03',
    heading: 'The Metabolic Shift After 40',
    body: 'Declining estrogen alters your body\'s insulin sensitivity, fat distribution, and vascular tone. What served you in your 30s—the long runs, the spin classes—now works against your lymphatic and hormonal system. The movement prescription must evolve with you.',
  },
];

export default function PinnedMoment() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const fragmentsRef = useRef<HTMLDivElement[]>([]);
  const mobileFragsRef = useRef<HTMLDivElement[]>([]);

  // ── Desktop GSAP: pinned left + scrolling right ───────────────────────────
  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    // Pin the left column while right scrolls
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: leftColRef.current,
      pinSpacing: false,
    });

    // Each content fragment fades in/out as you scroll
    fragmentsRef.current.forEach((frag, i) => {
      if (!frag) return;

      gsap.fromTo(
        frag,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: frag,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.8,
          },
        },
      );

      if (i < fragmentsRef.current.length - 1) {
        gsap.to(frag, {
          opacity: 0,
          y: -30,
          scale: 0.96,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: frag,
            start: 'bottom 60%',
            end: 'bottom 20%',
            scrub: 0.8,
          },
        });
      }
    });

    gsap.fromTo(
      leftColRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      },
    );
  }, { scope: sectionRef });

  // ── Mobile: IntersectionObserver (no glitch) ──────────────────────────────
  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    mobileFragsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#3A3532]"
      aria-label="The Science of Cortisol and Fluid Retention"
    >
      {/* ── DESKTOP: Sticky left + scrolling right ─────────────────── */}
      <div className="hidden md:flex w-full md:min-h-[300vh]">
        {/* Left pinned column */}
        <div
          ref={leftColRef}
          className="w-[42%] h-screen flex flex-col justify-center
                     editorial-pl pr-14 lg:pr-20 opacity-0"
          style={{ willChange: 'transform' }}
        >
          <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans mb-6">
            The Biology
          </span>
          <h2 className="font-editorial text-[#F5EFE6] text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-8">
            Why your body holds on — and what it actually needs
          </h2>
          <p className="text-[#F5EFE6]/50 text-sm leading-relaxed font-sans font-light max-w-sm mb-10">
            Fortywell begins where conventional fitness advice ends. We built
            our entire methodology around the hormonal and metabolic reality
            of the post-40 female body.
          </p>
          <div className="w-px h-16 bg-[#92A975]/40" />
          <div
            aria-hidden="true"
            className="absolute -left-4 top-1/2 -translate-y-1/2 font-editorial text-[18vw] text-[#F5EFE6]/[0.03] leading-none pointer-events-none select-none"
          >
            40
          </div>
        </div>

        {/* Right scrolling fragments */}
        <div ref={rightColRef} className="w-[58%] flex flex-col">
          {fragments.map((frag, i) => (
            <div
              key={frag.index}
              ref={(el) => { if (el) fragmentsRef.current[i] = el; }}
              className="flex flex-col justify-center pl-14 lg:pl-16 editorial-pr py-0
                         min-h-screen border-l border-[#F5EFE6]/5"
            >
              <div className="flex items-start gap-6 mb-8">
                <span className="font-editorial text-[#92A975]/60 text-sm tracking-widest mt-1">
                  ◦
                </span>
                <div className="w-6 h-px bg-[#92A975]/40 mt-3" />
              </div>
              <h3 className="font-editorial text-[#F5EFE6] text-3xl lg:text-4xl font-light leading-tight tracking-tight mb-6">
                {frag.heading}
              </h3>
              <p className="text-[#F5EFE6]/55 text-base leading-loose font-sans font-light max-w-prose">
                {frag.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: Clean single-column layout ─────────────────────── */}
      <div className="md:hidden">
        {/* Mobile header block */}
        <div className="editorial-container pt-16 pb-12">
          <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans block mb-5">
            The Biology
          </span>
          <h2 className="font-editorial text-[#F5EFE6] text-4xl font-light leading-tight tracking-tight mb-6">
            Why your body holds on — and what it actually needs
          </h2>
          <p className="text-[#F5EFE6]/50 text-sm leading-relaxed font-sans font-light mb-8">
            Fortywell begins where conventional fitness advice ends. We built
            our entire methodology around the hormonal and metabolic reality
            of the post-40 female body.
          </p>
          <div className="w-px h-12 bg-[#92A975]/40" />
        </div>

        {/* Mobile fragments */}
        <div className="flex flex-col pb-16">
          {fragments.map((frag, i) => (
            <div
              key={`m-${frag.index}`}
              ref={(el) => { if (el) mobileFragsRef.current[i] = el; }}
              className="editorial-container py-10"
              style={{
                opacity: 0,
                transform: 'translateY(28px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${i * 0.05}s`,
                borderTop: '1px solid rgba(245,239,230,0.07)',
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-editorial text-[#92A975]/70 text-sm tracking-widest">
                  ◦
                </span>
                <div className="w-8 h-px bg-[#92A975]/30" />
              </div>
              <h3 className="font-editorial text-[#F5EFE6] text-2xl font-light leading-tight tracking-tight mb-5">
                {frag.heading}
              </h3>
              <p className="text-[#F5EFE6]/55 text-sm leading-loose font-sans font-light">
                {frag.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

