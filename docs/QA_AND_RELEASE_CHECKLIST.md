# QA, Testing & Anti-AI-Slop Release Checklist

## 1. Automated Logic Verification (`tests/engine.test.mjs`)
Run locally or in CI via `npm run test` (Node native test runner, zero extra dependencies):
- AABB collision keeps player inside `ROOM_BOUNDS`.
- Closed `Col_Door_Main` blocks passage into interior (`isDoorOpen = false`).
- Open `Col_Door_Main` allows smooth entry through doorway (`isDoorOpen = true`).
- Axis-separated sliding allows walking along `Col_Bar_Counter` without snagging.
- Pre-filled WhatsApp URL encodes `+62 818-199-099` and seat name accurately.
- WIB operating hours check returns open between `08:00-21:59 WIB` and closed outside.

## 2. Manual Device & Browser QA Matrix
- [ ] **Desktop Chrome / Edge / Safari:** Hero facade loads cleanly; `Explore Space` enables `WASD` + drag look; `Esc` exits drawers/explore; 4 moods smoothly shift lighting.
- [ ] **Android Chrome (Mobile):** Bottom-left virtual analog joystick moves smoothly while right-side finger drag rotates camera simultaneously; `View in AR` triggers WebXR session.
- [ ] **iPhone Safari (iOS):** 3D space runs smoothly at >=30 FPS; `View in AR` opens Apple Quick Look modal without errors.
- [ ] **WhatsApp Conversion:** All 3 entry points (Hero Reserve, Menu Drawer Footer, Seat Info Popover) open `wa.me/62818199099` with clean English pre-filled text.

## 3. Anti-AI-Slop Quality Gate
- [x] Warm Espresso / Oat / Caramel / Botanical palette only (zero neon or purple gradients).
- [x] Default UI copy is simple, elegant, modern English with verified SMALL GAPS BSD facts.
- [x] Zero stubbed `onClick` handlers or TODO placeholders.
- [x] Mobile tap targets >= 44px; bottom-left joystick hides automatically when drawers open.
- [x] 100% free-tier compatible (zero paid APIs, zero paid AR SDKs).
