"use client";
import React from "react";
import Image from "next/image";
import { Cpu, Headphones } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-16 mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-[1.2] tracking-[-0.02em] shrink-0">
          How It Works
        </h2>
        <p className="text-[#D0D0D0] text-lg sm:text-xl lg:text-[24px] leading-[150%] tracking-[-0.03em] max-w-[660px]">
          Follow your favorite creators and track new uploads automatically. Our AI analyzes videos and extracts the key insights instantly. Listen to concise audio briefings anytime, anywhere.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Card 1: Follow your favourite creators (Wide - 6 cols or 630px equivalent) */}
        <div className="lg:col-span-6 rounded-2xl bg-figma-card border border-white/20 p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-lg shadow-indigo-950/40 min-h-[334px] group">
          {/* Card Content */}
          <div className="relative z-10 max-w-[340px] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-[52px] h-[52px] shrink-0 rounded-xl overflow-hidden flex items-center justify-center shadow-md shadow-purple-900/40">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="52" height="52" rx="12" fill="url(#paint0_linear_9088_28167)"/>
                  <g clipPath="url(#clip0_9088_28167)">
                    <path d="M17.5342 19.2842C17.5342 16.1725 20.0553 13.6514 23.1725 13.6514C26.2842 13.6514 28.8053 16.1725 28.8053 19.2896C28.8053 22.4014 26.2842 24.9225 23.167 24.9225C20.0607 24.917 17.5396 22.3959 17.5342 19.2842Z" fill="#FEFEFE"/>
                    <path d="M34.3453 36.5707C34.3453 37.5551 33.5523 38.348 32.568 38.348H13.7773C12.793 38.348 12 37.5496 12 36.5707C12 31.0855 16.4625 26.623 21.9477 26.623H24.3977C29.8828 26.6285 34.3453 31.091 34.3453 36.5707Z" fill="#FEFEFE"/>
                    <path d="M38.2229 22.4504H36.2924V20.52C36.2596 19.541 35.4338 18.77 34.4549 18.8028C33.5198 18.8356 32.7705 19.5848 32.7377 20.52V22.4504H30.8073C29.8284 22.4176 29.0026 23.1832 28.9698 24.1676C28.937 25.1465 29.7026 25.9723 30.687 26.0051H30.8127H32.7432V27.9356C32.7104 28.9145 33.476 29.7403 34.4604 29.7731C35.4393 29.8059 36.2651 29.0403 36.2979 28.0559C36.2979 28.0121 36.2979 27.9739 36.2979 27.9301V26.0051H38.2284C39.2073 26.0379 40.033 25.2723 40.0659 24.2879C40.0987 23.3035 39.333 22.4832 38.3487 22.4504C38.3049 22.4559 38.2612 22.4559 38.2229 22.4504Z" fill="#FEFEFE"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_9088_28167" x1="-24.5753" y1="84.2174" x2="53.824" y2="83.4569" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB"/>
                      <stop offset="0.829694" stopColor="#7A3BED"/>
                      <stop offset="1" stopColor="#A842D4"/>
                    </linearGradient>
                    <clipPath id="clip0_9088_28167">
                      <rect width="28" height="28" fill="white" transform="translate(12 12)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">
                Follow your favourite creators in youtube
              </h3>
            </div>
            <p className="text-[#D0D0D0] text-base sm:text-lg leading-[150%] font-normal">
              Stay connected with the creators you trust the most. 
Never miss new uploads from your favorite 
channels. All your content, organized 
in one smart place.
            </p>
          </div>

          {/* Right Circular Asset Artwork */}
          <div className="mt-6 lg:mt-0 lg:absolute -right-8 -bottom-8 w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(43,127,255,0.3)] bg-gradient-to-tr from-[#181F40] to-[#2B2A7D] self-end group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/creators.png"
              alt="Follow Favorite Creators"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        {/* Card 2: AI Analysis (3 cols or 305px equivalent) */}
        <div className="lg:col-span-3 rounded-2xl bg-figma-card border border-white/20 p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative shadow-lg shadow-indigo-950/40 min-h-[334px] group">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-[52px] h-[52px] shrink-0 rounded-xl overflow-hidden flex items-center justify-center shadow-md shadow-purple-900/40">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_9088_28176)">
                    <rect width="52" height="52" rx="12" fill="url(#paint0_linear_9088_28176)"/>
                    <path d="M29.9 25.4647C29.756 24.8752 29.456 24.3218 29 23.8526C28.328 23.1789 27.44 22.8421 26.468 22.8421C25.52 22.8541 24.632 23.2391 23.948 23.9128C22.544 25.3323 22.52 27.594 23.888 28.9774C24.344 29.4226 24.896 29.7353 25.496 29.8797L32.048 36.4481C32.636 37.0376 33.416 37.3624 34.244 37.3624C35.072 37.3624 35.852 37.0376 36.452 36.4481L36.488 36.412C37.052 35.8226 37.364 35.0526 37.364 34.2346C37.364 33.4165 37.04 32.6105 36.452 32.0211L29.9 25.4647ZM25.424 27.0526C25.16 26.6195 25.244 26.018 25.652 25.6211C25.88 25.3805 26.192 25.2481 26.504 25.2481H26.528C26.732 25.2481 26.912 25.2962 27.068 25.4045C27.152 25.4406 27.224 25.4887 27.296 25.5609C27.74 25.994 27.704 26.7398 27.236 27.209C27.008 27.4496 26.696 27.582 26.384 27.582C26.072 27.594 25.796 27.4737 25.592 27.2692C25.52 27.209 25.472 27.1368 25.424 27.0526ZM34.748 34.7399C34.748 34.7399 34.736 34.7519 34.736 34.7639C34.46 35.0165 34.004 35.0045 33.74 34.7399L28.376 29.3624C28.58 29.2421 28.76 29.0857 28.94 28.9173C29.108 28.7489 29.264 28.5564 29.396 28.3639L34.748 33.7293C34.892 33.8617 34.964 34.0421 34.964 34.2346C34.964 34.4271 34.892 34.6075 34.748 34.7399Z" fill="#FEFEFE"/>
                    <path d="M17.516 22.4451L18.92 25.2962C19.124 25.7053 19.544 25.9699 20 25.9699C20.456 25.9699 20.876 25.7053 21.08 25.2962L22.484 22.4451L25.328 21.0376C25.736 20.8331 26 20.412 26 19.9549C26 19.4977 25.736 19.0767 25.328 18.8722L22.484 17.4647L21.08 14.6135C20.672 13.7955 19.328 13.7955 18.92 14.6135L17.516 17.4647L14.672 18.8722C14.264 19.0767 14 19.4977 14 19.9549C14 20.412 14.264 20.8331 14.672 21.0376L17.516 22.4451ZM18.944 19.4496C19.184 19.3293 19.376 19.1368 19.496 18.8962L20 17.8617L20.504 18.8962C20.624 19.1368 20.816 19.3293 21.056 19.4496L22.088 19.9549L21.056 20.4602C20.816 20.5805 20.624 20.7729 20.504 21.0135L20 22.0481L19.496 21.0135C19.376 20.7729 19.184 20.5805 18.944 20.4602L17.912 19.9549L18.944 19.4496Z" fill="#FEFEFE"/>
                    <path d="M37.328 19.4737L34.88 18.2707L33.68 15.8165C33.272 14.9985 31.928 14.9985 31.52 15.8165L30.32 18.2707L27.872 19.4737C27.464 19.6782 27.2 20.0992 27.2 20.5564C27.2 21.0135 27.464 21.4346 27.872 21.6391L30.32 22.8421L31.52 25.2962C31.724 25.7053 32.144 25.9699 32.6 25.9699C33.056 25.9699 33.476 25.7053 33.68 25.2962L34.88 22.8421L37.328 21.6391C37.736 21.4346 38 21.0135 38 20.5564C38 20.0992 37.736 19.6782 37.328 19.4737ZM33.452 20.8692C33.224 20.9895 33.032 21.182 32.912 21.4105L32.6 22.0481L32.288 21.4105C32.168 21.182 31.976 20.9895 31.748 20.8692L31.112 20.5564L31.748 20.2436C31.976 20.1233 32.168 19.9308 32.288 19.7023L32.6 19.0647L32.912 19.7023C33.032 19.9308 33.224 20.1233 33.452 20.2436L34.088 20.5564L33.452 20.8692Z" fill="#FEFEFE"/>
                    <path d="M24.716 31.5038L22.268 30.3008L21.056 27.8466C20.66 27.0286 19.304 27.0286 18.908 27.8466L17.696 30.3008L15.248 31.5038C14.84 31.7083 14.588 32.1293 14.588 32.5865C14.588 33.0436 14.84 33.4647 15.248 33.6692L17.696 34.8722L18.908 37.3263C19.112 37.7353 19.52 38 19.988 38C20.456 38 20.852 37.7353 21.056 37.3263L22.268 34.8722L24.716 33.6692C25.124 33.4647 25.388 33.0436 25.388 32.5865C25.388 32.1293 25.124 31.7083 24.716 31.5038ZM20.84 32.8992C20.6 33.0195 20.408 33.212 20.3 33.4406L19.988 34.0782L19.676 33.4406C19.556 33.212 19.364 33.0195 19.124 32.8992L18.5 32.5865L19.124 32.2737C19.364 32.1534 19.556 31.9609 19.676 31.7323L19.988 31.0947L20.3 31.7323C20.408 31.9609 20.6 32.1534 20.84 32.2737L21.464 32.5865L20.84 32.8992Z" fill="#FEFEFE"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_9088_28176" x1="-24.5753" y1="84.2174" x2="53.824" y2="83.4569" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB"/>
                      <stop offset="0.829694" stopColor="#7A3BED"/>
                      <stop offset="1" stopColor="#A842D4"/>
                    </linearGradient>
                    <clipPath id="clip0_9088_28176">
                      <rect width="52" height="52" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">
                AI Analysis
              </h3>
            </div>
            <p className="text-[#D0D0D0] text-base leading-[150%] font-normal">
              Our AI processes the video and extracts key insights and takeaways
            </p>
          </div>

          {/* Artwork Illustration at Bottom */}
          <div className="relative w-full h-36 mt-4 rounded-xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/analysis.png"
              alt="AI Analysis"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        {/* Card 3: Listen Anywhere (3 cols or 305px equivalent) */}
        <div className="lg:col-span-3 rounded-2xl bg-figma-card border border-white/20 p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative shadow-lg shadow-indigo-950/40 min-h-[334px] group">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-[52px] h-[52px] shrink-0 rounded-xl overflow-hidden flex items-center justify-center shadow-md shadow-purple-900/40">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="52" height="52" rx="12" fill="url(#paint0_linear_9088_28337)"/>
                  <g clipPath="url(#clip0_9088_28337)">
                    <path d="M27.5274 28.2688C27.5571 28.2863 27.5817 28.3112 27.5988 28.3411C27.6159 28.371 27.6249 28.4049 27.6249 28.4394C27.6249 28.4738 27.6159 28.5077 27.5988 28.5376C27.5817 28.5675 27.5571 28.5925 27.5274 28.61L25.3174 29.8856C25.2875 29.9019 25.254 29.9104 25.2199 29.9104C25.1858 29.9104 25.1523 29.9019 25.1224 29.8856C25.0928 29.868 25.0683 29.843 25.0513 29.8131C25.0342 29.7832 25.0251 29.7494 25.0249 29.715V27.1637C25.0251 27.1293 25.0342 27.0955 25.0513 27.0656C25.0683 27.0358 25.0928 27.0108 25.1224 26.9931C25.1535 26.9803 25.1864 26.972 25.2199 26.9688C25.2539 26.9691 25.2873 26.9775 25.3174 26.9931L27.5274 28.2688Z" fill="#FEFEFE"/>
                    <path d="M26 23.5625C25.0358 23.5625 24.0933 23.8484 23.2916 24.3841C22.4899 24.9198 21.8651 25.6811 21.4961 26.5719C21.1271 27.4627 21.0306 28.4429 21.2187 29.3886C21.4068 30.3342 21.8711 31.2029 22.5529 31.8846C23.2346 32.5664 24.1033 33.0307 25.0489 33.2188C25.9946 33.4069 26.9748 33.3104 27.8656 32.9414C28.7564 32.5724 29.5177 31.9476 30.0534 31.1459C30.5891 30.3442 30.875 29.4017 30.875 28.4375C30.874 27.1449 30.36 25.9055 29.446 24.9915C28.532 24.0775 27.2926 23.5635 26 23.5625ZM28.34 30.0138L26.13 31.2894C25.8533 31.4491 25.5395 31.5331 25.22 31.5331C24.9007 31.5321 24.5871 31.4481 24.31 31.2894C24.0325 31.1305 23.8021 30.901 23.6423 30.6241C23.4824 30.3472 23.3988 30.0328 23.4 29.7131V27.1619C23.4 26.8424 23.4841 26.5285 23.6438 26.2518C23.8035 25.9752 24.0333 25.7454 24.31 25.5856C24.5866 25.4259 24.9005 25.3418 25.22 25.3418C25.5395 25.3418 25.8533 25.4259 26.13 25.5856L28.34 26.8612C28.6167 27.021 28.8465 27.2507 29.0063 27.5274C29.166 27.8041 29.2501 28.118 29.2501 28.4375C29.2501 28.757 29.166 29.0709 29.0063 29.3476C28.8465 29.6243 28.6167 29.854 28.34 30.0138Z" fill="#FEFEFE"/>
                    <path d="M36.5625 18.6875H27.0156C26.8636 18.6867 26.7148 18.6437 26.5857 18.5634C26.4566 18.4831 26.3523 18.3685 26.2844 18.2325L24.8056 15.1856C24.6045 14.7748 24.2925 14.4285 23.9048 14.1859C23.5171 13.9432 23.0692 13.8139 22.6119 13.8125H15.4375C14.7916 13.8144 14.1727 14.0718 13.716 14.5285C13.2593 14.9852 13.0019 15.6041 13 16.25V35.75C13.0019 36.3959 13.2593 37.0148 13.716 37.4715C14.1727 37.9282 14.7916 38.1856 15.4375 38.1875H36.5625C37.2084 38.1856 37.8273 37.9282 38.284 37.4715C38.7407 37.0148 38.9981 36.3959 39 35.75V21.125C38.9981 20.4791 38.7407 19.8602 38.284 19.4035C37.8273 18.9468 37.2084 18.6894 36.5625 18.6875ZM26 34.9375C24.7144 34.9375 23.4577 34.5563 22.3888 33.8421C21.3199 33.1278 20.4868 32.1127 19.9948 30.9249C19.5028 29.7372 19.3741 28.4303 19.6249 27.1694C19.8757 25.9085 20.4948 24.7503 21.4038 23.8413C22.3128 22.9323 23.471 22.3132 24.7319 22.0624C25.9928 21.8116 27.2997 21.9403 28.4874 22.4323C29.6752 22.9243 30.6903 23.7574 31.4046 24.8263C32.1188 25.8952 32.5 27.1519 32.5 28.4375C32.4977 30.1607 31.8122 31.8127 30.5937 33.0312C29.3752 34.2497 27.7232 34.9352 26 34.9375Z" fill="#FEFEFE"/>
                    <path d="M38.1386 17.3713C37.6378 17.1685 37.1027 17.0636 36.5624 17.0625H27.5274L26.7393 15.4375H35.7499C36.309 15.4384 36.851 15.6308 37.2856 15.9827C37.7202 16.3345 38.0213 16.8245 38.1386 17.3713Z" fill="#FEFEFE"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_9088_28337" x1="-24.5753" y1="84.2174" x2="53.824" y2="83.4569" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB"/>
                      <stop offset="0.829694" stopColor="#7A3BED"/>
                      <stop offset="1" stopColor="#A842D4"/>
                    </linearGradient>
                    <clipPath id="clip0_9088_28337">
                      <rect width="26" height="26" fill="white" transform="translate(13 13)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">
                Listen Anywhere
              </h3>
            </div>
            <p className="text-[#D0D0D0] text-base leading-[150%] font-normal">
              Get an audio briefing you can 
listen to while commuting or working out.
            </p>
          </div>

          {/* Artwork Illustration at Bottom */}
          <div className="relative w-full h-36 mt-4 rounded-xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/audio.png"
              alt="Listen Anywhere"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
