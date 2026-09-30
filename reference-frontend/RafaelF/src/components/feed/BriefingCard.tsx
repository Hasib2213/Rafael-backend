"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, Sparkles, Check, Play, BookOpen, Volume2 } from "lucide-react";

export interface BriefingItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  channelName: string;
  subscribers: string;
  channelAvatarColor: string;
  channelInitials: string;
  summary: string;
  fullSummary?: string;
  keyTakeaways?: string[];
  timeframe?: "daily" | "weekly" | "both";
}

interface BriefingCardProps {
  briefing: BriefingItem;
  onOpenModal?: (briefing: BriefingItem) => void;
}

export default function BriefingCard({ briefing, onOpenModal }: BriefingCardProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="w-full sm:max-w-[291px] min-h-[434px] flex flex-col items-center rounded-2xl overflow-hidden border border-white/15 shadow-xl transition-all duration-300 hover:border-white/35 hover:-translate-y-1 hover:shadow-purple-950/40 bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] pb-4 isolate">
      {/* Card Thumbnail & Duration (Figma imgi_607_default 1 & Frame 2147239871) */}
      <div className="relative w-full h-[144px] shrink-0 bg-slate-800 overflow-hidden group rounded-t-2xl">
        <Image
          src={briefing.thumbnail}
          alt={briefing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
          sizes="(max-width: 768px) 100vw, 291px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2A7D]/70 via-transparent to-black/20" />

        {/* Video Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center text-white shadow-lg">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration Badge (Figma Frame 2147239871: 43px x 26px, top 10px, right 10px) */}
        <div className="absolute top-2.5 right-2.5 w-[43px] h-[26px] rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-normal text-white font-['Lato',sans-serif]">
          {briefing.duration}
        </div>
      </div>

      {/* Card Body (Figma Frame 2147239873: 259px x 258px, gap 12px) */}
      <div className="w-[259px] flex-1 flex flex-col justify-between gap-3 pt-3">
        {/* Video Title (Figma: 259px x 72px, 16px/150% semi-bold) */}
        <h3
          title={briefing.title}
          className="text-base font-semibold text-white leading-normal h-[72px] line-clamp-3 font-['Lato',sans-serif]"
        >
          {briefing.title}
        </h3>

        {/* Channel Profile Row (Figma Profile: 162px x 43px, gap 8px) */}
        <div className="flex items-center gap-2 h-[43px]">
          {/* Avatar (Figma Ellipse 2: 40px x 40px) */}
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-tr ${briefing.channelAvatarColor} ring-1 ring-white/30 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm`}
          >
            {briefing.channelInitials}
          </div>
          {/* Channel Text (Figma Frame 2147239872) */}
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-base font-semibold text-white truncate font-['Lato',sans-serif] -my-0.5">
              {briefing.channelName}
            </span>
            <span className="text-sm font-normal text-[#D0D0D0] truncate font-['Lato',sans-serif]">
              {briefing.subscribers}
            </span>
          </div>
        </div>

        {/* Summary Snippet (Figma: 259px x 63px, 14px/150% regular text-white) */}
        <div className="text-sm text-white font-normal leading-normal font-['Lato',sans-serif] min-h-[63px]">
          <p className={isExpanded ? "" : "line-clamp-3"}>
            {briefing.summary}
          </p>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-300 hover:text-cyan-200 text-xs font-medium inline-block select-none"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>

        {/* Action Row (Figma Frame 2147239877: 259px x 44px, gap 12px) */}
        <div className="w-[259px] h-[44px] flex items-center gap-3 mt-auto">
          {/* Primary Action Button (Figma: 147px x 44px, gradient, radius 8px, gap 8px, Play Audio) */}
          <button
            type="button"
            onClick={() => onOpenModal?.(briefing)}
            className="w-[147px] h-[44px] px-2 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-95 text-white text-base font-semibold font-['Lato',sans-serif] flex items-center justify-center gap-2 shadow-md shadow-purple-900/30 transition-all select-none shrink-0"
          >
            {/* Exact Vector Play/Triangle Icon from Figma: 16px x 16px, stroke 1.33333px */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M4 2L13.3333 8L4 14V2Z"
                stroke="#FEFEFE"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="truncate">Play Audio</span>
          </button>

          {/* Download Button (Figma charm:download Icon Menu: 44px x 44px, radius 8px, bg white/20) */}
          <button
            type="button"
            onClick={handleDownload}
            title={downloaded ? "Downloaded!" : "Download Briefing Audio"}
            aria-label="Download Summary"
            className={`w-[44px] h-[44px] rounded-lg flex items-center justify-center transition-all select-none shrink-0 ${
              downloaded
                ? "bg-emerald-500/80 text-white"
                : "bg-white/20 hover:bg-white/30 text-white active:scale-95"
            }`}
          >
            {downloaded ? (
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

          {/* Bookmark / Library Button (Figma Frame Layer 2 Vector: 44px x 44px, radius 8px, bg white/20) */}
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            title={isSaved ? "Saved to Library" : "Save to Library"}
            aria-label="Bookmark to Library"
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
    </div>
  );
}
