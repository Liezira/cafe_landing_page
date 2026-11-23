"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CURATED_MENU,
  FEATURED_TRIO,
  type MenuCategory,
} from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { useCafeStore } from "@/store/useCafeStore";

const CATEGORIES: ("all" | MenuCategory)[] = [
  "all",
  "Signature Coffee",
  "Classics & Tea",
  "Pastry & Kitchen",
];

export function MenuShowcase() {
  const [activeCat, setActiveCat] = useState<"all" | MenuCategory>("all");
  const language = useCafeStore((s) => s.language);
  const openBarista = useCafeStore((s) => s.openBarista);
  const t = UI_COPY[language];

  const items =
    activeCat === "all"
      ? CURATED_MENU
      : CURATED_MENU.filter((m) => m.category === activeCat);

  return (
    <section id="menu" className="bg-[#FAF7F2] py-20 text-[#14110F] sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-end gap-6 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#8A4A1F] uppercase">
              {t.menuKicker}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#14110F] sm:text-5xl">
              {t.menuTitle}
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="text-sm text-[#574D45]">
              No Alcohol · No Pork · No Lard · Rp50.000-Rp150.000
            </p>
          </div>
        </motion.div>

        {/* Featured Trio with Real Photos */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURED_TRIO.map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-[20px] border border-[#E7DFD3] bg-[#F2ECE1]"
            >
              <div className="overflow-hidden">
                <img
                  src={card.photo}
                  alt={card.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold tracking-[0.06em] text-[#8A4A1F] uppercase">
                  {card.kicker}
                </span>
                <h3 className="mt-1 font-serif text-xl font-medium text-[#14110F]">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#574D45]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Filter Tabs + Interactive Menu Cards */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E7DFD3] pb-4">
            {CATEGORIES.map((cat) => {
              const active = activeCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCat(cat)}
                  className={`rounded-full px-4 py-2 text-xs transition ${
                    active
                      ? "bg-[#14110F] font-semibold text-[#FAF7F2]"
                      : "border border-[#D8CEC2] font-medium text-[#574D45] hover:border-[#14110F]"
                  }`}
                >
                  {cat === "all" ? "All Menu" : cat}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-[16px] border border-[#E7DFD3] bg-[#F2ECE1]/70 p-5"
              >
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-serif text-lg font-medium text-[#14110F]">
                      {item.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#8A4A1F]">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#574D45]">
                    {item.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openBarista(item.name)}
                  className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-[#8A4A1F]/40 bg-[#FAF7F2] px-3.5 py-1.5 text-xs font-semibold text-[#8A4A1F] transition hover:bg-[#8A4A1F] hover:text-[#FAF7F2]"
                >
                  <span>{t.askPrepare}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
