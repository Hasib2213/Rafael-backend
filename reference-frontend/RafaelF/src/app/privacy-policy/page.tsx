"use client";

import React from "react";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (240px wide) */}
      <FeedSidebar />

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#0F172A]">
        {/* Top Navbar (80px height, search disabled, subtitle matches Desktop specs) */}
        <FeedNavbar showSearch={false} userSubtitle="abir07@gmai.com" />

        {/* Main Canvas Area (Figma Frame 2147227640 / Frame 2147227653: 1152px x 884px) */}
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-10">
          <div className="w-full rounded-2xl p-6 sm:p-9 border border-white/20 shadow-[0px_1px_12px_rgba(0,0,0,0.05)] bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] flex flex-col gap-6">
            {/* Header: "Privacy Policy" (Figma Frame 2147227774 / Frame 2147239908) */}
            <div className="w-full border-b border-white/10 pb-4">
              <h1 className="text-white text-2xl sm:text-[28px] font-semibold font-['Lato',sans-serif] leading-[135%] tracking-[-0.02em]">
                Privacy Policy
              </h1>
            </div>

            {/* Privacy Policy Content Body (Figma Frame 2147228289 / Frame 2147224985: Inter 16px, line-height 150%) */}
            <div className="flex flex-col gap-6 font-['Inter',sans-serif] text-base text-white/95 leading-[150%] tracking-[-0.02em]">
              <p>
                At Curio, accessible from curio.ai and our associated applications, one of our main priorities is the privacy of our visitors and registered users. This Privacy Policy document outlines the types of information that is collected and recorded by Curio, how we utilize and safeguard it, and your rights concerning your personal data.
              </p>

              <p>
                We believe in complete transparency and minimal data retention. When you use our audio synthesis, AI briefing, and YouTube video summarization services, we only collect information strictly required to generate high-quality audio briefings, maintain account preferences, and facilitate secure subscription transactions.
              </p>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-white font-['Lato',sans-serif] tracking-normal">
                  1. Information We Collect
                </h2>
                <p>
                  We collect information you provide directly to us when registering an account, submitting feedback, or reaching out to support. This includes your name, email address, profile preferences, saved briefing library bookmarks, and subscription billing details processed securely by certified third-party payment gateways. We also collect anonymized usage metrics (such as briefing play counts and audio playback duration) to improve playback performance and recommendation relevance.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-white font-['Lato',sans-serif] tracking-normal">
                  2. How We Use Your Information
                </h2>
                <p>
                  We utilize your information to deliver and optimize our core services, including generating personalized daily and weekly briefing feeds, remembering your bookmark library, notifying you of account updates, and maintaining robust system security against fraudulent access. We never sell, rent, or trade your personal data to third parties for commercial advertising purposes.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-white font-['Lato',sans-serif] tracking-normal">
                  3. Cookies and Tracking Technologies
                </h2>
                <p>
                  Curio utilizes essential cookies and local browser storage to retain authentication sessions, volume levels, playback progress, and display settings across visits. You can instruct your browser to refuse all cookies or notify you when a cookie is sent; however, certain personalized features of the service may not function optimally without them.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-white font-['Lato',sans-serif] tracking-normal">
                  4. Data Security and Retention
                </h2>
                <p>
                  We employ industry-standard encryption protocols (TLS/SSL) in transit and secure database storage at rest to prevent unauthorized data exposure, loss, or alteration. We retain your personal data only as long as necessary to fulfill the purposes set out in this policy or as required by applicable legal obligations.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-white font-['Lato',sans-serif] tracking-normal">
                  5. Your Data Protection Rights
                </h2>
                <p>
                  Depending on your jurisdiction, you have the right to request access to your personal information, request rectification of inaccurate records, request deletion of your account and associated briefing history, or restrict processing. You can exercise these rights at any time directly through your profile settings or by contacting our team.
                </p>
              </div>

              <p className="text-sm text-[#D0D0D0] pt-4 border-t border-white/10">
                Last updated: January 2026. If you have additional questions or require more information about our Privacy Policy, please contact us at privacy@curio.com or submit a request via our{" "}
                <a href="/contact-us" className="text-cyan-300 underline hover:text-white transition-colors">
                  Contact Us
                </a>{" "}
                page.
              </p>
            </div>
          </div>
        </main>

        {/* Bottom Footer */}
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
