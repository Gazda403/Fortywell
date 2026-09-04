'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Fluid Retention & Heavy Legs',
    question: 'Why do women over 40 experience lower-body fluid retention and heavy legs?',
    answer:
      'After 40, fluctuating estrogen levels and elevated baseline cortisol disrupt aldosterone regulation—the hormone that balances fluid retention and sodium. When physical or emotional stress spikes, interstitial fluid accumulates in the calves, ankles, and thighs, creating a sensation of heavy, exhausted legs. FortyWell utilizes somatic inversions and rhythmic skeletal muscle pumps to accelerate lymphatic drainage and clear trapped fluid without triggering inflammatory stress.',
  },
  {
    category: 'Cortisol-Conscious Fitness',
    question: 'What is a cortisol-conscious workout and how does it differ from traditional HIIT?',
    answer:
      'Traditional high-intensity interval training (HIIT) can trigger massive cortisol spikes in perimenopausal and menopausal women, leading to adrenal fatigue, stubborn belly fat retention, and joint inflammation. A cortisol-conscious workout prioritizes parasympathetic nervous system safety, tempo-controlled isometric holds, and restorative pacing. It builds lean muscle and bone density while keeping your body in an optimal fat-burning, low-inflammation metabolic state.',
  },
  {
    category: 'Joint Health & Hormones',
    question: 'How does FortyWell protect joints, knees, and pelvic floor health during perimenopause?',
    answer:
      'Declining estrogen reduces collagen synthesis and synovial joint lubrication, making standard jumping and heavy impact risky for knees, lower back, and pelvic floor integrity. FortyWell exercises are 100% low-impact, joint-calibrated protocols focusing on deep core bracing, glute ignition, and segmental spinal mobility to preserve joint longevity and prevent injury.',
  },
  {
    category: 'Hormonal Rhythm Adaptation',
    question: 'How does hormonal stage and cycle tracking adapt my daily workouts?',
    answer:
      'Your physical capacity naturally shifts across follicular, ovulatory, and luteal phases. FortyWell dynamically adjusts exercise intensity, volume, and recovery recommendations based on your reported energy, sleep quality, and cycle phase. When estrogen peaks, we introduce strength stimulus; when progesterone rises or fatigue appears, we shift seamlessly to restorative wind-down protocols.',
  },
  {
    category: 'Results & Consistency',
    question: 'How quickly will I feel relief from sluggishness and lower-body puffiness?',
    answer:
      'Most women report a noticeable reduction in evening leg heaviness and puffiness within the first 7 to 10 days of consistent 15-minute daily resets. Improved morning joint fluidity, deeper sleep quality, and calmer daytime energy typically consolidate over 3 to 4 weeks of cortisol-calibrated movement.',
  },
  {
    category: 'Bone Density & Safety',
    question: 'Is FortyWell safe if I have osteoporosis or low bone density?',
    answer:
      'Yes. FortyWell is specifically engineered for the post-40 musculoskeletal profile. All protocols are zero-impact or low-impact and include progressive loading for bone density stimulus without vertebral compression or joint shear. Our isometric and resisted bodyweight sequences stimulate osteoblast activity—the cells responsible for bone formation—in a safe, controlled range.',
  },
  {
    category: 'Hormonal Belly Fat',
    question: 'Can FortyWell help with perimenopause belly fat and cortisol belly?',
    answer:
      "Chronic cortisol elevation promotes visceral fat accumulation around the midsection in perimenopausal women. FortyWell's cortisol-pacing protocols—using zone 2 cardio, somatic breathwork, and parasympathetic nervous system resets—systematically lower baseline cortisol, improving insulin sensitivity and reducing hormonal belly fat accumulation over 4 to 6 weeks of consistent practice.",
  },
  {
    category: 'Perimenopause vs Menopause',
    question: 'What is the difference between perimenopause and menopause workouts?',
    answer:
      'In perimenopause, hormone fluctuation means your capacity changes cycle to cycle. FortyWell adapts daily to your reported energy, phase, and sleep quality. In post-menopause, estrogen is consistently lower, so we apply steady muscle-protective strength protocols with longer recovery windows and higher emphasis on lymphatic and circulatory support to reduce stagnation and improve vascular tone.',
  },
  {
    category: 'Equipment & Access',
    question: 'Do I need any equipment to use FortyWell workouts?',
    answer:
      'No equipment is required. All FortyWell daily resets and somatic protocols are 100% bodyweight-based and designed for a small space at home. Optional props like a yoga strap, light resistance band, or rolled mat can enhance some protocols, but the core program is entirely equipment-free.',
  },
  {
    category: 'FortyWell vs Yoga & Pilates',
    question: 'How is FortyWell different from regular yoga or Pilates for women over 40?',
    answer:
      'While yoga and Pilates offer mobility and core benefits, FortyWell specifically integrates hormonal phase tracking, cortisol management sequencing, lymphatic drainage protocols, and bone density stimulus into a unified adaptive system. We combine the breathwork and somatic principles of yoga with progressive strength loading and hormone-rhythm awareness that standard yoga or Pilates classes do not address.',
  },
];


export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#FAF7F2] text-[#2A2320] border-t border-[#2A2320]/10 py-20 md:py-28"
      aria-label="Frequently Asked Questions"
    >
      <div className="editorial-container flex flex-col gap-14 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <span className="text-[#C96374] text-xs tracking-[0.28em] uppercase font-sans font-semibold">
            Questions & Clinical Guidance
          </span>
          <h2 className="font-editorial text-3xl md:text-5xl font-light text-[#2A2320] leading-tight tracking-tight">
            Understanding your body after 40
          </h2>
          <p className="text-[#5A4F48] text-sm md:text-base font-sans font-light max-w-2xl leading-relaxed">
            Evidence-informed answers on cortisol management, perimenopausal fluid kinetics, and joint-safe somatic strength.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col divide-y divide-[#2A2320]/10 border-y border-[#2A2320]/10">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question} className="py-6 md:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C96374] rounded-sm cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#92A975] font-sans font-medium">
                      {item.category}
                    </span>
                    <h3 className="font-editorial text-xl md:text-2xl text-[#2A2320] group-hover:text-[#C96374] transition-colors leading-snug">
                      {item.question}
                    </h3>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border border-[#2A2320]/15 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#C96374] border-[#C96374] text-white' : 'bg-white text-[#2A2320] group-hover:border-[#C96374]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="pt-5 pr-8 md:pr-14"
                  >
                    <p className="text-[#5A4F48] text-sm md:text-[15px] font-sans font-normal leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
