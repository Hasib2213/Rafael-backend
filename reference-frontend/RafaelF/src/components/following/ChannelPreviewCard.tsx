"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Video, Users, UserPlus, X } from "lucide-react";
import { Creator } from "@/components/following/CreatorCard";

interface ChannelPreviewCardProps {
  creator?: Partial<Creator>;
  onFollow: () => void;
  onCancel: () => void;
}

export default function ChannelPreviewCard({
  creator,
  onFollow,
  onCancel,
}: ChannelPreviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const name = creator?.name || "Tech Insights";
  const avatar = creator?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80";
  const videoCount = creator?.videoCount || "24 Videos";
  const subscriberCount = creator?.subscriberCount || "2.4M subscribers";
  const description =
    creator?.description ||
    "AI, technology trends, and future innovations Exploring how innovation is reshaping industries.....";

  return (
    <div
      className="w-full max-w-[1120px] min-h-[194px] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 border border-white/20 shadow-xl transition-all duration-300 animate-in fade-in zoom-in-95 duration-200 [background:linear-gradient(0deg,rgba(255,255,255,0.15),rgba(255,255,255,0.15)),linear-gradient(0deg,#2B2A7D,#2B2A7D),linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)]"
    >
      {/* 1. Channel Thumbnail: ImageWithFallback (Figma: 160px x 160px, rounded 8px) */}
      <div className="w-40 h-40 rounded-lg shrink-0 overflow-hidden relative shadow-lg border border-white/20 bg-slate-900/60">
        {!imgError && avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-700 text-white font-bold text-3xl font-['Lato',sans-serif]">
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* 2. Details Column (Figma Frame 2147239898: width 912px, height 162px) */}
      <div className="flex-1 w-full flex flex-col items-start gap-3 min-w-0">
        {/* Channel Name */}
        <h3 className="text-white text-2xl font-semibold font-['Lato',sans-serif] leading-[140%] tracking-[-0.02em] truncate max-w-full">
          {name}
        </h3>

        {/* Stats Row (Figma Frame 2147239877) */}
        <div className="flex flex-row items-center gap-3 text-white text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em]">
          {/* Video Count */}
          <div className="flex items-center gap-1">
            <Video className="w-4 h-4 text-[#B5C8DB]" />
            <span>{videoCount}</span>
          </div>

          {/* Subscriber Count */}
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[#B5C8DB]" />
            <span>{subscriberCount}</span>
          </div>
        </div>

        {/* Description Row with See More */}
        <div className="w-full text-white text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em]">
          <p className={expanded ? "line-clamp-none" : "line-clamp-1"}>
            {description}
            {!expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-[#36C1FB] hover:underline ml-1 font-medium cursor-pointer"
              >
                See more
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-[#36C1FB] hover:underline ml-1 font-medium cursor-pointer"
              >
                See less
              </button>
            )}
          </p>
        </div>

        {/* Action Buttons Row (Figma Frame 2147239899: width 912px, height 44px, gap 12px) */}
        <div className="w-full flex flex-row items-center gap-3 pt-1">
          {/* Primary Follow Button (Figma: width 796px, height 44px) */}
          <button
            type="button"
            onClick={onFollow}
            className="flex-1 h-11 px-4 rounded-lg bg-[linear-gradient(89.44deg,#2563EB_-47.4%,#7A3BED_76.5%,#A842D4_101.93%)] text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all shadow-md shadow-indigo-900/40 cursor-pointer select-none"
          >
            <UserPlus className="w-5 h-5 text-white shrink-0" strokeWidth={2.2} />
            <span>Follow Channel</span>
          </button>

          {/* Cancel Button (Figma: width 104px, height 44px) */}
          <button
            type="button"
            onClick={onCancel}
            className="w-[104px] h-11 px-4 rounded-lg bg-white/20 hover:bg-white/30 active:scale-[0.98] border border-white/10 text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none"
          >
            <X className="w-4 h-4 text-white shrink-0" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
