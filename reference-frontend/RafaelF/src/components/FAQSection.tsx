"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // 0 is open by default as in Figma

  const faqs = [
    {
      question: "How does the platform work?",
      answer:
        "Our platform tracks the YouTube creators you follow and automatically detects new uploads. Each video is processed by AI to generate concise summaries and audio briefings, which are delivered to your personalized feed.",
    },
    {
      question: "Do I need to connect my YouTube account?",
      answer:
        "No, you do not need to share your YouTube login credentials. You can simply paste channel URLs, search for your favorite creators within Curio, or import a public subscription list.",
    },
    {
      question: "How accurate are the AI-generated summaries?",
      answer:
        "Curio uses advanced speech-to-text combined with fine-tuned large language models to ensure 98%+ contextual accuracy, preserving citations, key figures, and the creator's true intent.",
    },
    {
      question: "Can I listen to summaries instead of reading them?",
      answer:
        "Yes! Every summarized video automatically generates a studio-grade voice audio briefing so you can listen hands-free during commutes, workouts, or daily chores.",
    },
    {
      question: "Is the same video processed multiple times?",
      answer:
        "No. Once a video is processed by our AI pipeline, the cached summary and audio briefing are instantly available to all followers, eliminating duplicate compute and saving you time.",
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 py-16 sm:py-24">
      {/* Background Ambient Glow */}
      <div className="absolute -left-32 top-1/3 w-[500px] h-[500px] bg-[#CB52FF]/20 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: FAQ Titles & Still Have Questions Card */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-[1.2] tracking-[-0.02em]">
              Frequently Asked Questions?
            </h2>
            <p className="text-[#D0D0D0] text-lg sm:text-xl font-normal leading-[150%]">
              Got questions? We&apos;ve answered the most common ones.
            </p>
          </div>

          {/* Still Have Questions Box */}
          <div className="rounded-2xl bg-figma-primary/20 backdrop-blur-xl border border-white/20 p-6 sm:p-7 flex flex-col gap-6 shadow-xl">
            <div className="space-y-2.5">
              <h3 className="text-2xl sm:text-[28px] font-semibold text-white tracking-tight leading-snug">
                Still have questions?
              </h3>
              <p className="text-[#D0D0D0] text-sm sm:text-base leading-[150%]">
                Can&apos;t find the answer you&apos;re looking for? Reach out directly to our friendly support team.
              </p>
            </div>

            <Link
              href="mailto:info@curio.com"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg text-base font-semibold text-white bg-figma-btn shadow-lg shadow-purple-900/40 hover:opacity-95 transition-all self-start active:scale-[0.98]"
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#2563EB] shrink-0">
                <Mail className="w-4 h-4 text-[#2563EB]" />
              </div>
              <span>Send Email</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isOpen
                    ? "bg-figma-card border-white/30 shadow-xl shadow-indigo-950/40"
                    : "bg-white/[0.08] hover:bg-white/[0.12] border-white/15"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-medium text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#2563EB]" : "rotate-0"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-[#D0D0D0] text-base leading-[160%] font-normal animate-in fade-in-50 duration-200">
                    <p>{faq.answer}</p>
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
