export type UiLanguage = "en" | "id";

export const UI_COPY: Record<
  UiLanguage,
  {
    openLabel: string;
    closedLabel: string;
    menu: string;
    location: string;
    reserve: string;
    exploreSpace: string;
    exit: string;
    viewInAr: string;
    viewInArMobile: string;
    liteMode: string;
    backTo3d: string;
    skipToCafe: string;
    startFromHotel: string;
    tppToFpp: string;
    fppToTpp: string;
    soundOn: string;
    soundOff: string;
    menuTitle: string;
    menuSub: string;
    orderPreview: string;
    orderOrReserveWa: string;
    reserveThisSpot: string;
    standUp: string;
    newStoreTitle: string;
    newStoreDesc: string;
    baristaWelcome: string;
    baristaPlaceholder: string;
    baristaQuickQuestions: string[];
  }
> = {
  en: {
    openLabel: "Open · 08:00-22:00 WIB",
    closedLabel: "Opens 08:00 WIB",
    menu: "Menu",
    location: "Location",
    reserve: "Reserve",
    exploreSpace: "Explore Space",
    exit: "Exit",
    viewInAr: "View in AR",
    viewInArMobile: "View in AR (Mobile)",
    liteMode: "Lite View",
    backTo3d: "Return to 3D",
    skipToCafe: "Skip to Cafe (2F)",
    startFromHotel: "Start from Hotel",
    tppToFpp: "TPP · FPP",
    fppToTpp: "FPP · TPP",
    soundOn: "Mute cafe ambience",
    soundOff: "Play cafe ambience",
    menuTitle: "Daily Comfort Menu",
    menuSub: "No Alcohol · No Pork · No Lard · Tap any item to preview at bar",
    orderPreview: "Order Preview at Bar",
    orderOrReserveWa: "Order or Reserve on WhatsApp",
    reserveThisSpot: "Reserve This Spot on WhatsApp",
    standUp: "Stand Up",
    newStoreTitle: "Coming Soon: Gading Serpong",
    newStoreDesc: "Expanding with a new store in December 2026.",
    baristaWelcome:
      "Welcome up to the 2nd floor! Ask me anything about SMALL GAPS Coffee BSD, or pick a menu item to watch me prepare it at the bar.",
    baristaPlaceholder: "Ask about SMALL GAPS menu, WFC, or hours...",
    baristaQuickQuestions: [
      "What's your best seller?",
      "Is it good for WFC?",
      "No pork / alcohol?",
      "How do I get here?",
    ],
  },
  id: {
    openLabel: "Buka · 08.00-22.00 WIB",
    closedLabel: "Buka 08.00 WIB",
    menu: "Menu",
    location: "Lokasi",
    reserve: "Reservasi",
    exploreSpace: "Jelajahi Ruang",
    exit: "Keluar",
    viewInAr: "Lihat di AR",
    viewInArMobile: "Mode AR (HP)",
    liteMode: "Mode Ringan",
    backTo3d: "Kembali ke 3D",
    skipToCafe: "Langsung ke Kafe (Lt. 2)",
    startFromHotel: "Mulai dari Hotel",
    tppToFpp: "TPP · FPP",
    fppToTpp: "FPP · TPP",
    soundOn: "Matikan suara kafe",
    soundOff: "Nyalakan suasana kafe",
    menuTitle: "Menu Harian SMALL GAPS",
    menuSub: "No Alcohol · No Pork · No Lard · Ketuk menu untuk lihat penyajian",
    orderPreview: "Coba Pesan di Bar",
    orderOrReserveWa: "Pesan atau Reservasi via WhatsApp",
    reserveThisSpot: "Reservasi Meja Ini via WhatsApp",
    standUp: "Berdiri",
    newStoreTitle: "Segera Hadir: Gading Serpong",
    newStoreDesc: "Cabang baru SMALL GAPS hadir Desember 2026.",
    baristaWelcome:
      "Selamat datang di lantai 2! Tanya apa saja soal SMALL GAPS Coffee BSD, atau pilih menu untuk lihat saya racik langsung di bar.",
    baristaPlaceholder: "Tanya soal menu, tempat WFC, atau jam buka...",
    baristaQuickQuestions: [
      "Menu andalannya apa?",
      "Enak buat WFC?",
      "No pork & alcohol?",
      "Rute ke sini gimana?",
    ],
  },
};
