"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  ACTIVITY_PAIRINGS,
  SPACE_SPOTS,
  type SpaceSpotId,
  type VisitActivity,
} from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

const SPOT_IDS: SpaceSpotId[] = ["wfc", "bar", "terrace"];
const ACTIVITIES: VisitActivity[] = ["wfc", "hangout", "solo"];

export function SpaceExplorer() {
  const activeSpot = useCafeStore((s) => s.activeSpot);
  const setActiveSpot = useCafeStore((s) => s.setActiveSpot);
  const activeActivity = useCafeStore((s) => s.activeActivity);
  const setActiveActivity = useCafeStore((s) => s.setActiveActivity);
  const language = useCafeStore((s) => s.language);

  const spot = SPACE_SPOTS[activeSpot];
  const act = ACTIVITY_PAIRINGS[activeActivity];
  const t = UI_COPY[language];

  const waMessage = `Hi SMALL GAPS Coffee BSD, I'd like to reserve the ${spot.title} for ${act.waPhrase} today.`;

  return (
    <section id="space" className="bg-[#14110F] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[#E5A970] uppercase">
              {t.spaceKicker}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#FAF7F2] sm:text-5xl">
              {t.spaceTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#D8CEC2]">
            {t.spaceDesc}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive Photo Stage with Hotspots */}
          <div className="relative overflow-hidden rounded-[22px] border border-[#FAF7F2]/12 bg-[#1C1917] lg:col-span-7">
            <img
              src={spot.photo}
              alt={spot.title}
              className="h-[340px] w-full object-cover transition duration-500 sm:h-[440px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14110F]/80 via-transparent to-transparent" />

            {SPOT_IDS.map((id) => {
              const s = SPACE_SPOTS[id];
              const isSelected = activeSpot === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSpot(id)}
                  className={`absolute ${s.pinPosition} flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition hover:scale-105 ${
                    isSelected
                      ? "bg-[#FAF7F2] font-semibold text-[#14110F] shadow-lg"
                      : "border border-[#FAF7F2]/30 bg-[#14110F]/80 font-medium text-[#FAF7F2] backdrop-blur-md"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected ? "bg-[#8A4A1F]" : "bg-[#E5A970]"
                    }`}
                  />
                  <span>{s.pinLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Spot Card + Activity Pairing */}
          <div className="flex flex-col justify-between rounded-[22px] border border-[#FAF7F2]/12 bg-[#1C1917] p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="flex flex-wrap gap-2">
                {SPOT_IDS.map((id) => {
                  const isSelected = activeSpot === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveSpot(id)}
                      className={`rounded-full px-3.5 py-1.5 text-xs transition ${
                        isSelected
                          ? "bg-[#FAF7F2] font-semibold text-[#14110F]"
                          : "border border-[#FAF7F2]/16 font-medium text-[#D8CEC2] hover:text-[#FAF7F2]"
                      }`}
                    >
                      {SPACE_SPOTS[id].tabLabel}
                    </button>
                  );
                })}
              </div>

              <h3 className="mt-6 font-serif text-2xl font-medium text-[#FAF7F2] sm:text-3xl">
                {spot.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#D8CEC2]">
                {spot.description}
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
                  {ACTIVITIES.map((a) => {
                    const isSelected = activeActivity === a;
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setActiveActivity(a)}
                        className={`rounded-full py-2 text-xs transition ${
                          isSelected
                            ? "bg-[#FAF7F2] font-semibold text-[#14110F]"
                            : "font-medium text-[#D8CEC2] hover:text-[#FAF7F2]"
                        }`}
                      >
                        {ACTIVITY_PAIRINGS[a].label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2.5 text-xs text-[#D8CEC2]">{act.note}</p>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl(waMessage)}
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
