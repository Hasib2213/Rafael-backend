"use client";

import React from "react";
import { Play } from "lucide-react";

export interface FeedbackCardData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  rating: number; // e.g. 4
  maxRating?: number; // 5
  usefulFeedback: string; // e.g. "Confusing or unclear"
  thoughts: string; // e.g. "It did not met my expectation"
  requestOption: string; // e.g. "Request an improved version"
  channelName?: string;
  channelAvatar?: string;
  videoUrl?: string;
}

interface MyFeedbackCardProps {
  item: FeedbackCardData;
  onPlayAudio?: (item: FeedbackCardData) => void;
}

export default function MyFeedbackCard({ item, onPlayAudio }: MyFeedbackCardProps) {
  return (
    <article className="w-full max-w-[370px] h-[595px] rounded-2xl bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] border border-white/10 shadow-[0_1px_12px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-white/20 group font-['Lato',sans-serif]">
      {/* Thumbnail Section (Figma: 370px x 183px) */}
      <div className="relative w-full h-[183px] bg-slate-900 shrink-0 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Duration Badge (Figma Frame 2147239871: 43px x 26px, top 10px, right 10px) */}
        <div className="absolute top-2.5 right-2.5 min-w-[43px] h-[26px] px-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-normal flex items-center justify-center shadow-md select-none">
          {item.duration}
        </div>

        {/* Hover Play Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <button
            type="button"
            onClick={() => onPlayAudio?.(item)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7A3BED] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer"
            aria-label="Play briefing audio"
          >
            <Play className="w-5 h-5 ml-0.5 fill-white text-white" />
          </button>
        </div>
      </div>

      {/* Card Content (Figma Frame 2147239873: padding 16px, gap 12px) */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Title (Figma: 338px x 48px, 16px Lato semibold) */}
        <h3
          className="text-base font-semibold text-white leading-[150%] line-clamp-2 h-12 font-['Lato',sans-serif]"
          title={item.title}
        >
          {item.title}
        </h3>

        {/* Star Rating Row (Figma: Star Rating: 4/5 with yellow star) */}
        <div className="flex items-center justify-between py-1 border-b border-white/10">
          <span className="text-base font-semibold text-white font-['Lato',sans-serif]">
            Star Rating:
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-base font-semibold text-white font-['Lato',sans-serif]">
              {item.rating}/{item.maxRating || 5}
            </span>
            {/* Figma Yellow Star */}
            <svg
              className="w-4 h-4"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 0.5L10.9726 5.51064L16.5 6.31309L12.5 10.2117L13.4452 15.7131L8.5 13.1131L3.55482 15.7131L4.5 10.2117L0.5 6.31309L6.02742 5.51064L8.5 0.5Z"
                fill="#FDD835"
              />
            </svg>
          </div>
        </div>

        {/* How useful was this summary? (Figma Profile / Frame 2147239918) */}
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-white font-['Lato',sans-serif]">
            How useful was this summary?
          </span>

          {/* Selected Option Pill (338px x 44px, bg-white/20) */}
          <div className="w-full h-11 px-3 rounded-lg bg-white/20 border border-white/5 flex items-center gap-2.5 select-none">
            {/* Grommet radial-selected icon */}
            <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-base font-medium text-white truncate font-['Lato',sans-serif]">
              {item.usefulFeedback}
            </span>
          </div>
        </div>

        {/* Share your thoughts (optional): (Figma Frame 2147239919 & Frame 2147239921) */}
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-white font-['Lato',sans-serif]">
            Share your thoughts (optional):
          </span>

          {/* User Review Box (338px x 112px) */}
          <div className="w-full h-28 p-3 rounded-lg bg-white/20 border border-white/5 text-base font-medium text-white font-['Lato',sans-serif] overflow-y-auto leading-relaxed">
            {item.thoughts}
          </div>

          {/* Request Status Pill (338px x 44px) */}
          <div className="w-full h-11 px-3 rounded-lg bg-white/20 border border-white/5 flex items-center gap-2.5 select-none">
            {/* Grommet radial-selected icon */}
            <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-base font-medium text-white truncate font-['Lato',sans-serif]">
              {item.requestOption}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
