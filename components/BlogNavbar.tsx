'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WaitlistModal from '@/components/WaitlistModal';

export default function BlogNavbar() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-[#201C1A] border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Fortywell logo"
              width={34}
              height={34}
              priority
              className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="flex flex-col">
              <span className="font-editorial text-[#F5EFE6] text-xl tracking-wide leading-tight">
                Fortywell
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#92A975] font-semibold">
                Journal
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#pillars"
              className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors"
            >
              The Method
            </Link>
            <Link
              href="/#science"
              className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors"
            >
              Science
            </Link>
            <Link
              href="/#free-guides"
              className="text-[#F5EFE6]/60 text-xs tracking-[0.15em] uppercase font-sans hover:text-[#F5EFE6] transition-colors"
            >
              Free Guides
            </Link>
            <Link
              href="/blog"
              className="text-[#92A975] text-xs tracking-[0.15em] uppercase font-sans font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Journal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#92A975]" />
            </Link>
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsWaitlistOpen(true)}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#92A975] hover:bg-[#a8c28a] text-[#181514] font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer shadow-sm"
            >
              Join Waitlist
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#F5EFE6]/90 p-2 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1C1816] border-b border-white/10 px-6 py-5 flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase font-sans tracking-[0.16em] text-[#F5EFE6]/80 hover:text-white py-1"
            >
              Home
            </Link>
            <Link
              href="/#pillars"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase font-sans tracking-[0.16em] text-[#F5EFE6]/80 hover:text-white py-1"
            >
              The Method
            </Link>
            <Link
              href="/#science"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase font-sans tracking-[0.16em] text-[#F5EFE6]/80 hover:text-white py-1"
            >
              Science
            </Link>
            <Link
              href="/#free-guides"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase font-sans tracking-[0.16em] text-[#F5EFE6]/80 hover:text-white py-1"
            >
              Free Clinical Guides
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase font-sans tracking-[0.16em] text-[#92A975] font-semibold py-1"
            >
              The Journal (All Articles)
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsWaitlistOpen(true);
              }}
              className="w-full mt-2 py-3 rounded-full bg-[#92A975] text-[#181514] font-sans text-xs uppercase tracking-[0.14em] font-semibold text-center"
            >
              Join Early Access Waitlist
            </button>
          </div>
        )}
      </header>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  );
}
