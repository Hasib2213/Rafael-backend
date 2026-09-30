"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LogoutModal from "@/components/feed/LogoutModal";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  SidePanelCurioBrand,
  SideNavDashboardIcon,
  SideNavUsersIcon,
  SideNavSubscriptionIcon,
  SideNavAdminSettingsIcon,
  SideNavPlatformSettingIcon,
  SideNavReviewsIcon,
  SideNavLogoutIcon,
} from "../UserDetailsIcons";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  category: "Reading" | "Security" | "Billing" | "Audiobook" | "Review" | "Bookmark" | "Milestone";
  title: string;
  description: string;
  device: string;
  ip: string;
  location: string;
  status: string;
  statusType: "success" | "verified" | "neutral" | "warning";
}

const AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "LOG-1001",
    timestamp: "04:12 PM, Jun 25, 2025",
    category: "Reading",
    title: "Completed Chapter 12: 'The Great Gatsby'",
    description: "Reading progress reached 100%. Total reading session duration: 52 minutes.",
    device: "MacBook Pro • Chrome 126",
    ip: "192.168.1.45",
    location: "Los Angeles, CA (US)",
    status: "Completed",
    statusType: "success",
  },
  {
    id: "LOG-1002",
    timestamp: "03:35 PM, Jun 25, 2025",
    category: "Billing",
    title: "Payment Processed: Pro (Monthly) Plan",
    description: "Card ending in 5245 charged $12.00 via Stripe gateway. Invoice #INV-8834.",
    device: "Stripe Webhook Server",
    ip: "54.187.214.12",
    location: "San Francisco, CA (US)",
    status: "Success",
    statusType: "success",
  },
  {
    id: "LOG-1003",
    timestamp: "02:15 PM, Jun 25, 2025",
    category: "Security",
    title: "Session Login & 2FA Verification",
    description: "Two-Factor SMS authentication passed successfully. New session token generated.",
    device: "MacBook Pro • Chrome 126",
    ip: "192.168.1.45",
    location: "Los Angeles, CA (US)",
    status: "Verified",
    statusType: "verified",
  },
  {
    id: "LOG-1004",
    timestamp: "11:40 AM, Jun 24, 2025",
    category: "Audiobook",
    title: "Listened to Chapter 4: 'Sapiens: A Brief History'",
    description: "Audio player stream completed without interruption. Total playtime: 42m 18s.",
    device: "iPhone 15 Pro • iOS 18 App",
    ip: "192.168.1.88",
    location: "Los Angeles, CA (US)",
    status: "100% Played",
    statusType: "neutral",
  },
  {
    id: "LOG-1005",
    timestamp: "09:10 PM, Jun 23, 2025",
    category: "Review",
    title: "Submitted 5.0 Star Review on '1984 by George Orwell'",
    description: "Public review published: 'An absolute masterpiece that remains timeless.'",
    device: "iPad Pro • Safari 17",
    ip: "192.168.1.12",
    location: "Los Angeles, CA (US)",
    status: "5.0 ★ Rating",
    statusType: "success",
  },
  {
    id: "LOG-1006",
    timestamp: "06:50 PM, Jun 22, 2025",
    category: "Bookmark",
    title: "Added 'Atomic Habits' to Personal Library",
    description: "Book saved into user favorites and downloaded for offline reading cache.",
    device: "MacBook Pro • Chrome 126",
    ip: "192.168.1.45",
    location: "Los Angeles, CA (US)",
    status: "Saved",
    statusType: "neutral",
  },
  {
    id: "LOG-1007",
    timestamp: "01:20 PM, Jun 21, 2025",
    category: "Security",
    title: "Password & Security Token Refreshed",
    description: "Automated quarterly security credentials token rotation completed.",
    device: "MacBook Pro • Chrome 126",
    ip: "192.168.1.45",
    location: "Los Angeles, CA (US)",
    status: "Secure",
    statusType: "verified",
  },
  {
    id: "LOG-1008",
    timestamp: "08:45 AM, Jun 20, 2025",
    category: "Milestone",
    title: "Achieved 30-Day Reading Streak Trophy 🏆",
    description: "Read every day for 30 consecutive days. Automated badge awarded to profile.",
    device: "Curio Gamification Engine",
    ip: "Internal Trigger",
    location: "Cloud Cluster",
    status: "Milestone",
    statusType: "success",
  },
  {
    id: "LOG-1009",
    timestamp: "05:30 PM, Jun 19, 2025",
    category: "Reading",
    title: "Highlighted 4 Quotations in 'Thinking, Fast & Slow'",
    description: "Synced 4 annotations to Cloud Bookmarks database.",
    device: "MacBook Pro • Chrome 126",
    ip: "192.168.1.45",
    location: "Los Angeles, CA (US)",
    status: "4 Synced",
    statusType: "neutral",
  },
  {
    id: "LOG-1010",
    timestamp: "02:00 PM, Jun 18, 2025",
    category: "Billing",
    title: "Invoice Generated: #INV-2025-06-25",
    description: "Monthly subscription invoice receipt dispatched to lebronjames@example.com.",
    device: "Automated Mailer Service",
    ip: "Internal Daemon",
    location: "System",
    status: "Dispatched",
    statusType: "neutral",
  },
];

export default function CompleteActivityAuditPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isExporting, setIsExporting] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("curio_admin_user");
      window.location.href = "/admin/login";
    }
  };

  // Filter logs by search term & category
  const filteredLogs = useMemo(() => {
    return AUDIT_LOGS.filter((entry) => {
      const matchesCategory =
        selectedCategory === "All" || entry.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Activity Audit Log for Lebron James exported successfully as CSV (1,450 records).");
    }, 800);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Reading":
        return "bg-[rgba(43,127,255,0.25)] text-[#8BC5FF] border-[rgba(43,127,255,0.4)]";
      case "Security":
        return "bg-[rgba(16,185,129,0.2)] text-[#6EE7B7] border-[rgba(16,185,129,0.4)]";
      case "Billing":
        return "bg-[rgba(159,82,252,0.25)] text-[#D4A7FF] border-[rgba(159,82,252,0.4)]";
      case "Audiobook":
        return "bg-[rgba(245,158,11,0.2)] text-[#FCD34D] border-[rgba(245,158,11,0.4)]";
      case "Review":
        return "bg-[rgba(236,72,153,0.2)] text-[#F472B6] border-[rgba(236,72,153,0.4)]";
      case "Milestone":
        return "bg-[rgba(255,215,0,0.2)] text-[#FFE066] border-[rgba(255,215,0,0.4)]";
      default:
        return "bg-white/20 text-white border-white/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col lg:flex-row relative overflow-x-hidden selection:bg-[#3E8AFB]/30 selection:text-white">
      {/* -------------------------------------------------------------
          LEFT SIDE PANEL (Desktop 240px Curio Admin Side Panel)
      ------------------------------------------------------------- */}
      <aside className="hidden lg:flex lg:w-[240px] shrink-0 border-r border-white/20 flex-col justify-between p-4 sticky top-0 h-screen z-30 bg-[#2B2A7D] bg-gradient-to-r from-[rgba(43,127,255,0.2)] to-[rgba(79,57,246,0.2)]">
        <div className="flex flex-col gap-6 w-full">
          {/* Header Brand */}
          <div className="w-full pb-4 border-b border-white/20 flex items-center">
            <Link href="/admin/dashboard" className="transition-transform hover:scale-[1.02]">
              <SidePanelCurioBrand />
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2 w-full">
            <Link
              href="/admin/dashboard"
              className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
            >
              <SideNavDashboardIcon />
              <span className="font-['Lato'] font-medium text-base">Dashboard Overview</span>
            </Link>

            <Link
              href="/admin/dashboard/user-details"
              className="w-full h-12 flex items-center gap-3 pl-3 pr-4 rounded-lg bg-white/20 border-l-4 border-[#2563EB] text-white transition-all hover:bg-white/[0.25]"
            >
              <SideNavUsersIcon />
              <span className="font-['Lato'] font-medium text-base">User Management</span>
            </Link>

            <Link
              href="/admin/dashboard/subscription-plan"
              className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
            >
              <SideNavSubscriptionIcon />
              <span className="font-['Lato'] font-medium text-base">Subscription plan</span>
            </Link>

            <Link
              href="/admin/dashboard/admin-settings"
              className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
            >
              <SideNavAdminSettingsIcon />
              <span className="font-['Lato'] font-medium text-base">Admin Settings</span>
            </Link>

            <Link
              href="/admin/dashboard/platform-setting"
              className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
            >
              <SideNavPlatformSettingIcon />
              <span className="font-['Lato'] font-medium text-base">Platform Setting</span>
            </Link>

            <Link
              href="/admin/dashboard/user-reviews"
              className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
            >
              <SideNavReviewsIcon />
              <span className="font-['Lato'] font-medium text-base">User Reviews</span>
            </Link>
          </nav>
        </div>

        {/* Log Out Button */}
        <div className="w-full pt-4 border-t border-white/10">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full h-12 flex items-center gap-3 pl-3 pr-4 rounded-lg bg-white/20 border-l-[3px] border-[#FF5B5B] text-white hover:bg-white/[0.28] transition-all cursor-pointer"
          >
            <SideNavLogoutIcon />
            <span className="font-['Lato'] font-normal text-base tracking-tight">Log Out</span>
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------------------
          MOBILE DRAWER SIDEBAR
      ------------------------------------------------------------- */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
            />
            {/* Slide Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[270px] max-w-[85vw] border-r border-white/20 flex flex-col justify-between p-4 z-50 lg:hidden shadow-2xl overflow-y-auto bg-[#2B2A7D] bg-gradient-to-r from-[rgba(43,127,255,0.2)] to-[rgba(79,57,246,0.2)]"
            >
              <div className="flex flex-col gap-6 w-full">
                <div className="w-full pb-4 border-b border-white/20 flex items-center justify-between">
                  <Link href="/admin/dashboard" onClick={() => setIsMobileSidebarOpen(false)}>
                    <SidePanelCurioBrand />
                  </Link>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Close sidebar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2 w-full">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
                  >
                    <SideNavDashboardIcon />
                    <span className="font-['Lato'] font-medium text-base">Dashboard Overview</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/user-details"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 flex items-center gap-3 pl-3 pr-4 rounded-lg bg-white/20 border-l-4 border-[#2563EB] text-white transition-all hover:bg-white/[0.25]"
                  >
                    <SideNavUsersIcon />
                    <span className="font-['Lato'] font-medium text-base">User Management</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/subscription-plan"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
                  >
                    <SideNavSubscriptionIcon />
                    <span className="font-['Lato'] font-medium text-base">Subscription plan</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/admin-settings"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
                  >
                    <SideNavAdminSettingsIcon />
                    <span className="font-['Lato'] font-medium text-base">Admin Settings</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/platform-setting"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
                  >
                    <SideNavPlatformSettingIcon />
                    <span className="font-['Lato'] font-medium text-base">Platform Setting</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/user-reviews"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 flex items-center gap-3 px-4 rounded-lg text-[#B5C8DB] hover:text-white hover:bg-white/10 transition-all"
                  >
                    <SideNavReviewsIcon />
                    <span className="font-['Lato'] font-medium text-base">User Reviews</span>
                  </Link>
                </nav>
              </div>

              <div className="w-full pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="w-full h-12 flex items-center gap-3 pl-3 pr-4 rounded-lg bg-white/20 border-l-[3px] border-[#FF5B5B] text-white hover:bg-white/[0.28] transition-all cursor-pointer"
                >
                  <SideNavLogoutIcon />
                  <span className="font-['Lato'] font-normal text-base tracking-tight">Log Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
          MAIN CONTENT CONTAINER
      ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAV BAR (80px) */}
        <header className="h-16 sm:h-20 w-full px-4 sm:px-6 lg:px-8 border-b border-white/20 flex items-center justify-between sticky top-0 z-20 shadow-[0px_1px_12px_rgba(0,0,0,0.05)] bg-[#2B2A7D] bg-gradient-to-r from-[rgba(79,57,246,0.2)] to-[rgba(43,127,255,0.2)] backdrop-blur-md">
          {/* Left: Hamburger & Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer mr-0.5 shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/admin/dashboard/user-details"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#B5C8DB] hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 shrink-0 whitespace-nowrap"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back <span className="hidden xs:inline">to User Details</span></span>
            </Link>
            <span className="text-white/30 hidden md:inline">/</span>
            <span className="text-sm font-medium text-[#B5C8DB] hidden md:inline truncate max-w-[120px]">Lebron James</span>
            <span className="text-white/30 hidden lg:inline">/</span>
            <span className="text-sm font-semibold text-white hidden lg:inline truncate">Complete Activity Audit</span>
          </div>

          {/* Right: Admin Profile */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <div className="h-10 sm:h-11 px-2.5 sm:px-3 py-1 rounded-lg bg-white/20 flex items-center gap-2 sm:gap-2.5 border border-white/10">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/40 bg-gradient-to-tr from-[#3E8AFB] to-[#9369FD] flex items-center justify-center text-white font-bold text-xs shrink-0">
                AH
              </div>
              <div className="flex flex-col text-left">
                <span className="font-['Lato'] font-medium text-xs sm:text-sm text-white leading-tight truncate max-w-[75px] xs:max-w-none">Abir Hossain</span>
                <span className="font-['Lato'] font-normal text-[10px] sm:text-xs text-[#D0D0D0] leading-tight">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE BODY (1152px max width) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1200px] w-full mx-auto">
          {/* =========================================================
              HEADER CARD: USER IDENTITY & EXPORT ACTION STRIP
          ========================================================= */}
          <section className="w-full rounded-2xl p-6 border border-white/10 shadow-2xl bg-[#2B2A7D] bg-gradient-to-r from-[rgba(43,127,255,0.2)] to-[rgba(79,57,246,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* User Avatar */}
              <div className="w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden bg-[#181F40] shadow-lg shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                  alt="Lebron James"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Identity Info */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-['Lato'] font-bold text-2xl text-white tracking-tight">
                    Lebron James
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                    Active User
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgba(43,127,255,0.2)] border border-[rgba(43,127,255,0.4)] text-[#8BC5FF]">
                    Pro (Monthly)
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#B5C8DB] flex-wrap">
                  <span>@lebronjames</span>
                  <span>•</span>
                  <span>ID: #USR-98421</span>
                  <span>•</span>
                  <span>Total Logged Events: <strong>1,450</strong></span>
                  <span>•</span>
                  <span className="text-emerald-400">● Last active 12 mins ago</span>
                </div>
              </div>
            </div>

            {/* Right Export Button */}
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="h-11 px-5 rounded-lg bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] hover:brightness-110 active:scale-95 text-white font-['Lato'] font-medium text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer w-full md:w-auto justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{isExporting ? "Exporting..." : "Export Audit Log (CSV)"}</span>
              </button>
            </div>
          </section>

          {/* =========================================================
              4 AUDIT STAT METRIC CARDS (273px x 112px style)
          ========================================================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Total Events */}
            <div className="h-[112px] rounded-xl p-[20px_16px] flex items-center bg-[#2B2A7D] bg-gradient-to-r from-[rgba(43,127,255,0.2)] to-[rgba(79,57,246,0.2)] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] border border-white/10 hover:border-white/20 transition-all">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex items-center justify-between w-full">
                  <span className="font-['Lato'] font-medium text-2xl text-white tracking-tight leading-[140%]">
                    1,450
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,239,223,0.3)] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
                <span className="font-['Lato'] font-medium text-base text-white leading-[150%]">
                  Total Events Recorded
                </span>
              </div>
            </div>

            {/* Card 2: Reading & Audio Sessions */}
            <div className="h-[112px] rounded-xl p-[20px_16px] flex items-center bg-[#2B2A7D] bg-gradient-to-r from-[rgba(43,127,255,0.2)] to-[rgba(79,57,246,0.2)] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] border border-white/10 hover:border-white/20 transition-all">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex items-center justify-between w-full">
                  <span className="font-['Lato'] font-medium text-2xl text-white tracking-tight leading-[140%]">
                    892
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,239,223,0.3)] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <span className="font-['Lato'] font-medium text-base text-white leading-[150%]">
                  Content & Audio Sessions
                </span>
              </div>
            </div>

            {/* Card 3: Security & Logins */}
            <div className="h-[112px] rounded-xl p-[20px_16px] flex items-center bg-[#2B2A7D] bg-gradient-to-r from-[rgba(43,127,255,0.2)] to-[rgba(79,57,246,0.2)] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] border border-white/10 hover:border-white/20 transition-all">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex items-center justify-between w-full">
                  <span className="font-['Lato'] font-medium text-2xl text-white tracking-tight leading-[140%]">
                    84
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,239,223,0.3)] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <span className="font-['Lato'] font-medium text-base text-white leading-[150%]">
                  Auth & Security Checks
                </span>
              </div>
            </div>

            {/* Card 4: Anomalies / Flags */}
            <div className="h-[112px] rounded-xl p-[20px_16px] flex items-center bg-[#2B2A7D] bg-gradient-to-r from-[rgba(43,127,255,0.2)] to-[rgba(79,57,246,0.2)] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] border border-white/10 hover:border-white/20 transition-all">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex items-center justify-between w-full">
                  <span className="font-['Lato'] font-medium text-2xl text-emerald-400 tracking-tight leading-[140%]">
                    0 (Clean)
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="font-['Lato'] font-medium text-base text-white leading-[150%]">
                  Security Flags & Alerts
                </span>
              </div>
            </div>
          </section>

          {/* =========================================================
              SEARCH & FILTER TOOLBAR
          ========================================================= */}
          <section className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B5C8DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by action, keyword, book title, IP address..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/10 border border-white/15 focus:border-[#2B7FFF] text-sm text-white placeholder-white/40 outline-none transition-all shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {["All", "Reading", "Security", "Billing", "Audiobook", "Review"].map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`h-10 px-4 rounded-lg text-sm font-['Lato'] font-medium transition-all whitespace-nowrap cursor-pointer border ${
                      isActive
                        ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] border-transparent text-white shadow-md scale-[1.02]"
                        : "bg-white/10 hover:bg-white/20 border-white/10 text-[#B5C8DB] hover:text-white"
                    }`}
                  >
                    {cat === "All" ? "All Events" : cat}
                  </button>
                );
              })}
            </div>
          </section>

          {/* =========================================================
              COMPREHENSIVE AUDIT LOG TABLE (Frame 2147239933 Style)
          ========================================================= */}
          <section className="w-full flex flex-col gap-4">
            <div className="w-full overflow-x-auto pb-2">
              <div
                className="w-full min-w-[960px] rounded-[16px] overflow-hidden flex flex-col shadow-2xl border border-white/10"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                {/* Table Header (52px, rgba(43,127,255,0.3)) */}
                <div className="w-full h-[52px] px-6 flex items-center justify-between bg-[rgba(43,127,255,0.3)] rounded-t-[16px] shrink-0 border-b border-white/10">
                  <div className="w-[180px] shrink-0 text-left font-['Lato'] font-medium text-sm leading-[150%] uppercase text-white">
                    TIMESTAMP
                  </div>
                  <div className="w-[120px] shrink-0 text-center font-['Lato'] font-medium text-sm leading-[150%] uppercase text-white">
                    CATEGORY
                  </div>
                  <div className="flex-1 min-w-[280px] px-4 text-left font-['Lato'] font-medium text-sm leading-[150%] uppercase text-white">
                    ACTIVITY DESCRIPTION
                  </div>
                  <div className="w-[200px] shrink-0 text-left font-['Lato'] font-medium text-sm leading-[150%] uppercase text-white">
                    DEVICE & IP
                  </div>
                  <div className="w-[120px] shrink-0 text-right font-['Lato'] font-medium text-sm leading-[150%] uppercase text-white">
                    STATUS
                  </div>
                </div>

                {/* Table Rows (68px each with alternating background & hover glow) */}
                <div className="flex flex-col w-full">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log, idx) => {
                      const isEvenRow = idx % 2 === 0;
                      const isLastRow = idx === filteredLogs.length - 1;

                      return (
                        <div
                          key={log.id}
                          className={`group relative w-full h-[68px] px-6 flex items-center justify-between shrink-0 transition-all duration-200 cursor-pointer ${
                            isLastRow ? "rounded-b-[16px]" : ""
                          } hover:brightness-110 hover:shadow-[inset_0_0_24px_rgba(43,127,255,0.25)] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-gradient-to-b before:from-[#2B7FFF] before:to-[#4F39F6] before:opacity-0 hover:before:opacity-100 before:transition-opacity border-b border-white/5 last:border-b-0`}
                          style={{
                            background: isEvenRow
                              ? "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)"
                              : "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                          }}
                        >
                          {/* Col 1: Timestamp */}
                          <div className="w-[180px] shrink-0 text-left font-['Lato'] font-normal text-sm leading-[150%] text-[#DCE6F2] group-hover:text-white transition-colors">
                            {log.timestamp}
                          </div>

                          {/* Col 2: Category Badge */}
                          <div className="w-[120px] shrink-0 flex items-center justify-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeClass(
                                log.category
                              )} shadow-sm group-hover:scale-105 transition-transform`}
                            >
                              {log.category}
                            </span>
                          </div>

                          {/* Col 3: Description */}
                          <div className="flex-1 min-w-[280px] px-4 flex flex-col justify-center">
                            <span className="font-['Lato'] font-medium text-sm text-white leading-snug group-hover:text-[#8BC5FF] transition-colors truncate">
                              {log.title}
                            </span>
                            <span className="font-['Inter'] font-normal text-xs text-[#B5C8DB] truncate mt-0.5">
                              {log.description}
                            </span>
                          </div>

                          {/* Col 4: Device & IP */}
                          <div className="w-[200px] shrink-0 flex flex-col text-left">
                            <span className="font-['Lato'] font-normal text-xs text-white truncate">
                              {log.device}
                            </span>
                            <span className="font-['Inter'] font-normal text-xs text-[#B5C8DB] font-mono mt-0.5 truncate">
                              {log.ip} • {log.location}
                            </span>
                          </div>

                          {/* Col 5: Status Pill */}
                          <div className="w-[120px] shrink-0 text-right">
                            <span className="inline-block px-3 py-1 rounded-md bg-white/10 border border-white/15 text-xs font-medium text-white group-hover:bg-white/20 transition-all">
                              {log.status}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full h-48 flex flex-col items-center justify-center text-center p-6 text-white/60">
                      <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-medium">No activity audit logs matched your query</p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("All");
                        }}
                        className="mt-2 text-xs text-[#8BC5FF] hover:underline cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =========================================================
                PAGINATION FOOTER (Responsive)
            ========================================================= */}
            <div className="w-full min-h-[40px] flex flex-col sm:flex-row items-center justify-between mt-2 gap-4 py-2">
              {/* Left Result Selector */}
              <div className="flex items-center gap-2.5 h-[40px] flex-wrap justify-center sm:justify-start">
                <span className="font-['Lato'] font-medium text-sm text-white">Showing</span>
                <button
                  onClick={() => setRowsPerPage(rowsPerPage === 10 ? 20 : 10)}
                  className="w-[53px] h-[36px] sm:h-[40px] px-2 rounded-[6px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.28)] flex items-center justify-center gap-1.5 text-white transition-all cursor-pointer"
                >
                  <CaretDownIcon className="w-3.5 h-3.5 text-[#B5C8DB] shrink-0" />
                  <span className="font-['Lato'] font-normal text-sm text-white">{rowsPerPage}</span>
                </button>
                <span className="font-['Lato'] font-medium text-sm text-white">
                  Out of 1,450
                </span>
              </div>

              {/* Right Pagination Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 select-none flex-wrap justify-center">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 sm:px-3 h-[36px] sm:h-[40px] rounded-[6px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.28)] disabled:opacity-40 flex items-center justify-center gap-1.5 transition-all cursor-pointer text-white text-xs sm:text-sm"
                >
                  <CaretLeftIcon className="w-3.5 h-3.5 text-[#B5C8DB] shrink-0" />
                  <span className="font-['Lato'] font-medium">Prev</span>
                </button>

                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-[32px] sm:w-[36px] h-[36px] sm:h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-xs sm:text-sm text-white transition-all cursor-pointer ${
                    currentPage === 1
                      ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] shadow-md"
                      : "bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.28)]"
                  }`}
                >
                  1
                </button>

                <button
                  onClick={() => setCurrentPage(2)}
                  className={`w-[32px] sm:w-[36px] h-[36px] sm:h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-xs sm:text-sm text-white transition-all cursor-pointer ${
                    currentPage === 2
                      ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] shadow-md"
                      : "bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.28)]"
                  }`}
                >
                  2
                </button>

                <button
                  onClick={() => setCurrentPage(3)}
                  className={`w-[32px] sm:w-[36px] h-[36px] sm:h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-xs sm:text-sm text-white transition-all cursor-pointer ${
                    currentPage === 3
                      ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] shadow-md"
                      : "bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.28)]"
                  }`}
                >
                  3
                </button>

                <div className="w-[20px] sm:w-[26px] h-[36px] sm:h-[40px] flex items-center justify-center font-['Lato'] font-normal text-xs sm:text-sm text-white select-none">
                  ...
                </div>

                <button
                  onClick={() => setCurrentPage(145)}
                  className={`w-[34px] sm:w-[40px] h-[36px] sm:h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-xs sm:text-sm text-white transition-all cursor-pointer ${
                    currentPage === 145
                      ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] shadow-md"
                      : "bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.28)]"
                  }`}
                >
                  145
                </button>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(145, p + 1))}
                  disabled={currentPage === 145}
                  className="px-2.5 sm:px-3 h-[36px] sm:h-[40px] rounded-[6px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.28)] disabled:opacity-40 flex items-center justify-center gap-1.5 transition-all cursor-pointer text-white text-xs sm:text-sm"
                >
                  <span className="font-['Lato'] font-medium">Next</span>
                  <CaretRightIcon className="w-3.5 h-3.5 text-[#B5C8DB] shrink-0" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        title="Are you sure you want to Log out?"
      />
    </div>
  );
}
