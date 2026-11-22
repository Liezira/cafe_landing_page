export const ASSET_CONFIG = {
  /**
   * Set to true once you place compressed Blender exports inside public/models/
   * following the Blender Mesh Naming Contract in docs/ASSET_SWAP_GUIDE.md.
   */
  useGlbAssets: false,
  cafeGlbUrl: "/models/smallgaps_cafe.glb",
  baristaGlbUrl: "/models/barista_rig.glb",
  arCupGlbUrl: "/models/ar/signature_cup.glb",
  arCupUsdzUrl: "/models/ar/signature_cup.usdz",
} as const;
