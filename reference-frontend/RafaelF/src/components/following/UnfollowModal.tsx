"use client";

import React, { useEffect } from "react";

interface UnfollowModalProps {
  isOpen: boolean;
  channelName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function UnfollowModal({
  isOpen,
  channelName,
  onConfirm,
  onCancel,
}: UnfollowModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="unfollow-modal-title"
    >
      {/* Frame 2147228403: 400px x 212px */}
      <div
        className="relative w-full max-w-[400px] rounded-[10px] p-[26px_30px] flex flex-col items-center gap-5 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(43,42,125,0.6)] [background:linear-gradient(0deg,#2B2A7D,#2B2A7D),linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Icon Badge: 46px x 46px circular (bg: rgba(255,255,255,0.2), border-radius: 50px) */}
        <div className="w-[46px] h-[46px] rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-[#FEFEFE]"
          >
            {/* Outer Circle Ring */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 0C5.3727 0 0 5.3727 0 12C0 18.6273 5.3727 24 12 24C18.6273 24 24 18.6273 24 12C24 5.3727 18.6273 0 12 0ZM1.674 12C1.674 9.2615 2.762 6.6351 4.699 4.6987C6.635 2.7623 9.261 1.6744 12 1.6744C14.739 1.6744 17.365 2.7623 19.301 4.6987C21.238 6.6351 22.326 9.2615 22.326 12C22.326 14.7385 21.238 17.3649 19.301 19.3013C17.365 21.2377 14.739 22.3256 12 22.3256C9.261 22.3256 6.635 21.2377 4.699 19.3013C2.762 17.3649 1.674 14.7385 1.674 12Z"
              fill="currentColor"
            />
            {/* Exclamation stem */}
            <path
              d="M13 11C13 10.7348 12.895 10.4804 12.707 10.2929C12.52 10.1054 12.265 10 12 10C11.735 10 11.48 10.1054 11.293 10.2929C11.105 10.4804 11 10.7348 11 11V19C11 19.2652 11.105 19.5196 11.293 19.7071C11.48 19.8946 11.735 20 12 20C12.265 20 12.52 19.8946 12.707 19.7071C12.895 19.5196 13 19.2652 13 19V11Z"
              fill="currentColor"
            />
            {/* Exclamation dot */}
            <path
              d="M13 7C13 7.2652 12.895 7.5196 12.707 7.7071C12.52 7.8946 12.265 8 12 8C11.735 8 11.48 7.8946 11.293 7.7071C11.105 7.5196 11 7.2652 11 7C11 6.7348 11.105 6.4804 11.293 6.2929C11.48 6.1054 11.735 6 12 6C12.265 6 12.52 6.1054 12.707 6.2929C12.895 6.4804 13 6.7348 13 7Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Frame 2147225863: Title & Buttons (width: 340px, height: 94px, gap: 20px) */}
        <div className="w-full max-w-[340px] flex flex-col items-center gap-5">
          {/* Title: Unfollow “Channel Name”. (Sub Header/Sub 01/Semibold: 24px, 600, #FFFFFF) */}
          <h2
            id="unfollow-modal-title"
            className="w-full text-center text-white text-2xl font-semibold font-['Lato',sans-serif] leading-[140%] tracking-[-0.02em] truncate"
            title={`Unfollow “${channelName}”.`}
          >
            Unfollow “{channelName}”.
          </h2>

          {/* Frame 2147225846: Action Buttons Row (width: 340px, height: 40px, gap: 16px) */}
          <div className="w-full flex flex-row items-center justify-center gap-4">
            {/* Confirm Unfollow button (secondary button: 162px x 40px, #FF4B4B) */}
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 h-10 px-4 rounded-lg bg-[#FF4B4B] border-[0.5px] border-[#FF4B4B] text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-md shadow-red-950/40 cursor-pointer select-none"
            >
              <span>Unfollow</span>
            </button>

            {/* Cancel button (Frame 2147239918: 162px x 40px, rgba(255, 255, 255, 0.2)) */}
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 h-10 px-4 rounded-lg bg-white/20 hover:bg-white/30 border border-white/10 text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center active:scale-95 transition-all cursor-pointer select-none"
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
