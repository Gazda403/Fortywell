'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AdvisoryPoint {
  role: string;
  focus: string;
  quote: string;
  highlight: string;
}

const advisoryPoints: AdvisoryPoint[] = [
  {
    role: 'Endocrine & Metabolic Health',
    focus: 'Cortisol Rhythm Calibration',
    quote: 'Post-40 female metabolism requires lowering baseline stress markers before physical exertion can yield positive vascular and fluid clearance results.',
    highlight: 'Hormonal Alignment',
  },
  {
    role: 'Lymphatic & Microvascular Medicine',
    focus: 'Interstitial Fluid Kinetics',
    quote: 'Targeted positional inversions combined with rhythmic skeletal muscle pumping increase lower-body lymphatic movement by up to 300%.',
    highlight: 'Fluid Clearing Protocol',
  },
  {
    role: 'Somatic & Autonomic Physiology',
    focus: 'Parasympathetic Reset',
    quote: 'The body does not shed water weight under threat perception. Signalling autonomic safety is the mandatory first step to reducing tissue puffiness.',
    highlight: 'Nervous System Safety',
  },
];

export default function ExpertAdvisory() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#3A3532] text-[#F5EFE6] border-t border-[#F5EFE6]/10 py-20 md:py-28"
      aria-label="Clinical Grounding"
    >
      <div className="editorial-container flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#F5EFE6]/10">
          <div className="flex flex-col gap-3">
            <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans">
              Clinical & Physiological Rationale
            </span>
            <h2 className="font-editorial text-3xl md:text-5xl font-light leading-tight tracking-tight">
              Grounded in female endocrinology & lymphatics
            </h2>
          </div>
          <p className="text-[#F5EFE6]/60 text-xs md:text-sm font-sans font-light max-w-xs leading-relaxed">
            Designed to bridge the gap between clinical stress-hormone science and daily home movement.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {advisoryPoints.map((point, i) => (
            <div
              key={point.role}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="flex flex-col justify-between p-8 bg-[#332e2c] border border-[#F5EFE6]/8 relative group hover:border-[#92A975]/40 transition-colors duration-500"
            >
              <div className="flex flex-col gap-4 mb-8">
                <span className="text-[#92A975] text-[11px] tracking-[0.2em] uppercase font-sans font-medium">
                  {point.highlight}
                </span>
                <h3 className="font-editorial text-xl text-[#F5EFE6] font-light leading-snug">
                  {point.focus}
                </h3>
                <p className="text-[#F5EFE6]/65 text-sm font-sans font-light leading-relaxed italic pt-2">
                  &ldquo;{point.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5EFE6]/8 flex items-center justify-between text-xs font-sans text-[#F5EFE6]/40">
                <span>{point.role}</span>
                <span className="text-[#92A975]">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
