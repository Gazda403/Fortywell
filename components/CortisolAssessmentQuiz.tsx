'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface Question {
  id: number;
  title: string;
  options: { label: string; impact: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: 'When do you notice lower-body fluid retention or leg heaviness most?',
    options: [
      { label: 'In the afternoon or end of work day', impact: 'High postural lymphatic stagnation' },
      { label: 'Right after intense workouts or running', impact: 'Exercise-induced cortisol spike' },
      { label: 'Upon waking up in the morning', impact: 'Overnight aldosterone activity' },
      { label: 'Persistently throughout the entire day', impact: 'Baseline metabolic & hormonal stress' },
    ],
  },
  {
    id: 2,
    title: 'How would you rate your current sleep and daily stress burden?',
    options: [
      { label: 'High stress, shallow sleep or waking up unrefreshed', impact: 'Elevated nocturnal cortisol' },
      { label: 'Moderate stress, occasional sleep interruptions', impact: 'Moderate autonomic imbalance' },
      { label: 'Low stress, but persistent fatigue after exercise', impact: 'Overtraining & adrenal strain' },
    ],
  },
  {
    id: 3,
    title: 'What has your exercise routine looked like recently?',
    options: [
      { label: 'HIIT, high-cardio, or intense spinning', impact: 'Vascular inflammatory trigger' },
      { label: 'Heavy weight training or long runs', impact: 'Structural connective tissue load' },
      { label: 'Light walking, pilates, or inconsistent movement', impact: 'Sub-optimal muscle pump activation' },
    ],
  },
];

export default function CortisolAssessmentQuiz() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  const handleSelect = (questionId: number, optionIdx: number) => {
    const newAnswers = { ...answers, [questionId]: optionIdx };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      gsap.to(quizRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        onComplete: () => {
          setStep(step + 1);
          gsap.to(quizRef.current, { opacity: 1, y: 0, duration: 0.35 });
        },
      });
    } else {
      gsap.to(quizRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          setIsCompleted(true);
          gsap.to(quizRef.current, { opacity: 1, y: 0, duration: 0.4 });
        },
      });
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setStep(0);
    setIsCompleted(false);
  };

  return (
    <section className="w-full bg-[#F5EFE6] border-b border-[#3A3532]/10 py-20 md:py-28 flex justify-center" aria-label="Cortisol Diagnostic Quiz">
      <div className="editorial-container w-full max-w-4xl mx-auto flex flex-col items-center gap-10">
        {/* Section Title */}
        <div className="text-center flex flex-col gap-3 items-center w-full max-w-xl">
          <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans">
            Interactive Diagnostic
          </span>
          <h2 className="font-editorial text-3xl md:text-5xl text-[#3A3532] font-light leading-tight">
            Assess Your Cortisol-Fluid Profile
          </h2>
          <p className="text-[#3A3532]/60 text-xs md:text-sm font-sans font-light max-w-md">
            Answer 3 quick questions to identify your specific fluid retention pattern and recommended reset protocol.
          </p>
        </div>

        {/* Quiz Container */}
        <div
          ref={quizRef}
          className="w-full bg-[#EFE8DC] border border-[#3A3532]/10 p-8 md:p-12 relative shadow-sm min-h-[340px] flex flex-col justify-between"
        >
          {!isCompleted ? (
            <>
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-6 border-b border-[#3A3532]/10 text-xs font-sans text-[#3A3532]/50">
                <span className="tracking-widest uppercase">Question {step + 1} of {questions.length}</span>
                <span className="text-[#92A975] font-editorial text-base">✦</span>
              </div>

              {/* Question */}
              <div className="my-6 flex flex-col gap-6">
                <h3 className="font-editorial text-xl md:text-2xl text-[#3A3532] font-light">
                  {questions[step].title}
                </h3>

                <div className="flex flex-col gap-3">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(questions[step].id, idx)}
                      data-hover="grow"
                      className="w-full text-left p-4 md:p-5 bg-[#F5EFE6] border border-[#3A3532]/10 hover:border-[#92A975] hover:bg-[#92A975]/5 text-[#3A3532] text-xs md:text-sm font-sans font-light tracking-wide transition-all duration-300 flex items-center justify-between group cursor-none"
                    >
                      <span>{opt.label}</span>
                      <span className="text-[#92A975] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Result Screen */
            <div className="flex flex-col gap-6 my-auto text-left py-4">
              <div className="flex items-center gap-3">
                <span className="text-[#92A975] text-xs tracking-[0.25em] uppercase font-sans font-medium">
                  Diagnostic Result
                </span>
                <span className="h-px bg-[#92A975]/30 flex-1" />
              </div>

              <h3 className="font-editorial text-2xl md:text-4xl text-[#3A3532] font-light leading-tight">
                High Cortisol & Postural Stagnation Profile Detected
              </h3>

              <div className="bg-[#F5EFE6] p-6 border-l-2 border-[#92A975] flex flex-col gap-2">
                <span className="text-[#92A975] text-xs font-sans uppercase tracking-wider font-semibold">
                  Primary Recommendation:
                </span>
                <p className="text-[#3A3532]/75 text-sm font-sans font-light leading-relaxed">
                  Your responses indicate that conventional high-intensity cardio is likely triggering aldosterone and sodium retention. Your body will benefit most from <strong>Morning Cortisol Calibration</strong> and <strong>Midday Lymphatic Pumping Protocols</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#3A3532]/10">
                <p className="text-xs text-[#3A3532]/50 font-sans">
                  The Fortywell Daily Reset is built specifically for this pattern.
                </p>
                <button
                  onClick={resetQuiz}
                  className="text-xs font-sans text-[#92A975] underline hover:text-[#3A3532] transition-colors"
                >
                  Retake Diagnostic
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
