"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Eye, EyeOff, ShieldCheck, Lock, Headphones, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import CurioLogo from "@/components/CurioLogo";
import { motion } from "framer-motion";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isResetSuccess = searchParams.get("reset") === "true";
  const initialEmail = searchParams.get("email") ? decodeURIComponent(searchParams.get("email")!) : "";

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();

    // Basic format check
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("*Please enter a valid admin email address*");
      return;
    }

    if (!password) {
      setError("*Please enter your password*");
      return;
    }

    setIsLoading(true);

    // Mock Admin Authentication (When backend API is ready: POST /api/admin/login/)
    setTimeout(() => {
      setIsLoading(false);

      // Allow demo admin accounts or any credentials with valid admin email
      if (password.length < 4) {
        setError("*Invalid admin credentials. Please try again.*");
        return;
      }

      // Store admin session
      if (typeof window !== "undefined") {
        localStorage.setItem("curio_admin_user", JSON.stringify({ email: trimmedEmail, role: "Super Admin" }));
      }

      router.push("/admin/dashboard");
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0F172A] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 font-['Lato',sans-serif] overflow-x-hidden">
      {/* Figma Ellipse 1644: Ambient Purple Glow (272x272, blur 150px) */}
      <div
        className="absolute pointer-events-none w-[272px] h-[272px] rounded-full bg-[#7335C4] blur-[150px] opacity-80"
        style={{
          top: "280px",
          right: "15%",
          zIndex: 0,
        }}
      />

      {/* Main Container - Exact Figma Frame 2147239123 */}
      <div className="relative z-10 w-full max-w-[1408px] min-h-[960px] flex flex-col lg:flex-row items-center justify-center gap-7 lg:gap-10">
        {/* Left Visual Artwork Banner (Figma 720px width x 1008px height) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex relative w-[680px] xl:w-[720px] h-[920px] rounded-2xl overflow-hidden border border-[#383850]/60 bg-[#151628] shadow-2xl flex-col justify-between p-12 shrink-0 select-none"
        >
          {/* Background Image with Opacity */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero.png"
              alt="Curio Admin Control"
              fill
              priority
              className="object-cover object-center opacity-70 scale-105 transition-transform duration-1000 hover:scale-100"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#151628]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#151628]/80 via-transparent to-[#151628]/40" />
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7A3BED]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2563EB]/25 rounded-full blur-[100px] pointer-events-none" />
          </div>

          {/* Top Brand Pill */}
          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all"
            >
              <Headphones className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold tracking-wide text-white uppercase">Curio Audio Briefings</span>
            </Link>
          </div>

          {/* Bottom Security Card */}
          <div className="relative z-10 flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-purple-300">
                <Lock className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-bold uppercase tracking-wider">Enterprise Administration</span>
              </div>
              <p className="text-xl font-medium leading-snug text-white/95">
                &ldquo;Centralized administration console for content moderation, analytics, subscriber management, and AI pipeline monitoring.&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>256-bit Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
                  <Lock className="w-4 h-4" />
                  <span>RBAC Access Control</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-purple-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Audit Logs Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Form Container (Figma Frame 2147239122 - 632px width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[632px] flex flex-col items-start gap-9 z-10"
        >
          {/* Logo (Frame 2147239120) */}
          <Link href="/" className="transition-transform hover:scale-105">
            <CurioLogo size="lg" />
          </Link>

          {/* Title & Subtitle Container (Frame 2147239927 - width: 632px, height: 79px) */}
          <div className="w-full flex flex-col items-start gap-2 text-left">
            <h1 className="text-3xl sm:text-[36px] font-medium text-white tracking-[-0.02em] leading-[130%] font-['Lato',sans-serif]">
              Admin Login
            </h1>
            <p className="text-base font-normal text-[#D0D0D0] leading-[150%] tracking-[-0.02em] font-['Lato',sans-serif]">
              Admin access only. All actions are logged for security.
            </p>
          </div>

          {/* Fields Box (Figma Frame 2147239117 / Fields Container - 632px width, 328px height) */}
          <div className="w-full relative rounded-[12px] bg-[#151628] border-b border-l border-r border-t-0 border-[#383850] shadow-[0px_16px_50px_#0E011D] p-6 sm:p-6 flex flex-col gap-6 overflow-hidden">
            {/* Ellipse 47056 Background Blur Glow (208x43, top 408px, left 220px, blur 75px) */}
            <div
              className="absolute pointer-events-none w-[208px] h-[43px] left-[220px] top-[140px] rounded-full opacity-70"
              style={{
                background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                filter: "blur(75px)",
              }}
            />

            {/* Success Message if returning from password reset */}
            {isResetSuccess && (
              <div className="p-3.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm text-left flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Admin password reset successfully! Please log in with your new password.</span>
              </div>
            )}

            {/* Error Message if any */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-[#FF5B5B] text-sm text-left flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10 w-full flex flex-col gap-6">
              {/* Frame 2147239928: Fields Container */}
              <div className="flex flex-col gap-4 w-full">
                {/* Email Field Container (height: 80px) */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-white text-base font-medium font-['Lato',sans-serif] leading-[150%]">
                    Email
                  </label>
                  {/* fill up button */}
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      required
                      placeholder="Enter your admin email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 pr-12 rounded-lg bg-[#27273F] border border-[#383850] text-[#D0D0D0] placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all font-['Lato',sans-serif]"
                    />
                    {/* material-symbols:mail-rounded */}
                    <div className="absolute right-4 pointer-events-none text-[#B5C8DB]">
                      <Mail className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Password Field Container (height: 80px) */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-white text-base font-medium font-['Lato',sans-serif] leading-[150%]">
                    Password
                  </label>
                  {/* fill up button */}
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 px-4 pr-12 rounded-lg bg-[#27273F] border border-[#383850] text-[#D0D0D0] placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all tracking-wider font-['Lato',sans-serif]"
                    />
                    {/* zondicons:view-show (toggle) */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-[#B5C8DB] hover:text-white transition-colors cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot Password? Link (Right-aligned, #FF5B5B - takes admin to /forgot-password?from=admin) */}
              <div className="w-full flex justify-end -mt-2">
                <Link
                  href="/forgot-password?from=admin"
                  className="text-[#FF5B5B] hover:text-red-400 text-base font-normal font-['Inter',sans-serif] leading-[150%] tracking-[-0.02em] transition-colors cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Primary Submit Button (width: 584px, height: 44px) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[44px] rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-base font-['Lato',sans-serif] leading-[150%] transition-all shadow-md shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Log In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#0F172A]" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
