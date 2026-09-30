"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import CurioLogo from "@/components/CurioLogo";
import LogoutModal from "@/components/feed/LogoutModal";
import {
  SideNavDashboardIcon,
  SideNavUsersIcon,
  SideNavSubscriptionIcon,
  SideNavAdminSettingsIcon,
  SideNavPlatformSettingIcon,
  SideNavReviewsIcon,
  SideNavLogoutIcon,
  FigmaCardStatisticIcon,
  FluentSearchIcon,
  MdiEyeIcon,
  YellowStarIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "../user-details/UserDetailsIcons";

type PlanType = "Free Member" | "Pro Member" | "Enterprise Member";

interface UserActivityRow {
  id: string;
  dateTime: string;
  userType: PlanType;
  name: string;
  activityTitle: string;
  activityDesc: string;
  rating?: number;
  email: string;
}

const FREE_MEMBERS: UserActivityRow[] = [
  { id: "FR-001", dateTime: "08:30 PM, Jun 25, 2026", userType: "Free Member", name: "Alice Park", activityTitle: "New User Registered", activityDesc: "Alice Park joined as Free member", email: "alice.p@gmail.com" },
  { id: "FR-002", dateTime: "09:15 AM, Jun 25, 2026", userType: "Free Member", name: "Michael Chen", activityTitle: "Video Processed", activityDesc: "AI Trends 2026.mp4 completed", email: "m.chen@outlook.com" },
  { id: "FR-003", dateTime: "11:00 AM, Jun 25, 2026", userType: "Free Member", name: "David Kim", activityTitle: "Platform Review 4/5", activityDesc: "Added a review about the platform", rating: 4, email: "david.kim@tech.io" },
  { id: "FR-004", dateTime: "02:45 PM, Jun 24, 2026", userType: "Free Member", name: "James Wilson", activityTitle: "Download", activityDesc: "Motive pro video was downloaded", email: "james.w@gmail.com" },
  { id: "FR-005", dateTime: "05:30 PM, Jun 24, 2026", userType: "Free Member", name: "Mia Thompson", activityTitle: "Audio Played", activityDesc: "Morning Briefing audio played", email: "mia.t@yahoo.com" },
  { id: "FR-006", dateTime: "10:20 AM, Jun 24, 2026", userType: "Free Member", name: "Liam Torres", activityTitle: "Added to Library", activityDesc: "Curio Intro video added to library", email: "liam.t@hotmail.com" },
  { id: "FR-007", dateTime: "07:00 PM, Jun 23, 2026", userType: "Free Member", name: "Olivia Scott", activityTitle: "Platform Review 5/5", activityDesc: "Gave 5-star rating to the platform", rating: 5, email: "olivia.s@gmail.com" },
];

const PRO_MEMBERS: UserActivityRow[] = [
  { id: "PR-001", dateTime: "08:30 PM, Jun 25, 2026", userType: "Pro Member", name: "Sarah Johnson", activityTitle: "New User Registered", activityDesc: "Sarah Johnson joined as Pro member", email: "sarah.j@gmail.com" },
  { id: "PR-002", dateTime: "04:45 PM, Jun 24, 2026", userType: "Pro Member", name: "Lisa Anderson", activityTitle: "Subscription Upgrade", activityDesc: "Free to Pro plan upgraded", email: "lisa.a@gmail.com" },
  { id: "PR-003", dateTime: "11:10 AM, Jun 24, 2026", userType: "Pro Member", name: "Ryan Mitchell", activityTitle: "Video Processed", activityDesc: "Product Demo 2026.mp4 completed", email: "ryan.m@promail.com" },
  { id: "PR-004", dateTime: "03:30 PM, Jun 23, 2026", userType: "Pro Member", name: "Natalie Cole", activityTitle: "Platform Review 4/5", activityDesc: "Excellent analytics features", rating: 4, email: "natalie.c@outlook.com" },
  { id: "PR-005", dateTime: "09:00 AM, Jun 23, 2026", userType: "Pro Member", name: "Ethan Rogers", activityTitle: "Audio Played", activityDesc: "Daily Digest episode played", email: "ethan.r@yahoo.com" },
  { id: "PR-006", dateTime: "01:15 PM, Jun 22, 2026", userType: "Pro Member", name: "Chloe Warren", activityTitle: "Added to Library", activityDesc: "Pro webinar series added to library", email: "chloe.w@gmail.com" },
  { id: "PR-007", dateTime: "06:45 PM, Jun 22, 2026", userType: "Pro Member", name: "Noah Phillips", activityTitle: "Download", activityDesc: "Advanced AI report downloaded", email: "noah.p@techcorp.io" },
];

const ENTERPRISE_MEMBERS: UserActivityRow[] = [
  { id: "EN-001", dateTime: "10:30 AM, Jun 25, 2026", userType: "Enterprise Member", name: "Emma Watson", activityTitle: "Audio Played", activityDesc: "Morning Briefing audio played", email: "emma.w@company.org" },
  { id: "EN-002", dateTime: "02:00 PM, Jun 24, 2026", userType: "Enterprise Member", name: "Sophia Taylor", activityTitle: "Added to Library", activityDesc: "Motive pro video was added to library", email: "sophia.t@gmail.com" },
  { id: "EN-003", dateTime: "08:00 AM, Jun 24, 2026", userType: "Enterprise Member", name: "Marcus Webb", activityTitle: "Subscription Upgrade", activityDesc: "Pro to Enterprise plan upgraded", email: "marcus.w@enterprise.io" },
  { id: "EN-004", dateTime: "05:00 PM, Jun 23, 2026", userType: "Enterprise Member", name: "Isabella Grant", activityTitle: "Video Processed", activityDesc: "Enterprise keynote 2026.mp4 done", email: "isabella.g@corp.com" },
  { id: "EN-005", dateTime: "11:30 AM, Jun 23, 2026", userType: "Enterprise Member", name: "Alexander Ford", activityTitle: "Platform Review 5/5", activityDesc: "Outstanding enterprise dashboard", rating: 5, email: "alex.f@fortune500.com" },
  { id: "EN-006", dateTime: "03:45 PM, Jun 22, 2026", userType: "Enterprise Member", name: "Victoria Hayes", activityTitle: "Download", activityDesc: "Q2 Analytics report downloaded", email: "victoria.h@bigco.com" },
  { id: "EN-007", dateTime: "10:00 AM, Jun 22, 2026", userType: "Enterprise Member", name: "Benjamin Cruz", activityTitle: "New User Registered", activityDesc: "Benjamin Cruz joined as Enterprise", email: "ben.c@global.org" },
];

function UserTypeBadge({ type }: { type: PlanType }) {
  const cfg: Record<PlanType, { bg: string; text: string; label: string }> = {
    "Free Member": { bg: "bg-white/10 border border-white/20", text: "text-slate-200", label: "Free" },
    "Pro Member": { bg: "bg-blue-500/20 border border-blue-400/30", text: "text-blue-200", label: "Pro" },
    "Enterprise Member": { bg: "bg-purple-500/20 border border-purple-400/30", text: "text-purple-200", label: "Enterprise" },
  };
  const { bg, text, label } = cfg[type];
  return (
    <span className={`inline-flex items-center justify-center h-[22px] px-2 rounded-[4px] ${bg} ${text} font-['Lato'] font-medium text-[12px] leading-[150%] whitespace-nowrap`}>
      {label}
    </span>
  );
}

function HamburgerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function SidebarContent({ onClose, onLogoutRequest }: { onClose?: () => void; onLogoutRequest?: () => void }) {
  const sidebarBg = "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43,127,255,0.2) 0%, rgba(79,57,246,0.2) 100%)";
  return (
    <>
      <div className="flex flex-col gap-6 w-full flex-1 min-h-0 overflow-y-auto">
        {/* Brand */}
        <div className="w-full pb-4 border-b border-white/20 flex items-center justify-between pl-1 shrink-0">
          <Link href="/admin/dashboard" onClick={onClose} className="transition-transform hover:scale-[1.02]">
            <CurioLogo size="sm" />
          </Link>
          {onClose && (
            <button onClick={onClose} className="text-white/60 hover:text-white text-xl cursor-pointer mr-1 leading-none">
              &#x2715;
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 w-full">
          <Link href="/admin/dashboard" onClick={onClose}
            className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none">
            <SideNavDashboardIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
            <span className="font-['Lato'] font-medium text-[16px] text-white">Dashboard Overview</span>
          </Link>

          <div className="w-full h-12 rounded-lg flex items-center gap-3 px-3 select-none"
            style={{ background: "rgba(255,255,255,0.2)", borderLeft: "4px solid #2563EB" }}>
            <SideNavUsersIcon className="w-5 h-5 text-white shrink-0" />
            <span className="font-['Lato'] font-medium text-[16px] text-white">User Management</span>
          </div>

          <Link
            href="/admin/dashboard/subscription-plan"
            onClick={onClose}
            className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
          >
            <SideNavSubscriptionIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
            <span className="font-['Lato'] font-normal text-[16px] text-white">Subscription plan</span>
          </Link>

          <Link
            href="/admin/dashboard/admin-settings"
            onClick={onClose}
            className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
          >
            <SideNavAdminSettingsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
            <span className="font-['Lato'] font-normal text-[16px] text-white">Admin Settings</span>
          </Link>

          <Link
            href="/admin/dashboard/platform-setting"
            onClick={onClose}
            className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
          >
            <SideNavPlatformSettingIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
            <span className="font-['Lato'] font-normal text-[16px] text-white">Platform Setting</span>
          </Link>

          <Link
            href="/admin/dashboard/user-reviews"
            className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
          >
            <SideNavReviewsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
            <span className="font-['Lato'] font-normal text-[16px] text-white">User Reviews</span>
          </Link>
        </nav>
      </div>

      {/* Log Out */}
      <div className="w-full pt-4 shrink-0">
        <button
          type="button"
          onClick={() => {
            if (onClose) onClose();
            if (onLogoutRequest) onLogoutRequest();
          }}
          className="w-full h-12 rounded-lg flex items-center gap-3 px-3 text-white hover:bg-red-500/20 active:scale-[0.99] transition-all select-none cursor-pointer text-left"
          style={{ background: "rgba(255,255,255,0.2)", borderLeft: "3px solid #FF5B5B" }}>
          <SideNavLogoutIcon className="w-5 h-5 text-red-400 shrink-0" />
          <span className="font-['Lato'] font-normal text-[16px] tracking-[-0.02em] text-white">Log Out</span>
        </button>
      </div>
    </>
  );
}

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlanTab, setSelectedPlanTab] = useState<PlanType>("Free Member");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPlan, setNewMemberPlan] = useState<PlanType>("Pro Member");
  const [extraRows, setExtraRows] = useState<UserActivityRow[]>([]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("curio_admin_user");
      window.location.href = "/admin/login";
    }
  };

  const baseRows = useMemo<UserActivityRow[]>(() => {
    const map: Record<PlanType, UserActivityRow[]> = {
      "Free Member": FREE_MEMBERS,
      "Pro Member": PRO_MEMBERS,
      "Enterprise Member": ENTERPRISE_MEMBERS,
    };
    return map[selectedPlanTab];
  }, [selectedPlanTab]);

  const filteredRows = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const all = [...extraRows.filter((r) => r.userType === selectedPlanTab), ...baseRows];
    if (!q) return all;
    return all.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.activityTitle.toLowerCase().includes(q) ||
      r.activityDesc.toLowerCase().includes(q) ||
      r.dateTime.toLowerCase().includes(q)
    );
  }, [baseRows, extraRows, selectedPlanTab, searchQuery]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;
    const newRow: UserActivityRow = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      dateTime: "Just now",
      userType: newMemberPlan,
      name: newMemberName.trim(),
      activityTitle: "New User Registered",
      activityDesc: `${newMemberName.trim()} joined as ${newMemberPlan}`,
      email: newMemberEmail.trim(),
    };
    setExtraRows((prev) => [newRow, ...prev]);
    setNewMemberName("");
    setNewMemberEmail("");
    setShowAddModal(false);
    setSelectedPlanTab(newMemberPlan);
  };

  const gridCols = "grid-cols-[180px_137px_120px_239px_180px_72px]";
  const sidebarBg = "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43,127,255,0.2) 0%, rgba(79,57,246,0.2) 100%)";

  const tabs: { key: PlanType; label: string; shortLabel: string }[] = [
    { key: "Free Member", label: "Free Members", shortLabel: "Free" },
    { key: "Pro Member", label: "Pro Members", shortLabel: "Pro" },
    { key: "Enterprise Member", label: "Enterprise Members", shortLabel: "Enterprise" },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-row overflow-x-hidden selection:bg-[#3E8AFB]/30 selection:text-white">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex w-[240px] shrink-0 border-r border-white/20 flex-col justify-between p-4 sticky top-0 h-screen z-30"
        style={{ background: sidebarBg }}
      >
        <SidebarContent onLogoutRequest={() => setIsLogoutModalOpen(true)} />
      </aside>

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[240px] z-50 flex flex-col p-4 border-r border-white/20 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: sidebarBg }}
      >
        <SidebarContent
          onClose={() => setSidebarOpen(false)}
          onLogoutRequest={() => setIsLogoutModalOpen(true)}
        />
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header
          className="w-full h-16 lg:h-20 border-b border-white/20 px-4 lg:px-6 flex items-center justify-between lg:justify-end sticky top-0 z-20 backdrop-blur-md gap-3"
          style={{
            background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(79,57,246,0.2) 0%, rgba(43,127,255,0.2) 100%)",
            boxShadow: "0px 1px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden text-white/80 hover:text-white cursor-pointer p-1 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <HamburgerIcon className="w-6 h-6" />
          </button>

          <span className="lg:hidden font-['Lato'] font-semibold text-[18px] text-white flex-1">
            User Management
          </span>

          {/* Profile badge */}
          <div
            className="h-11 rounded-[8px] px-2 py-1 flex items-center gap-2 shrink-0"
            style={{ width: "135px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#7A3BED] flex items-center justify-center font-bold text-xs text-white shadow-md shrink-0">
              AH
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="font-['Lato'] font-medium text-[14px] leading-[150%] text-white truncate -my-0.5">Abir Hossain</span>
              <span className="font-['Lato'] font-normal text-[12px] leading-[150%] text-[#D0D0D0]">Admin</span>
            </div>
          </div>
        </header>

        {/* Main body */}
        <main className="flex-1 w-full px-4 sm:px-6 pt-5 pb-8 flex flex-col gap-5">

          {/* Page heading */}
          <div className="w-full flex items-center justify-between">
            <h1 className="hidden lg:block font-['Lato'] font-semibold text-[28px] leading-[135%] tracking-[-0.02em] text-white">
              User Management
            </h1>
            <div className="flex items-center gap-2 ml-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="text-xs text-emerald-300 font-medium font-['Lato']">Live User Telemetry</span>
            </div>
          </div>

          {/* Stat cards — 1 col mobile / 2 col sm / 4 col xl */}
          <section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { amount: "10,000", label: "Total Subscribers" },
              { amount: "22,000", label: "Total Free Users" },
              { amount: "10,000", label: "Total Pro Users" },
              { amount: "12,802", label: "Total Enterprise Users" },
            ].map(({ amount, label }) => (
              <div
                key={label}
                className="w-full h-[120px] lg:h-[142px] rounded-[12px] flex flex-col justify-between px-4 py-4 lg:py-5 border border-white/10 hover:border-white/25 transition-all cursor-default"
                style={{
                  background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43,127,255,0.2) 0%, rgba(79,57,246,0.2) 100%)",
                  boxShadow: "6px 6px 54px rgba(0,0,0,0.05)",
                }}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="font-['Lato'] font-medium text-[24px] lg:text-[32px] leading-[130%] tracking-[-0.02em] text-white">
                    {amount}
                  </span>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[8px] flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,239,223,0.3)" }}>
                    <FigmaCardStatisticIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#FEFEFE]" />
                  </div>
                </div>
                <span className="font-['Lato'] font-medium text-[14px] lg:text-[16px] leading-[150%] text-white">
                  {label}
                </span>
              </div>
            ))}
          </section>

          {/* Table section */}
          <section className="w-full flex flex-col gap-4">

            {/* Controls */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-['Lato'] font-medium text-[20px] lg:text-[24px] leading-[140%] tracking-[-0.02em] text-white shrink-0">
                Recent Activity
              </h2>

              <div className="flex flex-wrap items-center gap-3 sm:gap-[24px] sm:justify-end">
                {/* Search */}
                <div
                  className="h-10 flex items-center gap-[10px] rounded-[6px] flex-1 sm:flex-none sm:w-[96px] transition-all min-w-0"
                  style={{ background: "rgba(255,255,255,0.2)", padding: "10px" }}
                >
                  <FluentSearchIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#B5C8DB] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent font-['Lato'] font-normal text-[14px] text-white placeholder-[#D0D0D0] outline-none min-w-0"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-white/50 hover:text-white text-xs cursor-pointer shrink-0">
                      &#x2715;
                    </button>
                  )}
                </div>

                {/* Tabs */}
                <div
                  className="h-10 flex items-center overflow-x-auto shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)", borderRadius: "6px", padding: "4px" }}
                >
                  {tabs.map((tab) => {
                    const isActive = selectedPlanTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => { setSelectedPlanTab(tab.key); setCurrentPage(1); setSearchQuery(""); }}
                        className="h-8 font-['Lato'] font-normal text-[14px] sm:text-[16px] leading-[150%] tracking-[-0.02em] flex items-center justify-center transition-all cursor-pointer text-white shrink-0 whitespace-nowrap"
                        style={{
                          padding: "8px 10px",
                          borderRadius: isActive ? "4px" : "0px",
                          background: isActive ? "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" : "transparent",
                        }}
                      >
                        <span className="sm:hidden">{tab.shortLabel}</span>
                        <span className="hidden sm:block">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* View All Users */}
                <Link
                  id="btn-view-all-users"
                  href="/admin/dashboard/users/all-users"
                  className="h-10 flex flex-row justify-center items-center cursor-pointer font-['Lato'] font-semibold text-[14px] sm:text-[16px] leading-[150%] text-white transition-all shadow-md active:scale-95 hover:brightness-110 shrink-0 whitespace-nowrap"
                  style={{
                    padding: "0px 12px",
                    background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                    borderRadius: "8px",
                    minWidth: "120px",
                  }}
                >
                  View All Users
                </Link>
              </div>
            </div>

            {/* Table with horizontal scroll */}
            <div className="w-full overflow-x-auto rounded-[16px] border border-white/10 shadow-2xl">
              <div
                className="min-w-[928px] rounded-[16px] flex flex-col"
                style={{
                  background: "linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43,127,255,0.2) 0%, rgba(79,57,246,0.2) 100%)",
                  minHeight: "528px",
                }}
              >
                {/* Table header */}
                <div
                  className={`w-full h-[52px] grid ${gridCols} items-center px-4 border-b border-white/10 shrink-0 rounded-t-[16px] select-none`}
                  style={{ background: "rgba(43,127,255,0.3)" }}
                >
                  <div className="flex items-center justify-center">
                    <span className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] uppercase text-white">DATE &amp; TIME</span>
                  </div>
                  <div className="flex items-center justify-start">
                    <span className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] uppercase text-white">USER TYPE</span>
                  </div>
                  <div className="flex items-center justify-start">
                    <span className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] uppercase text-white">USER NAME</span>
                  </div>
                  <div className="flex items-center justify-start">
                    <span className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] uppercase text-white">ACTIVITY TYPE</span>
                  </div>
                  <div className="flex items-center justify-start">
                    <span className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] uppercase text-white">EMAIL</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] uppercase text-white text-center">PROFILE</span>
                  </div>
                </div>

                {/* Table rows */}
                <div className="flex flex-col flex-1">
                  {filteredRows.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-16 gap-3">
                      <FluentSearchIcon className="w-10 h-10 text-white/30" />
                      <p className="text-[#D0D0D0] font-['Lato'] text-sm text-center">
                        No results for &ldquo;{searchQuery}&rdquo; in {tabs.find((t) => t.key === selectedPlanTab)?.label}
                      </p>
                    </div>
                  ) : (
                    filteredRows.slice(0, 7).map((row, idx) => {
                      const isEven = idx % 2 === 1;
                      const isLast = idx === Math.min(filteredRows.length, 7) - 1;
                      return (
                        <div
                          key={row.id}
                          className={`w-full h-[68px] grid ${gridCols} items-center px-4 transition-all group hover:brightness-110 ${isLast ? "rounded-b-[16px]" : ""}`}
                          style={{
                            background: isEven
                              ? "linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), linear-gradient(0deg, #2B2A7D, #2B2A7D)"
                              : "linear-gradient(0deg, #2B2A7D, #2B2A7D)",
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <span className="font-['Lato'] font-normal text-[13px] text-white/90 truncate max-w-[170px] text-center">{row.dateTime}</span>
                          </div>
                          <div className="flex items-center justify-start">
                            <UserTypeBadge type={row.userType} />
                          </div>
                          <div className="flex items-center justify-start">
                            <span className="font-['Lato'] font-normal text-[15px] text-white truncate max-w-[112px]">{row.name}</span>
                          </div>
                          <div className="flex flex-col justify-center items-start gap-[2px] overflow-hidden">
                            <div className="flex items-center gap-1.5 w-full">
                              <span className="font-['Lato'] font-medium text-[13px] text-white truncate">{row.activityTitle}</span>
                              {row.rating && (
                                <div className="w-[13px] h-[13px] bg-[#FFB216] rounded-[0.2px] flex items-center justify-center shrink-0">
                                  <YellowStarIcon className="w-[9px] h-[9px] text-black/60" />
                                </div>
                              )}
                            </div>
                            <span className="font-['Lato'] font-normal text-[12px] text-[#D0D0D0] truncate w-full">{row.activityDesc}</span>
                          </div>
                          <div className="flex items-center justify-start">
                            <span className="font-['Lato'] font-normal text-[13px] text-white/90 truncate max-w-[170px]">{row.email}</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <Link
                              href={`/admin/dashboard/user-details?name=${encodeURIComponent(row.name)}&plan=${encodeURIComponent(row.userType)}`}
                              title={`View ${row.name}'s Profile`}
                              className="w-8 h-8 rounded-[2px] flex items-center justify-center text-[#B5C8DB] hover:text-white hover:bg-white/20 transition-all cursor-pointer active:scale-95"
                            >
                              <MdiEyeIcon className="w-6 h-6 text-[#B5C8DB]" />
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 select-none">
              <div className="h-10 flex items-center gap-2.5">
                <span className="font-['Lato'] font-medium text-[14px] text-white">Showing</span>
                <div
                  className="w-[53px] h-10 px-2 rounded-[6px] flex items-center justify-between cursor-pointer border border-white/10 hover:bg-white/20 transition-all"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <CaretDownIcon className="w-3.5 h-3.5 text-[#B5C8DB] shrink-0" />
                  <span className="font-['Lato'] font-normal text-[14px] text-center text-white">{rowsPerPage}</span>
                </div>
                <span className="font-['Lato'] font-medium text-[14px] text-white">
                  Out of {filteredRows.length > 0 ? "145" : "0"}
                </span>
              </div>

              <div className="h-10 flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-10 px-3 rounded-[6px] flex items-center justify-center gap-1 transition-all cursor-pointer border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <CaretLeftIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                  <span className="font-['Lato'] font-medium text-[14px] text-white">Prev</span>
                </button>

                {[1, 2, 3].map((p) => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    className="w-[30px] h-10 rounded-[6px] font-['Lato'] font-medium text-[14px] text-center text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                    style={currentPage === p
                      ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)", border: "none" }
                      : { background: "rgba(255,255,255,0.2)" }}>
                    {p}
                  </button>
                ))}

                <span className="w-[24px] text-center font-['Lato'] text-[14px] text-white">...</span>

                <button onClick={() => setCurrentPage(15)}
                  className="w-[30px] h-10 rounded-[6px] font-['Lato'] font-medium text-[14px] text-center text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                  style={currentPage === 15
                    ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)", border: "none" }
                    : { background: "rgba(255,255,255,0.2)" }}>
                  15
                </button>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(15, p + 1))}
                  disabled={currentPage === 15}
                  className="h-10 px-3 rounded-[6px] flex items-center justify-center gap-1 transition-all cursor-pointer border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <span className="font-['Lato'] font-medium text-[14px] text-white">Next</span>
                  <CaretRightIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[5px] p-4">
          <div
            className="w-full max-w-[440px] rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-2xl border border-white/10"
            style={{ background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43,127,255,0.2) 0%, rgba(79,57,246,0.2) 100%)" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-['Lato'] font-semibold text-xl text-white">Register New Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white text-lg cursor-pointer transition-colors leading-none">
                &#x2715;
              </button>
            </div>

            <form onSubmit={handleAddMember} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/80 font-['Lato']">Full Name</label>
                <input type="text" required placeholder="e.g. Robert Fox" value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm outline-none focus:border-[#4F39F6] transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/80 font-['Lato']">Email Address</label>
                <input type="email" required placeholder="e.g. robert.fox@example.com" value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm outline-none focus:border-[#4F39F6] transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/80 font-['Lato']">Membership Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Free Member", "Pro Member", "Enterprise Member"] as const).map((tier) => (
                    <button key={tier} type="button" onClick={() => setNewMemberPlan(tier)}
                      className={`py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border ${newMemberPlan === tier ? "border-white/40 text-white shadow" : "bg-white/10 border-white/10 text-white/70 hover:text-white"}`}
                      style={newMemberPlan === tier ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" } : {}}>
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg hover:bg-white/20 text-white text-sm font-medium transition-all cursor-pointer border border-white/20"
                  style={{ background: "rgba(255,255,255,0.1)" }}>Cancel</button>
                <button type="submit"
                  className="px-5 py-2 rounded-lg hover:brightness-110 text-white text-sm font-semibold transition-all shadow-lg active:scale-95 cursor-pointer"
                  style={{ background: "linear-gradient(90deg, #2563EB 0%, #7A3BED 100%)" }}>Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
