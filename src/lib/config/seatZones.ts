import type { SeatZoneConfig, SeatZoneId } from "@/lib/types/scene";

export const SEAT_ZONES: Record<SeatZoneId, SeatZoneConfig> = {
  wfc: {
    id: "wfc",
    meshName: "Seat_WFC_01",
    title: "Indoor WFC Table",
    subtitle:
      "Warm teak table facing the linear-lit espresso bar, steady Wi-Fi (Elixavida), and nearby power outlets.",
    tags: ["Power Outlet", "Laptop Friendly", "AC Indoor"],
    capacity: "1-4 Guests",
    defaultActivity: "wfc",
    previewPhoto: "/images/cafe/table-bar-view.webp",
    cameraPosition: [2.1, 1.18, 0.35],
    lookAt: [-0.8, 1.02, -0.45],
    tableTopPosition: [2.6, 0.78, -0.5],
  },
  sofa: {
    id: "sofa",
    meshName: "Seat_Sofa_01",
    title: "Fluted-Wall Lounge Banquette",
    subtitle:
      "Cushioned banquette along the warm fluted concrete wall, tailored for unhurried group catch-ups.",
    tags: ["Group Friendly", "Warm Uplighting", "Cushioned"],
    capacity: "3-6 Guests",
    defaultActivity: "hangout",
    previewPhoto: "/images/cafe/main-bar.webp",
    cameraPosition: [-1.4, 1.18, -1.7],
    lookAt: [-2.6, 0.92, -2.35],
    tableTopPosition: [-2.6, 0.48, -2.15],
  },
  window: {
    id: "window",
    meshName: "Seat_Window_01",
    title: "Outdoor Brick-Bench Terrace",
    subtitle:
      "2nd-floor open-air teak balcony with terracotta brick seating and BSD Boulevard tree views.",
    tags: ["Outdoor Balcony", "Brick Bench", "2nd Floor View"],
    capacity: "1-2 Guests",
    defaultActivity: "solo",
    previewPhoto: "/images/cafe/outdoor-brick-bench.webp",
    cameraPosition: [3.2, 1.18, 1.9],
    lookAt: [4.2, 0.96, 2.0],
    tableTopPosition: [4.1, 0.96, 2.0],
  },
};
