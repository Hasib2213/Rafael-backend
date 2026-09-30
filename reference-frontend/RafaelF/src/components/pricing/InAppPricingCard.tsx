"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export interface PlanConfig {
  id: string;
  name: string;
  price: string;
  period: string;
  isPopular?: boolean;
  badgeText?: string;
  features: string[];
  buttonText: string;
  buttonHref?: string;
  isHighlighted?: boolean;
  onSelect?: () => void;
}

interface InAppPricingCardProps {
  plan: PlanConfig;
  isSelected?: boolean;
  isHovered?: boolean;
  onSelect?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function InAppPricingCard({
  plan,
  isSelected,
  isHovered,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: InAppPricingCardProps) {
  // Dynamic bold highlight: active if currently hovered OR if selected and no other card is hovered
  const isPrimary = isHovered ?? isSelected;

  return (
    <div
      className={`relative w-full max-w-[370.67px] h-[503px] flex flex-col items-center filter drop-shadow-[0px_1px_12px_rgba(0,0,0,0.05)] group font-['Lato',sans-serif] select-none cursor-pointer transition-all duration-300 ${
        isPrimary ? "-translate-y-2.5 z-20 scale-[1.02]" : "hover:-translate-y-1.5 z-10 opacity-90 hover:opacity-100"
      }`}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Upper Card Body (Figma Frame 2147230208: 370.67px x 436px, rounded 32px, z-index 10) */}
      <div
        className={`relative z-10 w-full h-[436px] rounded-[32px] bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] p-[32px_24px] flex flex-col justify-between border shadow-xl transition-all duration-300 ${
          isPrimary
            ? "border-[#4F39F6] shadow-[0_0_35px_rgba(79,57,246,0.35)]"
            : "border-white/20 hover:border-white/35"
        }`}
      >
        {/* Top Header Row (Figma Frame 2147230227) */}
        <div className="flex items-start justify-between gap-3 w-full">
          <div className="flex flex-col justify-center">
            {/* Plan Name (Figma: 24px Lato semibold) */}
            <span className="text-2xl font-semibold text-white leading-[140%]">
              {plan.name}
            </span>

            {/* Price (Figma: 48px Lato bold) */}
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[48px] font-bold text-white leading-[120%] tracking-[-0.02em]">
                {plan.price}
              </span>
              <span className="text-base font-normal text-white/90">
                {plan.period}
              </span>
            </div>
          </div>

          {/* Badge (Popular badge with star or Free tier badge) */}
          {plan.isPopular ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] text-white shadow-md">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Star className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="text-sm font-medium text-white">Popular</span>
            </div>
          ) : plan.badgeText ? (
            <div className="px-3.5 py-1 rounded-full bg-white/20 text-white text-sm font-semibold border border-white/10">
              {plan.badgeText}
            </div>
          ) : null}
        </div>

        {/* Divider (Figma Vector 1: 322.67px) */}
        <div className="w-full h-0 border-b-2 border-white/20 my-1" />

        {/* Feature List (Figma Frame 2147230242) */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-[#D0D0D0] uppercase tracking-wider">
            Includes:
          </span>

          <div className="flex flex-col gap-2.5">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                {/* Custom circular white badge with gradient tick (qlementine-icons:check-tick-16) */}
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 8.5L6.5 11.5L12.5 4.5"
                      stroke="url(#tick-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="tick-grad"
                        x1="3.5"
                        y1="4.5"
                        x2="12.5"
                        y2="11.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#2563EB" />
                        <stop offset="0.5" stopColor="#7A3BED" />
                        <stop offset="1" stopColor="#A842D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <span className="text-[15px] font-normal text-white leading-tight">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Action Button Frame (Figma Frame 2147230238: 370.67px x 191px, rounded 32px, margin: -124px) */}
      <div
        className={`w-full h-[191px] rounded-[32px] -mt-[124px] z-0 flex flex-col justify-end items-center pb-5 transition-all duration-300 ${
          isPrimary
            ? "bg-gradient-to-r from-[#2B7FFF] to-[#4F39F6] shadow-[0px_8px_24px_rgba(43,127,255,0.4)] group-hover:brightness-110"
            : "bg-white/20 border border-white/10 group-hover:bg-white/30"
        } ${isSelected ? "ring-2 ring-white/50" : ""}`}
      >
        {plan.buttonHref ? (
          <Link
            href={plan.buttonHref}
            className="flex items-center gap-2 text-white font-bold text-lg font-['Lato',sans-serif] hover:scale-105 active:scale-95 transition-transform"
          >
            <span>{plan.buttonText}</span>
            <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
          </Link>
        ) : (
          <button
            type="button"
            className="flex items-center gap-2 text-white font-bold text-lg font-['Lato',sans-serif] hover:scale-105 active:scale-95 transition-transform"
          >
            <span>{plan.buttonText}</span>
            <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
}
