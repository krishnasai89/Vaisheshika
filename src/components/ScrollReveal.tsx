"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register the ScrollTrigger plugin with GSAP safely in the browser context
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Target any text paragraphs or headings inside the wrapper
      const targetElements =
        containerRef.current.querySelectorAll(".reveal-text");

      targetElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 40,
            letterSpacing: "-0.05em",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0em",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%", // Trigger animation when element enters 85% from top of viewport
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
