"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  ACTIVITY_CONFIG,
  SPACE_SPOTS,
  type ActivityId,
  type SpotId,
} from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

const SPOT_IDS: SpotId[] = ["wfc", "bar", "terrace"];
const ACTIVITY_IDS: ActivityId[] = ["wfc", "hangout", "solo"];

export function SpaceExplorer() {
  const activeSpot = useCafeStore((s) => s.activeSpot);
  const setActiveSpot = useCafeStore((s) => s.setActiveSpot);
  const activeActivity = useCafeStore((s) => s.activeActivity);
  const setActiveActivity = useCafeStore((s) => s.setActiveActivity);
  const language = useCafeStore((s) => s.language);

  const t = UI_COPY[language];
  const spot = SPACE_SPOTS[activeSpot];
  const activity = ACTIVITY_CONFIG[activeActivity];

  return (
    <section id="space" className="bg-[#14110F] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[#E5A970] uppercase">
              {t.spaceKicker}
            </p>
            <h2 className="font-serif mt-2 text-3xl font-medium text-[#FAF7F2] sm:text-5xl">
              {t.spaceTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#D8CEC2]">
            {t.spaceDesc}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive Real Photo Stage */}
          <div className="relative overflow-hidden rounded-[22px] border border-[#FAF7F2]/12 bg-[#1C1917] lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.img
                key={spot.photo}
                src={spot.photo}
                alt={spot.title}
                initial={{ opacity: 0.25, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.25 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="h-[340px] w-full object-cover sm:h-[440px]"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14110F]/75 via-transparent to-transparent" />

            <button
              type="button"
              onClick={() => setActiveSpot("wfc")}
              className={`absolute top-[54%] left-[24%] flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs shadow-lg transition hover:scale-105 ${
                activeSpot === "wfc"
                  ? "hotspot-pulse bg-[#FAF7F2] font-semibold text-[#14110F]"
                  : "glass-pill font-medium text-[#FAF7F2]"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[#8A4A1F]" />
              <span>WFC Table</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSpot("bar")}
              className={`absolute top-[30%] right-[14%] flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs shadow-lg transition hover:scale-105 ${
                activeSpot === "bar"
                  ? "hotspot-pulse bg-[#FAF7F2] font-semibold text-[#14110F]"
                  : "glass-pill font-medium text-[#FAF7F2]"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[#E5A970]" />
              <span>Espresso Bar</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSpot("terrace")}
              className={`absolute right-[16%] bottom-[16%] flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs shadow-lg transition hover:scale-105 ${
                activeSpot === "terrace"
                  ? "hotspot-pulse bg-[#FAF7F2] font-semibold text-[#14110F]"
                  : "glass-pill font-medium text-[#FAF7F2]"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[#E5A970]" />
              <span>2F Brick Terrace</span>
            </button>
          </div>

          {/* Selected Spot Card + Activity Switcher */}
          <div className="flex flex-col justify-between rounded-[22px] border border-[#FAF7F2]/12 bg-[#1C1917] p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="flex flex-wrap gap-2">
                {SPOT_IDS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveSpot(id)}
                    className={`rounded-full px-3.5 py-1.5 text-xs transition ${
                      activeSpot === id
                        ? "bg-[#FAF7F2] font-semibold text-[#14110F]"
                        : "border border-[#FAF7F2]/16 font-medium text-[#D8CEC2] hover:text-[#FAF7F2]"
                    }`}
                  >
                    {SPACE_SPOTS[id].tabLabel}
                  </button>
                ))}
              </div>

              <h3 className="font-serif mt-6 text-2xl font-medium text-[#FAF7F2] sm:text-3xl">
                {spot.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#D8CEC2]">
                {spot.desc}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {spot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#FAF7F2]/14 px-3 py-1 text-xs text-[#E5A970]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-[#FAF7F2]/12 pt-5">
                <p className="text-xs font-medium text-[#D8CEC2]">
                  {t.visitMode}
                </p>
                <div className="mt-2.5 grid grid-cols-3 gap-1.5 rounded-full bg-[#14110F] p-1">
                  {ACTIVITY_IDS.map((actId) => (
                    <button
                      key={actId}
                      type="button"
                      onClick={() => setActiveActivity(actId)}
                      className={`rounded-full py-2 text-xs transition ${
                        activeActivity === actId
                          ? "bg-[#FAF7F2] font-semibold text-[#14110F]"
                          : "font-medium text-[#D8CEC2]"
                      }`}
                    >
                      {ACTIVITY_CONFIG[actId].label}
                    </button>
                  ))}
                </div>
                <p className="mt-2.5 text-xs text-[#D8CEC2]">{activity.note}</p>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl(spot.title, activeActivity)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3A] px-5 py-3 text-sm font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t.ctaReserveSpot}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
