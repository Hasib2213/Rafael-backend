"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
  Video,
  MessageSquare,
  BarChart3,
  Layers,
  Settings,
  Sliders,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  X,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  Menu,
} from "lucide-react";
import CurioLogo from "@/components/CurioLogo";
import LogoutModal from "@/components/feed/LogoutModal";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Icons matching exact Figma vectors
function DashboardGridIcon({ className = "text-white" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 shrink-0 ${className}`} viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="2.5" width="6.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.66667" />
      <rect x="11.5" y="2.5" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.66667" />
      <rect x="11.5" y="10" width="6" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.66667" />
      <rect x="2.5" y="13" width="6.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.66667" />
    </svg>
  );
}

function SubscriptionCardIcon({ className = "text-[#B5C8DB]" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// Exact Figma Vector: Card 1 - Total Users Icon
function CardUsersIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`w-6 h-6 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="4" stroke="#FEFEFE" strokeWidth="2" />
      <path d="M15 7C15 9.20914 16.7909 11 19 11" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M2 19C2 16.2386 4.23858 14 7 14H11C13.7614 14 16 16.2386 16 19C16 19.5523 15.5523 20 15 20H3C2.44772 20 2 19.5523 2 19Z"
        stroke="#FEFEFE"
        strokeWidth="2"
      />
      <path
        d="M17 14C19.7614 14 22 16.2386 22 19C22 19.5523 21.5523 20 21 20H18.5"
        stroke="#FEFEFE"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Exact Figma Vector: Card 2 - Total Revenue / Analytics Trend Icon
function CardRevenueIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`w-6 h-6 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 20H9C5.7 20 4.05 20 3.025 18.9749C2 17.9497 2 16.2998 2 13V2"
        stroke="#FEFEFE"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 9V20" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 12V20" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 12V19" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M20 6.9869C18.16 6.9869 16.192 7.2425 14.877 5.4935C13.38 3.5022 10.62 3.5022 9.123 5.4935C7.808 7.2425 5.84 6.9869 4 6.9869H2"
        stroke="#FEFEFE"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Exact Figma Vector: Card 3 - Video Processed Icon (ph:video)
function CardVideoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`w-6 h-6 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none">
      <path
        d="M15.529 7.0537L10.222 3.5992C10.088 3.5124 9.934 3.4626 9.774 3.455C9.614 3.4474 9.454 3.4824 9.313 3.5562C9.172 3.63 9.054 3.7399 8.972 3.8741C8.889 4.0083 8.846 4.1618 8.846 4.3182V11.2273C8.846 11.3837 8.889 11.5371 8.972 11.6713C9.054 11.8055 9.172 11.9154 9.313 11.9892C9.454 12.063 9.614 12.098 9.774 12.0905C9.934 12.0829 10.088 12.033 10.222 11.9463L15.529 8.4917C15.651 8.4129 15.75 8.306 15.819 8.1805C15.888 8.0551 15.924 7.915 15.924 7.7727C15.924 7.6304 15.888 7.4903 15.819 7.3649C15.75 7.2395 15.651 7.1326 15.529 7.0537ZM10.615 9.6134V5.9375L13.444 7.7727L10.615 9.6134ZM21.231 0H1.769C1.3 0 0.85 0.182 0.518 0.5059C0.186 0.8298 0 1.2692 0 1.7273V13.8182C0 14.2763 0.186 14.7156 0.518 15.0395C0.85 15.3635 1.3 15.5455 1.769 15.5455H21.231C21.7 15.5455 22.15 15.3635 22.482 15.0395C22.814 14.7156 23 14.2763 23 13.8182V1.7273C23 1.2692 22.814 0.8298 22.482 0.5059C22.15 0.182 21.7 0 21.231 0ZM21.231 13.8182H1.769V1.7273H21.231V13.8182ZM23 18.136C23 18.365 22.907 18.585 22.741 18.747C22.575 18.909 22.35 19 22.115 19H0.885C0.65 19 0.425 18.909 0.259 18.747C0.093 18.585 0 18.365 0 18.136C0 17.907 0.093 17.688 0.259 17.526C0.425 17.364 0.65 17.273 0.885 17.273H22.115C22.35 17.273 22.575 17.364 22.741 17.526C22.907 17.688 23 17.907 23 18.136Z"
        fill="#FEFEFE"
      />
    </svg>
  );
}

// Exact Figma Vector: Card 4 - AI Chat Summary Icon (ri:chat-ai-line)
function CardAiSummaryIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`w-6 h-6 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none">
      <path
        d="M18.71 8.1271L18.47 8.6931C18.43 8.7853 18.36 8.864 18.28 8.9194C18.2 8.9748 18.1 8.9043 18 8.9043C17.9 8.9043 17.8 8.9748 17.72 8.9194C17.64 8.864 17.57 8.7853 17.53 8.6931L17.29 8.1271C17.85 7.1259 17.06 6.323 16.07 5.8771L15.31 5.5381C15.22 5.4958 15.14 5.4279 15.08 5.3426C15.03 5.2572 15 5.158 15 5.0566C15 4.9553 15.03 4.856 15.08 4.7707C15.14 4.6854 15.22 4.6175 15.31 4.5751L16.02 4.2561C17.05 3.7975 17.85 2.965 18.28 1.9301L18.53 1.3191C18.57 1.2245 18.63 1.1432 18.71 1.086C18.8 1.0287 18.9 0.998 19 0.998C19.1 0.998 19.2 1.0287 19.29 1.086C19.37 1.1432 19.43 1.2245 19.47 1.3191L19.72 1.9291C20.15 2.9642 20.95 3.7971 21.97 4.2561L22.69 4.5761C22.78 4.6186 22.86 4.6865 22.92 4.7717C22.97 4.8569 23 4.956 23 5.0571C23 5.1583 22.97 5.2573 22.92 5.3426C22.86 5.4278 22.78 5.4956 22.69 5.5381L21.93 5.8761C20.94 6.3225 20.15 7.1257 19.71 8.1271ZM8 2.9991H12V4.9991H8C6.41 4.9991 4.88 5.6313 3.76 6.7565C2.63 7.8817 2 9.4078 2 10.9991C2 14.6091 4.46 16.9651 10 19.4791V16.9991H12C13.59 16.9991 15.12 16.367 16.24 15.2418C17.37 14.1166 18 12.5904 18 10.9991H20C20 13.1209 19.16 15.1557 17.66 16.656C16.16 18.1563 14.12 18.9991 12 18.9991V22.499C7 20.499 0 17.4991 0 10.9991C0 8.8774 0.84 6.8426 2.34 5.3423C3.84 3.842 5.88 2.9991 8 2.9991Z"
        fill="#FEFEFE"
      />
    </svg>
  );
}

interface ActivityItem {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Enterprise";
  type: string;
  description: string;
  rating?: number;
  dateTime: string;
  avatarColor: string;
}

const initialActivities: ActivityItem[] = [
  {
    id: "ACT-001",
    name: "Sarah Johnson",
    email: "sarah.j@gmail.com",
    plan: "Pro",
    type: "New User Registered",
    description: "Sarah Johnson joined as Pro member",
    dateTime: "24 Oct, 2026 10:30 AM",
    avatarColor: "from-blue-500 to-indigo-600",
  },
  {
    id: "ACT-002",
    name: "Alex Rivera",
    email: "alex.r@gmail.com",
    plan: "Enterprise",
    type: "Video Processed",
    description: "AI Trends 2026.mp4 completed",
    dateTime: "24 Oct, 2026 09:15 AM",
    avatarColor: "from-purple-500 to-pink-600",
  },
  {
    id: "ACT-003",
    name: "David Chen",
    email: "david.c@gmail.com",
    plan: "Free",
    type: "Audio Played",
    description: "Morning Briefing audio played",
    dateTime: "24 Oct, 2026 08:45 AM",
    avatarColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "ACT-004",
    name: "Emma Watson",
    email: "emma.w@gmail.com",
    plan: "Pro",
    type: "Platform Review 4/5",
    description: "Added a review about the platform",
    rating: 4,
    dateTime: "23 Oct, 2026 06:20 PM",
    avatarColor: "from-amber-500 to-orange-600",
  },
  {
    id: "ACT-005",
    name: "Michael Brown",
    email: "michael.b@gmail.com",
    plan: "Pro",
    type: "Subscription Upgrade",
    description: "Free to Pro",
    dateTime: "23 Oct, 2026 04:10 PM",
    avatarColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "ACT-006",
    name: "Sophia Taylor",
    email: "sophia.t@gmail.com",
    plan: "Enterprise",
    type: "Added to Library",
    description: "Motive pro video was added to library",
    dateTime: "23 Oct, 2026 02:00 PM",
    avatarColor: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "ACT-007",
    name: "James Wilson",
    email: "james.w@gmail.com",
    plan: "Free",
    type: "Download",
    description: "Motive pro video was downloaded",
    dateTime: "23 Oct, 2026 11:30 AM",
    avatarColor: "from-blue-600 to-cyan-600",
  },
];

export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<"ALL" | "Free" | "Pro" | "Enterprise">("Free");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<"Yearly" | "Monthly" | "Weekly">("Yearly");
  const [selectedGrowthPeriod, setSelectedGrowthPeriod] = useState<"Weekly" | "Monthly" | "Yearly">("Weekly");
  const [isGrowthDropdownOpen, setIsGrowthDropdownOpen] = useState(false);
  const [activeActivityModal, setActiveActivityModal] = useState<ActivityItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [adminUser, setAdminUser] = useState({ name: "Abir Hossain", role: "Admin", email: "admin@curio.ai" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("curio_admin_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.email) {
            setAdminUser((prev) => ({ ...prev, email: parsed.email }));
          }
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("curio_admin_user");
      window.location.href = "/admin/login";
    }
  };

  // Filter activities based on search query and selected plan filter
  const filteredActivities = initialActivities.filter((act) => {
    const matchesSearch =
      act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedPlanFilter === "ALL") return true;
    return act.plan.toLowerCase() === selectedPlanFilter.toLowerCase();
  });

  // Performance bar data matching exact Figma values
  const revenueDataMap = {
    Yearly: [
      { label: "2019", height: 127, value: "58,000", tooltip: "1140 Person" },
      { label: "2020", height: 158, value: "78,000", tooltip: "1275 Person", showDefaultBadge: true },
      { label: "2021", height: 86, value: "34,000", tooltip: "850 Person" },
      { label: "2022", height: 142, value: "65,000", tooltip: "1620 Person" },
      { label: "2023", height: 188, value: "95,000", tooltip: "2342 Person", showDefaultBadge: true },
      { label: "2024", height: 105, value: "45,000", tooltip: "1090 Person" },
      { label: "2025", height: 129, value: "59,000", tooltip: "1350 Person" },
    ],
    Monthly: [
      { label: "Jan", height: 110, value: "42,000", tooltip: "920 Person" },
      { label: "Feb", height: 135, value: "54,000", tooltip: "1180 Person" },
      { label: "Mar", height: 95, value: "38,000", tooltip: "840 Person" },
      { label: "Apr", height: 150, value: "68,000", tooltip: "1550 Person", showDefaultBadge: true },
      { label: "May", height: 175, value: "88,000", tooltip: "2100 Person", showDefaultBadge: true },
      { label: "Jun", height: 120, value: "51,000", tooltip: "1100 Person" },
      { label: "Jul", height: 140, value: "62,000", tooltip: "1420 Person" },
    ],
    Weekly: [
      { label: "Fri", height: 127, value: "58,000", tooltip: "1140 Person" },
      { label: "Sat", height: 158, value: "78,000", tooltip: "1275 Person", showDefaultBadge: true },
      { label: "Sun", height: 86, value: "34,000", tooltip: "850 Person" },
      { label: "Mon", height: 142, value: "65,000", tooltip: "1620 Person" },
      { label: "Tue", height: 188, value: "95,000", tooltip: "2342 Person", showDefaultBadge: true },
      { label: "Wed", height: 105, value: "45,000", tooltip: "1090 Person" },
      { label: "Thu", height: 129, value: "59,000", tooltip: "1350 Person" },
    ],
  };

  const currentRevenueData = revenueDataMap[selectedTimeframe];

  // Dynamic data mapping for Average Customer Growth
  const growthDataMap: Record<
    "Weekly" | "Monthly" | "Yearly",
    { percentage: number; growthRate: string }
  > = {
    Weekly: { percentage: 22, growthRate: "+5.25%" },
    Monthly: { percentage: 54, growthRate: "+18.40%" },
    Yearly: { percentage: 78, growthRate: "+42.60%" },
  };

  const currentGrowthData = growthDataMap[selectedGrowthPeriod];
  const donutCircumference = 264;
  const donutStrokeOffset =
    donutCircumference - (donutCircumference * currentGrowthData.percentage) / 100;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col font-['Lato',sans-serif] selection:bg-[#4F39F6] selection:text-white">
      {/* Figma Desktop Canvas Wrapper (1440px target layout) */}
      <div className="flex-1 w-full flex flex-col lg:flex-row relative">
        
        {/* ================= DESKTOP LEFT SIDE PANEL (240px width) ================= */}
        <aside
          className="hidden lg:flex lg:w-[240px] shrink-0 min-h-screen border-r border-white/20 flex-col justify-between p-4 z-40 sticky top-0"
          style={{
            background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
          }}
        >
          {/* Top Brand Logo Section (Frame 6, 208px x 64px) */}
          <div className="flex flex-col gap-6">
            <div className="w-full h-16 border-b border-white/20 flex items-center justify-between pb-4 px-1">
              <Link href="/" className="transition-transform hover:scale-105 flex items-center">
                <CurioLogo size="sm" />
              </Link>
            </div>

            {/* Navigation Menu Buttons */}
            <nav className="flex flex-col gap-1 w-full">
              {/* 1. Dashboard Overview */}
              <button
                onClick={() => setActiveNav("dashboard")}
                className={`w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left ${
                  activeNav === "dashboard"
                    ? "bg-white/20 border-l-4 border-[#2563EB] text-white font-medium shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <DashboardGridIcon className={activeNav === "dashboard" ? "text-white" : "text-[#B5C8DB]"} />
                <span className="text-base font-medium">Dashboard Overview</span>
              </button>

              {/* 2. User Management */}
              <Link
                href="/admin/dashboard/users"
                className={`w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left ${
                  activeNav === "users"
                    ? "bg-white/20 border-l-4 border-[#2563EB] text-white font-medium shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Users className="w-5 h-5 text-[#B5C8DB]" />
                <span className="text-base font-normal font-['Inter',sans-serif]">User Management</span>
              </Link>

              {/* 3. Subscription plan */}
              <Link
                href="/admin/dashboard/subscription-plan"
                className="w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left text-white/80 hover:text-white hover:bg-white/10"
              >
                <SubscriptionCardIcon className="text-[#B5C8DB]" />
                <span className="text-base font-normal font-['Inter',sans-serif]">Subscription plan</span>
              </Link>

              {/* 4. Admin Settings */}
              <Link
                href="/admin/dashboard/admin-settings"
                className="w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left text-white/80 hover:text-white hover:bg-white/10"
              >
                <Settings className="w-5 h-5 text-[#B5C8DB]" />
                <span className="text-base font-normal font-['Inter',sans-serif]">Admin Settings</span>
              </Link>

              {/* 5. Platform Setting */}
              <Link
                href="/admin/dashboard/platform-setting"
                className="w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left text-white/80 hover:text-white hover:bg-white/10"
              >
                <Sliders className="w-5 h-5 text-[#B5C8DB]" />
                <span className="text-base font-normal font-['Inter',sans-serif]">Platform Setting</span>
              </Link>

              {/* 6. User Reviews */}
              <Link
                href="/admin/dashboard/user-reviews"
                className={`w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all select-none ${
                  activeNav === "reviews"
                    ? "bg-white/20 border-l-4 border-[#2563EB] text-white font-medium shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <MessageSquare className="w-5 h-5 text-[#B5C8DB]" />
                <span className="text-base font-normal font-['Inter',sans-serif]">User Reviews</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Log Out Button (Frame 2147239891) */}
          <div className="pt-8 w-full">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="w-full h-12 rounded-lg bg-white/20 border-l-[3px] border-[#FF5B5B] flex items-center gap-3 px-3 text-white hover:bg-red-500/20 active:scale-[0.99] transition-all cursor-pointer select-none"
            >
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="text-base font-normal text-white">Log Out</span>
            </button>
          </div>
        </aside>

        {/* ================= MOBILE DRAWER SIDEBAR ================= */}
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
                className="fixed top-0 left-0 bottom-0 w-[270px] max-w-[85vw] border-r border-white/20 flex flex-col justify-between p-4 z-50 lg:hidden shadow-2xl overflow-y-auto"
                style={{
                  background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <div className="flex flex-col gap-6">
                  <div className="w-full h-16 border-b border-white/20 flex items-center justify-between pb-4 px-1">
                    <Link href="/" onClick={() => setIsMobileSidebarOpen(false)} className="flex items-center">
                      <CurioLogo size="sm" />
                    </Link>
                    <button
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      aria-label="Close sidebar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Navigation Menu Buttons */}
                  <nav className="flex flex-col gap-1 w-full">
                    <button
                      onClick={() => {
                        setActiveNav("dashboard");
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left ${
                        activeNav === "dashboard"
                          ? "bg-white/20 border-l-4 border-[#2563EB] text-white font-medium shadow-sm"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <DashboardGridIcon className={activeNav === "dashboard" ? "text-white" : "text-[#B5C8DB]"} />
                      <span className="text-base font-medium">Dashboard Overview</span>
                    </button>

                    <Link
                      href="/admin/dashboard/users"
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className={`w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left ${
                        activeNav === "users"
                          ? "bg-white/20 border-l-4 border-[#2563EB] text-white font-medium shadow-sm"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Users className="w-5 h-5 text-[#B5C8DB]" />
                      <span className="text-base font-normal font-['Inter',sans-serif]">User Management</span>
                    </Link>

                    <Link
                      href="/admin/dashboard/subscription-plan"
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <SubscriptionCardIcon className="text-[#B5C8DB]" />
                      <span className="text-base font-normal font-['Inter',sans-serif]">Subscription plan</span>
                    </Link>

                    <Link
                      href="/admin/dashboard/admin-settings"
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <Settings className="w-5 h-5 text-[#B5C8DB]" />
                      <span className="text-base font-normal font-['Inter',sans-serif]">Admin Settings</span>
                    </Link>

                    <Link
                      href="/admin/dashboard/platform-setting"
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all cursor-pointer select-none text-left text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <Sliders className="w-5 h-5 text-[#B5C8DB]" />
                      <span className="text-base font-normal font-['Inter',sans-serif]">Platform Setting</span>
                    </Link>

                    <Link
                      href="/admin/dashboard/user-reviews"
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className={`w-full h-12 rounded-lg flex items-center gap-3 px-3 transition-all select-none ${
                        activeNav === "reviews"
                          ? "bg-white/20 border-l-4 border-[#2563EB] text-white font-medium shadow-sm"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <MessageSquare className="w-5 h-5 text-[#B5C8DB]" />
                      <span className="text-base font-normal font-['Inter',sans-serif]">User Reviews</span>
                    </Link>
                  </nav>
                </div>

                <div className="pt-8 w-full">
                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="w-full h-12 rounded-lg bg-white/20 border-l-[3px] border-[#FF5B5B] flex items-center gap-3 px-3 text-white hover:bg-red-500/20 active:scale-[0.99] transition-all cursor-pointer select-none"
                  >
                    <LogOut className="w-5 h-5 text-red-400" />
                    <span className="text-base font-normal text-white">Log Out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ================= RIGHT MAIN AREA ================= */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Header Bar (Nav: 80px height, background #2B2A7D with gradient) */}
          <header
            className="w-full h-16 sm:h-20 border-b border-white/20 px-4 sm:px-10 flex items-center justify-between sticky top-0 z-30 shadow-[0px_1px_12px_rgba(0,0,0,0.05)] backdrop-blur-md"
            style={{
              background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(79, 57, 246, 0.2) 0%, rgba(43, 127, 255, 0.2) 100%)",
            }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-purple-200 uppercase tracking-wider truncate max-w-[170px] xs:max-w-none">
                Curio AI Admin Console
              </span>
            </div>

            {/* Profile Badge (Frame 2147227759, 135px x 44px) */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/feed"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all"
              >
                <span>Live Feed</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center justify-center px-2 py-1 rounded-lg bg-white/20 border border-white/10 gap-2 sm:gap-3">
                {/* 32px Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#7A3BED] flex items-center justify-center font-bold text-xs text-white shadow-md shrink-0">
                  AH
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-white leading-tight truncate max-w-[90px] sm:max-w-none">{adminUser.name}</span>
                  <span className="text-[11px] sm:text-[12px] text-[#D0D0D0] leading-tight font-normal">{adminUser.role}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Body (Frame 2147239907: 1152px content width) */}
          <main className="flex-1 w-full max-w-[1240px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
            
            {/* Header Title (28px Semibold) */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-sm text-[#D0D0D0] mt-0.5">
                  Platform telemetry, revenue growth, and live user actions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs text-emerald-300 font-medium">Live Connected</span>
              </div>
            </div>

            {/* ================= 4 METRIC STATISTIC CARDS (Frame 2147227571) ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              
              {/* Card 1: Total Users (Amount 12,802 / 97) */}
              <div
                className="p-5 rounded-xl border border-white/10 flex flex-col justify-between h-[142px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] transition-all hover:border-white/30"
                style={{
                  background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[32px] font-medium text-white tracking-tight leading-[130%]">12,802</span>
                  <div className="w-12 h-12 rounded-lg bg-[#FFEFDF]/30 flex items-center justify-center text-white shrink-0">
                    <CardUsersIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-base font-medium text-white">Total Users</span>
              </div>

              {/* Card 2: Total Revenue (Amount 23,028) */}
              <div
                className="p-5 rounded-xl border border-white/10 flex flex-col justify-between h-[142px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] transition-all hover:border-white/30"
                style={{
                  background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[32px] font-medium text-white tracking-tight leading-[130%]">23,028</span>
                  <div className="w-12 h-12 rounded-lg bg-[#FFEFDF]/30 flex items-center justify-center text-white shrink-0">
                    <CardRevenueIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-base font-medium text-white">Total Revenue</span>
              </div>

              {/* Card 3: Total Video Processed (Amount 22,000) */}
              <div
                className="p-5 rounded-xl border border-white/10 flex flex-col justify-between h-[142px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] transition-all hover:border-white/30"
                style={{
                  background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[32px] font-medium text-white tracking-tight leading-[130%]">22,000</span>
                  <div className="w-12 h-12 rounded-lg bg-[#FFEFDF]/30 flex items-center justify-center text-white shrink-0">
                    <CardVideoIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-base font-medium text-white">Total Video Processed</span>
              </div>

              {/* Card 4: Total AI Summary (Amount 10,000) */}
              <div
                className="p-5 rounded-xl border border-white/10 flex flex-col justify-between h-[142px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] transition-all hover:border-white/30"
                style={{
                  background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[32px] font-medium text-white tracking-tight leading-[130%]">10,000</span>
                  <div className="w-12 h-12 rounded-lg bg-[#FFEFDF]/30 flex items-center justify-center text-white shrink-0">
                    <CardAiSummaryIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-base font-medium text-white">Total AI Summary</span>
              </div>
            </div>

            {/* ================= 2 ANALYTICS CHARTS (Frame 2147239932) ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left: Revenue Stats / Sales Performance Bar Chart (658px x 364px) */}
              <div
                className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-white/10 flex flex-col justify-between min-h-[364px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] relative overflow-hidden"
                style={{
                  background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                {/* Header Controls (Frame 164 / Frame 158: 594px x 32px) */}
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <h2 className="text-xl font-bold text-white tracking-[-0.02em] font-['Lato',sans-serif]">
                      Revenue Stats
                    </h2>
                    
                    {/* Timeframe selector pill (102px x 32px, Frame 2147227753) */}
                    <button
                      onClick={() => {
                        const next = selectedTimeframe === "Yearly" ? "Monthly" : selectedTimeframe === "Monthly" ? "Weekly" : "Yearly";
                        setSelectedTimeframe(next);
                      }}
                      title="Click to cycle timeframe"
                      className="w-[102px] h-[32px] px-2.5 rounded bg-white/20 hover:bg-white/30 transition-all flex items-center justify-between cursor-pointer select-none border border-white/10 active:scale-95"
                    >
                      {/* Left Arrow Icon */}
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                        <path d="M4.75 8.5L1 4.75L4.75 1" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-normal text-[#FAFAFA] font-['Lato',sans-serif]">
                        {selectedTimeframe}
                      </span>
                      {/* Right Arrow Icon */}
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                        <path d="M1 8.5L4.75 4.75L1 1" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Legend: Users (Frame 45) */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[14px] h-[14px] rounded-full shrink-0"
                      style={{ background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }}
                    />
                    <span className="text-base font-normal text-white font-['Lato',sans-serif] tracking-[-0.02em]">
                      Users
                    </span>
                  </div>
                </div>

                {/* Chart Area (Frame 151: 594px x 250px) */}
                <div className="w-full overflow-x-auto pb-1 scrollbar-thin">
                  <div className="min-w-[320px] flex items-end justify-between gap-2 sm:gap-6 pt-2 relative h-[250px]">
                    {/* Y-axis Labels (Frame 149: 55px x 211px) */}
                    <div className="flex flex-col justify-between text-right text-xs sm:text-base font-normal text-white h-[211px] w-[45px] sm:w-[55px] shrink-0 select-none pb-7 font-['Lato',sans-serif] tracking-[-0.02em]">
                      <span>100000</span>
                      <span>50000</span>
                      <span>10000</span>
                      <span>1,000</span>
                      <span>0</span>
                    </div>

                    {/* 7 Bars (Graph of sale performance: 529px x 220px) */}
                    <div className="flex-1 flex items-end justify-between gap-1 sm:gap-3 h-[220px] relative">
                      {currentRevenueData.map((bar, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-end h-full relative group">
                          
                          {/* Tooltip Badge with downward polygon arrow (Figma 2020 & 2023 badges) */}
                          {bar.showDefaultBadge && (
                            <div className="absolute -top-1 sm:-top-2 flex flex-col items-center z-20 pointer-events-none">
                              <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[5.28px] bg-white/20 backdrop-blur-md text-[10px] sm:text-[11px] font-medium text-white text-center leading-[13px] sm:leading-[15px] font-['Manrope',sans-serif] shadow-lg whitespace-nowrap">
                                <div>{bar.tooltip.split(" ")[0]}</div>
                                <div className="text-[9px] sm:text-[10px] opacity-90">{bar.tooltip.split(" ")[1] || "Person"}</div>
                              </div>
                              {/* Downward Caret Polygon */}
                              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="-mt-[1px]">
                                <path d="M6 7L0 0H12L6 7Z" fill="white" fillOpacity="0.25" />
                              </svg>
                            </div>
                          )}

                          {/* Interactive hover tooltip on other bars */}
                          {!bar.showDefaultBadge && (
                            <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center z-20 pointer-events-none">
                              <div className="px-2 py-0.5 rounded-[5px] bg-white/20 backdrop-blur-md text-[10px] sm:text-[11px] font-medium text-white shadow-lg whitespace-nowrap font-['Manrope',sans-serif]">
                                {bar.tooltip}
                              </div>
                              <svg width="10" height="5" viewBox="0 0 10 5" fill="none" className="-mt-[1px]">
                                <path d="M5 5L0 0H10L5 5Z" fill="white" fillOpacity="0.25" />
                              </svg>
                            </div>
                          )}

                          {/* Bar (Rectangle 4: 55px width, 2px radius, gradient #2B7FFF to #4F39F6) */}
                          <div
                            className="w-6 sm:w-[50px] xl:w-[55px] rounded-[2px] transition-all duration-300 group-hover:brightness-125 cursor-pointer shadow-sm shrink-0"
                            style={{
                              height: `${bar.height}px`,
                              background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)",
                            }}
                          />

                          {/* Year / Day Label (Lato 16px, text-center, color #FFFFFF, 24px height) */}
                          <span className="h-6 flex items-center justify-center text-xs sm:text-base font-normal text-white text-center font-['Lato',sans-serif] tracking-[-0.02em] mt-2 select-none">
                            {bar.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Average Customer Growth Donut (470px) */}
              <div
                className="lg:col-span-5 p-6 sm:p-8 rounded-xl border border-white/10 flex flex-col justify-between min-h-[364px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)]"
                style={{
                  background: "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white tracking-tight">Average Customer Growth</h2>
                </div>

                {/* Circular Gauge / Donut */}
                <div className="flex items-center justify-center my-4 relative">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Outer Track */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="rgba(255, 255, 255, 0.25)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="url(#donutGradient)"
                        strokeWidth="12"
                        strokeDasharray={donutCircumference}
                        strokeDashoffset={donutStrokeOffset}
                        strokeLinecap="round"
                        fill="none"
                        className="transition-all duration-700 ease-out"
                      />
                      <defs>
                        <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2B7FFF" />
                          <stop offset="100%" stopColor="#4F39F6" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center White Disc with Shadow (Ellipse 11) */}
                    <div className="absolute w-24 h-24 rounded-full bg-white shadow-[0px_17px_35px_rgba(0,0,0,0.12)] flex items-center justify-center">
                      <span className="text-xl font-semibold text-[#1C1C1C] font-['Inter',sans-serif] transition-all duration-300">
                        {currentGrowthData.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls: Weekly/Monthly/Yearly Dropdown & growth pill */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 relative">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsGrowthDropdownOpen((prev) => !prev)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/20 text-sm text-[#FAFAFA] font-normal hover:bg-white/30 transition-all cursor-pointer border border-white/10"
                    >
                      <span>{selectedGrowthPeriod}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${
                          isGrowthDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isGrowthDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setIsGrowthDropdownOpen(false)}
                        />
                        <div className="absolute left-0 bottom-full mb-2 w-32 bg-[#1B194B] border border-white/20 rounded-lg shadow-2xl py-1 z-30 backdrop-blur-md">
                          {(["Weekly", "Monthly", "Yearly"] as const).map((period) => (
                            <button
                              key={period}
                              type="button"
                              onClick={() => {
                                setSelectedGrowthPeriod(period);
                                setIsGrowthDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                                selectedGrowthPeriod === period
                                  ? "bg-white/25 text-white font-medium"
                                  : "text-white/70 hover:text-white hover:bg-white/10"
                              }`}
                            >
                              <span>{period}</span>
                              {selectedGrowthPeriod === period && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#28F647]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">Users</span>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#28F647]/20 border border-[#28F647] text-[#28F647] text-sm font-medium transition-all duration-300">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{currentGrowthData.growthRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RECENT ACTIVITY TABLE CONTAINER (Frame 2147240222) ================= */}
            <div className="flex flex-col gap-4 mt-2">
              
              {/* Table Controls Top Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <h3 className="text-2xl font-medium text-white tracking-tight">Recent Activity</h3>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Search Bar (246px x 40px) */}
                  <div className="relative w-full sm:w-[246px] h-10 flex items-center">
                    <Search className="w-4 h-4 text-[#B5C8DB] absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-full pl-9 pr-3 rounded-md bg-white/20 border border-white/10 text-white placeholder-[#D0D0D0] text-sm outline-none focus:border-[#4F39F6] transition-all"
                    />
                  </div>

                  {/* Filter Pill Tabs (Container: Free Members | Pro Members | Enterprise Members) */}
                  <div className="flex items-center p-1 rounded-md bg-white/20 border border-white/10 text-sm select-none max-w-full overflow-x-auto scrollbar-none shrink-0">
                    <button
                      onClick={() => setSelectedPlanFilter("Free")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap text-xs sm:text-sm ${
                        selectedPlanFilter === "Free"
                          ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white font-medium shadow"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span className="hidden sm:inline">Free Members</span>
                      <span className="sm:hidden">Free</span>
                    </button>
                    <button
                      onClick={() => setSelectedPlanFilter("Pro")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap text-xs sm:text-sm ${
                        selectedPlanFilter === "Pro"
                          ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white font-medium shadow"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span className="hidden sm:inline">Pro Members</span>
                      <span className="sm:hidden">Pro</span>
                    </button>
                    <button
                      onClick={() => setSelectedPlanFilter("Enterprise")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap text-xs sm:text-sm ${
                        selectedPlanFilter === "Enterprise"
                          ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white font-medium shadow"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span className="hidden sm:inline">Enterprise Members</span>
                      <span className="sm:hidden">Enterprise</span>
                    </button>
                    <button
                      onClick={() => setSelectedPlanFilter("ALL")}
                      className={`px-2.5 py-1.5 rounded text-xs transition-all cursor-pointer whitespace-nowrap ${
                        selectedPlanFilter === "ALL"
                          ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white font-medium shadow"
                          : "text-white/60 hover:text-white"
                      }`}
                      title="Show All"
                    >
                      All
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Table Container (Frame 2147239933) */}
              <div
                className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl overflow-x-auto"
                style={{
                  background: "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <div className="min-w-[620px]">
                  {/* Table Header Row (Frame 2147239437, height 52px, background rgba(43,127,255,0.3)) */}
                  <div className="w-full h-[52px] bg-[#2B7FFF]/30 px-4 sm:px-6 flex items-center justify-between text-xs sm:text-sm font-semibold text-white uppercase tracking-wider select-none border-b border-white/10">
                    <div className="w-[180px] text-left">User</div>
                    <div className="w-[140px] text-left hidden md:block">Email</div>
                    <div className="w-[110px] text-left hidden sm:block">Plan</div>
                    <div className="flex-1 text-left px-2">Activity</div>
                    <div className="w-[180px] text-left hidden lg:block">Date / Time</div>
                    <div className="w-[72px] text-center">Action</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-white/10">
                    {filteredActivities.length === 0 ? (
                      <div className="py-12 text-center text-[#D0D0D0] text-sm">
                        No matching activity records found. Try adjusting your search query or filter tab.
                      </div>
                    ) : (
                      filteredActivities.map((row, idx) => (
                        <div
                          key={row.id}
                          className={`w-full min-h-[68px] px-4 sm:px-6 flex items-center justify-between transition-colors hover:bg-white/10 ${
                            idx % 2 === 1 ? "bg-white/[0.05]" : "bg-transparent"
                          }`}
                        >
                          {/* User Col */}
                          <div className="w-[180px] flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${row.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                              {row.name.charAt(0)}
                            </div>
                            <span className="text-sm sm:text-base font-normal text-white truncate">{row.name}</span>
                          </div>

                          {/* Email Col */}
                          <div className="w-[140px] hidden md:block text-sm text-[#D0D0D0] truncate">
                            {row.email}
                          </div>

                          {/* Plan Col */}
                          <div className="w-[110px] hidden sm:block">
                            <span
                              className={`px-2.5 py-1 rounded text-xs font-medium uppercase tracking-wide ${
                                row.plan === "Enterprise"
                                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                  : row.plan === "Pro"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : "bg-white/10 text-white/80 border border-white/20"
                              }`}
                            >
                              {row.plan}
                            </span>
                          </div>

                          {/* Activity Title & Description Col */}
                          <div className="flex-1 flex flex-col justify-center px-2 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white truncate">{row.type}</span>
                              {row.rating && (
                                <div className="flex items-center gap-0.5 text-amber-400">
                                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                  <span className="text-xs font-bold text-white">{row.rating}/5</span>
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-[#D0D0D0] truncate mt-0.5">{row.description}</span>
                          </div>

                          {/* Date Col */}
                          <div className="w-[180px] hidden lg:block text-sm text-[#D0D0D0]">
                            {row.dateTime}
                          </div>

                          {/* Action Eye Col */}
                          <div className="w-[72px] flex items-center justify-center gap-1.5">
                            <Link
                              href={`/admin/dashboard/user-details?name=${encodeURIComponent(row.name)}&plan=${encodeURIComponent(row.plan)}`}
                              className="w-8 h-8 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-[#B5C8DB] hover:text-white transition-all cursor-pointer"
                              title="View Full User Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Pagination Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-sm text-white">
                {/* Result count */}
                <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                  <span className="font-medium text-white">Result</span>
                  <div className="relative">
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="px-3 py-1.5 rounded-md bg-white/20 border border-white/10 text-white outline-none cursor-pointer"
                    >
                      <option value={10} className="bg-[#151628] text-white">10</option>
                      <option value={20} className="bg-[#151628] text-white">20</option>
                      <option value={50} className="bg-[#151628] text-white">50</option>
                    </select>
                  </div>
                  <span className="text-[#D0D0D0] font-normal">per page (Showing 1-{filteredActivities.length} of 50)</span>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2 select-none flex-wrap justify-center">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-2.5 sm:px-3 py-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden xs:inline">Previous</span>
                  </button>

                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer ${
                      currentPage === 1
                        ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow"
                        : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                  >
                    1
                  </button>

                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer ${
                      currentPage === 2
                        ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow"
                        : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                  >
                    2
                  </button>

                  <button
                    onClick={() => setCurrentPage(3)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer ${
                      currentPage === 3
                        ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow"
                        : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                  >
                    3
                  </button>

                  <span className="text-white/60 px-0.5 sm:px-1">...</span>

                  <button
                    onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
                    className="px-2.5 sm:px-3 py-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <span className="hidden xs:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ================= DETAIL MODAL (WHEN EYE ICON IS CLICKED) ================= */}
      <AnimatePresence>
        {activeActivityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#151628] border border-white/20 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveActivityModal(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#D0D0D0] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${activeActivityModal.avatarColor} flex items-center justify-center font-bold text-lg text-white shadow-lg`}>
                  {activeActivityModal.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{activeActivityModal.name}</h3>
                  <p className="text-sm text-[#D0D0D0]">{activeActivityModal.email}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#D0D0D0]">Activity Action:</span>
                  <span className="font-semibold text-white">{activeActivityModal.type}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#D0D0D0]">Member Tier:</span>
                  <span className="font-semibold text-cyan-300">{activeActivityModal.plan}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#D0D0D0]">Timestamp:</span>
                  <span className="text-white font-mono text-xs">{activeActivityModal.dateTime}</span>
                </div>
                <div>
                  <span className="text-[#D0D0D0] block mb-1">Details Summary:</span>
                  <p className="text-white leading-relaxed">{activeActivityModal.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveActivityModal(null)}
                  className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/admin/dashboard/user-details"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2"
                >
                  <span>View User Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
