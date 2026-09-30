"use client";

import React from "react";
import Image from "next/image";

interface ThankYouModalProps {
  isOpen?: boolean;
  onClose: () => void;
  message?: string;
}

export default function ThankYouModal({
  isOpen = true,
  onClose,
  message = "Thanks. We’ll use this to improve your next summaries.",
}: ThankYouModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 figma-backdrop-overlay animate-fadeIn select-none"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.71)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
      onClick={onClose}
    >
      {/* Navigation Modal Container (Figma Desktop - 63: 516px x 359px, border-radius 16px) */}
      <div
        className="w-full max-w-[516px] h-[359px] rounded-2xl overflow-hidden bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] border border-white/20 flex flex-col items-center justify-between p-[20px_16px] gap-5 relative transition-all font-['Lato',sans-serif]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Frame 2147240262: Celebratory Artwork (166px x 171px) */}
        <div className="relative w-[166px] h-[171px] shrink-0 flex items-center justify-center overflow-hidden rounded-xl">
          <Image
            src="/images/thank_you_art.png"
            alt="Thank You Illustration"
            width={166}
            height={171}
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(253,216,53,0.3)] hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>

        {/* Frame 2147225900: Content & Action Button (484px x 128px, gap 16px) */}
        <div className="w-full max-w-[484px] h-[128px] flex flex-col items-center justify-between">
          {/* Subheader: "Thanks. We’ll use this to improve your next summaries." (388px x 68px, 24px medium Lato) */}
          <h2 className="w-full max-w-[388px] h-[68px] text-2xl font-medium text-white text-center leading-[140%] tracking-[-0.02em] flex items-center justify-center font-['Lato',sans-serif]">
            {message}
          </h2>

          {/* Frame 2147224437: "Back" Button (484px x 44px, gradient, rx 8px) */}
          <button
            type="button"
            onClick={onClose}
            className="w-full h-[44px] rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-base font-['Lato',sans-serif] flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
