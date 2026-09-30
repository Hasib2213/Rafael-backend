"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Eye, EyeOff, Search } from "lucide-react";
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

/* ================================================================
   CAMERA ICON SVG
================================================================ */

function CameraIcon({ className = "w-[31px] h-[25px]" }: { className?: string }) {
  return (
    <svg className={className} width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.4996 14.5719C20.4996 17.3024 18.2569 19.5237 15.5 19.5237C12.7431 19.5237 10.5013 17.3024 10.5013 14.5719C10.5013 11.8413 12.7431 9.62009 15.5 9.62009C18.2569 9.62009 20.4996 11.8422 20.4996 14.5719ZM31 7.54057V21.6049C31 23.4798 29.4652 25 27.5721 25H3.42788C1.53483 25 0 23.4798 0 21.6049V7.54057C0 5.66562 1.53483 4.14545 3.42788 4.14545H7.64416V2.97073C7.64416 1.33004 8.98618 0 10.6436 0H20.3564C22.0138 0 23.3558 1.33004 23.3558 2.97073V4.1446H27.5721C29.4652 4.14545 31 5.66562 31 7.54057ZM23.0705 14.5719C23.0705 10.4375 19.6743 7.07374 15.5 7.07374C11.3266 7.07374 7.93039 10.4375 7.93039 14.5719C7.93039 18.7063 11.3266 22.07 15.5 22.07C19.6743 22.07 23.0705 18.7063 23.0705 14.5719Z"
        fill="#FEFEFE"
      />
    </svg>
  );
}

/* ================================================================
   ICONS FOR SUSPENDED USERS & TABLE
================================================================ */

function TableEyeIcon({ className = "w-6 h-6 text-[#B5C8DB]" }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CaretDownIcon({ className = "w-3.5 h-3.5 text-[#B5C8DB]" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CaretLeftIcon({ className = "w-3.5 h-3.5 text-[#B5C8DB]" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CaretRightIcon({ className = "w-3.5 h-3.5 text-[#B5C8DB]" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================
   TYPES & DEFAULT DATA
================================================================ */

interface AdminInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  company: string;
  position: string;
}

interface PasswordState {
  oldPassword: string;
  newPassword: string;
}

export interface SuspendedUser {
  id: string;
  dateTime: string;
  userType: "Free" | "Pro" | "Enterprise";
  name: string;
  reason: string;
  email: string;
}

const DEFAULT_ADMIN_INFO: AdminInfo = {
  firstName: "Abir",
  lastName: "Hossain",
  phone: "01498978089049",
  address: "Dhaka, Bangladesh",
  company: "Orange Ltd",
  position: "Product Manager",
};

const INITIAL_SUSPENDED_USERS: SuspendedUser[] = [
  {
    id: "susp-1",
    dateTime: "08.08.2024 - 10:15 AM",
    userType: "Free",
    name: "Devon Lane",
    reason: "Spamming in forums",
    email: "devon.lane@gmail.com",
  },
  {
    id: "susp-2",
    dateTime: "07.08.2024 - 03:45 PM",
    userType: "Free",
    name: "Robert Fox",
    reason: "Fraudulent chargeback",
    email: "robert.fox@yahoo.com",
  },
  {
    id: "susp-3",
    dateTime: "05.08.2024 - 09:20 AM",
    userType: "Free",
    name: "Jenny Wilson",
    reason: "Terms of service violation",
    email: "jenny.wilson@outlook.com",
  },
  {
    id: "susp-4",
    dateTime: "03.08.2024 - 01:10 PM",
    userType: "Free",
    name: "Cody Fisher",
    reason: "Suspicious API rate limit",
    email: "cody.fisher@hotmail.com",
  },
  {
    id: "susp-5",
    dateTime: "01.08.2024 - 11:30 AM",
    userType: "Free",
    name: "Jane Cooper",
    reason: "Abusive language report",
    email: "jane.cooper@mail.com",
  },
  {
    id: "susp-6",
    dateTime: "30.07.2024 - 04:50 PM",
    userType: "Free",
    name: "Esther Howard",
    reason: "Multiple failed login attacks",
    email: "esther.howard@gmail.com",
  },
  {
    id: "susp-7",
    dateTime: "28.07.2024 - 02:15 PM",
    userType: "Free",
    name: "Cameron Williamson",
    reason: "Bot activity detected",
    email: "cameron.w@domain.com",
  },
  // Pro Members
  {
    id: "susp-8",
    dateTime: "06.08.2024 - 08:30 AM",
    userType: "Pro",
    name: "Guy Hawkins",
    reason: "Unauthorized script execution",
    email: "guy.hawkins@techpro.io",
  },
  {
    id: "susp-9",
    dateTime: "04.08.2024 - 12:40 PM",
    userType: "Pro",
    name: "Kristin Watson",
    reason: "Suspected account takeover",
    email: "kristin.w@cloudcorp.com",
  },
  {
    id: "susp-10",
    dateTime: "02.08.2024 - 06:15 PM",
    userType: "Pro",
    name: "Leslie Alexander",
    reason: "Disputed transaction",
    email: "leslie.alex@prodev.net",
  },
  // Enterprise Members
  {
    id: "susp-11",
    dateTime: "05.08.2024 - 02:00 PM",
    userType: "Enterprise",
    name: "Brooklyn Simmons",
    reason: "Security compliance breach",
    email: "b.simmons@enterprise.org",
  },
  {
    id: "susp-12",
    dateTime: "29.07.2024 - 10:00 AM",
    userType: "Enterprise",
    name: "Jerome Bell",
    reason: "API quota abuse",
    email: "jerome.bell@globalcorp.com",
  },
];

type TabType = "admin-info" | "suspended-users" | "admin-management";
type MemberTier = "Free" | "Pro" | "Enterprise";

export interface AdminUser {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "Active" | "Inactive";
}

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "admin-1",
    name: "Rob Stark",
    role: "Admin",
    email: "robstark089@gmail.com",
    status: "Active",
  },
  {
    id: "admin-2",
    name: "Jenny Wilson",
    role: "Super Admin",
    email: "jenny.wilson@curio.ai",
    status: "Active",
  },
  {
    id: "admin-3",
    name: "Devon Lane",
    role: "Editor",
    email: "devon.lane@curio.ai",
    status: "Active",
  },
  {
    id: "admin-4",
    name: "Cody Fisher",
    role: "Manager",
    email: "cody.fisher@curio.ai",
    status: "Active",
  },
  {
    id: "admin-5",
    name: "Jane Cooper",
    role: "Admin",
    email: "jane.cooper@curio.ai",
    status: "Active",
  },
  {
    id: "admin-6",
    name: "Esther Howard",
    role: "Editor",
    email: "esther.howard@curio.ai",
    status: "Active",
  },
  {
    id: "admin-7",
    name: "Cameron Williamson",
    role: "Admin",
    email: "cameron.w@curio.ai",
    status: "Active",
  },
];

const suspendedGridCols = "grid-cols-[180px_130px_140px_minmax(180px,1fr)_160px_72px_140px]";
const adminGridCols = "grid-cols-[180px_160px_minmax(220px,1fr)_120px_130px]";
const adminTableCardBg =
  "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)";
const adminRowOddBg =
  "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)";
const adminRowEvenBg =
  "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)";

/* ================================================================
   PAGE COMPONENT
================================================================ */

export default function AdminSettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("admin-info");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Info form state
  const [adminInfo, setAdminInfo] = useState<AdminInfo>(DEFAULT_ADMIN_INFO);
  const [profileImage, setProfileImage] = useState<string | null>("/images/admin-avatar.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password state
  const [passwords, setPasswords] = useState<PasswordState>({
    oldPassword: "jonsnow007",
    newPassword: "••••••••••",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Suspended Users state
  const [suspendedUsers, setSuspendedUsers] = useState<SuspendedUser[]>(INITIAL_SUSPENDED_USERS);
  const [suspendedSearch, setSuspendedSearch] = useState("");
  const [suspendedMemberFilter, setSuspendedMemberFilter] = useState<MemberTier>("Free");
  const [suspendedPage, setSuspendedPage] = useState(1);
  const [userToUnsuspend, setUserToUnsuspend] = useState<SuspendedUser | null>(null);
  const [previewUser, setPreviewUser] = useState<SuspendedUser | null>(null);

  // Admin Management state
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [adminPage, setAdminPage] = useState(1);
  const [adminToRemove, setAdminToRemove] = useState<AdminUser | null>(null);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
    name: "",
    email: "",
    role: "Admin",
  });

  const handleConfirmRemoveAdmin = () => {
    if (!adminToRemove) return;
    const targetName = adminToRemove.name;
    setAdminUsers((prev) => prev.filter((a) => a.id !== adminToRemove.id));
    showToast(`Admin ${targetName} removed successfully!`);
    setAdminToRemove(null);
  };

  const handleAddAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminForm.name.trim() || !newAdminForm.email.trim()) {
      showToast("Please provide both name and email.");
      return;
    }
    const newAdmin: AdminUser = {
      id: `admin-${Date.now()}`,
      name: newAdminForm.name.trim(),
      email: newAdminForm.email.trim(),
      role: newAdminForm.role,
      status: "Active",
    };
    setAdminUsers((prev) => [newAdmin, ...prev]);
    showToast(`Admin ${newAdmin.name} added successfully!`);
    setNewAdminForm({ name: "", email: "", role: "Admin" });
    setIsAddAdminModalOpen(false);
  };

  // Filtered suspended users
  const filteredSuspendedUsers = suspendedUsers.filter((u) => {
    const matchesTier = u.userType === suspendedMemberFilter;
    const q = suspendedSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.reason.toLowerCase().includes(q) ||
      u.dateTime.toLowerCase().includes(q);
    return matchesTier && matchesSearch;
  });

  const handleConfirmEndSuspension = () => {
    if (!userToUnsuspend) return;
    const targetName = userToUnsuspend.name;
    setSuspendedUsers((prev) => prev.filter((u) => u.id !== userToUnsuspend.id));
    showToast(`Suspension ended for ${targetName}`);
    setUserToUnsuspend(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("curio_admin_user");
      window.location.href = "/admin/login";
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAdminInfo = () => {
    showToast("Admin info saved successfully!");
  };

  const handleSavePassword = () => {
    showToast("Password updated successfully!");
  };

  const sidebarBg =
    "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)";

  const cardBg =
    "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)";

  /* ================================================================
     SIDEBAR NAV ITEMS (shared by desktop & mobile)
  ================================================================ */
  const renderNavItems = (mobile: boolean) => (
    <nav className="flex flex-col gap-1 w-full">
      <Link
        href="/admin/dashboard"
        {...(mobile ? { onClick: () => setIsMobileSidebarOpen(false) } : {})}
        className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
      >
        <SideNavDashboardIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
        <span className="font-['Lato'] font-normal text-[16px] text-white">Dashboard Overview</span>
      </Link>

      <Link
        href="/admin/dashboard/users"
        {...(mobile ? { onClick: () => setIsMobileSidebarOpen(false) } : {})}
        className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
      >
        <SideNavUsersIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
        <span className="font-['Lato'] font-normal text-[16px] text-white">User Management</span>
      </Link>

      <Link
        href="/admin/dashboard/subscription-plan"
        {...(mobile ? { onClick: () => setIsMobileSidebarOpen(false) } : {})}
        className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
      >
        <SideNavSubscriptionIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
        <span className="font-['Lato'] font-normal text-[16px] text-white">Subscription plan</span>
      </Link>

      {/* Admin Settings - ACTIVE */}
      <div
        className="w-full h-12 rounded-lg flex items-center gap-3 px-3 select-none"
        style={{ background: "rgba(255,255,255,0.2)", borderLeft: "4px solid #2563EB" }}
      >
        <SideNavAdminSettingsIcon className="w-5 h-5 text-white shrink-0" />
        <span className="font-['Lato'] font-medium text-[16px] text-white">Admin Settings</span>
      </div>

      <Link
        href="/admin/dashboard/platform-setting"
        {...(mobile ? { onClick: () => setIsMobileSidebarOpen(false) } : {})}
        className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
      >
        <SideNavPlatformSettingIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
        <span className="font-['Lato'] font-normal text-[16px] text-white">Platform Setting</span>
      </Link>

      <Link
        href="/admin/dashboard/user-reviews"
        {...(mobile ? { onClick: () => setIsMobileSidebarOpen(false) } : {})}
        className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
      >
        <SideNavReviewsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
        <span className="font-['Lato'] font-normal text-[16px] text-white">User Reviews</span>
      </Link>
    </nav>
  );

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

          {renderNavItems(false)}
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

                {renderNavItems(true)}
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
              Admin Settings
            </span>
          </div>

          {/* Right: Admin Profile */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              className="h-10 sm:h-11 px-2.5 sm:px-3 py-1 rounded-[8px] flex items-center gap-2 sm:gap-2.5 shrink-0 max-w-[140px] sm:max-w-none"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40 bg-gradient-to-tr from-[#3E8AFB] to-[#9369FD] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profileImage} alt="Admin" className="w-full h-full object-cover" />
                ) : (
                  "AH"
                )}
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="font-['Lato'] font-medium text-[14px] leading-[150%] text-white truncate -my-0.5">
                  Abir Hos...
                </span>
                <span className="font-['Lato'] font-normal text-[12px] leading-[150%] text-[#D0D0D0]">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ================= MAIN CONTENT BODY ================= */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1240px] mx-auto flex flex-col gap-6">
          {/* Page Heading */}
          <div className="w-full flex items-center justify-between">
            <h1 className="font-['Lato'] font-medium text-[24px] sm:text-[28px] leading-[140%] tracking-[-0.02em] text-white">
              Admin Settings
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
                <svg className="w-5 h-5 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-['Lato'] font-medium text-sm sm:text-base">{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========================================================
              3-TAB SWITCHER (Component 15)
          ========================================================= */}
          <section
            className="w-full p-1.5 sm:p-2 rounded-[16px] flex flex-row items-center gap-1 sm:gap-2 border border-white/10 shadow-xl overflow-x-auto scrollbar-none"
            style={{ background: cardBg }}
          >
            {/* Tab 1: Admin Info */}
            <button
              type="button"
              onClick={() => setActiveTab("admin-info")}
              className={`flex-1 min-w-0 h-[44px] sm:h-[56px] lg:h-[62px] px-1 sm:px-4 flex items-center justify-center transition-all cursor-pointer select-none ${
                activeTab === "admin-info"
                  ? "bg-white/20 rounded-[10px] sm:rounded-[12px] shadow-lg"
                  : "rounded-[6px] hover:bg-white/5"
              }`}
            >
              <span className="font-['Lato'] font-medium text-[12px] xs:text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] leading-[140%] tracking-[-0.01em] text-center text-white truncate">
                Admin Info
              </span>
            </button>

            {/* Tab 2: Suspended Users */}
            <button
              type="button"
              onClick={() => setActiveTab("suspended-users")}
              className={`flex-1 min-w-0 h-[44px] sm:h-[56px] lg:h-[62px] px-1 sm:px-4 flex items-center justify-center transition-all cursor-pointer select-none ${
                activeTab === "suspended-users"
                  ? "bg-white/20 rounded-[10px] sm:rounded-[12px] shadow-lg"
                  : "rounded-[6px] hover:bg-white/5"
              }`}
            >
              <span className="font-['Lato'] font-medium text-[12px] xs:text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] leading-[140%] tracking-[-0.01em] text-center text-white truncate">
                Suspended Users
              </span>
            </button>

            {/* Tab 3: Admin Management */}
            <button
              type="button"
              onClick={() => setActiveTab("admin-management")}
              className={`flex-1 min-w-0 h-[44px] sm:h-[56px] lg:h-[62px] px-1 sm:px-4 flex items-center justify-center transition-all cursor-pointer select-none ${
                activeTab === "admin-management"
                  ? "bg-white/20 rounded-[10px] sm:rounded-[12px] shadow-lg"
                  : "rounded-[6px] hover:bg-white/5"
              }`}
            >
              <span className="font-['Lato'] font-medium text-[12px] xs:text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] leading-[140%] tracking-[-0.01em] text-center text-white truncate">
                Admin Management
              </span>
            </button>
          </section>

          {/* =========================================================
              ADMIN INFO TAB CONTENT
          ========================================================= */}
          {activeTab === "admin-info" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* ---- MAIN FORM CARD ---- */}
              <section
                className="w-full rounded-[16px] p-6 sm:p-8 flex flex-col gap-6 border border-white/10 shadow-xl"
                style={{ background: cardBg }}
              >
                <div className="flex flex-col gap-6">
                  {/* ---- Profile Picture ---- */}
                  <div className="flex flex-col gap-4 sm:gap-5 items-center sm:items-start">
                    <h2 className="font-['Lato'] font-medium text-[20px] sm:text-[24px] leading-[140%] tracking-[-0.02em] text-white self-start">
                      Profile Picture:
                    </h2>
                    <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[234px] md:h-[234px]">
                      <div className="w-full h-full rounded-full border border-white overflow-hidden bg-gradient-to-tr from-[#3E8AFB] to-[#9369FD]">
                        {profileImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold text-4xl sm:text-6xl">
                            AH
                          </div>
                        )}
                      </div>
                      {/* Camera upload button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-1 sm:right-2 w-[40px] h-[35px] sm:w-[48.17px] sm:h-[41.45px] rounded-[4px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ background: "rgba(255, 255, 255, 0.4)" }}
                      >
                        <CameraIcon className="w-[24px] h-[20px] sm:w-[31px] sm:h-[25px]" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* ---- Name Row ---- */}
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-px bg-[#B5C8DB]/30" />
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8 w-full">
                      <span className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white shrink-0 lg:w-[150px]">
                        Name
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1 w-full">
                        {/* First Name */}
                        <div className="flex flex-col gap-1.5 w-full">
                          <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                            First Name
                          </label>
                          <div
                            className="h-[48px] rounded-[8px] px-4 flex items-center w-full"
                            style={{ background: "rgba(255, 255, 255, 0.2)" }}
                          >
                            <input
                              type="text"
                              value={adminInfo.firstName}
                              onChange={(e) => setAdminInfo({ ...adminInfo, firstName: e.target.value })}
                              className="w-full bg-transparent font-['Lato'] font-medium text-[16px] leading-[150%] text-white outline-none placeholder-white/40"
                            />
                          </div>
                        </div>
                        {/* Last Name */}
                        <div className="flex flex-col gap-1.5 w-full">
                          <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                            Last Name
                          </label>
                          <div
                            className="h-[48px] rounded-[8px] px-4 flex items-center w-full"
                            style={{ background: "rgba(255, 255, 255, 0.2)" }}
                          >
                            <input
                              type="text"
                              value={adminInfo.lastName}
                              onChange={(e) => setAdminInfo({ ...adminInfo, lastName: e.target.value })}
                              className="w-full bg-transparent font-['Lato'] font-medium text-[16px] leading-[150%] text-white outline-none placeholder-white/40"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ---- Contact Row ---- */}
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-px bg-[#B5C8DB]/30" />
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8 w-full">
                      <span className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white shrink-0 lg:w-[150px]">
                        Contact
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1 w-full">
                        {/* Phone */}
                        <div className="flex flex-col gap-1.5 w-full">
                          <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                            Phone
                          </label>
                          <div
                            className="h-[48px] rounded-[8px] px-4 flex items-center w-full"
                            style={{ background: "rgba(255, 255, 255, 0.2)" }}
                          >
                            <input
                              type="text"
                              value={adminInfo.phone}
                              onChange={(e) => setAdminInfo({ ...adminInfo, phone: e.target.value })}
                              className="w-full bg-transparent font-['Lato'] font-medium text-[16px] leading-[150%] text-white outline-none placeholder-white/40"
                            />
                          </div>
                        </div>
                        {/* Address */}
                        <div className="flex flex-col gap-1.5 w-full">
                          <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                            Address
                          </label>
                          <div
                            className="h-[48px] rounded-[8px] px-4 flex items-center w-full"
                            style={{ background: "rgba(255, 255, 255, 0.2)" }}
                          >
                            <input
                              type="text"
                              value={adminInfo.address}
                              onChange={(e) => setAdminInfo({ ...adminInfo, address: e.target.value })}
                              className="w-full bg-transparent font-['Lato'] font-medium text-[16px] leading-[150%] text-white outline-none placeholder-white/40"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ---- Work Information Row ---- */}
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-px bg-[#B5C8DB]/30" />
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8 w-full">
                      <span className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white shrink-0 lg:w-[150px]">
                        Work Information
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1 w-full">
                        {/* Company */}
                        <div className="flex flex-col gap-1.5 w-full">
                          <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                            Company
                          </label>
                          <div
                            className="h-[48px] rounded-[8px] px-4 flex items-center w-full"
                            style={{ background: "rgba(255, 255, 255, 0.2)" }}
                          >
                            <input
                              type="text"
                              value={adminInfo.company}
                              onChange={(e) => setAdminInfo({ ...adminInfo, company: e.target.value })}
                              className="w-full bg-transparent font-['Lato'] font-medium text-[16px] leading-[150%] text-white outline-none placeholder-white/40"
                            />
                          </div>
                        </div>
                        {/* Position */}
                        <div className="flex flex-col gap-1.5 w-full">
                          <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                            Position
                          </label>
                          <div
                            className="h-[48px] rounded-[8px] px-4 flex items-center w-full"
                            style={{ background: "rgba(255, 255, 255, 0.2)" }}
                          >
                            <input
                              type="text"
                              value={adminInfo.position}
                              onChange={(e) => setAdminInfo({ ...adminInfo, position: e.target.value })}
                              className="w-full bg-transparent font-['Lato'] font-medium text-[16px] leading-[150%] text-white outline-none placeholder-white/40"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setAdminInfo(DEFAULT_ADMIN_INFO)}
                    className="w-[80px] h-[44px] rounded-[8px] flex items-center justify-center font-['Lato'] font-semibold text-[16px] leading-[150%] text-white cursor-pointer select-none hover:bg-white/30 active:scale-[0.97] transition-all"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAdminInfo}
                    className="w-[146px] h-[44px] rounded-[8px] flex items-center justify-center font-['Lato'] font-semibold text-[16px] leading-[150%] text-white cursor-pointer select-none hover:opacity-90 active:scale-[0.97] transition-all"
                    style={{
                      background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </section>

              {/* ---- CHANGE PASSWORD CARD ---- */}
              <section
                className="w-full rounded-[14px] p-6 sm:p-8 flex flex-col justify-end gap-6 sm:gap-[30px] border border-white/10 shadow-xl"
                style={{ background: cardBg }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8 w-full">
                  <span className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white shrink-0 lg:w-[150px]">
                    Change Password
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1 w-full">
                    {/* Old Password */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                        Old Password
                      </label>
                      <div
                        className="h-[48px] rounded-[8px] px-4 flex items-center gap-2 w-full"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <input
                          type={showOldPassword ? "text" : "password"}
                          value={passwords.oldPassword}
                          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                          className="w-full bg-transparent font-['Lato'] font-medium text-[16px] leading-[150%] text-white outline-none placeholder-white/40"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="text-white/50 hover:text-white transition-colors cursor-pointer"
                        >
                          {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    {/* New Password */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="font-['Lato'] font-medium text-[16px] leading-[150%] text-white">
                        New Password
                      </label>
                      <div
                        className="h-[48px] rounded-[8px] px-4 flex items-center gap-2 w-full"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwords.newPassword}
                          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                          className="w-full bg-transparent font-['Lato'] font-medium text-[16px] leading-[150%] text-white outline-none placeholder-white/40"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="text-white/50 hover:text-white transition-colors cursor-pointer"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setPasswords({ oldPassword: "jonsnow007", newPassword: "••••••••••" })}
                    className="w-[80px] h-[44px] rounded-[8px] flex items-center justify-center font-['Lato'] font-semibold text-[16px] leading-[150%] text-white cursor-pointer select-none hover:bg-white/30 active:scale-[0.97] transition-all"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePassword}
                    className="w-[146px] h-[44px] rounded-[8px] flex items-center justify-center font-['Lato'] font-semibold text-[16px] leading-[150%] text-white cursor-pointer select-none hover:opacity-90 active:scale-[0.97] transition-all"
                    style={{
                      background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {/* =========================================================
              SUSPENDED USERS TAB
          ========================================================= */}
          {activeTab === "suspended-users" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 w-full"
            >
              {/* Top Controls Row (Frame 2147240220): Height 40px */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 w-full">
                {/* Title */}
                <h2 className="font-['Lato'] font-medium text-[20px] sm:text-[24px] leading-[140%] tracking-[-0.02em] text-white">
                  Suspended Users
                </h2>

                {/* Right controls: Search + Member tabs (Frame 2147240221) */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full lg:w-auto">
                  {/* Search Bar (Frame 2147227758: 246px x 40px) */}
                  <div
                    className="w-full md:w-[260px] h-[40px] rounded-[6px] px-2.5 py-2 flex items-center gap-2 border border-white/10 shrink-0"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <Search className="w-5 h-5 text-[#B5C8DB] shrink-0" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={suspendedSearch}
                      onChange={(e) => {
                        setSuspendedSearch(e.target.value);
                        setSuspendedPage(1);
                      }}
                      className="w-full bg-transparent font-['Lato'] font-normal text-[14px] leading-[150%] text-white outline-none placeholder-[#D0D0D0]"
                    />
                    {suspendedSearch && (
                      <button
                        type="button"
                        onClick={() => setSuspendedSearch("")}
                        className="text-white/60 hover:text-white text-xs cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Member Type Pill Switcher (Frame 2147240033: 407px x 40px) */}
                  <div
                    className="h-[40px] w-full md:w-auto overflow-x-auto rounded-[6px] p-1 flex items-center justify-between md:justify-start gap-1 border border-white/10 shrink-0 scrollbar-none"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSuspendedMemberFilter("Free");
                        setSuspendedPage(1);
                      }}
                      className={`flex-1 md:flex-none h-[32px] px-3 py-1.5 rounded-[4px] font-['Lato'] text-[13px] sm:text-[14px] md:text-[16px] leading-[150%] tracking-[-0.02em] text-white transition-all cursor-pointer whitespace-nowrap text-center ${
                        suspendedMemberFilter === "Free"
                          ? "font-normal shadow-sm"
                          : "font-normal hover:bg-white/10"
                      }`}
                      style={
                        suspendedMemberFilter === "Free"
                          ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }
                          : {}
                      }
                    >
                      <span className="inline md:hidden">Free</span>
                      <span className="hidden md:inline">Free Members</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSuspendedMemberFilter("Pro");
                        setSuspendedPage(1);
                      }}
                      className={`flex-1 md:flex-none h-[32px] px-3 py-1.5 rounded-[4px] font-['Lato'] text-[13px] sm:text-[14px] md:text-[16px] leading-[150%] tracking-[-0.02em] text-white transition-all cursor-pointer whitespace-nowrap text-center ${
                        suspendedMemberFilter === "Pro"
                          ? "font-normal shadow-sm"
                          : "font-normal hover:bg-white/10"
                      }`}
                      style={
                        suspendedMemberFilter === "Pro"
                          ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }
                          : {}
                      }
                    >
                      <span className="inline md:hidden">Pro</span>
                      <span className="hidden md:inline">Pro Members</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSuspendedMemberFilter("Enterprise");
                        setSuspendedPage(1);
                      }}
                      className={`flex-1 md:flex-none h-[32px] px-3 py-1.5 rounded-[4px] font-['Lato'] text-[13px] sm:text-[14px] md:text-[16px] leading-[150%] tracking-[-0.02em] text-white transition-all cursor-pointer whitespace-nowrap text-center ${
                        suspendedMemberFilter === "Enterprise"
                          ? "font-normal shadow-sm"
                          : "font-normal hover:bg-white/10"
                      }`}
                      style={
                        suspendedMemberFilter === "Enterprise"
                          ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }
                          : {}
                      }
                    >
                      <span className="inline md:hidden">Enterprise</span>
                      <span className="hidden md:inline">Enterprise Members</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Table Container (Frame 2147239933) */}
              <div
                className="w-full rounded-[16px] overflow-hidden border border-white/10 shadow-2xl flex flex-col"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <div className="overflow-x-auto w-full">
                  <div className="min-w-[980px] w-full flex flex-col">
                    {/* Header Row (Frame 2147239437: 52px high) */}
                    <div
                      className={`w-full h-[52px] grid ${suspendedGridCols} items-center px-4 rounded-t-[16px] select-none`}
                      style={{ background: "rgba(43, 127, 255, 0.3)" }}
                    >
                      <div className="text-center font-['Lato'] font-semibold text-[14px] lg:text-[16px] leading-[150%] uppercase text-white">
                        DATE & TIME
                      </div>
                      <div className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] leading-[150%] uppercase text-white">
                        USER TYPE
                      </div>
                      <div className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] leading-[150%] uppercase text-white">
                        USER NAME
                      </div>
                      <div className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] leading-[150%] uppercase text-white">
                        SUSPENSION REASON
                      </div>
                      <div className="font-['Lato'] font-semibold text-[14px] lg:text-[16px] leading-[150%] uppercase text-white">
                        EMAIL
                      </div>
                      <div className="text-center font-['Lato'] font-semibold text-[14px] lg:text-[16px] leading-[150%] uppercase text-white">
                        PROFILE
                      </div>
                      <div className="text-center font-['Lato'] font-semibold text-[14px] lg:text-[16px] leading-[150%] uppercase text-white">
                        ACTION
                      </div>
                    </div>

                    {/* Data Rows */}
                    {filteredSuspendedUsers.length === 0 ? (
                      <div className="h-[240px] flex flex-col items-center justify-center gap-2 text-white/60 font-['Lato'] text-[16px]">
                        <p>No suspended {suspendedMemberFilter} members found.</p>
                      </div>
                    ) : (
                      filteredSuspendedUsers.map((user, idx) => {
                        const isEven = idx % 2 === 1;
                        return (
                          <div
                            key={user.id}
                            className={`w-full h-[68px] grid ${suspendedGridCols} items-center px-4 transition-colors border-b border-white/5 last:border-b-0 hover:bg-white/[0.04]`}
                            style={{
                              background: isEven
                                ? "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)"
                                : "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                            }}
                          >
                            {/* Date & Time */}
                            <div className="text-center font-['Lato'] font-normal text-[15px] leading-[150%] tracking-[-0.02em] text-white">
                              {user.dateTime}
                            </div>

                            {/* User Type */}
                            <div className="font-['Lato'] font-normal text-[15px] leading-[150%] tracking-[-0.02em] text-white">
                              {user.userType}
                            </div>

                            {/* User Name */}
                            <div className="font-['Lato'] font-normal text-[15px] leading-[150%] tracking-[-0.02em] text-white truncate pr-2">
                              {user.name}
                            </div>

                            {/* Reason */}
                            <div
                              className="font-['Lato'] font-normal text-[15px] leading-[150%] tracking-[-0.02em] text-white truncate pr-3"
                              title={user.reason}
                            >
                              {user.reason}
                            </div>

                            {/* Email */}
                            <div
                              className="font-['Lato'] font-normal text-[15px] leading-[150%] tracking-[-0.02em] text-white truncate pr-3"
                              title={user.email}
                            >
                              {user.email}
                            </div>

                            {/* Profile Eye Icon (Frame 2147239470: 32px x 32px) */}
                            <div className="flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setPreviewUser(user)}
                                className="w-8 h-8 rounded-[2px] flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                                title="View suspended user profile"
                              >
                                <TableEyeIcon className="w-6 h-6 text-[#B5C8DB]" />
                              </button>
                            </div>

                            {/* Action Button: End Suspension (Component 5/secondary button) */}
                            <div className="flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setUserToUnsuspend(user)}
                                className="w-[121px] h-[30px] rounded-[4px] flex items-center justify-center font-['Lato'] font-medium text-[14px] leading-[150%] text-white hover:bg-[#5ED6B3]/25 active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap"
                                style={{
                                  background: "rgba(255, 255, 255, 0.2)",
                                  border: "1px solid #5ED6B3",
                                }}
                              >
                                End Suspension
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Pagination Footer */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3">
                {/* Section Result */}
                <div className="flex items-center justify-center md:justify-start gap-2.5 font-['Lato'] font-medium text-[14px] leading-[150%] text-white">
                  <span>Showing</span>
                  <div
                    className="w-[53px] h-[40px] rounded-[6px] px-2 flex items-center justify-center gap-1 cursor-pointer hover:bg-white/30 transition-colors"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <span className="font-['Lato'] font-normal text-[14px] text-white">10</span>
                    <CaretDownIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                  </div>
                  <span>of {filteredSuspendedUsers.length} Results</span>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    disabled={suspendedPage <= 1}
                    onClick={() => setSuspendedPage((p) => Math.max(1, p - 1))}
                    className="w-[92px] h-[40px] rounded-[6px] px-2 flex items-center justify-center gap-1 font-['Lato'] font-medium text-[14px] leading-[150%] text-white hover:bg-white/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <CaretLeftIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSuspendedPage(1)}
                    className="w-[30px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] text-white shadow-sm cursor-pointer"
                    style={{ background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }}
                  >
                    1
                  </button>

                  <button
                    type="button"
                    onClick={() => setSuspendedPage(2)}
                    className="w-[30px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] text-white hover:bg-white/30 transition-all cursor-pointer"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    2
                  </button>

                  <button
                    type="button"
                    onClick={() => setSuspendedPage(3)}
                    className="w-[30px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] text-white hover:bg-white/30 transition-all cursor-pointer"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    3
                  </button>

                  <span className="w-[30px] h-[39px] flex items-center justify-center font-['Lato'] font-normal text-[14px] text-white">
                    ...
                  </span>

                  <button
                    type="button"
                    onClick={() => setSuspendedPage(10)}
                    className="w-[30px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] text-white hover:bg-white/30 transition-all cursor-pointer"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    10
                  </button>

                  <button
                    type="button"
                    disabled={suspendedPage >= 10}
                    onClick={() => setSuspendedPage((p) => p + 1)}
                    className="w-[68px] h-[40px] rounded-[6px] px-2 flex items-center justify-center gap-1 font-['Lato'] font-medium text-[14px] leading-[150%] text-white hover:bg-white/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <span>Next</span>
                    <CaretRightIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================
              ADMIN MANAGEMENT TAB (Figma Frame 2147240223)
          ========================================================= */}
          {activeTab === "admin-management" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-4"
            >
              {/* Top Row (Frame 2147240220): Admin List + Add Admin */}
              <div className="w-full flex flex-row justify-between items-center gap-3 min-h-[44px]">
                <h2 className="font-['Lato'] font-medium text-[20px] sm:text-[24px] leading-[140%] tracking-[-0.02em] text-white">
                  Admin List
                </h2>

                {/* Add Admin Button (Frame 2147224437) */}
                <button
                  type="button"
                  onClick={() => setIsAddAdminModalOpen(true)}
                  className="h-[40px] sm:h-[44px] px-3.5 sm:px-6 rounded-[8px] flex items-center justify-center gap-1.5 sm:gap-2 font-['Lato'] font-semibold text-[14px] sm:text-[16px] text-white shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
                  style={{
                    background:
                      "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1.5V12.5M1.5 7H12.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Add Admin</span>
                </button>
              </div>

              {/* Table Container (Frame 2147239933) */}
              <div
                className="w-full rounded-[16px] border border-white/10 shadow-2xl overflow-hidden"
                style={{ background: adminTableCardBg }}
              >
                <div className="w-full overflow-x-auto scrollbar-none">
                  <div className="min-w-[850px] w-full flex flex-col">
                    {/* Table Header (Frame 2147239437) */}
                    <div
                      className={`grid ${adminGridCols} items-center px-4 sm:px-6 h-[52px] rounded-t-[16px]`}
                      style={{ background: "rgba(43, 127, 255, 0.3)" }}
                    >
                      <div className="font-['Lato'] font-semibold text-[16px] leading-[150%] uppercase text-white tracking-[-0.02em]">
                        Name
                      </div>
                      <div className="font-['Lato'] font-semibold text-[16px] leading-[150%] uppercase text-white tracking-[-0.02em]">
                        Role
                      </div>
                      <div className="font-['Lato'] font-semibold text-[16px] leading-[150%] uppercase text-white tracking-[-0.02em]">
                        Email
                      </div>
                      <div className="font-['Lato'] font-semibold text-[16px] leading-[150%] uppercase text-white tracking-[-0.02em]">
                        Status
                      </div>
                      <div className="font-['Lato'] font-semibold text-[16px] leading-[150%] uppercase text-white tracking-[-0.02em]">
                        Action
                      </div>
                    </div>

                    {/* Table Rows (Frame 2147239439, 2147239452, etc.) */}
                    {adminUsers.length === 0 ? (
                      <div className="w-full h-48 flex items-center justify-center text-white/50 font-['Lato'] text-[16px]">
                        No administrators found
                      </div>
                    ) : (
                      adminUsers.map((admin, idx) => {
                        const isEven = idx % 2 === 1;
                        return (
                          <div
                            key={admin.id}
                            className={`grid ${adminGridCols} items-center px-4 sm:px-6 h-[68px] transition-colors hover:brightness-105`}
                            style={{
                              background: isEven ? adminRowEvenBg : adminRowOddBg,
                            }}
                          >
                            {/* Name */}
                            <div className="font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] text-white truncate pr-2">
                              {admin.name}
                            </div>

                            {/* Role */}
                            <div className="font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] text-white truncate pr-2">
                              {admin.role}
                            </div>

                            {/* Email */}
                            <div className="font-['Lato'] font-normal text-[16px] leading-[150%] tracking-[-0.02em] text-white truncate pr-2">
                              {admin.email}
                            </div>

                            {/* Status Pill Badge (Frame 2147226681) */}
                            <div>
                              <div className="w-[80px] h-[28px] rounded-full flex items-center justify-center bg-[#10B981]/20">
                                <span className="font-['Lato'] font-medium text-[14px] leading-[150%] text-[#10B981]">
                                  {admin.status}
                                </span>
                              </div>
                            </div>

                            {/* Action Button: Remove (Component 5/secondary button) */}
                            <div>
                              <button
                                type="button"
                                onClick={() => setAdminToRemove(admin)}
                                className="w-[74px] h-[30px] rounded-[4px] border border-[#FF5B5B] bg-white/20 hover:bg-[#FF5B5B]/20 text-white font-['Lato'] font-medium text-[14px] leading-[150%] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Pagination Footer */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3">
                {/* Section Result */}
                <div className="flex items-center justify-center md:justify-start gap-2.5 font-['Lato'] font-medium text-[14px] leading-[150%] text-white">
                  <span>Showing</span>
                  <div className="w-[53px] h-[40px] px-2 rounded-[6px] bg-white/20 flex items-center justify-center gap-1 cursor-pointer hover:bg-white/30 transition-colors">
                    <span className="font-['Lato'] font-normal text-[14px] text-white">10</span>
                    <CaretDownIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                  </div>
                  <span>results</span>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 sm:gap-2">
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
                    disabled={adminPage === 1}
                    className="h-[40px] px-3 rounded-[6px] bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:hover:bg-white/20 text-white flex items-center gap-1.5 font-['Lato'] font-medium text-[14px] leading-[150%] transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <CaretLeftIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                    <span>Previous</span>
                  </button>

                  {/* Page 1 (Active) */}
                  <button
                    type="button"
                    onClick={() => setAdminPage(1)}
                    className={`w-[30px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] leading-[150%] text-white transition-all cursor-pointer ${
                      adminPage === 1
                        ? "shadow-md"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                    style={
                      adminPage === 1
                        ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }
                        : undefined
                    }
                  >
                    1
                  </button>

                  {/* Page 2 */}
                  <button
                    type="button"
                    onClick={() => setAdminPage(2)}
                    className={`w-[30px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] leading-[150%] text-white transition-all cursor-pointer ${
                      adminPage === 2
                        ? "shadow-md"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                    style={
                      adminPage === 2
                        ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }
                        : undefined
                    }
                  >
                    2
                  </button>

                  {/* Page 3 */}
                  <button
                    type="button"
                    onClick={() => setAdminPage(3)}
                    className={`w-[30px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] leading-[150%] text-white transition-all cursor-pointer ${
                      adminPage === 3
                        ? "shadow-md"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                    style={
                      adminPage === 3
                        ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }
                        : undefined
                    }
                  >
                    3
                  </button>

                  {/* Ellipsis */}
                  <div className="w-[30px] h-[39px] rounded-[12px] flex items-center justify-center font-['Lato'] font-normal text-[14px] text-white">
                    ...
                  </div>

                  {/* Page 10 */}
                  <button
                    type="button"
                    onClick={() => setAdminPage(10)}
                    className={`w-[30px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-medium text-[14px] leading-[150%] text-white transition-all cursor-pointer ${
                      adminPage === 10
                        ? "shadow-md"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                    style={
                      adminPage === 10
                        ? { background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)" }
                        : undefined
                    }
                  >
                    10
                  </button>

                  {/* Next */}
                  <button
                    type="button"
                    onClick={() => setAdminPage((p) => Math.min(10, p + 1))}
                    disabled={adminPage === 10}
                    className="h-[40px] px-3 rounded-[6px] bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:hover:bg-white/20 text-white flex items-center gap-1.5 font-['Lato'] font-medium text-[14px] leading-[150%] transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <CaretRightIcon className="w-3.5 h-3.5 text-[#B5C8DB]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* ================= LOGOUT MODAL ================= */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <LogoutModal
            isOpen={isLogoutModalOpen}
            onCancel={() => setIsLogoutModalOpen(false)}
            onConfirm={handleLogout}
          />
        )}

        {/* End Suspension Confirmation Modal */}
        {userToUnsuspend && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[440px] rounded-[16px] p-6 border border-white/20 shadow-2xl flex flex-col gap-5 text-white"
              style={{
                background: "linear-gradient(135deg, #1E1B4B 0%, #2B2A7D 100%)",
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-['Lato'] font-semibold text-[20px] text-white">
                  End Suspension
                </h3>
                <button
                  type="button"
                  onClick={() => setUserToUnsuspend(null)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="font-['Lato'] font-normal text-[15px] text-[#D0D0D0] leading-[150%]">
                Are you sure you want to end suspension for <span className="font-semibold text-white">{userToUnsuspend.name}</span> ({userToUnsuspend.email})? This user will regain full access to their account.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUserToUnsuspend(null)}
                  className="px-4 py-2 rounded-[6px] text-sm font-medium bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmEndSuspension}
                  className="px-4 py-2 rounded-[6px] text-sm font-medium text-white transition-all shadow-md active:scale-95 cursor-pointer"
                  style={{
                    background: "linear-gradient(90deg, #2B7FFF 0%, #4F39F6 100%)",
                  }}
                >
                  Confirm & End Suspension
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* User Profile Preview Modal */}
        {previewUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[480px] rounded-[16px] p-6 border border-white/20 shadow-2xl flex flex-col gap-5 text-white"
              style={{
                background: "linear-gradient(135deg, #1E1B4B 0%, #2B2A7D 100%)",
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-['Lato'] font-semibold text-[20px] text-white">
                  Suspended User Profile
                </h3>
                <button
                  type="button"
                  onClick={() => setPreviewUser(null)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3 font-['Lato'] text-[15px]">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A0AEC0]">Name:</span>
                  <span className="font-semibold text-white">{previewUser.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A0AEC0]">Email:</span>
                  <span className="text-white">{previewUser.email}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A0AEC0]">Membership Tier:</span>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-white/20 text-white">
                    {previewUser.userType} Member
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A0AEC0]">Suspended Date:</span>
                  <span className="text-white">{previewUser.dateTime}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#A0AEC0]">Reason:</span>
                  <span className="text-[#FF8080] font-medium">{previewUser.reason}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPreviewUser(null)}
                  className="px-4 py-2 rounded-[6px] text-sm font-medium bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const u = previewUser;
                    setPreviewUser(null);
                    setUserToUnsuspend(u);
                  }}
                  className="px-4 py-2 rounded-[4px] text-sm font-medium border border-[#5ED6B3] bg-white/20 hover:bg-[#5ED6B3]/20 text-white transition-all cursor-pointer"
                >
                  End Suspension
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Remove Admin Confirmation Modal */}
        {adminToRemove && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[440px] rounded-[16px] p-6 border border-white/20 shadow-2xl flex flex-col gap-5 text-white"
              style={{
                background: "linear-gradient(135deg, #1E1B4B 0%, #2B2A7D 100%)",
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-['Lato'] font-semibold text-[20px] text-white">
                  Remove Admin
                </h3>
                <button
                  type="button"
                  onClick={() => setAdminToRemove(null)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="font-['Lato'] font-normal text-[15px] text-[#D0D0D0] leading-[150%]">
                Are you sure you want to remove <span className="font-semibold text-white">{adminToRemove.name}</span> ({adminToRemove.role}) from the administrator list? They will no longer have access to the admin dashboard.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAdminToRemove(null)}
                  className="px-4 py-2 rounded-[6px] text-sm font-medium bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRemoveAdmin}
                  className="px-4 py-2 rounded-[6px] text-sm font-medium bg-[#FF5B5B] hover:bg-[#FF5B5B]/80 text-white transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Confirm & Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Admin Modal */}
        {isAddAdminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[480px] rounded-[16px] p-6 border border-white/20 shadow-2xl flex flex-col gap-5 text-white"
              style={{
                background: "linear-gradient(135deg, #1E1B4B 0%, #2B2A7D 100%)",
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-['Lato'] font-semibold text-[20px] text-white">
                  Add New Admin
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddAdminModalOpen(false)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddAdminSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Lato'] text-[14px] text-[#A0AEC0]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newAdminForm.name}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                    placeholder="e.g. John Stark"
                    className="w-full h-11 px-3.5 rounded-[8px] bg-white/10 border border-white/20 text-white font-['Lato'] text-sm focus:outline-none focus:border-[#4F39F6] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-['Lato'] text-[14px] text-[#A0AEC0]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newAdminForm.email}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                    placeholder="e.g. john.stark@curio.ai"
                    className="w-full h-11 px-3.5 rounded-[8px] bg-white/10 border border-white/20 text-white font-['Lato'] text-sm focus:outline-none focus:border-[#4F39F6] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-['Lato'] text-[14px] text-[#A0AEC0]">Role</label>
                  <select
                    value={newAdminForm.role}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-[8px] bg-[#2B2A7D] border border-white/20 text-white font-['Lato'] text-sm focus:outline-none focus:border-[#4F39F6] transition-colors cursor-pointer"
                  >
                    <option value="Admin" className="bg-[#1E1B4B] text-white">Admin</option>
                    <option value="Super Admin" className="bg-[#1E1B4B] text-white">Super Admin</option>
                    <option value="Manager" className="bg-[#1E1B4B] text-white">Manager</option>
                    <option value="Editor" className="bg-[#1E1B4B] text-white">Editor</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddAdminModalOpen(false)}
                    className="px-4 py-2 rounded-[6px] text-sm font-medium bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-[6px] text-sm font-medium text-white transition-all shadow-md active:scale-95 cursor-pointer"
                    style={{
                      background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                    }}
                  >
                    Add Admin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
