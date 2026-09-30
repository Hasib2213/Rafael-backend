"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Check } from "lucide-react";
import { BriefingItem } from "./BriefingCard";

interface ImproveSummaryModalProps {
  isOpen?: boolean;
  briefing?: BriefingItem | null;
  onClose: () => void;
  onSkip?: () => void;
  onGenerateBetter?: () => void;
  onSubmitRequest?: (req: any) => void;
  initialRating?: number;
}

export default function ImproveSummaryModal({
  isOpen = true,
  briefing,
  onClose,
  onSkip,
  onGenerateBetter,
  onSubmitRequest,
  initialRating = 5,
}: ImproveSummaryModalProps) {
  if (!isOpen) return null;
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const displayedRating = hoverRating !== null ? hoverRating : rating;

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onClose();
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
      setTimeout(() => {
        if (onGenerateBetter) {
          onGenerateBetter();
        }
        onClose();
      }, 1200);
    }, 1500);
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
      {/* Navigation Modal Container (Figma Desktop - 62 / 516px x 418px, border-radius 16px) */}
      <div
        className="w-full max-w-[516px] rounded-2xl overflow-hidden bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] border border-white/20 flex flex-col relative pb-5 transition-all"
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
        </div>

        {/* Frame 2147239865: Main Body Container (height ~138px, padding 0 16px, gap 16px) */}
        <div className="px-4 pt-3 flex flex-col gap-4 font-['Lato',sans-serif]">
          {isDone ? (
            <div className="py-6 flex flex-col items-center justify-center text-center gap-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h2 className="text-xl font-bold text-white">Generating Improved Summary!</h2>
              <p className="text-sm text-[#D0D0D0]">
                Our AI model is refining key insights for an enhanced briefing.
              </p>
            </div>
          ) : (
            <>
              {/* Frame 2147227729 & 2147227728: 5 Stars Row (484px x 46px, gap 20px) */}
              <div className="flex flex-row items-center justify-center gap-5 h-[46px]">
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const isFilled = starIndex <= displayedRating;
                  return (
                    <button
                      key={starIndex}
                      type="button"
                      onClick={() => setRating(starIndex)}
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
                          /* Unselected Outlined Star */
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

              {/* Frame 2147227731 & 2147225900: Prompt & Buttons (484px x 76px) */}
              <div className="flex flex-col gap-2.5">
                {/* Text: "Would you like us to improve this summary for you?" (363px x 24px, 16px medium Lato) */}
                <p className="text-base font-medium text-white leading-normal font-['Lato',sans-serif] text-left">
                  Would you like us to improve this summary for you?
                </p>

                {/* Frame 2147240263: Row of Two Action Buttons (484px x 44px, gap 24px) */}
                <div className="flex flex-row items-center gap-6 w-full">
                  {/* Frame 2147224437: "Skip" Button (230px x 44px, background rgba(255,255,255,0.2), rx 8px) */}
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex-1 h-11 rounded-lg bg-white/20 hover:bg-white/30 active:scale-[0.99] border border-white/10 text-white font-semibold text-base font-['Lato',sans-serif] flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  >
                    Skip
                  </button>

                  {/* Frame 2147224438: "Generate a better version" Button (230px x 44px, gradient, rx 8px) */}
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex-1 h-11 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-base font-['Lato',sans-serif] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-75"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
                        Generating...
                      </span>
                    ) : (
                      <span>Generate a better version</span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
