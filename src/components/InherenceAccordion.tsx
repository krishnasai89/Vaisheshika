"use client";

import React, { useState } from "react";
import { ChevronDown, Link2, GitCommit, HelpCircle } from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

interface AccordionItem {
  id: string;
  title: string;
  sanskrit: string;
  content: string;
}

const inherenceData: AccordionItem[] = [
  {
    id: "parts",
    title: "Whole and its Parts",
    sanskrit: "Avayava & Avayavī",
    content:
      "The relationship holding a physical object together with its atomic parts. The cloth inherently resides within the threads; they cannot be separated without destroying the whole entity.",
  },
  {
    id: "qualities",
    title: "Substance and Quality",
    sanskrit: "Dravya & Guṇa",
    content:
      "Qualities cannot float independently in mid-air. The color of a leaf or the heat of a fire inherently belongs to that specific substance via Samavāya.",
  },
  {
    id: "actions",
    title: "Substance and Action",
    sanskrit: "Dravya & Karma",
    content:
      "Movement cannot exist without a physical object carrying out that motion. The action of flying inherently resides in the bird.",
  },
];

export default function InherenceAccordion() {
  const [openId, setOpenId] = useState<string | null>("parts");

  const toggleAccordion = (id: string, title: string) => {
    setOpenId(openId === id ? null : id);
    if (openId !== id) {
      toastSystem.emit(`Inspecting structural link: ${title}`, "info");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Decorative Branding Sidebar Block */}
      <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-900 flex flex-col justify-between">
        <div>
          <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest block mb-1">
            Category 06
          </span>
          <h3 className="text-xl font-bold text-neutral-200">Samavāya</h3>
          <h4 className="text-xs font-serif italic text-neutral-500 mt-0.5">
            Inherence Relationship
          </h4>
          <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
            The eternal, inseparable relationship that binds properties,
            actions, and parts directly to their host substances.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-900">
          <Link2 className="text-amber-500 animate-pulse" size={14} />
          <span className="font-mono text-[10px] text-neutral-500">
            Inseparable Bond Matrix
          </span>
        </div>
      </div>

      {/* Accordion Component List Block */}
      <div className="md:col-span-2 space-y-3">
        {inherenceData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="bg-neutral-950/60 border border-neutral-900 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(item.id, item.title)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-900/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GitCommit
                    size={16}
                    className={isOpen ? "text-amber-500" : "text-neutral-600"}
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-200">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-tight">
                      {item.sanskrit}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-500" : ""}`}
                />
              </button>

              {/* Collapsible content wrapper */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 border-t border-neutral-900/60" : "max-h-0"
                }`}
              >
                <p className="p-4 text-xs text-neutral-400 leading-relaxed bg-neutral-950/20">
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
