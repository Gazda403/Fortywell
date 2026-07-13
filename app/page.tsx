import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import HeroSection from '@/components/HeroSection';
import PillarRow from '@/components/PillarRow';
import PinnedMoment from '@/components/PinnedMoment';
import HorizontalScrollGallery from '@/components/HorizontalScrollGallery';
import LeadCaptureFooter from '@/components/LeadCaptureFooter';

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

        {/* 4 ─ Horizontal scroll gallery: 3-Step Daily Reset Ritual with clip-path reveals */}
        <HorizontalScrollGallery />

        {/* 5 ─ Lead capture footer: Animated counters + email registration */}
        <LeadCaptureFooter />
      </main>
    </SmoothScrollProvider>
  );
}
