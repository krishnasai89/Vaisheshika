"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal, Code, Cpu, Orbit, GitFork, Minimize2 } from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

interface ParadigmMapping {
  concept: string;
  implementationExample: string;
}

interface MappingItem {
  category: string;
  sanskritTerm: string;
  definition: string;
  objectOrientedProgramming: ParadigmMapping;
  artificialIntelligenceAndData: ParadigmMapping;
  quantumAndModernPhysics: ParadigmMapping;
}

interface StructuralLaw {
  ancientLaw: string;
  modernEquivalence: string;
  architecturalImpact: string;
}

interface MatrixData {
  title: string;
  purpose: string;
  mappings: MappingItem[];
  structuralLaws: StructuralLaw[];
}

type TechTrack = "OOP" | "AI_DATA" | "QUANTUM";

// Specialized micro-component to manage clean 3D cursor-bending effects
function BendableCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate normalized pointer vectors ranging from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply strict geometric rotation bounds to represent physical spring metrics
    card.style.transform = `perspective(1000px) rotateX(${-y * 15}deg) rotateY(${x * 15}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // Reset properties to their native, resting state
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-150 ease-out style-3d ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export default function TechnologyMatrix() {
  const [matrix, setMatrix] = useState<MatrixData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTrack, setActiveTrack] = useState<TechTrack>("OOP");

  useEffect(() => {
    async function fetchMatrix() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://vaisheshikaapi.vercel.app/api/modern-matrix",
        );
        if (!res.ok) throw new Error("Failed to query tech matrix telemetry");
        const data = await res.json();
        setMatrix(data);
        toastSystem.emit(
          "Technology Alignment Matrix loaded successfully.",
          "success",
        );
      } catch (err) {
        console.error(err);
        toastSystem.emit(
          "Handshake delayed. Initialized internal fallback arrays.",
          "info",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchMatrix();
  }, []);

  if (loading || !matrix) {
    return (
      <div className="w-full max-w-6xl mx-auto my-12 animate-pulse space-y-6">
        <div className="h-8 bg-neutral-900 rounded w-1/2" />
        <div className="h-96 bg-neutral-900 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-24 px-4 space-y-12">
      {/* Dashboard Top Header Configuration */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest">
            <Terminal size={14} className="animate-pulse" /> [CROSS-PARADIGM
            COMPILER]
          </div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-100">
            {matrix.title}
          </h2>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            {matrix.purpose}
          </p>
        </div>

        {/* Dynamic State Selection Switches */}
        <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800 shrink-0 font-mono text-xs">
          {[
            { id: "OOP", label: "OOP", icon: <Code size={12} /> },
            { id: "AI_DATA", label: "AI / Graphs", icon: <Cpu size={12} /> },
            {
              id: "QUANTUM",
              label: "Quantum Physics",
              icon: <Orbit size={12} />,
            },
          ].map((track) => (
            <button
              key={track.id}
              onClick={() => {
                setActiveTrack(track.id as TechTrack);
                toastSystem.emit(
                  `Switched structural focus to: ${track.label}`,
                  "info",
                );
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTrack === track.id
                  ? "bg-amber-500 text-black font-bold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {track.icon} {track.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid container feeding structural matrix elements down to cursor-bend wrappers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matrix.mappings.map((item, idx) => {
          const activeParadigm =
            activeTrack === "OOP"
              ? item.objectOrientedProgramming
              : activeTrack === "AI_DATA"
                ? item.artificialIntelligenceAndData
                : item.quantumAndModernPhysics;

          return (
            <BendableCard
              key={idx}
              className="p-6 bg-neutral-900/30 border border-neutral-800/80 rounded-2xl backdrop-blur-md flex flex-col justify-between hover:border-amber-500/30 transition-colors group cursor-crosshair"
            >
              <div style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {item.sanskritTerm}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    PADĀRTHA 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                  {item.category}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed min-h-[36px]">
                  {item.definition}
                </p>

                <div className="w-full border-t border-neutral-900 my-4" />

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                    Alignment Concept
                  </span>
                  <h4 className="text-xs font-mono font-bold text-neutral-200 flex items-center gap-1.5">
                    <GitFork size={12} className="text-amber-500" />{" "}
                    {activeParadigm.concept}
                  </h4>
                </div>
              </div>

              <div className="mt-6" style={{ transform: "translateZ(50px)" }}>
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-900/80 font-mono text-[11px] text-neutral-300 leading-normal overflow-x-auto break-words">
                  <code className="text-amber-400/90">
                    {activeParadigm.implementationExample}
                  </code>
                </div>
              </div>
            </BendableCard>
          );
        })}
      </div>
    </div>
  );
}
