"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, Menu } from "lucide-react";
import NotificationModal from "./NotificationModal";

interface FeedNavbarProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  userSubtitle?: string;
  onMobileMenuToggle?: () => void;
}

export default function FeedNavbar({
  onSearch,
  showSearch = true,
  userSubtitle = "Admin",
  onMobileMenuToggle,
}: FeedNavbarProps) {
  const [searchVal, setSearchVal] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <>
      <header className={`h-20 w-full shrink-0 border-b border-white/20 px-4 sm:px-6 flex items-center ${showSearch ? "justify-between" : "justify-between"} gap-4 shadow-[0px_1px_12px_rgba(0,0,0,0.05)] z-20 sticky top-0 backdrop-blur-md bg-[#2B2A7D]/90 [background-image:linear-gradient(90deg,rgba(79,57,246,0.2)_0%,rgba(43,127,255,0.2)_100%)]`}>
        {/* Left Mobile Menu Toggle Button */}
        {onMobileMenuToggle && (
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="md:hidden w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Input Bar (Figma Frame 2147227758) */}
        {showSearch && (
          <div className="flex-1 max-w-[634px] min-w-0">
            <div className="relative flex items-center h-11 px-3 gap-2.5 rounded-lg bg-white/20 border border-white/10 focus-within:border-white/40 focus-within:bg-white/25 transition-all">
              <Search className="w-5 h-5 text-[#B5C8DB] shrink-0" />
              <input
                type="text"
                value={searchVal}
                onChange={handleSearchChange}
                placeholder="Search by name or email...."
                className="w-full bg-transparent text-sm text-white placeholder-[#D0D0D0] outline-none font-['Lato',sans-serif]"
              />
            </div>
          </div>
        )}

        {/* Right Controls (Figma Frame 2147239857) */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Notification Icon Button with Counter Badge (Figma Desktop - 42) */}
          <button
            type="button"
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            aria-label="Notifications"
            className="relative w-11 h-11 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {/* Notification_Badge (Figma) */}
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#FF4B4B] text-white text-[9px] font-bold font-['Roboto',sans-serif] rounded-full flex items-center justify-center shadow-md animate-pulse">
              12
            </span>
          </button>

          {/* User Profile Pill (Figma Frame 2147227759: Abir Hossain / Admin) */}
          <Link
            href="/profile"
            className="flex items-center gap-2.5 h-11 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 border border-white/10 transition-all select-none"
          >
            {/* Avatar (Figma Ellipse 2: 32px x 32px) */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#A842D4] flex items-center justify-center text-xs font-semibold text-white ring-1 ring-white/40 overflow-hidden shadow-inner shrink-0">
              <span>AH</span>
            </div>

            {/* User Info (Abir Hossain / Admin) */}
            <div className="flex flex-col text-left justify-center">
              <span className="text-base font-semibold text-white leading-tight font-['Lato',sans-serif] -my-0.5">
                Abir Hossain
              </span>
              <span className="text-sm font-normal text-[#D0D0D0] leading-tight font-['Lato',sans-serif]">
                {userSubtitle}
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Figma Desktop - 42: Notification Modal Pop-up */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}

