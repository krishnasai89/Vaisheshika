"use client";

import React from "react";
import { Cpu, GitCommit, ShieldAlert } from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-900 bg-neutral-950/40 backdrop-blur-sm mt-32 font-mono text-[10px] tracking-wider text-neutral-500 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left column: Architecture Parameter Registry */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-neutral-400 font-bold uppercase">
            <Cpu size={12} className="text-amber-500" />
            Paramāṇu Realism Engine
          </div>
          <p className="text-neutral-600 leading-relaxed font-sans text-xs max-w-xs mx-auto md:mx-0">
            Mapping out the pluralistic mechanical mechanics of classical Indian
            physics models.
          </p>
        </div>

        {/* Center column: Live System Log Counters */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-4 border border-neutral-900 bg-neutral-950/60 rounded-full px-4 py-1.5">
            <span className="flex items-center gap-1">
              <GitCommit size={10} className="text-emerald-500 animate-pulse" />{" "}
              Live API
            </span>
            <span className="text-neutral-700">|</span>
            <span
              className="text-neutral-400 hover:text-amber-400 cursor-pointer transition-colors"
              onClick={() =>
                toastSystem.emit(
                  "Telemetry structural loops stable.",
                  "success",
                )
              }
            >
              Vercel Core Sync
            </span>
          </div>
        </div>

        {/* Right column: Copyright and Schema References */}
        <div className="text-center md:text-right space-y-1">
          <div>© 2026 ONTOLOGY DEPLOYMENT FRAMEWORK</div>
          <div className="text-neutral-600 font-serif italic text-xs">
            Ruthless analytical clarity leads to liberation.
          </div>
        </div>
      </div>
    </footer>
  );
}
