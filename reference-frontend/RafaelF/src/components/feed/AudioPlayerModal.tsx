"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BriefingItem } from "./BriefingCard";
import { Check } from "lucide-react";

interface AudioPlayerModalProps {
  briefing: BriefingItem;
  onClose: () => void;
  onOpenFeedback?: () => void;
}

export default function AudioPlayerModal({
  briefing,
  onClose,
  onOpenFeedback,
}: AudioPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressPercent, setProgressPercent] = useState(28); // ~02:25 of 08:25
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState("02:25");

  // Simulate audio playback progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.4;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgressPercent(newPercent);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 figma-backdrop-overlay animate-fadeIn"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.71)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
      onClick={onClose}
    >
      {/* Modal Container (Figma Navigation: 516px x 737px, border-radius 16px) */}
      <div
        className="w-full max-w-[516px] h-[737px] max-h-[96vh] rounded-2xl overflow-hidden bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] border border-white/20 flex flex-col relative select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Media Header (Figma Frame 2147239886: 516px x 240px) */}
        <div className="relative w-full h-[240px] shrink-0 overflow-hidden bg-slate-900 rounded-t-2xl">
          {/* Background Image with Figma Gradient Overlay */}
          <Image
            src={briefing.thumbnail}
            alt={briefing.title}
            fill
            className="object-cover"
            sizes="516px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 via-70% to-black/80" />

          {/* Close Button (Figma charm:cross - 40px x 40px, top 16px, right 16px) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 rounded-[18px] bg-black/40 hover:bg-black/60 active:scale-95 text-white flex items-center justify-center transition-all z-20 border border-white/10"
          >
            <svg
              width="18"
              height="18"
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

          {/* Progress Bar (Figma Frame 2147239885: 484px x 8px, left 16px, top 177px) */}
          <div className="absolute left-4 right-4 bottom-14 z-20">
            <div
              className="w-full h-2 rounded-[13px] bg-white/40 relative cursor-pointer group"
              onClick={handleSeek}
            >
              {/* Active Bar */}
              <div
                className="h-2 rounded-[13px] bg-[#2563EB] relative transition-all"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Scrubber Knob (Figma Ellipse 47058: 16px x 16px) */}
                <div className="absolute -right-2 -top-1 w-4 h-4 rounded-full bg-[#D9D9D9] border-2 border-[#2563EB] shadow-md group-hover:scale-125 transition-transform" />
              </div>
            </div>

            {/* Timestamps (Figma: 02:25 and 08:25 at top 190px) */}
            <div className="flex justify-between items-center text-xs font-normal text-white font-['Lato',sans-serif] mt-1.5 px-0.5">
              <span>{currentTimeStr}</span>
              <span>{briefing.duration || "08:25"}</span>
            </div>
          </div>

          {/* Player Controls (Figma Frame 2147239882: 132px x 36px, centered at bottom) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {/* Previous Track / Rewind */}
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setProgressPercent(0)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#FEFEFE"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 6H8V18H6V6ZM18 6L9 12L18 18V6Z" />
              </svg>
            </button>

            {/* Play / Pause Toggle (Component 13) */}
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/40 active:scale-95 transition-all text-white shadow-lg"
            >
              {isPlaying ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#FEFEFE"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#FEFEFE"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-0.5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Track / Forward */}
            <button
              type="button"
              aria-label="Next"
              onClick={() => setProgressPercent(100)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#FEFEFE"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 6H18V18H16V6ZM6 6L15 12L6 18V6Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Body (Figma Frame 2147239865: 516px, padding 0 16px, gap 16px) */}
        <div className="flex-1 p-4 flex flex-col justify-between gap-3.5 overflow-y-auto">
          {/* Video Title (Figma: 484px x 48px, 16px semi-bold Lato) */}
          <h2 className="text-base font-semibold text-white leading-snug line-clamp-2 font-['Lato',sans-serif]">
            {briefing.title}
          </h2>

          {/* Channel Profile Row & Action Icons (Figma Profile: 484px x 44px) */}
          <div className="w-full flex items-center justify-between gap-2 h-11">
            {/* Left: Avatar & Channel Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-tr ${briefing.channelAvatarColor} ring-1 ring-white/30 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm`}
              >
                {briefing.channelInitials}
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-base font-semibold text-white truncate font-['Lato',sans-serif] -my-0.5">
                  {briefing.channelName}
                </span>
                <span className="text-sm font-normal text-[#D0D0D0] truncate font-['Lato',sans-serif]">
                  {briefing.subscribers}
                </span>
              </div>
            </div>

            {/* Right: Download & Bookmark Buttons (Figma Frame 2147239889: 96px x 44px) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Download Button */}
              <button
                type="button"
                onClick={() => {
                  setIsDownloaded(true);
                  setTimeout(() => setIsDownloaded(false), 2500);
                }}
                title={isDownloaded ? "Downloaded!" : "Download Audio"}
                className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all ${
                  isDownloaded
                    ? "bg-emerald-500/80 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white active:scale-95"
                }`}
              >
                {isDownloaded ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3V15M12 15L7.5 10.5M12 15L16.5 10.5M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17"
                      stroke="#FEFEFE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {/* Bookmark Button */}
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                title={isSaved ? "Saved to Library" : "Save to Library"}
                className={`w-[44px] h-[44px] rounded-lg flex items-center justify-center transition-all select-none shrink-0 cursor-pointer ${
                  isSaved
                    ? "bg-purple-600/80 hover:bg-purple-600 text-white shadow-md shadow-purple-900/30"
                    : "bg-white/20 hover:bg-white/30 text-white active:scale-95"
                }`}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[44px] h-[44px]"
                >
                  {isSaved ? (
                    <path
                      d="M17.4163 13.0415H26.583C27.301 13.0424 27.9894 13.328 28.4971 13.8357C29.0048 14.3435 29.2905 15.0318 29.2913 15.7498V28.6665C29.2902 29.2741 29.0485 29.8565 28.619 30.2863C28.1895 30.7161 27.6073 30.9583 26.9997 30.9598L22.6247 28.2498C22.444 28.1155 22.2248 28.043 21.9997 28.043C21.7745 28.043 21.5554 28.1155 21.3747 28.2498L16.9997 30.9598C16.3921 30.9583 15.8099 30.7161 15.3804 30.2863C14.9509 29.8565 14.7092 29.2741 14.708 28.6665V15.7498C14.7089 15.0318 14.9945 14.3435 15.5022 13.8357C16.01 13.328 16.6983 13.0424 17.4163 13.0415Z"
                      fill="#FEFEFE"
                    />
                  ) : (
                    <path
                      d="M26.9997 30.9598C26.5035 30.96 26.0208 30.7985 25.6247 30.4998L22.6247 28.2498C22.444 28.1155 22.2248 28.043 21.9997 28.043C21.7745 28.043 21.5554 28.1155 21.3747 28.2498L18.3747 30.4998C18.0342 30.7552 17.6293 30.9107 17.2055 30.9489C16.7816 30.9871 16.3555 30.9066 15.9748 30.7162C15.5942 30.5259 15.274 30.2333 15.0503 29.8713C14.8265 29.5093 14.708 29.0921 14.708 28.6665V15.7498C14.7089 15.0318 14.9945 14.3435 15.5022 13.8357C16.01 13.328 16.6983 13.0424 17.4163 13.0415H26.583C27.301 13.0424 27.9894 13.328 28.4971 13.8357C29.0048 14.3435 29.2905 15.0318 29.2913 15.7498V28.6665C29.2902 29.2741 29.0485 29.8565 28.619 30.2863C28.1895 30.7161 27.6073 30.9583 26.9997 30.9598ZM26.3747 29.4998C26.5294 29.6159 26.7135 29.6866 26.9061 29.704C27.0988 29.7213 27.2925 29.6847 27.4655 29.5982C27.6385 29.5117 27.7841 29.3787 27.8858 29.2141C27.9875 29.0496 28.0413 28.86 28.0413 28.6665V15.7498C28.0409 15.3632 27.8871 14.9925 27.6137 14.7191C27.3403 14.4457 26.9696 14.2919 26.583 14.2915H17.4163C17.0297 14.2919 16.659 14.4457 16.3856 14.7191C16.1122 14.9925 15.9584 15.3632 15.958 15.7498V28.6665C15.958 28.86 16.0119 29.0496 16.1136 29.2141C16.2153 29.3787 16.3608 29.5117 16.5338 29.5982C16.7069 29.6847 16.9006 29.7213 17.0932 29.704C17.2859 29.6866 17.4699 29.6159 17.6247 29.4998L20.6247 27.2498C21.0221 26.954 21.5043 26.7942 21.9997 26.7942C22.4951 26.7942 22.9773 26.954 23.3747 27.2498L26.3747 29.4998Z"
                      fill="#FEFEFE"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Briefing Summary Description (Figma: 484px x 273px, 14px regular Lato) */}
          <div className="flex-1 bg-white/[0.06] rounded-xl p-3.5 border border-white/10 overflow-y-auto text-sm text-white font-normal leading-relaxed font-['Lato',sans-serif]">
            <p>
              {briefing.fullSummary ||
                "This motivational speech emphasizes taking full responsibility for your life and future. Matthew McConaughey encourages individuals to stop waiting for the “right moment” and start acting with purpose today. He highlights the importance of self-discipline, consistency, and embracing challenges as necessary steps toward growth. The message centers on becoming your best self by making better daily choices and staying committed to long-term goals. Instead of comparing yourself to others, focus on your own progress and define success on your own terms. Ultimately, the speech is a call to action: invest in yourself now, because your future depends on the decisions you make today."}
            </p>
          </div>

          {/* Write a feedback CTA (Figma Icon Menu: 484px x 44px, jam:write icon) */}
          <button
            type="button"
            onClick={() => {
              onOpenFeedback ? onOpenFeedback() : alert("Feedback form opening...");
            }}
            className="w-full h-11 rounded-lg bg-white/20 hover:bg-white/30 active:scale-[0.99] border border-white/10 text-white flex items-center justify-center gap-2 transition-all font-['Lato',sans-serif]"
          >
            {/* jam:write SVG Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
                fill="#B5C8DB"
              />
            </svg>
            <span className="text-base font-semibold text-white">
              Write a feedback
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
