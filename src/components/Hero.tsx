import React from "react";
import { Atom, Compass, Layers, Zap } from "lucide-react";

export default function Hero() {
  const asciiTitle = `
██╗   ██╗ █████╗ ██╗███████╗██╗  ██╗███████╗███████╗██╗  ██╗██╗██╗  ██╗ █████╗ 
██║   ██║██╔══██╗██║██╔════╝██║  ██║██╔════╝██╔════╝██║  ██║██║██║ ██╔╝██╔══██╗
██║   ██║███████║██║███████╗███████║█████╗  ███████╗███████║██║█████╔╝ ███████║
╚██╗ ██╔╝██╔══██║██║╚════██║██╔══██║██╔══╝  ╚════██║██╔══██║██║██╔═██╗ ██╔══██║
 ╚████╔╝ ██║  ██║██║███████║██║  ██║███████╗███████║██║  ██║██║██║  ██╗██║  ██║
  ╚═══╝  ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
  `.trim();

  return (
    <main className="relative min-h-screen text-neutral-100 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Hero Section Container */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 min-h-screen flex flex-col justify-between relative z-10">
        {/* Navigation / Minimal Header */}
        <div className="flex justify-between items-center border-b border-neutral-800/60 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              Systemic Atomism / API Active
            </span>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            v1.0.0-2026
          </span>
        </div>

        {/* Hero Title Area - ASCII Frame */}
        <div className="my-auto py-12">
          {/* Desktop Responsive ASCII Display */}
          <div className="hidden md:block overflow-x-auto select-none pointer-events-none opacity-85">
            <pre className="font-mono text-[0.65rem] xl:text-[0.8rem] leading-none text-amber-500 font-bold bg-neutral-950/40 p-6 rounded-xl backdrop-blur-xs inline-block border border-neutral-900">
              {asciiTitle}
            </pre>
          </div>

          {/* Mobile Fallback Title Layout */}
          <h1 className="md:hidden text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-200">
            VAISHESHIKA
          </h1>

          <div className="mt-8 max-w-2xl bg-neutral-900/40 backdrop-blur-md p-6 border border-neutral-800 rounded-xl">
            <h2 className="text-xl font-bold text-neutral-200 mb-2 flex items-center gap-2">
              <Compass size={18} className="text-amber-500" />
              The Philosophy of Distinctions
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Vaisheshika posits that everything in the physical universe is
              reducible to
              <span className="text-amber-400 font-mono"> Paramāṇu </span>{" "}
              (indivisible atoms), structured across seven distinct, objective
              categories of reality.
            </p>
          </div>
        </div>

        {/* Footprint Bento Quick-Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-800/60 pt-8">
          <div className="p-4 bg-neutral-900/30 rounded-xl border border-neutral-900 flex items-center gap-4">
            <Atom className="text-amber-500" size={24} />
            <div>
              <h4 className="text-xs font-mono uppercase text-neutral-400">
                01. Dravya
              </h4>
              <p className="text-xs text-neutral-500">Atomic Substances</p>
            </div>
          </div>
          <div className="p-4 bg-neutral-900/30 rounded-xl border border-neutral-900 flex items-center gap-4">
            <Layers className="text-amber-500" size={24} />
            <div>
              <h4 className="text-xs font-mono uppercase text-neutral-400">
                02. Guṇa
              </h4>
              <p className="text-xs text-neutral-500">Inherent Qualities</p>
            </div>
          </div>
          <div className="p-4 bg-neutral-900/30 rounded-xl border border-neutral-900 flex items-center gap-4">
            <Zap className="text-amber-500" size={24} />
            <div>
              <h4 className="text-xs font-mono uppercase text-neutral-400">
                03. Karma
              </h4>
              <p className="text-xs text-neutral-500">Kinetic Actions</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
