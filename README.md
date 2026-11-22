# SMALL GAPS Coffee BSD - Interactive 3D & WebAR Landing Page

Solo, 100% free-tier interactive 3D and WebAR showcase built for **SMALL GAPS Coffee (Hotel Starlet BSD, 2nd Floor, Tangerang)**. Designed to drive brand awareness and 1-tap WhatsApp reservations (`+62 818-199-099`) with simple, elegant, modern English copywriting.

## Key Features Implemented

- **Hero Front-Facade View:** Clean default English HUD (`Menu`, `Location`, `Reserve`, `Open 08:00-22:00 WIB`, and high-contrast `Explore Space` CTA).
- **Game-Style Free-Roam Controls:** Translucent mobile virtual analog joystick (bottom-left) + right-side touch look drag, plus desktop `WASD` + mouse drag, bounded by lightweight axis-separated AABB collision clamping.
- **Clickable Interactive Objects:** Click/tap the front glass door (`Door_Main`) to animate it open/closed and unlock entry; click seating zones (`Indoor WFC Table`, `Lounge & Group Corner`, `Window Counter Seat`) for GSAP camera glides and seat-specific WhatsApp booking; click the Espresso Bar or Barista for 3-state reactive animations (`idle_brewing`, `greeting_wave`, `pouring_serving`) and the curated menu drawer.
- **4-Time-of-Day Dynamic Ambience:** Instant smooth transitions between `Morning` (08:00), `Midday` (12:00), `Sunset` (17:00), and `Night` (20:00) without heavy duplicate lightmaps.
- **Free-Tier WebAR & iOS Fallback:** Automatic detection routing Android Chrome to `@react-three/xr` WebXR and iOS Safari to Apple Quick Look (`.usdz`).

## Local Setup & Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Verification Commands

```bash
npm run typecheck
npm run test
npm run build
```

## Deploy Free on Vercel (Zero Monthly Cost)

1. Push this repository to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new) using the **Hobby (Free)** tier.
3. Keep default Next.js build settings (`next build`) and click **Deploy**.
4. Region is pre-configured to `sin1` (Singapore) in `vercel.json` for low latency across BSD / Jabodetabek.

## Swapping Real Blender `.glb` / `.usdz` Assets

See `docs/ASSET_SWAP_GUIDE.md` for the exact Blender mesh naming contract, Mixamo 3-clip barista export steps, and Draco/KTX2 `< 8 MB` compression pipeline.
