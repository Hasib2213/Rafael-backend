"use client";

import React, { useState } from "react";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import Footer from "@/components/Footer";
import MyFeedbackCard, { FeedbackCardData } from "@/components/feedback/MyFeedbackCard";
import AudioPlayerModal from "@/components/feed/AudioPlayerModal";
import FeedbackModal from "@/components/feed/FeedbackModal";
import ImproveSummaryModal from "@/components/feed/ImproveSummaryModal";
import ThankYouModal from "@/components/feed/ThankYouModal";
import { BriefingItem } from "@/components/feed/BriefingCard";

const initialFeedbacks: FeedbackCardData[] = [
  {
    id: "fb-1",
    title: "YOU OWE IT TO YOU IN 2026 - Best Motivational Speech | Matthew McConaughey",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
    duration: "08:25",
    rating: 4,
    maxRating: 5,
    usefulFeedback: "Confusing or unclear",
    thoughts: "It did not met my expectation",
    requestOption: "Request an improved version",
    channelName: "Motiversity",
  },
  {
    id: "fb-2",
    title: "How AI is Transforming Modern Workplaces & Autonomous Coding Tools",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    duration: "12:40",
    rating: 5,
    maxRating: 5,
    usefulFeedback: "Accurate and concise",
    thoughts: "Very clear key takeaways, highlighted practical examples for remote teams.",
    requestOption: "Feedback submitted",
    channelName: "Tech Insights",
  },
  {
    id: "fb-3",
    title: "Mastering Morning Routines for Sustained Energy & Mental Focus",
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    duration: "15:10",
    rating: 4,
    maxRating: 5,
    usefulFeedback: "Actionable and well-structured",
    thoughts: "The breakdown of hydration and light exposure was spot on.",
    requestOption: "Request an improved version",
    channelName: "Huberman Lab",
  },
  {
    id: "fb-4",
    title: "The Science of Sleep and Cognitive Recovery with Dr. Huberman",
    thumbnail: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80",
    duration: "09:45",
    rating: 4,
    maxRating: 5,
    usefulFeedback: "Confusing or unclear",
    thoughts: "Audio synthesis was very realistic, but missed the final point on temperature protocols.",
    requestOption: "Request an improved version",
    channelName: "Lex Fridman",
  },
  {
    id: "fb-5",
    title: "Deep Work: Strategies for Focused Success in a Distracted World",
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
    duration: "11:15",
    rating: 5,
    maxRating: 5,
    usefulFeedback: "Extremely helpful",
    thoughts: "High quality audio briefing. The summary captured all 4 core rules concisely.",
    requestOption: "Feedback submitted",
    channelName: "Ali Abdaal",
  },
  {
    id: "fb-6",
    title: "Understanding Macroeconomics & Global Market Cycles in 2026",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=80",
    duration: "14:20",
    rating: 3,
    maxRating: 5,
    usefulFeedback: "Too brief",
    thoughts: "Needs more depth on interest rate implications and emerging market currencies.",
    requestOption: "Request an improved version",
    channelName: "Veritasium",
  },
];

export default function MyFeedbackPage() {
  const [feedbacks] = useState<FeedbackCardData[]>(initialFeedbacks);

  // Audio player modal state
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingItem | null>(null);

  // Feedback modals state
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isImproveModalOpen, setIsImproveModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);

  const handlePlayAudio = (item: FeedbackCardData) => {
    setSelectedBriefing({
      id: item.id,
      title: item.title,
      duration: item.duration,
      thumbnail: item.thumbnail,
      channelName: item.channelName || "Curio Creator",
      subscribers: "1.2M",
      channelAvatarColor: "bg-blue-600",
      channelInitials: "CC",
      summary: item.thoughts,
      fullSummary: item.thoughts,
      keyTakeaways: ["Actionable insight", "Clear presentation"],
    });
  };

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma Desktop - 55 Side Panel: 240px wide, My Feedback active, responsive on mobile) */}
      <FeedSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Right Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Nav (Figma Desktop - 55 Nav: 80px height) */}
        <FeedNavbar
          showSearch={false}
          userSubtitle="abir07@gmai.com"
          onMobileMenuToggle={() => setMobileSidebarOpen((prev) => !prev)}
        />

        {/* Main Content Container (Figma Frame 2147227640: 1152px wide) */}
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-6 py-8 flex flex-col gap-8">
          {/* Header (Figma Frame 2147227774 / Frame 2147239908: 1152px x 66px) */}
          <section className="w-full flex flex-col gap-1 py-1">
            <h1 className="text-[28px] font-semibold text-white leading-[135%] tracking-[-0.02em] font-['Lato',sans-serif]">
              My Feedback
            </h1>
            <p className="text-base font-normal text-[#D0D0D0] leading-[150%] tracking-[-0.02em] font-['Lato',sans-serif]">
              Your personal experience shared with each videos are collected in here.
            </p>
          </section>

          {/* Feedback Cards Grid (Figma Frames 2147239921 & 2147239922: 3 cols x 2 rows, gap 24px) */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {feedbacks.map((item) => (
              <MyFeedbackCard
                key={item.id}
                item={item}
                onPlayAudio={handlePlayAudio}
              />
            ))}
          </section>
        </main>

        {/* Desktop - 55 Footer (1440px x 501px bottom footer) */}
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>

      {/* Audio Player Modal (Desktop - 59) */}
      {selectedBriefing && (
        <AudioPlayerModal
          briefing={selectedBriefing}
          onClose={() => setSelectedBriefing(null)}
          onOpenFeedback={() => setIsFeedbackModalOpen(true)}
        />
      )}

      {/* Feedback Modal (Desktop - 60 & 61) */}
      {isFeedbackModalOpen && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          onSubmitFeedback={(data) => {
            setIsFeedbackModalOpen(false);
            if (data.requestImproved) {
              setIsImproveModalOpen(true);
            } else {
              setIsThankYouModalOpen(true);
            }
          }}
        />
      )}

      {/* Improved Version Request Modal (Desktop - 62) */}
      {isImproveModalOpen && (
        <ImproveSummaryModal
          isOpen={isImproveModalOpen}
          onClose={() => setIsImproveModalOpen(false)}
          onSubmitRequest={(_req) => {
            setIsImproveModalOpen(false);
            setIsThankYouModalOpen(true);
          }}
        />
      )}

      {/* Thank You Confirmation Modal (Desktop - 63) */}
      {isThankYouModalOpen && (
        <ThankYouModal
          isOpen={isThankYouModalOpen}
          onClose={() => setIsThankYouModalOpen(false)}
        />
      )}
    </div>
  );
}
