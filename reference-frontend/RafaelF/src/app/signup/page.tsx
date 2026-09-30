"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Eye, EyeOff, Sparkles, Headphones, CheckCircle2, ArrowRight } from "lucide-react";
import CurioLogo from "@/components/CurioLogo";
import { motion } from "framer-motion";

function GoogleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const normalizedEmail = email.trim().toLowerCase();
      
      // Save to registered users list in localStorage for auth persistence
      if (typeof window !== "undefined") {
        try {
          const savedUsers = localStorage.getItem("curio_registered_users");
          const usersList: string[] = savedUsers ? JSON.parse(savedUsers) : [];
          if (!usersList.includes(normalizedEmail)) {
            usersList.push(normalizedEmail);
            localStorage.setItem("curio_registered_users", JSON.stringify(usersList));
          }
          localStorage.setItem("curio_last_registered_email", normalizedEmail);
        } catch {
          // fallback
        }
      }

      const encodedEmail = encodeURIComponent(email.trim());
      router.push(`/login?registered=true&email=${encodedEmail}`);
    }, 600);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/feed");
    }, 500);
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
              alt="Curio AI Audio Briefings"
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
            <Link href="/" className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all">
              <Headphones className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold tracking-wide text-white uppercase">Curio Audio Briefings</span>
            </Link>
          </div>

          {/* Bottom Testimonial / Value Prop Box */}
          <div className="relative z-10 flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-purple-300">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Save 10+ Hours Every Week</span>
              </div>
              <p className="text-xl font-medium leading-snug text-white/95">
                &ldquo;Turn hours of YouTube videos into bite-sized 5-minute audio briefings you can listen to anywhere.&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AI Powered Summaries</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Personalized Feeds</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-purple-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Smart Audio Briefs</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Form Container (Figma 632px width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[632px] flex flex-col items-center gap-8 z-10"
        >
          {/* Logo - Exact Curio Logo */}
          <Link href="/" className="transition-transform hover:scale-105">
            <CurioLogo size="lg" />
          </Link>

          {/* Form Header Title */}
          <div className="w-full text-center">
            <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-[130%]">
              Create Your Account
            </h1>
            <p className="text-[#D0D0D0] text-base mt-2">
              Start listening to your personalized daily briefings
            </p>
          </div>

          {/* Fields Box (Figma Frame 2147239117 / Fields Container) */}
          <div className="w-full relative rounded-xl bg-[#151628] border border-[#383850] shadow-[0px_16px_50px_#0E011D] p-6 sm:p-8 flex flex-col gap-6 overflow-hidden">
            {/* Ellipse 47056 Background Blur Glow */}
            <div
              className="absolute pointer-events-none w-[220px] h-[50px] left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
              style={{
                background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                filter: "blur(75px)",
              }}
            />

            {/* Error Message if any */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
              {/* Name Fields Container - First Name & Last Name Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-white text-base font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jon"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg bg-[#27273F] border border-[#383850] text-[#D0D0D0] placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all"
                  />
                </div>

                {/* Last Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-white text-base font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Snow"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg bg-[#27273F] border border-[#383850] text-[#D0D0D0] placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all"
                  />
                </div>
              </div>

              {/* Email Address Field Container */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-base font-medium">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="jonsnow464@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 rounded-lg bg-[#27273F] border border-[#383850] text-[#D0D0D0] placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all"
                  />
                  <div className="absolute right-4 pointer-events-none text-[#B5C8DB]">
                    <Mail className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Password Field Container */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-base font-medium">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 rounded-lg bg-[#27273F] border border-[#383850] text-[#D0D0D0] placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-[#B5C8DB] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field Container */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-base font-medium">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 rounded-lg bg-[#27273F] border border-[#383850] text-[#D0D0D0] placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-[#B5C8DB] hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Primary Submit Button & Toggle Link */}
              <div className="flex flex-col items-center gap-3 mt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-base transition-all shadow-md shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Login Switch Text */}
                <p className="text-sm sm:text-base text-[#D0D0D0] font-medium text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-white hover:text-cyan-300 font-semibold underline underline-offset-4 transition-colors"
                  >
                    Log In
                  </Link>
                </p>
              </div>

              {/* OAuth Divider */}
              <div className="flex items-center justify-center gap-4 my-1">
                <div className="flex-1 h-[1px] bg-[#383850]" />
                <span className="text-white text-base font-normal">Or</span>
                <div className="flex-1 h-[1px] bg-[#383850]" />
              </div>

              {/* Google Button Container */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full h-14 rounded-lg bg-[#151628] border border-[#383850] hover:bg-[#1f2038] hover:border-[#7A3BED]/60 active:scale-[0.99] text-white font-semibold text-base transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer disabled:opacity-70"
              >
                <GoogleIcon className="w-6 h-6" />
                <span>Sign up with Google</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
