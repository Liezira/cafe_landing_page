import type { ArCapability } from "@/lib/types/scene";

export async function detectArCapability(): Promise<ArCapability> {
  if (typeof window === "undefined") {
    return { supported: false, mode: "unsupported", checked: false };
  }

  // 1. Check Android Chrome / WebXR immersive-ar support
  const nav = navigator as Navigator & {
    xr?: { isSessionSupported?: (mode: string) => Promise<boolean> };
  };

  if (nav.xr && typeof nav.xr.isSessionSupported === "function") {
    try {
      const xrSupported = await nav.xr.isSessionSupported("immersive-ar");
      if (xrSupported) {
        return { supported: true, mode: "webxr", checked: true };
      }
    } catch {
      // Fall through to iOS Quick Look detection
    }
  }

  // 2. Check iOS Safari Apple Quick Look support (<a rel="ar">)
  const anchor = document.createElement("a");
  const supportsQuickLook =
    anchor.relList && typeof anchor.relList.supports === "function"
      ? anchor.relList.supports("ar")
      : false;

  if (supportsQuickLook) {
    return { supported: true, mode: "quicklook", checked: true };
  }

  return { supported: false, mode: "unsupported", checked: true };
}
