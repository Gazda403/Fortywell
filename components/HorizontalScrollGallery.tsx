'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RitualCard {
  step: string;
  title: string;
  duration: string;
  description: string;
  benefit: string;
  color: string;
  accent: string;
  image: string;
}

const ritualCards: RitualCard[] = [
  {
    step: 'Step 01',
    title: 'Morning Cortisol Calm',
    duration: '12 minutes',
    description:
      'A gentle, lymph-activating sequence performed within 30 minutes of waking. Low-to-ground movements that signal safety to the nervous system — lowering baseline cortisol before the day\'s demands accumulate.',
    benefit: 'Reduces morning cortisol spike by up to 34%',
    color: '#F5EFE6',
    accent: '#92A975',
    image: '/pexels-paolo-ortega-155343406-10893352.jpg',
  },
  {
    step: 'Step 02',
    title: 'Midday Drainage Reset',
    duration: '8 minutes',
    description:
      'A targeted lymphatic drainage sequence for the lower body, designed for the post-lunch metabolic dip. Inverted positions and rhythmic muscle pumping accelerate interstitial fluid clearance from the legs.',
    benefit: 'Clinically-patterned lymph drainage protocol',
    color: '#3A3532',
    accent: '#E1A188',
    image: '/pexels-vlada-karpovich-8939848.jpg',
  },
  {
    step: 'Step 03',
    title: 'Evening Wind-Down',
    duration: '15 minutes',
    description:
      'Parasympathetic activation through restorative inversions and breathwork. Progesterone-supportive postures elevate legs above heart, leveraging gravity to complete the fluid clearing cycle begun in the morning.',
    benefit: 'Supports deep sleep & overnight recovery',
    color: '#92A975',
    accent: '#F5EFE6',
    image: '/pexels-pavel-danilyuk-7801519.jpg',
  },
];

export default function HorizontalScrollGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const imgMasksRef = useRef<HTMLDivElement[]>([]);
  const mobileCardsRef = useRef<HTMLDivElement[]>([]);

  // ── Desktop-only GSAP animations ─────────────────────────────────────────
  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const track = trackRef.current;
    const cards = cardsRef.current;
    if (!track || cards.length === 0) return;

    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(trackWidth - viewportWidth);
    };

    const st = gsap.to(track, {
      x: () => getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount()) + window.innerWidth * 0.5}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, i) => {
      if (!card) return;

      const imgMask = imgMasksRef.current[i];

      gsap.fromTo(
        imgMask,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: card,
            containerAnimation: st,
            start: 'left 80%',
            once: true,
          },
        },
      );

      const innerImg = imgMask.querySelector<HTMLDivElement>('.inner-img');
      if (innerImg) {
        gsap.fromTo(
          innerImg,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: st,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
      }

      const textEls = card.querySelectorAll<HTMLElement>('.card-text');
      gsap.fromTo(
        textEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: st,
            start: 'left 65%',
            once: true,
          },
        },
      );
    });

    gsap.fromTo(
      containerRef.current?.querySelector('.gallery-header') ?? null,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      },
    );
  }, { scope: sectionRef });

  // ── Mobile: IntersectionObserver fade-in (no GSAP, zero glitch) ──────────
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
      { threshold: 0.12 }
    );

    mobileCardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F5EFE6] overflow-hidden"
      aria-label="The 3-Step Daily Reset Ritual"
    >
      {/* ── DESKTOP: Horizontal scroll ─────────────────────────────── */}
      <div ref={containerRef} className="hidden md:flex w-full h-screen flex-col">
        <div className="gallery-header flex items-end justify-between editorial-container pt-16 pb-8 opacity-0">
          <div>
            <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans block mb-3">
              The Daily Reset
            </span>
            <h2 className="font-editorial text-[#3A3532] text-3xl md:text-5xl font-light leading-tight tracking-tight">
              Three rituals.<br />One complete system.
            </h2>
          </div>
          <p className="hidden md:block text-[#3A3532]/50 text-xs max-w-[240px] text-right font-sans font-light leading-relaxed tracking-wide">
            Scroll horizontally to explore each step of the Fortywell Daily Reset Ritual.
          </p>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="h-scroll-track flex gap-6 md:gap-8 editorial-pl pr-[20vw]"
            style={{ willChange: 'transform' }}
          >
            {ritualCards.map((card, i) => (
              <div
                key={card.step}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[36vw] h-[60vh] md:h-[65vh] relative rounded-none overflow-hidden flex flex-col"
                style={{ backgroundColor: card.color }}
              >
                <div
                  ref={(el) => { if (el) imgMasksRef.current[i] = el; }}
                  className="relative h-[55%] overflow-hidden"
                  style={{ clipPath: 'inset(0 100% 0 0)', willChange: 'clip-path' }}
                >
                  <div className="inner-img absolute inset-0 flex items-center justify-center" style={{ scale: 1.15, willChange: 'transform' }}>
                    <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 36vw" />
                    <div className="absolute inset-0 bg-[#3A3532]/20 mix-blend-multiply" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-6 md:p-8 flex-1">
                  <div className="card-text flex items-center gap-3 opacity-0">
                    <span className="text-xs tracking-[0.2em] uppercase font-sans" style={{ color: card.accent }}>{card.step}</span>
                    <div className="flex-1 h-px" style={{ backgroundColor: `${card.accent}30` }} />
                    <span className="text-xs font-sans tracking-wider" style={{ color: `${card.accent}80` }}>{card.duration}</span>
                  </div>
                  <h3 className="card-text font-editorial text-xl md:text-2xl font-light leading-tight tracking-tight opacity-0" style={{ color: i === 0 ? '#3A3532' : i === 1 ? '#F5EFE6' : '#3A3532' }}>
                    {card.title}
                  </h3>
                  <p className="card-text text-xs leading-relaxed font-sans font-light opacity-0" style={{ color: i === 0 ? '#3A353280' : i === 1 ? '#F5EFE680' : '#3A353280' }}>
                    {card.description}
                  </p>
                  <div className="card-text mt-auto pt-3 border-t opacity-0 flex items-center justify-between" style={{ borderColor: `${card.accent}20` }}>
                    <p className="text-xs font-sans tracking-wide italic" style={{ color: card.accent }}>{card.benefit}</p>
                    <a href="#" className="text-xs font-sans tracking-wider hover:opacity-70 transition-opacity" style={{ color: card.accent }} data-hover="grow">→ Preview</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE: Clean vertical stack ───────────────────────────── */}
      <div className="md:hidden">
        {/* Mobile header */}
        <div className="editorial-container pt-14 pb-10">
          <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans block mb-3">
            The Daily Reset
          </span>
          <h2 className="font-editorial text-[#3A3532] text-4xl font-light leading-tight tracking-tight">
            Three rituals.<br />One complete system.
          </h2>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-1 pb-16">
          {ritualCards.map((card, i) => (
            <div
              key={`mobile-${card.step}`}
              ref={(el) => { if (el) mobileCardsRef.current[i] = el; }}
              className="w-full overflow-hidden"
              style={{
                backgroundColor: card.color,
                opacity: 0,
                transform: 'translateY(32px)',
                transition: 'opacity 0.65s ease, transform 0.65s ease',
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              {/* Image */}
              <div className="relative w-full" style={{ paddingBottom: '62%' }}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-[#3A3532]/15 mix-blend-multiply" />
              </div>

              {/* Text */}
              <div className="editorial-container py-8">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-xs tracking-[0.22em] uppercase font-sans"
                    style={{ color: card.accent }}
                  >
                    {card.step}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: `${card.accent}30` }} />
                  <span
                    className="text-xs font-sans tracking-wider"
                    style={{ color: `${card.accent}70` }}
                  >
                    {card.duration}
                  </span>
                </div>

                <h3
                  className="font-editorial text-2xl font-light leading-snug tracking-tight mb-4"
                  style={{ color: i === 1 ? '#F5EFE6' : '#3A3532' }}
                >
                  {card.title}
                </h3>

                <p
                  className="text-sm leading-relaxed font-sans font-light mb-6"
                  style={{ color: i === 1 ? 'rgba(245,239,230,0.65)' : 'rgba(58,53,50,0.60)' }}
                >
                  {card.description}
                </p>

                <div
                  className="pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: `${card.accent}25` }}
                >
                  <p
                    className="text-xs font-sans tracking-wide italic"
                    style={{ color: card.accent }}
                  >
                    {card.benefit}
                  </p>
                  <a href="#" className="text-xs font-sans tracking-wider" style={{ color: card.accent }}>→ Preview</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
