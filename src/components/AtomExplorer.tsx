"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { toastSystem } from "@/lib/toastEvent";

// Component representing a single Paramāṇu (Atom) node
function AtomNode({
  position,
  color = "#f59e0b",
}: {
  position: [number, number, number];
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Gentle individual orbital vibration
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// System container to animate chemical structural states
function AtomicStructure({ state }: { state: "single" | "dyad" | "triad" }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <group ref={groupRef}>
      {/* Base Atom */}
      <AtomNode position={[0, 0, 0]} color="#f59e0b" />

      {/* Dyad configuration (Dyaṇuka) */}
      {(state === "dyad" || state === "triad") && (
        <>
          <AtomNode position={[0.8, 0, 0]} color="#d97706" />
          {/* Connecting energy line */}
          <line>
            <bufferGeometry />
          </line>
        </>
      )}

      {/* Triad configuration (Tryaṇuka) */}
      {state === "triad" && (
        <>
          <AtomNode position={[0.4, 0.7, 0]} color="#b45309" />
          <AtomNode position={[-0.4, -0.7, 0.5]} color="#78350f" />
          <AtomNode position={[1.2, -0.4, -0.5]} color="#f59e0b" />
        </>
      )}
    </group>
  );
}

export default function AtomExplorer() {
  const [structuralState, setStructuralState] = useState<
    "single" | "dyad" | "triad"
  >("single");

  return (
    <div className="w-full max-w-4xl mx-auto bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-200">
            Matter Synthesizer{" "}
            <span className="font-serif italic text-amber-500 font-normal">
              (
              {structuralState === "single"
                ? "Paramāṇu"
                : structuralState === "dyad"
                  ? "Dyaṇuka"
                  : "Tryaṇuka"}
              )
            </span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Simulating the ancient atomic grouping matrix of Kanada's physics.
          </p>
        </div>

        {/* State Controllers */}
        <div className="flex gap-2 bg-neutral-950 p-1.5 rounded-lg border border-neutral-800/80 font-mono text-xs">
          {(["single", "dyad", "triad"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setStructuralState(mode);
                toastSystem.emit(
                  `Synthesized Ontological Structure: ${mode === "single" ? "Paramāṇu" : mode === "dyad" ? "Dyaṇuka" : "Tryaṇuka"} Matrix initialized.`,
                  "atomic",
                );
              }}
              className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                structuralState === mode
                  ? "bg-amber-500 text-black font-bold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* The 3D Render Pipeline Canvas */}
      <div className="w-full h-80 bg-neutral-950 rounded-xl relative overflow-hidden border border-neutral-900">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-5, 5, -2]} intensity={0.5} />

          <AtomicStructure state={structuralState} />
          <OrbitControls enableZoom={false} autoRotate={false} />
        </Canvas>

        {/* Informative overlay layout block */}
        <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-3 rounded-lg pointer-events-none">
          <p className="text-xs text-neutral-400 font-mono">
            {structuralState === "single" &&
              "• Paramāṇu: The indivisible, eternal atom. Possesses no parts."}
            {structuralState === "dyad" &&
              "• Dyaṇuka: A combination of two atoms. Still invisible to the human naked eye."}
            {structuralState === "triad" &&
              "• Tryaṇuka: Triple combination of dyads. The threshold where gross matter becomes visible."}
          </p>
        </div>
      </div>
    </div>
  );
}
