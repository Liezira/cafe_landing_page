export interface MenuItem {
  id: string;
  name: string;
  category: "Signature Coffee" | "Classics & Tea" | "Pastry & Kitchen";
  description: string;
  badge?: string;
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
  instagramUrl: "https://www.instagram.com/smallgaps.id",
  linktreeUrl: "https://linktr.ee/smallgaps",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=SMALL+GAPS+Hotel+Starlet+BSD",
} as const;

export const CURATED_MENU: MenuItem[] = [
  {
    id: "gaps-latte",
    name: "Gaps Latte",
    category: "Signature Coffee",
    description:
      "Fresh espresso over house-processed milk, crafted to be enjoyed in layers.",
    badge: "Dine-In Highlight · Best within 5 min",
  },
  {
    id: "forbidden-fruit",
    name: "Forbidden Fruit",
    category: "Signature Coffee",
    description:
      "Barista exploration espresso layered with bright, real fruit character.",
    badge: "Signature",
  },
  {
    id: "elixavida",
    name: "Elixavida",
    category: "Signature Coffee",
    description:
      "Slow-fermented notes of chocolate, hazelnut, and warm spices.",
    badge: "Signature",
  },
  {
    id: "himalayan-salted-caramel",
    name: "Himalayan Salted Caramel",
    category: "Signature Coffee",
    description:
      "Balanced espresso paired with toasted caramel and a hint of pink sea salt.",
    badge: "Crowd Favorite",
  },
  {
    id: "flat-white",
    name: "Flat White & Manual Brew",
    category: "Classics & Tea",
    description:
      "Velvety microfoam classics or filter brews featuring House and Guest beans.",
  },
  {
    id: "real-fruit-milkies",
    name: "Peach / Melon / Strawberry Milkies",
    category: "Classics & Tea",
    description:
      "Crafted from real liquid fruit instead of artificial syrups, plus 52% cocoa chocolate.",
  },
  {
    id: "blueberry-basque-cheesecake",
    name: "Blueberry Basque Cheesecake",
    category: "Pastry & Kitchen",
    description:
      "Caramelized bruleed top, creamy center, paired with bright blueberry compote.",
    badge: "House Bake",
  },
  {
    id: "hot-honey-nashville-chicken",
    name: "Hot-Honey Nashville Chicken",
    category: "Pastry & Kitchen",
    description:
      "Crispy spiced fried chicken drizzled with warm chili honey and crinkle-cut fries.",
    badge: "Kitchen",
  },
  {
    id: "bihun-sapi-kuah",
    name: "Bihun Sapi Kuah",
    category: "Pastry & Kitchen",
    description:
      "Rice vermicelli with tender beef shortplate in a clear, house-made beef broth.",
    badge: "Comfort Bowl",
  },
];
