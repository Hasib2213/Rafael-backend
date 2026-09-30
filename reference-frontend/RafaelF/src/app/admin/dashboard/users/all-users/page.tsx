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
  FluentSearchIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "../../user-details/UserDetailsIcons";

export type PlanType = "Free Member" | "Pro Member" | "Enterprise Member";

export interface UserCardItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  subscriptionType: string;
  plan: PlanType;
  joinedDate: string;
  avatarUrl?: string;
  avatarColor: string;
}

const ALL_USERS_DATA: UserCardItem[] = [
  {
    id: "USR-001",
    name: "Nila Akter",
    phone: "+8801688148194",
    email: "rezaux007@gmail.com",
    subscriptionType: "Pro(Monthly)",
    plan: "Pro Member",
    joinedDate: "Jan 10, 2024",
    avatarColor: "from-blue-600 to-indigo-700",
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah.j@gmail.com",
    subscriptionType: "Pro(Monthly)",
    plan: "Pro Member",
    joinedDate: "Feb 14, 2024",
    avatarColor: "from-indigo-500 to-purple-600",
  },
  {
    id: "USR-003",
    name: "Alex Rivera",
    phone: "+1 (555) 876-5432",
    email: "alex.r@gmail.com",
    subscriptionType: "Enterprise(Annual)",
    plan: "Enterprise Member",
    joinedDate: "Nov 22, 2023",
    avatarColor: "from-purple-600 to-pink-600",
  },
  {
    id: "USR-004",
    name: "David Chen",
    phone: "+1 (555) 345-6789",
    email: "david.c@gmail.com",
    subscriptionType: "Free(Standard)",
    plan: "Free Member",
    joinedDate: "Mar 05, 2024",
    avatarColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "USR-005",
    name: "Emma Watson",
    phone: "+1 (555) 987-6543",
    email: "emma.w@company.org",
    subscriptionType: "Enterprise(Monthly)",
    plan: "Enterprise Member",
    joinedDate: "Apr 18, 2024",
    avatarColor: "from-amber-500 to-orange-600",
  },
  {
    id: "USR-006",
    name: "Michael Brown",
    phone: "+1 (555) 456-7890",
    email: "michael.b@gmail.com",
    subscriptionType: "Pro(Annual)",
    plan: "Pro Member",
    joinedDate: "May 30, 2024",
    avatarColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "USR-007",
    name: "Sophia Taylor",
    phone: "+1 (555) 654-3210",
    email: "sophia.t@gmail.com",
    subscriptionType: "Free(Standard)",
    plan: "Free Member",
    joinedDate: "Jun 12, 2024",
    avatarColor: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "USR-008",
    name: "James Wilson",
    phone: "+1 (555) 789-0123",
    email: "james.w@gmail.com",
    subscriptionType: "Free(Standard)",
    plan: "Free Member",
    joinedDate: "Jul 04, 2024",
    avatarColor: "from-blue-600 to-cyan-600",
  },
  {
    id: "USR-009",
    name: "Liam Torres",
    phone: "+1 (555) 123-9876",
    email: "liam.t@hotmail.com",
    subscriptionType: "Free(Standard)",
    plan: "Free Member",
    joinedDate: "Aug 19, 2024",
    avatarColor: "from-teal-500 to-cyan-700",
  },
  {
    id: "USR-010",
    name: "Olivia Scott",
    phone: "+1 (555) 432-1098",
    email: "olivia.s@gmail.com",
    subscriptionType: "Free(Standard)",
    plan: "Free Member",
    joinedDate: "Sep 01, 2024",
    avatarColor: "from-rose-500 to-pink-600",
  },
  {
    id: "USR-011",
    name: "Marcus Webb",
    phone: "+1 (555) 890-1234",
    email: "marcus.w@enterprise.io",
    subscriptionType: "Enterprise(Annual)",
    plan: "Enterprise Member",
    joinedDate: "Sep 15, 2024",
    avatarColor: "from-violet-600 to-indigo-800",
  },
  {
    id: "USR-012",
    name: "Chloe Warren",
    phone: "+1 (555) 567-8901",
    email: "chloe.w@gmail.com",
    subscriptionType: "Pro(Monthly)",
    plan: "Pro Member",
    joinedDate: "Oct 10, 2024",
    avatarColor: "from-sky-500 to-blue-700",
  },
];

// Phone Icon (fluent:call-12-regular)
function FluentCallIcon({ className = "w-6 h-6 text-[#B5C8DB]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Mail Icon (material-symbols:mail-outline-rounded)
function MaterialMailIcon({ className = "w-6 h-6 text-[#B5C8DB]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.45 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Profile Eye Action Icon
function EyeProfileIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
        fill="currentColor"
      />
    </svg>
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

function SidebarContent({
  onClose,
  onLogoutRequest,
}: {
  onClose?: () => void;
  onLogoutRequest?: () => void;
}) {
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
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
          >
            <SideNavDashboardIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
            <span className="font-['Lato'] font-medium text-[16px] text-white">Dashboard Overview</span>
          </Link>

          <Link
            href="/admin/dashboard/users"
            onClick={onClose}
            className="w-full h-12 rounded-lg flex items-center gap-3 px-3 select-none"
            style={{ background: "rgba(255,255,255,0.2)", borderLeft: "4px solid #2563EB" }}
          >
            <SideNavUsersIcon className="w-5 h-5 text-white shrink-0" />
            <span className="font-['Lato'] font-medium text-[16px] text-white">User Management</span>
          </Link>

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
          style={{ background: "rgba(255,255,255,0.2)", borderLeft: "3px solid #FF5B5B" }}
        >
          <SideNavLogoutIcon className="w-5 h-5 text-red-400 shrink-0" />
          <span className="font-['Lato'] font-normal text-[16px] tracking-[-0.02em] text-white">Log Out</span>
        </button>
      </div>
    </>
  );
}

export default function AllUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlanTab, setSelectedPlanTab] = useState<PlanType | "ALL">("Free Member");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("curio_admin_user");
      window.location.href = "/admin/login";
    }
  };

  const sidebarBg =
    "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43,127,255,0.2) 0%, rgba(79,57,246,0.2) 100%)";

  const tabs: { key: PlanType | "ALL"; label: string; shortLabel: string; width: string }[] = [
    { key: "Free Member", label: "Free Members", shortLabel: "Free", width: "w-[122px]" },
    { key: "Pro Member", label: "Pro Members", shortLabel: "Pro", width: "w-[116px]" },
    { key: "Enterprise Member", label: "Enterprise Members", shortLabel: "Enterprise", width: "w-[161px]" },
  ];

  // Filtering data
  const filteredUsers = useMemo(() => {
    return ALL_USERS_DATA.filter((user) => {
      const matchesPlan = selectedPlanTab === "ALL" || user.plan === selectedPlanTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phone.toLowerCase().includes(q) ||
        user.subscriptionType.toLowerCase().includes(q) ||
        user.joinedDate.toLowerCase().includes(q);

      return matchesPlan && matchesSearch;
    });
  }, [searchQuery, selectedPlanTab]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Group paginated users into pairs (2 cards per row as in Figma 1104px container)
  const pairedRows = useMemo(() => {
    const rows: UserCardItem[][] = [];
    for (let i = 0; i < paginatedUsers.length; i += 2) {
      rows.push(paginatedUsers.slice(i, i + 2));
    }
    return rows;
  }, [paginatedUsers]);

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
            background:
              "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(79,57,246,0.2) 0%, rgba(43,127,255,0.2) 100%)",
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
            All Users
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
              <span className="font-['Lato'] font-medium text-[14px] leading-[150%] text-white truncate -my-0.5">
                Abir Hossain
              </span>
              <span className="font-['Lato'] font-normal text-[12px] leading-[150%] text-[#D0D0D0]">Admin</span>
            </div>
          </div>
        </header>

        {/* Main Body (Frame 2147240223: 1152px x 1180px container) */}
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
          
          {/* Top Controls Row (Frame 2147240220: 1152px x 40px) */}
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Title: All Users */}
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard/users"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#B5C8DB] hover:text-white transition-all flex items-center justify-center"
                title="Back to User Management"
              >
                <CaretLeftIcon className="w-4 h-4" />
              </Link>
              <h1 className="font-['Lato'] font-medium text-[24px] leading-[140%] tracking-[-0.02em] text-white">
                All Users
              </h1>
            </div>

            {/* Right Controls Container (Frame 2147240221: 677px x 40px) */}
            <div className="w-full md:w-auto flex flex-wrap items-center justify-between md:justify-end gap-3 sm:gap-6">
              
              {/* Search Box (Frame 2147227758: 246px x 40px) */}
              <div
                className="h-10 flex items-center gap-2.5 rounded-[6px] w-full sm:w-[246px] transition-all"
                style={{ background: "rgba(255, 255, 255, 0.2)", padding: "10px" }}
              >
                <FluentSearchIcon className="w-6 h-6 text-[#B5C8DB] shrink-0" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-transparent font-['Lato'] font-normal text-[14px] leading-[150%] text-white placeholder-[#D0D0D0] outline-none min-w-0"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-white/50 hover:text-white text-xs cursor-pointer shrink-0"
                  >
                    &#x2715;
                  </button>
                )}
              </div>

              {/* Filter Tabs Container (Frame 2147240033: 407px x 40px) */}
              <div
                className="h-10 flex items-center overflow-x-auto rounded-[6px] shrink-0 p-1"
                style={{ background: "rgba(255, 255, 255, 0.2)" }}
              >
                {tabs.map((tab) => {
                  const isActive = selectedPlanTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setSelectedPlanTab(tab.key);
                        setCurrentPage(1);
                      }}
                      className={`h-8 font-['Lato'] font-normal text-[14px] sm:text-[16px] leading-[150%] tracking-[-0.02em] flex items-center justify-center px-3 py-2 transition-all cursor-pointer text-white whitespace-nowrap ${
                        isActive
                          ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] rounded-[4px] shadow-sm font-medium"
                          : "hover:bg-white/10 rounded-[4px]"
                      }`}
                    >
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span className="hidden sm:block">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* User Cards Main Container (Frame 2147239449: 1152px x 1068px) */}
          <div
            className="w-full rounded-[16px] p-4 sm:p-6 flex flex-col items-center justify-center gap-6 border border-white/10 shadow-[0px_1px_12px_rgba(0,0,0,0.05)]"
            style={{
              background:
                "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
            }}
          >
            {paginatedUsers.length === 0 ? (
              <div className="py-24 flex flex-col items-center justify-center gap-3 text-center">
                <FluentSearchIcon className="w-12 h-12 text-white/30" />
                <p className="font-['Lato'] text-base text-[#D0D0D0]">
                  No users found for &ldquo;{searchQuery}&rdquo; in {selectedPlanTab}.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedPlanTab("Free Member");
                  }}
                  className="mt-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              pairedRows.map((rowPair, rIdx) => (
                <React.Fragment key={`row-${rIdx}`}>
                  {/* Row of up to 2 cards (Frame 2147230413: 1104px x 300px) */}
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {rowPair.map((user) => (
                      <div
                        key={user.id}
                        className="w-full rounded-[12px] p-4 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-white/30 border border-white/10 hover:shadow-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        {/* Top Info Section (Frame 2147230398: 359px x 120px) */}
                        <div className="flex items-center gap-5 sm:gap-[22px]">
                          {/* Avatar (Frame 2147225842: 120px x 120px) */}
                          <div
                            className={`w-24 h-24 sm:w-[120px] sm:h-[120px] rounded-[16px] bg-gradient-to-tr ${user.avatarColor} flex items-center justify-center text-3xl font-bold text-white shadow-lg shrink-0 overflow-hidden relative border border-white/20`}
                          >
                            <span className="font-['Lato'] tracking-wider">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>

                          {/* Details (Frame 2147230414: 217px x 102px) */}
                          <div className="flex flex-col gap-2 sm:gap-3 min-w-0">
                            {/* User Name */}
                            <h3 className="font-['Lato'] font-medium text-[20px] sm:text-[24px] leading-[140%] tracking-[-0.02em] text-white truncate">
                              {user.name}
                            </h3>

                            {/* Contact Info (Frame 2147240239: 217px x 56px) */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                              {/* Phone Row (Frame 2147230183) */}
                              <div className="flex items-center gap-2 text-white/90">
                                <FluentCallIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                                <span className="font-['Lato'] font-normal text-[14px] sm:text-[16px] leading-[150%] tracking-[-0.02em] text-white truncate">
                                  {user.phone}
                                </span>
                              </div>

                              {/* Email Row (Frame 2147230184) */}
                              <div className="flex items-center gap-2 text-white/90">
                                <MaterialMailIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                                <span className="font-['Lato'] font-normal text-[14px] sm:text-[16px] leading-[150%] tracking-[-0.02em] text-white truncate">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Subscription Details Box (Frame 2147230408: 510px x 76px) */}
                        <div
                          className="w-full h-[76px] rounded-[10px] px-4 py-3 flex items-center justify-between gap-6"
                          style={{ background: "rgba(255, 255, 255, 0.1)" }}
                        >
                          {/* Left: Subscription Type */}
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="font-['Lato'] font-normal text-[14px] sm:text-[16px] leading-[150%] tracking-[-0.02em] text-[#D0D0D0]">
                              Subscription type
                            </span>
                            <span className="font-['Lato'] font-medium text-[15px] sm:text-[16px] leading-[150%] text-white truncate">
                              {user.subscriptionType}
                            </span>
                          </div>

                          {/* Right: Joined Date */}
                          <div className="flex flex-col gap-1 text-right min-w-0">
                            <span className="font-['Lato'] font-normal text-[14px] sm:text-[16px] leading-[150%] tracking-[-0.02em] text-[#D0D0D0]">
                              Joined
                            </span>
                            <span className="font-['Lato'] font-semibold text-[15px] sm:text-[16px] leading-[150%] text-white truncate">
                              {user.joinedDate}
                            </span>
                          </div>
                        </div>

                        {/* Primary Action Button (Primary button: 510px x 40px) */}
                        <Link
                          href={`/admin/dashboard/user-details?name=${encodeURIComponent(user.name)}&plan=${encodeURIComponent(user.plan)}`}
                          className="w-full h-10 rounded-[8px] flex items-center justify-center gap-2 text-white font-['Lato'] font-semibold text-[15px] sm:text-[16px] leading-[150%] shadow-md hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
                          style={{
                            background:
                              "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                          }}
                        >
                          <EyeProfileIcon className="w-5 h-5 text-white" />
                          <span>View Profile</span>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Divider Line between rows (Line 16 / Line 15) */}
                  {rIdx < pairedRows.length - 1 && (
                    <div className="w-full max-w-[1039px] h-[0.5px] bg-[#D1D1D1]/30 my-1" />
                  )}
                </React.Fragment>
              ))
            )}
          </div>

          {/* Pagination Footer (1128px x 40px) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            
            {/* Section Result: Result [ 06 ] of X users */}
            <div className="flex items-center gap-2.5 select-none">
              <span className="font-['Lato'] font-medium text-[14px] leading-[150%] text-white">
                Result
              </span>
              
              <div className="relative">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="h-10 px-2 rounded-[6px] bg-white/20 text-white font-['Lato'] text-[14px] leading-[150%] border border-white/10 outline-none cursor-pointer appearance-none pr-7"
                >
                  <option value={6} className="bg-[#1C184E] text-white">06</option>
                  <option value={12} className="bg-[#1C184E] text-white">12</option>
                  <option value={24} className="bg-[#1C184E] text-white">24</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <CaretDownIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              <span className="font-['Lato'] font-medium text-[14px] leading-[150%] text-white">
                of {filteredUsers.length} users
              </span>
            </div>

            {/* Pagination Button List */}
            <div className="flex items-center gap-2 select-none flex-wrap justify-center">
              {/* Previous */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-10 px-3 rounded-[6px] bg-white/20 hover:bg-white/30 disabled:opacity-40 text-white font-['Lato'] font-medium text-[14px] leading-[150%] flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed border border-white/10"
              >
                <CaretLeftIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                <span>Previous</span>
              </button>

              {/* Number Buttons */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => {
                const isActive = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-[30px] h-10 rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] leading-[150%] transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow-md font-semibold"
                        : "bg-white/20 hover:bg-white/30 text-white border border-white/10"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span className="text-white/60 px-1 font-['Lato'] text-sm">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-[30px] h-10 rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] leading-[150%] transition-all cursor-pointer ${
                      currentPage === totalPages
                        ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow-md font-semibold"
                        : "bg-white/20 hover:bg-white/30 text-white border border-white/10"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-10 px-3 rounded-[6px] bg-white/20 hover:bg-white/30 disabled:opacity-40 text-white font-['Lato'] font-medium text-[14px] leading-[150%] flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed border border-white/10"
              >
                <span>Next</span>
                <CaretRightIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
              </button>
            </div>
          </div>
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
