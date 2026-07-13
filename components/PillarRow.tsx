'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PillarItem {
  label: string;
  description: string;
  icon: string;
}

const pillars: PillarItem[] = [
  {
    label: 'Hormone-Aware',
    description: 'Every movement calibrated to your cortisol cycle',
    icon: '◎',
  },
  {
    label: 'Joint-Friendly',
    description: 'Zero-impact sequences protecting changing connective tissue',
    icon: '◈',
  },
  {
    label: 'Real Longevity',
    description: 'Results measured in years, not weeks',
    icon: '◇',
  },
  {
    label: 'Made for You',
    description: 'Protocols designed exclusively for women over 40',
    icon: '◉',
  },
];

export default function PillarRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      itemsRef.current,
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      },
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5EFE6] border-y border-[#3A3532]/10 editorial-container"
      aria-label="Core Pillars"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.label}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            data-hover="olive"
            className={`group relative flex flex-col gap-4 px-8 py-10 md:py-12 opacity-0
              ${i < pillars.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-[#3A3532]/10' : ''}
              ${i < 2 ? 'sm:border-b lg:border-b-0' : ''}
              transition-colors duration-500 cursor-none`}
          >
            {/* Hover background fill */}
            <div className="absolute inset-0 bg-[#92A975]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col gap-3">
              <span
                className="text-[#92A975] text-lg font-editorial"
                aria-hidden="true"
              >
                {pillar.icon}
              </span>
              <h3 className="font-editorial text-[#3A3532] text-xl md:text-2xl font-light tracking-tight">
                {pillar.label}
              </h3>
              <p className="text-[#3A3532]/60 text-xs leading-relaxed tracking-wide font-sans font-light">
                {pillar.description}
              </p>
            </div>

            {/* Bottom line accent on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-[#92A975] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
