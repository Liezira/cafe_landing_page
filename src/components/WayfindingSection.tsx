"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { CAFE_INFO, WAYFINDING_STEPS } from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { useCafeStore } from "@/store/useCafeStore";

export function WayfindingSection() {
  const step = useCafeStore((s) => s.wayfindingStep);
  const setStep = useCafeStore((s) => s.setWayfindingStep);
  const language = useCafeStore((s) => s.language);
  const t = UI_COPY[language];
  const current = WAYFINDING_STEPS[step];

  return (
    <section
      id="wayfinding"
      className="bg-[#1C1917] py-20 text-[#FAF7F2] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#E5A970] uppercase">
              {t.wayfindingKicker}
            </p>
            <h2 className="font-serif mt-2 text-3xl font-medium text-[#FAF7F2] sm:text-5xl">
              {t.wayfindingTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#D8CEC2]">
              {CAFE_INFO.addressFull}
            </p>

            <div className="mt-7 space-y-3">
              {WAYFINDING_STEPS.map((item, idx) => {
                const active = step === idx;
                return (
                  <button
                    key={item.num}
                    type="button"
                    onClick={() => setStep(idx)}
                    className={`flex w-full items-start gap-4 rounded-[16px] border p-4 text-left transition ${
                      active
                        ? "border-[#E5A970]/65 bg-[#14110F]"
                        : "border-[#FAF7F2]/12 bg-[#14110F]/45 hover:border-[#FAF7F2]/30"
                    }`}
                  >
                    <span
                      className={`font-serif text-lg font-semibold tabular-nums ${
                        active ? "text-[#E5A970]" : "text-[#D8CEC2]"
                      }`}
                    >
                      {item.num}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#FAF7F2]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#D8CEC2]">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[22px] border border-[#FAF7F2]/12 bg-[#14110F]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.photo + step}
                  src={current.photo}
                  alt={current.title}
                  initial={{ opacity: 0.3, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.3 }}
                  transition={{ duration: 0.4 }}
                  className="h-[340px] w-full object-cover sm:h-[420px]"
                />
              </AnimatePresence>
              <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-[#FAF7F2]">
                    {current.caption}
                  </p>
                  <p className="mt-1 text-xs text-[#E5A970]">
                    Coming Soon: New Store in Gading Serpong (December 2026)
                  </p>
                </div>
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] shrink-0 items-center gap-1.5 rounded-full border border-[#FAF7F2]/25 px-4 py-2 text-xs font-semibold text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F]"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
