import type { Aabb2D, RoomBounds } from "@/lib/types/scene";

export interface Position2D {
  x: number;
  z: number;
}

/**
 * Axis-separated AABB collision clamping (X pass then Z pass) so players
 * slide smoothly along walls, glass facades, and counters without a physics engine.
 */
export function clampPlayerPosition(
  current: Position2D,
  proposed: Position2D,
  room: RoomBounds,
  obstacles: Aabb2D[],
  isDoorOpen: boolean,
  radius = 0.35
): Position2D {
  const activeObstacles = obstacles.filter(
    (box) => !(box.disabledWhenDoorOpen && isDoorOpen)
  );

  let nextX = Math.max(
    room.minX + radius,
    Math.min(room.maxX - radius, proposed.x)
  );
  let nextZ = Math.max(
    room.minZ + radius,
    Math.min(room.maxZ - radius, proposed.z)
  );

  for (const box of activeObstacles) {
    const overlapZ =
      current.z + radius > box.minZ && current.z - radius < box.maxZ;
    const overlapX = nextX + radius > box.minX && nextX - radius < box.maxX;
    if (overlapX && overlapZ) {
      nextX = current.x <= box.minX ? box.minX - radius : box.maxX + radius;
    }
  }

  for (const box of activeObstacles) {
    const overlapX = nextX + radius > box.minX && nextX - radius < box.maxX;
    const overlapZ = nextZ + radius > box.minZ && nextZ - radius < box.maxZ;
    if (overlapX && overlapZ) {
      nextZ = current.z <= box.minZ ? box.minZ - radius : box.maxZ + radius;
    }
  }

  return { x: nextX, z: nextZ };
}
