"use client";
import React from "react";
import Link from "next/link";
import CurioLogo from "./CurioLogo";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-figma-card rounded-t-[32px] sm:rounded-t-[48px] border-t border-white/20 mt-12 sm:mt-20 pt-16 sm:pt-20 pb-12 px-6 lg:px-20 text-white overflow-hidden shadow-2xl">
      <div className="max-w-[1280px] mx-auto space-y-16">
        {/* Top Row: Logo & Disclaimer vs Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand & Legal Disclaimer */}
          <div className="lg:col-span-8 space-y-6 max-w-2xl">
            <CurioLogo size="lg" />
            <p className="text-white text-base sm:text-lg lg:text-[19px] leading-[150%] font-medium">
              <span className="font-bold">Disclaimers:</span> This platform provides AI-generated summaries and audio briefings for informational purposes only. Content is derived from publicly available YouTube videos and remains the property of their respective creators.
            </p>
          </div>

          {/* Right Column: Contact & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:items-end">
            <div className="space-y-3 text-base sm:text-lg text-white font-normal lg:text-right">
              <p className="flex items-center gap-2.5 lg:justify-end">
                <Mail className="w-4 h-4 text-white/70" />
                <a href="mailto:info@curio.com" className="hover:underline">
                  info@curio.com
                </a>
              </p>
              <p className="flex items-center gap-2.5 lg:justify-end">
                <Phone className="w-4 h-4 text-white/70" />
                <a href="tel:+8899036154" className="hover:underline">
                  Whatsapp: +8899036154
                </a>
              </p>
              <p className="flex items-center gap-2.5 lg:justify-end">
                <MapPin className="w-4 h-4 text-white/70" />
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>

            {/* Social Icons matching Figma spec */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Curio on Facebook"
                className="w-11 h-11 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
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
                className="w-11 h-11 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
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
                className="w-11 h-11 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar: Copyright & Policy Links */}
        <div className="pt-8 border-t-2 border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-base font-medium text-white/90">
          <p>© 2025 - All rights Reserved</p>

          <div className="flex items-center gap-8 text-sm sm:text-base">
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
