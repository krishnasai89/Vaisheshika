"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export default function AtomPreloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState(
    "Initializing Paramāṇu Fields...",
  );
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Three.js Setup Elements ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Particle Field Construction (Inspired by image_60877f.jpg) ---
    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // 🔴 1. The Central Nucleus Core
    const nucleusCount = 80;
    const nucleusGeometry = new THREE.BufferGeometry();
    const nucleusPositions = new Float32Array(nucleusCount * 3);
    const nucleusColors = new Float32Array(nucleusCount * 3);

    for (let i = 0; i < nucleusCount; i++) {
      // Random packed sphere points
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.25; // tight cluster radius

      nucleusPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      nucleusPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      nucleusPositions[i * 3 + 2] = r * Math.cos(phi);

      // Mix red/magenta and bright cyan components for the central protons/neutrons
      if (Math.random() > 0.5) {
        nucleusColors[i * 3] = 0.96; // R
        nucleusColors[i * 3 + 1] = 0.31; // G
        nucleusColors[i * 3 + 2] = 0.4; // B
      } else {
        nucleusColors[i * 3] = 0.24; // R
        nucleusColors[i * 3 + 1] = 0.72; // G
        nucleusColors[i * 3 + 2] = 0.96; // B
      }
    }
    nucleusGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nucleusPositions, 3),
    );
    nucleusGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(nucleusColors, 3),
    );
    const nucleusMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 1,
    });
    const nucleusPoints = new THREE.Points(nucleusGeometry, nucleusMaterial);
    atomGroup.add(nucleusPoints);

    // 🔵 2. The Inner Shell (Pink Cloud) & Outer Shell (Cyan Cloud)
    const createQuantumShell = (
      count: number,
      minRadius: number,
      maxRadius: number,
      rVal: number,
      gVal: number,
      bVal: number,
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = minRadius + Math.random() * (maxRadius - minRadius);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const material = new THREE.PointsMaterial({
        size: 0.03,
        color: new THREE.Color(rVal, gVal, bVal),
        transparent: true,
        opacity: 0.8,
      });
      return new THREE.Points(geometry, material);
    };

    // Inner magenta shell matching the mid-tier cloud layout of image_60877f.jpg
    const innerShell = createQuantumShell(800, 0.7, 1.4, 0.92, 0.25, 0.6);
    atomGroup.add(innerShell);

    // Outer bright cyan electron cloud matching the book cover bounds
    const outerShell = createQuantumShell(1500, 1.8, 2.8, 0.3, 0.85, 0.95);
    atomGroup.add(outerShell);

    // --- GSAP Text and Loading Sequencer Timeline ---
    const tl = gsap.timeline();

    tl.to(
      {},
      {
        duration: 1.2,
        onStart: () =>
          setLoadingText("Synthesizing Categories of Existence..."),
      },
    )
      .to(
        {},
        {
          duration: 1.0,
          onStart: () => setLoadingText("Mapping Computational Mappings..."),
        },
      )
      .to(
        {},
        {
          duration: 0.8,
          onStart: () =>
            setLoadingText("Assembling Structural Atomic Nodes..."),
        },
      )
      .to(
        {},
        {
          duration: 1.5,
          onStart: () =>
            setLoadingText("System Clean. Initializing Framework Interface..."),
          onComplete: () => {
            // Explode the entire quantum cloud particle arrays outward on finish!
            gsap.to(innerShell.scale, {
              x: 3,
              y: 3,
              z: 3,
              duration: 1.2,
              ease: "power4.inOut",
            });
            gsap.to(outerShell.scale, {
              x: 4,
              y: 4,
              z: 4,
              duration: 1.2,
              ease: "power4.inOut",
            });
            gsap.to(nucleusShellMaterial, {
              size: 0,
              opacity: 0,
              duration: 0.8,
            }); // map clean fade

            // Fade and unmount the entire layout container envelope
            gsap.to("#preloader-stage-wrapper", {
              opacity: 0,
              duration: 0.8,
              delay: 0.4,
              onComplete: () => setIsDone(true),
            });
          },
        },
      );

    // --- Standard Animation Loop Tick ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const renderTick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Differentiate rotations between structures to give fluid energy metrics
      nucleusPoints.rotation.y = elapsedTime * 0.2;
      innerShell.rotation.y = -elapsedTime * 0.4;
      innerShell.rotation.x = elapsedTime * 0.15;
      outerShell.rotation.y = elapsedTime * 0.15;
      outerShell.rotation.z = -elapsedTime * 0.2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderTick);
    };
    renderTick();

    // --- Resize Controller ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Clean execution parameters memory block
    const nucleusShellMaterial = nucleusMaterial;
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      id="preloader-stage-wrapper"
      className="fixed inset-0 z-[999999] bg-neutral-950 flex flex-col items-center justify-center pointer-events-auto"
    >
      {/* Three.js Render Target Canvas Area */}
      <div ref={containerRef} className="w-full h-[65vh] max-w-lg relative" />

      {/* Synchronized Information Registry Status Text */}
      <div className="absolute bottom-16 left-0 w-full text-center space-y-3 px-6 font-mono">
        <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          SYSTEM CORE COMPILED STATUS
        </div>
        <p className="text-xs text-neutral-300 font-medium transition-all duration-300">
          {loadingText}
        </p>
      </div>
    </div>
  );
}
