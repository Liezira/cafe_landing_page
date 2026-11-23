"use client";

import {
  ArrowLeft,
  Eye,
  LayoutList,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { UI_COPY } from "@/lib/config/i18n";
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
  const cameraPerspective = useCafeStore((s) => s.cameraPerspective);
  const toggleCameraPerspective = useCafeStore(
    (s) => s.toggleCameraPerspective
  );
  const language = useCafeStore((s) => s.language);
  const toggleLanguage = useCafeStore((s) => s.toggleLanguage);
  const audioEnabled = useCafeStore((s) => s.audioEnabled);
  const toggleAudio = useCafeStore((s) => s.toggleAudio);
  const toggleLiteMode = useCafeStore((s) => s.toggleLiteMode);
  const lightingMood = useCafeStore((s) => s.lightingMood);
  const setLightingMood = useCafeStore((s) => s.setLightingMood);
  const exitToHero = useCafeStore((s) => s.exitToHero);

  const isOpen = isCafeCurrentlyOpen();
  const t = UI_COPY[language];

  return (
    <header className="pointer-events-none flex w-full flex-col gap-2 px-3 pt-[max(10px,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-6">
      {/* Row 1 (Mobile) / Left (Desktop): Brand or Exit + Compact Utility Pills */}
      <div className="pointer-events-auto flex items-center justify-between gap-2 sm:justify-start">
        {explorationMode === "hero" ? (
          <div className="hud-glass flex min-h-[44px] items-center gap-2.5 rounded-full px-3.5 py-1.5 sm:px-4">
            <span className="font-serif text-sm font-semibold tracking-[0.04em] text-[#FAF7F2] sm:text-lg">
              {CAFE_INFO.name}
            </span>
            <span
              className={`h-2 w-2 rounded-full ${
                isOpen ? "bg-[#6EE7A8]" : "bg-[#E5A970]"
              }`}
              aria-hidden="true"
            />
            <span className="hidden text-xs text-[#D8CEC2] tabular-nums md:inline">
              {isOpen ? t.openLabel : t.closedLabel}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={exitToHero}
              className="hud-glass flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F] active:scale-[0.97]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              <span>{t.exit}</span>
            </button>

            {explorationMode === "explore" && (
              <button
                type="button"
                onClick={toggleCameraPerspective}
                aria-label="Toggle TPP and FPP view"
                className="hud-glass-elevated flex min-h-[44px] items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F] active:scale-[0.97]"
              >
                {cameraPerspective === "tpp" ? (
                  <>
                    <User className="h-3.5 w-3.5 text-[#E5A970]" strokeWidth={1.75} />
                    <span>{t.tppToFpp}</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5 text-[#E5A970]" strokeWidth={1.75} />
                    <span>{t.fppToTpp}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Compact Utility Controls: Audio + EN/ID + 2D Lite */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={audioEnabled ? t.soundOn : t.soundOff}
            aria-pressed={audioEnabled}
            className={`hud-glass flex h-[44px] w-[44px] items-center justify-center rounded-full transition active:scale-[0.95] ${
              audioEnabled
                ? "bg-[#FAF7F2] text-[#14110F]"
                : "text-[#FAF7F2] hover:bg-[#FAF7F2]/14"
            }`}
          >
            {audioEnabled ? (
              <Volume2 className="h-4 w-4" strokeWidth={1.6} />
            ) : (
              <VolumeX className="h-4 w-4" strokeWidth={1.6} />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Switch language between English and Indonesian"
            className="hud-glass flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-3 text-xs font-semibold text-[#FAF7F2] transition hover:bg-[#FAF7F2]/14 active:scale-[0.95]"
          >
            {language.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={toggleLiteMode}
            aria-label={t.liteMode}
            className="hud-glass flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-xs font-medium text-[#D8CEC2] transition hover:bg-[#FAF7F2]/14 hover:text-[#FAF7F2] active:scale-[0.95]"
          >
            <LayoutList className="h-3.5 w-3.5" strokeWidth={1.6} />
            <span className="hidden sm:inline">{t.liteMode}</span>
          </button>
        </div>
      </div>

      {/* Row 2 (Mobile) / Right (Desktop): 4-Time-of-Day Mood Switcher */}
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
              className={`flex min-h-[36px] items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition active:scale-[0.97] sm:px-3 ${
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
