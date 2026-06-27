# ⚛️ Vaiśeṣika Core — Paramāṇu Realism Engine

An immersive, high-performance ontological explorer and full-stack web application mapping the classical Indian physical and metaphysical mechanics of Sage Kaṇāda's foundational text, the _Vaiśeṣika Sūtras_. Built with Next.js 15, Three.js, GSAP, and Tailwind CSS v4.

---

## 🌌 System Architecture Preview

This application translates classical pluralistic realism into an interactive computational canvas. The user journey mimics structural molecular progression:

```text
[3D Atom Preloader]
│ (Inspired by Quantum Shell Mechanics)
▼
[Global Shell Canvas] ───► Custom Atom Cursor & Minimal Scrollbars
│
├───► 01. Hero & Analytical Scaffolding (Overview, Founder, Epistemology)
├───► 02. Data Artifacts (AtomExplorer, DravyaTable, InherenceAccordion)
└───► 03. Telemetry Interfaces (TechnologyMatrix, ApiController)
│
▼
[Dynamic Textual Core] ───► Async Routing Query Validation (?focused=sutra-id)
```

---

## ✨ Features Matrix

### 🚀 01. Immersive 3D Gateway (`AtomPreloader`)

- **Visual Density Architecture:** A layered, interactive 3D point-cloud atom rendering a dense proton/neutron nucleus shell surrounded by staggered magenta inner and cyan outer electron probability clouds—modeled after the quantum shell configurations seen on the cover of _The Atom: A Visual Tour_ (Jack Challoner).
- **Kinetic Vector Handoff:** Uses **Three.js** animation loops for independent rotational matrices combined with a multi-stage **GSAP** timeline that smoothly explodes particles outward and fades the loader canvas upon complete application state hydration.

### ⚛️ 02. Spatial User Experience Modifications

- **Atomic Tracking Cursor:** A global, client-side custom mouse controller that hides native browser indicators. It tracks coordinates instantaneously at its center (the nucleus) while applying a lagging linear interpolation (Lerp physics spring) to two counter-rotating orbiting electron ring tracks. Responsive parameters automatically bridge click-triggers to mobile touch matrices.
- **Sleek Display Overrides:** Custom Webkit scrollbar configurations injected directly into `globals.css` that match your high-contrast dark space background (`#0a0a0a`), expanding into bright amber accents on interaction.

### 🧬 03. Unbreakable Dynamic Routing Hierarchy

- **Async Parameter Validation:** Engineered specifically to bypass Next.js asynchronous rendering quirks by explicitly wrap-promising layout `params` and `searchParams`.
- **Query-Based Scroll Recovery:** Replaces traditional, fragile HTML anchor fragments with dynamic routing parameters (`?focused=sutra-number`). A client-side hook (`ScrollRecovery.tsx`) intercepts page transition caching, overriding browser resets to instantly snap focus back to the exact element layout block (e.g., Sūtra 24) when navigating backward from deep analysis text nodes.

### 📊 04. Unified Structural Schema

- Operates on a highly granular, full-stack JSON object matrix mapping out all 21 core verses of Chapter 1. Every dynamic verse node safely extracts code parameters including `ahnika` registries, Sanskrit script fonts, analytical commentary blocks, and **High-Contrast Viewpoint Dualities** (_Common Misconception_ vs. _Ontological Reality_).

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** Next.js (App Router, Server Components layout optimization)
- **Compiler Engine:** Turbopack
- **Graphics & Animation:** Three.js, GreenSock Animation Platform (GSAP)
- **Styling Infrastructure:** Tailwind CSS, Lucide React (Icons)
- **State & Telemetry:** Event-driven custom subscription streams (`toastSystem`)

---

## 📦 Project Directory Layout

```text
vaisheshika-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Global Shell (Preloader, Cursor, Toast layout layers)
│   │   ├── page.tsx                  # Home Workspace Layout Stack (Perfect System Order)
│   │   ├── globals.css               # Global Custom Webkit Scrollbars & CSS Variables
│   │   └── chapters/
│   │       └── [id]/
│   │           ├── page.tsx          # Dynamic Verse Grid Directory (Query parameter generation)
│   │           └── [sutraId]/
│   │               └── page.tsx      # Deep Verse Analysis Workspace & Dual Viewpoint Matrix
│   ├── components/
│   │   ├── AtomPreloader.tsx         # Three.js + GSAP Molecular Preloader
│   │   ├── AtomCursor.tsx            # Lagging Lerp Core Mouse Tracer
│   │   ├── ScrollRecovery.tsx        # Client Viewport Snap Override Hook
│   │   ├── Navbar.tsx                # Responsive Navigation Drawer
│   │   └── Footer.tsx                # Metric Telemetry Base Component
│   └── lib/
│       └── toastEvent.ts             # Dynamic cross-component notification emitter
```

---

## 🚀 Execution & Deployment Instructions

### 1. Environment Setup

Clone the repository and install the verified computational dependency tracks:

```Bash
git clone [https://github.com/your-username/vaisheshika-core.git](https://github.com/your-username/vaisheshika-core.git)
cd vaisheshika-core
pnpm install
```

### 2. Initialize Development Telemetry

Run the local compiler stream via Turbopack:

```Bash
pnpm dev
```

Open http://localhost:3000 inside your browser workspace to review state behaviors.

### 3. Production Compilation Audit

Force the build pipeline to run comprehensive static optimization validation, rigorous type-checking, and file-path sanity mapping:

```Bash
pnpm build
pnpm start
```

---

## 📜 Philosophical Axiom Reference

क्रियागुणवत्समवायिकारणमिति द्रव्यलक्षणम्॥
"The definition of Substance is that it possesses actions and qualities, and is an inherent, material cause." — Vaiśeṣika Sūtra 1.1.15

This software treats codebase files as Substances (Dravyas), styles and states as Qualities (Gunas), and actions or routes as Kinetic Motions (Karmas) to manifest a cohesive, calculable digital reality.
