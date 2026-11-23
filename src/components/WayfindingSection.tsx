"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { CAFE_INFO, WAYFINDING_STEPS } from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { useCafeStore } from "@/store/useCafeStore";

export function WayfindingSection() {
  const [stepIdx, setStepIdx] = useState(0);
  const language = useCafeStore((s) => s.language);
  const t = UI_COPY[language];
  const current = WAYFINDING_STEPS[stepIdx];

  return (
    <section id="wayfinding" className="bg-[#1C1917] py-20 text-[#FAF7F2] sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#E5A970] uppercase">
              {t.wayfindingKicker}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#FAF7F2] sm:text-5xl">
              {t.wayfindingTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#D8CEC2]">
              {CAFE_INFO.addressFull}
            </p>

            <div className="mt-7 space-y-3">
              {WAYFINDING_STEPS.map((step, idx) => {
                const active = idx === stepIdx;
                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setStepIdx(idx)}
                    className={`flex w-full items-start gap-4 rounded-[16px] border p-4 text-left transition ${
                      active
                        ? "border-[#E5A970]/60 bg-[#14110F]"
                        : "border-[#FAF7F2]/12 bg-[#14110F]/45 hover:border-[#FAF7F2]/30"
                    }`}
                  >
                    <span
                      className={`font-serif text-lg font-semibold tabular-nums ${
                        active ? "text-[#E5A970]" : "text-[#D8CEC2]"
                      }`}
                    >
                      {step.num}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#FAF7F2]">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#D8CEC2]">
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[22px] border border-[#FAF7F2]/12 bg-[#14110F]">
              <img
                src={current.photo}
                alt={current.title}
                className="h-[340px] w-full object-cover sm:h-[420px]"
              />
              <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-[#FAF7F2]">
                    {current.caption}
                  </p>
                  <p className="mt-1 text-xs text-[#E5A970]">{t.newStoreNote}</p>
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
        </motion.div>
      </div>
    </section>
  );
}
