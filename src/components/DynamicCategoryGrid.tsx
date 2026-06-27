"use client";

import React, { useEffect, useState } from "react";
import { Layers, RefreshCw, Cpu } from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

interface CategoryItem {
  _id?: string;
  id?: string;
  name: string;
  sanskritName: string;
  description: string;
}

export default function DynamicCategoryGrid() {
  const [data, setData] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://vaisheshikaapi.vercel.app/api/categories",
        );
        if (!res.ok) throw new Error("API server handshake failed");
        const categories = await res.json();
        setData(categories);
        toastSystem.emit(
          "Ontological categories successfully pulled from Vercel sync.",
          "success",
        );
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        // Fallback local structures if API endpoint is sleeping
        setData([
          {
            name: "Generality",
            sanskritName: "Sāmānya",
            description:
              "The eternal, common essence that unifies multiple individuals into a single class or genus.",
          },
          {
            name: "Particularity",
            sanskritName: "Viśeṣa",
            description:
              "The unique, ultimate differentiating characteristic inherent in eternal substances like individual atoms.",
          },
          {
            name: "Inherence",
            sanskritName: "Samavāya",
            description:
              "The permanent, inseparable relationship binding properties and attributes to their underlying substances.",
          },
        ]);
        toastSystem.emit(
          "API offline. Initialized localized baseline telemetry nodes.",
          "info",
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Structural Skeleton Loader Component
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto my-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-neutral-900/60 border border-neutral-900 rounded-2xl h-48 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-4 bg-neutral-800 rounded w-1/3" />
              <div className="h-6 bg-neutral-800 rounded w-2/3" />
              <div className="h-3 bg-neutral-800 rounded w-full" />
            </div>
            <div className="h-3 bg-neutral-800 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-2">
      {/* Live Data Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Cpu className="text-amber-500" size={16} />
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
            Real-time API Endpoint Query
          </span>
        </div>
        {error && (
          <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Fallback Active
          </span>
        )}
      </div>

      {/* Grid Node Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((category, index) => (
          <div
            key={category.id || index}
            className="p-6 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl backdrop-blur-md flex flex-col justify-between hover:border-neutral-700/60 transition-colors group cursor-pointer"
            onClick={() =>
              toastSystem.emit(
                `Querying sub-attributes for ${category.name}...`,
                "info",
              )
            }
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-neutral-200 group-hover:text-amber-400 transition-colors">
                  {category.name}
                </h4>
                <Layers
                  className="text-neutral-600 group-hover:text-neutral-400 transition-colors"
                  size={16}
                />
              </div>
              <h5 className="text-xs font-serif italic text-neutral-500 mb-3">
                {category.sanskritName}
              </h5>
              <p className="text-neutral-400 text-xs leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-900 flex justify-between items-center text-[10px] font-mono text-neutral-500">
              <span>PADĀRTHA DATA</span>
              <span className="group-hover:text-neutral-300">READ →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
