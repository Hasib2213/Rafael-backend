"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react";
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
} from "../user-details/UserDetailsIcons";

// Capa_1 Custom SVG Layer Icon from Figma (Frame 2147227571)
function Capa1LayerIcon({ className = "w-10 h-10 text-white" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.76 15.24L10.53 15.24L10.53 29.47L24.76 29.47L24.76 15.24Z"
        stroke="#FEFEFE"
        strokeWidth="2.34"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.45 17.58H34.14V34.14H17.58V29.45"
        stroke="#FEFEFE"
        strokeWidth="2.34"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.08 5.86H5.86V20.08H10.53V15.24H20.08V5.86Z"
        stroke="#FEFEFE"
        strokeWidth="2.34"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="11" r="2.5" fill="#36C1FB" />
      <circle cx="12" cy="33" r="2" fill="#9369FD" />
    </svg>
  );
}

// Sort/Spin icon for Free Trial (Figma Icon/Sort)
function SortSpinIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 15L12 19.5L16.5 15" stroke="#FEFEFE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 9L12 4.5L16.5 9" stroke="#FEFEFE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface PlanDetails {
  title: string;
  currency: string;
  price: string;
  facilities: string[];
  isBestOffer: boolean;
}

const DEFAULT_MONTHLY_PLAN: PlanDetails = {
  title: "Pro(Monthly)",
  currency: "$",
  price: "12.00",
  facilities: [
    "Unlimited briefings",
    "Advanced AI summaries",
    "Unlimited creator following",
    "High-quality audio",
    "Unlimited creator following",
  ],
  isBestOffer: true,
};

const DEFAULT_YEARLY_PLAN: PlanDetails = {
  title: "Enterprise(Yearly)",
  currency: "$",
  price: "300.00",
  facilities: [
    "Unlimited briefings",
    "Advanced AI summaries & Analytics",
    "Unlimited creator following",
    "Studio lossless 48kHz audio",
    "Dedicated team & API access",
  ],
  isBestOffer: false,
};

export default function SubscriptionPlanPage() {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");
  const [monthlyPlan, setMonthlyPlan] = useState<PlanDetails>(DEFAULT_MONTHLY_PLAN);
  const [yearlyPlan, setYearlyPlan] = useState<PlanDetails>(DEFAULT_YEARLY_PLAN);

  const [freeTrialDays, setFreeTrialDays] = useState<number>(3);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentPlan = activeTab === "monthly" ? monthlyPlan : yearlyPlan;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFieldChange = (key: keyof PlanDetails, value: any) => {
    if (activeTab === "monthly") {
      setMonthlyPlan((prev) => ({ ...prev, [key]: value }));
    } else {
      setYearlyPlan((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleFacilityChange = (index: number, val: string) => {
    const updated = [...currentPlan.facilities];
    updated[index] = val;
    handleFieldChange("facilities", updated);
  };

  const handleSavePlan = () => {
    showToast(`${activeTab === "monthly" ? "Monthly" : "Yearly"} subscription plan saved successfully!`);
  };

  const handleCancelPlan = () => {
    if (activeTab === "monthly") {
      setMonthlyPlan(DEFAULT_MONTHLY_PLAN);
    } else {
      setYearlyPlan(DEFAULT_YEARLY_PLAN);
    }
    showToast("Plan changes reverted to default.");
  };

  const handleSaveFreeTrial = () => {
    showToast(`Free trial updated to ${freeTrialDays} days!`);
  };

  const handleCancelFreeTrial = () => {
    setFreeTrialDays(3);
    showToast("Free trial days reset to 3 days.");
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("curio_admin_user");
      window.location.href = "/admin/login";
    }
  };

  const sidebarBg =
    "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)";

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-row overflow-x-hidden selection:bg-[#3E8AFB]/30 selection:text-white">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="hidden lg:flex w-[240px] shrink-0 border-r border-white/20 flex-col justify-between p-4 sticky top-0 h-screen z-30"
        style={{ background: sidebarBg }}
      >
        <div className="flex flex-col gap-6 w-full flex-1 min-h-0 overflow-y-auto">
          {/* Header Brand */}
          <div className="w-full pb-4 border-b border-white/20 flex items-center justify-between pl-1 shrink-0">
            <Link href="/admin/dashboard" className="transition-transform hover:scale-[1.02]">
              <CurioLogo size="sm" />
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1 w-full">
            <Link
              href="/admin/dashboard"
              className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
            >
              <SideNavDashboardIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
              <span className="font-['Lato'] font-medium text-[16px] text-white">Dashboard Overview</span>
            </Link>

            <Link
              href="/admin/dashboard/users"
              className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
            >
              <SideNavUsersIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
              <span className="font-['Lato'] font-normal text-[16px] text-white">User Management</span>
            </Link>

            {/* Subscription plan - ACTIVE */}
            <div
              className="w-full h-12 rounded-lg flex items-center gap-3 px-3 select-none"
              style={{ background: "rgba(255,255,255,0.2)", borderLeft: "4px solid #2563EB" }}
            >
              <SideNavSubscriptionIcon className="w-5 h-5 text-white shrink-0" />
              <span className="font-['Lato'] font-medium text-[16px] text-white">Subscription plan</span>
            </div>

            <Link
              href="/admin/dashboard/admin-settings"
              className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
            >
              <SideNavAdminSettingsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
              <span className="font-['Lato'] font-normal text-[16px] text-white">Admin Settings</span>
            </Link>

            <Link
              href="/admin/dashboard/platform-setting"
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

        {/* Log Out Button */}
        <div className="w-full pt-4 shrink-0">
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full h-12 rounded-lg flex items-center gap-3 px-3 text-white hover:bg-red-500/20 active:scale-[0.99] transition-all select-none cursor-pointer text-left"
            style={{ background: "rgba(255,255,255,0.2)", borderLeft: "3px solid #FF5B5B" }}
          >
            <SideNavLogoutIcon className="w-5 h-5 text-red-400 shrink-0" />
            <span className="font-['Lato'] font-normal text-[16px] tracking-[-0.02em] text-white">Log Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE DRAWER SIDEBAR ================= */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[270px] max-w-[85vw] border-r border-white/20 flex flex-col justify-between p-4 z-50 lg:hidden shadow-2xl overflow-y-auto"
              style={{ background: sidebarBg }}
            >
              <div className="flex flex-col gap-6 w-full flex-1 min-h-0 overflow-y-auto">
                <div className="w-full pb-4 border-b border-white/20 flex items-center justify-between pl-1">
                  <Link href="/admin/dashboard" onClick={() => setIsMobileSidebarOpen(false)}>
                    <CurioLogo size="sm" />
                  </Link>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="text-white/60 hover:text-white p-1 rounded-lg bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1 w-full">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
                  >
                    <SideNavDashboardIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <span className="font-['Lato'] font-medium text-[16px] text-white">Dashboard Overview</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/users"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
                  >
                    <SideNavUsersIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <span className="font-['Lato'] font-normal text-[16px] text-white">User Management</span>
                  </Link>

                  {/* Active Subscription plan */}
                  <div
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-3 select-none"
                    style={{ background: "rgba(255,255,255,0.2)", borderLeft: "4px solid #2563EB" }}
                  >
                    <SideNavSubscriptionIcon className="w-5 h-5 text-white shrink-0" />
                    <span className="font-['Lato'] font-medium text-[16px] text-white">Subscription plan</span>
                  </div>

                  <Link
                    href="/admin/dashboard/admin-settings"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
                  >
                    <SideNavAdminSettingsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <span className="font-['Lato'] font-normal text-[16px] text-white">Admin Settings</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/platform-setting"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
                  >
                    <SideNavPlatformSettingIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <span className="font-['Lato'] font-normal text-[16px] text-white">Platform Setting</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/user-reviews"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
                  >
                    <SideNavReviewsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <span className="font-['Lato'] font-normal text-[16px] text-white">User Reviews</span>
                  </Link>
                </nav>
              </div>

              <div className="w-full pt-4 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="w-full h-12 rounded-lg flex items-center gap-3 px-3 text-white hover:bg-red-500/20 active:scale-[0.99] transition-all select-none cursor-pointer text-left"
                  style={{ background: "rgba(255,255,255,0.2)", borderLeft: "3px solid #FF5B5B" }}
                >
                  <SideNavLogoutIcon className="w-5 h-5 text-red-400 shrink-0" />
                  <span className="font-['Lato'] font-normal text-[16px] tracking-[-0.02em] text-white">Log Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= RIGHT MAIN AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header
          className="w-full h-16 sm:h-20 border-b border-white/20 px-4 sm:px-8 lg:px-10 flex items-center justify-between sticky top-0 z-30 shadow-[0px_1px_12px_rgba(0,0,0,0.05)] backdrop-blur-md"
          style={{
            background:
              "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(79, 57, 246, 0.2) 0%, rgba(43, 127, 255, 0.2) 100%)",
          }}
        >
          {/* Left: Mobile hamburger & breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-['Lato'] font-semibold text-lg sm:text-xl text-white lg:hidden">
              Subscription plan
            </span>
          </div>

          {/* Right: Admin Profile (Frame 2147239857) */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              className="h-11 px-3 py-1 rounded-[8px] flex items-center gap-2.5"
              style={{
                width: "135px",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40 bg-gradient-to-tr from-[#3E8AFB] to-[#9369FD] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                AH
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="font-['Lato'] font-medium text-[14px] leading-[150%] text-white truncate -my-0.5">
                  Abir Hossain
                </span>
                <span className="font-['Lato'] font-normal text-[12px] leading-[150%] text-[#D0D0D0]">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* Page Heading */}
          <div className="w-full flex items-center justify-between">
            <h1 className="font-['Lato'] font-medium text-[24px] sm:text-[28px] leading-[140%] tracking-[-0.02em] text-white">
              Subscription plan
            </h1>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-['Lato'] font-medium text-sm sm:text-base">{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========================================================
              COMPONENT 15: Monthly vs Yearly Toggle Bar
              Width: 1152px, Height: 78px, padding: 8px
          ========================================================= */}
          <section
            className="w-full p-2 rounded-[6px] flex flex-col sm:flex-row items-center gap-2 border border-white/10 shadow-xl"
            style={{
              background:
                "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
            }}
          >
            {/* Tab 1: Monthly Subscription (Frame 2147239319) */}
            <button
              onClick={() => setActiveTab("monthly")}
              className={`flex-1 w-full sm:w-auto h-[54px] sm:h-[62px] rounded-[6px] flex items-center justify-center transition-all cursor-pointer select-none ${
                activeTab === "monthly"
                  ? "bg-white/20 text-white font-medium shadow-md border border-white/20"
                  : "bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <span className="font-['Lato'] font-normal sm:font-medium text-[17px] sm:text-[20px] leading-[150%] text-center tracking-[-0.01em]">
                Monthly Subscription
              </span>
            </button>

            {/* Tab 2: Yearly Subscription (Frame 2147239324) */}
            <button
              onClick={() => setActiveTab("yearly")}
              className={`flex-1 w-full sm:w-auto h-[54px] sm:h-[62px] rounded-[6px] flex items-center justify-center transition-all cursor-pointer select-none ${
                activeTab === "yearly"
                  ? "bg-white/20 text-white font-medium shadow-md border border-white/20"
                  : "bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <span className="font-['Lato'] font-normal sm:font-medium text-[17px] sm:text-[20px] leading-[150%] text-center tracking-[-0.01em]">
                Yearly Subscription
              </span>
            </button>
          </section>

          {/* =========================================================
              FRAME 2147240222: Plan Configuration Card
              Width: 1152px, Height: 496px+, border-radius: 20px
          ========================================================= */}
          <section
            className="w-full rounded-[20px] p-6 flex flex-col gap-6 shadow-2xl border border-white/10"
            style={{
              background:
                "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
            }}
          >
            {/* Fields Grid (Frame 2147240240) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
              {/* Row 1, Col 1: Plan Title (Frame 2147225175) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Plan Title
                </label>
                <div
                  className="w-full h-12 px-4 rounded-[6px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <input
                    type="text"
                    value={currentPlan.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                    placeholder="e.g. Pro(Monthly)"
                  />
                </div>
              </div>

              {/* Row 1, Col 2: Plan Price/Per Audit (Frame 2147225184 & Component 47) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Plan Price/Per Audit
                </label>
                <div
                  className="w-full h-12 pr-3 rounded-[8px] flex items-center gap-3 border border-white/10 focus-within:border-[#3E8AFB] transition-all overflow-hidden"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  {/* Currency Badge (Frame 2147227642: 45px x 48px, rounded 8px 0px 0px 8px) */}
                  <button
                    type="button"
                    onClick={() =>
                      handleFieldChange(
                        "currency",
                        currentPlan.currency === "€" ? "$" : currentPlan.currency === "$" ? "£" : "€"
                      )
                    }
                    title="Click to switch currency symbol"
                    className="w-[45px] h-12 rounded-l-[8px] flex items-center justify-center font-['Roboto'] font-medium text-[20px] leading-[150%] text-white shrink-0 select-none cursor-pointer shadow-md hover:brightness-110 active:scale-95 transition-all"
                    style={{ background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }}
                  >
                    {currentPlan.currency}
                  </button>

                  {/* Price input (Frame 2147227643) */}
                  <div className="flex-1 flex items-center">
                    <span className="text-white font-['Inter'] font-normal text-[18px] leading-[150%] mr-0.5">
                      {currentPlan.currency === "$" ? "$" : ""}
                    </span>
                    <input
                      type="text"
                      value={currentPlan.price.replace(/^[\$€£]/, "")}
                      onChange={(e) => handleFieldChange("price", e.target.value)}
                      className="w-full bg-transparent text-white font-['Inter'] font-normal text-[18px] leading-[150%] outline-none placeholder-white/40"
                      placeholder="12.00"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2, Col 1: Plan Facilities 01 (Frame 2147225179) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Plan Facilities 01
                </label>
                <div
                  className="w-full h-12 px-4 rounded-[6px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <input
                    type="text"
                    value={currentPlan.facilities[0] || ""}
                    onChange={(e) => handleFacilityChange(0, e.target.value)}
                    className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                    placeholder="Plan facility description"
                  />
                </div>
              </div>

              {/* Row 2, Col 2: Plan Facilities 02 (Frame 2147227647) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Plan Facilities 02
                </label>
                <div
                  className="w-full h-12 px-4 rounded-[6px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <input
                    type="text"
                    value={currentPlan.facilities[1] || ""}
                    onChange={(e) => handleFacilityChange(1, e.target.value)}
                    className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                    placeholder="Plan facility description"
                  />
                </div>
              </div>

              {/* Row 3, Col 1: Plan Facilities 03 (Frame 2147225179) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Plan Facilities 03
                </label>
                <div
                  className="w-full h-12 px-4 rounded-[6px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <input
                    type="text"
                    value={currentPlan.facilities[2] || ""}
                    onChange={(e) => handleFacilityChange(2, e.target.value)}
                    className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                    placeholder="Plan facility description"
                  />
                </div>
              </div>

              {/* Row 3, Col 2: Plan Facilities 04 (Frame 2147227647) */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Plan Facilities 04
                </label>
                <div
                  className="w-full h-12 px-4 rounded-[6px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <input
                    type="text"
                    value={currentPlan.facilities[3] || ""}
                    onChange={(e) => handleFacilityChange(3, e.target.value)}
                    className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                    placeholder="Plan facility description"
                  />
                </div>
              </div>

              {/* Row 4, Col 1: Plan Facilities 05 (Frame 2147227771) */}
              <div className="flex flex-col gap-2 w-full md:col-span-1">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Plan Facilities 05
                </label>
                <div
                  className="w-full h-12 px-4 rounded-[6px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <input
                    type="text"
                    value={currentPlan.facilities[4] || ""}
                    onChange={(e) => handleFacilityChange(4, e.target.value)}
                    className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                    placeholder="Plan facility description"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row (Frame 2147227770) */}
            <div className="w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left / Center: BEST OFFER Toggle (Frame 2147228407 & Frame 2147227769) */}
              <div className="flex items-center gap-[9px] select-none">
                <span className="font-['Lato'] font-semibold text-[18px] leading-[150%] text-white text-center">
                  BEST OFFER
                </span>

                {/* Switch Toggle (Subscription Plan: 56px x 28px, border-radius 17px, border: 1px solid #E2E8F0) */}
                <button
                  type="button"
                  onClick={() => handleFieldChange("isBestOffer", !currentPlan.isBestOffer)}
                  className={`w-[56px] h-[28px] rounded-[17px] p-[3px] transition-colors relative cursor-pointer border ${
                    currentPlan.isBestOffer
                      ? "border-[#E2E8F0] shadow-md"
                      : "bg-white/20 border-white/30"
                  }`}
                  style={{
                    background: currentPlan.isBestOffer
                      ? "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)"
                      : "rgba(255, 255, 255, 0.2)",
                  }}
                  aria-label="Toggle best offer"
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`w-[22px] h-[22px] rounded-[17px] bg-white shadow-sm ${
                      currentPlan.isBestOffer ? "ml-auto" : "ml-0"
                    }`}
                  />
                </button>
              </div>

              {/* Right: Cancel & Save Changes Buttons (Frame 2147229848) */}
              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                {/* Cancel (Frame 2147239918: 80px x 44px, rounded 8px) */}
                <button
                  type="button"
                  onClick={handleCancelPlan}
                  className="w-[80px] h-[44px] rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[16px] leading-[150%] hover:bg-white/30 active:scale-95 transition-all cursor-pointer border border-white/10"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  Cancel
                </button>

                {/* Save Changes (Frame 2147224437: 146px x 44px, rounded 8px) */}
                <button
                  type="button"
                  onClick={handleSavePlan}
                  className="w-[146px] h-[44px] rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[16px] leading-[150%] shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  style={{
                    background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* =========================================================
              FRAME 2147229836: Bottom 2 Cards
              Card 1: Current Plans Overview (632px x 160px)
              Card 2: Free Trial Configuration (496px x 188px)
          ========================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
            {/* Card 1: Current Plans (Frame 2147227660) - 7 cols */}
            <div
              className="lg:col-span-7 rounded-[8px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10"
              style={{
                background:
                  "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
              }}
            >
              {/* Left: Icon + Count */}
              <div className="flex items-center gap-4 shrink-0">
                <Capa1LayerIcon className="w-10 h-10 text-white shrink-0" />
                <div className="flex flex-col">
                  <span className="font-['Lato'] font-bold text-[16px] leading-[150%] text-white whitespace-nowrap">
                    Current Plans
                  </span>
                  <span className="font-['Inter'] font-medium text-[32px] leading-[130%] text-white">
                    2
                  </span>
                </div>
              </div>

              {/* Vertical / Horizontal Divider */}
              <div className="hidden sm:block w-px h-16 bg-white/20 shrink-0" />
              <div className="sm:hidden w-full h-px bg-white/20 shrink-0" />

              {/* Right: Plan Access Prices (Frame 2147227590) */}
              <div className="flex flex-col justify-center gap-2 text-center sm:text-left min-w-0">
                <span className="font-['Lato'] font-normal text-[15px] sm:text-[16px] leading-[150%] tracking-[-0.02em] text-white">
                  MONTHLY ACCESS— ${monthlyPlan.price.replace(/^\$/, "")}(Monthly)
                </span>
                <span className="font-['Lato'] font-normal text-[15px] sm:text-[16px] leading-[150%] tracking-[-0.02em] text-white">
                  YEARLY ACCESS — ${yearlyPlan.price.replace(/^\$/, "")}(Yearly)
                </span>
              </div>
            </div>

            {/* Card 2: Free Trial Configuration (Frame 2147225179) - 5 cols */}
            <div
              className="lg:col-span-5 rounded-[8px] p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-xl border border-white/10"
              style={{
                background:
                  "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
              }}
            >
              {/* Free Trial Days input */}
              <div className="flex flex-col gap-2 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Free Trial(Days)
                </label>
                <div
                  className="w-full h-12 px-4 rounded-[8px] flex items-center justify-between border border-white/10 focus-within:border-[#3E8AFB] transition-all select-none"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <span className="font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] text-white">
                    {freeTrialDays < 10 ? `0${freeTrialDays}` : freeTrialDays}
                  </span>

                  {/* Spin Arrows */}
                  <div className="flex flex-col items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => setFreeTrialDays((d) => d + 1)}
                      className="text-white/70 hover:text-white p-0.5 transition-colors cursor-pointer"
                      title="Increase days"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFreeTrialDays((d) => Math.max(0, d - 1))}
                      className="text-white/70 hover:text-white p-0.5 transition-colors cursor-pointer"
                      title="Decrease days"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancelFreeTrial}
                  className="px-4 h-10 rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[15px] leading-[150%] hover:bg-white/30 active:scale-95 transition-all cursor-pointer border border-white/10"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveFreeTrial}
                  className="px-5 h-10 rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[15px] leading-[150%] shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  style={{
                    background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                  }}
                >
                  Save Changes
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
