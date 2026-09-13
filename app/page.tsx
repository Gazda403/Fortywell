import dynamic from 'next/dynamic';
import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import HeroSection from '@/components/HeroSection';
import PillarRow from '@/components/PillarRow';
import { FAQ_ITEMS } from '@/lib/faqData';

// Lazy load below-the-fold heavy components to improve initial page load speed
const PinnedMoment = dynamic(() => import('@/components/PinnedMoment'), { ssr: true });
const ExpertAdvisory = dynamic(() => import('@/components/ExpertAdvisory'), { ssr: true });
const HorizontalScrollGallery = dynamic(() => import('@/components/HorizontalScrollGallery'), { ssr: true });
const CortisolAssessmentQuiz = dynamic(() => import('@/components/CortisolAssessmentQuiz'), { ssr: true });
const FaqSection = dynamic(() => import('@/components/FaqSection'), { ssr: true });
const LeadMagnetSection = dynamic(() => import('@/components/LeadMagnetSection'), { ssr: true });
const LeadCaptureFooter = dynamic(() => import('@/components/LeadCaptureFooter'), { ssr: true });

// ─── Homepage Structured Data Schemas ────────────────────────────────────────
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. WebPage entity
    {
      "@type": "WebPage",
      "@id": "https://fortywell-app.vercel.app/#webpage",
      "url": "https://fortywell-app.vercel.app",
      "name": "FortyWell — Cortisol-Conscious Fitness & Hormone Wellness for Women Over 40",
      "description": "A science-backed, cortisol-conscious movement program for women over 40. Relieve lower-body fluid retention, heavy legs, and metabolic stress.",
      "isPartOf": { "@id": "https://fortywell-app.vercel.app/#website" },
      "about": { "@id": "https://fortywell-app.vercel.app/#organization" },
      "inLanguage": "en-US",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://fortywell-app.vercel.app/0709.png",
        "width": 1200,
        "height": 630
      }
    },
    // 2. FAQPage schema matching visible FAQ items verbatim
    {
      "@type": "FAQPage",
      "@id": "https://fortywell-app.vercel.app/#faq",
      "mainEntity": FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    },
    // 3. HowTo schema for 3-Step Daily Reset Ritual (Google Rich Snippets)
    {
      "@type": "HowTo",
      "@id": "https://fortywell-app.vercel.app/#howto-ritual",
      "name": "The FortyWell 3-Step Daily Reset Ritual for Women Over 40",
      "description": "A 35-minute daily somatic reset to flush lower-body fluid retention, calibrate cortisol, and improve sleep without high-impact cardio.",
      "totalTime": "PT35M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Yoga Mat or Carpeted Floor (Optional)"
        },
        {
          "@type": "HowToTool",
          "name": "Wall or Elevated Couch for Leg Elevation"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Step 01: Morning Cortisol Calm",
          "text": "Perform a gentle, lymph-activating sequence within 30 minutes of waking. Low-to-ground somatic movements signal safety to the nervous system, lowering baseline cortisol before the day's demands accumulate.",
          "timeRequired": "PT12M",
          "image": "https://fortywell-app.vercel.app/pexels-paolo-ortega-155343406-10893352.jpg"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Step 02: Midday Drainage Reset",
          "text": "Execute a targeted lymphatic drainage sequence for the lower body during the post-lunch dip. Inverted positions and rhythmic soleus muscle pumping accelerate interstitial fluid clearance from calves and ankles.",
          "timeRequired": "PT8M",
          "image": "https://fortywell-app.vercel.app/pexels-vlada-karpovich-8939848.jpg"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Step 03: Evening Parasympathetic Wind-Down",
          "text": "Engage parasympathetic activation through restorative inversions and diaphragmatic breathwork. Elevate legs at 90 degrees above heart level to leverage gravity and trigger the vagal brake for uninterrupted sleep.",
          "timeRequired": "PT15M",
          "image": "https://fortywell-app.vercel.app/pexels-pavel-danilyuk-7801519.jpg"
        }
      ]
    }
  ]
};

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Homepage-specific JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />

      {/* Custom editorial cursor */}
      <CustomCursor />

      <main id="main-content">
        {/* 1 ─ Hero: Asymmetric editorial cover with curtain reveal */}
        <HeroSection />

        {/* 2 ─ Pillar bar: Four value pillars, razor-thin border separators */}
        <PillarRow />

        {/* 3 ─ Pinned moment: Left column pins, right scrolls through cortisol science */}
        <PinnedMoment />

        {/* 4 ─ Clinical & Expert Rationale */}
        <ExpertAdvisory />

        {/* 5 ─ Horizontal scroll gallery: 3-Step Daily Reset Ritual with clip-path reveals */}
        <HorizontalScrollGallery />

        {/* 6 ─ Interactive Diagnostic Assessment */}
        <CortisolAssessmentQuiz />

        {/* 7 ─ Frequently Asked Questions & Clinical Guidance (SEO & Rich Results) */}
        <FaqSection />

        {/* 8 ─ Free Downloadable Clinical Guides (Lead Magnet Gate) */}
        <LeadMagnetSection />

        {/* 9 ─ Lead capture footer: Animated counters + email registration */}
        <LeadCaptureFooter />
      </main>
    </SmoothScrollProvider>
  );
}

