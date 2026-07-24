'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PillarItem {
  label: string;
  description: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

const pillars: PillarItem[] = [
  {
    label: 'Hormone-Aware',
    description: 'Every movement calibrated to your cortisol cycle',
    icon: ({ className = "w-5 h-5 text-[#92A975]" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M7 12h10" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: 'Joint-Friendly',
    description: 'Zero-impact sequences protecting changing connective tissue',
    icon: ({ className = "w-5 h-5 text-[#92A975]" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Real Longevity',
    description: 'Results measured in years, not weeks',
    icon: ({ className = "w-5 h-5 text-[#92A975]" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12h18" strokeWidth="1" />
        <circle cx="12" cy="12" r="7" />
        <path d="M12 8l3 4h-6l3-4z" />
      </svg>
    ),
  },
  {
    label: 'Made for You',
    description: 'Protocols designed exclusively for women over 40',
    icon: ({ className = "w-5 h-5 text-[#92A975]" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
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
              <div className="text-[#92A975] flex items-center h-6">
                <pillar.icon />
              </div>
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

