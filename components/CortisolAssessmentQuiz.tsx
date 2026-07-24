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
        y: -12,
        duration: 0.25,
        onComplete: () => {
          setStep(step + 1);
          gsap.to(quizRef.current, { opacity: 1, y: 0, duration: 0.35 });
        },
      });
    } else {
      gsap.to(quizRef.current, {
        opacity: 0,
        y: -12,
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
    <section className="w-full bg-[#F5EFE6] border-b border-[#3A3532]/10 py-24 md:py-36" aria-label="Cortisol Diagnostic Quiz">
      <div className="editorial-container max-w-5xl mx-auto flex flex-col items-center gap-12 text-center">
        {/* Section Header */}
        <div className="flex flex-col gap-4 items-center max-w-2xl">
          <span className="text-[#92A975] text-xs tracking-[0.3em] uppercase font-sans font-medium">
            Interactive Assessment
          </span>
          <h2 className="font-editorial text-4xl md:text-6xl text-[#3A3532] font-light leading-tight">
            Assess Your Cortisol Profile
          </h2>
          <p className="text-[#3A3532]/60 text-xs md:text-base font-sans font-light leading-relaxed">
            Answer 3 quick questions to identify your specific fluid retention pattern and recommended reset protocol.
          </p>
        </div>

        {/* Main Quiz Box */}
        <div
          ref={quizRef}
          className="w-full bg-[#EFE8DC] border border-[#3A3532]/12 p-8 md:p-14 shadow-sm min-h-[420px] flex flex-col justify-between"
        >
          {!isCompleted ? (
            <>
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-6 border-b border-[#3A3532]/10 text-xs font-sans text-[#3A3532]/50 tracking-wider">
                <span className="uppercase">Question 0{step + 1} / 0{questions.length}</span>
                <div className="flex gap-2 items-center">
                  {questions.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === step ? 'w-6 bg-[#92A975]' : 'w-1.5 bg-[#3A3532]/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Body */}
              <div className="my-8 flex flex-col items-center gap-8">
                <h3 className="font-editorial text-2xl md:text-4xl text-[#3A3532] font-light max-w-3xl leading-snug">
                  {questions[step].title}
                </h3>

                {/* Option Grid (2 Columns on Desktop) */}
                <div className={`w-full grid gap-4 ${questions[step].options.length > 3 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(questions[step].id, idx)}
                      data-hover="olive"
                      className="group relative text-left p-6 md:p-8 bg-[#F5EFE6] border border-[#3A3532]/10 hover:border-[#92A975] hover:bg-[#92A975]/10 text-[#3A3532] transition-all duration-300 flex flex-col justify-between gap-4 cursor-none"
                    >
                      <span className="text-sm md:text-base font-sans font-light leading-relaxed">
                        {opt.label}
                      </span>
                      <div className="flex items-center justify-between text-xs text-[#92A975] font-sans pt-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#3A3532]/40 group-hover:text-[#92A975] transition-colors">Select option</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Result Screen */
            <div className="flex flex-col items-center gap-8 my-auto py-6 text-center max-w-3xl mx-auto">
              <span className="text-[#92A975] text-xs tracking-[0.3em] uppercase font-sans font-medium">
                ✦ Assessment Complete
              </span>

              <h3 className="font-editorial text-3xl md:text-5xl text-[#3A3532] font-light leading-tight">
                High Cortisol & Postural Stagnation Profile Detected
              </h3>

              <div className="bg-[#F5EFE6] p-8 border-l-4 border-[#92A975] text-left flex flex-col gap-3">
                <span className="text-[#92A975] text-xs font-sans uppercase tracking-widest font-semibold">
                  Personalized Recommendation:
                </span>
                <p className="text-[#3A3532]/80 text-sm md:text-base font-sans font-light leading-relaxed">
                  Your responses indicate that conventional high-intensity cardio is triggering elevated aldosterone and sodium retention. Your body will benefit most from <strong>Morning Cortisol Calibration</strong> and <strong>Midday Lymphatic Pumping Protocols</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full pt-6 border-t border-[#3A3532]/10">
                <p className="text-xs text-[#3A3532]/60 font-sans">
                  The Fortywell Daily Reset is engineered specifically for this pattern.
                </p>
                <button
                  onClick={resetQuiz}
                  className="text-xs font-sans tracking-wider uppercase text-[#92A975] hover:text-[#3A3532] underline transition-colors"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

