'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated Counter ────────────────────────────────────────────────────────

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function AnimatedCounter({ target, prefix = '', suffix = '', label }: CounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
          },
        });
      },
    });

    return () => st.kill();
  }, [target, prefix, suffix]);

  return (
    <div className="flex flex-col gap-2">
      <span
        ref={numRef}
        className="counter-num text-5xl md:text-7xl lg:text-8xl"
      >
        {prefix}0{suffix}
      </span>
      <span className="text-[#F5EFE6]/60 text-xs tracking-[0.2em] uppercase font-sans">
        {label}
      </span>
    </div>
  );
}

// ─── Lead Capture Footer ─────────────────────────────────────────────────────

export default function LeadCaptureFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      // Header entrance
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );

      // Action entrance
      gsap.fromTo(
        actionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        },
      );

      // Stats entrance
      gsap.fromTo(
        statsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
  }, { scope: sectionRef });

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-[#3A3532] overflow-hidden"
      aria-label="Install FortyWell"
    >
      {/* Background decorative large type */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 font-editorial text-[22vw] text-[#F5EFE6]/[0.025] leading-none pointer-events-none select-none overflow-hidden whitespace-nowrap"
      >
        FORTYWELL
      </div>

      {/* Structural vertical line */}
      <div className="absolute left-[40%] top-0 bottom-0 w-px bg-[#F5EFE6]/5 hidden lg:block pointer-events-none" />

      {/* Stats row */}
      <div
        ref={statsRef}
        className="opacity-0 border-b border-[#F5EFE6]/8 editorial-container py-16 md:py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          <AnimatedCounter target={4840} label="Active members" />
          <AnimatedCounter target={87} suffix="%" label="Report less leg swelling" />
          <AnimatedCounter target={12} label="Minutes per ritual" />
          <AnimatedCounter target={40} suffix="+" label="Beta testers" />
        </div>
      </div>

      {/* Main conversion block */}
      <div className="relative z-10 flex flex-col lg:flex-row editorial-container pt-20 pb-24 md:pb-32 gap-16 lg:gap-24 items-start lg:items-center justify-between">
        {/* Left: Heading */}
        <div className="lg:w-1/2 flex flex-col gap-8">
          <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans">
            Instant Access
          </span>
          <h2
            ref={headingRef}
            className="font-editorial text-[#F5EFE6] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight opacity-0"
          >
            You deserve a method built for who you are now.
          </h2>
          <p className="text-[#F5EFE6]/60 text-sm leading-relaxed font-sans font-light max-w-md">
            Install FortyWell to access the Daily Reset Ritual — fully guided, science-informed, and built
            for the post-40 female body.
          </p>

          {/* Trust signals */}
          <div className="flex flex-col gap-3">
            {[
              'No intense workouts required',
              'Hormone-aware protocols only',
              'Zero equipment needed — start right now',
            ].map((signal) => (
              <div key={signal} className="flex items-center gap-3">
                <span className="text-[#92A975] text-sm">✦</span>
                <span className="text-[#F5EFE6]/55 text-xs font-sans tracking-wide">
                  {signal}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Action Card */}
        <div className="lg:w-1/2 w-full flex flex-col items-start lg:items-end justify-center">
          <div
            ref={actionRef}
            className="flex flex-col gap-6 max-w-md w-full opacity-0 bg-[#332e2c]/60 p-8 md:p-10 border border-[#F5EFE6]/10 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[#92A975] text-xs tracking-[0.2em] uppercase font-sans font-medium">
                Get Started
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl text-[#F5EFE6] font-light leading-snug">
                Begin your 15-minute daily reset
              </h3>
              <p className="text-[#F5EFE6]/50 text-xs md:text-sm font-sans font-light leading-relaxed">
                Take control of fluid retention, cortisol levels, and joint health today.
              </p>
            </div>

            <a
              href="https://fortywell-app.vercel.app/"
              data-hover="olive"
              className="group relative inline-flex items-center justify-center gap-4 rounded-full overflow-hidden
                bg-gradient-to-r from-[#F5EFE6] via-[#fff9f3] to-[#F5EFE6] bg-[length:200%_100%]
                text-[#3A3532] text-[12px] md:text-[13px] tracking-[0.18em] uppercase font-sans font-[500]
                shadow-[0_0_28px_rgba(245,239,230,0.25)] hover:shadow-[0_0_40px_rgba(245,239,230,0.45)]
                hover:from-[#92A975] hover:via-[#a8c28a] hover:to-[#92A975] hover:text-[#F5EFE6]
                transition-all duration-500 cursor-none w-full text-center py-5 px-8"
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)' }}
              />
              <span className="relative z-10 font-medium">
                Install FortyWell
              </span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-[#92A975] group-hover:text-[#F5EFE6]/70 text-base">
                →
              </span>
            </a>

            <div className="flex items-center justify-between pt-2 border-t border-[#F5EFE6]/10 text-[#F5EFE6]/40 text-xs font-sans">
              <span>Zero equipment required</span>
              <span>•</span>
              <span>Web & Mobile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal footer strip */}
      <div className="border-t border-[#F5EFE6]/8 editorial-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[#F5EFE6]/40 text-xs font-sans tracking-wider">
          © 2026 Fortywell. All rights reserved.
        </span>
        <div className="flex items-center gap-8">
          {['Privacy Policy', 'Terms of Service', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#F5EFE6]/40 text-xs font-sans tracking-wider hover:text-[#F5EFE6]/70 transition-colors duration-300"
              data-hover="grow"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
