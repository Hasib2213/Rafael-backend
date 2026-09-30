"use client";
import React from "react";
import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Summaries",
      description: "Save hours every week. Get accurate, structured AI summaries that highlight key arguments, timestamps, and actionable notes.",
      image: "/images/summary.png",
      badge: "Intelligent NLP",
    },
    {
      title: "Audio Briefings",
      description: "Transform video transcripts into pleasant, podcast-quality audio summaries you can binge on the go.",
      image: "/images/audio.png",
      badge: "HD Voice Sync",
    },
    {
      title: "Personalized Feed",
      description: "A tailored morning and evening briefing feed aligned specifically with your learning goals and top creators.",
      image: "/images/feed.png",
      badge: "Smart Curation",
    },
  ];

  return (
    <section id="features" className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 py-12 sm:py-20">
      {/* Outer Curved Container */}
      <div className="relative rounded-[32px] sm:rounded-[48px] bg-figma-card border border-white/20 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-indigo-950/50">
        {/* Subtle Glow inside container */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#CB52FF]/20 blur-[150px] pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase bg-white/10 text-white/90 border border-white/20 mb-4">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-[1.2] tracking-[-0.02em]">
              Features
            </h2>
            <p className="text-[#D0D0D0] text-base sm:text-lg mt-3">
              Designed to supercharge your information absorption with state-of-the-art AI.
            </p>
          </div>

          {/* 3 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-figma-card-overlay border border-white/20 p-5 pb-8 flex flex-col items-center text-center shadow-lg shadow-black/20 hover:-translate-y-1.5 hover:border-white/40 transition-all duration-300 group"
              >
                {/* Artwork Container */}
                <div className="relative w-full h-[240px] sm:h-[260px] rounded-xl overflow-hidden mb-6 border border-white/15 bg-[#181F40]/80">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/15">
                    {item.badge}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3 px-2">
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#D0D0D0] text-base leading-[150%] font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
