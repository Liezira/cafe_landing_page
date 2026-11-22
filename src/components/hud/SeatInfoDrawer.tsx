"use client";

import { MessageCircle, Users, X } from "lucide-react";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

export function SeatInfoDrawer() {
  const activeDrawer = useCafeStore((s) => s.activeDrawer);
  const activeSeat = useCafeStore((s) => s.activeSeat);
  const clearSeatFocus = useCafeStore((s) => s.clearSeatFocus);

  if (activeDrawer !== "seat_info" || !activeSeat) return null;

  const seat = SEAT_ZONES[activeSeat];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center p-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:bottom-6">
      <section
        role="dialog"
        aria-label={seat.title}
        className="pointer-events-auto hud-glass-elevated w-full max-w-sm rounded-[22px] p-5 text-[#FAF7F2] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-medium text-[#FAF7F2]">
              {seat.title}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-[#E5A970]">
              <Users className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              <span>{seat.capacity}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={clearSeatFocus}
            aria-label="Back to explore"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#D8CEC2] hover:bg-[#FAF7F2]/12 hover:text-[#FAF7F2]"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-[#D8CEC2]">
          {seat.subtitle}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {seat.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#FAF7F2]/16 px-2.5 py-1 text-[11px] font-medium text-[#FAF7F2]"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={buildWhatsAppUrl("seat", seat.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3A] px-4 py-2.5 text-sm font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          <span>Reserve This Spot on WhatsApp</span>
        </a>
      </section>
    </div>
  );
}
