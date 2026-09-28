'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Magnetic Button ────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

function MagneticButton({ children, className = '', onClick, href, target, rel }: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const inner = innerRef.current;
    if (!btn || !inner) return;

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const RADIUS = 40;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < RADIUS) {
        const force = (RADIUS - dist) / RADIUS;
        gsap.to(btn, {
          x: dx * force * 0.5,
          y: dy * force * 0.5,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(inner, {
          x: dx * force * 0.2,
          y: dy * force * 0.2,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to([btn, inner], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    const parent = btn.parentElement ?? document.body;
    parent.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const commonClass = `btn-magnetic group relative inline-flex items-center justify-center gap-4 rounded-full overflow-hidden
    bg-gradient-to-r from-[#92A975] via-[#a8c28a] to-[#92A975] bg-[length:200%_100%]
    text-[#F5EFE6] tracking-[0.18em] uppercase text-[12px] font-[500] font-sans
    shadow-[0_0_24px_rgba(146,169,117,0.35)] hover:shadow-[0_0_36px_rgba(146,169,117,0.55)]
    transition-all duration-500 hover:bg-right cursor-none ${className}`;

  const content = (
    <>
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
      />
      <span ref={innerRef} className="relative z-10 block" style={{ willChange: 'transform' }}>
        {children}
      </span>
      {/* Arrow */}
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-[#F5EFE6]/70 group-hover:text-[#F5EFE6]">
        →
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={btnRef as unknown as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        data-hover="grow"
        className={commonClass}
        style={{ padding: '20px 56px', willChange: 'transform', backgroundPosition: '0% 0%' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as unknown as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      data-hover="grow"
      className={commonClass}
      style={{ padding: '20px 56px', willChange: 'transform', backgroundPosition: '0% 0%' }}
    >
      {content}
    </button>
  );
}

// ─── Social Proof Avatars ───────────────────────────────────────────────────
const SOCIAL_PROOF_AVATARS = [
  { src: '/avatars/avatar-1.jpg', alt: 'FortyWell community member' },
  { src: '/avatars/avatar-2.jpg', alt: 'FortyWell community member' },
  { src: '/avatars/avatar-3.jpg', alt: 'FortyWell community member' },
  { src: '/avatars/avatar-4.jpg', alt: 'FortyWell community member' },
];

// ─── Hero Section ────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      // Split each word into its own span for staggered reveal
      const titleEl = titleWrapRef.current;
      if (!titleEl) return;

      // Words split
      const words = titleEl.querySelectorAll<HTMLSpanElement>('.hero-word');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Overlay curtain lift
      tl.to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.4,
        ease: 'power4.inOut',
      });

      // Title stagger — each word clips up from behind
      tl.fromTo(
        words,
        { y: '105%', opacity: 0, scale: 0.95 },
        {
          y: '0%',
          opacity: 1,
          scale: 1,
          duration: 1.0,
          stagger: 0.06,
          ease: 'power3.out',
        },
        '-=0.8',
      );

      // Tagline + trust badge + subtitle + cta
      tl.fromTo(
        [taglineRef.current, trustRef.current, subRef.current, ctaRef.current],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power2.out' },
        '-=0.6',
      );

      // Subtle hero image parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, { scope: sectionRef });

  const heroLines = [
    ['Reclaim', 'How', 'Your', 'Body'],
    ['Was', 'Built', 'to', 'Feel'],
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#3A3532]"
      aria-label="Hero"
    >
      {/* Background Image/Video Container */}
      <div
        ref={imgRef}
        className="absolute inset-0 scale-110 will-change-transform"
        style={{ willChange: 'transform' }}
      >
        {/* The ending image, sits behind the video */}
        <Image
          src="/0709.png"
          alt="FortyWell cortisol-conscious movement and hormone wellness for women over 40"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* The video on top, fades out when it ends */}
        <video
          src="/Woman_jogging_on_beach_sunrise.mp4"
          muted
          autoPlay
          playsInline
          preload="metadata"
          onEnded={() => setVideoEnded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoEnded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Rich dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A3532]/70 via-[#3A3532]/40 to-[#3A3532]/85 pointer-events-none" />
      </div>

      {/* Wipe overlay — slides off on mount */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#3A3532] z-20 origin-top"
        style={{ willChange: 'transform' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between editorial-container pt-8 pb-12 md:pb-16">
        {/* Nav row */}
        <header className="relative flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="FortyWell official emblem"
              width={36}
              height={36}
              priority
              className="rounded-full opacity-90"
            />
            <span className="font-editorial text-[#F5EFE6]/90 text-lg tracking-wide">
              Fortywell
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <a
              href="#pillars"
              data-hover="grow"
              className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors duration-300"
            >
              The Method
            </a>
            <a
              href="#science"
              data-hover="grow"
              className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors duration-300"
            >
              Science
            </a>
            <a
              href="#ritual"
              data-hover="grow"
              className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors duration-300"
            >
              Ritual
            </a>
            <a
              href="#free-guides"
              data-hover="grow"
              className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors duration-300"
            >
              Guides
            </a>
            <Link
              href="/blog"
              data-hover="grow"
              className="text-[#92A975] text-xs tracking-[0.15em] uppercase font-sans font-semibold hover:text-[#F5EFE6] transition-colors duration-300 flex items-center gap-1.5"
            >
              <span>Blog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#92A975]" />
            </Link>
          </nav>

          {/* Mobile Nav Trigger */}
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F5EFE6]/90 flex items-center gap-2 cursor-pointer p-1"
            data-hover="grow"
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="text-xs tracking-widest uppercase font-sans">
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </span>
            <div className="w-4 h-3 flex flex-col justify-between">
              <span className="w-full h-px bg-current"></span>
              <span className="w-full h-px bg-current"></span>
            </div>
          </button>

          <span className="text-[#92A975] text-xs tracking-[0.2em] uppercase font-sans hidden md:block">
            Est. 2026
          </span>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-14 left-0 right-0 z-50 bg-[#262220]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
              <a
                href="#pillars"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-sans uppercase tracking-[0.15em] text-[#F5EFE6]/80 hover:text-[#92A975] py-2 border-b border-white/5"
              >
                The Method
              </a>
              <a
                href="#science"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-sans uppercase tracking-[0.15em] text-[#F5EFE6]/80 hover:text-[#92A975] py-2 border-b border-white/5"
              >
                Science
              </a>
              <a
                href="#ritual"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-sans uppercase tracking-[0.15em] text-[#F5EFE6]/80 hover:text-[#92A975] py-2 border-b border-white/5"
              >
                Ritual
              </a>
              <a
                href="#free-guides"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-sans uppercase tracking-[0.15em] text-[#F5EFE6]/80 hover:text-[#92A975] py-2 border-b border-white/5"
              >
                Free Clinical Guides
              </a>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-sans uppercase tracking-[0.15em] text-[#92A975] font-semibold py-2 flex items-center justify-between"
              >
                <span>The Journal (Blog)</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </header>

        {/* Main hero copy */}
        <div className="flex flex-col gap-5 md:gap-6 max-w-6xl">
          {/* Tagline kicker (Accessible span, no H2 before H1) */}
          <span
            ref={taglineRef}
            className="text-[#92A975] text-xs tracking-[0.25em] uppercase font-sans font-medium opacity-0 m-0 inline-block"
          >
            Cortisol-Conscious Wellness & Hormone Calibration
          </span>

          {/* Social Proof Trust Line directly above the headline */}
          <div
            ref={trustRef}
            className="flex items-center gap-3 sm:gap-3.5 flex-wrap opacity-0"
          >
            {/* 4 Overlapping profile avatars */}
            <div className="flex items-center -space-x-2.5">
              {SOCIAL_PROOF_AVATARS.map((avatar, idx) => (
                <div
                  key={idx}
                  className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-2 ring-[#3A3532] shadow-md shrink-0 bg-[#2A2624]"
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Stars & rating text */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* 5 Warm Gold Stars */}
              <div className="flex items-center gap-0.5 text-[#E5A93C]" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 fill-current drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Trust Copy */}
              <span className="text-[#F5EFE6]/90 text-xs sm:text-sm font-sans tracking-wide">
                <span className="font-semibold text-white">Rated 4.9/5</span> by{' '}
                <span className="font-semibold text-white">12,000+</span> Women Over 40
              </span>
            </div>
          </div>

          {/* Display title (H1) with screen-reader friendly primary entity target */}
          <h1
            ref={titleWrapRef}
            className="clip-overflow flex flex-col gap-1 sm:gap-2 m-0 max-w-6xl"
            aria-label="Reclaim How Your Body Was Built to Feel — FortyWell Cortisol-Conscious Fitness & Hormone Wellness for Women Over 40"
          >
            <span className="sr-only">
              Reclaim How Your Body Was Built to Feel — FortyWell Cortisol-Conscious Fitness & Hormone Wellness for Women Over 40
            </span>
            {heroLines.map((line, lineIdx) => (
              <div key={lineIdx} className="flex flex-wrap gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6">
                {line.map((word, wordIdx) => (
                  <div key={word + wordIdx} className="overflow-hidden inline-block pb-1.5 -mb-1.5" aria-hidden="true">
                    <span
                      className="hero-word hero-title inline-block text-[clamp(2.75rem,7vw,7.2rem)] leading-[0.98] opacity-0"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {word}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </h1>
          
          {/* Anchor rule for title */}
          <div className="w-32 h-px bg-[#F5EFE6]/20 mt-1 mb-1 hidden md:block" />

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-[#F5EFE6]/90 text-sm md:text-base leading-relaxed max-w-lg font-sans font-light opacity-0"
          >
            A cortisol-conscious approach to lower-body fluid retention,
            heavy legs, and metabolic stress after 40.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="opacity-0 pt-2">
            <MagneticButton href="https://fortywell-app.vercel.app/">RECLAIM YOUR BODY</MagneticButton>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="flex items-end justify-between">
          <div className="hidden md:flex items-center gap-2 text-[#F5EFE6]/30 text-xs tracking-widest uppercase font-sans">
            <span className="w-8 h-px bg-[#F5EFE6]/20 inline-block" />
            Scroll to explore
          </div>
          <div className="text-[#F5EFE6]/30 text-xs font-sans tracking-wider">
            For women 40+
          </div>
        </div>
      </div>

      {/* Structural vertical line */}
      <div className="absolute right-[15%] top-0 bottom-0 w-px bg-[#F5EFE6]/5 hidden lg:block pointer-events-none" />
    </section>
  );
}
