import type { RouteStage, Vector3Tuple } from "@/lib/types/scene";

/**
 * Multi-floor coordinate map for the Harvest Moon style playable wayfinding route:
 *
 * Ground Floor (y = 0.0 -> 0.45):
 *   1. Front of Hotel Starlet BSD: [0, 0, 18.5]
 *   2. Short entrance steps up (+0.45m): z = 16.5 -> 15.2
 *   3. Turn Right along Ground Lobby: x = 0 -> 7.2, z = 14.0
 *   4. Twin Escalators Up (y = 0.45 -> y = 3.6): x = 7.2, z = 13.0 -> 7.8
 *
 * Second Floor (y = 3.6):
 *   5. Top of Escalator -> Turn Left #1: x = 7.2 -> 1.8, z = 7.2
 *   6. Turn Left #2 into Orange/White Corridor (seen in videoplayback (1).mp4):
 *      x = 0.0, z = 7.2 -> 4.2
 *   7. Arrive at SMALL GAPS Coffee Terrace & Front Glass Door: [0, 3.6, 3.25]
 */

export const SECOND_FLOOR_Y = 3.6;

export const STARLET_SPAWN_POS: Vector3Tuple = [0, 0, 18.2];
export const CAFE_TELEPORT_POS: Vector3Tuple = [0, SECOND_FLOOR_Y, 5.2];

export const ESCALATOR_TRIGGER_BOX = {
  minX: 5.8,
  maxX: 8.6,
  minZ: 12.0,
  maxZ: 13.8,
};

export const ESCALATOR_TOP_POS: Vector3Tuple = [7.2, SECOND_FLOOR_Y, 7.6];

export const ROUTE_STAGE_LABELS: Record<
  RouteStage,
  { step: number; title: string; hint: string }
> = {
  starlet_front: {
    step: 1,
    title: "Hotel Starlet BSD Front",
    hint: "Walk up the front steps and turn right toward the lobby",
  },
  lobby_right: {
    step: 2,
    title: "Ground Lobby",
    hint: "Follow the golden path to the twin escalators (2F)",
  },
  escalator_up: {
    step: 3,
    title: "Twin Escalators to 2F",
    hint: "Riding up to the 2nd floor...",
  },
  corridor_2f: {
    step: 4,
    title: "2nd Floor Corridor",
    hint: "Turn left twice past the orange arch to reach SMALL GAPS",
  },
  cafe_main: {
    step: 5,
    title: "SMALL GAPS Coffee (2F)",
    hint: "Tap the glass door, click any table to sit, or visit the bar",
  },
};

/**
 * Resolves floor elevation & route stage from avatar XZ coordinates.
 */
export function resolveStageAndElevation(
  x: number,
  z: number,
  onSecondFloor: boolean
): { y: number; stage: RouteStage } {
  if (onSecondFloor) {
    if (z <= 5.8 && Math.abs(x) <= 4.8) {
      return { y: SECOND_FLOOR_Y, stage: "cafe_main" };
    }
    return { y: SECOND_FLOOR_Y, stage: "corridor_2f" };
  }

  // Ground floor short entrance steps ramp (z = 16.6 down to 15.2)
  let y = 0;
  if (z <= 15.2) {
    y = 0.45;
  } else if (z < 16.6) {
    const t = (16.6 - z) / (16.6 - 15.2);
    y = t * 0.45;
  }

  if (x > 2.2 && z < 15.5) {
    return { y, stage: "lobby_right" };
  }
  return { y, stage: "starlet_front" };
}
