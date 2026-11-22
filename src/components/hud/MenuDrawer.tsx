"use client";

import { MessageCircle, X } from "lucide-react";
import { CAFE_INFO, CURATED_MENU } from "@/lib/config/menuData";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

const CATEGORIES = [
  "Signature Coffee",
  "Classics & Tea",
  "Pastry & Kitchen",
] as const;

export function MenuDrawer() {
  const activeDrawer = useCafeStore((s) => s.activeDrawer);
  const setActiveDrawer = useCafeStore((s) => s.setActiveDrawer);

  if (activeDrawer !== "menu") return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-end bg-[#14110F]/45 sm:items-stretch"
      onClick={() => setActiveDrawer("none")}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Daily Comfort Menu"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[82dvh] w-full flex-col rounded-t-[24px] bg-[#FAF7F2] text-[#14110F] shadow-2xl sm:h-dvh sm:max-h-none sm:w-[420px] sm:rounded-none"
      >
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1 w-9 rounded-full bg-[#D8CEC2]" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#EAE2D6] px-6 py-5">
          <div>
            <h2 className="font-serif text-2xl font-medium tracking-[-0.015em] text-[#14110F]">
              Daily Comfort Menu
            </h2>
            <p className="mt-1 text-xs font-medium text-[#574D45]">
              {CAFE_INFO.halalNote}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveDrawer("none")}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#574D45] transition hover:bg-[#EAE2D6] hover:text-[#14110F]"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable Menu List */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {CATEGORIES.map((category) => {
            const items = CURATED_MENU.filter((m) => m.category === category);
            return (
              <section key={category}>
                <h3 className="text-xs font-semibold tracking-[0.08em] text-[#574D45] uppercase">
                  {category}
                </h3>
                <ul className="mt-3 divide-y divide-[#EAE2D6]">
                  {items.map((item) => (
                    <li key={item.id} className="py-3.5 first:pt-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-base font-semibold text-[#14110F]">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-xs font-semibold text-[#8A4A1F]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-[#574D45]">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {/* Sticky Conversion Footer */}
        <div className="border-t border-[#EAE2D6] bg-[#FAF7F2] px-6 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
          <a
            href={buildWhatsAppUrl("menu")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3A] px-5 py-3 text-sm font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            <span>Order or Reserve on WhatsApp</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
