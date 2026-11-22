"use client";

import { ExternalLink, MessageCircle, Star, X } from "lucide-react";
import {
  CAFE_GALLERY_PHOTOS,
  GOOGLE_REVIEWS_SUMMARY,
  VERIFIED_GOOGLE_REVIEWS,
} from "@/lib/config/reviewsData";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

export function ReviewsDrawer() {
  const activeDrawer = useCafeStore((s) => s.activeDrawer);
  const setActiveDrawer = useCafeStore((s) => s.setActiveDrawer);

  if (activeDrawer !== "reviews") return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-end bg-[#14110F]/45 sm:items-stretch"
      onClick={() => setActiveDrawer("none")}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Guest Reviews and Photos"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[84dvh] w-full flex-col rounded-t-[24px] bg-[#FAF7F2] text-[#14110F] shadow-2xl sm:h-dvh sm:max-h-none sm:w-[440px] sm:rounded-none"
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1 w-9 rounded-full bg-[#D8CEC2]" />
        </div>

        {/* Header with 5.0 Google Rating */}
        <div className="flex items-start justify-between border-b border-[#EAE2D6] px-6 py-5">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#14110F]">
              Guest Stories
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#8A4A1F] tabular-nums">
              <Star
                className="h-3.5 w-3.5 fill-[#8A4A1F] text-[#8A4A1F]"
                aria-hidden="true"
              />
              <span>
                {GOOGLE_REVIEWS_SUMMARY.averageRating.toFixed(1)} / 5.0 ·{" "}
                {GOOGLE_REVIEWS_SUMMARY.totalReviews} Verified Google Reviews
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveDrawer("none")}
            aria-label="Close reviews"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#574D45] hover:bg-[#EAE2D6]"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable Real Photo Strip + Verified Reviews */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {/* Real Cafe Photo Strip */}
          <section>
            <h3 className="text-xs font-semibold tracking-[0.08em] text-[#574D45] uppercase">
              Real Moments at SMALL GAPS BSD
            </h3>
            <div className="mt-3 flex gap-2.5 overflow-x-auto pb-2">
              {CAFE_GALLERY_PHOTOS.map((photo) => (
                <figure
                  key={photo.src}
                  className="w-44 shrink-0 overflow-hidden rounded-[12px] border border-[#EAE2D6] bg-[#F2ECE1]"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-28 w-full object-cover"
                  />
                  <figcaption className="px-2.5 py-1.5 text-[11px] font-medium text-[#574D45]">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Verified Google Reviews List */}
          <section>
            <h3 className="text-xs font-semibold tracking-[0.08em] text-[#574D45] uppercase">
              What Guests Say on Google
            </h3>
            <ul className="mt-3 space-y-4">
              {VERIFIED_GOOGLE_REVIEWS.map((review) => (
                <li
                  key={review.id}
                  className="rounded-[14px] border border-[#EAE2D6] bg-[#F2ECE1]/70 p-4"
                >
                  <div className="flex items-center justify-between text-xs text-[#574D45] tabular-nums">
                    <span className="flex items-center gap-0.5 text-[#8A4A1F]">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-3.5 w-3.5 fill-[#8A4A1F]"
                          aria-hidden="true"
                        />
                      ))}
                    </span>
                    <span>{review.date}</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#14110F]">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {review.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#FAF7F2] px-2.5 py-0.5 text-[11px] font-medium text-[#574D45]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky Footer */}
        <div className="space-y-2 border-t border-[#EAE2D6] bg-[#FAF7F2] px-6 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
          <a
            href={GOOGLE_REVIEWS_SUMMARY.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#14110F] px-4 py-2 text-xs font-semibold text-[#14110F] transition hover:bg-[#EAE2D6]"
          >
            <span>Read All {GOOGLE_REVIEWS_SUMMARY.totalReviews} Reviews on Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
          <a
            href={buildWhatsAppUrl("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3A] px-4 py-2.5 text-sm font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            <span>Reserve Your Visit on WhatsApp</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
