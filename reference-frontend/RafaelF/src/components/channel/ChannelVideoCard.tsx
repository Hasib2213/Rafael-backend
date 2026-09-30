"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, Check, Play, Bookmark } from "lucide-react";

export interface ChannelVideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  channelName: string;
  subscribers: string;
  channelAvatar: string;
  summary: string;
  fullSummary?: string;
  keyTakeaways?: string[];
}

interface ChannelVideoCardProps {
  video: ChannelVideoItem;
  onPlayAudio?: (video: ChannelVideoItem) => void;
}

export default function ChannelVideoCard({ video, onPlayAudio }: ChannelVideoCardProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div className="w-full max-w-[370px] min-h-[428px] rounded-2xl flex flex-col items-center pb-4 gap-4 border border-white/15 shadow-xl transition-all duration-300 hover:border-white/35 hover:-translate-y-1 hover:shadow-indigo-950/50 bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] isolate overflow-hidden">
      {/* 1. Video Thumbnail (Figma imgi_607_default 1: 370px x 183px, rounded 16px 16px 0px 0px) */}
      <div className="relative w-full h-[183px] shrink-0 bg-slate-800 overflow-hidden group">
        {!imgError ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 370px"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-800 to-indigo-900 text-white/50 text-sm">
            Video Thumbnail
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2A7D]/70 via-transparent to-black/20" />

        {/* Play Overlay on Hover */}
        <div
          onClick={() => onPlayAudio?.(video)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration Badge (Figma Frame 2147239871: 43px x 26px, top 10px, right 10px, rgba(0,0,0,0.6)) */}
        <div className="absolute top-2.5 right-2.5 w-[43px] h-[26px] rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-normal text-white font-['Lato',sans-serif]">
          {video.duration}
        </div>
      </div>

      {/* 2. Card Content Body (Figma Frame 2147239873: width 370px, padding 0px 16px, gap 12px) */}
      <div className="w-full px-4 flex-1 flex flex-col justify-between gap-3">
        {/* Title: (Figma: width 338px, height 48px, 16px Lato semibold) */}
        <h3
          title={video.title}
          className="text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] h-[48px] line-clamp-2"
        >
          {video.title}
        </h3>

        {/* Profile Row: (Figma Profile: width 162px, height 43px, gap 8px) */}
        <div className="flex items-center gap-2 h-[43px]">
          {/* Avatar (Figma Ellipse 2: 40px x 40px) */}
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/20 bg-slate-800 relative">
            <Image
              src={video.channelAvatar}
              alt={video.channelName}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Subscribers (Figma Frame 2147239872: width 114px, height 43px) */}
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] truncate -my-0.5">
              {video.channelName}
            </span>
            <span className="text-[#D0D0D0] text-sm font-normal font-['Lato',sans-serif] leading-[150%] truncate">
              {video.subscribers}
            </span>
          </div>
        </div>

        {/* Description Snippet: (Figma: width 338px, height 42px, 14px Lato regular) */}
        <div className="w-full min-h-[42px] text-white text-sm font-normal font-['Lato',sans-serif] leading-[150%]">
          <p className={isExpanded ? "" : "line-clamp-2"}>
            {video.summary}
            {!isExpanded ? (
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="text-[#36C1FB] hover:underline ml-1 font-medium cursor-pointer"
              >
                Read more
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-[#36C1FB] hover:underline ml-1 font-medium cursor-pointer"
              >
                Read less
              </button>
            )}
          </p>
        </div>

        {/* Actions Row: (Figma Frame 2147239877: width 338px, height 44px, gap 12px) */}
        <div className="w-full h-11 flex items-center gap-3 mt-auto">
          {/* Primary Play Button (Figma Primary button: width 226px, height 44px) */}
          <button
            type="button"
            onClick={() => onPlayAudio?.(video)}
            className="flex-1 h-11 px-3 rounded-lg bg-[linear-gradient(89.44deg,#2563EB_-47.4%,#7A3BED_76.5%,#A842D4_101.93%)] text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-indigo-900/40 cursor-pointer select-none"
          >
            {/* 16px Play Triangle Vector */}
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

          {/* Download Button (Figma Icon Menu: width 44px, height 44px, rgba(255,255,255,0.2)) */}
          <button
            type="button"
            onClick={handleDownload}
            title={downloaded ? "Downloaded!" : "Download Audio Briefing"}
            aria-label="Download Audio"
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all cursor-pointer select-none shrink-0 ${
              downloaded
                ? "bg-emerald-500/80 text-white"
                : "bg-white/20 hover:bg-white/30 active:scale-95 text-white border border-white/10"
            }`}
          >
            {downloaded ? (
              <Check className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Download className="w-5 h-5 text-white" strokeWidth={1.8} />
            )}
          </button>

          {/* Bookmark / Library Button (Figma Icon Menu: width 44px, height 44px, rgba(255,255,255,0.2)) */}
          <button
            type="button"
            onClick={handleBookmark}
            title={isSaved ? "Saved to Library" : "Save to Library"}
            aria-label="Bookmark Video"
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
