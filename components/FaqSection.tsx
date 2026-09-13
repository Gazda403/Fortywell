'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS, type FaqItem } from '@/lib/faqData';

export { FAQ_ITEMS, type FaqItem };


export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#FAF7F2] text-[#2A2320] border-t border-[#2A2320]/10 py-20 md:py-28 flex justify-center"
      aria-label="Frequently Asked Questions"
    >
      <div className="editorial-container flex flex-col gap-14 max-w-4xl mx-auto w-full items-center">
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto">
          <span className="text-[#C96374] text-xs tracking-[0.28em] uppercase font-sans font-semibold text-center">
            Questions & Clinical Guidance
          </span>
          <h2 className="font-editorial text-3xl md:text-5xl font-light text-[#2A2320] leading-tight tracking-tight text-center">
            Understanding your body after 40
          </h2>
          <p className="text-[#5A4F48] text-sm md:text-base font-sans font-light max-w-2xl text-center leading-relaxed">
            Evidence-informed answers on cortisol management, perimenopausal fluid kinetics, and joint-safe somatic strength.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="w-full flex flex-col divide-y divide-[#2A2320]/10 border-y border-[#2A2320]/10">
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
