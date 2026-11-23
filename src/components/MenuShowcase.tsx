"use client";

import { motion } from "framer-motion";
import {
  CAFE_INFO,
  MENU_ITEMS,
  type MenuCategory,
} from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { useCafeStore } from "@/store/useCafeStore";

const CATEGORIES: MenuCategory[] = [
  "all",
  "Signature Coffee",
  "Classics & Tea",
  "Pastry & Kitchen",
];

export function MenuShowcase() {
  const activeCategory = useCafeStore((s) => s.activeCategory);
  const setActiveCategory = useCafeStore((s) => s.setActiveCategory);
  const openBarista = useCafeStore((s) => s.openBarista);
  const language = useCafeStore((s) => s.language);
  const t = UI_COPY[language];

  const items =
    activeCategory === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.cat === activeCategory);

  return (
    <section id="menu" className="bg-[#FAF7F2] py-20 text-[#14110F] sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-end gap-6 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#8A4A1F] uppercase">
              {t.menuKicker}
            </p>
            <h2 className="font-serif mt-2 text-3xl font-medium text-[#14110F] sm:text-5xl">
              {t.menuTitle}
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="text-sm text-[#574D45]">
              {CAFE_INFO.halalNote} · Rp50.000-Rp150.000
            </p>
          </div>
        </motion.div>

        {/* Real Signature Photo Trio */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              img: "/images/cafe/gaps-latte-tea.webp",
              tag: "Best Enjoyed Within 5 Min",
              title: "Gaps Latte",
              desc: "Fresh espresso poured over chilled house-processed milk. Crafted in layers, not recommended for takeaway.",
            },
            {
              img: "/images/cafe/signature-thermos-set.webp",
              tag: "Barista Exploration",
              title: "Elixavida & Forbidden Fruit",
              desc: "Slow-fermented spices, real fruit infusions, served in our signature white capsule thermos with a clear ice sphere.",
            },
            {
              img: "/images/cafe/strudel-icecream.webp",
              tag: "All-Day Comfort Kitchen",
              title: "Pineapple Apple Strudel",
              desc: "Flaky warm pastry with caramelized fruit and vanilla ice cream, alongside Blueberry Basque Cheesecake and Bihun Sapi Kuah.",
            },
          ].map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group overflow-hidden rounded-[20px] border border-[#E7DFD3] bg-[#F2ECE1]"
            >
              <div className="overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  loading="lazy"
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold tracking-[0.06em] text-[#8A4A1F] uppercase">
                  {card.tag}
                </span>
                <h3 className="font-serif mt-1 text-xl font-medium text-[#14110F]">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#574D45]">{card.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Filterable Curated Menu */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E7DFD3] pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs transition ${
                  activeCategory === cat
                    ? "bg-[#14110F] font-semibold text-[#FAF7F2]"
                    : "border border-[#D8CEC2] font-medium text-[#574D45] hover:border-[#14110F]"
                }`}
              >
                {cat === "all" ? "All Menu" : cat}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
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
                  <p className="mt-1.5 text-sm text-[#574D45]">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => openBarista(item.name)}
                  className="mt-4 inline-flex min-h-[38px] self-start items-center rounded-full border border-[#8A4A1F]/40 bg-[#FAF7F2] px-3.5 py-1.5 text-xs font-semibold text-[#8A4A1F] transition hover:bg-[#8A4A1F] hover:text-[#FAF7F2]"
                >
                  {t.askBaristaPrepare}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
