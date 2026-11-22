# Blender `.glb` & `.usdz` Hot-Swap Guide (SMALL GAPS Coffee BSD)

This codebase ships with a 1-to-1 modular procedural 3D cafe (`src/components/scene/ProceduralCafe.tsx`) so you can test walking, door opening, 4 lighting moods, seat glides, and WhatsApp booking immediately. When your real SMALL GAPS BSD photos are ready, follow this guide to swap in your Blender exports.

## 1. Exact Blender Mesh Naming Contract

| Blender Object / Empty Name | Pivot Origin | Runtime Behavior |
| --- | --- | --- |
| `Env_Shell` | World `(0,0,0)` | Neutral AO-baked walls, floor, ceiling |
| `Door_Main_Pivot` | Hinge edge `(x, 0, z)` | Rotated around Y axis on click (`0` to `-95 deg`) |
| `Door_Main` | Child of `Door_Main_Pivot` | Clickable glass door mesh |
| `Seat_WFC_01` | Seat center floor | Click -> GSAP glide + WFC ambience card |
| `Seat_Sofa_01` | Seat center floor | Click -> GSAP glide + Group sofa card |
| `Seat_Window_01` | Seat center floor | Click -> GSAP glide + Window view card |
| `Bar_Counter` | Counter base center | Click -> Barista pouring + Curated Menu Drawer |
| `Barista_Rig` | Feet center `(x,0,z)` | Mixamo armature with 3 NLA clips |
| `Lamp_Pendant_01..N` | Ceiling mount | Emissive intensity driven by 4-Mood Lighting |

## 2. Mixamo 3-State Barista Animation Clips

Name your 3 bundled animation clips inside `barista_rig.glb`:
1. `Anim_Idle_Brewing` (looping)
2. `Anim_Greeting_Wave` (plays when guest opens door)
3. `Anim_Pouring_Serving` (plays when guest clicks bar counter)

## 3. Target `< 8 MB` Compression Pipeline (Free CLI)

Install `@gltf-transform/cli` globally on your local machine and compress your Blender exports before placing them in `public/models/`:

```bash
npx @gltf-transform/cli optimize raw_cafe.glb public/models/smallgaps_cafe.glb --compress draco --texture-compress webp --texture-size 1024
npx @gltf-transform/cli optimize raw_barista.glb public/models/barista_rig.glb --compress draco --texture-compress webp --texture-size 512
```

For iOS Safari Apple Quick Look, export a lightweight signature cup or miniature cafe as `public/models/ar/signature_cup.usdz` (<= 1.0 MB) directly from Blender (`File -> Export -> Universal Scene Description (.usd/.usdz)`).

## 4. Activate Real Assets

Update `src/lib/config/assetConfig.ts`:
```ts
export const ASSET_CONFIG = {
  useGlbAssets: true,
  ...
}
```
