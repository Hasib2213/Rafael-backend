"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { BriefingItem } from "./BriefingCard";

interface FeedbackModalProps {
  isOpen?: boolean;
  briefing?: BriefingItem | null;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  onSubmitFeedback?: (data: { rating: number; selectedOption: string; comment: string; requestImproved: boolean }) => void;
  initialRating?: number;
}

// Desktop - 60 Options (Rating 1 - 3 stars)
export const NEGATIVE_FEEDBACK_OPTIONS = [
  "Confusing or unclear",
  "Important details were missing",
  "Lost original context",
  "Too superficial",
  "Too long or repetitive",
  "Not relevant to the topic",
];

// Desktop - 61 Options (Rating 4 - 5 stars)
export const POSITIVE_FEEDBACK_OPTIONS = [
  "Very clear",
  "Saved me time",
  "Great summary",
  "Kept the essence",
  "Actionable advice",
  "Accurate and concise",
];

export default function FeedbackModal({
  isOpen = true,
  briefing,
  onClose,
  onSubmitSuccess,
  onSubmitFeedback,
  initialRating = 4,
}: FeedbackModalProps) {
  if (!isOpen) return null;
  const [rating, setRating] = useState<number>(initialRating); // Default 5 stars as in Figma Desktop - 61
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Hover rating only affects the star visuals preview, NOT the options layout!
  const displayedRating = hoverRating !== null ? hoverRating : rating;

  // Options ONLY change on committed rating click, never on hover (prevents layout shifting/jittering)
  const isPositive = rating >= 4;
  const currentOptions = isPositive
    ? POSITIVE_FEEDBACK_OPTIONS
    : NEGATIVE_FEEDBACK_OPTIONS;

  const [selectedOption, setSelectedOption] = useState<string>(
    initialRating >= 4 ? "Very clear" : "Confusing or unclear"
  );
  const [thoughts, setThoughts] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleRatingSelect = (starIndex: number) => {
    setRating(starIndex);
    if (starIndex >= 4) {
      if (!POSITIVE_FEEDBACK_OPTIONS.includes(selectedOption)) {
        setSelectedOption(POSITIVE_FEEDBACK_OPTIONS[0]); // "Very clear"
      }
    } else {
      if (!NEGATIVE_FEEDBACK_OPTIONS.includes(selectedOption)) {
        setSelectedOption(NEGATIVE_FEEDBACK_OPTIONS[0]); // "Confusing or unclear"
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        onClose();
      }
    }, 1200);
  };

  const thumbnailSrc = briefing?.thumbnail || "/images/summary.png";

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
      {/* Navigation Modal Container (Figma Desktop - 60: 516px x 980px, border-radius 16px) */}
      <div
        className="w-full max-w-[516px] max-h-[96vh] rounded-2xl overflow-y-auto overflow-x-hidden bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] border border-white/20 flex flex-col relative pb-5 transition-all scrollbar-thin scrollbar-thumb-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Frame 2147239886: Banner Artwork (516px x 240px) */}
        <div className="relative w-full h-[240px] shrink-0 overflow-hidden rounded-t-2xl bg-slate-900">
          <Image
            src={thumbnailSrc}
            alt={briefing?.title || "Briefing Thumbnail"}
            fill
            className="object-cover"
            priority
          />
          {/* Linear gradient overlay matching Figma visual tone */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#2B2A7D]/90" />

          {/* charm:cross Close Button (Figma: 40px x 40px, top: 16.5px, left: 460px / right: 16px) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close feedback modal"
            className="absolute top-4 right-4 w-10 h-10 rounded-[18px] bg-black/40 hover:bg-black/60 active:scale-95 transition-all flex items-center justify-center text-white z-10 border border-white/10"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#FEFEFE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Frame 2147239865: Main Body Form Container (padding 0 16px, gap 16px) */}
        <div className="px-4 pt-2 flex flex-col gap-4 font-['Lato',sans-serif]">
          {isSubmitted ? (
            <div className="py-20 flex flex-col items-center justify-center text-center gap-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Thank You!</h2>
              <p className="text-base text-[#D0D0D0] max-w-xs">
                Your feedback helps us continuously calibrate and improve our AI video briefings.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Frame 2147227729: Rating Header & Stars (484px x 136px) */}
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                {/* Text Block */}
                <div className="flex flex-col items-center gap-1.5">
                  <h2 className="text-[28px] font-semibold leading-[1.35] text-white tracking-tight font-['Lato',sans-serif]">
                    Please Rate Us!
                  </h2>
                  <p className="text-base font-normal text-[#D0D0D0] leading-normal font-['Lato',sans-serif]">
                    We will work harder to make you more satisfied.
                  </p>
                </div>

                {/* Frame 2147227728: 5 Stars Row (484px x 46px, gap 20px) */}
                <div className="flex flex-row items-center justify-center gap-5 h-[46px]">
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    const isFilled = starIndex <= displayedRating;
                    return (
                      <button
                        key={starIndex}
                        type="button"
                        onClick={() => handleRatingSelect(starIndex)}
                        onMouseEnter={() => setHoverRating(starIndex)}
                        onMouseLeave={() => setHoverRating(null)}
                        aria-label={`Rate ${starIndex} star${starIndex > 1 ? "s" : ""}`}
                        className="cursor-pointer focus:outline-none p-1 -m-1 group"
                      >
                        <div className="transition-transform duration-150 group-hover:scale-110 group-active:scale-95 flex items-center justify-center">
                        {isFilled ? (
                          /* Filled Gold Star (Figma Vector with highlight and shadow) */
                          <svg
                            width="46"
                            height="46"
                            viewBox="0 0 48 46"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M25.074 1.341L30.458 13.621C30.87 14.561 31.762 15.205 32.786 15.297L45.903 16.473C47.387 16.689 47.979 18.509 46.903 19.558L37.022 27.858C36.222 28.53 35.858 29.586 36.078 30.606L38.95 44.051C39.202 45.527 37.654 46.655 36.326 45.955L24.878 39.251C23.998 38.735 22.91 38.735 22.03 39.251L10.581 45.951C9.257 46.647 7.705 45.523 7.957 44.047L10.829 30.602C11.045 29.582 10.685 28.526 9.885 27.854L0 19.562C-1.072 18.517 -0.48 16.693 1.0 16.477L14.117 15.301C15.141 15.209 16.033 14.565 16.445 13.625L21.83 1.345C22.498 0 24.41 0 25.074 1.341Z"
                              fill="#FDD835"
                            />
                            <path
                              d="M24.682 14.357L23.77 5.309C23.734 4.805 23.63 3.94 24.438 3.94C25.078 3.94 25.426 5.273 25.426 5.273L28.162 12.537C29.194 15.301 28.77 16.249 27.774 16.809C26.63 17.449 24.942 16.949 24.682 14.357Z"
                              fill="#FFFF8D"
                            />
                            <path
                              d="M35.966 27.054L43.814 20.93C44.202 20.606 44.902 20.089 44.342 19.501C43.898 19.037 42.698 19.705 42.698 19.705L35.83 22.39C33.782 23.098 32.422 24.146 32.302 25.466C32.145 27.226 33.726 28.582 35.966 27.054Z"
                              fill="#F4B400"
                            />
                          </svg>
                        ) : (
                          /* Unselected Outlined Star (Figma Vector: fill rgba(181,200,219,0.4), stroke #B5C8DB 2px) */
                          <svg
                            width="46"
                            height="46"
                            viewBox="0 0 48 46"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24.272 1.538C24.573 0.934 25.421 0.937 25.72 1.524L31.089 13.771C31.647 15.043 32.855 15.916 34.243 16.041H34.244L47.32 17.214C47.969 17.319 48.226 18.11 47.762 18.577L37.926 26.84C36.844 27.749 36.349 29.18 36.647 30.564L39.512 43.975C39.618 44.63 38.936 45.124 38.349 44.822L26.93 38.136C25.738 37.437 24.263 37.437 23.07 38.136L11.656 44.815C11.066 45.12 10.38 44.621 10.489 43.967L13.354 30.559C13.647 29.179 13.16 27.747 12.075 26.836L2.23 18.577C1.777 18.113 2.035 17.323 2.677 17.218L15.754 16.045C17.142 15.92 18.35 15.047 18.908 13.774L24.272 1.538Z"
                              fill="#B5C8DB"
                              fillOpacity="0.4"
                              stroke="#B5C8DB"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frame 162: "Was this summary worth your time?" & 6 Options (484px x 328px) */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-white leading-normal font-['Lato',sans-serif]">
                  Was this summary worth your time?
                </label>

                {/* Frame 2147240261: Options Stack (Desktop - 61: 4 options, Desktop - 60: 6 options, gap: 7px) */}
                <div className="flex flex-col gap-[7px]">
                  {currentOptions.map((option) => {
                    const isSelected = selectedOption === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedOption(option)}
                        className={`w-full h-11 px-3 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer text-left border ${
                          isSelected
                            ? "bg-white/30 border-blue-400/80 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                            : "bg-white/20 hover:bg-white/[0.25] border-transparent"
                        }`}
                      >
                        {/* grommet-icons:radial-selected Radio Icon (16px x 16px) */}
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? "border-white bg-transparent"
                              : "border-white/80 bg-transparent"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                          )}
                        </div>

                        {/* Option Label (16px medium Lato #FFFFFF) */}
                        <span className="text-base font-medium text-white leading-normal font-['Lato',sans-serif] truncate">
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frame 2147227596: "Share your thoughts (optional):" Textarea (484px x 144px) */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-white leading-normal font-['Lato',sans-serif]">
                  Share your thoughts (optional):
                </label>

                <div className="w-full h-28 bg-white/20 rounded-lg p-3.5 border border-transparent focus-within:border-white/40 focus-within:bg-white/[0.25] transition-all">
                  <textarea
                    value={thoughts}
                    onChange={(e) => setThoughts(e.target.value)}
                    placeholder="Write Here...."
                    rows={3}
                    className="w-full h-full bg-transparent resize-none text-base font-normal text-white placeholder-[#D0D0D0] outline-none leading-normal font-['Lato',sans-serif]"
                  />
                </div>
              </div>

              {/* Frame 2147224437: Submit Feedback Button (484px x 44px) */}
              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center text-white text-base font-semibold shadow-md mt-1 cursor-pointer font-['Lato',sans-serif]"
              >
                Submit feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
