"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  body: string;
  avatarUrl?: string;
  unread?: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: NotificationItem[];
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Burkina Faso",
    time: "5 mins ago",
    body: "This motivational speech emphasizes taking full responsibility for your life and future....",
    avatarUrl: "/images/happy_user.png",
    unread: true,
  },
  {
    id: "2",
    title: "Burkina Faso",
    time: "5 mins ago",
    body: "This motivational speech emphasizes taking full responsibility for your life and future....",
    avatarUrl: "/images/happy_user.png",
    unread: true,
  },
  {
    id: "3",
    title: "Burkina Faso",
    time: "5 mins ago",
    body: "This motivational speech emphasizes taking full responsibility for your life and future....",
    avatarUrl: "/images/happy_user.png",
    unread: false,
  },
  {
    id: "4",
    title: "Burkina Faso",
    time: "5 mins ago",
    body: "This motivational speech emphasizes taking full responsibility for your life and future....",
    avatarUrl: "/images/happy_user.png",
    unread: false,
  },
];

export default function NotificationModal({
  isOpen,
  onClose,
  notifications = DEFAULT_NOTIFICATIONS,
}: NotificationModalProps) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end select-none animate-in fade-in duration-200"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.71)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-modal-title"
    >
      {/* Figma Frame 2147228103: 655px x 510px, right: 185px, top: 88px */}
      <div
        className="relative w-full max-w-[655px] mt-20 sm:mt-[88px] mx-4 sm:mr-6 lg:mr-[185px] max-h-[calc(100vh-100px)] rounded-2xl p-4 sm:p-6 flex flex-col gap-6 border border-white/20 shadow-[0px_1px_12px_rgba(0,0,0,0.05),0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(43,42,125,0.6)] [background:linear-gradient(0deg,#2B2A7D,#2B2A7D),linear-gradient(90deg,rgba(79,57,246,0.2)_0%,rgba(43,127,255,0.2)_100%)] animate-in zoom-in-95 duration-150 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Figma 'tittle' row: width 623px, height 38px) */}
        <div className="flex items-center justify-between gap-4 w-full shrink-0 border-b border-white/10 pb-4">
          <h2
            id="notification-modal-title"
            className="text-white text-2xl sm:text-[28px] font-semibold font-['Lato',sans-serif] leading-[135%] tracking-[-0.02em]"
          >
            Notifications
          </h2>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-[#B5C8DB] font-medium font-['Inter',sans-serif]">
              {notifications.length} New
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close notifications"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-[#D0D0D0] hover:text-white flex items-center justify-center transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List (Figma Frame 2147228102: width 623px, height 400px scrollable) */}
        <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar max-h-[400px]">
          {notifications.map((item, idx) => (
            <div
              key={item.id}
              className={`group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                idx === 0 ? "rounded-t-xl" : ""
              } bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 shadow-sm`}
            >
              {/* Unread indicator dot */}
              {item.unread && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#FF4B4B] shadow-[0_0_8px_#FF4B4B]" />
              )}

              {/* Logo / Avatar (Figma: 60px x 60px) */}
              <div className="w-[60px] h-[60px] shrink-0 rounded-xl overflow-hidden bg-gradient-to-tr from-[#2563EB]/40 to-[#A842D4]/40 border border-white/20 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                {item.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.avatarUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if broken
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="text-white text-lg font-bold font-['Lato',sans-serif]">
                    {item.title.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Text Container (Figma 'text': width 515px, gap 4px) */}
              <div className="flex flex-col flex-1 min-w-0">
                {/* Title & Time row (Figma 'tittle': 30px height, Lato 20px Medium & Inter 14px Regular) */}
                <div className="flex items-center justify-between gap-2 w-full">
                  <h3 className="text-white text-base sm:text-xl font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.01em] truncate group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs sm:text-sm text-[#D0D0D0] font-normal font-['Inter',sans-serif] leading-[150%] shrink-0 text-right">
                    {item.time}
                  </span>
                </div>

                {/* Body row (Figma 'body': Lato 16px Regular, color #D0D0D0) */}
                <p className="text-[#D0D0D0] text-xs sm:text-sm md:text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em] line-clamp-2 mt-0.5">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
