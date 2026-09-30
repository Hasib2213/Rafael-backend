import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0F172A] overflow-hidden text-white flex flex-col justify-between">
      {/* Figma Ambient Glow Orbs positioned throughout the page canvas */}
      {/* Orb 1: Top Left */}
      <div
        className="absolute -left-64 -top-64 w-[592px] h-[693px] rounded-full bg-[#CB52FF]/20 blur-[180px] pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Orb 2: Top Right (Hero/How it works) */}
      <div
        className="absolute -right-48 top-[1189px] w-[528px] h-[618px] rounded-full bg-[#CB52FF]/20 blur-[180px] pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Orb 3: Mid-Left (Features/Pricing) */}
      <div
        className="absolute -left-60 top-[2558px] w-[528px] h-[618px] rounded-full bg-[#CB52FF]/20 blur-[180px] pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Orb 4: Mid-Right (Pricing/Reviews) */}
      <div
        className="absolute -right-32 top-[2500px] w-[432px] h-[505px] rounded-full bg-[#3E8AFB]/15 blur-[180px] pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Orb 5: Lower Right (FAQ) */}
      <div
        className="absolute -right-40 top-[3811px] w-[464px] h-[543px] rounded-full bg-[#CB52FF]/20 blur-[180px] pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Orb 6: Bottom Left (CTA / Footer) */}
      <div
        className="absolute -left-32 top-[5074px] w-[491px] h-[575px] rounded-full bg-[#CB52FF]/20 blur-[180px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main App Layout */}
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 flex flex-col gap-12 sm:gap-16 lg:gap-20 pb-12">
          <HeroSection />
          <HowItWorks />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <CTABanner />
        </main>

        <Footer />
      </div>
    </div>
  );
}
