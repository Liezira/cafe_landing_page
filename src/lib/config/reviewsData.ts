export interface GoogleReviewItem {
  id: string;
  rating: number;
  date: string;
  quote: string;
  highlights: string[];
  photo?: string;
}

export const GOOGLE_REVIEWS_SUMMARY = {
  averageRating: 5.0,
  totalReviews: 271,
  lastSynced: "2026-11-22",
  sourceUrl:
    "https://www.google.com/maps/search/?api=1&query=SMALL+GAPS+Hotel+Starlet+BSD",
} as const;

export const CAFE_GALLERY_PHOTOS = [
  {
    src: "/images/cafe/main-bar.webp",
    alt: "SMALL GAPS BSD industrial espresso bar with linear pendant light",
    caption: "Main Espresso Bar & Linear Lighting",
  },
  {
    src: "/images/cafe/terrace-front.webp",
    alt: "2nd floor outdoor teak terrace with coffee origin wall frames",
    caption: "2nd-Floor Balcony Terrace",
  },
  {
    src: "/images/cafe/outdoor-brick-bench.webp",
    alt: "Exposed brick bench seating overlooking the indoor bar",
    caption: "Terracotta Brick Bench Seating",
  },
  {
    src: "/images/cafe/signature-thermos-set.webp",
    alt: "SMALL GAPS white signature thermos served with crystal ice-sphere glass",
    caption: "Signature Exploration Serving Set",
  },
  {
    src: "/images/cafe/strudel-icecream.webp",
    alt: "Warm flaky Pineapple Apple Strudel with vanilla ice cream",
    caption: "Pineapple Apple Strudel & Gaps Latte",
  },
  {
    src: "/images/cafe/table-bar-view.webp",
    alt: "Seated wooden table POV looking toward the bar counter",
    caption: "Cozy Seated Ambience",
  },
] as const;

export const VERIFIED_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "rev-1",
    rating: 5,
    date: "2026-07-04",
    quote:
      "They served uniquely prepared coffees with real ingredients (either fruit or herbs), with a balanced ratio and smooth blend for each drink.",
    highlights: ["Real Ingredients", "Balanced Blend"],
    photo: "/images/cafe/signature-thermos-set.webp",
  },
  {
    id: "rev-2",
    rating: 5,
    date: "2026-03-19",
    quote:
      "One of the best coffee shop in BSD. Forbidden Fruit (coffee), Gaps Latte (kind of Dirty Latte) & Blueberry Basque Cheesecake nya wajib coba.",
    highlights: ["Gaps Latte", "Forbidden Fruit", "Basque Cheesecake"],
    photo: "/images/cafe/gaps-latte-tea.webp",
  },
  {
    id: "rev-3",
    rating: 5,
    date: "2025-08-03",
    quote:
      "Came here to get another unique coffee experience, and amazingly surprise with the good taste, service and atmosphere of Small Gaps.",
    highlights: ["Atmosphere", "Service", "Unique Coffee"],
    photo: "/images/cafe/main-bar.webp",
  },
  {
    id: "rev-4",
    rating: 5,
    date: "2025-08-02",
    quote:
      "Recommended coffee around BSD area, they serve a good coffee and good food.",
    highlights: ["Good Coffee", "Comfort Food"],
    photo: "/images/cafe/strudel-icecream.webp",
  },
  {
    id: "rev-5",
    rating: 5,
    date: "2025-06-14",
    quote:
      "My favorite so far: himalayan salted caramel, creamy berry, tropitwist, hot/iced cappuccino. Must try their blueberry basque cheesecake, waiter nya ramah dan friendly!",
    highlights: ["Himalayan Salted Caramel", "Friendly Service"],
    photo: "/images/cafe/table-bar-view.webp",
  },
];
