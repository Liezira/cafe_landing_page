"use client";

import {
  Box,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { CAFE_INFO, CURATED_MENU } from "@/lib/config/menuData";
import {
  CAFE_GALLERY_PHOTOS,
  GOOGLE_REVIEWS_SUMMARY,
  VERIFIED_GOOGLE_REVIEWS,
} from "@/lib/config/reviewsData";
import { UI_COPY } from "@/lib/config/i18n";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

/**
 * Fast, zero-WebGL mobile-friendly 2D Lite View for low-spec phones or guests
 * who prefer instant editorial browsing of real photos, menu, reviews & WA booking.
 */
export function LiteCafeView() {
  const language = useCafeStore((s) => s.language);
  const toggleLanguage = useCafeStore((s) => s.toggleLanguage);
  const toggleLiteMode = useCafeStore((s) => s.toggleLiteMode);
  const t = UI_COPY[language];

  return (
    <div className="min-h-dvh w-full overflow-y-auto bg-[#FAF7F2] pb-24 text-[#14110F]">
      {/* Top Sticky Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#EAE2D6] bg-[#FAF7F2]/95 px-4 py-3 backdrop-blur-md">
        <span className="font-serif text-base font-semibold tracking-[0.04em] text-[#14110F]">
          {CAFE_INFO.name}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="min-h-[38px] rounded-full border border-[#D8CEC2] px-3 text-xs font-semibold text-[#574D45]"
          >
            {language.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={toggleLiteMode}
            className="flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#14110F] px-3.5 text-xs font-semibold text-[#FAF7F2]"
          >
            <Box className="h-3.5 w-3.5 text-[#E5A970]" />
            <span>{t.backTo3d}</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-8 px-4 pt-5">
        {/* Hero Photo & Core Venue Info */}
        <section>
          <div className="overflow-hidden rounded-[18px] border border-[#EAE2D6]">
            <img
              src="/images/cafe/main-bar.webp"
              alt="SMALL GAPS Coffee BSD Main Bar"
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#8A4A1F] uppercase tracking-[0.06em]">
              {CAFE_INFO.tagline}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-medium text-[#14110F]">
              {CAFE_INFO.addressShort}
            </h1>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#574D45] tabular-nums">
              <span className="flex items-center gap-1 font-semibold text-[#8A4A1F]">
                <Star className="h-3.5 w-3.5 fill-[#8A4A1F]" />
                {GOOGLE_REVIEWS_SUMMARY.averageRating.toFixed(1)} ·{" "}
                {GOOGLE_REVIEWS_SUMMARY.totalReviews} Reviews
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {CAFE_INFO.hoursShort}
              </span>
              <span>{CAFE_INFO.halalNote}</span>
            </div>
          </div>

          {/* Gading Serpong Dec 2026 Editorial Note */}
          <div className="mt-4 flex items-start gap-2.5 rounded-[14px] border border-[#EAE2D6] bg-[#F2ECE1] p-3.5 text-xs text-[#574D45]">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#8A4A1F]" />
            <div>
              <p className="font-semibold text-[#14110F]">{t.newStoreTitle}</p>
              <p className="mt-0.5">{t.newStoreDesc}</p>
            </div>
          </div>
        </section>

        {/* Real Photo Strip */}
        <section>
          <h2 className="font-serif text-xl font-medium text-[#14110F]">
            Inside &amp; Terrace
          </h2>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {CAFE_GALLERY_PHOTOS.map((p) => (
              <figure
                key={p.src}
                className="w-52 shrink-0 overflow-hidden rounded-[12px] border border-[#EAE2D6] bg-[#F2ECE1]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-32 w-full object-cover"
                />
                <figcaption className="px-2.5 py-1.5 text-[11px] font-medium text-[#574D45]">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Curated Menu */}
        <section>
          <h2 className="font-serif text-xl font-medium text-[#14110F]">
            {t.menuTitle}
          </h2>
          <ul className="mt-3 divide-y divide-[#EAE2D6]">
            {CURATED_MENU.map((item) => (
              <li key={item.id} className="py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold text-[#14110F]">
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="text-xs font-semibold text-[#8A4A1F]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-[#574D45]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Real Google Reviews */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-medium text-[#14110F]">
              Google Reviews
            </h2>
            <a
              href={GOOGLE_REVIEWS_SUMMARY.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-[#8A4A1F] underline"
            >
              <span>All {GOOGLE_REVIEWS_SUMMARY.totalReviews}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <ul className="mt-3 space-y-3">
            {VERIFIED_GOOGLE_REVIEWS.slice(0, 3).map((r) => (
              <li
                key={r.id}
                className="rounded-[14px] border border-[#EAE2D6] bg-[#F2ECE1]/70 p-4 text-sm text-[#14110F]"
              >
                &ldquo;{r.quote}&rdquo;
              </li>
            ))}
          </ul>
        </section>

        {/* Directions */}
        <section className="rounded-[16px] border border-[#EAE2D6] bg-[#F2ECE1] p-4">
          <p className="flex items-start gap-2 text-sm text-[#574D45]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8A4A1F]" />
            <span>{CAFE_INFO.addressFull}</span>
          </p>
          <a
            href={CAFE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#14110F] underline"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>
      </main>

      {/* Sticky Bottom WhatsApp CTA */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#EAE2D6] bg-[#FAF7F2]/95 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md">
        <a
          href={buildWhatsAppUrl("general")}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex min-h-[48px] max-w-2xl items-center justify-center gap-2 rounded-full bg-[#1B5E3A] px-5 text-sm font-semibold text-[#FAF7F2]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
          <span>{t.orderOrReserveWa}</span>
        </a>
      </div>
    </div>
  );
}
