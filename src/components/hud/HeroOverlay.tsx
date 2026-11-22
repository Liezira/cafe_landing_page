"use client";

import {
  ArrowUpRight,
  Box,
  MapPin,
  MessageCircle,
  UtensilsCrossed,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";
import { xrStore } from "@/components/scene/CafeCanvas";

export function HeroOverlay() {
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const contextHint = useCafeStore((s) => s.contextHint);
  const arCapability = useCafeStore((s) => s.arCapability);
  const enterExplore = useCafeStore((s) => s.enterExplore);
  const setActiveDrawer = useCafeStore((s) => s.setActiveDrawer);
  const launchAr = useCafeStore((s) => s.launchAr);

  const handleArClick = async () => {
    if (arCapability.mode === "webxr") {
      try {
        await xrStore.enterAR();
        launchAr();
        return;
      } catch {
        setActiveDrawer("ar_guide");
        return;
      }
    }
    setActiveDrawer("ar_guide");
  };

  if (explorationMode === "explore") {
    return (
      <div className="pointer-events-none flex w-full flex-col items-center gap-3 px-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
        {contextHint && (
          <div className="hud-glass-elevated rounded-full px-4 py-2 text-xs font-medium text-[#FAF7F2]">
            {contextHint}
          </div>
        )}

        <div className="flex w-full items-end justify-end sm:justify-between">
          <div className="hidden sm:block" />
          <p className="hud-glass hidden rounded-full px-4 py-2 text-xs text-[#D8CEC2] sm:block">
            WASD to walk · Drag to look · Click door or seats · Esc to exit
          </p>

          <button
            type="button"
            onClick={handleArClick}
            className="pointer-events-auto hud-glass-elevated flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A970] active:scale-[0.97]"
          >
            <Box
              className="h-4 w-4 text-[#E5A970]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>View in AR</span>
          </button>
        </div>
      </div>
    );
  }

  if (explorationMode !== "hero") {
    return null;
  }

  return (
    <div className="pointer-events-none flex w-full flex-col items-end gap-3 px-4 pb-[max(14px,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
      {/* Floating AR Trigger */}
      <button
        type="button"
        onClick={handleArClick}
        className="pointer-events-auto hud-glass-elevated flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A970] active:scale-[0.97]"
      >
        <Box
          className="h-4 w-4 text-[#E5A970]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span>
          {arCapability.supported ? "View in AR" : "View in AR (Mobile)"}
        </span>
      </button>

      {/* Bottom Action Dock */}
      <nav
        aria-label="Primary actions"
        className="pointer-events-auto hud-glass mx-auto flex w-full max-w-xl flex-col gap-2 rounded-[22px] p-2 sm:w-auto sm:flex-row sm:items-center sm:rounded-full sm:p-1.5"
      >
        <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center">
          <button
            type="button"
            onClick={() => setActiveDrawer("menu")}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2]/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A970] active:scale-[0.97]"
          >
            <UtensilsCrossed
              className="h-4 w-4 text-[#D8CEC2]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Menu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDrawer("location")}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2]/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A970] active:scale-[0.97]"
          >
            <MapPin
              className="h-4 w-4 text-[#D8CEC2]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Location</span>
          </button>

          <a
            href={buildWhatsAppUrl("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium text-[#FAF7F2] transition hover:bg-[#1B5E3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A970] active:scale-[0.97]"
          >
            <MessageCircle
              className="h-4 w-4 text-[#6EE7A8]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Reserve</span>
          </a>
        </div>

        <span
          className="hidden h-6 w-px bg-[#FAF7F2]/16 sm:inline-block"
          aria-hidden="true"
        />

        {/* High-Contrast Primary CTA */}
        <button
          type="button"
          onClick={enterExplore}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FAF7F2] px-6 py-2.5 text-sm font-semibold text-[#14110F] transition hover:bg-[#F2ECE1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A970] active:scale-[0.97] sm:min-h-[44px] sm:w-auto"
        >
          <span>Explore Space</span>
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
