"use client";

import React, { useState, useRef, useEffect } from "react";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import LibraryCard, { LibraryItem } from "@/components/library/LibraryCard";
import AudioPlayerModal from "@/components/feed/AudioPlayerModal";
import FeedbackModal from "@/components/feed/FeedbackModal";
import ImproveSummaryModal from "@/components/feed/ImproveSummaryModal";
import ThankYouModal from "@/components/feed/ThankYouModal";
import { BriefingItem } from "@/components/feed/BriefingCard";
import Footer from "@/components/Footer";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
  Check,
  RotateCcw,
} from "lucide-react";

type LibraryFilter = "recently" | "oldest" | "a-z" | "z-a";

const initialLibraryItems: LibraryItem[] = [
  {
    id: "lib-1",
    title: "YOU OWE IT TO YOU IN 2026 - Best Motivational Speech | Matthew McConaughey",
    duration: "08:25",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    channelName: "Motiversity",
    subscribers: "4.11M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    summary: "This motivational speech emphasizes taking full responsibility for your life and future. Stop waiting for the right moment and act today....Read more",
    fullSummary: "Matthew McConaughey deconstructs the paradox of modern achievement. The speech urges individuals to eliminate distractions, define internal success benchmarks rather than peer validation, and understand that consistent daily commitments compound into undeniable long-term destiny.",
    keyTakeaways: [
      "Prioritize proactive self-discipline over temporary reactive motivation.",
      "The compound effect of small daily habits creates massive multi-year breakthroughs.",
      "Self-mastery and radical personal honesty precede external achievement.",
    ],
    savedAt: "2026-09-10T10:00:00Z",
    category: "Motivation",
  },
  {
    id: "lib-2",
    title: "The Architecture of Large Language Models: From Attention to AGI",
    duration: "18:45",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "Deep architectural breakdown of modern transformer inference, reasoning tokens, and test-time compute scaling....Read more",
    fullSummary: "Examines how scaling compute at inference time is transforming traditional LLMs into autonomous problem-solving engines capable of recursive self-correction.",
    keyTakeaways: [
      "Inference-time search scales reasoning beyond static weight memorization.",
      "Transformer attention mechanisms allow unbounded associative context recall.",
      "Verifiable reward models provide stable training signals for rigorous logic.",
    ],
    savedAt: "2026-09-09T14:30:00Z",
    category: "Technology",
  },
  {
    id: "lib-3",
    title: "Master Focus: 5 Science-Backed Protocols from Neuroscience",
    duration: "14:15",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    channelName: "Huberman Lab",
    subscribers: "5.2M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    summary: "Proven neurobiological protocols to eliminate brain fog, optimize dopamine levels, and achieve deep cognitive flow states....Read more",
    fullSummary: "Dr. Andrew Huberman explains how visual focus anchors mental focus. Learn how 90-minute ultradian cycles, acoustic stimulation, and morning photic signaling boost baseline focus.",
    keyTakeaways: [
      "Visual fixation drives mental fixation: narrow your sight to narrow attention.",
      "Work in 90-minute ultradian blocks aligned with physiological cycles.",
      "Delay early caffeine intake by 90 minutes to prevent the afternoon adenosine crash.",
    ],
    savedAt: "2026-09-08T09:15:00Z",
    category: "Health",
  },
  {
    id: "lib-4",
    title: "Artificial Superintelligence, Quantum Computing & Robotics",
    duration: "21:30",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    channelName: "Lex Fridman",
    subscribers: "4.1M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    summary: "Deep conversations on the horizon of AGI, synthetic biological cognition, and the next leap in computing substrates....Read more",
    fullSummary: "An in-depth exploration of human consciousness, algorithmic alignment, and whether artificial intelligence will collaborate or compete with human civilization.",
    keyTakeaways: [
      "Alignment requires understanding internal model representations, not just output tokens.",
      "Embodied humanoid robots provide grounding that purely textual models lack.",
      "Open-weights research accelerates global resilience against monopolized AI.",
    ],
    savedAt: "2026-09-07T18:00:00Z",
    category: "AI",
  },
  {
    id: "lib-5",
    title: "The 7 Productivity Principles That Changed My Life & Career",
    duration: "11:50",
    thumbnail: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
    channelName: "Ali Abdaal",
    subscribers: "5.5M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    summary: "How to build sustainable output without burnout: the power of feel-good productivity, energy management, and play....Read more",
    fullSummary: "Ali breaks down the counter-intuitive physics of productivity: joy drives discipline, friction kills momentum, and clarity prevents decision fatigue.",
    keyTakeaways: [
      "Optimize for energizing activities rather than pure mechanical time management.",
      "The 5-minute rule overcomes the activation energy needed to begin tough tasks.",
      "Systemize routine operations to preserve executive focus for creative breakthroughs.",
    ],
    savedAt: "2026-09-06T11:45:00Z",
    category: "Productivity",
  },
  {
    id: "lib-6",
    title: "Why Black Holes Could Break Fundamental Quantum Physics",
    duration: "16:20",
    thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
    channelName: "Veritasium",
    subscribers: "15.6M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    summary: "The information paradox, Hawking radiation, and why gravity refuses to fit neatly into the standard model of particle physics....Read more",
    fullSummary: "Examines the theoretical clash between general relativity and quantum mechanics at the event horizon of supermassive black holes.",
    keyTakeaways: [
      "Hawking radiation implies black holes slowly evaporate over cosmic timescales.",
      "The information paradox questions whether quantum states are preserved or lost forever.",
      "Holographic duality hints that 3D gravity might emerge from a 2D boundary quantum theory.",
    ],
    savedAt: "2026-09-05T16:10:00Z",
    category: "Science",
  },
  {
    id: "lib-7",
    title: "Can't Hurt Me: Master Your Mind and Defy the Odds | David Goggins",
    duration: "15:20",
    thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    channelName: "Impact Theory",
    subscribers: "4.48M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    summary: "Break through the 40% rule: when your mind says you are exhausted, you are only tapping into a fraction of your real ceiling....Read more",
    fullSummary: "David Goggins shares his philosophy on callusing the mind. Building unstoppable grit requires intentional discomfort and confronting internal doubts head-on.",
    keyTakeaways: [
      "The 40% rule: mental friction kicks in long before biological exhaustion occurs.",
      "Accountability mirrors: radical self-honesty accelerates transformation.",
      "Turn perceived suffering into competitive fuel for relentless resilience.",
    ],
    savedAt: "2026-09-04T12:00:00Z",
    category: "Mindset",
  },
  {
    id: "lib-8",
    title: "Start With Why: How Great Leaders Inspire Everyone to Take Action",
    duration: "12:45",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    channelName: "TED Talks",
    subscribers: "24.1M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    summary: "Discover the Golden Circle framework: people don't buy what you do; they buy why you do it. Transforming products into movements....Read more",
    fullSummary: "A timeless dissection of visionary communication. Leaders who inspire loyalty communicate from the inside out: starting with core conviction ('Why') before detailing methodology ('How') or product specifications ('What').",
    keyTakeaways: [
      "Clarify your purpose before executing tactical features.",
      "True leadership is based on inspiring voluntary commitment rather than coercion.",
      "Authenticity in brand messaging creates resilient user loyalty.",
    ],
    savedAt: "2026-09-03T15:20:00Z",
    category: "Leadership",
  },
  {
    id: "lib-9",
    title: "Mastering Spatial Computing, Neural Interfaces & Next-Gen Hardware",
    duration: "13:40",
    thumbnail: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "Exploring ultra-low latency spatial chips, mixed-reality waveguides, and the imminent rise of ambient computing interfaces....Read more",
    fullSummary: "An analytical breakdown of hardware miniaturization, optical waveguides, and neural interfaces bridging physical and digital worlds.",
    keyTakeaways: [
      "Micro-OLED display density has crossed human visual acuity limits.",
      "Neural wristbands detect motor neuron impulses before physical fingers move.",
      "Ambient computing replaces screens with contextual environmental interfaces.",
    ],
    savedAt: "2026-09-02T19:30:00Z",
    category: "Technology",
  },
  {
    id: "lib-10",
    title: "Discipline Equals Freedom: The Mindset of Elite Navy SEALs",
    duration: "17:10",
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    channelName: "Motiversity",
    subscribers: "4.11M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    summary: "Why freedom is not the absence of discipline, but the direct byproduct of relentless daily structure and accountability....Read more",
    fullSummary: "A masterclass on mental resilience. Discover how taking extreme ownership over every detail of your routine unlocks creative and financial autonomy.",
    keyTakeaways: [
      "Discipline provides the structure that makes genuine freedom possible.",
      "Overcome procrastination by taking immediate action on the smallest visible step.",
      "Extreme ownership eliminates external excuses and returns control to you.",
    ],
    savedAt: "2026-09-01T08:15:00Z",
    category: "Motivation",
  },
  {
    id: "lib-11",
    title: "Optimize Your Sleep Architecture: Temperature, Light & Supplements",
    duration: "19:05",
    thumbnail: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80",
    channelName: "Huberman Lab",
    subscribers: "5.2M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    summary: "The definitive guide to restoring slow-wave delta sleep, REM recovery cycles, and nighttime temperature regulation....Read more",
    fullSummary: "Dr. Andrew Huberman explains how circadian zeitgebers influence melatonin release, core body cooling, and cellular brain detoxification.",
    keyTakeaways: [
      "Cool your bedroom environment to 65-68°F to facilitate natural core cooling.",
      "Avoid bright overhead fluorescent light after 9 PM to protect melatonin.",
      "Morning sunlight viewing within 30 minutes of waking anchors your 24-hour circadian rhythm.",
    ],
    savedAt: "2026-08-31T21:40:00Z",
    category: "Health",
  },
  {
    id: "lib-12",
    title: "Autonomous AI Agents in 2026: The Future of Digital Coworkers",
    duration: "10:55",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
    channelName: "Lex Fridman",
    subscribers: "4.1M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    summary: "Autonomous multi-agent orchestration, tool use, long-horizon planning, and how software development is being reinvented....Read more",
    fullSummary: "Evaluates the transition from conversational chatbots to agentic workflows that autonomously debug, deploy, and monitor enterprise systems.",
    keyTakeaways: [
      "Agent swarms outcompete single monolithic models on complex benchmarks.",
      "Persistent memory architecture enables continuous learning across tasks.",
      "Human supervision shifts from line-by-line coding to high-level intent orchestration.",
    ],
    savedAt: "2026-08-30T13:25:00Z",
    category: "AI",
  },
];

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>(initialLibraryItems);
  const [removedItem, setRemovedItem] = useState<{ item: LibraryItem; index: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [filterActive, setFilterActive] = useState<LibraryFilter>("recently");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Audio Player & Feedback Modals
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingItem | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [activeFeedbackBriefing, setActiveFeedbackBriefing] = useState<BriefingItem | null>(null);
  const [improveModalOpen, setImproveModalOpen] = useState(false);
  const [activeImproveBriefing, setActiveImproveBriefing] = useState<BriefingItem | null>(null);
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePlayAudio = (item: LibraryItem) => {
    const briefing: BriefingItem = {
      id: item.id,
      title: item.title,
      duration: item.duration,
      thumbnail: item.thumbnail,
      channelName: item.channelName,
      subscribers: item.subscribers,
      channelAvatarColor: "from-blue-600 to-indigo-700",
      channelInitials: item.channelName.slice(0, 2).toUpperCase(),
      summary: item.summary,
      fullSummary: item.fullSummary,
      keyTakeaways: item.keyTakeaways,
    };
    setSelectedBriefing(briefing);
  };

  const handleRemove = (id: string) => {
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) {
      const removed = items[idx];
      setRemovedItem({ item: removed, index: idx });
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast(`Removed "${removed.title.slice(0, 35)}..." from Library.`);
    }
  };

  const handleUndoRemove = () => {
    if (removedItem) {
      setItems((prev) => {
        const next = [...prev];
        next.splice(removedItem.index, 0, removedItem.item);
        return next;
      });
      showToast(`Restored "${removedItem.item.title.slice(0, 35)}..." to Library.`);
      setRemovedItem(null);
    }
  };

  const handleSelectFilter = (filter: LibraryFilter) => {
    setFilterActive(filter);
    setFilterDropdownOpen(false);

    const sorted = [...items];
    if (filter === "recently") {
      sorted.sort((a, b) => (b.savedAt ? new Date(b.savedAt).getTime() : 0) - (a.savedAt ? new Date(a.savedAt).getTime() : 0));
    } else if (filter === "oldest") {
      sorted.sort((a, b) => (a.savedAt ? new Date(a.savedAt).getTime() : 0) - (b.savedAt ? new Date(b.savedAt).getTime() : 0));
    } else if (filter === "a-z") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter === "z-a") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    setItems(sorted);

    const labels: Record<LibraryFilter, string> = {
      recently: "Recently Saved",
      oldest: "Oldest Saved",
      "a-z": "A-Z",
      "z-a": "Z-A",
    };
    showToast(`Sorted by: ${labels[filter]}`);
  };

  const handleOpenFeedback = (briefing?: BriefingItem | null) => {
    const target = briefing || selectedBriefing;
    if (target) {
      setActiveFeedbackBriefing(target);
      setSelectedBriefing(null);
      setImproveModalOpen(false);
      setThankYouModalOpen(false);
      setFeedbackModalOpen(true);
    }
  };

  const handleOpenImprove = (briefing?: BriefingItem | null) => {
    const target = briefing || activeFeedbackBriefing || selectedBriefing;
    if (target) {
      setActiveImproveBriefing(target);
      setSelectedBriefing(null);
      setFeedbackModalOpen(false);
      setThankYouModalOpen(false);
      setImproveModalOpen(true);
    }
  };

  const handleOpenThankYou = () => {
    setSelectedBriefing(null);
    setFeedbackModalOpen(false);
    setImproveModalOpen(false);
    setThankYouModalOpen(true);
  };

  // Filter items by search query if present
  const filteredItems = searchQuery.trim()
    ? items.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.channelName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  const displayedItems = filteredItems.slice(0, itemsPerPage);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma Side Panel: 240px x 806px, responsive drawer on mobile) */}
      <FeedSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Right Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Nav (Figma Desktop - 6 Nav: 80px, userSubtitle='abir07@gmai.com') */}
        <FeedNavbar
          showSearch={true}
          onSearch={(q) => setSearchQuery(q)}
          userSubtitle="abir07@gmai.com"
          onMobileMenuToggle={() => setMobileSidebarOpen((prev) => !prev)}
        />

        {/* Main Canvas Canvas (Figma Frame 2147239907: width 1152px, left 264px, top 104px) */}
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-6 py-6 flex flex-col gap-6">
          {/* Header Row (Figma Frame 2147239910: 1152px x 66px, justify-between) */}
          <section className="w-full flex flex-row justify-between items-center py-2">
            {/* Title & Subtitle (Figma Frame 2147239908: 240px x 66px) */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[28px] font-semibold text-white leading-[135%] tracking-[-0.02em] font-['Lato',sans-serif]">
                Library
              </h1>
              <p className="text-base font-normal text-[#D0D0D0] leading-[150%] tracking-[-0.02em] font-['Lato',sans-serif]">
                All your saved briefings in one place
              </p>
            </div>

            {/* Filter Button & Dropdown Menu (Figma Button CTA / Frame 2147239940: 81px x 40px) */}
            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className={`h-10 px-3.5 py-2 rounded-lg border flex items-center gap-2 text-white text-base font-medium font-['Lato',sans-serif] transition-all duration-200 cursor-pointer select-none backdrop-blur-md ${
                  filterDropdownOpen
                    ? "bg-white/25 border-[#36C1FB]/60 ring-2 ring-[#36C1FB]/30 shadow-[0_0_16px_rgba(54,193,251,0.25)] text-white"
                    : "bg-white/20 hover:bg-white/30 border-white/15 hover:border-white/30 shadow-sm"
                }`}
              >
                {/* mage:filter SVG vector (16px x 16px rotated) */}
                <SlidersHorizontal
                  className={`w-4 h-4 transition-colors ${
                    filterDropdownOpen ? "text-[#36C1FB]" : "text-[#B5C8DB]"
                  }`}
                />
                <span>Filter</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#B5C8DB] transition-transform duration-200 ${
                    filterDropdownOpen ? "rotate-180 text-[#36C1FB]" : ""
                  }`}
                />
              </button>

              {/* Glassmorphic Filter Dropdown Popover */}
              {filterDropdownOpen && (
                <div
                  id="library-filter-menu"
                  className="absolute right-0 top-[48px] w-[200px] p-1.5 z-40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(79,57,246,0.35)] backdrop-blur-2xl border border-white/25 [background:linear-gradient(145deg,rgba(26,23,68,0.96)_0%,rgba(43,42,125,0.96)_100%)] flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* Option 1: Recently Saved */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter("recently")}
                    className={`w-full h-10 px-3 rounded-xl flex items-center justify-between text-sm font-medium font-['Lato',sans-serif] leading-[150%] transition-all cursor-pointer select-none ${
                      filterActive === "recently"
                        ? "bg-gradient-to-r from-[#2563EB]/40 to-[#7A3BED]/40 text-[#36C1FB] font-semibold border border-[#36C1FB]/30 shadow-inner"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    <span>Recently Saved</span>
                    {filterActive === "recently" && (
                      <Check className="w-4 h-4 text-[#36C1FB] shrink-0" strokeWidth={2.5} />
                    )}
                  </button>

                  <div className="w-full h-0 border-t border-white/10 my-0.5" />

                  {/* Option 2: Oldest Saved */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter("oldest")}
                    className={`w-full h-10 px-3 rounded-xl flex items-center justify-between text-sm font-medium font-['Lato',sans-serif] leading-[150%] transition-all cursor-pointer select-none ${
                      filterActive === "oldest"
                        ? "bg-gradient-to-r from-[#2563EB]/40 to-[#7A3BED]/40 text-[#36C1FB] font-semibold border border-[#36C1FB]/30 shadow-inner"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    <span>Oldest Saved</span>
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

          {/* Saved Cards Grid (Figma Frame 2147239874: 1152px, 3 columns x 4 rows) */}
          {displayedItems.length > 0 ? (
            <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedItems.map((item) => (
                <LibraryCard
                  key={item.id}
                  item={item}
                  onPlayAudio={handlePlayAudio}
                  onRemove={handleRemove}
                />
              ))}
            </section>
          ) : (
            <div className="w-full py-20 rounded-2xl border border-white/10 [background:linear-gradient(0deg,#2B2A7D,#2B2A7D),linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] flex flex-col items-center justify-center gap-3 text-center px-4">
              <h3 className="text-xl font-semibold text-white">No saved briefings found</h3>
              <p className="text-sm text-[#D0D0D0] max-w-md">
                {searchQuery
                  ? `No briefings match "${searchQuery}". Try a different keyword.`
                  : "You have not saved any audio briefings yet. Bookmark briefings from your Feed to view them here."}
              </p>
              {removedItem && (
                <button
                  type="button"
                  onClick={handleUndoRemove}
                  className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#7A3BED] text-white font-medium text-sm flex items-center gap-2 hover:brightness-110 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Last Removed Item</span>
                </button>
              )}
            </div>
          )}

          {/* Pagination Footer (Figma Pagination Footer: 1128px x 40px) */}
          <footer className="w-full max-w-[1128px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 pb-12 border-t border-white/10">
            {/* Left Result Count */}
            <div className="flex items-center gap-2.5 text-white text-sm font-medium font-['Lato',sans-serif]">
              <span>Showing</span>
              <div className="h-10 px-2.5 rounded-md bg-white/20 border border-white/10 flex items-center gap-1 cursor-pointer hover:bg-white/25 transition-all">
                <span>{Math.min(itemsPerPage, filteredItems.length)}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#B5C8DB]" />
              </div>
              <span>of {filteredItems.length} items</span>
            </div>

            {/* Right Pagination Buttons (Previous, 1, 2, 3, ..., 10, Next) */}
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

      {/* Audio Player Modal (Desktop - 59: 516px x 737px) */}
      {selectedBriefing && (
        <AudioPlayerModal
          briefing={selectedBriefing}
          onClose={() => setSelectedBriefing(null)}
          onOpenFeedback={() => handleOpenFeedback(selectedBriefing)}
        />
      )}

      {/* Feedback & Rating Modal (Figma Desktop - 60 & 61: 516px x 980px) */}
      {feedbackModalOpen && activeFeedbackBriefing && (
        <FeedbackModal
          briefing={activeFeedbackBriefing}
          onClose={() => {
            setFeedbackModalOpen(false);
            setActiveFeedbackBriefing(null);
          }}
          onSubmitSuccess={() => {
            handleOpenImprove(activeFeedbackBriefing);
          }}
        />
      )}

      {/* Improve Summary Modal (Figma Desktop - 62: 516px x 418px) */}
      {improveModalOpen && activeImproveBriefing && (
        <ImproveSummaryModal
          briefing={activeImproveBriefing}
          onClose={() => {
            setImproveModalOpen(false);
            setActiveImproveBriefing(null);
          }}
          onSkip={() => {
            handleOpenThankYou();
          }}
          onGenerateBetter={() => {
            handleOpenThankYou();
          }}
        />
      )}

      {/* Thank You Confirmation Modal (Figma Desktop - 63: 516px x 359px) */}
      {thankYouModalOpen && (
        <ThankYouModal
          onClose={() => setThankYouModalOpen(false)}
        />
      )}

      {/* Floating Toast Notification with Undo */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#2B2A7D] border border-white/20 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle className="w-5 h-5 text-[#36C1FB] shrink-0" />
          <span className="text-sm font-medium font-['Lato',sans-serif]">{toastMessage}</span>
          {removedItem && (
            <button
              type="button"
              onClick={handleUndoRemove}
              className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-[#36C1FB] text-xs font-bold transition-all cursor-pointer ml-1"
            >
              Undo
            </button>
          )}
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
