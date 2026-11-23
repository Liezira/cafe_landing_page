"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Star } from "lucide-react";
import {
  CAFE_INFO,
  MOOD_CONFIG,
  type AtmosphereMood,
} from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { useCafeStore } from "@/store/useCafeStore";

const MOODS: AtmosphereMood[] = ["morning", "midday", "sunset", "night"];

export function HeroSection() {
  const mood = useCafeStore((s) => s.mood);
  const setMood = useCafeStore((s) => s.setMood);
  const language = useCafeStore((s) => s.language);
  const openBarista = useCafeStore((s) => s.openBarista);

  const moodInfo = MOOD_CONFIG[mood];
  const t = UI_COPY[language];

  return (
    <section
      id="top"
      className="relative flex min-h-dvh w-full flex-col justify-end overflow-hidden pt-24 pb-20 sm:pb-24"
    >
      <img
        src="/images/cafe/main-bar.webp"
        alt="SMALL GAPS Coffee BSD Main Bar and Industrial Interior"
        style={{ filter: moodInfo.photoFilter }}
        className="absolute inset-0 h-full w-full object-cover object-center transition-[filter] duration-700"
      />
      <div
        className={`absolute inset-0 transition-colors duration-700 ${moodInfo.scrimClass}`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8"
      >
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-[#D8CEC2]">
          <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[#FAF7F2]">
            <span className="h-2 w-2 rounded-full bg-[#6EE7A8]" />
            <span className="tabular-nums">{t.heroHours}</span>
          </span>
          <span className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[#E5A970] tabular-nums">
            <Star className="h-3.5 w-3.5 fill-[#E5A970]" />
            <span>
              {CAFE_INFO.rating} · {CAFE_INFO.reviewCount} Google Reviews
            </span>
          </span>
          <span className="glass-pill hidden rounded-full px-3.5 py-1.5 text-[#D8CEC2] sm:inline-flex">
            {CAFE_INFO.halalNote}
          </span>
        </div>

        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.06] font-medium tracking-[-0.02em] text-[#FAF7F2] sm:text-6xl lg:text-7xl">
          {t.heroTitle}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#D8CEC2] sm:text-lg">
          {t.heroSub}
        </p>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#space"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#FAF7F2] px-6 py-3 text-sm font-semibold text-[#14110F] transition hover:bg-[#F2ECE1]"
            >
              <span>{t.ctaExplore}</span>
              <ArrowDownRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => openBarista()}
              className="glass-pill inline-flex min-h-[48px] items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2]/14"
            >
              <img
                src="/images/cafe/barista-portrait.png"
                alt="SMALL GAPS Barista"
                className="h-7 w-7 rounded-full border border-[#E5A970]/60 object-cover"
              />
              <span>{t.ctaBarista}</span>
            </button>
          </div>

          <div className="flex flex-col items-start gap-1.5 lg:items-end">
            <div
              className="glass-pill inline-flex rounded-full p-1"
              role="group"
              aria-label="Atmosphere time of day"
            >
              {MOODS.map((m) => {
                const active = mood === m;
                return (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setMood(m)}
                    className={`rounded-full px-3 py-1.5 text-xs transition ${
                      active
                        ? "bg-[#FAF7F2] font-semibold text-[#14110F]"
                        : "font-medium text-[#D8CEC2] hover:text-[#FAF7F2]"
                    }`}
                  >
                    {MOOD_CONFIG[m].label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#E5A970]">{moodInfo.caption}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
