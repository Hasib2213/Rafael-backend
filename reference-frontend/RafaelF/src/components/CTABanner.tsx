"use client";
import React from "react";
import Link from "next/link";
import CurioLogo from "./CurioLogo";
import { ChevronRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 py-16 sm:py-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#CB52FF]/25 blur-[180px] pointer-events-none rounded-full" />

      {/* Main Banner Container */}
      <div className="relative z-10 w-full rounded-[32px] sm:rounded-[48px] bg-figma-card border border-white/20 px-6 sm:px-12 py-16 sm:py-24 text-center overflow-hidden shadow-2xl shadow-indigo-950/50 flex flex-col items-center justify-center">
        {/* Subtle Ambient Radial Light */}
        <div className="absolute inset-0 bg-radial from-white/[0.05] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-8">
          {/* Curio Logo */}
          <div className="scale-110 mb-2">
            <CurioLogo size="lg" />
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-[1.2] tracking-[-0.02em]">
              Ready to save time and stay informed?
            </h2>
            <p className="text-[#D0D0D0] text-base sm:text-lg lg:text-[18px] max-w-md mx-auto">
              Join thousands of users who are already using Curio to master YouTube learning.
            </p>
          </div>

          {/* Primary Action Button */}
          <div>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-3.5 px-3 py-1.5 h-12 rounded-lg text-base font-semibold text-white bg-figma-btn shadow-xl shadow-purple-950/50 hover:shadow-purple-700/40 hover:scale-[1.02] transition-all active:scale-[0.98]"
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#7A3BED] shrink-0 group-hover:translate-x-0.5 transition-transform shadow-inner">
                <ChevronRight className="w-4 h-4 text-[#7A3BED] stroke-[3]" />
              </div>
              <span className="pr-4 font-semibold">Sign Up Free</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
