"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Cpu, Orbit } from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    toastSystem.emit(
      isOpen
        ? "System telemetry channel closed."
        : "Mobile system console open.",
      "info",
    );
  };

  const navLinks = [
    { label: "Overview", href: "/#overview" },
    { label: "Matrix Alignment", href: "/#matrix" },
    { label: "Chapters", href: "/#chapters" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-neutral-950/70 border-b border-neutral-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Core Logo */}
        <Link
          href="/"
          onClick={() =>
            toastSystem.emit(
              "Routing telemetry to main origin axis.",
              "success",
            )
          }
          className="flex items-center gap-2 group"
        >
          <Orbit
            className="text-amber-500 group-hover:rotate-180 transition-transform duration-700"
            size={18}
          />
          <span className="font-mono text-xs uppercase tracking-widest font-black text-neutral-200 group-hover:text-amber-400 transition-colors">
            Vaiśeṣika Core
          </span>
        </Link>

        {/* Desktop View Links Panel */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-neutral-400 hover:text-amber-400 transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-[10px] text-neutral-600 border border-neutral-900 bg-neutral-950/50 px-2 py-0.5 rounded">
            V4.API
          </span>
        </div>

        {/* Mobile Action Controls */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-neutral-400 hover:text-amber-400 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Control Matrix"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Slide Layout Menu Overlay */}
      <div
        className={`fixed top-16 left-0 w-full bg-neutral-950 border-b border-neutral-900/90 transition-all duration-300 ease-in-out z-30 md:hidden overflow-hidden ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 flex flex-col gap-4 font-mono text-xs bg-neutral-950">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-amber-400 py-1 transition-colors uppercase tracking-wide block"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-full h-px bg-neutral-900 my-2" />
          <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">
            Systemic Status Nodes: Active
          </span>
        </div>
      </div>
    </nav>
  );
}
