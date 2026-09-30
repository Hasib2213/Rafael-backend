"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CheckCircle2, Globe, FileText, Shield } from "lucide-react";
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

interface SiteInfoState {
  address: string;
  email: string;
  mobile: string;
  facebook: string;
  xProfile: string;
  instagram: string;
}

const DEFAULT_SITE_INFO: SiteInfoState = {
  address: "Dhaka, Bangladesh",
  email: "info@curio.com",
  mobile: "+8801688148194",
  facebook: "Abir",
  xProfile: "Abir",
  instagram: "Abir",
};

const DEFAULT_TERMS = `Welcome to Curio. By accessing or using our website, applications, and services (the "Platform"), you agree to be bound by these Terms of Use.

1. Account Registration & Security
Users must provide accurate, current, and complete information during registration. You are responsible for safeguarding your login credentials and for all activities under your account.

2. Content & Fair Usage
Curio converts video content into smart audio briefings for personal and non-commercial informational use. Users agree not to misuse, scrape, reverse-engineer, or attempt unauthorized access to platform infrastructure.

3. Subscription & Billing
Subscription plans (Monthly and Yearly) provide access to premium audio generation, extended summaries, and dedicated tools. Fees are billed in advance on a recurring schedule until cancelled by the user.

4. Termination & Policy Updates
We reserve the right to suspend or terminate accounts that violate our community guidelines or security protocols. These terms may be updated periodically with notice.`;

const DEFAULT_PRIVACY = `At Curio, your privacy is a paramount priority. This Privacy Policy outlines our practices regarding data collection, usage, and security.

1. Information We Collect
We collect personal information such as name, email address, payment identifiers (handled securely via third-party gateways), and usage preferences when you interact with our audio conversion tools.

2. How We Use Information
We utilize gathered data to deliver generated audio summaries, personalize recommendations, improve system performance, and provide prompt customer support.

3. Data Sharing & Third Parties
Curio does not sell or lease user data to third parties. Data is only shared with trusted service providers necessary for essential platform operation, such as cloud infrastructure and payment processing.

4. User Rights & Controls
You have the right to review, update, or request the deletion of your personal data at any time through account settings or by contacting our support team.`;

export default function PlatformSettingPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "terms" | "privacy">("contact");

  // Site info form state
  const [siteInfo, setSiteInfo] = useState<SiteInfoState>(DEFAULT_SITE_INFO);

  // Policy text states
  const [termsText, setTermsText] = useState<string>(DEFAULT_TERMS);
  const [privacyText, setPrivacyText] = useState<string>(DEFAULT_PRIVACY);

  // UI state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFieldChange = (key: keyof SiteInfoState, value: string) => {
    setSiteInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (activeTab === "contact") {
      showToast("Site Info & Contact settings saved successfully!");
    } else if (activeTab === "terms") {
      showToast("Terms of Use updated successfully!");
    } else {
      showToast("Privacy Policy updated successfully!");
    }
  };

  const handleCancel = () => {
    if (activeTab === "contact") {
      setSiteInfo(DEFAULT_SITE_INFO);
      showToast("Contact settings reverted to default.");
    } else if (activeTab === "terms") {
      setTermsText(DEFAULT_TERMS);
      showToast("Terms of Use reverted.");
    } else {
      setPrivacyText(DEFAULT_PRIVACY);
      showToast("Privacy Policy reverted.");
    }
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
              <span className="font-['Lato'] font-normal text-[16px] text-white">Dashboard Overview</span>
            </Link>

            <Link
              href="/admin/dashboard/users"
              className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
            >
              <SideNavUsersIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
              <span className="font-['Lato'] font-normal text-[16px] text-white">User Management</span>
            </Link>

            <Link
              href="/admin/dashboard/subscription-plan"
              className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
            >
              <SideNavSubscriptionIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
              <span className="font-['Lato'] font-normal text-[16px] text-white">Subscription plan</span>
            </Link>

            <Link
              href="/admin/dashboard/admin-settings"
              className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
            >
              <SideNavAdminSettingsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
              <span className="font-['Lato'] font-normal text-[16px] text-white">Admin Settings</span>
            </Link>

            {/* Platform Setting - ACTIVE */}
            <div
              className="w-full h-12 rounded-lg flex items-center gap-3 px-3 select-none"
              style={{ background: "rgba(255,255,255,0.2)", borderLeft: "4px solid #2563EB" }}
            >
              <SideNavPlatformSettingIcon className="w-5 h-5 text-white shrink-0" />
              <span className="font-['Lato'] font-medium text-[16px] text-white">Platform Setting</span>
            </div>

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
                    <span className="font-['Lato'] font-normal text-[16px] text-white">Dashboard Overview</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/users"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
                  >
                    <SideNavUsersIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <span className="font-['Lato'] font-normal text-[16px] text-white">User Management</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/subscription-plan"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
                  >
                    <SideNavSubscriptionIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <span className="font-['Lato'] font-normal text-[16px] text-white">Subscription plan</span>
                  </Link>

                  <Link
                    href="/admin/dashboard/admin-settings"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
                  >
                    <SideNavAdminSettingsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <span className="font-['Lato'] font-normal text-[16px] text-white">Admin Settings</span>
                  </Link>

                  {/* Active Platform Setting */}
                  <div
                    className="w-full h-12 rounded-lg flex items-center gap-3 px-3 select-none"
                    style={{ background: "rgba(255,255,255,0.2)", borderLeft: "4px solid #2563EB" }}
                  >
                    <SideNavPlatformSettingIcon className="w-5 h-5 text-white shrink-0" />
                    <span className="font-['Lato'] font-medium text-[16px] text-white">Platform Setting</span>
                  </div>

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
          {/* Left: Mobile hamburger & title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-['Lato'] font-semibold text-lg sm:text-xl text-white lg:hidden">
              Platform Setting
            </span>
          </div>

          {/* Right: Admin Profile */}
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
          {/* Page Heading (Frame 2147240220) */}
          <div className="w-full flex items-center justify-between">
            <h1 className="font-['Lato'] font-medium text-[24px] sm:text-[28px] leading-[140%] tracking-[-0.02em] text-white">
              Platform Setting
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
              COMPONENT 15: 3-Tab Switcher Bar
              Width: 1152px, Height: 78px, padding: 8px, border-radius: 16px
          ========================================================= */}
          <section
            className="w-full p-2 rounded-[16px] flex flex-col sm:flex-row items-center gap-2 border border-white/10 shadow-xl"
            style={{
              background:
                "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
            }}
          >
            {/* Tab 1: Contact Us & Footer (Frame 2147239319) */}
            <button
              type="button"
              onClick={() => setActiveTab("contact")}
              className={`flex-1 w-full sm:w-auto h-[54px] sm:h-[62px] flex items-center justify-center transition-all cursor-pointer select-none ${
                activeTab === "contact"
                  ? "bg-white/20 text-white font-medium shadow-md border border-white/20 rounded-[12px]"
                  : "bg-transparent hover:bg-white/10 text-white/80 hover:text-white rounded-[6px]"
              }`}
            >
              <span className="font-['Lato'] font-normal sm:font-medium text-[16px] sm:text-[20px] leading-[150%] text-center tracking-[-0.01em]">
                Contact Us & Footer
              </span>
            </button>

            {/* Tab 2: Terms of Use (Frame 2147239326) */}
            <button
              type="button"
              onClick={() => setActiveTab("terms")}
              className={`flex-1 w-full sm:w-auto h-[54px] sm:h-[62px] flex items-center justify-center transition-all cursor-pointer select-none ${
                activeTab === "terms"
                  ? "bg-white/20 text-white font-medium shadow-md border border-white/20 rounded-[12px]"
                  : "bg-transparent hover:bg-white/10 text-white/80 hover:text-white rounded-[6px]"
              }`}
            >
              <span className="font-['Lato'] font-normal sm:font-medium text-[16px] sm:text-[20px] leading-[150%] text-center tracking-[-0.01em]">
                Terms of Use
              </span>
            </button>

            {/* Tab 3: Privacy Policy (Frame 2147239324) */}
            <button
              type="button"
              onClick={() => setActiveTab("privacy")}
              className={`flex-1 w-full sm:w-auto h-[54px] sm:h-[62px] flex items-center justify-center transition-all cursor-pointer select-none ${
                activeTab === "privacy"
                  ? "bg-white/20 text-white font-medium shadow-md border border-white/20 rounded-[12px]"
                  : "bg-transparent hover:bg-white/10 text-white/80 hover:text-white rounded-[6px]"
              }`}
            >
              <span className="font-['Lato'] font-normal sm:font-medium text-[16px] sm:text-[20px] leading-[150%] text-center tracking-[-0.01em]">
                Privacy Policy
              </span>
            </button>
          </section>

          {/* =========================================================
              FRAME 2147227653: Main Content Card
              Width: 1152px, Height: 314px+, border-radius: 20px, padding: 24px
          ========================================================= */}
          {activeTab === "contact" && (
            <section
              className="w-full rounded-[20px] p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
              }}
            >
              {/* Frame 2147225848: Left "Site Info" + Right Grid Form */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-10 w-full">
                {/* Left: Site Info Header */}
                <div className="shrink-0 pt-1">
                  <h2 className="font-['Lato'] font-semibold text-[24px] leading-[140%] text-white">
                    Site Info
                  </h2>
                </div>

                {/* Right: Frame 2147227912 (Form Grid, width: 737px max) */}
                <div className="flex-1 w-full max-w-[760px] flex flex-col gap-4">
                  {/* Row 1: Address + Email Address (Frame 1261156032) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {/* Address (Frame 1261156030) */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                        Address
                      </label>
                      <div
                        className="w-full h-12 px-4 rounded-[8px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <input
                          type="text"
                          value={siteInfo.address}
                          onChange={(e) => handleFieldChange("address", e.target.value)}
                          className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                          placeholder="Dhaka, Bangladesh"
                        />
                      </div>
                    </div>

                    {/* Email Address (Frame 1261156031) */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                        Email Address
                      </label>
                      <div
                        className="w-full h-12 px-4 rounded-[8px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <input
                          type="email"
                          value={siteInfo.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                          placeholder="info@curio.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Mobile Number + Facebook Profile Link (Frame 1261156033) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {/* Mobile Number (Frame 1261156032) */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                        Mobile Number
                      </label>
                      <div
                        className="w-full h-12 px-4 rounded-[8px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <input
                          type="tel"
                          value={siteInfo.mobile}
                          onChange={(e) => handleFieldChange("mobile", e.target.value)}
                          className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                          placeholder="+8801688148194"
                        />
                      </div>
                    </div>

                    {/* Facebook Profile Link (Frame 1261156033) */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                        Facebook Profile Link
                      </label>
                      <div
                        className="w-full h-12 px-4 rounded-[8px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <input
                          type="text"
                          value={siteInfo.facebook}
                          onChange={(e) => handleFieldChange("facebook", e.target.value)}
                          className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                          placeholder="Abir"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: X Profile Link + Instagram Profile Link (Frame 1261156034) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {/* X Profile Link (Frame 1261156031) */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                        X Profile Link
                      </label>
                      <div
                        className="w-full h-12 px-4 rounded-[8px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <input
                          type="text"
                          value={siteInfo.xProfile}
                          onChange={(e) => handleFieldChange("xProfile", e.target.value)}
                          className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                          placeholder="Abir"
                        />
                      </div>
                    </div>

                    {/* Instagram Profile Link (Frame 1261156030) */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                        Instagram Profile Link
                      </label>
                      <div
                        className="w-full h-12 px-4 rounded-[8px] flex items-center border border-white/10 focus-within:border-[#3E8AFB] transition-all"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <input
                          type="text"
                          value={siteInfo.instagram}
                          onChange={(e) => handleFieldChange("instagram", e.target.value)}
                          className="w-full bg-transparent text-white font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] outline-none placeholder-white/40"
                          placeholder="Abir"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions: Cancel & Save Changes */}
                  <div className="flex items-center gap-4 w-full justify-end pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-[80px] h-[44px] rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[16px] leading-[150%] hover:bg-white/30 active:scale-95 transition-all cursor-pointer border border-white/10"
                      style={{ background: "rgba(255, 255, 255, 0.2)" }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      className="w-[146px] h-[44px] rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[16px] leading-[150%] shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =========================================================
              TAB 2: Terms of Use Editor
          ========================================================= */}
          {activeTab === "terms" && (
            <section
              className="w-full rounded-[20px] p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
              }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#3E8AFB]" />
                  <h2 className="font-['Lato'] font-semibold text-[22px] sm:text-[24px] text-white">
                    Platform Terms of Use
                  </h2>
                </div>
                <span className="text-sm font-['Lato'] text-white/60">
                  Last revised: September 2026
                </span>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Terms Content (Markdown & Plain Text Supported)
                </label>
                <textarea
                  value={termsText}
                  onChange={(e) => setTermsText(e.target.value)}
                  rows={12}
                  className="w-full p-4 rounded-[12px] bg-white/10 border border-white/20 text-white font-['Lato'] text-[15px] sm:text-[16px] leading-[160%] outline-none focus:border-[#3E8AFB] transition-all resize-y placeholder-white/40"
                  placeholder="Enter platform terms of use..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 w-full justify-end pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-[80px] h-[44px] rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[16px] leading-[150%] hover:bg-white/30 active:scale-95 transition-all cursor-pointer border border-white/10"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-[146px] h-[44px] rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[16px] leading-[150%] shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </section>
          )}

          {/* =========================================================
              TAB 3: Privacy Policy Editor
          ========================================================= */}
          {activeTab === "privacy" && (
            <section
              className="w-full rounded-[20px] p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
              }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#9369FD]" />
                  <h2 className="font-['Lato'] font-semibold text-[22px] sm:text-[24px] text-white">
                    Platform Privacy Policy
                  </h2>
                </div>
                <span className="text-sm font-['Lato'] text-white/60">
                  Last revised: September 2026
                </span>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                  Privacy Policy Content (Markdown & Plain Text Supported)
                </label>
                <textarea
                  value={privacyText}
                  onChange={(e) => setPrivacyText(e.target.value)}
                  rows={12}
                  className="w-full p-4 rounded-[12px] bg-white/10 border border-white/20 text-white font-['Lato'] text-[15px] sm:text-[16px] leading-[160%] outline-none focus:border-[#3E8AFB] transition-all resize-y placeholder-white/40"
                  placeholder="Enter platform privacy policy..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 w-full justify-end pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-[80px] h-[44px] rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[16px] leading-[150%] hover:bg-white/30 active:scale-95 transition-all cursor-pointer border border-white/10"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-[146px] h-[44px] rounded-[8px] flex items-center justify-center text-white font-['Lato'] font-semibold text-[16px] leading-[150%] shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </section>
          )}
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
