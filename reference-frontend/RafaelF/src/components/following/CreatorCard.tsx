"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, PlaySquare, Users, Video } from "lucide-react";

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  initials: string;
  avatarGradient: string;
  description: string;
  videoCount: string;
  subscriberCount: string;
  isFollowing?: boolean;
  createdAt?: number;
}

interface CreatorCardProps {
  creator: Creator;
  onUnfollow?: (id: string) => void;
  onFollow?: (id: string) => void;
  onExplore?: (creator: Creator) => void;
  onRequestUnfollow?: (creator: Creator) => void;
}

export default function CreatorCard({
  creator,
  onUnfollow,
  onFollow,
  onExplore,
  onRequestUnfollow,
}: CreatorCardProps) {
  const following = creator.isFollowing ?? true;
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleToggleFollow = () => {
    if (following) {
      if (onRequestUnfollow) {
        onRequestUnfollow(creator);
      } else {
        onUnfollow?.(creator.id);
      }
    } else {
      onFollow?.(creator.id);
    }
  };

  return (
    <div
      className="w-full max-w-[566px] h-auto min-h-[236px] rounded-2xl p-4 flex flex-row items-start gap-4 transition-all duration-300 hover:shadow-[0px_8px_24px_rgba(43,42,125,0.4)] border border-white/10 [background:linear-gradient(0deg,#2B2A7D,#2B2A7D),linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] relative overflow-hidden group"
    >
      {/* Creator Avatar (Figma: 64px x 64px circular) */}
      <div className="w-16 h-16 rounded-full shrink-0 relative overflow-hidden border-2 border-white/20 shadow-md">
        {creator.avatar && !imageError ? (
          <Image
            src={creator.avatar}
            alt={creator.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-white font-bold text-lg font-['Lato',sans-serif] ${creator.avatarGradient || "bg-gradient-to-tr from-blue-600 to-purple-600"}`}
          >
            {creator.initials || creator.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Main Details Frame (Figma Frame 2147239898: width 454px) */}
      <div className="flex-1 flex flex-col items-start gap-3 min-w-0">
        {/* Top Header: Name, Handle & Following Badge */}
        <div className="w-full flex flex-row justify-between items-start gap-4">
          <div className="flex flex-col items-start min-w-0">
            <h3 className="text-white text-xl font-bold font-['Lato',sans-serif] leading-[140%] tracking-[-0.02em] truncate max-w-[280px]">
              {creator.name}
            </h3>
            <span className="text-[#D0D0D0] text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em]">
              {creator.handle}
            </span>
          </div>

          {/* Following Status Badge (Figma Frame 2147239896: 96px x 29px) */}
          {following ? (
            <div className="h-[29px] px-2 py-1 rounded-lg bg-white/20 flex items-center gap-1 shrink-0 border border-white/10 select-none">
              <Check className="w-4 h-4 text-[#B5C8DB]" strokeWidth={2.2} />
              <span className="text-white text-sm font-normal font-['Lato',sans-serif] leading-[150%]">
                Following
              </span>
            </div>
          ) : (
            <div className="h-[29px] px-2 py-1 rounded-lg bg-white/10 flex items-center gap-1 shrink-0 border border-white/5 select-none">
              <span className="text-white/60 text-sm font-normal font-['Lato',sans-serif] leading-[150%]">
                Followed
              </span>
            </div>
          )}
        </div>

        {/* Channel Description */}
        <div className="w-full min-h-[48px] text-white text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em]">
          <p>
            {expanded ? (
              <>
                {creator.description}{" "}
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="text-[#36C1FB] hover:underline font-medium cursor-pointer inline-block ml-1"
                >
                  See less
                </button>
              </>
            ) : (
              <>
                {creator.description.length > 75
                  ? `${creator.description.slice(0, 75)}.....`
                  : creator.description}
                {creator.description.length > 75 && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="text-[#36C1FB] hover:underline font-medium cursor-pointer inline-block ml-1"
                  >
                    See more
                  </button>
                )}
              </>
            )}
          </p>
        </div>

        {/* Stats Row: Videos & Subscribers (Figma Frame 2147239877) */}
        <div className="flex flex-row items-center gap-4 text-white text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em]">
          {/* Video Count */}
          <div className="flex items-center gap-1 text-[#FEFEFE]">
            <Video className="w-4 h-4 text-[#B5C8DB]" />
            <span>{creator.videoCount}</span>
          </div>

          {/* Subscriber Count */}
          <div className="flex items-center gap-1 text-[#FEFEFE]">
            <Users className="w-4 h-4 text-[#B5C8DB]" />
            <span>{creator.subscriberCount}</span>
          </div>
        </div>

        {/* Action Buttons Row (Figma Frame 2147239899: 454px width) */}
        <div className="w-full flex flex-row items-center gap-3 pt-1">
          {/* Primary Action Button (Figma Primary button: 283px x 44px) */}
          <button
            type="button"
            onClick={() => onExplore?.(creator)}
            className="flex-1 h-11 px-4 rounded-lg bg-[linear-gradient(89.44deg,#2563EB_-47.4%,#7A3BED_76.5%,#A842D4_101.93%)] text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-indigo-900/30 select-none cursor-pointer"
          >
            <span>Explore Channel</span>
          </button>

          {/* Unfollow Button (Figma Icon Menu: 159px x 44px, red border) */}
          <button
            type="button"
            onClick={handleToggleFollow}
            className={`h-11 px-4 rounded-lg border text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center transition-all select-none cursor-pointer ${
              following
                ? "bg-white/20 border-[#FF5B5B] text-white hover:bg-[#FF5B5B]/20 active:scale-[0.98]"
                : "bg-blue-600/30 border-blue-400 text-white hover:bg-blue-600/50 active:scale-[0.98]"
            }`}
          >
            <span>{following ? "Unfollow Channel" : "+ Follow Back"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
