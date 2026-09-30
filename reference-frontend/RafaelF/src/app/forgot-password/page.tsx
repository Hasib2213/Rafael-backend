"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  ArrowLeft,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Headphones,
  KeyRound,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import CurioLogo from "@/components/CurioLogo";
import { motion, AnimatePresence } from "framer-motion";

function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromAdmin = searchParams.get("from") === "admin";

  const [step, setStep] = useState<"email" | "otp" | "new_password" | "success">("email");
  const [email, setEmail] = useState("");
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // OTP state (6 digits)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // New Password state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Resend countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Registered accounts (Figma default mock + any account registered via /signup)
  const isEmailRegisteredInDatabase = (inputEmail: string) => {
    const normalized = inputEmail.trim().toLowerCase();
    
    // Default demo/system registered accounts
    const defaultRegisteredEmails = [
      "jonsnow464@gmail.com",
      "admin@curio.ai",
      "demo@curio.ai",
      "user@curio.ai",
    ];

    if (defaultRegisteredEmails.includes(normalized)) {
      return true;
    }

    // Check localStorage for users registered via /signup in this browser session
    if (typeof window !== "undefined") {
      try {
        const savedUsers = localStorage.getItem("curio_registered_users");
        if (savedUsers) {
          const parsed: string[] = JSON.parse(savedUsers);
          if (Array.isArray(parsed) && parsed.includes(normalized)) {
            return true;
          }
        }
        const lastRegistered = localStorage.getItem("curio_last_registered_email");
        if (lastRegistered && lastRegistered.toLowerCase() === normalized) {
          return true;
        }
      } catch {
        // fallback
      }
    }

    return false;
  };

  // Email Validation Logic (Format + Database check)
  const validateEmailFormat = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmed);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (hasSubmittedEmail) {
      if (!validateEmailFormat(value) || !isEmailRegisteredInDatabase(value)) {
        setEmailError("*Wrong email address*");
      } else {
        setEmailError(null);
      }
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmittedEmail(true);

    // 1. Format check
    if (!validateEmailFormat(email)) {
      setEmailError("*Wrong email address*");
      return;
    }

    // 2. Database existence check (When Backend API is connected, replace with: const res = await fetch('/api/auth/forgot-password', ...))
    if (!isEmailRegisteredInDatabase(email)) {
      setEmailError("*Wrong email address*");
      return;
    }

    setEmailError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(30);
    }, 600);
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError(null);

    // Auto focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Demo generated OTP (defaults to 123456 for testing)
  const [currentDemoOtp, setCurrentDemoOtp] = useState("123456");

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    
    // 1. Completeness check
    if (fullOtp.length < 6) {
      setOtpError("*Please enter a complete 6-digit OTP code*");
      return;
    }

    setIsLoading(true);
    setOtpError(null);

    // 2. OTP Validity Check (When backend is connected, replace with: const res = await fetch('/api/auth/verify-otp', ...))
    setTimeout(() => {
      setIsLoading(false);
      if (fullOtp !== currentDemoOtp) {
        setOtpError("*Invalid OTP code. Please try again (Demo OTP: 123456)*");
        return;
      }

      setStep("new_password");
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (password.length < 6) {
      setPasswordError("*Password must be at least 6 characters*");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("*Passwords do not match*");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0F172A] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 font-['Lato',sans-serif] overflow-x-hidden">
      {/* Figma Ellipse 1644: Ambient Purple Glow (272x272, left 950px, top 280px, blur 150px) */}
      <div
        className="absolute pointer-events-none w-[272px] h-[272px] rounded-full bg-[#7335C4] blur-[150px] opacity-80"
        style={{
          top: "280px",
          right: "15%",
          zIndex: 0,
        }}
      />

      {/* Main Container - Exact Figma Frame 2147239123 */}
      <div className="relative z-10 w-full max-w-[1408px] min-h-[850px] flex flex-col lg:flex-row items-center justify-center gap-7 lg:gap-10">
        {/* Left Visual Artwork Banner (Figma 720px width x 1008px height) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex relative w-[680px] xl:w-[720px] h-[780px] xl:h-[840px] rounded-2xl overflow-hidden border border-[#383850]/60 bg-[#151628] shadow-2xl flex-col justify-between p-12 shrink-0 select-none"
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
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all"
            >
              <Headphones className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold tracking-wide text-white uppercase">Curio Audio Briefings</span>
            </Link>
          </div>

          {/* Bottom Testimonial / Value Prop Box */}
          <div className="relative z-10 flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-purple-300">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Account Recovery</span>
              </div>
              <p className="text-xl font-medium leading-snug text-white/95">
                &ldquo;Don&apos;t worry, it happens. Enter your registered email address and we&apos;ll send you an instant OTP verification code to reset your password.&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Instant OTP Code</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Verification</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-purple-400">
                  <KeyRound className="w-4 h-4" />
                  <span>Zero Data Loss</span>
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
          className="w-full max-w-[632px] flex flex-col items-center gap-9 z-10"
        >
          {/* Logo (Frame 2147239120) */}
          <Link href="/" className="transition-transform hover:scale-105">
            <CurioLogo size="lg" />
          </Link>

          {/* Form Header Title */}
          <div className="w-full text-center">
            <h1 className="text-3xl sm:text-[36px] font-medium text-white tracking-[-0.02em] leading-[130%]">
              Forget Password
            </h1>
          </div>

          {/* Fields Box (Figma Frame 2147239117 / Fields Container - 632px width) */}
          <div className="w-full relative rounded-[12px] bg-[#151628] border-b border-l border-r border-t-0 border-[#383850] shadow-[0px_16px_50px_#0E011D] p-6 sm:p-6 flex flex-col gap-6 overflow-hidden">
            {/* Ellipse 47056 Background Blur Glow (208x43, top 138px, left 220px, blur 75px) */}
            <div
              className="absolute pointer-events-none w-[208px] h-[43px] left-[220px] top-[138px] rounded-full opacity-70"
              style={{
                background: "linear-gradient(89.44deg, #2563EB -47.4%, #7A3BED 76.5%, #A842D4 101.93%)",
                filter: "blur(75px)",
              }}
            />

            <AnimatePresence mode="wait">
              {/* STEP 1: Enter Email & Validate */}
              {step === "email" && (
                <motion.form
                  key="email-step"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleSendOTP}
                  noValidate
                  className="relative z-10 flex flex-col gap-6"
                >
                  {/* Name Fields Container / Email Field Container */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white text-base font-medium font-['Lato',sans-serif] leading-[150%]">
                      Email
                    </label>

                    {/* fill up button */}
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        placeholder="jonsnow464@gmail.com"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full h-12 px-4 pr-12 rounded-lg bg-[#27273F] border ${
                          emailError ? "border-[#FF5B5B]" : "border-[#383850]"
                        } text-[#D0D0D0] placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all font-['Lato',sans-serif]`}
                      />
                      {/* material-symbols:mail-rounded icon */}
                      <div className="absolute right-4 pointer-events-none text-[#B5C8DB]">
                        <Mail className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Figma *Wrong email address* Error Message */}
                    {emailError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#FF5B5B] text-base font-normal font-['Lato',sans-serif] leading-[150%] pt-1 flex items-center gap-1.5"
                      >
                        <span>{emailError}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Button Container (Frame 2147239930: Back + Primary Send OTP) */}
                  <div className="flex flex-row items-center gap-6 mt-0">
                    {/* Back Button (Frame 2147239918 - width: 280px, height: 44px) */}
                    <button
                      type="button"
                      onClick={() => router.push(fromAdmin ? "/admin/login" : "/login")}
                      className="flex-1 h-[44px] rounded-lg bg-white/20 hover:bg-white/30 active:scale-[0.99] text-white font-semibold text-base font-['Lato',sans-serif] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    {/* Primary Button (Send Email - width: 280px, height: 46px) */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-[46px] rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-base font-['Lato',sans-serif] transition-all shadow-md shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Email</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 2: Verify OTP Code */}
              {step === "otp" && (
                <motion.form
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerifyOTP}
                  className="relative z-10 flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-white text-base font-medium font-['Lato',sans-serif]">
                        Enter 6-Digit OTP
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setStep("email");
                          setEmailError(null);
                        }}
                        className="text-xs text-purple-400 hover:text-purple-300 underline"
                      >
                        Change Email
                      </button>
                    </div>
                    <p className="text-sm text-[#D0D0D0]">
                      We sent a verification code to <span className="text-white font-medium">{email}</span>
                    </p>

                    {/* OTP 6-Digit Input Row */}
                    <div className="flex items-center justify-between gap-2 sm:gap-3 mt-3">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpInputsRef.current[idx] = el;
                          }}
                          type="text"
                          maxLength={1}
                          inputMode="numeric"
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className={`w-11 sm:w-14 h-12 text-center text-xl font-bold rounded-lg bg-[#27273F] border ${
                            otpError ? "border-[#FF5B5B]" : "border-[#383850]"
                          } text-white focus:border-[#7A3BED] focus:ring-2 focus:ring-[#7A3BED]/40 outline-none transition-all`}
                        />
                      ))}
                    </div>

                    {otpError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#FF5B5B] text-base font-normal font-['Lato',sans-serif] pt-1"
                      >
                        {otpError}
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between pt-2 text-sm text-[#D0D0D0]">
                      <span>Didn&apos;t receive code?</span>
                      {resendTimer > 0 ? (
                        <span className="text-purple-400 font-medium">Resend in {resendTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setResendTimer(30);
                            setOtp(["", "", "", "", "", ""]);
                          }}
                          className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Resend OTP</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-row items-center gap-6 mt-0">
                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="flex-1 h-[44px] rounded-lg bg-white/20 hover:bg-white/30 active:scale-[0.99] text-white font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-[46px] rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-base transition-all shadow-md shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Verify OTP</span>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 3: Create New Password */}
              {step === "new_password" && (
                <motion.form
                  key="password-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleResetPassword}
                  className="relative z-10 flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-white text-base font-medium font-['Lato',sans-serif]">
                      New Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-4 pr-12 rounded-lg bg-[#27273F] border border-[#383850] text-white placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all font-['Lato',sans-serif]"
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

                  <div className="flex flex-col gap-1">
                    <label className="text-white text-base font-medium font-['Lato',sans-serif]">
                      Confirm New Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 px-4 pr-12 rounded-lg bg-[#27273F] border border-[#383850] text-white placeholder-[#D0D0D0]/40 text-base outline-none focus:border-[#7A3BED] focus:ring-1 focus:ring-[#7A3BED] transition-all font-['Lato',sans-serif]"
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

                  {passwordError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[#FF5B5B] text-base font-normal font-['Lato',sans-serif]"
                    >
                      {passwordError}
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-row items-center gap-6 mt-1">
                    <button
                      type="button"
                      onClick={() => setStep("otp")}
                      className="flex-1 h-[44px] rounded-lg bg-white/20 hover:bg-white/30 active:scale-[0.99] text-white font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-[46px] rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-base transition-all shadow-md shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Reset Password</span>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 4: Success Message State */}
              {step === "success" && (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 flex flex-col items-center text-center gap-5 py-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold text-white">Password Reset Successfully!</h3>
                    <p className="text-[#D0D0D0] text-sm max-w-sm">
                      Your password for <span className="text-white font-medium">{email}</span> has been updated. You can now log in with your new password.
                    </p>
                  </div>

                  <Link
                    href={
                      fromAdmin
                        ? `/admin/login?reset=true&email=${encodeURIComponent(email)}`
                        : `/login?reset=true&email=${encodeURIComponent(email)}`
                    }
                    className="w-full h-11 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:brightness-110 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-900/40 mt-2"
                  >
                    {fromAdmin ? "Proceed to Admin Log In" : "Proceed to Log In"}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#0F172A]" />}>
      <ForgotPasswordForm />
    </Suspense>
  );
}

