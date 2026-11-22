"use client";

import { Coffee, Laptop, MessageCircle, Users, X } from "lucide-react";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";
import type { SeatedActivity } from "@/lib/types/scene";

const ACTIVITY_OPTIONS: {
  id: SeatedActivity;
  label: string;
  icon: typeof Laptop;
}[] = [
  { id: "wfc", label: "Work (WFC)", icon: Laptop },
  { id: "hangout", label: "Hangout", icon: Users },
  { id: "solo", label: "Solo Coffee", icon: Coffee },
];

export function SeatInfoDrawer() {
  const activeDrawer = useCafeStore((s) => s.activeDrawer);
  const activeSeat = useCafeStore((s) => s.activeSeat);
  const seatedActivity = useCafeStore((s) => s.seatedActivity);
  const setSeatedActivity = useCafeStore((s) => s.setSeatedActivity);
  const clearSeatFocus = useCafeStore((s) => s.clearSeatFocus);

  if (activeDrawer !== "seat_info" || !activeSeat) return null;

  const seat = SEAT_ZONES[activeSeat];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center p-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:bottom-6">
      <section
        role="dialog"
        aria-label={seat.title}
        className="pointer-events-auto hud-glass-elevated w-full max-w-md rounded-[22px] p-5 text-[#FAF7F2] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={seat.previewPhoto}
              alt={seat.title}
              className="h-12 w-12 shrink-0 rounded-[10px] border border-[#FAF7F2]/20 object-cover"
            />
            <div>
              <h2 className="font-serif text-lg font-medium text-[#FAF7F2]">
                {seat.title}
              </h2>
              <p className="mt-0.5 text-xs text-[#E5A970]">
                {seat.capacity} · Drag screen to look around
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearSeatFocus}
            aria-label="Stand up and walk"
            className="flex h-9 items-center gap-1 rounded-full border border-[#FAF7F2]/16 px-3 text-xs font-medium text-[#D8CEC2] hover:bg-[#FAF7F2]/12 hover:text-[#FAF7F2]"
          >
            <span>Stand Up</span>
            <X className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* 3-Mode Seated Activity Switcher */}
        <div
          role="group"
          aria-label="Preview seated activity"
          className="mt-4 grid grid-cols-3 gap-1.5 rounded-full bg-[#14110F]/65 p-1"
        >
          {ACTIVITY_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = seatedActivity === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSeatedActivity(opt.id)}
                className={`flex min-h-[36px] items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-[#FAF7F2] text-[#14110F]"
                    : "text-[#D8CEC2] hover:text-[#FAF7F2]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-[#D8CEC2]">
          {seat.subtitle}
        </p>

        <a
          href={buildWhatsAppUrl("seat", seat.title, seatedActivity)}
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
