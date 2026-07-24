import dynamic from 'next/dynamic';
import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import HeroSection from '@/components/HeroSection';
import PillarRow from '@/components/PillarRow';

// Lazy load below-the-fold heavy components to improve initial page load speed
const PinnedMoment = dynamic(() => import('@/components/PinnedMoment'), { ssr: true });
const ExpertAdvisory = dynamic(() => import('@/components/ExpertAdvisory'), { ssr: true });
const HorizontalScrollGallery = dynamic(() => import('@/components/HorizontalScrollGallery'), { ssr: true });
const CortisolAssessmentQuiz = dynamic(() => import('@/components/CortisolAssessmentQuiz'), { ssr: true });
const LeadCaptureFooter = dynamic(() => import('@/components/LeadCaptureFooter'), { ssr: true });

export default function Home() {
  return (
    <SmoothScrollProvider>
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

        {/* 7 ─ Lead capture footer: Animated counters + email registration */}
        <LeadCaptureFooter />
      </main>
    </SmoothScrollProvider>
  );
}
