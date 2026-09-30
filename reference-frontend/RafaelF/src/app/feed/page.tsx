"use client";

import React, { useState, useEffect } from "react";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import FeedFollowingSidebar from "@/components/feed/FeedFollowingSidebar";
import BriefingCard, { BriefingItem } from "@/components/feed/BriefingCard";
import AudioPlayerModal from "@/components/feed/AudioPlayerModal";
import FeedbackModal from "@/components/feed/FeedbackModal";
import ImproveSummaryModal from "@/components/feed/ImproveSummaryModal";
import ThankYouModal from "@/components/feed/ThankYouModal";
import Footer from "@/components/Footer";
import { RotateCw, Sparkles, Star } from "lucide-react";

// Mock briefing data reflecting Curio's YouTube AI briefings
const initialBriefings: BriefingItem[] = [
  {
    id: "1",
    title: "YOU OWE IT TO YOU IN 2026 - Best Motivational Speech | Matthew McConaughey",
    duration: "08:25",
    thumbnail: "/images/summary.png",
    channelName: "Motiversity",
    subscribers: "4.11M subscribers",
    channelAvatarColor: "from-purple-600 to-indigo-600",
    channelInitials: "M",
    summary:
      "This motivational speech emphasizes taking full responsibility for your life, defining your personal metrics for success, and embracing continuous self-discipline over temporary motivation.",
    fullSummary:
      "Matthew McConaughey deconstructs the paradox of modern achievement. The speech urges individuals to eliminate distractions, define internal success benchmarks rather than peer validation, and understand that consistent daily commitments compound into undeniable long-term destiny.",
    keyTakeaways: [
      "Define what success means to you before society defines it for you.",
      "Eliminate toxic people, habits, and cognitive traps that drain momentum.",
      "The compound effect of 1% disciplined daily progress outperforms sporadic intense effort.",
    ],
    timeframe: "daily",
  },
  {
    id: "2",
    title: "Optimize Your Dopamine for Focus, Motivation & Drive | Dr. Andrew Huberman",
    duration: "14:10",
    thumbnail: "/images/audio.png",
    channelName: "Huberman Lab",
    subscribers: "5.82M subscribers",
    channelAvatarColor: "from-blue-600 to-cyan-600",
    channelInitials: "HL",
    summary:
      "Understand how dopamine drives energy, focus, and state of mind. Learn neurobiology-backed protocols to maintain consistent drive without burning out your baseline.",
    fullSummary:
      "Dr. Huberman explains the neurochemical mechanics of dopamine peaks versus dopamine troughs. Layering artificial stimuli (caffeine, intense music, high-sugar snacks) during deep work can deplete baseline dopamine, leading to severe procrastination later.",
    keyTakeaways: [
      "Avoid stacking too many dopamine spikes simultaneously during routine work.",
      "Engage with effort as the reward to build psychological resilience.",
      "Intermittent reward schedules are the most effective way to sustain lifelong motivation.",
    ],
    timeframe: "daily",
  },
  {
    id: "3",
    title: "Demis Hassabis: Future of AI, Gemini 3, AlphaFold & AGI Timeline",
    duration: "21:40",
    thumbnail: "/images/analysis.png",
    channelName: "Lex Fridman",
    subscribers: "4.29M subscribers",
    channelAvatarColor: "from-zinc-700 to-zinc-900",
    channelInitials: "LF",
    summary:
      "Google DeepMind CEO Demis Hassabis shares breakthroughs in agentic reasoning, biological simulations, and the convergence towards human-level intelligence.",
    fullSummary:
      "An in-depth conversation covering the transition from narrow pattern recognition models to autonomous multi-step reasoning agents. Hassabis discusses how scientific discovery tools like AlphaFold represent the highest leverage application of modern artificial intelligence.",
    keyTakeaways: [
      "Multi-modal reasoning with built-in search and verification is the new frontier.",
      "AI in drug discovery and molecular biology will advance medicine by decades.",
      "Autonomous coding agents will redefine software engineering into system architecture.",
    ],
    timeframe: "daily",
  },
  {
    id: "4",
    title: "How to Build a Second Brain in 2026 (Full Productivity Workflow)",
    duration: "11:15",
    thumbnail: "/images/feed.png",
    channelName: "Ali Abdaal",
    subscribers: "5.45M subscribers",
    channelAvatarColor: "from-emerald-500 to-teal-700",
    channelInitials: "AA",
    summary:
      "A complete system to capture ideas, summarize YouTube lectures automatically, and build an evergreen digital library that produces high-value creative output.",
    fullSummary:
      "Ali showcases practical knowledge management using automated AI summaries. Instead of hoarding bookmarks or passive video watch histories, structured daily briefs allow creators to retrieve actionable insights in seconds.",
    keyTakeaways: [
      "Capture only what resonates emotionally or logically.",
      "Organize by actionability, not by topic or Dewey Decimal category.",
      "Express knowledge into tangible outputs (briefs, notes, decisions).",
    ],
    timeframe: "daily",
  },
  {
    id: "5",
    title: "The Bizarre Physics of Why You Can't Touch Anything | Veritasium",
    duration: "12:50",
    thumbnail: "/images/hero.png",
    channelName: "Veritasium",
    subscribers: "16.3M subscribers",
    channelAvatarColor: "from-amber-600 to-orange-700",
    channelInitials: "V",
    summary:
      "At the atomic scale, electrostatic repulsion and quantum degeneracy pressure prevent electron clouds from ever truly making contact.",
    fullSummary:
      "Derek Muller explores quantum mechanics and electromagnetic forces to demonstrate that tactile sensation is purely electrostatic repulsion. We experience the force fields of atoms rather than actual physical surface collisions.",
    keyTakeaways: [
      "Pauli exclusion principle dictates fermion behavior in matter.",
      "The sensation of solid touch is electromagnetic pushback.",
      "Every physical interaction is fundamentally a non-contact field interaction.",
    ],
    timeframe: "daily",
  },
  {
    id: "6",
    title: "How Great Leaders Inspire Action & Build Unstoppable Momentum",
    duration: "09:35",
    thumbnail: "/images/creators.png",
    channelName: "TED Talks",
    subscribers: "24.1M subscribers",
    channelAvatarColor: "from-red-600 to-rose-700",
    channelInitials: "TED",
    summary:
      "Discover the Golden Circle framework: people don't buy what you do; they buy why you do it. Transforming products into movements.",
    fullSummary:
      "A timeless dissection of visionary communication. Leaders who inspire loyalty communicate from the inside out: starting with core conviction ('Why') before detailing methodology ('How') or product specifications ('What').",
    keyTakeaways: [
      "Clarify your purpose before executing tactical features.",
      "True leadership is based on inspiring voluntary commitment rather than coercion.",
      "Authenticity in brand messaging creates resilient user loyalty.",
    ],
    timeframe: "daily",
  },
  {
    id: "7",
    title: "The Architecture of Large Language Models: From Attention to AGI",
    duration: "18:45",
    thumbnail: "/images/server_room.png",
    channelName: "Andrej Karpathy",
    subscribers: "1.12M subscribers",
    channelAvatarColor: "from-blue-700 to-indigo-800",
    channelInitials: "AK",
    summary:
      "A comprehensive walkthrough of transformer mechanics, next-token prediction, inference compute scaling, and post-training alignment techniques.",
    fullSummary:
      "Andrej Karpathy walks through the fundamentals of modern foundation models. He explains how compute allocation during pre-training versus test-time reasoning is shifting AI capability frontiers.",
    keyTakeaways: [
      "Attention mechanisms allow unbounded contextual cross-referencing.",
      "Inference-time search scales reasoning beyond static weight memorization.",
      "Reinforcement learning from verifiable rewards is key for rigorous math and code.",
    ],
    timeframe: "weekly",
  },
  {
    id: "8",
    title: "Can't Hurt Me: Master Your Mind and Defy the Odds | David Goggins",
    duration: "15:20",
    thumbnail: "/images/happy_user.png",
    channelName: "Impact Theory",
    subscribers: "4.48M subscribers",
    channelAvatarColor: "from-orange-600 to-red-800",
    channelInitials: "IT",
    summary:
      "Break through the 40% rule: when your mind says you are completely exhausted, you have only reached a fraction of your real physical and mental ceiling.",
    fullSummary:
      "David Goggins shares his philosophy on callusing the mind. Building unstoppable grit requires intentional discomfort and confronting internal doubts head-on rather than avoiding friction.",
    keyTakeaways: [
      "The 40% rule: mental limits kick in long before physical capacity is exhausted.",
      "Accountability mirrors: radical self-honesty accelerates transformation.",
      "Turn perceived suffering into competitive fuel for relentless resilience.",
    ],
    timeframe: "weekly",
  },
  {
    id: "9",
    title: "Mastering Spatial Computing, Neural Interfaces & Next-Gen Hardware",
    duration: "13:40",
    thumbnail: "/images/summary.png",
    channelName: "Marques Brownlee",
    subscribers: "18.9M subscribers",
    channelAvatarColor: "from-red-500 to-zinc-900",
    channelInitials: "MKB",
    summary:
      "Deep dive into the latest breakthroughs in mixed reality headsets, ultra-low latency silicon, and the future of ambient computing interfaces.",
    fullSummary:
      "Marques analyzes the trajectory of wearable hardware and ambient spatial computing. As display density and eye-tracking latency cross human perceptual thresholds, computing seamlessly integrates with physical environments.",
    keyTakeaways: [
      "Sub-12ms photon-to-motion latency is essential to prevent perceptual disorientation.",
      "Eye-tracking combined with micro-gestures is the most natural spatial input paradigm.",
      "Silicon thermal efficiency dictates the form factor of next-generation wearables.",
    ],
    timeframe: "weekly",
  },
  {
    id: "10",
    title: "The AI Revolution in Biology: AlphaFold 3 & Genomic Synthesis",
    duration: "16:15",
    thumbnail: "/images/analysis.png",
    channelName: "DeepMind Science",
    subscribers: "3.2M subscribers",
    channelAvatarColor: "from-cyan-600 to-blue-700",
    channelInitials: "DS",
    summary:
      "This week's top breakthrough: modeling DNA, RNA, ligands, and antibody complexes with atomic-precision deep learning architectures.",
    fullSummary:
      "AlphaFold 3 extends structural prediction beyond proteins to almost all biological molecules. Researchers can now simulate drug interactions and molecular pathways in minutes instead of years.",
    keyTakeaways: [
      "Joint diffusion architectures enable direct 3D atomic coordinate generation.",
      "Cross-molecular binding affinities can be screened in silico.",
      "Accelerates computational medicine and therapeutic targeting.",
    ],
    timeframe: "weekly",
  },
  {
    id: "11",
    title: "The Psychology of Peak Flow States & Ultra Focus | Steven Kotler",
    duration: "19:20",
    thumbnail: "/images/audio.png",
    channelName: "Tom Bilyeu",
    subscribers: "3.98M subscribers",
    channelAvatarColor: "from-purple-600 to-pink-700",
    channelInitials: "TB",
    summary:
      "Neuroscience protocols to trigger 400% productivity gains by systematically entering flow states during complex creative work.",
    fullSummary:
      "Steven Kotler details the neurochemical cascade (dopamine, anandamide, endorphins) that occurs in deep flow. Learn how to construct an environment optimized for uninterrupted deep focus.",
    keyTakeaways: [
      "Challenge-skills balance: tasks must be 4% beyond current comfort zone.",
      "Clear micro-goals prevent cognitive wandering and hesitation.",
      "Recovery protocols are mandatory to replenish depleted neurochemistry.",
    ],
    timeframe: "weekly",
  },
  {
    id: "12",
    title: "Quantum Supremacy to Fault Tolerance: 2026 Commercial Landscape",
    duration: "17:45",
    thumbnail: "/images/hero.png",
    channelName: "Quanta Magazine",
    subscribers: "1.45M subscribers",
    channelAvatarColor: "from-teal-600 to-emerald-800",
    channelInitials: "QM",
    summary:
      "An essential weekly retrospective on topological qubits, surface codes, and error correction milestones across major quantum laboratories.",
    fullSummary:
      "Exploring the critical transition from noisy intermediate-scale quantum (NISQ) devices to fault-tolerant logical qubits. We review the latest physical demonstrations of error threshold crossing.",
    keyTakeaways: [
      "Logical qubits with error suppression outperform physical qubits.",
      "Cryogenic control silicon reduces wiring bottlenecks dramatically.",
      "Post-quantum cryptography adoption is now urgent for enterprise security.",
    ],
    timeframe: "weekly",
  },
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingItem | null>(null);
  const [activeFeedbackBriefing, setActiveFeedbackBriefing] = useState<BriefingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [improveModalOpen, setImproveModalOpen] = useState(false);
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);
  const [activeImproveBriefing, setActiveImproveBriefing] = useState<BriefingItem | null>(null);

  const handleOpenFeedback = (briefing?: BriefingItem | null) => {
    setActiveFeedbackBriefing(briefing || selectedBriefing || initialBriefings[0]);
    setSelectedBriefing(null); // Dismiss audio player modal so its backdrop does NOT double-stack into blackness
    setImproveModalOpen(false);
    setThankYouModalOpen(false);
    setFeedbackModalOpen(true);
  };

  const handleOpenImprove = (briefing?: BriefingItem | null) => {
    setActiveImproveBriefing(briefing || activeFeedbackBriefing || selectedBriefing || initialBriefings[0]);
    setSelectedBriefing(null);
    setFeedbackModalOpen(false);
    setThankYouModalOpen(false);
    setImproveModalOpen(true);
  };

  const handleOpenThankYou = () => {
    setSelectedBriefing(null);
    setFeedbackModalOpen(false);
    setImproveModalOpen(false);
    setThankYouModalOpen(true);
  };

  // Allow auto-opening Desktop - 60, 61, 62, or 63 modal via URL hash or query (e.g., /feed?63=true)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const hash = window.location.hash;
      if (
        search.includes("63") ||
        search.includes("thanks") ||
        hash.includes("63") ||
        hash.includes("thanks")
      ) {
        handleOpenThankYou();
      } else if (
        search.includes("62") ||
        search.includes("improve") ||
        hash.includes("62") ||
        hash.includes("improve")
      ) {
        handleOpenImprove(initialBriefings[0]);
      } else if (
        search.includes("rate") ||
        search.includes("feedback") ||
        search.includes("60") ||
        search.includes("61") ||
        hash.includes("rate") ||
        hash.includes("feedback") ||
        hash.includes("61")
      ) {
        handleOpenFeedback(initialBriefings[0]);
      }
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const filteredBriefings = initialBriefings.filter((item) => {
    // 1. Timeframe filter (Daily vs Weekly)
    const matchesTimeframe =
      !item.timeframe ||
      item.timeframe === "both" ||
      item.timeframe === activeTab;

    if (!matchesTimeframe) return false;

    // 2. Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.channelName.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q)
    );
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-row overflow-x-hidden font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma: Side Panel - width 240px, responsive drawer on mobile) */}
      <FeedSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Center Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#0F172A] relative">
        {/* Top Navbar (Figma: Nav - height 80px) */}
        <FeedNavbar
          onSearch={setSearchQuery}
          onMobileMenuToggle={() => setMobileSidebarOpen((prev) => !prev)}
        />

        {/* Feed Content (Figma: Frame 2147239907) */}
        <main className="flex-1 px-6 sm:px-8 lg:px-10 py-8 max-w-[1100px] w-full mx-auto flex flex-col gap-6">
          {/* Header Greeting & Controls (Figma Frame 2147239912) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-['Lato',sans-serif]">
                Welcome back, Abir! 👋
              </h1>
              <p className="text-sm sm:text-base text-[#D0D0D0] mt-1 font-['Lato',sans-serif]">
                {activeTab === "daily"
                  ? "Here's what's happening with your briefings today."
                  : "Here are the top trending briefings and deep dives from this past week."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Desktop - 60 Rate Us Modal Trigger */}
              <button
                type="button"
                onClick={() => handleOpenFeedback(initialBriefings[0])}
                className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#7A3BED] hover:brightness-110 active:scale-95 transition-all text-white text-base font-semibold select-none shadow-md shadow-purple-900/30 shrink-0"
              >
                <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Please Rate Us</span>
              </button>

              {/* Refresh Action Button */}
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-white/20 hover:bg-white/30 border border-white/10 active:scale-95 transition-all text-white text-base font-medium select-none shadow-sm shrink-0 self-start sm:self-auto"
              >
                <RotateCw
                  className={`w-5 h-5 text-white ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Period Filter Tabs (Figma Frame 2147239919) */}
          <div className="flex items-center gap-2 border-b border-white/15 w-full max-w-sm">
            <button
              type="button"
              onClick={() => setActiveTab("daily")}
              className={`h-11 px-6 text-lg font-normal transition-all relative select-none ${
                activeTab === "daily"
                  ? "text-white font-medium border-b-2 border-white"
                  : "text-[#D0D0D0] hover:text-white border-b-2 border-transparent"
              }`}
            >
              Daily
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("weekly")}
              className={`h-11 px-6 text-lg font-normal transition-all relative select-none ${
                activeTab === "weekly"
                  ? "text-white font-medium border-b-2 border-white"
                  : "text-[#D0D0D0] hover:text-white border-b-2 border-transparent"
              }`}
            >
              Weekly
            </button>
          </div>

          {/* Video Briefing Cards Grid (Figma Frame 2147239874) */}
          {filteredBriefings.length === 0 ? (
            <div className="py-16 text-center text-[#D0D0D0] flex flex-col items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <p className="text-base">No briefings matched your search.</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-sm text-cyan-300 underline underline-offset-4"
              >
                Clear search query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBriefings.map((item) => (
                <BriefingCard
                  key={item.id}
                  briefing={item}
                  onOpenModal={setSelectedBriefing}
                />
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <div className="w-full mt-12">
          <Footer />
        </div>
      </div>

      {/* Right Sidebar (Figma: Navigation - width 239px) */}
      <FeedFollowingSidebar />

      {/* Audio Briefing Player Modal (Figma Desktop - 59: 516px x 737px) */}
      {selectedBriefing && (
        <AudioPlayerModal
          briefing={selectedBriefing}
          onClose={() => setSelectedBriefing(null)}
          onOpenFeedback={() => handleOpenFeedback(selectedBriefing)}
        />
      )}

      {/* Feedback & Rating Modal (Figma Desktop - 60 & 61: 516px x 980px) */}
      {feedbackModalOpen && (
        <FeedbackModal
          briefing={activeFeedbackBriefing || initialBriefings[0]}
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
      {improveModalOpen && (
        <ImproveSummaryModal
          briefing={activeImproveBriefing || initialBriefings[0]}
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
    </div>
  );
}
