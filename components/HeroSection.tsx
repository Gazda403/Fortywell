'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lazy load the waitlist modal since it is hidden on initial render
const WaitlistModal = dynamic(() => import('@/components/WaitlistModal'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

// ─── Magnetic Button ────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
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

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      data-hover="grow"
      className={`btn-magnetic group relative inline-flex items-center justify-center gap-4 rounded-full overflow-hidden
        bg-gradient-to-r from-[#92A975] via-[#a8c28a] to-[#92A975] bg-[length:200%_100%]
        text-[#F5EFE6] tracking-[0.18em] uppercase text-[12px] font-[500] font-sans
        shadow-[0_0_24px_rgba(146,169,117,0.35)] hover:shadow-[0_0_36px_rgba(146,169,117,0.55)]
        transition-all duration-500 hover:bg-right cursor-none ${className}`}
      style={{ padding: '20px 56px', willChange: 'transform', backgroundPosition: '0% 0%' }}
    >
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
    </button>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
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
          duration: 1.1,
          stagger: 0.09,
          ease: 'power3.out',
        },
        '-=0.8',
      );

      // Tagline + subtitle + cta
      tl.fromTo(
        [taglineRef.current, subRef.current, ctaRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power2.out' },
        '-=0.5',
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

  const heroWords = ['FORTY', 'WELL'];

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
          alt="Fortywell wellness after-video moment"
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
          preload="auto"
          onEnded={() => setVideoEnded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoEnded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Rich dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A3532]/70 via-[#3A3532]/40 to-[#3A3532]/85 pointer-events-none" />
      </div>

      {/* Curtain overlay (animates away on load) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#3A3532] z-20 origin-top"
        style={{ willChange: 'transform' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between editorial-container pt-8 pb-12 md:pb-16">
        {/* Nav row */}
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Fortywell logo"
              width={36}
              height={36}
              priority
              className="rounded-full opacity-90"
            />
            <span className="font-editorial text-[#F5EFE6]/90 text-lg tracking-wide">
              Fortywell
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['The Method', 'Science', 'Ritual'].map((item) => (
              <a
                key={item}
                href="#"
                data-hover="grow"
                className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
          {/* Mobile Nav Trigger */}
          <button 
            className="md:hidden text-[#F5EFE6]/90 flex items-center gap-2"
            data-hover="grow"
            aria-label="Menu"
          >
            <span className="text-xs tracking-widest uppercase font-sans">Menu</span>
            <div className="w-4 h-3 flex flex-col justify-between">
              <span className="w-full h-px bg-current"></span>
              <span className="w-full h-px bg-current"></span>
            </div>
          </button>
          <span className="text-[#92A975] text-xs tracking-[0.2em] uppercase font-sans">
            Est. 2026
          </span>
        </header>

        {/* Main hero copy */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-6xl">
          {/* Tagline */}
          <h2
            ref={taglineRef}
            className="text-[#92A975] text-xs tracking-[0.25em] uppercase font-sans opacity-0 m-0"
          >
            Cortisol-Conscious Wellness
          </h2>

          {/* Display title */}
          <h1
            ref={titleWrapRef}
            className="clip-overflow flex flex-wrap gap-x-6 md:gap-x-10 m-0"
            aria-label="Fortywell"
          >
            {heroWords.map((word) => (
              <div key={word} className="overflow-hidden">
                <span
                  className="hero-word hero-title inline-block text-[clamp(4.5rem,13vw,14rem)] opacity-0"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {word}
                </span>
              </div>
            ))}
          </h1>
          
          {/* Anchor rule for title */}
          <div className="w-32 h-px bg-[#F5EFE6]/20 mt-2 mb-2 hidden md:block" />

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
            <MagneticButton onClick={() => setModalOpen(true)}>Join the Waitlist</MagneticButton>
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

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
