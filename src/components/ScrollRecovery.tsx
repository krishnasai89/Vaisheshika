"use client";

import { useEffect } from "react";

export default function ScrollRecovery({ targetId }: { targetId: string }) {
  useEffect(() => {
    if (!targetId) return;

    const executeScrollCorrection = () => {
      // Looks for the specific DOM container element id we mapped
      const element = document.getElementById(`sutra-card-${targetId}`);
      if (element) {
        element.scrollIntoView({
          behavior: "instant", // Snaps immediately before Next.js forces a reset
          block: "center", // Centers the card perfectly in the viewport
        });
      }
    };

    // Run immediately on layout mounting
    executeScrollCorrection();

    // Backup execution tick to catch any slower font/content rendering shifts
    const fallbackTimeoutId = setTimeout(executeScrollCorrection, 60);

    return () => clearTimeout(fallbackTimeoutId);
  }, [targetId]);

  return null;
}
