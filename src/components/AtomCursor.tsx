"use client";

import React, { useEffect, useState, useRef } from "react";

export default function AtomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Refs for tracking smooth physics interpolation (lagging electron rings)
  const electron1Ref = useRef({ x: 0, y: 0 });
  const electron2Ref = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Hide the native system cursor globally
    document.documentElement.style.cursor = "none";

    // Fallback styling logic for global interactive items
    const injectCursorStyles = document.createElement("style");
    injectCursorStyles.innerHTML = `
      a, button, [role="button"], input, select, textarea, .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(injectCursorStyles);

    const handleMouseMove = (e: MouseMoveEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect if cursor is hovering over an interactive element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.tagName === "INPUT"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    // Physics loop animating electron paths with a lagging lerp formula
    const animateElectrons = () => {
      if (electron1Ref.current && electron2Ref.current) {
        // Electron 1 tracking loop (Spring factor: 0.15)
        electron1Ref.current.x += (position.x - electron1Ref.current.x) * 0.15;
        electron1Ref.current.y += (position.y - electron1Ref.current.y) * 0.15;

        // Electron 2 tracking loop (Spring factor: 0.08 - slower lag)
        electron2Ref.current.x += (position.x - electron2Ref.current.x) * 0.08;
        electron2Ref.current.y += (position.y - electron2Ref.current.y) * 0.08;

        const el1 = document.getElementById("atom-electron-1");
        const el2 = document.getElementById("atom-electron-2");

        if (el1) {
          el1.style.transform = `translate3d(${electron1Ref.current.x}px, ${electron1Ref.current.y}px, 0) translate(-50%, -50%) rotate(45deg)`;
        }
        if (el2) {
          el2.style.transform = `translate3d(${electron2Ref.current.x}px, ${electron2Ref.current.y}px, 0) translate(-50%, -50%) rotate(-45deg)`;
        }
      }
      requestRef.current = requestAnimationFrame(animateElectrons);
    };

    requestRef.current = requestAnimationFrame(animateElectrons);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      document.head.removeChild(injectCursorStyles);
      document.documentElement.style.cursor = "auto";
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden sm:block pointer-events-none fixed inset-0 z-[99999]">
      {/* ⚛️ Central Core Nucleus (Tracks Mouse Instantly) */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-amber-500 rounded-full mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.8 : 1})`,
          boxShadow: "0 0 8px #f59e0b",
        }}
      />

      {/* 💫 Electron Ring 1 (Lagging Physics Link) */}
      <div
        id="atom-electron-1"
        className="fixed top-0 left-0 rounded-full border border-amber-500/30 transition-all duration-75"
        style={{
          width: isHovered ? "48px" : "32px",
          height: isHovered ? "16px" : "12px",
          // Custom micro-pseudo dot representing the running electron on the ring profile
          background:
            "radial-gradient(circle at 0% 50%, #f59e0b 2px, transparent 3px)",
        }}
      />

      {/* 💫 Electron Ring 2 (Counter-rotated, heavier tracking latency) */}
      <div
        id="atom-electron-2"
        className="fixed top-0 left-0 rounded-full border border-amber-500/20 transition-all duration-75"
        style={{
          width: isHovered ? "16px" : "12px",
          height: isHovered ? "48px" : "32px",
          background:
            "radial-gradient(circle at 50% 0%, #d97706 2px, transparent 3px)",
        }}
      />
    </div>
  );
}
