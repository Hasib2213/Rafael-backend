"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CurioLogo from "./CurioLogo";
import { motion } from "framer-motion";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<"signup" | "login">("login");
  const pathname = usePathname();

  // Sync active tab with URL hash and route changes
  useEffect(() => {
    const syncWithUrl = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash === "#signup" || window.location.pathname.includes("signup")) {
          setActiveTab("signup");
        } else if (hash === "#login" || window.location.pathname.includes("login")) {
          setActiveTab("login");
        }
      }
    };

    syncWithUrl();
    window.addEventListener("hashchange", syncWithUrl);
    window.addEventListener("popstate", syncWithUrl);

    return () => {
      window.removeEventListener("hashchange", syncWithUrl);
      window.removeEventListener("popstate", syncWithUrl);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-figma-card backdrop-blur-xl shadow-[0px_1px_12px_rgba(0,0,0,0.05)] transition-all">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="transition-transform hover:scale-105">
          <CurioLogo size="md" />
        </Link>

        {/* Right: Synced Interactive Auth Pill Toggle */}
        <div className="relative flex items-center p-1 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md">
          {/* Sign Up Link */}
          <Link
            href="/signup"
            onClick={() => setActiveTab("signup")}
            className={`relative z-10 px-5 py-2 text-base transition-colors duration-200 select-none ${
              activeTab === "signup"
                ? "font-bold text-white"
                : "font-medium text-white/80 hover:text-white"
            }`}
          >
            {activeTab === "signup" && (
              <motion.div
                layoutId="auth-active-pill"
                className="absolute inset-0 rounded-lg bg-figma-btn shadow-md shadow-purple-900/40"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-20">Sign Up</span>
          </Link>

          {/* Log In Link */}
          <Link
            href="/login"
            onClick={() => setActiveTab("login")}
            className={`relative z-10 px-5 py-2 text-base transition-colors duration-200 select-none ${
              activeTab === "login"
                ? "font-bold text-white"
                : "font-medium text-white/80 hover:text-white"
            }`}
          >
            {activeTab === "login" && (
              <motion.div
                layoutId="auth-active-pill"
                className="absolute inset-0 rounded-lg bg-figma-btn shadow-md shadow-purple-900/40"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-20">Log In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
