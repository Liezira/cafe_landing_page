# Agile Master Plan & Sprint Backlog - SMALL GAPS Coffee BSD (Web 3D & WebAR)

**Orchestrator / Scrum Master:** Ayling
**Project:** SMALL GAPS Coffee BSD Interactive 3D & WebAR Landing Page (Solo, Free-Tier, Pitch-Ready)
**Client Target:** SMALL GAPS Coffee, Hotel Starlet BSD Lt. 2, Jl. BSD Boulevard Utara, Lengkong Kulon, Pagedangan, Tangerang
**Operating Hours:** Daily 08:00 - 22:00 WIB | **WhatsApp:** +62 818-199-099 | **Positioning:** Daily Comfort Coffee and Food (No Alcohol, No Pork, No Lard)

## 1. Agile Specialist Roster & Responsibilities

| Role | Specialist | Core Deliverables |
| --- | --- | --- |
| Project Orchestrator, PM & Full-Stack Lead | Ayling | Agile Master Plan, Sprint Backlog, Next.js + R3F codebase, integration, deployment config |
| Software Blueprint & System Architect | Diara | System Architecture, R3F Scene Graph, Zustand State Schema, Collision & Door State Machine, WebAR/iOS Fallback Spec |
| Principal UI/UX & Design System Director | Nia | 3-Layer Design Tokens, Tailwind Theme, Mobile Analog HUD & Desktop WASD HUD, 4-Mood Switcher, English Microcopy & Accessibility Spec |
| QA & Anti-AI-Slop Auditor | Ayling (QA Module) | Static verification, unit/logic tests, mobile performance checklist (<8 MB, >=30 FPS), Anti-AI-Slop audit |

## 2. Agile Sprint Plan (4 Sprints / 4 Weeks Solo Cadence)

### Sprint 0 (Analysis, Architecture & Design System)
- **US-01:** Finalize Brand DNA, PRD v1.1, and 4-Sprint Agile Backlog.
- **US-02 (Diara):** Lock technical architecture, folder tree, Zustand store contract, mesh naming convention for Blender `.glb` hot-swap, and collision bounds.
- **US-03 (Nia):** Lock UI/UX Design System, 3-layer tokens, default English microcopy (simple, elegant, modern), and responsive HUD layouts.

### Sprint 1 (Core 3D World, Free-Roam Analog & Interactions)
- **US-04:** Scaffold Next.js (App Router) + TypeScript + Tailwind CSS + R3F + Drei + Zustand + GSAP project.
- **US-05:** Build modular procedural 3D cafe placeholder (Front Glass Facade, Hinged Main Door, Espresso Bar, Indoor WFC Zone, Window Corner) ready for `.glb` replacement.
- **US-06:** Implement Dual-Mode Free-Roam Controls: Mobile Virtual Analog Joystick (bottom-left) + Swipe-to-Look (right), Desktop WASD + Mouse Drag, with lightweight AABB collision clamping.
- **US-07:** Implement `onClick` / tap interactions on Main Door (smooth hinge open/close), Seats (GSAP glide + ambience tag), and Bar Counter (3-state Barista animation controller: Idle Brewing, Greeting Wave, Pouring/Serving).

### Sprint 2 (4-Time-of-Day Ambience, English HUD & WhatsApp Conversion)
- **US-08:** Implement 4-Time-of-Day Dynamic Lighting Engine (Morning 08:00, Midday 12:00, Sunset 17:00, Night 20:00) with smooth light/sky/emissive interpolation.
- **US-09:** Implement clean English HUD: Hero Front-Facade Overlay (`Open 08:00-22:00`, `Menu`, `Directions`, `Reserve`, high-contrast `Explore Space`), Curated Menu Drawer (Signature Barista Exploration, Classics, Non-Coffee, Comfort Food), and 1-tap pre-filled WhatsApp reservation (`wa.me/62818199099`).

### Sprint 3 (WebAR Android/iOS Fallback, QA Testing & Anti-AI-Slop Audit)
- **US-10:** Integrate `@react-three/xr` (Android Chrome WebXR hit-test) and `<model-viewer>` Apple Quick Look `.usdz` fallback for iOS Safari with automatic capability detection.
- **US-11:** Write automated unit tests for pure logic (collision clamping, WhatsApp URL builder, lighting preset interpolation, door/barista state store) and mobile QA checklist.
- **US-12:** Execute Anti-AI-Slop audit (zero stub handlers, real state transitions, accessible contrast >= 4.5:1 / 7:1, responsive reflow).

### Sprint 4 (Deployment Readiness & Client Pitch Handoff)
- **US-13:** Configure Vercel Free-Tier deployment (`vercel.json`, `next.config.ts`, `README.md`, `ASSET_SWAP_GUIDE.md` for Blender `.glb` + `.usdz`).
- **US-14:** Package complete repository into downloadable ZIP archive for immediate local `npm install && npm run dev` and Vercel push.

## 3. Definition of Done (DoD)
1. Every feature maps to a validated user story (`US-*`) and requirement (`FR-01` to `FR-07`).
2. Zero paid APIs or paid SDKs; 100% free-tier compatible.
3. Default UI copy is simple, elegant, modern English with zero placeholder lorem ipsum.
4. All logic modules pass automated verification checks in VM sandbox (or clearly report `BLOCKED` if npm/internet is offline in VM).
5. Hot-swap path for real SMALL GAPS `.glb` / `.usdz` assets is cleanly documented with exact Blender mesh naming conventions.
