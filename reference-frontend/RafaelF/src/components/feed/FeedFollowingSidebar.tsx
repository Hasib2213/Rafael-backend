"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  subscribers: string;
  avatarColor: string;
  initials: string;
}

const channels: Channel[] = [
  {
    id: "1",
    name: "Motiversity",
    subscribers: "4.11M subscribers",
    avatarColor: "from-purple-600 to-indigo-600",
    initials: "M",
  },
  {
    id: "2",
    name: "Huberman Lab",
    subscribers: "5.82M subscribers",
    avatarColor: "from-blue-600 to-cyan-600",
    initials: "HL",
  },
  {
    id: "3",
    name: "Lex Fridman",
    subscribers: "4.29M subscribers",
    avatarColor: "from-zinc-700 to-zinc-900",
    initials: "LF",
  },
  {
    id: "4",
    name: "Ali Abdaal",
    subscribers: "5.45M subscribers",
    avatarColor: "from-emerald-500 to-teal-700",
    initials: "AA",
  },
  {
    id: "5",
    name: "TED Talks",
    subscribers: "24.1M subscribers",
    avatarColor: "from-red-600 to-rose-700",
    initials: "TED",
  },
  {
    id: "6",
    name: "Veritasium",
    subscribers: "16.3M subscribers",
    avatarColor: "from-amber-600 to-orange-700",
    initials: "V",
  },
  {
    id: "7",
    name: "Tom Bilyeu",
    subscribers: "3.98M subscribers",
    avatarColor: "from-indigo-600 to-violet-800",
    initials: "TB",
  },
];

export default function FeedFollowingSidebar() {
  return (
    <aside className="w-[239px] shrink-0 min-h-screen border-l border-white/20 p-4 hidden xl:flex flex-col gap-3 z-30 bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)]">
      {/* Section Heading (Figma Frame 2147228527) */}
      <div className="pb-2 border-b border-white/10">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white font-['Lato',sans-serif]">
          Following
        </h2>
      </div>

      {/* Channels List (Figma Frame 2147239865) */}
      <div className="flex flex-col gap-1.5 overflow-y-auto pr-1">
        {channels.map((channel) => (
          <button
            key={channel.id}
            type="button"
            className="w-full h-14 p-2 rounded-lg flex items-center justify-between gap-2 hover:bg-white/10 active:bg-white/20 transition-all text-left group select-none"
          >
            {/* Left: Avatar & Name */}
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Channel Avatar (Figma Ellipse 2) */}
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-tr ${channel.avatarColor} ring-1 ring-white/30 shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-sm`}
              >
                {channel.initials}
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-white truncate font-['Lato',sans-serif] group-hover:text-cyan-300 transition-colors">
                  {channel.name}
                </span>
                <span className="text-xs text-[#D0D0D0] truncate font-['Lato',sans-serif]">
                  {channel.subscribers}
                </span>
              </div>
            </div>

            {/* Right: Chevron (Figma Right/Arrow) */}
            <ChevronRight className="w-4 h-4 text-[#B5C8DB] group-hover:translate-x-0.5 group-hover:text-white transition-all shrink-0" />
          </button>
        ))}
      </div>
    </aside>
  );
}
