"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
   SVG ICONS
================================================================ */

function StarFilledIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 1.66669L12.575 6.88335L18.3333 7.72502L14.1667 11.7834L15.15 17.5167L10 14.8084L4.85 17.5167L5.83333 11.7834L1.66667 7.72502L7.425 6.88335L10 1.66669Z"
        fill="#FAAD14"
        stroke="#FAAD14"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarEmptyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 1.66669L12.575 6.88335L18.3333 7.72502L14.1667 11.7834L15.15 17.5167L10 14.8084L4.85 17.5167L5.83333 11.7834L1.66667 7.72502L7.425 6.88335L10 1.66669Z"
        fill="none"
        stroke="#555"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckBadgeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
        stroke="#34D399"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ================================================================
   DATA TYPES & MOCK DATA
================================================================ */

interface Review {
  id: number;
  name: string;
  subtitle: string;
  avatar: string; // initials
  rating: number;
  summaryTag: string;
  review: string;
  betterVersionTag: string;
  isFeatured: boolean;
}

const MOCK_FEATURED: Review[] = [
  {
    id: 1,
    name: "David Martinz",
    subtitle: "Curio Changed the Way I Consume Content!",
    avatar: "DM",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "I used to spend hours watching long YouTube videos. With Curio, I can get the key takeaways in minutes. The AI-generated audio briefings are clear, accurate, and incredibly helpful for staying informed on the go.",
    betterVersionTag: "Generate a better version",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Sarah Kim",
    subtitle: "My Go-To Tool for Learning!",
    avatar: "SK",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "As a student, Curio has been a lifesaver. Instead of rewatching lectures, I convert them into smart audio summaries and listen while commuting. It's like having a personal tutor that condenses everything for me!",
    betterVersionTag: "Generate a better version",
    isFeatured: true,
  },
  {
    id: 3,
    name: "Mark Johnson",
    subtitle: "Perfect for Busy Professionals!",
    avatar: "MJ",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "I manage a team and rarely have time for long-form video content. Curio lets me keep up with industry trends through concise, AI-powered summaries. It's a productivity game changer!",
    betterVersionTag: "Generate a better version",
    isFeatured: true,
  },
  {
    id: 4,
    name: "Emily Chen",
    subtitle: "Brilliant Audio Experience!",
    avatar: "EC",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "The audio quality and summarization accuracy of Curio are top-notch. I've tried other tools, but nothing compares to how seamlessly Curio converts video content into digestible audio briefings.",
    betterVersionTag: "Generate a better version",
    isFeatured: true,
  },
];

const MOCK_COMMENTS: Review[] = [
  {
    id: 101,
    name: "James Wilson",
    subtitle: "Exactly What I Needed!",
    avatar: "JW",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "Curio has completely transformed how I stay updated. The AI-generated audio briefings are spot-on, and I can listen during my morning run. Highly recommend it to anyone who values their time!",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 102,
    name: "Lisa Park",
    subtitle: "Amazing Time Saver!",
    avatar: "LP",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "I'm a content creator and Curio helps me research faster than ever. Instead of watching hour-long videos, I get key insights in minutes. The quality of the summaries is impressive!",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 103,
    name: "Robert Garcia",
    subtitle: "Great for Commuters!",
    avatar: "RG",
    rating: 4,
    summaryTag: "Great summary",
    review:
      "I spend 2 hours commuting daily. Curio has made that time so much more productive. I can listen to summarized content from YouTube channels I follow. The only improvement I'd suggest is adding playback speed controls.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 104,
    name: "Anna Thompson",
    subtitle: "Impressive AI Technology!",
    avatar: "AT",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "The AI behind Curio is remarkable. It captures the essential points from videos with impressive accuracy. I've been recommending it to all my colleagues. Worth every penny of the subscription!",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 105,
    name: "Chris Lee",
    subtitle: "Solid Product, Minor Bugs",
    avatar: "CL",
    rating: 3,
    summaryTag: "Great summary",
    review:
      "Overall a great product. I've experienced a few minor bugs with longer videos, but the team seems responsive and is constantly improving. The core functionality is excellent and I use it daily.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 106,
    name: "Nina Patel",
    subtitle: "Love the Audio Quality!",
    avatar: "NP",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "The text-to-speech quality in Curio is surprisingly natural. It doesn't sound robotic at all. Combined with accurate summaries, it's become my favorite tool for consuming content efficiently.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 107,
    name: "Tom Richards",
    subtitle: "Better Than Expected!",
    avatar: "TR",
    rating: 4,
    summaryTag: "Great summary",
    review:
      "I was skeptical at first, but Curio exceeded my expectations. The summaries are comprehensive yet concise. I especially love the enterprise features for our team collaboration needs.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 108,
    name: "Maria Santos",
    subtitle: "Essential for Research!",
    avatar: "MS",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "As a researcher, I need to process vast amounts of video content. Curio has cut my research time in half. The accuracy of the AI-generated summaries is remarkable and consistently reliable.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 109,
    name: "Kevin Wright",
    subtitle: "Good but Room to Grow",
    avatar: "KW",
    rating: 3,
    summaryTag: "Great summary",
    review:
      "Nice concept and execution. Would love to see more language support and integration with other platforms beyond YouTube. The core experience is smooth and the summaries are useful.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 110,
    name: "Sofia Rossi",
    subtitle: "Absolutely Fantastic!",
    avatar: "SR",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "Curio is hands down the best content summarization tool I've used. The interface is clean, the summaries are accurate, and the audio quality is excellent. A must-have for anyone serious about productivity.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 111,
    name: "Alex Turner",
    subtitle: "Game Changer for Students!",
    avatar: "AT",
    rating: 5,
    summaryTag: "Great summary",
    review:
      "Every student needs Curio. I convert my lecture recordings into concise summaries and review them before exams. It has genuinely improved my grades and study efficiency.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
  {
    id: 112,
    name: "Rachel Adams",
    subtitle: "Perfect Companion App!",
    avatar: "RA",
    rating: 4,
    summaryTag: "Great summary",
    review:
      "I use Curio alongside my regular YouTube watching. It's great for quickly recapping content I've already watched or previewing videos to decide if they're worth my full attention.",
    betterVersionTag: "Generate a better version",
    isFeatured: false,
  },
];

type SortFilter = "stars-high" | "stars-low" | "enterprise";

/* ================================================================
   STAR RATING COMPONENT
================================================================ */

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <StarFilledIcon key={i} className={cls} />
        ) : (
          <StarEmptyIcon key={i} className={cls} />
        )
      )}
    </div>
  );
}

/* ================================================================
   REVIEW CARD COMPONENT (Featured & Visitor)
================================================================ */

function ReviewCard({
  review,
  variant,
  onAction,
}: {
  review: Review;
  variant: "featured" | "visitor";
  onAction: (id: number) => void;
}) {
  const avatarColors = [
    "from-[#3E8AFB] to-[#9369FD]",
    "from-[#7A3BED] to-[#A842D4]",
    "from-[#2563EB] to-[#36C1FB]",
    "from-[#9369FD] to-[#3E8AFB]",
  ];
  const colorIdx = review.id % avatarColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full rounded-2xl p-5 flex flex-col gap-4 border border-white/10 shadow-xl"
      style={{
        background:
          "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
      }}
    >
      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Summary Tag */}
      <div className="flex items-center gap-2">
        <CheckBadgeIcon className="w-4 h-4 shrink-0" />
        <span className="font-['Lato'] font-medium text-[13px] text-emerald-300">{review.summaryTag}</span>
      </div>

      {/* Review Text */}
      <p className="font-['Lato'] font-normal text-[14px] leading-[170%] tracking-[-0.02em] text-[#D0D0D0]">
        {review.review}
      </p>

      {/* Better Version Tag */}
      <div className="flex items-center gap-2">
        <CheckBadgeIcon className="w-4 h-4 shrink-0" />
        <span className="font-['Lato'] font-medium text-[13px] text-emerald-300">{review.betterVersionTag}</span>
      </div>

      {/* Footer: User Info + Action */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10 gap-3">
        {/* User */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-tr ${avatarColors[colorIdx]} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md border border-white/20`}
          >
            {review.avatar}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-['Lato'] font-semibold text-[15px] sm:text-[16px] leading-[150%] text-white truncate">
              {review.name}
            </span>
            <span className="font-['Lato'] font-normal text-[13px] sm:text-[14px] leading-[150%] text-[#D0D0D0] truncate">
              {review.subtitle}
            </span>
          </div>
        </div>

        {/* Action Button */}
        {variant === "featured" ? (
          <button
            type="button"
            onClick={() => onAction(review.id)}
            className="w-[89px] h-[40px] rounded-[6px] flex items-center justify-center font-['Lato'] font-semibold text-[16px] leading-[150%] text-white transition-all cursor-pointer select-none hover:opacity-90 active:scale-[0.97] shrink-0"
            style={{
              background: "#FF5B5B",
              border: "1px solid #FF5B5B",
            }}
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onAction(review.id)}
            className="h-[44px] px-4 rounded-[6px] flex items-center justify-center font-['Lato'] font-semibold text-[16px] leading-[150%] text-white transition-all cursor-pointer select-none hover:bg-white/30 active:scale-[0.97] shrink-0"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            Add to landing page
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ================================================================
   PAGE COMPONENT
================================================================ */

const ITEMS_PER_PAGE = 6;

export default function UserReviewsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [featuredReviews, setFeaturedReviews] = useState<Review[]>(MOCK_FEATURED);
  const [visitorComments, setVisitorComments] = useState<Review[]>(MOCK_COMMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<SortFilter>("stars-high");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveFeatured = (id: number) => {
    setFeaturedReviews((prev) => prev.filter((r) => r.id !== id));
    showToast("Review removed from featured.");
  };

  const handleAddToLandingPage = (id: number) => {
    const review = visitorComments.find((r) => r.id === id);
    if (review) {
      setFeaturedReviews((prev) => [...prev, { ...review, isFeatured: true }]);
      setVisitorComments((prev) => prev.filter((r) => r.id !== id));
      showToast(`"${review.name}" review added to landing page!`);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("curio_admin_user");
      window.location.href = "/admin/login";
    }
  };

  /* Filtered & sorted comments */
  const filteredComments = useMemo(() => {
    let list = [...visitorComments];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.review.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q)
      );
    }

    // Sort
    if (activeFilter === "stars-high") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (activeFilter === "stars-low") {
      list.sort((a, b) => a.rating - b.rating);
    }
    // "enterprise" filter: no change for now (placeholder)

    return list;
  }, [visitorComments, searchQuery, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredComments.length / ITEMS_PER_PAGE));
  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const sidebarBg =
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

      <Link
        href="/admin/dashboard/admin-settings"
        {...(mobile ? { onClick: () => setIsMobileSidebarOpen(false) } : {})}
        className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
      >
        <SideNavAdminSettingsIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
        <span className="font-['Lato'] font-normal text-[16px] text-white">Admin Settings</span>
      </Link>

      <Link
        href="/admin/dashboard/platform-setting"
        {...(mobile ? { onClick: () => setIsMobileSidebarOpen(false) } : {})}
        className="w-full h-12 rounded-lg flex items-center gap-3 px-4 hover:bg-white/10 transition-all select-none"
      >
        <SideNavPlatformSettingIcon className="w-5 h-5 text-[#B5C8DB] shrink-0" />
        <span className="font-['Lato'] font-normal text-[16px] text-white">Platform Setting</span>
      </Link>

      {/* User Reviews - ACTIVE */}
      <div
        className="w-full h-12 rounded-lg flex items-center gap-3 px-3 select-none"
        style={{ background: "rgba(255,255,255,0.2)", borderLeft: "4px solid #2563EB" }}
      >
        <SideNavReviewsIcon className="w-5 h-5 text-white shrink-0" />
        <span className="font-['Lato'] font-medium text-[16px] text-white">User Reviews</span>
      </div>
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
              User Reviews
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/admin-avatar.jpg" alt="Admin" className="w-full h-full object-cover" />
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

        {/* ================= MAIN CONTENT BODY ================= */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* Page Heading */}
          <div className="w-full flex items-center justify-between">
            <h1 className="font-['Lato'] font-medium text-[24px] sm:text-[28px] leading-[140%] tracking-[-0.02em] text-white">
              User Reviews
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
              SECTION 1: FEATURED REVIEWS
          ========================================================= */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-['Lato'] font-medium text-[18px] sm:text-[20px] leading-[140%] tracking-[-0.02em] text-white">
                Featured Reviews
                <span className="text-[#A0AEC0] text-sm font-normal ml-2">({featuredReviews.length} Reviews)</span>
              </h2>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {featuredReviews.map((r) => (
                <ReviewCard key={r.id} review={r} variant="featured" onAction={handleRemoveFeatured} />
              ))}
            </div>

            {featuredReviews.length === 0 && (
              <div className="w-full py-12 flex items-center justify-center rounded-2xl border border-white/10" style={{ background: "rgba(43, 42, 125, 0.3)" }}>
                <span className="font-['Lato'] text-[#A0AEC0] text-base">No featured reviews. Add reviews from below.</span>
              </div>
            )}
          </section>

          {/* =========================================================
              SECTION 2: VISITOR'S COMMENTS
          ========================================================= */}
          <section className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-['Lato'] font-medium text-[18px] sm:text-[20px] leading-[140%] tracking-[-0.02em] text-white">
                Visitor&apos;s Comments
                <span className="text-[#A0AEC0] text-sm font-normal ml-2">
                  ({filteredComments.length} Comments)
                </span>
              </h2>
            </div>

            {/* Search & Filters Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div
                className="flex items-center gap-2 px-4 h-11 rounded-xl flex-1 border border-white/10"
                style={{
                  background:
                    "linear-gradient(0deg, #2B2A7D, #2B2A7D), linear-gradient(90deg, rgba(43, 127, 255, 0.2) 0%, rgba(79, 57, 246, 0.2) 100%)",
                }}
              >
                <Search className="w-4 h-4 text-[#B5C8DB] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search reviews..."
                  className="flex-1 bg-transparent outline-none font-['Lato'] text-sm text-white placeholder:text-[#6B7280]"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                {(
                  [
                    { key: "stars-high" as SortFilter, label: "Stars High to Low" },
                    { key: "stars-low" as SortFilter, label: "Stars Low to High" },
                    { key: "enterprise" as SortFilter, label: "Enterprise Members" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.key}
                    onClick={() => {
                      setActiveFilter(f.key);
                      setCurrentPage(1);
                    }}
                    className={`h-9 px-3 rounded-lg text-xs sm:text-sm font-['Lato'] font-medium transition-all cursor-pointer select-none whitespace-nowrap ${
                      activeFilter === f.key
                        ? "text-white shadow-md"
                        : "text-[#A0AEC0] hover:text-white hover:bg-white/5"
                    }`}
                    style={
                      activeFilter === f.key
                        ? {
                            background:
                              "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                          }
                        : {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }
                    }
                  >
                    {f.label}
                    {f.key !== "enterprise" && <ChevronDown className="w-3 h-3 inline-block ml-1" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Comments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedComments.map((r) => (
                  <ReviewCard key={r.id} review={r} variant="visitor" onAction={handleAddToLandingPage} />
                ))}
              </AnimatePresence>
            </div>

            {paginatedComments.length === 0 && (
              <div className="w-full py-12 flex items-center justify-center rounded-2xl border border-white/10" style={{ background: "rgba(43, 42, 125, 0.3)" }}>
                <span className="font-['Lato'] text-[#A0AEC0] text-base">No comments found.</span>
              </div>
            )}

            {/* =========================================================
                PAGINATION FOOTER
            ========================================================= */}
            {filteredComments.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-between mt-2">
                {/* Page Info */}
                <span className="font-['Lato'] text-sm text-[#A0AEC0]">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredComments.length)} of{" "}
                  {filteredComments.length}
                </span>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-['Lato'] font-medium transition-all cursor-pointer select-none ${
                        page === currentPage ? "text-white shadow-md" : "text-[#A0AEC0] hover:bg-white/10"
                      }`}
                      style={
                        page === currentPage
                          ? {
                              background:
                                "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                            }
                          : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }
                      }
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* ================= LOGOUT MODAL ================= */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
