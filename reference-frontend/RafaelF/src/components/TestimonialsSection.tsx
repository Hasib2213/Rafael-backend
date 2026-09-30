"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Alex Reed",
      role: "Product Manager @ TechFlow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      quote:
        "This platform completely changed how I consume YouTube content. I used to spend 15+ hours a week watching podcasts and tech talks. Now I listen to 5-minute audio briefings on my morning commute and never miss key insights.",
    },
    {
      name: "Marcus Vance",
      role: "Lead Software Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      quote:
        "The accuracy of the AI analysis is phenomenal. It pinpoints the exact technical details and code architectures discussed without any fluff or filler. Best productivity investment I've made all year.",
    },
    {
      name: "Sarah Chen",
      role: "Venture Capitalist & Researcher",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      quote:
        "I monitor over 40 creator channels across AI, economics, and biotechnology. Curio's personalized feed and audio summaries save my team dozens of hours of manual synthesis every single week.",
    },
    {
      name: "David Kim",
      role: "Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      quote:
        "Listening to summaries while working out or cooking has transformed my downtime into high-leverage learning. The voices sound completely natural and enjoyable.",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 py-16 sm:py-24">
      {/* Top Banner: Hero Imagery & "Trusted by 200+ Individuals" */}
      <div className="relative rounded-[32px] sm:rounded-[48px] overflow-hidden bg-figma-card border border-white/20 p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Photo: Server Room & High-Tech Engineers */}
          <div className="lg:col-span-4 relative h-60 sm:h-72 rounded-[28px] overflow-hidden border border-white/15 shadow-lg group">
            <Image
              src="/images/server_room.png"
              alt="Data Infrastructure Team"
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
          </div>

          {/* Center: Trusted By Headline */}
          <div className="lg:col-span-4 text-center py-4 flex flex-col items-center justify-center space-y-2">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/80">
              <span>Trusted</span>
              <Star className="w-5 h-5 fill-[#FFB216] text-[#FFB216]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              by <span className="text-[#3E8AFB]">200+</span> Individuals
            </h2>
            <p className="text-[#D0D0D0] text-sm sm:text-base max-w-xs mx-auto">
              Engineers, researchers, executives, and lifelong learners rely on Curio daily.
            </p>
          </div>

          {/* Right Photo: Happy Professional User with Headphones */}
          <div className="lg:col-span-4 relative h-60 sm:h-72 rounded-[28px] overflow-hidden border border-white/15 shadow-lg group">
            <Image
              src="/images/happy_user.png"
              alt="Satisfied Learner Listening with Headphones"
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white/[0.12] backdrop-blur-xl border border-white/20 p-7 flex flex-col justify-between shadow-xl shadow-black/20 hover:border-white/40 transition-all duration-300 min-h-[318px]"
          >
            <div className="space-y-4">
              {/* 5 Golden Stars */}
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, starIdx) => (
                  <Star
                    key={starIdx}
                    className="w-5 h-5 fill-[#FFB216] text-[#FFB216]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white text-base sm:text-[17px] leading-[150%] font-normal italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-3.5 pt-6 border-t border-white/10 mt-6">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/30 shrink-0">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-white font-semibold text-base leading-tight">
                  {item.name}
                </h4>
                <p className="text-[#D0D0D0] text-sm truncate">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="w-12 h-12 rounded-xl bg-figma-primary text-white flex items-center justify-center shadow-md shadow-blue-700/30 hover:opacity-90 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 text-white flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
