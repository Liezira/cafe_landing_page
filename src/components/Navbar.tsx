"use client";

import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { CAFE_INFO } from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

export function Navbar() {
  const language = useCafeStore((s) => s.language);
  const audioEnabled = useCafeStore((s) => s.audioEnabled);
  const toggleLanguage = useCafeStore((s) => s.toggleLanguage);
  const toggleAudio = useCafeStore((s) => s.toggleAudio);
  const t = UI_COPY[language];

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-3 sm:px-8 sm:py-4">
      <nav className="glass-pill mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="font-serif text-base font-semibold tracking-[0.06em] text-[#FAF7F2] sm:text-lg">
            {CAFE_INFO.name}
          </span>
          <span className="hidden h-3.5 w-px bg-[#FAF7F2]/20 md:inline-block" />
          <span className="hidden text-xs text-[#D8CEC2] md:inline">
            BSD City · 2F
          </span>
        </a>

        <div className="hidden items-center gap-6 text-xs font-medium text-[#D8CEC2] lg:flex">
          <a href="#space" className="transition hover:text-[#FAF7F2]">
            {t.navSpace}
          </a>
          <a href="#menu" className="transition hover:text-[#FAF7F2]">
            {t.navMenu}
          </a>
          <a href="#wayfinding" className="transition hover:text-[#FAF7F2]">
            {t.navFind}
          </a>
          <a href="#reviews" className="transition hover:text-[#FAF7F2]">
            {t.navReviews}
          </a>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label="Toggle cafe ambience sound"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FAF7F2]/16 text-[#D8CEC2] transition hover:bg-[#FAF7F2]/12 hover:text-[#FAF7F2]"
          >
            {audioEnabled ? (
              <Volume2 className="h-4 w-4 text-[#E5A970]" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="flex h-9 min-w-[40px] items-center justify-center rounded-full border border-[#FAF7F2]/16 px-2.5 text-xs font-semibold text-[#FAF7F2] transition hover:bg-[#FAF7F2]/12"
          >
            {language.toUpperCase()}
          </button>

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-1.5 rounded-full bg-[#1B5E3A] px-3.5 text-xs font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E] sm:px-4"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{t.navReserve}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
