"use client";

import {
  ArrowLeft,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  UtensilsCrossed,
} from "lucide-react";
import { CAFE_INFO } from "@/lib/config/menuData";
import {
  LIGHTING_MOOD_ORDER,
  LIGHTING_PRESETS,
} from "@/lib/config/lightingPresets";
import { isCafeCurrentlyOpen } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";
import type { LightingMood } from "@/lib/types/scene";

const MOOD_ICONS: Record<LightingMood, typeof Sun> = {
  morning: Sunrise,
  midday: Sun,
  sunset: Sunset,
  night: Moon,
};

export function TopBar() {
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const lightingMood = useCafeStore((s) => s.lightingMood);
  const setLightingMood = useCafeStore((s) => s.setLightingMood);
  const exitToHero = useCafeStore((s) => s.exitToHero);
  const setActiveDrawer = useCafeStore((s) => s.setActiveDrawer);
  const isOpen = isCafeCurrentlyOpen();

  return (
    <header className="pointer-events-none flex w-full flex-col gap-2.5 px-4 pt-[max(12px,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-6">
      {/* Left: Brand Wordmark OR Exit Explore */}
      <div className="pointer-events-auto flex items-center justify-between gap-2 sm:justify-start">
        {explorationMode === "hero" ? (
          <div className="hud-glass flex items-center gap-3 rounded-full px-4 py-2">
            <span className="font-serif text-base font-semibold tracking-[0.04em] text-[#FAF7F2] sm:text-lg">
              {CAFE_INFO.name}
            </span>
            <span
              className="hidden h-3.5 w-px bg-[#FAF7F2]/20 md:inline-block"
              aria-hidden="true"
            />
            <span className="hidden text-xs text-[#D8CEC2] md:inline">
              {CAFE_INFO.tagline}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={exitToHero}
            className="hud-glass flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A970] active:scale-[0.97]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            <span>Exit Explore</span>
          </button>
        )}

        {/* Open Status Pill on Hero / Quick Menu on Explore Mobile */}
        {explorationMode === "hero" ? (
          <div className="hud-glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-[#FAF7F2]">
            <span
              className={`h-2 w-2 rounded-full ${
                isOpen ? "bg-[#6EE7A8]" : "bg-[#E5A970]"
              }`}
              aria-hidden="true"
            />
            <span className="tabular-nums">
              {isOpen ? `Open · ${CAFE_INFO.hoursShort}` : "Opens 08:00 WIB"}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setActiveDrawer("menu")}
            aria-label="Open menu"
            className="hud-glass flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F] sm:hidden"
          >
            <UtensilsCrossed
              className="h-4 w-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Menu</span>
          </button>
        )}
      </div>

      {/* Right: 4-Time-of-Day Ambience Segmented Control */}
      <div
        role="group"
        aria-label="Time of day ambience"
        className="pointer-events-auto hud-glass inline-flex self-start rounded-full p-1 sm:self-auto"
      >
        {LIGHTING_MOOD_ORDER.map((mood) => {
          const preset = LIGHTING_PRESETS[mood];
          const Icon = MOOD_ICONS[mood];
          const active = lightingMood === mood;

          return (
            <button
              key={mood}
              type="button"
              aria-pressed={active}
              onClick={() => setLightingMood(mood)}
              className={`flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A970] active:scale-[0.97] ${
                active
                  ? "bg-[#FAF7F2] text-[#14110F]"
                  : "text-[#D8CEC2] hover:text-[#FAF7F2]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
