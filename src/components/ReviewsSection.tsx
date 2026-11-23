"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { CAFE_INFO, VERIFIED_REVIEWS } from "@/lib/config/cafeData";
import { UI_COPY } from "@/lib/config/i18n";
import { useCafeStore } from "@/store/useCafeStore";

export function ReviewsSection() {
  const language = useCafeStore((s) => s.language);
  const t = UI_COPY[language];

  return (
    <section
      id="reviews"
      className="bg-[#FAF7F2] py-20 text-[#14110F] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] text-[#8A4A1F] uppercase tabular-nums">
              <Star className="h-3.5 w-3.5 fill-[#8A4A1F]" />
              <span>
                {CAFE_INFO.rating} / 5.0 · {CAFE_INFO.reviewCount} Verified
                Google Reviews
              </span>
            </p>
            <h2 className="font-serif mt-2 text-3xl font-medium text-[#14110F] sm:text-5xl">
              {t.reviewsTitle}
            </h2>
          </div>

          <a
            href={CAFE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A4A1F] underline underline-offset-4"
          >
            <span>Read all {CAFE_INFO.reviewCount} reviews on Google</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {VERIFIED_REVIEWS.map((rev, idx) => (
            <motion.blockquote
              key={rev.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-between rounded-[20px] border border-[#E7DFD3] bg-[#F2ECE1] p-6"
            >
              <p className="text-sm leading-relaxed text-[#14110F]">
                &ldquo;{rev.quote}&rdquo;
              </p>
              <footer className="mt-5 flex items-center justify-between text-xs text-[#574D45] tabular-nums">
                <span className="flex items-center gap-0.5 text-[#8A4A1F]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#8A4A1F]" />
                  ))}
                </span>
                <span>{rev.date}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
