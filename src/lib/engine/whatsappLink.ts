import {
  ACTIVITY_CONFIG,
  CAFE_INFO,
  type ActivityId,
} from "@/lib/config/cafeData";

export function buildWhatsAppUrl(
  spotTitle?: string,
  activity?: ActivityId
): string {
  const msg =
    spotTitle && activity
      ? `Hi SMALL GAPS Coffee BSD, I'd like to reserve the ${spotTitle} for a ${ACTIVITY_CONFIG[activity].waLabel} today.`
      : "Hi SMALL GAPS Coffee BSD, I'd like to reserve a table today. Is there availability?";

  return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(
    msg
  )}`;
}
