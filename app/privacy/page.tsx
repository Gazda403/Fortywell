import { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/BlogNavbar';
import { Shield, Lock, FileText, ArrowLeft, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — FortyWell',
  description:
    'Read the FortyWell Privacy Policy. Learn how we handle your personal data, hormone rhythm preferences, and health data with encryption and care.',
  alternates: {
    canonical: 'https://fortywell-app.vercel.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — FortyWell',
    description: 'Learn how FortyWell protects your personal data and health wellness records.',
    url: 'https://fortywell-app.vercel.app/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2320] flex flex-col font-sans selection:bg-[#C96374]/20">
      <BlogNavbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col gap-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7E726B]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#C96374] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#2A2320] font-medium">Privacy Policy</span>
        </nav>

        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-[#2A2320]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#92A975]/15 border border-[#92A975]/30 w-fit">
            <Shield size={14} className="text-[#92A975]" />
            <span className="text-[#92A975] text-[11px] tracking-[0.2em] uppercase font-bold">
              Data Protection & Trust
            </span>
          </div>

          <h1 className="font-editorial text-4xl md:text-5xl font-light text-[#2A2320] tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-sm text-[#7E726B]">
            Last updated: September 6, 2026 · Effective immediately
          </p>
        </header>

        {/* Content Body */}
        <article className="flex flex-col gap-10 text-[#3A332F] text-base leading-relaxed font-light">
          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              1. Our Commitment to Your Privacy
            </h2>
            <p>
              At FortyWell (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), we recognize that health and hormonal wellness are deeply personal. This Privacy Policy outlines how we collect, use, protect, and handle your information when you visit our website (https://fortywell-app.vercel.app), access our digital assessments, and interact with our movement and coaching services.
            </p>
            <p>
              We adhere to strict data minimization principles: we collect only what is strictly necessary to deliver personalized cortisol-conscious movement routines, improve our clinical content, and support your longevity journey.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              2. Information We Collect
            </h2>
            <p>We may collect information in the following categories:</p>
            <ul className="flex flex-col gap-2.5 pl-4 list-disc text-sm md:text-base">
              <li>
                <strong>Contact Information:</strong> Your name and email address when you register for a waitlist, download a clinical guide, or contact support.
              </li>
              <li>
                <strong>Self-Reported Wellness & Rhythm Data:</strong> Answers provided in the Cortisol Assessment Quiz, including reported energy patterns, lower-body fluid sensations, and cycle stage observations. This data is used solely to calibrate movement recommendations.
              </li>
              <li>
                <strong>Transaction Data:</strong> If you purchase digital apothecary products or memberships, payments are securely processed by third-party processors (such as PayPal). We never store your full payment card number on our servers.
              </li>
              <li>
                <strong>Technical & Usage Analytics:</strong> IP addresses, browser types, referral URLs, and page navigation patterns collected via privacy-first analytics tools.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              3. How We Use Your Data
            </h2>
            <p>We use your data to:</p>
            <ul className="flex flex-col gap-2 pl-4 list-disc text-sm md:text-base">
              <li>Deliver your customized 15-minute daily reset and cortisol recommendations.</li>
              <li>Email you the free clinical guides or diagnostic reports you requested.</li>
              <li>Improve site performance, user experience, and article readability.</li>
              <li>Respond to inquiries, customer service requests, and feedback.</li>
            </ul>
            <div className="bg-[#FAF2F4] border-l-4 border-[#C96374] p-5 rounded-r-xl my-2">
              <p className="text-sm text-[#4A403A] font-normal">
                <strong>We do NOT sell your data:</strong> FortyWell never sells, rents, or monetizes your personal health or contact details to third-party data brokers or advertising networks.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              4. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard encryption protocols (TLS/HTTPS in transit, AES-256 at rest) to safeguard your data against unauthorized access, loss, or misuse. Access to user records is strictly restricted to authorized staff who require it for operational duties.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              5. Your Rights & Choices
            </h2>
            <p>
              Depending on your location (including the European Economic Area, UK, and California), you possess fundamental rights regarding your personal data:
            </p>
            <ul className="flex flex-col gap-2 pl-4 list-disc text-sm md:text-base">
              <li>The right to access and receive a copy of your personal data.</li>
              <li>The right to request rectification of inaccurate records.</li>
              <li>The right to request deletion of your information (&ldquo;right to be forgotten&rdquo;).</li>
              <li>The right to unsubscribe from marketing or editorial emails at any time via the one-click unsubscribe link in any email.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-4 border-t border-[#2A2320]/10 pt-8">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              6. Contact Our Privacy Team
            </h2>
            <p>
              If you have any questions, requests, or concerns regarding this policy, please contact our data privacy representative:
            </p>
            <div className="flex items-center gap-3 text-sm text-[#2A2320] font-medium pt-2">
              <Mail size={16} className="text-[#C96374]" />
              <a href="mailto:support@fortywell.com" className="hover:underline text-[#C96374]">
                support@fortywell.com
              </a>
            </div>
          </section>
        </article>

        {/* Return link */}
        <div className="pt-6 border-t border-[#2A2320]/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#C96374] hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Return to FortyWell Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
