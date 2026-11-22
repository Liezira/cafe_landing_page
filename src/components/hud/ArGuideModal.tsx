"use client";

import { Box, Smartphone, X } from "lucide-react";
import { ASSET_CONFIG } from "@/lib/config/assetConfig";
import { useCafeStore } from "@/store/useCafeStore";

export function ArGuideModal() {
  const activeDrawer = useCafeStore((s) => s.activeDrawer);
  const arCapability = useCafeStore((s) => s.arCapability);
  const setActiveDrawer = useCafeStore((s) => s.setActiveDrawer);

  if (activeDrawer !== "ar_guide") return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-[#14110F]/50 sm:items-center sm:p-4"
      onClick={() => setActiveDrawer("none")}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Augmented Reality Preview"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-[24px] bg-[#FAF7F2] p-6 pb-[max(24px,env(safe-area-inset-bottom))] text-[#14110F] shadow-2xl sm:rounded-[22px]"
      >
        <div className="flex items-start justify-between">
          <h2 className="font-serif text-2xl font-medium text-[#14110F]">
            View in Your Space
          </h2>
          <button
            type="button"
            onClick={() => setActiveDrawer("none")}
            aria-label="Close AR guide"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#574D45] hover:bg-[#EAE2D6]"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {arCapability.mode === "quicklook" ? (
          <div className="mt-4 space-y-4">
            <p className="text-sm leading-relaxed text-[#574D45]">
              Your iPhone supports Apple Quick Look AR. Tap below to place a
              miniature preview of SMALL GAPS on your table.
            </p>
            <a
              rel="ar"
              href={ASSET_CONFIG.arCupUsdzUrl}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#14110F] px-5 py-3 text-sm font-semibold text-[#FAF7F2] transition hover:bg-[#2E2722]"
            >
              <Box className="h-4 w-4 text-[#E5A970]" strokeWidth={1.5} />
              <span>Launch Apple Quick Look AR</span>
            </a>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm leading-relaxed text-[#574D45]">
              Open this page on an Android Chrome device (WebXR) or iPhone
              Safari (Quick Look) to place SMALL GAPS Coffee in Augmented
              Reality. You can continue walking inside the interactive 3D space
              right here on desktop.
            </p>
            <div className="flex items-center gap-3 rounded-[14px] bg-[#F2ECE1] p-4 text-xs text-[#574D45]">
              <Smartphone
                className="h-5 w-5 shrink-0 text-[#8A4A1F]"
                strokeWidth={1.5}
              />
              <span>
                Tip: Share this Vercel URL on SMALL GAPS Instagram bio so guests
                can launch AR directly from their phones.
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
