import { CAFE_INFO } from "@/lib/config/cafeData";

export function buildWhatsAppUrl(customMessage?: string): string {
  const msg =
    customMessage ??
    "Hi SMALL GAPS Coffee BSD, I'd like to reserve a table today. Is there availability?";
  return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(
    msg
  )}`;
}

export function isCafeCurrentlyOpen(now: Date = new Date()): boolean {
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const wibDate = new Date(utcMs + 7 * 60 * 60_000);
  const hour = wibDate.getHours();
  return hour >= CAFE_INFO.openHourWib && hour < CAFE_INFO.closeHourWib;
}
