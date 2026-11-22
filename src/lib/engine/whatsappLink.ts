import { CAFE_INFO } from "@/lib/config/menuData";

export type WhatsAppIntent = "general" | "seat" | "menu";

export function buildWhatsAppUrl(
  intent: WhatsAppIntent,
  seatTitle?: string
): string {
  let message =
    "Hi SMALL GAPS Coffee BSD, I'd like to reserve a table for 2 guests today. Is there availability?";

  if (intent === "seat" && seatTitle) {
    message = `Hi SMALL GAPS Coffee BSD, I explored your 3D space and would like to reserve the ${seatTitle} spot for 2 guests today.`;
  } else if (intent === "menu") {
    message =
      "Hi SMALL GAPS Coffee BSD, I'd like to reserve a table and try the Gaps Latte. Is there availability today?";
  }

  return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export function isCafeCurrentlyOpen(now: Date = new Date()): boolean {
  // Convert current time to Asia/Jakarta (UTC+7)
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const wibDate = new Date(utcMs + 7 * 60 * 60_000);
  const hour = wibDate.getHours();
  return hour >= CAFE_INFO.openHourWib && hour < CAFE_INFO.closeHourWib;
}
