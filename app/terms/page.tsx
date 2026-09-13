import { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/BlogNavbar';
import { FileText, ArrowLeft, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — FortyWell',
  description:
    'Review the Terms of Service governing your use of FortyWell website, applications, assessments, and digital wellness programs.',
  alternates: {
    canonical: 'https://fortywell-app.vercel.app/terms',
  },
  openGraph: {
    title: 'Terms of Service — FortyWell',
    description: 'Terms and conditions for FortyWell wellness programs, subscriptions, and materials.',
    url: 'https://fortywell-app.vercel.app/terms',
    type: 'website',
  },
};

export default function TermsPage() {
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
          <span className="text-[#2A2320] font-medium">Terms of Service</span>
        </nav>

        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-[#2A2320]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#92A975]/15 border border-[#92A975]/30 w-fit">
            <FileText size={14} className="text-[#92A975]" />
            <span className="text-[#92A975] text-[11px] tracking-[0.2em] uppercase font-bold">
              Legal Agreement
            </span>
          </div>

          <h1 className="font-editorial text-4xl md:text-5xl font-light text-[#2A2320] tracking-tight">
            Terms of Service
          </h1>

          <p className="text-sm text-[#7E726B]">
            Last updated: September 6, 2026 · Effective immediately
          </p>
        </header>

        {/* Content Body */}
        <article className="flex flex-col gap-10 text-[#3A332F] text-base leading-relaxed font-light">
          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the website at https://fortywell-app.vercel.app, engaging with FortyWell assessments, or utilizing any of our movement guides, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              2. Educational & Wellness Scope
            </h2>
            <p>
              FortyWell provides educational movement sequences, somatic pacing rituals, and lifestyle wellness recommendations designed for women navigating midlife hormone fluctuations. <strong>FortyWell does not provide medical treatment, clinical diagnosis, or prescriptive therapy.</strong>
            </p>
            <p>
              Always consult with a licensed physician, gynecologist, or healthcare professional before beginning any new physical movement program, especially if you have chronic medical conditions, low bone density, cardiovascular history, or recent surgery.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content on FortyWell—including but not limited to text, graphics, proprietary movement names, illustrations, video sequences, downloadable PDF guides, and software code—is the property of FortyWell and is protected by international copyright, trademark, and intellectual property laws.
            </p>
            <p>
              You are granted a personal, non-commercial, revocable license to access our materials for your own personal wellness practice. You may not republish, distribute, re-sell, or reverse-engineer FortyWell protocols without express written consent.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              4. Purchases & Refunds
            </h2>
            <p>
              Any purchases of digital guides, apothecary kits, or trial memberships made through FortyWell are subject to the specific terms disclosed at checkout. If you encounter any technical difficulty or billing inquiry, our customer support team will assist you within 2 business days.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, FortyWell and its officers, directors, clinical advisory board members, and employees shall not be liable for any indirect, incidental, special, or consequential damages resulting from your participation in any movement protocols or reliance on information presented on the site.
            </p>
          </section>

          <section className="flex flex-col gap-4 border-t border-[#2A2320]/10 pt-8">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              6. Inquiries & Contact
            </h2>
            <p>
              For legal inquiries, copyright notices, or questions regarding these terms, please contact:
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
