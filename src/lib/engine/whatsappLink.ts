import { CAFE_INFO } from "@/lib/config/menuData";
import type { SeatedActivity } from "@/lib/types/scene";

export type WhatsAppIntent = "general" | "seat" | "menu";

export function buildWhatsAppUrl(
  intent: WhatsAppIntent,
  seatTitle?: string,
  activity?: SeatedActivity
): string {
  let message =
    "Hi SMALL GAPS Coffee BSD, I'd like to reserve a table for 2 guests today. Is there availability?";

  if (intent === "seat" && seatTitle) {
    if (activity === "wfc") {
      message = `Hi SMALL GAPS Coffee BSD, I'd like to reserve the ${seatTitle} for 1-2 guests (WFC session) today.`;
    } else if (activity === "hangout") {
      message = `Hi SMALL GAPS Coffee BSD, I'd like to reserve the ${seatTitle} for 4 guests (hangout with friends) today.`;
    } else if (activity === "solo") {
      message = `Hi SMALL GAPS Coffee BSD, I'd like to reserve the ${seatTitle} for 1 guest (solo coffee) today.`;
    } else {
      message = `Hi SMALL GAPS Coffee BSD, I explored your 3D space and would like to reserve the ${seatTitle} spot for 2 guests today.`;
    }
  } else if (intent === "menu") {
    message =
      "Hi SMALL GAPS Coffee BSD, I'd like to reserve a table and try the Gaps Latte. Is there availability today?";
  }

  return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export function isCafeCurrentlyOpen(now: Date = new Date()): boolean {
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const wibDate = new Date(utcMs + 7 * 60 * 60_000);
  const hour = wibDate.getHours();
  return hour >= CAFE_INFO.openHourWib && hour < CAFE_INFO.closeHourWib;
}
