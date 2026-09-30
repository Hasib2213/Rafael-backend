"use client";

import React, { useState } from "react";
import Link from "next/link";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import Footer from "@/components/Footer";
import { Mail, CheckCircle2, Send, Phone, MapPin } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma: Side Panel - 240px x 806px) */}
      <FeedSidebar />

      {/* Center Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#0F172A]">
        {/* Top Navbar (Figma: Nav - height 80px, userSubtitle='abir07@gmai.com') */}
        <FeedNavbar showSearch={false} userSubtitle="abir07@gmai.com" />

        {/* Main Canvas Area (Figma Desktop - 10: Frame 2147227640 / Frame 2147227653) */}
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-10">
          {/* Contact Card Container (Figma Frame 2147227653: 1152px x 546px) */}
          <div className="w-full rounded-2xl p-6 sm:p-9 border border-white/20 shadow-[0px_1px_12px_rgba(0,0,0,0.05)] bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] flex flex-col gap-6">
            {/* Header: "Contact Us" (Figma Frame 2147227774 / Frame 2147239908) */}
            <div className="w-full border-b border-white/10 pb-4">
              <h1 className="text-white text-2xl sm:text-[28px] font-semibold font-['Lato',sans-serif] leading-[135%] tracking-[-0.02em]">
                Contact Us
              </h1>
            </div>

            {/* Split Row: Left Info & Right Form (Figma Frame 2147239921) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Contact Information (Figma Frame 2147225993: 337px width) */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full gap-6">
                <div className="flex flex-col gap-6">
                  {/* Heading & Subtitles (Figma Frame 2147225987) */}
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-white text-2xl sm:text-[28px] font-semibold font-['Lato',sans-serif] leading-[135%] tracking-[-0.02em]">
                      Contact Information
                    </h2>
                    <p className="text-[#D0D0D0] text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em] mt-1">
                      Reach us fast via phone, email, or address.
                    </p>
                    <p className="text-[#D0D0D0] text-base font-normal font-['Lato',sans-serif] leading-[150%] tracking-[-0.02em]">
                      We reply within 24 hours.
                    </p>
                  </div>

                  {/* Contact Methods (Figma Frame 2147225989) */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center text-[#B5C8DB]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <a
                        href="mailto:info@curio.com"
                        className="text-white hover:text-cyan-300 transition-colors text-base font-medium font-['Lato',sans-serif]"
                      >
                        info@curio.com
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center text-[#B5C8DB]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <a
                        href="tel:+8899036154"
                        className="text-white hover:text-cyan-300 transition-colors text-base font-medium font-['Lato',sans-serif]"
                      >
                        Whatsapp: +8899036154
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center text-[#B5C8DB]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-[#D0D0D0] text-base font-normal font-['Lato',sans-serif]">
                        Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Media Links (Figma Frame 2147239922: 44px x 44px buttons) */}
                <div className="flex items-center gap-4 pt-4">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Curio on Facebook"
                    className="w-11 h-11 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Curio on X"
                    className="w-11 h-11 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center text-white"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Curio on Instagram"
                    className="w-11 h-11 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Form (Figma Frame 2147226017: 624px width) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {isSuccess ? (
                  <div className="p-8 rounded-xl bg-white/10 border border-emerald-400/40 text-center flex flex-col items-center gap-3 animate-in fade-in duration-300">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                    <h3 className="text-xl font-semibold text-white">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-[#D0D0D0] max-w-md">
                      Thank you for contacting us. We will review your message and get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="mt-3 px-6 h-10 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-semibold transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Row 1: Name and Email (Figma Frame 1261156031: 624px width, gap 14.42px) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field (Figma Frame 162) */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-name"
                          className="text-white text-base font-medium font-['Lato',sans-serif] leading-[150%]"
                        >
                          Name
                        </label>
                        <div className="h-12 px-4 rounded-lg bg-white/20 border border-white/10 focus-within:border-white/40 focus-within:bg-white/25 transition-all flex items-center">
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Write here..."
                            className="w-full bg-transparent text-base text-white placeholder-[#D0D0D0] outline-none font-['Lato',sans-serif]"
                          />
                        </div>
                      </div>

                      {/* Email Field (Figma Frame 1261156030) */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-email"
                          className="text-white text-base font-medium font-['Lato',sans-serif] leading-[150%]"
                        >
                          Your email
                        </label>
                        <div className="h-12 px-4 rounded-lg bg-white/20 border border-white/10 focus-within:border-white/40 focus-within:bg-white/25 transition-all flex items-center">
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Write here..."
                            className="w-full bg-transparent text-base text-white placeholder-[#D0D0D0] outline-none font-['Lato',sans-serif]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Subject (Figma Frame 2147226018: 624px width) */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-subject"
                        className="text-white text-base font-medium font-['Lato',sans-serif] leading-[150%]"
                      >
                        Subject
                      </label>
                      <div className="h-12 px-4 rounded-lg bg-white/20 border border-white/10 focus-within:border-white/40 focus-within:bg-white/25 transition-all flex items-center">
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Write here..."
                          className="w-full bg-transparent text-base text-white placeholder-[#D0D0D0] outline-none font-['Lato',sans-serif]"
                        />
                      </div>
                    </div>

                    {/* Row 3: Your message (Figma Frame 2147226017: 624px width, height 106px) */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-message"
                        className="text-white text-base font-medium font-['Lato',sans-serif] leading-[150%]"
                      >
                        Your message
                      </label>
                      <div className="h-[106px] p-3 rounded-lg bg-white/20 border border-white/10 focus-within:border-white/40 focus-within:bg-white/25 transition-all">
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write here..."
                          className="w-full h-full resize-none bg-transparent text-base text-white placeholder-[#D0D0D0] outline-none font-['Lato',sans-serif] leading-relaxed custom-scrollbar"
                        />
                      </div>
                    </div>

                    {/* Submit Button (Figma: Primary button - 624px x 44px, gradient) */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 rounded-lg text-white font-semibold font-['Lato',sans-serif] text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 hover:brightness-110 active:scale-[0.99] transition-all bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] disabled:opacity-70 cursor-pointer select-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </main>

        {/* Standard Footer matching all other pages */}
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
