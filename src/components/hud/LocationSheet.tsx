"use client";

import {
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { UI_COPY } from "@/lib/config/i18n";
import { CAFE_INFO } from "@/lib/config/menuData";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

export function LocationSheet() {
  const activeDrawer = useCafeStore((s) => s.activeDrawer);
  const language = useCafeStore((s) => s.language);
  const setActiveDrawer = useCafeStore((s) => s.setActiveDrawer);

  if (activeDrawer !== "location") return null;

  const t = UI_COPY[language];

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-[#14110F]/45 sm:items-center sm:p-4"
      onClick={() => setActiveDrawer("none")}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Location and Hours"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-[24px] bg-[#FAF7F2] p-6 pb-[max(24px,env(safe-area-inset-bottom))] text-[#14110F] shadow-2xl sm:rounded-[22px]"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#14110F]">
              {CAFE_INFO.addressShort}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#574D45] tabular-nums">
              <Star
                className="h-3.5 w-3.5 fill-[#8A4A1F] text-[#8A4A1F]"
                aria-hidden="true"
              />
              <span>
                {CAFE_INFO.rating} · {CAFE_INFO.reviewCount} Reviews on Google
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveDrawer("none")}
            aria-label="Close location sheet"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#574D45] hover:bg-[#EAE2D6] hover:text-[#14110F]"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-5 space-y-3 border-y border-[#EAE2D6] py-4 text-sm text-[#574D45]">
          <p className="flex items-start gap-2.5">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-[#8A4A1F]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>{CAFE_INFO.addressFull}</span>
          </p>
          <p className="flex items-center gap-2.5 tabular-nums">
            <Clock
              className="h-4 w-4 shrink-0 text-[#8A4A1F]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Open Daily · {CAFE_INFO.hoursShort}</span>
          </p>
          <p className="text-xs font-medium text-[#8A4A1F]">
            {CAFE_INFO.halalNote}
          </p>
        </div>

        {/* Subtle Gading Serpong Dec 2026 Expansion Note */}
        <div className="mt-4 flex items-start gap-2.5 rounded-[14px] border border-[#EAE2D6] bg-[#F2ECE1] p-3.5 text-xs text-[#574D45]">
          <Sparkles
            className="mt-0.5 h-4 w-4 shrink-0 text-[#8A4A1F]"
            strokeWidth={1.5}
          />
          <div>
            <p className="font-semibold text-[#14110F]">{t.newStoreTitle}</p>
            <p className="mt-0.5">{t.newStoreDesc}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={CAFE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full border border-[#14110F] px-4 py-2.5 text-sm font-semibold text-[#14110F] transition hover:bg-[#EAE2D6]"
          >
            <Navigation className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            <span>Open in Google Maps</span>
          </a>
          <a
            href={buildWhatsAppUrl("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full bg-[#1B5E3A] px-4 py-2.5 text-sm font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
