"use client";

import { MessageCircle } from "lucide-react";
import { CAFE_INFO } from "@/lib/config/cafeData";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";

export function Footer() {
  return (
    <footer className="bg-[#14110F] py-16 text-[#FAF7F2]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p className="font-serif text-2xl font-medium">{CAFE_INFO.name}</p>
          <p className="mt-1.5 text-sm text-[#D8CEC2]">
            {CAFE_INFO.addressShort} · Open Daily {CAFE_INFO.hoursShort}
          </p>
          <p className="mt-1 text-xs text-[#8C7E73]">
            Instagram {CAFE_INFO.instagramHandle} · WhatsApp{" "}
            {CAFE_INFO.whatsappDisplay}
          </p>
        </div>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#1B5E3A] px-7 py-3 text-sm font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Reserve via WhatsApp</span>
        </a>
      </div>
    </footer>
  );
}
