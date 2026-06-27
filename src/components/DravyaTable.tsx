"use client";

import React, { useState } from "react";
import { Layers, ShieldCheck, HelpCircle } from "lucide-react";

interface DravyaItem {
  name: string;
  sanskrit: string;
  type: "Physical" | "Non-Physical";
  nature: "Eternal" | "Non-Eternal" | "Both";
  description: string;
}

const dravyaData: DravyaItem[] = [
  {
    name: "Earth",
    sanskrit: "Pṛthivī",
    type: "Physical",
    nature: "Both",
    description:
      "Atomic form is eternal; composite physical formations are transient. Possesses quality of smell.",
  },
  {
    name: "Water",
    sanskrit: "Āpas",
    type: "Physical",
    nature: "Both",
    description:
      "Atomic form is eternal; composite water bodies are transient. Possesses quality of taste.",
  },
  {
    name: "Fire",
    sanskrit: "Tejas",
    type: "Physical",
    nature: "Both",
    description:
      "Atomic form is eternal; manifestation as heat/light is transient. Possesses quality of color.",
  },
  {
    name: "Air",
    sanskrit: "Vāyu",
    type: "Physical",
    nature: "Both",
    description:
      "Atomic form is eternal; kinetic atmospheric wind is transient. Possesses quality of touch.",
  },
  {
    name: "Ether",
    sanskrit: "Ākāśa",
    type: "Physical",
    nature: "Eternal",
    description:
      "Infinitive, all-pervading substratum. The unique locus of sound wave properties.",
  },
  {
    name: "Time",
    sanskrit: "Kāla",
    type: "Non-Physical",
    nature: "Eternal",
    description:
      "Single, objective structure that enables the perception of past, present, future, and sequence.",
  },
  {
    name: "Space",
    sanskrit: "Dik",
    type: "Non-Physical",
    nature: "Eternal",
    description:
      "The absolute coordinate framework enabling orientation (East, West, proximity, distance).",
  },
  {
    name: "Self / Soul",
    sanskrit: "Ātman",
    type: "Non-Physical",
    nature: "Eternal",
    description:
      "The pervasive substratum of consciousness, experiences, desire, cognition, and volition.",
  },
  {
    name: "Mind",
    sanskrit: "Manas",
    type: "Non-Physical",
    nature: "Eternal",
    description:
      "Atomic, internal organ of perception. Acts as a gatekeeper processing singular thoughts.",
  },
];

export default function DravyaTable() {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Physical" | "Non-Physical"
  >("All");

  const filteredData = dravyaData.filter((item) =>
    activeFilter === "All" ? true : item.type === activeFilter,
  );

  return (
    <div className="w-full max-w-6xl mx-auto my-24 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-neutral-800/60">
        <div>
          <h3 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
            <Layers className="text-amber-500" size={20} />
            The 9 Dravyas (Substances)
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Taxonomy classification of the fundamental ontological substratums
            of existence.
          </p>
        </div>

        {/* Filter Chips UI */}
        <div className="flex gap-2 bg-neutral-950 p-1 rounded-lg border border-neutral-800 self-start sm:self-auto">
          {(["All", "Physical", "Non-Physical"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                activeFilter === filter
                  ? "bg-amber-500 text-black font-semibold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive SaaS Matrix Table Layout */}
      <div className="overflow-x-auto rounded-xl border border-neutral-800/80 bg-neutral-950/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-950/80 border-b border-neutral-800 font-mono text-xs text-neutral-400">
              <th className="p-4">Substance</th>
              <th className="p-4">Sanskrit Name</th>
              <th className="p-4">Classification</th>
              <th className="p-4">Temporal Nature</th>
              <th className="p-4 hidden md:table-cell">
                Ontological Definition
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900 text-sm">
            {filteredData.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-neutral-900/30 transition-colors group"
              >
                {/* Name */}
                <td className="p-4 font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                  {item.name}
                </td>

                {/* Sanskrit */}
                <td className="p-4 font-serif italic text-neutral-400">
                  {item.sanskrit}
                </td>

                {/* Classification Badge */}
                <td className="p-4">
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md ${
                      item.type === "Physical"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>

                {/* Temporal Nature */}
                <td className="p-4">
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md ${
                      item.nature === "Eternal"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {item.nature}
                  </span>
                </td>

                {/* Description */}
                <td className="p-4 text-xs text-neutral-400 max-w-sm hidden md:table-cell leading-relaxed">
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
