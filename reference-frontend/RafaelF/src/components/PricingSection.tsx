"use client";
import React, { useState } from "react";
import InAppPricingCard, { PlanConfig } from "@/components/pricing/InAppPricingCard";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const activePlanId = hoveredPlan || selectedPlan;

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

  return (
    <section id="pricing" className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 py-16 sm:py-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#CB52FF]/20 blur-[200px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto mb-14 sm:mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase bg-white/10 text-white/90 border border-white/20 mb-4 font-['Lato',sans-serif]">
          Transparent Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-[1.2] tracking-[-0.02em] font-['Lato',sans-serif]">
          Pricing
        </h2>
        <p className="text-[#D0D0D0] text-base sm:text-lg mt-3 font-['Lato',sans-serif]">
          Simple, transparent pricing designed to fit your needs.
Choose a plan and start transforming videos into smart insights instantly.
        </p>
      </div>

      {/* Pricing Cards Grid (Figma Desktop - 49 Structure - Dynamic Bold on Hover/Select) */}
      <div className="relative z-10 flex flex-row flex-wrap lg:flex-nowrap justify-center items-center gap-6">
        {plans.map((plan) => (
          <InAppPricingCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            isHovered={activePlanId === plan.id}
            onSelect={() => setSelectedPlan(plan.id)}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          />
        ))}
      </div>
    </section>
  );
}
