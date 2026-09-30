"use client";

import React, { useState, useRef, useEffect } from "react";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import CreatorCard, { Creator } from "@/components/following/CreatorCard";
import ChannelPreviewCard from "@/components/following/ChannelPreviewCard";
import UnfollowModal from "@/components/following/UnfollowModal";
import Footer from "@/components/Footer";
import { Plus, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, X, ExternalLink, CheckCircle, Check, Eye } from "lucide-react";

type SortFilter = "recently" | "oldest" | "a-z" | "z-a";

const defaultDesktop45Creator: Creator = {
  id: "preview-tech-insights",
  name: "Tech Insights",
  handle: "@techinsights",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
  initials: "TI",
  avatarGradient: "bg-gradient-to-tr from-cyan-500 to-blue-600",
  description: "AI, technology trends, and future innovations Exploring how innovation is reshaping industries.....",
  videoCount: "24 Videos",
  subscriberCount: "2.4M subscribers",
  isFollowing: false,
};

const initialCreators: Creator[] = [
  {
    id: "1",
    name: "Tech Insights",
    handle: "@techinsights",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    initials: "TI",
    avatarGradient: "bg-gradient-to-tr from-cyan-500 to-blue-600",
    description: "AI, technology trends, and future innovations. Exploring how innovation is reshaping industries, software development, and the global digital economy.",
    videoCount: "24 Videos",
    subscriberCount: "2.4M subscribers",
    isFollowing: true,
    createdAt: 8000,
  },
  {
    id: "2",
    name: "Motiversity",
    handle: "@motiversity",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    initials: "MV",
    avatarGradient: "bg-gradient-to-tr from-amber-500 to-red-600",
    description: "Daily powerful motivational speeches, discipline mastery, and interviews with world-class performers to fuel your personal journey.",
    videoCount: "142 Videos",
    subscriberCount: "3.8M subscribers",
    isFollowing: true,
    createdAt: 7000,
  },
  {
    id: "3",
    name: "Huberman Lab",
    handle: "@hubermanlab",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "HL",
    avatarGradient: "bg-gradient-to-tr from-emerald-500 to-teal-700",
    description: "Neuroscience and science-backed protocols for everyday health, sleep optimization, peak cognitive focus, and physical fitness.",
    videoCount: "190 Videos",
    subscriberCount: "5.2M subscribers",
    isFollowing: true,
    createdAt: 6000,
  },
  {
    id: "4",
    name: "Lex Fridman",
    handle: "@lexfridman",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    initials: "LF",
    avatarGradient: "bg-gradient-to-tr from-slate-600 to-zinc-800",
    description: "Conversations on AI, science, technology, history, philosophy, intelligence, and consciousness with the world's leading thinkers.",
    videoCount: "430 Videos",
    subscriberCount: "4.1M subscribers",
    isFollowing: true,
    createdAt: 5000,
  },
  {
    id: "5",
    name: "Ali Abdaal",
    handle: "@aliabdaal",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    initials: "AA",
    avatarGradient: "bg-gradient-to-tr from-indigo-500 to-violet-600",
    description: "Evidence-based strategies, productivity frameworks, book breakdowns, and actionable tools to help you build a life you genuinely love.",
    videoCount: "610 Videos",
    subscriberCount: "5.5M subscribers",
    isFollowing: true,
    createdAt: 4000,
  },
  {
    id: "6",
    name: "TED Talks",
    handle: "@tedtalks",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    initials: "TED",
    avatarGradient: "bg-gradient-to-tr from-rose-500 to-red-700",
    description: "Ideas worth spreading: cutting-edge talks from global leaders on science, education, design, psychology, and humanity.",
    videoCount: "3,800 Videos",
    subscriberCount: "23.8M subscribers",
    isFollowing: true,
    createdAt: 3000,
  },
  {
    id: "7",
    name: "Veritasium",
    handle: "@veritasium",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    initials: "VE",
    avatarGradient: "bg-gradient-to-tr from-blue-500 to-cyan-600",
    description: "An element of truth: deep-dive science videos, physics demonstrations, thought experiments, and mind-bending phenomena.",
    videoCount: "390 Videos",
    subscriberCount: "15.6M subscribers",
    isFollowing: true,
    createdAt: 2000,
  },
  {
    id: "8",
    name: "Tom Bilyeu",
    handle: "@tombilyeu",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    initials: "TB",
    avatarGradient: "bg-gradient-to-tr from-purple-600 to-pink-600",
    description: "Impact Theory: high-impact interviews exploring entrepreneurial mindset, health breakthroughs, and mental resilience.",
    videoCount: "890 Videos",
    subscriberCount: "3.9M subscribers",
    isFollowing: true,
    createdAt: 1000,
  },
];

export default function FollowingPage() {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const [previewCreator, setPreviewCreator] = useState<Creator | null>(null);
  const [channelUrl, setChannelUrl] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState<SortFilter>("recently");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [activePage, setActivePage] = useState(1);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [unfollowTarget, setUnfollowTarget] = useState<Creator | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if directly linked with ?45=true, ?preview=true, or ?46=true
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("46") === "true") {
        window.location.href = "/following/techinsights";
      } else if (params.get("45") === "true" || params.get("preview") === "true") {
        setPreviewCreator(defaultDesktop45Creator);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const triggerPreviewFromUrl = (url: string) => {
    if (!url.trim()) return;

    let cleanName = "Tech Insights";
    let cleanHandle = "@techinsights";
    try {
      if (url.includes("@")) {
        const parts = url.split("@");
        cleanHandle = "@" + parts[1].split("/")[0].split("?")[0];
        const raw = cleanHandle.replace("@", "").replace(/[._-]/g, " ");
        cleanName = raw.charAt(0).toUpperCase() + raw.slice(1);
      } else if (url.includes("youtube.com/")) {
        const slug = url.split("youtube.com/")[1].split("/")[0].split("?")[0];
        cleanHandle = "@" + slug.toLowerCase();
        cleanName = slug.charAt(0).toUpperCase() + slug.slice(1);
      }
    } catch {
      // fallback
    }

    const newPreview: Creator = {
      id: "preview-" + Date.now(),
      name: cleanName || "Tech Insights",
      handle: cleanHandle || "@techinsights",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      initials: (cleanName || "TI").slice(0, 2).toUpperCase(),
      avatarGradient: "bg-gradient-to-tr from-cyan-500 to-blue-600",
      description: "AI, technology trends, and future innovations Exploring how innovation is reshaping industries.....",
      videoCount: "24 Videos",
      subscriberCount: "2.4M subscribers",
      isFollowing: false,
    };

    setPreviewCreator(newPreview);
    setChannelUrl("");
    showToast(`Channel "${cleanName}" detected! Loading Desktop - 45 Preview...`);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (pasted && pasted.trim()) {
      setChannelUrl(pasted);
      setTimeout(() => {
        triggerPreviewFromUrl(pasted);
      }, 150);
    }
  };

  const handleAddCreator = (e: React.FormEvent) => {
    e.preventDefault();
    if (channelUrl.trim()) {
      triggerPreviewFromUrl(channelUrl);
    } else {
      // Default sample paste if empty and button is clicked
      triggerPreviewFromUrl("https://youtube.com/@techinsights");
    }
  };

  const handleFollowPreview = () => {
    if (!previewCreator) return;
    const exists = creators.some((c) => c.name.toLowerCase() === previewCreator.name.toLowerCase());
    if (!exists) {
      const newCreator: Creator = {
        ...previewCreator,
        id: Date.now().toString(),
        isFollowing: true,
        createdAt: Date.now(),
      };
      setCreators([newCreator, ...creators]);
    }
    showToast(`Successfully followed ${previewCreator.name}! AI summaries are syncing...`);
    setPreviewCreator(null);
  };

  const handleCancelPreview = () => {
    setPreviewCreator(null);
    showToast("Channel preview dismissed.");
  };

  const handleConfirmUnfollow = () => {
    if (!unfollowTarget) return;
    const targetId = unfollowTarget.id;
    const targetName = unfollowTarget.name;
    setCreators((prev) =>
      prev.map((c) => (c.id === targetId ? { ...c, isFollowing: false } : c))
    );
    showToast(`Unfollowed ${targetName}.`);
    setUnfollowTarget(null);
  };

  const handleFollow = (id: string) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFollowing: true } : c))
    );
    const creator = creators.find((c) => c.id === id);
    showToast(`Following ${creator?.name || "channel"}!`);
  };

  const handleSelectFilter = (filter: SortFilter) => {
    setFilterActive(filter);
    setFilterDropdownOpen(false);

    const sorted = [...creators];
    if (filter === "recently") {
      sorted.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    } else if (filter === "oldest") {
      sorted.sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
    } else if (filter === "a-z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "z-a") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setCreators(sorted);

    const labels: Record<SortFilter, string> = {
      recently: "Recently Subscribed",
      oldest: "Oldest Subscribed",
      "a-z": "A-Z",
      "z-a": "Z-A",
    };
    showToast(`Filtered: ${labels[filter]}`);
  };

  const handleExplore = (creator: Creator) => {
    const slug = creator.handle ? creator.handle.replace("@", "") : creator.id;
    window.location.href = `/following/${slug}`;
  };

  // Desktop - 45 specs: 6 cards displayed in grid (748px height) when preview is open
  const displayedCreators = previewCreator ? creators.slice(0, 6) : creators.slice(0, itemsPerPage);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma Side Panel: 240px, responsive drawer on mobile) */}
      <FeedSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Right Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Nav (Figma Desktop - 44 / Desktop - 45: 80px, userSubtitle='abir07@gmai.com') */}
        <FeedNavbar
          showSearch={false}
          userSubtitle="abir07@gmai.com"
          onMobileMenuToggle={() => setMobileSidebarOpen((prev) => !prev)}
        />

        {/* Following Main Canvas (Figma Frame 2147239907: width 1152px, max-w-[1152px]) */}
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-6 py-6 flex flex-col gap-6">
          {/* 1. Add New Creator Banner (Desktop - 44: 1152px x 158px | Desktop - 45: 1152px x 304px) */}
          <section
            className={`w-full rounded-2xl p-4 flex flex-col gap-4 border border-white/15 [background:linear-gradient(0deg,#2B2A7D,#2B2A7D),linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] shadow-lg shadow-indigo-950/40 transition-all duration-300 ${
              previewCreator ? "min-h-[304px]" : "min-h-[158px]"
            }`}
          >
            {/* Header Text (Figma Frame 2147240250: 810px x 62px) */}
            <div className="flex flex-col gap-1 max-w-[810px]">
              <h2 className="text-2xl font-medium text-white leading-[140%] tracking-[-0.02em] font-['Lato',sans-serif]">
                Add New Creator
              </h2>
              <p className="text-base font-normal text-[#D0D0D0] leading-[150%] tracking-[-0.02em] font-['Lato',sans-serif]">
                Paste a YouTube channel or video link to follow your favorite creators and start receiving AI-powered summaries instantly.
              </p>
            </div>

            {/* Content: Either Desktop - 45 Preview Card (Frame 2147239905) OR Desktop - 44 Input Box */}
            {previewCreator ? (
              <ChannelPreviewCard
                creator={previewCreator}
                onFollow={handleFollowPreview}
                onCancel={handleCancelPreview}
              />
            ) : (
              /* Desktop - 44: Input & Add Button Row (Figma Frame 2147240252) */
              <form
                onSubmit={handleAddCreator}
                className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                {/* Input Box (Figma Frame 2147239919: 957px x 48px) */}
                <div className="flex-1 h-12 px-4 rounded-lg bg-white/20 border border-white/10 focus-within:border-white/40 focus-within:bg-white/25 transition-all flex items-center justify-between gap-2 shadow-inner">
                  <input
                    type="text"
                    value={channelUrl}
                    onChange={(e) => setChannelUrl(e.target.value)}
                    onPaste={handlePaste}
                    placeholder="Paste your youtube channel or video link here...."
                    className="w-full bg-transparent text-base font-medium text-white placeholder-[#D0D0D0] outline-none font-['Lato',sans-serif]"
                  />

                  {/* 1-Click Paste Demo Helper */}
                  <button
                    type="button"
                    onClick={() => triggerPreviewFromUrl("https://youtube.com/@techinsights")}
                    className="hidden md:inline-flex text-xs px-2.5 py-1 rounded bg-white/15 hover:bg-white/25 text-[#36C1FB] font-medium transition-all shrink-0 cursor-pointer border border-[#36C1FB]/20"
                    title="Click to simulate pasting a YouTube channel URL"
                  >
                    Paste sample
                  </button>
                </div>

                {/* Add Button (Figma Primary button: 147px x 48px) */}
                <button
                  type="submit"
                  className="h-12 px-5 rounded-lg bg-[linear-gradient(89.44deg,#2563EB_-47.4%,#7A3BED_76.5%,#A842D4_101.93%)] text-white text-base font-semibold font-['Lato',sans-serif] leading-[150%] flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-indigo-900/40 shrink-0 cursor-pointer select-none"
                >
                  <Plus className="w-5 h-5 text-white" strokeWidth={2.2} />
                  <span>Add Creator</span>
                </button>
              </form>
            )}
          </section>

          {/* 2. Following Section Header & Filter (Figma Frame 2147239911: 1152px x 66px) */}
          <section className="w-full flex flex-row justify-between items-center py-2">
            <div className="flex flex-col gap-1">
              <h1 className="text-[28px] font-semibold text-white leading-[135%] tracking-[-0.02em] font-['Lato',sans-serif]">
                Following
              </h1>
              <p className="text-base font-normal text-[#D0D0D0] leading-[150%] tracking-[-0.02em] font-['Lato',sans-serif]">
                Manage your followed YouTube creators and discover new channels.
              </p>
            </div>

            {/* Filter Button & Dropdown Menu (Figma Frame 2147239940) */}
            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className={`h-10 px-3.5 py-2 rounded-xl border flex items-center gap-2 text-white text-base font-medium font-['Lato',sans-serif] transition-all duration-200 cursor-pointer select-none backdrop-blur-md ${
                  filterDropdownOpen
                    ? "bg-white/25 border-[#36C1FB]/60 ring-2 ring-[#36C1FB]/30 shadow-[0_0_16px_rgba(54,193,251,0.25)] text-white"
                    : "bg-white/20 hover:bg-white/30 border-white/15 hover:border-white/30 shadow-sm"
                }`}
              >
                <SlidersHorizontal className={`w-4 h-4 transition-colors ${filterDropdownOpen ? "text-[#36C1FB]" : "text-[#B5C8DB]"}`} />
                <span>Filter</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#B5C8DB] transition-transform duration-200 ${filterDropdownOpen ? "rotate-180 text-[#36C1FB]" : ""}`} />
              </button>

              {/* Filter Dropdown Popover (Figma Frame 2147239940: Enhanced Glassmorphic Menu) */}
              {filterDropdownOpen && (
                <div
                  id="filter-dropdown-menu"
                  className="absolute right-0 top-[48px] w-[184px] p-1.5 z-40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(79,57,246,0.35)] backdrop-blur-2xl border border-white/25 [background:linear-gradient(145deg,rgba(26,23,68,0.96)_0%,rgba(43,42,125,0.96)_100%)] flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* Option 1: Recently Subscribed */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter("recently")}
                    className={`w-full h-10 px-3 rounded-xl flex items-center justify-between text-sm font-medium font-['Lato',sans-serif] leading-[150%] transition-all cursor-pointer select-none ${
                      filterActive === "recently"
                        ? "bg-gradient-to-r from-[#2563EB]/40 to-[#7A3BED]/40 text-[#36C1FB] font-semibold border border-[#36C1FB]/30 shadow-inner"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    <span>Recently Subscribed</span>
                    {filterActive === "recently" && (
                      <Check className="w-4 h-4 text-[#36C1FB] shrink-0" strokeWidth={2.5} />
                    )}
                  </button>

                  <div className="w-full h-0 border-t border-white/10 my-0.5" />

                  {/* Option 2: Oldest Subscribed */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter("oldest")}
                    className={`w-full h-10 px-3 rounded-xl flex items-center justify-between text-sm font-medium font-['Lato',sans-serif] leading-[150%] transition-all cursor-pointer select-none ${
                      filterActive === "oldest"
                        ? "bg-gradient-to-r from-[#2563EB]/40 to-[#7A3BED]/40 text-[#36C1FB] font-semibold border border-[#36C1FB]/30 shadow-inner"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    <span>Oldest Subscribed</span>
                    {filterActive === "oldest" && (
                      <Check className="w-4 h-4 text-[#36C1FB] shrink-0" strokeWidth={2.5} />
                    )}
                  </button>

                  <div className="w-full h-0 border-t border-white/10 my-0.5" />

                  {/* Option 3: A-Z */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter("a-z")}
                    className={`w-full h-10 px-3 rounded-xl flex items-center justify-between text-sm font-medium font-['Lato',sans-serif] leading-[150%] transition-all cursor-pointer select-none ${
                      filterActive === "a-z"
                        ? "bg-gradient-to-r from-[#2563EB]/40 to-[#7A3BED]/40 text-[#36C1FB] font-semibold border border-[#36C1FB]/30 shadow-inner"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    <span>A-Z</span>
                    {filterActive === "a-z" && (
                      <Check className="w-4 h-4 text-[#36C1FB] shrink-0" strokeWidth={2.5} />
                    )}
                  </button>

                  <div className="w-full h-0 border-t border-white/10 my-0.5" />

                  {/* Option 4: Z-A */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter("z-a")}
                    className={`w-full h-10 px-3 rounded-xl flex items-center justify-between text-sm font-medium font-['Lato',sans-serif] leading-[150%] transition-all cursor-pointer select-none ${
                      filterActive === "z-a"
                        ? "bg-gradient-to-r from-[#2563EB]/40 to-[#7A3BED]/40 text-[#36C1FB] font-semibold border border-[#36C1FB]/30 shadow-inner"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    <span>Z-A</span>
                    {filterActive === "z-a" && (
                      <Check className="w-4 h-4 text-[#36C1FB] shrink-0" strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* 3. Creators Grid (Figma Desktop - 45: Frame 2147239912: 3 rows x 2 columns = 6 cards, height 748px) */}
          <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            {displayedCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onUnfollow={handleConfirmUnfollow}
                onFollow={handleFollow}
                onExplore={handleExplore}
                onRequestUnfollow={(target) => setUnfollowTarget(target)}
              />
            ))}
          </section>

          {/* 4. Pagination Footer (Figma Pagination Footer: 1128px x 40px) */}
          <footer className="w-full max-w-[1128px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 pb-12 border-t border-white/10">
            {/* Left Result Count */}
            <div className="flex items-center gap-2.5 text-white text-sm font-medium font-['Lato',sans-serif]">
              <span>Showing</span>
              <div className="h-10 px-2 rounded-md bg-white/20 border border-white/10 flex items-center gap-1 cursor-pointer hover:bg-white/25 transition-all">
                <span>{previewCreator ? 6 : itemsPerPage}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#B5C8DB]" />
              </div>
              <span>of {creators.length > 24 ? creators.length : 24} items</span>
            </div>

            {/* Right Pagination Buttons (Figma specs: Previous, 1, 2, 3, ..., 10, Next) */}
            <div className="flex items-center gap-2 select-none">
              {/* Previous */}
              <button
                type="button"
                onClick={() => setActivePage(Math.max(1, activePage - 1))}
                className="h-10 px-3 rounded-md bg-white/20 hover:bg-white/30 border border-white/10 flex items-center gap-1 text-white text-sm font-medium font-['Lato',sans-serif] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#B5C8DB]" />
                <span>Previous</span>
              </button>

              {/* Page 1 (Active) */}
              <button
                type="button"
                onClick={() => setActivePage(1)}
                className={`h-10 w-[30px] rounded-md flex items-center justify-center text-sm font-medium font-['Lato',sans-serif] transition-all cursor-pointer ${
                  activePage === 1
                    ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow-md shadow-blue-900/50"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                1
              </button>

              {/* Page 2 */}
              <button
                type="button"
                onClick={() => setActivePage(2)}
                className={`h-10 w-[30px] rounded-md flex items-center justify-center text-sm font-medium font-['Lato',sans-serif] transition-all cursor-pointer ${
                  activePage === 2
                    ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow-md"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                2
              </button>

              {/* Page 3 */}
              <button
                type="button"
                onClick={() => setActivePage(3)}
                className={`h-10 w-[30px] rounded-md flex items-center justify-center text-sm font-medium font-['Lato',sans-serif] transition-all cursor-pointer ${
                  activePage === 3
                    ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow-md"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                3
              </button>

              {/* Ellipsis */}
              <div className="h-10 w-[30px] flex items-center justify-center text-white text-sm font-normal font-['Lato',sans-serif]">
                ...
              </div>

              {/* Page 10 */}
              <button
                type="button"
                onClick={() => setActivePage(10)}
                className={`h-10 w-[30px] rounded-md flex items-center justify-center text-sm font-medium font-['Lato',sans-serif] transition-all cursor-pointer ${
                  activePage === 10
                    ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow-md"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                10
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={() => setActivePage(Math.min(10, activePage + 1))}
                className="h-10 px-3 rounded-md bg-white/20 hover:bg-white/30 border border-white/10 flex items-center gap-1 text-white text-sm font-medium font-['Lato',sans-serif] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#B5C8DB]" />
              </button>
            </div>
          </footer>
        </main>

        {/* Footer */}
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>

      {/* Explore Channel Preview Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-[580px] rounded-2xl p-6 border border-white/20 [background:linear-gradient(0deg,#1E1B4B,#1E1B4B),linear-gradient(90deg,rgba(43,127,255,0.25)_0%,rgba(79,57,246,0.25)_100%)] shadow-2xl flex flex-col gap-5">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedCreator(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Creator Header */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-md shrink-0">
                <img
                  src={selectedCreator.avatar}
                  alt={selectedCreator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-white font-['Lato',sans-serif]">
                  {selectedCreator.name}
                </h3>
                <span className="text-sm text-[#D0D0D0]">
                  {selectedCreator.handle} • {selectedCreator.subscriberCount}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-white/90 leading-relaxed bg-white/10 p-3.5 rounded-xl border border-white/10">
              {selectedCreator.description}
            </p>

            {/* Summary Highlights */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs uppercase tracking-wider text-[#36C1FB] font-semibold">
                Available AI Summaries ({selectedCreator.videoCount})
              </h4>
              <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1 text-xs">
                <div className="p-2.5 rounded-lg bg-white/10 hover:bg-white/15 transition-all flex justify-between items-center cursor-pointer">
                  <span className="text-white font-medium truncate pr-2">1. The Future of Superintelligence & Neural Systems</span>
                  <span className="text-[#B5C8DB] shrink-0">12 min summary</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 hover:bg-white/15 transition-all flex justify-between items-center cursor-pointer">
                  <span className="text-white font-medium truncate pr-2">2. Master Focus: 5 Protocols from Neuroscience</span>
                  <span className="text-[#B5C8DB] shrink-0">8 min summary</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 hover:bg-white/15 transition-all flex justify-between items-center cursor-pointer">
                  <span className="text-white font-medium truncate pr-2">3. Building Wealth & Habits in the 2026 Economy</span>
                  <span className="text-[#B5C8DB] shrink-0">15 min summary</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.location.href = `/feed`;
                }}
                className="flex-1 h-11 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#7A3BED] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <span>Read Summaries in Feed</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedCreator(null)}
                className="px-5 h-11 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium text-sm transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unfollow Confirmation Modal (Frame 2147228403, 400px x 212px) */}
      <UnfollowModal
        isOpen={!!unfollowTarget}
        channelName={unfollowTarget?.name || ""}
        onConfirm={handleConfirmUnfollow}
        onCancel={() => setUnfollowTarget(null)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#2B2A7D] border border-white/20 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle className="w-5 h-5 text-[#36C1FB] shrink-0" />
          <span className="text-sm font-medium font-['Lato',sans-serif]">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
