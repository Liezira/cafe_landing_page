export type MoodId = "morning" | "midday" | "sunset" | "night";
export type SpotId = "wfc" | "bar" | "terrace";
export type ActivityId = "wfc" | "hangout" | "solo";
export type MenuCategory =
  | "all"
  | "Signature Coffee"
  | "Classics & Tea"
  | "Pastry & Kitchen";

export const CAFE_INFO = {
  name: "SMALL GAPS",
  tagline: "Daily Comfort Coffee & Food",
  halalNote: "No Alcohol · No Pork · No Lard",
  rating: "5.0",
  reviewCount: 271,
  hoursShort: "08:00-22:00 WIB",
  openHourWib: 8,
  closeHourWib: 22,
  addressShort: "Hotel Starlet BSD, 2nd Floor",
  addressFull:
    "Hotel Starlet BSD Lt. 2, Jl. BSD Boulevard Utara, Lengkong Kulon, Pagedangan, Tangerang, Banten 15331",
  whatsappNumber: "62818199099",
  whatsappDisplay: "+62 818-199-099",
  instagramHandle: "@smallgaps.id",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=SMALL+GAPS+Hotel+Starlet+BSD",
} as const;

export const MOOD_CONFIG: Record<
  MoodId,
  { label: string; caption: string; photoFilter: string; scrim: string }
> = {
  morning: {
    label: "Morning",
    caption: "08:00 WIB · Soft morning light & quiet first-cup calm",
    photoFilter: "brightness(1.06) contrast(0.98) saturate(1.04) sepia(0.08)",
    scrim:
      "linear-gradient(180deg, rgba(20,17,15,0.52) 0%, rgba(20,17,15,0.22) 45%, rgba(20,17,15,0.92) 100%)",
  },
  midday: {
    label: "Midday",
    caption: "12:00 WIB · Crisp daylight tailored for focused WFC sessions",
    photoFilter: "brightness(1.14) contrast(1.02) saturate(0.96)",
    scrim:
      "linear-gradient(180deg, rgba(20,17,15,0.46) 0%, rgba(20,17,15,0.18) 45%, rgba(20,17,15,0.90) 100%)",
  },
  sunset: {
    label: "Sunset",
    caption: "17:00 WIB · Warm golden-hour glow across the linear bar",
    photoFilter: "brightness(0.94) contrast(1.06) saturate(1.18) sepia(0.22)",
    scrim:
      "linear-gradient(180deg, rgba(28,18,12,0.56) 0%, rgba(92,48,20,0.22) 45%, rgba(20,17,15,0.95) 100%)",
  },
  night: {
    label: "Night",
    caption: "20:00 WIB · Intimate dark-timber tones & glowing pendant shelves",
    photoFilter: "brightness(0.76) contrast(1.14) saturate(1.08)",
    scrim:
      "linear-gradient(180deg, rgba(12,11,14,0.68) 0%, rgba(20,17,15,0.34) 45%, rgba(20,17,15,0.97) 100%)",
  },
};

export const SPACE_SPOTS: Record<
  SpotId,
  {
    id: SpotId;
    tabLabel: string;
    title: string;
    desc: string;
    photo: string;
    tags: string[];
  }
> = {
  wfc: {
    id: "wfc",
    tabLabel: "Indoor WFC",
    title: "Indoor WFC Teak Table",
    desc: "Warm teak table facing the linear-lit bar with steady Wi-Fi (Elixavida), nearby power outlets, and calm indoor AC acoustics.",
    photo: "/images/cafe/table-bar-view.webp",
    tags: ["Power Outlets", "Wi-Fi: Elixavida", "1-4 Guests"],
  },
  bar: {
    id: "bar",
    tabLabel: "Espresso Bar",
    title: "Main Espresso & Exploration Bar",
    desc: "Watch our baristas craft layered Gaps Latte and slow-fermented Elixavida under our signature linear pendant light.",
    photo: "/images/cafe/main-bar.webp",
    tags: ["Bar Seating", "Barista Exploration", "Signature Craft"],
  },
  terrace: {
    id: "terrace",
    tabLabel: "2F Terrace",
    title: "2F Terracotta Brick Terrace",
    desc: "Open-air 2nd-floor teak balcony with cushioned brick benches overlooking the greenery of BSD Boulevard Utara.",
    photo: "/images/cafe/outdoor-brick-bench.webp",
    tags: ["Outdoor Balcony", "Brick Bench", "2nd Floor View"],
  },
};

export const ACTIVITY_CONFIG: Record<
  ActivityId,
  { label: string; waLabel: string; note: string }
> = {
  wfc: {
    label: "Work (WFC)",
    waLabel: "WFC session (1-2 guests)",
    note: "Suggested pairing: Gaps Latte + quiet power-outlet table.",
  },
  hangout: {
    label: "Hangout",
    waLabel: "hangout with friends (4 guests)",
    note: "Suggested pairing: Elixavida Thermos Set + Pineapple Apple Strudel & Basque Cheesecake.",
  },
  solo: {
    label: "Solo Coffee",
    waLabel: "solo coffee break (1 guest)",
    note: "Suggested pairing: Hot Royal Earl Grey or Manual Brew on the 2F terrace.",
  },
};

export interface MenuItem {
  id: string;
  name: string;
  cat: Exclude<MenuCategory, "all">;
  badge: string;
  desc: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "gaps-latte",
    name: "Gaps Latte",
    cat: "Signature Coffee",
    badge: "Best within 5 min",
    desc: "Fresh espresso layered over house-processed milk. Crafted for dine-in.",
  },
  {
    id: "forbidden-fruit",
    name: "Forbidden Fruit",
    cat: "Signature Coffee",
    badge: "Signature",
    desc: "Bright barista exploration espresso infused with real fruit notes.",
  },
  {
    id: "elixavida",
    name: "Elixavida",
    cat: "Signature Coffee",
    badge: "Signature",
    desc: "Slow-fermented chocolate, hazelnut & warm spices served with a crystal ice sphere.",
  },
  {
    id: "himalayan-salted-caramel",
    name: "Himalayan Salted Caramel",
    cat: "Signature Coffee",
    badge: "Crowd Favorite",
    desc: "Smooth espresso balanced with toasted caramel and pink sea salt.",
  },
  {
    id: "milkies",
    name: "Peach / Melon / Strawberry Milkies",
    cat: "Classics & Tea",
    badge: "Real Fruit",
    desc: "Made from real liquid fruit instead of artificial syrups, plus 52% cocoa chocolate.",
  },
  {
    id: "basque",
    name: "Blueberry Basque Cheesecake",
    cat: "Pastry & Kitchen",
    badge: "House Bake",
    desc: "Caramelized bruleed top, creamy center, paired with bright blueberry compote.",
  },
  {
    id: "strudel",
    name: "Pineapple Apple Strudel",
    cat: "Pastry & Kitchen",
    badge: "Warm Pastry",
    desc: "Flaky pastry filled with caramelized apple and pineapple, served with vanilla ice cream.",
  },
  {
    id: "nashville",
    name: "Hot-Honey Nashville Chicken",
    cat: "Pastry & Kitchen",
    badge: "Kitchen",
    desc: "Crispy spiced chicken drizzled with warm chili honey and crinkle-cut fries.",
  },
];

export const WAYFINDING_STEPS = [
  {
    num: "01",
    title: "Arrive at Hotel Starlet BSD Entrance",
    desc: "Walk up the short front steps into the ground-floor lobby.",
    photo: "/images/cafe/terrace-front.webp",
    caption: "Step 1 · Hotel Starlet BSD Entrance -> Short front steps into lobby",
  },
  {
    num: "02",
    title: "Turn Right to the Twin Escalators",
    desc: "Take a few steps right and ride the twin escalators up to the 2nd floor.",
    photo: "/images/cafe/outdoor-brick-bench.webp",
    caption: "Step 2 · Turn right in the lobby & take the twin escalators to 2F",
  },
  {
    num: "03",
    title: "Turn Left Twice Past the Orange Arch",
    desc: "Follow the 2nd-floor corridor past the potted palms and Coffee & All Day Dining board.",
    photo: "/images/cafe/terrace-front.webp",
    caption: "Step 3 · Turn left twice on 2F past the orange arch & A-frame board",
  },
  {
    num: "04",
    title: "Step Into SMALL GAPS Terrace & Bar",
    desc: "Choose the teak outdoor terrace or push open the black-framed glass door into AC seating.",
    photo: "/images/cafe/main-bar.webp",
    caption: "Step 4 · Welcome to SMALL GAPS Coffee 2F Terrace & Espresso Bar",
  },
] as const;

export const VERIFIED_REVIEWS = [
  {
    id: "rev-1",
    date: "Google Maps · Jul 2026",
    quote:
      "They served uniquely prepared coffees with real ingredients (either fruit or herbs), with a balanced ratio and smooth blend for each drink.",
  },
  {
    id: "rev-2",
    date: "Google Maps · Mar 2026",
    quote:
      "One of the best coffee shop in BSD. Forbidden Fruit (coffee), Gaps Latte (kind of Dirty Latte) & Blueberry Basque Cheesecake nya wajib coba.",
  },
  {
    id: "rev-3",
    date: "Google Maps · Aug 2025",
    quote:
      "Came here to get another unique coffee experience, and amazingly surprise with the good taste, service and atmosphere of Small Gaps.",
  },
] as const;
