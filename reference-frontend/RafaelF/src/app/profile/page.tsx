"use client";

import React, { useState, useRef } from "react";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import Footer from "@/components/Footer";
import { Camera, Eye, EyeOff, Check, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  // Initial profile data
  const initialProfile = {
    firstName: "Abir",
    lastName: "Hossain",
    phone: "01498978089049",
    address: "Dhaka, Bangladesh",
    company: "Orange Ltd",
    position: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  };

  // Form states
  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);

  // Password states
  const [oldPassword, setOldPassword] = useState("jonsnow007");
  const [newPassword, setNewPassword] = useState("*********");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Avatar file upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Profile save & cancel
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...tempProfile });
    showToast("Profile settings updated successfully!");
  };

  const handleCancelProfile = () => {
    setTempProfile({ ...profile });
    showToast("Profile changes reverted.");
  };

  // Password save & cancel
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword.trim() || !newPassword.trim()) {
      showToast("Please enter both old and new passwords.");
      return;
    }
    showToast("Password updated successfully!");
  };

  const handleCancelPassword = () => {
    setOldPassword("jonsnow007");
    setNewPassword("*********");
    setShowOldPassword(false);
    setShowNewPassword(false);
    showToast("Password changes cancelled.");
  };

  // Avatar change handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTempProfile((prev) => ({ ...prev, avatar: objectUrl }));
      showToast("New profile picture selected. Click 'Save Changes' to apply.");
    }
  };

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma Desktop - 7 Side Panel: 240px wide, Profile active, responsive on mobile) */}
      <FeedSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Right Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Nav (Figma Desktop - 7 Nav: 80px height) */}
        <FeedNavbar
          showSearch={false}
          userSubtitle="abir07@gmai.com"
          onMobileMenuToggle={() => setMobileSidebarOpen((prev) => !prev)}
        />

        {/* Main Content Area (Figma Frame 2147227640: 1152px wide) */}
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-6 py-6 flex flex-col gap-6">
          {/* Header (Figma Frame 2147227774 / Frame 2147239908: 1152px x 66px) */}
          <section className="w-full flex flex-col gap-1 py-2">
            <h1 className="text-[28px] font-semibold text-white leading-[135%] tracking-[-0.02em] font-['Lato',sans-serif]">
              Profile Settings
            </h1>
            <p className="text-base font-normal text-[#D0D0D0] leading-[150%] tracking-[-0.02em] font-['Lato',sans-serif]">
              Manage your profile setting from here
            </p>
          </section>

          {/* Card 1: Profile Settings Card (Figma Frame 2147224438: 1152px x 770px) */}
          <section className="w-full rounded-2xl p-6 bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] border border-white/10 shadow-[0_1px_12px_rgba(0,0,0,0.15)] flex flex-col gap-6">
            <form onSubmit={handleSaveProfile} className="w-full flex flex-col gap-6">
              {/* Profile Picture Section (Figma Frame 2147224435: 1104px x 288px) */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium text-white leading-[140%] tracking-[-0.02em] font-['Lato',sans-serif]">
                  Profile Picture:
                </h2>

                {/* Avatar Frame with Camera Edit Badge (Figma Frame 2147225842 & fi_45010) */}
                <div className="relative w-[234px] h-[234px]">
                  <div className="w-[234px] h-[234px] rounded-full border border-white overflow-hidden shadow-xl bg-slate-800">
                    <img
                      src={tempProfile.avatar}
                      alt="Profile Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Camera Badge Button (Figma fi_45010: 48.17px x 41.45px, left 171px, top 175px on bottom corner) */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Change profile picture"
                    title="Change profile picture"
                    className="absolute right-2 bottom-2 w-[48px] h-[42px] bg-white/40 hover:bg-white/60 active:scale-95 backdrop-blur-md rounded border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-lg group"
                  >
                    <Camera className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Form Fields Section (Figma Frame 2147227771: 1104px x 342px) */}
              <div className="flex flex-col gap-4 pt-2">
                {/* Divider Line 5 */}
                <div className="w-full h-0 border-t border-[#B5C8DB]/30" />

                {/* Row 1: Name (Figma Frame 2147225848) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2">
                  <div className="w-32 shrink-0">
                    <span className="text-base font-medium text-white font-['Lato',sans-serif]">
                      Name
                    </span>
                  </div>

                  {/* Inputs: First Name & Last Name (Figma Frame 1261156031: 737px x 78px) */}
                  <div className="flex-1 w-full max-w-[737px] grid grid-cols-1 sm:grid-cols-2 gap-[14.42px]">
                    {/* First Name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="firstName"
                        className="text-base font-medium text-white font-['Lato',sans-serif]"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={tempProfile.firstName}
                        onChange={(e) =>
                          setTempProfile({ ...tempProfile, firstName: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-lg bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/10 focus:border-[#36C1FB] focus:outline-none text-base font-medium text-white placeholder-white/50 transition-colors font-['Lato',sans-serif]"
                        placeholder="First Name"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="lastName"
                        className="text-base font-medium text-white font-['Lato',sans-serif]"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={tempProfile.lastName}
                        onChange={(e) =>
                          setTempProfile({ ...tempProfile, lastName: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-lg bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/10 focus:border-[#36C1FB] focus:outline-none text-base font-medium text-white placeholder-white/50 transition-colors font-['Lato',sans-serif]"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider Line 6 */}
                <div className="w-full h-0 border-t border-[#B5C8DB]/30" />

                {/* Row 2: Contact (Figma Frame 2147225848) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2">
                  <div className="w-32 shrink-0">
                    <span className="text-base font-medium text-white font-['Lato',sans-serif]">
                      Contact
                    </span>
                  </div>

                  {/* Inputs: Phone & Address (737px wide) */}
                  <div className="flex-1 w-full max-w-[737px] grid grid-cols-1 sm:grid-cols-2 gap-[14.42px]">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="phone"
                        className="text-base font-medium text-white font-['Lato',sans-serif]"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={tempProfile.phone}
                        onChange={(e) =>
                          setTempProfile({ ...tempProfile, phone: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-lg bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/10 focus:border-[#36C1FB] focus:outline-none text-base font-medium text-white placeholder-white/50 transition-colors font-['Lato',sans-serif]"
                        placeholder="Phone number"
                      />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="address"
                        className="text-base font-medium text-white font-['Lato',sans-serif]"
                      >
                        Address
                      </label>
                      <input
                        id="address"
                        type="text"
                        value={tempProfile.address}
                        onChange={(e) =>
                          setTempProfile({ ...tempProfile, address: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-lg bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/10 focus:border-[#36C1FB] focus:outline-none text-base font-medium text-white placeholder-white/50 transition-colors font-['Lato',sans-serif]"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider Line 6 */}
                <div className="w-full h-0 border-t border-[#B5C8DB]/30" />

                {/* Row 3: Work Information (Figma Frame 2147225857) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2">
                  <div className="w-32 shrink-0">
                    <span className="text-base font-medium text-white font-['Lato',sans-serif]">
                      Work Information
                    </span>
                  </div>

                  {/* Inputs: Company & Position (737px wide) */}
                  <div className="flex-1 w-full max-w-[737px] grid grid-cols-1 sm:grid-cols-2 gap-[14.42px]">
                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="company"
                        className="text-base font-medium text-white font-['Lato',sans-serif]"
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={tempProfile.company}
                        onChange={(e) =>
                          setTempProfile({ ...tempProfile, company: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-lg bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/10 focus:border-[#36C1FB] focus:outline-none text-base font-medium text-white placeholder-white/50 transition-colors font-['Lato',sans-serif]"
                        placeholder="Company name"
                      />
                    </div>

                    {/* Position */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="position"
                        className="text-base font-medium text-white font-['Lato',sans-serif]"
                      >
                        Position
                      </label>
                      <input
                        id="position"
                        type="text"
                        value={tempProfile.position}
                        onChange={(e) =>
                          setTempProfile({ ...tempProfile, position: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-lg bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/10 focus:border-[#36C1FB] focus:outline-none text-base font-medium text-white placeholder-white/50 transition-colors font-['Lato',sans-serif]"
                        placeholder="Position"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row (Figma Frame 2147229847: 242px x 44px, gap 16px) */}
              <div className="w-full flex justify-end items-center gap-4 pt-4">
                {/* Cancel Button (Figma Frame 2147239918: 80px x 44px) */}
                <button
                  type="button"
                  onClick={handleCancelProfile}
                  className="w-20 h-11 px-4 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 text-white text-base font-semibold font-['Lato',sans-serif] transition-all cursor-pointer select-none"
                >
                  Cancel
                </button>

                {/* Save Changes Button (Figma Frame 2147224437: 146px x 44px) */}
                <button
                  type="submit"
                  className="w-[146px] h-11 px-4 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:opacity-95 active:scale-95 text-white text-base font-semibold font-['Lato',sans-serif] transition-all shadow-md cursor-pointer select-none flex items-center justify-center"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Card 2: Change Password Card (Figma Frame 2147227640: 1152px x 200px) */}
          <section className="w-full rounded-[14px] p-6 bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] border border-white/10 shadow-[0_1px_12px_rgba(0,0,0,0.15)] flex flex-col gap-6">
            <form onSubmit={handleSavePassword} className="w-full flex flex-col gap-6">
              {/* Row: Change Password Inputs (Figma Frame 2147225848) */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="w-36 shrink-0">
                  <span className="text-base font-medium text-white font-['Lato',sans-serif]">
                    Change Password
                  </span>
                </div>

                {/* Inputs: Old Password & New Password (737px wide) */}
                <div className="flex-1 w-full max-w-[737px] grid grid-cols-1 sm:grid-cols-2 gap-[14.42px]">
                  {/* Old Password */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="oldPassword"
                      className="text-base font-medium text-white font-['Lato',sans-serif]"
                    >
                      Old Password
                    </label>
                    <div className="relative w-full">
                      <input
                        id="oldPassword"
                        type={showOldPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full h-12 pl-4 pr-11 rounded-lg bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/10 focus:border-[#36C1FB] focus:outline-none text-base font-medium text-white placeholder-white/50 transition-colors font-['Lato',sans-serif]"
                        placeholder="Old Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        aria-label={showOldPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      >
                        {showOldPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="newPassword"
                      className="text-base font-medium text-white font-['Lato',sans-serif]"
                    >
                      New Password
                    </label>
                    <div className="relative w-full">
                      <input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-12 pl-4 pr-11 rounded-lg bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/10 focus:border-[#36C1FB] focus:outline-none text-base font-medium text-white placeholder-white/50 transition-colors font-['Lato',sans-serif]"
                        placeholder="New Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row (Figma Frame 2147229848: 242px x 44px) */}
              <div className="w-full flex justify-end items-center gap-4 pt-2">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleCancelPassword}
                  className="w-20 h-11 px-4 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 text-white text-base font-semibold font-['Lato',sans-serif] transition-all cursor-pointer select-none"
                >
                  Cancel
                </button>

                {/* Save Changes */}
                <button
                  type="submit"
                  className="w-[146px] h-11 px-4 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:opacity-95 active:scale-95 text-white text-base font-semibold font-['Lato',sans-serif] transition-all shadow-md cursor-pointer select-none flex items-center justify-center"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </main>

        {/* Desktop - 7 Footer (1440px x 501px bottom footer) */}
        <div className="w-full mt-12">
          <Footer />
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#1E1B4B] to-[#2B2A7D] border border-[#7A3BED]/50 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200">
          <Check className="w-5 h-5 text-[#36C1FB] shrink-0" strokeWidth={2.5} />
          <span className="text-sm font-medium font-['Lato',sans-serif]">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}
