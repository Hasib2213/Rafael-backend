"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [activeAction, setActiveAction] = useState<"get-started" | "contact">("get-started");

  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 pt-6 sm:pt-10">
      {/* Background Ambient Glow Behind Hero */}
      <div className="absolute -top-32 -left-32 w-[592px] h-[693px] bg-[#CB52FF]/30 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-20 -right-20 w-[528px] h-[618px] bg-[#CB52FF]/25 blur-[180px] pointer-events-none rounded-full" />

      {/* Main Hero Container Frame 2147230203 */}
      <div className="relative z-10 w-full rounded-[32px] sm:rounded-[48px] bg-figma-card border border-white/20 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-indigo-950/60 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 min-h-[577px]">
        {/* Subtle Decorative Gradient Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

        {/* Left Column: Copy & Actions */}
        <div className="w-full lg:max-w-[580px] flex flex-col items-start gap-6 z-10">
          <div className="space-y-4">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[66px] font-semibold text-white leading-[1.12] tracking-[-0.02em]">
              Turn{" "}
              <span className="inline-flex items-center align-middle mx-1 px-3 py-1 bg-[#ED1D24] rounded-xl text-white shadow-lg shadow-red-600/30 gap-1.5 font-bold text-2xl sm:text-3xl lg:text-4xl -translate-y-1">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                YouTube
              </span>{" "}
              Videos into Smart Audio Briefings
            </h1>

            {/* Subtitle */}
            <p className="text-[#D0D0D0] text-base sm:text-lg lg:text-[18px] leading-[150%] font-normal max-w-[540px]">
              Save hours every week. Get AI-generated summaries of your favorite YouTube videos, delivered as audio briefings you can listen to anywhere.
            </p>
          </div>

          {/* Interactive Sliding Action Switcher */}
          <div className="relative inline-flex items-center p-1.5 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md gap-1">
            {/* Get Started Free Button */}
            <Link
              href="/feed"
              onClick={() => setActiveAction("get-started")}
              className={`relative z-10 inline-flex items-center gap-2.5 px-4 py-2.5 h-12 rounded-lg text-base transition-colors duration-200 select-none ${activeAction === "get-started"
                  ? "font-semibold text-white"
                  : "font-medium text-white/80 hover:text-white"
                }`}
            >
              {activeAction === "get-started" && (
                <motion.div
                  layoutId="hero-active-pill"
                  className="absolute inset-0 rounded-lg bg-figma-btn shadow-lg shadow-purple-900/50"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {activeAction === "get-started" && (
                <div className="relative z-20 w-7 h-7 rounded-md bg-white flex items-center justify-center text-[#7A3BED] shrink-0 shadow-inner">
                  <ChevronRight className="w-4 h-4 text-[#7A3BED] stroke-[3]" />
                </div>
              )}
              <span className="relative z-20">Get Started Free</span>
            </Link>

            {/* Contact Us Button */}
            <Link
              href="/contact-us"
              onClick={() => setActiveAction("contact")}
              className={`relative z-10 inline-flex items-center gap-2.5 px-4 py-2.5 h-12 rounded-lg text-base transition-colors duration-200 select-none ${activeAction === "contact"
                  ? "font-semibold text-white"
                  : "font-medium text-white/80 hover:text-white"
                }`}
            >
              {activeAction === "contact" && (
                <motion.div
                  layoutId="hero-active-pill"
                  className="absolute inset-0 rounded-lg bg-figma-btn shadow-lg shadow-purple-900/50"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {activeAction === "contact" && (
                <div className="relative z-20 w-7 h-7 rounded-md bg-white flex items-center justify-center text-[#7A3BED] shrink-0 shadow-inner">
                  <ChevronRight className="w-4 h-4 text-[#7A3BED] stroke-[3]" />
                </div>
              )}
              <span className="relative z-20">Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Futuristic 3D Illustration Graphic */}
        <div className="w-full lg:w-auto flex items-center justify-center relative z-10">
          <div className="relative w-[320px] sm:w-[420px] lg:w-[500px] aspect-square rounded-full overflow-hidden p-2 bg-gradient-to-b from-white/20 via-purple-500/20 to-transparent shadow-[0_0_80px_rgba(203,82,255,0.35)] border border-white/20 group">
            {/* Glowing Backdrop Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/40 to-[#A842D4]/40 rounded-full blur-xl animate-pulse" />

            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/hero.png"
                alt="Curio AI YouTube Summary System"
                fill
                priority
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 420px, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
