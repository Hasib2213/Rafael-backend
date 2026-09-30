"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Bookmark,
  User,
  Crown,
  LogOut,
  ThumbsUp,
  Star,
} from "lucide-react";
import CurioLogo from "@/components/CurioLogo";
import LogoutModal from "./LogoutModal";
import FeedbackModal from "./FeedbackModal";

interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isAction?: boolean;
}

const navItems: NavItem[] = [
  { name: "Home/Feed", href: "/feed", icon: Home },
  { name: "Following", href: "/following", icon: Users },
  { name: "Library", href: "/library", icon: Bookmark },
  { name: "Profile", href: "/profile", icon: User },
  { name: "My Feedback", href: "/my-feedback", icon: ThumbsUp },
];

interface FeedSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function FeedSidebar({ mobileOpen = false, onMobileClose }: FeedSidebarProps) {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    window.location.href = "/";
  };

  const sidebarContent = (
    <div className="w-60 min-h-full p-4 flex flex-col justify-between z-30 bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] h-full">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Brand Logo Header (Figma Frame 6) */}
        <div className="h-16 pb-4 border-b border-white/20 flex items-center justify-between">
          <Link href="/" className="transition-transform hover:scale-105">
            <CurioLogo size="sm" />
          </Link>
          {onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              className="md:hidden text-white/70 hover:text-white p-1 rounded-lg"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation Buttons (Figma Frame 2147228528) */}
        <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.isAction) {
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setIsFeedbackModalOpen(true);
                    onMobileClose?.();
                  }}
                  className="flex items-center gap-3 h-12 px-3 rounded-lg text-base font-['Lato',sans-serif] transition-all select-none text-white/80 hover:text-white hover:bg-white/10 font-normal w-full text-left cursor-pointer"
                >
                  <Icon className="w-5 h-5 shrink-0 text-[#B5C8DB]" />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            }

            const href = item.href || "/feed";
            const isActive =
              href === "/feed"
                ? pathname === "/feed"
                : pathname.startsWith(href);

            return (
              <Link
                key={item.name}
                href={href}
                onClick={() => onMobileClose?.()}
                className={`flex items-center gap-3 h-12 px-3 rounded-lg text-base font-['Lato',sans-serif] transition-all select-none ${
                  isActive
                    ? "bg-white/20 text-white font-semibold border-l-4 border-[#2563EB] shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10 font-normal"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-white" : "text-[#B5C8DB]"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Premium Banner & Log Out (Figma Frame 2147239891) */}
      <div className="flex flex-col gap-4 mt-6">
        {/* Premium Card */}
        <div className="bg-white/20 border border-white/10 rounded-lg p-3.5 flex flex-col items-center text-center gap-2.5 shadow-md backdrop-blur-sm">
          <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-[#FFB216]">
            <Crown className="w-6 h-6 fill-[#FFB216]/80 text-[#FFB216]" />
          </div>

          <p className="text-sm text-white font-normal leading-snug font-['Lato',sans-serif]">
            Go Premium to unlock full creative control.
          </p>

          <Link
            href="/pricing"
            onClick={() => onMobileClose?.()}
            className="w-full h-11 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] text-white text-sm font-semibold flex items-center justify-center shadow-lg shadow-purple-900/40 hover:brightness-110 active:scale-95 transition-all select-none font-['Lato',sans-serif]"
          >
            Upgrade Now
          </Link>
        </div>

        {/* Log Out Button */}
        <button
          type="button"
          onClick={() => {
            setIsLogoutModalOpen(true);
            onMobileClose?.();
          }}
          className="flex items-center gap-3 h-12 px-3 rounded-lg bg-white/20 border-l-[3px] border-[#FF5B5B] hover:bg-white/30 text-white transition-all text-base font-normal font-['Lato',sans-serif] select-none cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-white shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile, visible on md+) */}
      <aside className="w-60 shrink-0 min-h-screen border-r border-white/20 hidden md:flex flex-col justify-between z-30 sticky top-0 h-screen overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (visible only when toggled on mobile) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative z-10 w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />

      {/* Rate Us / Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </>
  );
}
