import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function PhilosophySection() {
  return (
    <section className="max-w-4xl mx-auto my-32 px-6">
      <ScrollReveal className="space-y-24">
        {/* Core Pillar 1 */}
        <div className="border-l-2 border-amber-500/30 pl-6 md:pl-12">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-widest block mb-2">
            The Concept of Causation / Asatāryavāda
          </span>
          <h3 className="reveal-text text-3xl font-bold text-neutral-100 tracking-tight mb-4">
            The effect is a completely new creation.
          </h3>
          <p className="reveal-text text-neutral-400 leading-relaxed text-base">
            Unlike other schools, Vaisheshika argues that the effect does not
            pre-exist in its cause. When atoms (*Paramāṇu*) combine to create a
            jar, the jar is a structural novelty born out of structural
            configurations, adding entirely new properties to existence.
          </p>
        </div>

        {/* Core Pillar 2 */}
        <div className="border-l-2 border-neutral-800 pl-6 md:pl-12">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
            Cosmic Dissolution / Pralaya
          </span>
          <h3 className="reveal-text text-3xl font-bold text-neutral-100 tracking-tight mb-4">
            The return to localized, atomic isolation.
          </h3>
          <p className="reveal-text text-neutral-400 leading-relaxed text-base">
            During cyclic dissolution, the structural bonds holding matter
            together dissolve. Triads snap back into dyads, and dyads snap back
            into independent eternal atoms. The cosmos stands still, resting as
            pure, potentialized, disconnected singular points waiting for the
            next spark of action.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
