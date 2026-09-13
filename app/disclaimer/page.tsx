import { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/BlogNavbar';
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical & Clinical Disclaimer — FortyWell',
  description:
    'Review the FortyWell Medical and Fitness Disclaimer. Understand our clinical perspective, health guidance boundaries, and professional physician consultation advice.',
  alternates: {
    canonical: 'https://fortywell-app.vercel.app/disclaimer',
  },
  openGraph: {
    title: 'Medical & Clinical Disclaimer — FortyWell',
    description: 'Important medical and clinical guidance information regarding FortyWell protocols.',
    url: 'https://fortywell-app.vercel.app/disclaimer',
    type: 'website',
  },
};

export default function DisclaimerPage() {
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
          <span className="text-[#2A2320] font-medium">Medical Disclaimer</span>
        </nav>

        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-[#2A2320]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C96374]/15 border border-[#C96374]/30 w-fit">
            <AlertCircle size={14} className="text-[#C96374]" />
            <span className="text-[#C96374] text-[11px] tracking-[0.2em] uppercase font-bold">
              Health & Safety Notice
            </span>
          </div>

          <h1 className="font-editorial text-4xl md:text-5xl font-light text-[#2A2320] tracking-tight">
            Medical & Clinical Disclaimer
          </h1>

          <p className="text-sm text-[#7E726B]">
            Last updated: September 6, 2026 · FortyWell Clinical Editorial Board
          </p>
        </header>

        {/* Content Body */}
        <article className="flex flex-col gap-10 text-[#3A332F] text-base leading-relaxed font-light">
          <div className="bg-[#FAF2F4] border-l-4 border-[#C96374] p-6 rounded-r-2xl">
            <h2 className="font-editorial text-xl md:text-2xl text-[#2A2320] font-normal mb-2">
              Summary Notice
            </h2>
            <p className="text-sm md:text-base text-[#4A403A]">
              The content, articles, diagnostic quizzes, and movement sequences presented on FortyWell are designed strictly for educational, informational, and general wellness purposes. They are not intended as a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              1. Not Medical or Prescriptive Advice
            </h2>
            <p>
              While FortyWell content is curated in collaboration with licensed naturopathic doctors, physical therapists, and musculoskeletal clinicians, viewing this website or participating in our routines does not establish a doctor-patient relationship.
            </p>
            <p>
              Never disregard professional medical advice or delay seeking it because of something you have read on FortyWell. If you believe you may be experiencing a medical emergency (such as severe chest tightness, sudden asymmetric leg swelling with heat or redness, or acute pain), call your local emergency services immediately.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              2. Individual Musculoskeletal Differences
            </h2>
            <p>
              Although FortyWell exercises are specifically designed as zero-impact, low-load somatic protocols, physical tolerance varies widely between individuals. If at any point during a movement sequence you experience sharp pain, dizziness, severe shortness of breath, or discomfort, stop immediately and rest.
            </p>
            <p>
              Women diagnosed with conditions such as deep vein thrombosis (DVT), severe congestive heart failure, acute lymphedema, severe osteoporosis with vertebral fractures, or recent joint replacement should obtain clearance from their specialist before performing inversions or leg drainage protocols.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              3. Diagnostic Assessment Scope
            </h2>
            <p>
              Our Cortisol Assessment Quiz is a self-reflective educational questionnaire designed to identify behavioral and lifestyle patterns associated with sympathetic overdrive. It does not measure clinical salivary, serum, or urinary cortisol levels and cannot diagnose adrenal insufficiency, Cushing’s disease, thyroid disorders, or endocrine pathology.
            </p>
          </section>

          <section className="flex flex-col gap-4 border-t border-[#2A2320]/10 pt-8">
            <h2 className="font-editorial text-2xl md:text-3xl text-[#2A2320] font-normal">
              4. Contact Our Clinical Advisory
            </h2>
            <p>
              If you have inquiries regarding our clinical citations, literature references, or medical sources, please email:
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
