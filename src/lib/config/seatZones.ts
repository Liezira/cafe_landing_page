import type { SeatZoneConfig, SeatZoneId } from "@/lib/types/scene";

export const SEAT_ZONES: Record<SeatZoneId, SeatZoneConfig> = {
  wfc: {
    id: "wfc",
    meshName: "Seat_WFC_01",
    title: "Indoor WFC Table",
    subtitle: "Quiet oak table with steady Wi-Fi and easy power access.",
    tags: ["Power Outlet", "Laptop Friendly", "Quiet Zone"],
    capacity: "1-4 Guests",
    cameraPosition: [1.6, 1.55, 1.3],
    lookAt: [2.6, 1.0, -0.5],
    hotspotPosition: [2.6, 1.35, -0.5],
  },
  sofa: {
    id: "sofa",
    meshName: "Seat_Sofa_01",
    title: "Lounge & Group Corner",
    subtitle: "Relaxed cushioned seating made for unhurried conversation.",
    tags: ["Group Friendly", "Warm Lighting", "Cushioned"],
    capacity: "3-6 Guests",
    cameraPosition: [-0.8, 1.55, -1.0],
    lookAt: [-2.6, 0.95, -2.2],
    hotspotPosition: [-2.6, 1.3, -2.2],
  },
  window: {
    id: "window",
    meshName: "Seat_Window_01",
    title: "Window Counter Seat",
    subtitle: "Bright solo perch overlooking BSD Boulevard from the 2nd floor.",
    tags: ["Natural Light", "Solo Dining", "2nd Floor View"],
    capacity: "1-2 Guests",
    cameraPosition: [2.4, 1.6, 1.9],
    lookAt: [3.8, 1.15, 2.2],
    hotspotPosition: [3.8, 1.45, 2.1],
  },
};
