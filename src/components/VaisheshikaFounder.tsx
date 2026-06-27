"use client";

import React, { useEffect, useState } from "react";
import { User, Sparkles, Shield, Bookmark, ExternalLink } from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

interface Contribution {
  title: string;
  description: string;
}

interface FounderData {
  name: string;
  aliases: string[];
  historicalEra: string;
  birthplaceRegion: string;
  summary: string;
  etymologyLegend: {
    title: string;
    narrative: string;
    keyTerm: string;
    definition: string;
  };
  coreContributions: Contribution[];
  historicalEvolution: {
    title: string;
    description: string;
  };
  references: Array<{ label: string; url: string }>;
}

export default function VaisheshikaFounder() {
  const [founder, setFounder] = useState<FounderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFounder() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://vaisheshikaapi.vercel.app/api/founder",
        );
        if (!res.ok) throw new Error("Failed to query founder telemetry");
        const data = await res.json();
        setFounder(data);
        toastSystem.emit(
          "Sage Kaṇāda data profile mapped successfully.",
          "success",
        );
      } catch (err) {
        console.error(err);
        toastSystem.emit(
          "Handshake delayed. Rendering fallback founder model.",
          "info",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchFounder();
  }, []);

  if (loading || !founder) {
    return (
      <div className="w-full max-w-6xl mx-auto my-12 animate-pulse space-y-6">
        <div className="h-8 bg-neutral-900 rounded w-1/3" />
        <div className="h-48 bg-neutral-900 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-24 px-4 space-y-8">
      {/* Master Profile Header */}
      <div className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest mb-1">
            <User size={14} /> Founder Node Profile
          </div>
          <h2 className="text-3xl font-black tracking-tight text-neutral-100 uppercase">
            {founder.name}
          </h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {founder.aliases.map((alias, i) => (
              <span
                key={i}
                className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-md"
              >
                {alias}
              </span>
            ))}
          </div>
        </div>

        <div className="text-left md:text-right font-mono text-xs text-neutral-500 space-y-1">
          <div>
            <span className="text-neutral-400">ERA:</span>{" "}
            {founder.historicalEra}
          </div>
          <div>
            <span className="text-neutral-400">ORIGIN:</span>{" "}
            {founder.birthplaceRegion}
          </div>
        </div>
      </div>

      {/* Main Grid Layout: Legend vs Contributions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Legend Narrative Screen (Spans 5 cols) */}
        <div className="lg:col-span-5 bg-neutral-950 p-6 border border-neutral-900 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-amber-500" size={16} />
              <h3 className="text-sm font-mono uppercase font-bold text-neutral-300">
                {founder.etymologyLegend.title}
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans italic">
              "{founder.etymologyLegend.narrative}"
            </p>
          </div>

          <div className="mt-8 p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl">
            <span className="text-[10px] font-mono text-amber-500 block uppercase tracking-wider">
              Etymological Root: {founder.etymologyLegend.keyTerm}
            </span>
            <p className="text-xs text-neutral-300 mt-1 font-mono">
              {founder.etymologyLegend.definition}
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Contribution Bento (Spans 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-neutral-900/20 border border-neutral-800 rounded-2xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
              Historical Synopsis
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {founder.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {founder.coreContributions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl flex flex-col justify-between hover:border-neutral-800 transition-colors cursor-pointer group"
                onClick={() =>
                  toastSystem.emit(
                    `Loading: ${item.title} methodology.`,
                    "info",
                  )
                }
              >
                <div>
                  <span className="font-mono text-[10px] text-amber-500 block mb-2">
                    0{idx + 1}.
                  </span>
                  <h4 className="text-xs font-bold text-neutral-200 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Fusion History and External References */}
        <div className="lg:col-span-12 p-6 bg-neutral-900/30 border border-neutral-800 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-3 space-y-1">
            <h4 className="text-sm font-bold text-neutral-200 flex items-center gap-2">
              <Shield size={14} className="text-amber-500" />
              {founder.historicalEvolution.title}
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {founder.historicalEvolution.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:border-l border-neutral-800 md:pl-6">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
              References
            </span>
            {founder.references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
              >
                <Bookmark size={10} /> {ref.label} <ExternalLink size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
