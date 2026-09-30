"use client";

import React, { useState } from "react";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import Footer from "@/components/Footer";
import InAppPricingCard, { PlanConfig } from "@/components/pricing/InAppPricingCard";

const plans: PlanConfig[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/forever",
    badgeText: "Basic",
    isPopular: false,
    features: [
      "Up to 5 video summaries / week",
      "Standard length text recaps",
      "Follow up to 3 YouTube creators",
      "Web access only",
      "Community support",
    ],
    buttonText: "Apply Now",
    buttonHref: "/checkout?plan=free",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    period: "/per month",
    isPopular: true,
    isHighlighted: true,
    features: [
      "Unlimited video summaries",
      "HD audio briefings with realistic AI voices",
      "Follow unlimited YouTube creators",
      "Personalized daily digest feed",
      "Download audio briefings offline",
    ],
    buttonText: "Apply for Pro",
    buttonHref: "/checkout?plan=pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$80",
    period: "/per year",
    isPopular: false,
    features: [
      "Everything in Pro included",
      "Multi-seat team workspace (up to 10)",
      "Automated Slack & Notion integration",
      "API & Webhook export options",
      "Dedicated account manager",
    ],
    buttonText: "Apply for Enterprise",
    buttonHref: "/checkout?plan=enterprise",
  },
];

export default function InAppPricingPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("pro");
  const [hoveredPlanId, setHoveredPlanId] = useState<string | null>(null);

  const activePlanId = hoveredPlanId || selectedPlanId;

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma Desktop - 49 Side Panel: 240px wide) */}
      <FeedSidebar />

      {/* Right Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Nav (Figma Desktop - 49 Nav: 80px height) */}
        <FeedNavbar
          showSearch={false}
          userSubtitle="abir07@gmai.com"
        />

        {/* Main Content Container (Figma Frame 2147230263: 1152px x 621px) */}
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-6 py-8 flex flex-col gap-8">
          {/* Header (Figma Frame 2147239925: 1152px x 94px) */}
          <section className="w-full flex flex-col items-center text-center gap-2 py-2">
            <h1 className="text-[28px] font-medium text-white leading-[135%] tracking-[-0.02em] font-['Lato',sans-serif]">
              Pricing
            </h1>
            <p className="max-w-[560px] text-base font-normal text-white/90 leading-[150%] tracking-[-0.02em] font-['Lato',sans-serif]">
              Simple, transparent pricing designed to fit your needs. Choose a plan and start transforming videos into smart insights instantly.
            </p>
          </section>

          {/* Pricing Cards Grid (Figma Frame 2147230244: 1152px x 503px, gap 20px - Dynamic Bold on Hover/Select) */}
          <section className="w-full flex flex-row flex-wrap lg:flex-nowrap justify-center items-center gap-5">
            {plans.map((plan) => (
              <InAppPricingCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlanId === plan.id}
                isHovered={activePlanId === plan.id}
                onSelect={() => setSelectedPlanId(plan.id)}
                onMouseEnter={() => setHoveredPlanId(plan.id)}
                onMouseLeave={() => setHoveredPlanId(null)}
              />
            ))}
          </section>
        </main>

        {/* Desktop - 49 Footer (1440px x 501px bottom footer) */}
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
