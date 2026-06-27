"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Cpu, BookOpen, User, Activity } from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

type EndpointType = "overview" | "founder" | "chapters" | "matrix";

export default function ApiController() {
  const [activeTab, setActiveTab] = useState<EndpointType>("overview");
  const [payload, setPayload] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const endpoints: Record<EndpointType, string> = {
    overview: "https://vaisheshikaapi.vercel.app/api/overview",
    founder: "https://vaisheshikaapi.vercel.app/api/founder",
    chapters: "https://vaisheshikaapi.vercel.app/api/chapters",
    matrix: "https://vaisheshikaapi.vercel.app/api/modern-matrix",
  };

  useEffect(() => {
    async function executeQuery() {
      setLoading(true);
      try {
        const response = await fetch(endpoints[activeTab]);
        if (!response.ok)
          throw new Error(`Handshake failed for route: ${activeTab}`);
        const data = await response.json();
        setPayload(data);
        toastSystem.emit(
          `Query complete: /api/${activeTab} resolved successfully.`,
          "success",
        );
      } catch (err) {
        console.error(err);
        // Fallback structures simulating the real API returns
        setPayload(getFallbackData(activeTab));
        toastSystem.emit(
          `API timed out. Rendering sandbox payload for /api/${activeTab}`,
          "info",
        );
      } finally {
        setLoading(false);
      }
    }
    executeQuery();
  }, [activeTab]);

  return (
    <div className="w-full max-w-6xl mx-auto my-16 bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-md">
      {/* Interactive Control Console Bars */}
      <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <Terminal size={14} className="text-amber-500 animate-pulse" />
            Vaisheshika Live API Workspace
          </h3>
          <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
            Querying active endpoints across the physical system layout.
          </p>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-neutral-900 p-1 rounded-lg border border-neutral-800/80">
          {(Object.keys(endpoints) as EndpointType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all uppercase ${
                activeTab === tab
                  ? "bg-amber-500 text-black font-bold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Interactive Parameter Monitor Panel */}
        <div className="space-y-4">
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              HTTP Method
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block mt-1">
              GET
            </span>
          </div>

          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Target Request URI
            </span>
            <code className="text-xs font-mono text-neutral-300 block mt-1 break-all select-all">
              {endpoints[activeTab]}
            </code>
          </div>

          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900 text-xs text-neutral-400 leading-relaxed">
            {activeTab === "overview" &&
              "Returns deep ontological definitions, naturalism scope settings, and category schemas."}
            {activeTab === "founder" &&
              "Fetches Sage Kaṇāda's profiles, system origin historical records, and traditional accounts."}
            {activeTab === "chapters" &&
              "Consolidated dynamic index mapping out the 10 core text modules along with cumulative verse tallies."}
            {activeTab === "matrix" &&
              "Maps ancient natural sciences physics classifications directly to Object-Oriented paradigm attributes."}
          </div>
        </div>

        {/* Right JSON Stream Output Logger */}
        <div className="lg:col-span-2 flex flex-col h-80 bg-neutral-950 rounded-xl border border-neutral-900 overflow-hidden relative">
          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex justify-between items-center text-[10px] font-mono text-neutral-500">
            <span>RESPONSE STREAM LOGGER</span>
            <span className="flex items-center gap-1">
              <Activity
                size={10}
                className={
                  loading ? "animate-spin text-amber-500" : "text-emerald-400"
                }
              />
              {loading ? "SYNCING..." : "RESOLVED"}
            </span>
          </div>

          <div className="p-4 flex-1 overflow-auto font-mono text-xs text-amber-400/90 leading-normal selection:bg-neutral-800 select-all">
            {loading ? (
              <span className="text-neutral-600 animate-pulse block">
                Fetching payload records from target instance...
              </span>
            ) : (
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(payload, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sandbox Fallback Generator
function getFallbackData(type: EndpointType) {
  switch (type) {
    case "overview":
      return {
        scope: "Vaisheshika Naturalism Framework",
        parameters: {
          system: "Pluralistic Realism",
          atomism: true,
          categories: 7,
        },
      };
    case "founder":
      return {
        name: "Sage Kaṇāda",
        aliases: ["Kashyapa", "Uluka"],
        historicalOrigin: "Ancient India",
        legend: "Gathered grain fragments to study atomic particles.",
      };
    case "chapters":
      return {
        modules: 10,
        totalSutras: 370,
        modulesMap: [
          { id: 1, verses: 32 },
          { id: 2, verses: 39 },
        ],
      };
    case "matrix":
      return {
        ancientTaxonomy: "Dravya",
        modernOopInstance: "Class Object",
        parameters: { attributes: "Guna", methods: "Karma" },
      };
  }
}
