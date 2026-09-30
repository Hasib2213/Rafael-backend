"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Video, Users, Check, UserPlus } from "lucide-react";

export interface ChannelInfo {
  name: string;
  handle: string;
  avatar: string;
  videoCount: string;
  subscriberCount: string;
  description: string;
  isFollowing?: boolean;
}

interface ChannelHeaderBannerProps {
  channel: ChannelInfo;
  onToggleFollow?: (isFollowing: boolean) => void;
  onRequestUnfollow?: () => void;
}

export default function ChannelHeaderBanner({
  channel,
  onToggleFollow,
  onRequestUnfollow,
}: ChannelHeaderBannerProps) {
  const isFollowing = channel.isFollowing ?? true;
  const [imgError, setImgError] = useState(false);

  const handleFollowToggle = () => {
    if (isFollowing) {
      if (onRequestUnfollow) {
        onRequestUnfollow();
      } else {
        onToggleFollow?.(false);
      }
    } else {
      onToggleFollow?.(true);
    }
  };

  return (
    <section className="w-full max-w-[1152px] min-h-[194px] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 border border-white/15 shadow-xl [background:linear-gradient(0deg,#2B2A7D,#2B2A7D),linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)]">
      {/* 1. Channel Thumbnail: ImageWithFallback (Figma: 160px x 160px, rounded 8px) */}
      <div className="w-40 h-40 rounded-lg shrink-0 overflow-hidden relative shadow-lg border border-white/20 bg-slate-900/60">
        {!imgError && channel.avatar ? (
          <Image
            src={channel.avatar}
            alt={channel.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-3xl font-['Lato',sans-serif]">
            {channel.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* 2. Details Column (Figma Frame 2147239898: width 944px, height 162px, gap 12px) */}
      <div className="flex-1 w-full flex flex-col items-start gap-3 min-w-0">
        {/* Channel Name */}
        <h1 className="text-white text-2xl font-semibold font-['Lato',sans-serif] leading-[140%] tracking-[-0.02em] truncate max-w-full">
          {channel.name}
        </h1>

        {/* Stats Row (Figma Frame 2147239877) */}
        <div className="flex flex-row items-center gap-4 text-white text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em]">
          {/* Video Count */}
          <div className="flex items-center gap-1.5">
            <Video className="w-4 h-4 text-[#B5C8DB]" />
            <span>{channel.videoCount}</span>
          </div>

          {/* Subscriber Count */}
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#B5C8DB]" />
            <span>{channel.subscriberCount}</span>
          </div>
        </div>

        {/* Description Row (Figma: 16px Lato regular #FFFFFF) */}
        <p className="w-full text-white text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em] line-clamp-2">
          {channel.description}
        </p>

        {/* Action Button Row (Figma Frame 2147239899: width 944px, height 44px) */}
        <div className="pt-1">
          {isFollowing ? (
            /* Following Button (Figma Icon Menu: 129px x 44px, rgba(255,255,255,0.2), rounded 8px) */
            <button
              type="button"
              onClick={handleFollowToggle}
              className="w-[129px] h-11 px-4 rounded-lg bg-white/20 hover:bg-white/30 border border-white/10 active:scale-95 text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
            >
              <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
              <span>Following</span>
            </button>
          ) : (
            /* Follow Button */
            <button
              type="button"
              onClick={handleFollowToggle}
              className="w-[129px] h-11 px-4 rounded-lg bg-[linear-gradient(89.44deg,#2563EB_-47.4%,#7A3BED_76.5%,#A842D4_101.93%)] hover:brightness-110 active:scale-95 text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center gap-2 shadow-md shadow-indigo-900/40 transition-all cursor-pointer select-none"
            >
              <UserPlus className="w-4 h-4 text-white" strokeWidth={2.2} />
              <span>Follow</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
