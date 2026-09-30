"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import ChannelHeaderBanner, { ChannelInfo } from "@/components/channel/ChannelHeaderBanner";
import ChannelVideoCard, { ChannelVideoItem } from "@/components/channel/ChannelVideoCard";
import AudioPlayerModal from "@/components/feed/AudioPlayerModal";
import FeedbackModal from "@/components/feed/FeedbackModal";
import ImproveSummaryModal from "@/components/feed/ImproveSummaryModal";
import ThankYouModal from "@/components/feed/ThankYouModal";
import UnfollowModal from "@/components/following/UnfollowModal";
import Footer from "@/components/Footer";
import { BriefingItem } from "@/components/feed/BriefingCard";
import { ChevronLeft, ChevronRight, ChevronDown, CheckCircle, X, ArrowLeft } from "lucide-react";

const initialTechInsightsChannel: ChannelInfo = {
  name: "Tech Insights",
  handle: "@techinsights",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
  videoCount: "24 Videos",
  subscriberCount: "2.4M subscribers",
  description: "AI, technology trends, and future innovations Exploring how innovation is reshaping industries.",
  isFollowing: true,
};

const initialMotiversityChannel: ChannelInfo = {
  name: "Motiversity",
  handle: "@motiversity",
  avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80",
  videoCount: "142 Videos",
  subscriberCount: "3.8M subscribers",
  description: "Daily powerful motivational speeches, discipline mastery, and interviews with world-class performers to fuel your personal journey.",
  isFollowing: true,
};

const initialChannelVideos: ChannelVideoItem[] = [
  {
    id: "v1",
    title: "YOU OWE IT TO YOU IN 2026 - Best Motivational Speech | Matthew McConaughey",
    duration: "08:25",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "This motivational speech emphasizes taking full responsibility for your life and future....Read more",
    fullSummary: "An inspiring exploration of accountability, personal momentum, and redefining success in a rapidly shifting modern landscape.",
    keyTakeaways: [
      "Prioritize proactive discipline over reactive habits.",
      "The compound effect of small consistent actions creates massive breakthroughs.",
      "Self-mastery precedes external achievement.",
    ],
  },
  {
    id: "v2",
    title: "The Architecture of Large Language Models: From Attention to AGI",
    duration: "18:45",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "Deep architectural breakdown of modern transformer inference, reasoning tokens, and test-time compute scaling.",
    fullSummary: "Examines how scaling compute at inference time is transforming traditional LLMs into autonomous problem-solving engines.",
    keyTakeaways: [
      "Inference-time search scales reasoning beyond static weights.",
      "Transformer attention mechanisms allow unbounded associative recall.",
      "Verifiable reward models provide stable training signals.",
    ],
  },
  {
    id: "v3",
    title: "Mastering Spatial Computing, Neural Interfaces & Next-Gen Hardware",
    duration: "13:40",
    thumbnail: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "Exploring ultra-low latency spatial chips, mixed-reality waveguides, and the imminent rise of ambient computing interfaces.",
    fullSummary: "An analytical breakdown of hardware miniaturization, optical waveguides, and neural interfaces bridging physical and digital worlds.",
    keyTakeaways: [
      "Micro-OLED display density has crossed human visual acuity limits.",
      "Neural wristbands detect motor neuron impulses before physical fingers move.",
      "Ambient computing replaces screens with contextual environmental interfaces.",
    ],
  },
  {
    id: "v4",
    title: "The Future of Superintelligence & Quantum Computing Breakthroughs",
    duration: "15:20",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "How fault-tolerant topological qubits and quantum error correction are accelerating materials science and cryptographic defenses.",
    fullSummary: "Discusses the roadmap toward 10,000 logical qubits and how quantum chemistry simulations will revolutionize drug discovery.",
    keyTakeaways: [
      "Surface code error correction is reaching physical threshold breakeven.",
      "Post-quantum lattice cryptography is becoming mandatory worldwide.",
      "Hybrid classical-quantum algorithms solve previously intractable molecular simulations.",
    ],
  },
  {
    id: "v5",
    title: "AI Agents in 2026: From Autonomous Workflows to Digital Coworkers",
    duration: "11:50",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "Autonomous multi-agent orchestration, tool use, long-horizon planning, and how software development is being reinvented.",
    fullSummary: "Evaluates the transition from conversational chatbots to agentic workflows that autonomously debug, deploy, and monitor enterprise systems.",
    keyTakeaways: [
      "Agent swarms outcompete single monolithic models on complex benchmarks.",
      "Persistent memory architecture enables continuous learning across tasks.",
      "Human supervision shifts from line-by-line coding to high-level intent orchestration.",
    ],
  },
  {
    id: "v6",
    title: "How Frontier Labs Are Building Autonomous AI Foundations",
    duration: "16:15",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "Inside the computational clusters training the next generation of multimodal models with continuous self-play refinement.",
    fullSummary: "A detailed look at data center gigawatt requirements, optical interconnects, and recursive self-improvement algorithms.",
    keyTakeaways: [
      "Optical interconnects cut inter-rack communication latency by 70%.",
      "Synthetic data generation quality now rivals human expert curated data.",
      "Energy infrastructure is the primary bottleneck for 2026 AI datacenter clusters.",
    ],
  },
  {
    id: "v7",
    title: "Robotics Revolution: Humanoid Robots Transforming Industry in 2026",
    duration: "14:10",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "End-to-end vision-language-action policies, electric actuators, and general-purpose humanoid robots deployed in logistics.",
    fullSummary: "How zero-shot sim-to-real transfer and foundation models for embodiment are making robots adaptable to arbitrary household and industrial tasks.",
    keyTakeaways: [
      "Vision-Language-Action (VLA) models unify perception and physical motor control.",
      "Harmonic gear drives provide the power-to-weight ratio needed for human-like agility.",
      "Deployment in structured logistics is proving commercial viability ahead of general household use.",
    ],
  },
  {
    id: "v8",
    title: "Neuromorphic Chips & The Next 100x Efficiency Leap in Silicon",
    duration: "09:45",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "Event-based spiking neural networks and analog in-memory compute delivering sub-milliwatt edge intelligence.",
    fullSummary: "Examining how neuromorphic architectures emulate biological synapsing to execute inference with fractional power consumption.",
    keyTakeaways: [
      "Event-driven computation eliminates wasteful idle clock cycles.",
      "Resistive RAM (ReRAM) performs matrix multiplication directly inside memory cells.",
      "Edge sensors can process continuous audio and video on coin-cell battery power for years.",
    ],
  },
  {
    id: "v9",
    title: "Biotech Meets Machine Intelligence: Decoding Longevity & DNA",
    duration: "12:30",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
    channelName: "Tech Insights",
    subscribers: "2.4M subscribers",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    summary: "Generative biology models designing novel enzymes, epigenetic reprogramming therapies, and mRNA vaccine platforms.",
    fullSummary: "How deep learning protein design is moving from structural prediction to generative de novo molecular synthesis in weeks rather than decades.",
    keyTakeaways: [
      "Diffusion models for 3D molecular backbones synthesize functional proteins from scratch.",
      "Epigenetic clocks measure biological aging with single-cell resolution.",
      "Personalized mRNA therapeutics are designed on-demand based on individual tumor sequencing.",
    ],
  },
];

export default function ChannelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const isMotiversity = resolvedParams.id?.toLowerCase().includes("motiversity");
  const [channel, setChannel] = useState<ChannelInfo>(
    isMotiversity ? initialMotiversityChannel : initialTechInsightsChannel
  );
  const [videos] = useState<ChannelVideoItem[]>(initialChannelVideos);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);

  // Feedback & Improvement modal states
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [activeFeedbackBriefing, setActiveFeedbackBriefing] = useState<BriefingItem | null>(null);
  const [improveModalOpen, setImproveModalOpen] = useState(false);
  const [activeImproveBriefing, setActiveImproveBriefing] = useState<BriefingItem | null>(null);
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

  const handleToggleFollow = (following: boolean) => {
    setChannel((prev) => ({ ...prev, isFollowing: following }));
    showToast(
      following
        ? `Following ${channel.name}! You will receive AI summaries.`
        : `Unfollowed ${channel.name}.`
    );
  };

  const handleConfirmUnfollow = () => {
    setChannel((prev) => ({ ...prev, isFollowing: false }));
    setIsUnfollowModalOpen(false);
    showToast(`Unfollowed ${channel.name}.`);
  };

  const handlePlayAudio = (video: ChannelVideoItem) => {
    const briefing: BriefingItem = {
      id: video.id,
      title: video.title,
      duration: video.duration,
      thumbnail: video.thumbnail,
      channelName: video.channelName,
      subscribers: video.subscribers,
      channelAvatarColor: "from-blue-600 to-indigo-700",
      channelInitials: video.channelName.slice(0, 2).toUpperCase(),
      summary: video.summary,
      fullSummary: video.fullSummary,
      keyTakeaways: video.keyTakeaways,
    };
    setSelectedBriefing(briefing);
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma Side Panel: 240px) */}
      <FeedSidebar />

      {/* Right Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Nav (Figma Desktop - 46: 80px, userSubtitle='abir07@gmai.com') */}
        <FeedNavbar showSearch={false} userSubtitle="abir07@gmai.com" />

        {/* Main Content Canvas (Figma Frame 2147239907: width 1152px, max-w-[1152px], gap 24px) */}
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-6 py-6 flex flex-col gap-6">
          {/* Back to Following navigation button */}
          <div className="w-full flex items-center justify-start">
            <Link
              href="/following"
              className="inline-flex items-center gap-2 text-sm text-[#B5C8DB] hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Following</span>
            </Link>
          </div>

          {/* 1. Channel Header Banner (Figma Frame 2147239905: 1152px x 194px) */}
          <ChannelHeaderBanner
            channel={channel}
            onToggleFollow={handleToggleFollow}
            onRequestUnfollow={() => setIsUnfollowModalOpen(true)}
          />

          {/* 2. Video Cards Grid (Figma Frame 2147239874: 1152px x 1316px, 3 rows x 3 columns = 9 cards) */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.slice(0, itemsPerPage).map((video) => (
              <ChannelVideoCard
                key={video.id}
                video={video}
                onPlayAudio={handlePlayAudio}
              />
            ))}
          </section>

          {/* 3. Pagination Footer (Figma Pagination Footer: 1128px x 40px) */}
          <footer className="w-full max-w-[1128px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 pb-12 border-t border-white/10">
            {/* Left Result Count */}
            <div className="flex items-center gap-2.5 text-white text-sm font-medium font-['Lato',sans-serif]">
              <span>Showing</span>
              <div className="h-10 px-2.5 rounded-md bg-white/20 border border-white/10 flex items-center gap-1 cursor-pointer hover:bg-white/25 transition-all">
                <span>{itemsPerPage}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#B5C8DB]" />
              </div>
              <span>of 24 items</span>
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

      {/* Unfollow Confirmation Modal (Desktop - 46 popup: Frame 2147228403, 400px x 212px) */}
      <UnfollowModal
        isOpen={isUnfollowModalOpen}
        channelName={channel.name}
        onConfirm={handleConfirmUnfollow}
        onCancel={() => setIsUnfollowModalOpen(false)}
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
