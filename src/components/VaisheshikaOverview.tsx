"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Target,
  Layers,
  Cpu,
  HelpCircle,
  Activity,
} from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

// Interfaces mapping exactly to your live /api/overview payload
interface SectionItem {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
}

interface OverviewData {
  name: string;
  founder: string;
  era: string;
  coreConcept: string;
  sections: SectionItem[];
}

export default function VaisheshikaOverview() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOverview() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://vaisheshikaapi.vercel.app/api/overview",
        );
        if (!res.ok) throw new Error("Failed to query overview telemetry");
        const data = await res.json();
        setOverview(data);
        toastSystem.emit(
          "System metrics synchronized with live /api/overview schema.",
          "success",
        );
      } catch (err) {
        console.error(err);
        // Fallback containing your exact requested API dictionary payload
        setOverview({
          name: "Vaiśeṣika",
          founder: "Sage Kaṇāda (also known as Ulūka)",
          era: "c. 6th - 2nd Century BCE",
          coreConcept: "Pluralistic Realism & Atomism",
          sections: [
            {
              id: "what-is-it",
              title: "What is Vaiśeṣika Philosophy?",
              content:
                "Vaiśeṣika is one of the six orthodox (Āstika) schools of classical Indian philosophy. Its name is derived from 'Viśeṣa' (particularity). It asserts that the physical universe is entirely real, knowable, and independent of human consciousness, proposing a radical system of atomism where macro-matter is constructed from eternal point-particles called Paramāṇu.",
              bullets: [
                "Dravya (Substance): The 9 foundational elements of reality.",
                "Guṇa (Quality): Static, inherent properties like color or dimension.",
                "Karma (Action): Dynamic, transient physical motion.",
                "Sāmānya (Generality): Universal essence shared across a class.",
                "Viśeṣa (Particularity): The unique marker of eternal substances.",
                "Samavāya (Inherence): The inseparable structural bond.",
                "Abhāva (Non-existence): Observable states of absence or potentiality.",
              ],
            },
            {
              id: "why-read-it",
              title: "Why Read Vaiśeṣika Today?",
              content:
                "In a world split between reductive materialism and ungrounded mysticism, Vaiśeṣika balances physical mechanics with conscious realism. It functions as an antidote to cognitive noise, mapping out macro-physics (like fluid mechanics, thermal expansion, and capillary physics) to train the mind in ruthless analytical clarity, unlocking psychological liberation through pristine, uncorrupted knowledge.",
            },
            {
              id: "why-a-formal-school",
              title: "Why it is an Established Darśana (School)",
              content:
                "Vaiśeṣika satisfies the strict parameters of an orthodox classical Indian school by providing a comprehensive, rule-governed architecture across physics, epistemology, and ethics:",
              bullets: [
                "Vedic Alignment: Validates historical texts as accurate records of objective cosmic law (Dharma).",
                "Strict Two-Source Epistemology: Restricts valid evidence to Direct Perception (Pratyakṣa) and Invariant Inference (Anumāna).",
                "Radical Causation (Asatkāryavāda): Proves that every structural effect is a completely brand-new structural configuration.",
                "Moral Conservation (Adṛṣṭa): Maps an invisible potential energy ledger that balances physical states with ethical actions to drive the soul toward liberation.",
              ],
            },
          ],
        });
        toastSystem.emit(
          "Endpoint handshake delayed. Rendered internal configuration schema.",
          "info",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchOverview();
  }, []);

  if (loading || !overview) {
    return (
      <div className="w-full max-w-6xl mx-auto my-12 animate-pulse space-y-6">
        <div className="h-12 bg-neutral-900 rounded-xl w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-neutral-900 rounded-2xl md:col-span-2" />
          <div className="h-64 bg-neutral-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Extract sections directly from payload arrays
  const whatIsIt = overview.sections.find((s) => s.id === "what-is-it");
  const whyReadIt = overview.sections.find((s) => s.id === "why-read-it");
  const formalSchool = overview.sections.find(
    (s) => s.id === "why-a-formal-school",
  );

  return (
    <div className="w-full max-w-6xl mx-auto my-16 px-4 space-y-12">
      {/* Dynamic Telemetry Info Strips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "System Systemic Designation",
            val: overview.name,
            icon: <Cpu size={14} className="text-amber-500" />,
          },
          {
            label: "System Founder Node",
            val: overview.founder,
            icon: <Target size={14} className="text-neutral-400" />,
          },
          {
            label: "Historical Chronology Era",
            val: overview.era,
            icon: <Activity size={14} className="text-neutral-400" />,
          },
          {
            label: "Core Structural Concept",
            val: overview.coreConcept,
            icon: <Layers size={14} className="text-amber-500" />,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-4 bg-neutral-950/60 border border-neutral-900 rounded-xl flex flex-col justify-between"
          >
            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              {item.icon} {item.label}
            </span>
            <span className="text-xs font-mono font-bold text-neutral-200 mt-2 block break-words">
              {item.val}
            </span>
          </div>
        ))}
      </div>

      {/* Main Structural Bento Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Box 1: What is Vaisheshika Philosophy? (Spans 2 columns) */}
        {whatIsIt && (
          <div className="lg:col-span-2 p-8 bg-neutral-900/30 border border-neutral-800/80 rounded-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full inline-block mb-4">
                Core Manifest Matrix
              </span>
              <h3 className="text-2xl font-bold text-neutral-100 tracking-tight mb-4">
                {whatIsIt.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                {whatIsIt.content}
              </p>
            </div>

            {/* Sub-Atomic Bullet Categories Mapping */}
            <div className="mt-8 pt-6 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whatIsIt.bullets?.map((bullet, idx) => {
                const [title, desc] = bullet.split(":");
                return (
                  <div
                    key={idx}
                    className="p-3 bg-neutral-950/40 border border-neutral-900 rounded-xl hover:border-amber-500/20 transition-colors cursor-pointer group"
                    onClick={() =>
                      toastSystem.emit(
                        `Inspecting Objective Reality: ${title}`,
                        "atomic",
                      )
                    }
                  >
                    <span className="text-xs font-mono font-bold text-neutral-200 group-hover:text-amber-400 transition-colors block">
                      {title}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5 leading-normal">
                      {desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Box 2: Why Read it Today? */}
        {whyReadIt && (
          <div className="p-8 bg-neutral-900/30 border border-neutral-800/80 rounded-2xl backdrop-blur-md flex flex-col justify-between group hover:border-neutral-700/60 transition-colors">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-4">
                Modern Application Scope
              </span>
              <h3 className="text-xl font-bold text-neutral-100 tracking-tight mb-4 group-hover:text-amber-400 transition-colors">
                {whyReadIt.title}
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                {whyReadIt.content}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-900/60 text-[10px] font-mono text-neutral-500">
              ⚡ ANALYTICAL MECHANICS PROTOCOL
            </div>
          </div>
        )}

        {/* Box 3: Why it is an Established School (Spans complete bottom row width) */}
        {formalSchool && (
          <div className="lg:col-span-3 p-8 bg-neutral-950 border border-neutral-900 rounded-2xl">
            <div className="max-w-3xl mb-8">
              <h3 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
                <ShieldCheck className="text-amber-500" size={18} />
                {formalSchool.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {formalSchool.content}
              </p>
            </div>

            {/* Vertical Parametric Framework Lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {formalSchool.bullets?.map((bullet, idx) => {
                const [head, body] = bullet.split(":");
                return (
                  <div
                    key={idx}
                    className="p-4 bg-neutral-900/20 border border-neutral-900 rounded-xl space-y-1.5"
                  >
                    <h4 className="text-xs font-mono font-bold text-amber-500">
                      // {head}
                    </h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
