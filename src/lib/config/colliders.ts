import type { Aabb2D, RoomBounds } from "@/lib/types/scene";

export const PLAYER_EYE_HEIGHT = 1.62;
export const PLAYER_RADIUS = 0.35;
export const PLAYER_WALK_SPEED = 2.4;

export const HERO_CAMERA_POS: [number, number, number] = [0, 1.75, 7.6];
export const HERO_CAMERA_LOOKAT: [number, number, number] = [0, 1.45, 0];

export const EXPLORE_START_POS: [number, number, number] = [0, PLAYER_EYE_HEIGHT, 5.4];

export const ROOM_BOUNDS: RoomBounds = {
  minX: -4.6,
  maxX: 4.6,
  minZ: -3.8,
  maxZ: 6.4,
};

export const CAFE_OBSTACLES: Aabb2D[] = [
  // Front facade left wall (leaves doorway open between x = -0.9 and x = 0.9)
  { id: "Col_Wall_Front_Left", minX: -5.0, maxX: -0.9, minZ: 3.1, maxZ: 3.45 },
  // Front facade right wall
  { id: "Col_Wall_Front_Right", minX: 0.9, maxX: 5.0, minZ: 3.1, maxZ: 3.45 },
  // Main glass door collider (disabled automatically when door is open)
  {
    id: "Col_Door_Main",
    minX: -0.95,
    maxX: 0.95,
    minZ: 3.1,
    maxZ: 3.45,
    disabledWhenDoorOpen: true,
  },
  // Espresso Bar Counter
  { id: "Col_Bar_Counter", minX: -3.7, maxX: -0.6, minZ: -1.1, maxZ: 0.7 },
  // Indoor WFC Table
  { id: "Col_Seat_WFC", minX: 1.85, maxX: 3.4, minZ: -1.3, maxZ: 0.3 },
  // Lounge Sofa Corner
  { id: "Col_Seat_Sofa", minX: -3.7, maxX: -1.7, minZ: -3.2, maxZ: -1.6 },
  // Window Counter Bench
  { id: "Col_Seat_Window", minX: 3.35, maxX: 4.6, minZ: 1.1, maxZ: 2.9 },
];
