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

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      // Mobile subtle scroll animations
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      fragmentsRef.current.forEach((frag) => {
        if (!frag) return;
        gsap.fromTo(
          frag,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: frag,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
      return;
    }
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

        // Fade in
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

        // Fade out as next fragment approaches
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

      // Left column entrance
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#3A3532] md:min-h-[300vh]"
      aria-label="The Science of Cortisol and Fluid Retention"
    >
      <div className="flex flex-col md:flex-row w-full">
        {/* ── Left: Pinned narrative column ─────────────────── */}
        <div
          ref={leftColRef}
          className="w-full md:w-[42%] md:h-screen flex flex-col justify-center
                     editorial-pl pr-8 md:pr-14 lg:pr-20 pt-16 pb-6 md:py-0 opacity-0 md:opacity-100"
          style={{ willChange: 'transform' }}
        >
          {/* Small structural label */}
          <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans mb-6">
            The Biology
          </span>

          <h2 className="font-editorial text-[#F5EFE6] text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-8">
            Why your body holds on — and what it actually needs
          </h2>

          <p className="text-[#F5EFE6]/50 text-sm leading-relaxed font-sans font-light max-w-sm mb-10">
            Fortywell begins where conventional fitness advice ends. We built
            our entire methodology around the hormonal and metabolic reality
            of the post-40 female body.
          </p>

          {/* Vertical line accent */}
          <div className="w-px h-16 bg-[#92A975]/40" />

          {/* Decorative large number in background */}
          <div
            aria-hidden="true"
            className="absolute -left-4 top-1/2 -translate-y-1/2 font-editorial text-[18vw] text-[#F5EFE6]/[0.03] leading-none pointer-events-none select-none hidden md:block"
          >
            40
          </div>
        </div>

        {/* ── Right: Scrolling content fragments ─────────────── */}
        <div className="w-full md:w-[58%] flex flex-col pb-16 md:pb-0">
          {fragments.map((frag, i) => (
            <div
              key={frag.index}
              ref={(el) => {
                if (el) fragmentsRef.current[i] = el;
              }}
              className={`flex flex-col justify-center pl-8 md:pl-14 lg:pl-16 editorial-pr py-10 md:py-0
                          md:min-h-screen border-l border-[#F5EFE6]/5`}
            >
              <div className="flex items-start gap-6 mb-8">
                <span className="font-editorial text-[#92A975]/60 text-sm tracking-widest mt-1">
                  {frag.index}
                </span>
                <div className="w-6 h-px bg-[#92A975]/40 mt-3" />
              </div>

              <h3 className="font-editorial text-[#F5EFE6] text-2xl md:text-3xl lg:text-4xl font-light leading-tight tracking-tight mb-6">
                {frag.heading}
              </h3>

              <p className="text-[#F5EFE6]/55 text-sm md:text-base leading-loose font-sans font-light max-w-prose">
                {frag.body}
              </p>

              {/* Bottom separator for mobile */}
              {i < fragments.length - 1 && (
                <div className="mt-12 h-px w-16 bg-[#F5EFE6]/10 md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
