export type UiLanguage = "en" | "id";

export const UI_COPY: Record<
  UiLanguage,
  {
    navSpace: string;
    navMenu: string;
    navFind: string;
    navReviews: string;
    navReserve: string;
    heroHours: string;
    heroTitle: string;
    heroSub: string;
    ctaExplore: string;
    ctaBarista: string;
    spaceKicker: string;
    spaceTitle: string;
    spaceDesc: string;
    visitMode: string;
    ctaReserveSpot: string;
    menuKicker: string;
    menuTitle: string;
    askBaristaPrepare: string;
    wayfindingKicker: string;
    wayfindingTitle: string;
    reviewsTitle: string;
    baristaPlaceholder: string;
    baristaQuick: string[];
  }
> = {
  en: {
    navSpace: "Space",
    navMenu: "Menu",
    navFind: "Find 2F",
    navReviews: "Reviews (5.0)",
    navReserve: "Reserve",
    heroHours: "Open Daily · 08:00-22:00 WIB",
    heroTitle: "A modern hideaway above BSD Boulevard.",
    heroSub:
      "Warm timber, dark industrial tones, and daily comfort coffee on the 2nd floor of Hotel Starlet BSD. Explore our corners, taste the 5-minute Gaps Latte, and reserve your table in one tap.",
    ctaExplore: "Explore the Space",
    ctaBarista: "Chat with Barista",
    spaceKicker: "Interactive Space Preview",
    spaceTitle: "Pick your corner before you arrive.",
    spaceDesc:
      "Tap any spot below to inspect real photography of our indoor WFC tables, main espresso bar, or 2nd-floor brick-bench terrace.",
    visitMode: "How are you visiting?",
    ctaReserveSpot: "Reserve This Spot on WhatsApp",
    menuKicker: "Daily Comfort Coffee & Food",
    menuTitle: "Crafted to be savored in person.",
    askBaristaPrepare: "Ask Barista to Prepare",
    wayfindingKicker: "Finding Our 2nd-Floor Hideaway",
    wayfindingTitle: "Four easy turns from Hotel Starlet BSD.",
    reviewsTitle: "Loved by BSD regulars.",
    baristaPlaceholder: "Ask about SMALL GAPS menu, WFC, or hours...",
    baristaQuick: [
      "What's your best seller?",
      "Is it good for WFC?",
      "No pork or alcohol?",
      "How do I get to 2F?",
    ],
  },
  id: {
    navSpace: "Ruang",
    navMenu: "Menu",
    navFind: "Rute Lt. 2",
    navReviews: "Ulasan (5.0)",
    navReserve: "Reservasi",
    heroHours: "Buka Setiap Hari · 08.00-22.00 WIB",
    heroTitle: "Tempat singgah hangat di lantai dua BSD Boulevard.",
    heroSub:
      "Perpaduan kayu jati hangat, nuansa industrial gelap, dan kopi nyaman di Hotel Starlet BSD Lt. 2. Intip sudut duduknya, rasakan Gaps Latte 5 menit, dan reservasi lewat WhatsApp.",
    ctaExplore: "Intip Suasana Ruang",
    ctaBarista: "Ngobrol dengan Barista",
    spaceKicker: "Pratinjau Ruang Interaktif",
    spaceTitle: "Pilih sudut duduk favoritmu sebelum datang.",
    spaceDesc:
      "Ketuk area di bawah untuk melihat foto asli meja WFC indoor, bar espresso utama, atau teras balkon bata terakota lantai 2.",
    visitMode: "Rencana kunjunganmu?",
    ctaReserveSpot: "Reservasi Sudut Ini via WhatsApp",
    menuKicker: "Daily Comfort Coffee & Food",
    menuTitle: "Diracik untuk dinikmati langsung di tempat.",
    askBaristaPrepare: "Minta Barista Siapkan",
    wayfindingKicker: "Panduan Menuju Lantai 2",
    wayfindingTitle: "Empat langkah mudah dari depan Hotel Starlet BSD.",
    reviewsTitle: "Disukai para penikmat kopi BSD.",
    baristaPlaceholder: "Tanya soal menu, tempat WFC, atau jam buka...",
    baristaQuick: [
      "Menu andalannya apa?",
      "Enak buat WFC?",
      "No pork & alcohol?",
      "Rute ke Lt. 2 gimana?",
    ],
  },
};
