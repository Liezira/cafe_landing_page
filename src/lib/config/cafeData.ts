export type AtmosphereMood = "morning" | "midday" | "sunset" | "night";
export type SpaceSpotId = "wfc" | "bar" | "terrace";
export type VisitActivity = "wfc" | "hangout" | "solo";
export type MenuCategory =
  | "Signature Coffee"
  | "Classics & Tea"
  | "Pastry & Kitchen";

export interface SpaceSpot {
  id: SpaceSpotId;
  tabLabel: string;
  pinLabel: string;
  title: string;
  description: string;
  photo: string;
  tags: string[];
  pinPosition: string;
}

export interface CuratedMenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  badge: string;
  description: string;
}

export interface WayfindingStep {
  num: string;
  title: string;
  description: string;
  photo: string;
  caption: string;
}

export interface GoogleReview {
  id: string;
  quote: string;
  date: string;
}

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
  AtmosphereMood,
  { label: string; caption: string; photoFilter: string; scrimClass: string }
> = {
  morning: {
    label: "Morning",
    caption: "08:00 WIB · Soft morning light & quiet first-cup calm",
    photoFilter: "brightness(1.06) contrast(0.98) saturate(1.04) sepia(0.08)",
    scrimClass:
      "bg-gradient-to-b from-[#14110F]/55 via-[#14110F]/20 to-[#14110F]/92",
  },
  midday: {
    label: "Midday",
    caption: "12:00 WIB · Crisp daylight tailored for focused WFC sessions",
    photoFilter: "brightness(1.14) contrast(1.02) saturate(0.96)",
    scrimClass:
      "bg-gradient-to-b from-[#14110F]/45 via-[#14110F]/18 to-[#14110F]/90",
  },
  sunset: {
    label: "Sunset",
    caption: "17:00 WIB · Warm golden-hour glow across the linear bar",
    photoFilter: "brightness(0.94) contrast(1.06) saturate(1.18) sepia(0.22)",
    scrimClass:
      "bg-gradient-to-b from-[#1C120C]/55 via-[#5C3014]/22 to-[#14110F]/95",
  },
  night: {
    label: "Night",
    caption: "20:00 WIB · Intimate dark-timber tones & glowing pendant shelves",
    photoFilter: "brightness(0.76) contrast(1.14) saturate(1.08)",
    scrimClass:
      "bg-gradient-to-b from-[#0C0B0E]/68 via-[#14110F]/34 to-[#14110F]/97",
  },
};

export const SPACE_SPOTS: Record<SpaceSpotId, SpaceSpot> = {
  wfc: {
    id: "wfc",
    tabLabel: "Indoor WFC",
    pinLabel: "WFC Table",
    title: "Indoor WFC Teak Table",
    description:
      "Warm teak table facing the linear-lit bar with steady Wi-Fi (Elixavida), nearby power outlets, and calm indoor AC acoustics.",
    photo: "/images/cafe/table-bar-view.webp",
    tags: ["Power Outlets", "Wi-Fi: Elixavida", "1-4 Guests"],
    pinPosition: "top-[54%] left-[26%]",
  },
  bar: {
    id: "bar",
    tabLabel: "Espresso Bar",
    pinLabel: "Espresso Bar",
    title: "Main Espresso & Exploration Bar",
    description:
      "Watch our baristas craft layered Gaps Latte and slow-fermented Elixavida under our signature linear pendant light.",
    photo: "/images/cafe/main-bar.webp",
    tags: ["Bar Seating", "Barista Exploration", "Signature Craft"],
    pinPosition: "top-[30%] right-[16%]",
  },
  terrace: {
    id: "terrace",
    tabLabel: "2F Terrace",
    pinLabel: "2F Brick Terrace",
    title: "2F Terracotta Brick Terrace",
    description:
      "Open-air 2nd-floor teak balcony with cushioned brick benches overlooking the greenery of BSD Boulevard Utara.",
    photo: "/images/cafe/outdoor-brick-bench.webp",
    tags: ["Outdoor Balcony", "Brick Bench", "2nd Floor View"],
    pinPosition: "bottom-[18%] right-[16%]",
  },
};

export const ACTIVITY_PAIRINGS: Record<
  VisitActivity,
  { label: string; waPhrase: string; note: string }
> = {
  wfc: {
    label: "Work (WFC)",
    waPhrase: "a WFC session (1-2 guests)",
    note: "Suggested pairing: Gaps Latte + quiet power-outlet table.",
  },
  hangout: {
    label: "Hangout",
    waPhrase: "a hangout with friends (4 guests)",
    note: "Suggested pairing: Elixavida Thermos Set + Pineapple Apple Strudel & Basque Cheesecake.",
  },
  solo: {
    label: "Solo Coffee",
    waPhrase: "a solo coffee break (1 guest)",
    note: "Suggested pairing: Hot Royal Earl Grey or Manual Brew on the 2F terrace.",
  },
};

export const FEATURED_TRIO = [
  {
    kicker: "Best Enjoyed Within 5 Min",
    title: "Gaps Latte",
    photo: "/images/cafe/gaps-latte-tea.webp",
    description:
      "Fresh espresso poured over chilled house-processed milk. Crafted in layers, not recommended for takeaway.",
  },
  {
    kicker: "Barista Exploration",
    title: "Elixavida & Forbidden Fruit",
    photo: "/images/cafe/signature-thermos-set.webp",
    description:
      "Slow-fermented spices and real fruit infusions served in our signature white capsule thermos with a clear ice sphere.",
  },
  {
    kicker: "All-Day Comfort Kitchen",
    title: "Pineapple Apple Strudel",
    photo: "/images/cafe/strudel-icecream.webp",
    description:
      "Flaky warm pastry with caramelized fruit and vanilla ice cream, alongside Blueberry Basque Cheesecake and Bihun Sapi Kuah.",
  },
] as const;

export const CURATED_MENU: CuratedMenuItem[] = [
  {
    id: "gaps-latte",
    name: "Gaps Latte",
    category: "Signature Coffee",
    badge: "Best within 5 min",
    description:
      "Fresh espresso layered over house-processed milk. Crafted for dine-in.",
  },
  {
    id: "forbidden-fruit",
    name: "Forbidden Fruit",
    category: "Signature Coffee",
    badge: "Signature",
    description:
      "Bright barista exploration espresso infused with real fruit notes.",
  },
  {
    id: "elixavida",
    name: "Elixavida",
    category: "Signature Coffee",
    badge: "Signature",
    description:
      "Slow-fermented chocolate, hazelnut & warm spices served with a crystal ice sphere.",
  },
  {
    id: "himalayan-salted-caramel",
    name: "Himalayan Salted Caramel",
    category: "Signature Coffee",
    badge: "Crowd Favorite",
    description:
      "Smooth espresso balanced with toasted caramel and pink sea salt.",
  },
  {
    id: "milkies",
    name: "Peach / Melon / Strawberry Milkies",
    category: "Classics & Tea",
    badge: "Real Fruit",
    description:
      "Made from real liquid fruit instead of artificial syrups, plus 52% cocoa chocolate.",
  },
  {
    id: "basque",
    name: "Blueberry Basque Cheesecake",
    category: "Pastry & Kitchen",
    badge: "House Bake",
    description:
      "Caramelized bruleed top, creamy center, paired with bright blueberry compote.",
  },
  {
    id: "strudel",
    name: "Pineapple Apple Strudel",
    category: "Pastry & Kitchen",
    badge: "Warm Pastry",
    description:
      "Flaky pastry filled with caramelized apple and pineapple, served with vanilla ice cream.",
  },
  {
    id: "nashville",
    name: "Hot-Honey Nashville Chicken",
    category: "Pastry & Kitchen",
    badge: "Kitchen",
    description:
      "Crispy spiced chicken drizzled with warm chili honey and crinkle-cut fries.",
  },
];

export const WAYFINDING_STEPS: WayfindingStep[] = [
  {
    num: "01",
    title: "Arrive at Hotel Starlet BSD Entrance",
    description: "Walk up the short front steps into the ground-floor lobby.",
    photo: "/images/cafe/terrace-front.webp",
    caption: "Step 1 · Hotel Starlet BSD Entrance -> Short front steps into lobby",
  },
  {
    num: "02",
    title: "Turn Right to the Twin Escalators",
    description:
      "Take a few steps right and ride the twin escalators up to the 2nd floor.",
    photo: "/images/cafe/outdoor-brick-bench.webp",
    caption: "Step 2 · Turn right in the lobby & ride the twin escalators to 2F",
  },
  {
    num: "03",
    title: "Turn Left Twice Past the Orange Arch",
    description:
      "Follow the 2nd-floor corridor past the potted palms and Coffee & All Day Dining board.",
    photo: "/images/cafe/terrace-front.webp",
    caption: "Step 3 · Turn left twice on 2F past the orange arch & A-frame board",
  },
  {
    num: "04",
    title: "Step Into SMALL GAPS Terrace & Bar",
    description:
      "Choose the teak outdoor terrace or push open the black-framed glass door into AC seating.",
    photo: "/images/cafe/main-bar.webp",
    caption: "Step 4 · Welcome to SMALL GAPS Coffee 2F Terrace & Espresso Bar",
  },
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    quote:
      "They served uniquely prepared coffees with real ingredients (either fruit or herbs), with a balanced ratio and smooth blend for each drink.",
    date: "Google Maps · Jul 2026",
  },
  {
    id: "rev-2",
    quote:
      "One of the best coffee shop in BSD. Forbidden Fruit (coffee), Gaps Latte (kind of Dirty Latte) & Blueberry Basque Cheesecake nya wajib coba.",
    date: "Google Maps · Mar 2026",
  },
  {
    id: "rev-3",
    quote:
      "Came here to get another unique coffee experience, and amazingly surprise with the good taste, service and atmosphere of Small Gaps.",
    date: "Google Maps · Aug 2025",
  },
];
