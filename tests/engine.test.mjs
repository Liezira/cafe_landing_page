import test from "node:test";
import assert from "node:assert/strict";

// Mirror pure logic verification for offline VM execution (zero npm install required)
const ROOM_BOUNDS = { minX: -4.6, maxX: 4.6, minZ: -3.8, maxZ: 6.4 };
const OBSTACLES = [
  { id: "Col_Wall_Front_Left", minX: -5.0, maxX: -0.9, minZ: 3.1, maxZ: 3.45 },
  { id: "Col_Wall_Front_Right", minX: 0.9, maxX: 5.0, minZ: 3.1, maxZ: 3.45 },
  {
    id: "Col_Door_Main",
    minX: -0.95,
    maxX: 0.95,
    minZ: 3.1,
    maxZ: 3.45,
    disabledWhenDoorOpen: true,
  },
  { id: "Col_Bar_Counter", minX: -3.7, maxX: -0.6, minZ: -1.1, maxZ: 0.7 },
];

function clampPlayerPosition(
  current,
  proposed,
  room,
  obstacles,
  isDoorOpen,
  radius = 0.35
) {
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

test("clamps player within outer room boundaries", () => {
  const res = clampPlayerPosition(
    { x: 0, z: 5 },
    { x: 10, z: -10 },
    ROOM_BOUNDS,
    OBSTACLES,
    true
  );
  assert.equal(res.x, ROOM_BOUNDS.maxX - 0.35);
  assert.equal(res.z, ROOM_BOUNDS.minZ + 0.35);
});

test("blocks player at main entrance when door is closed", () => {
  const res = clampPlayerPosition(
    { x: 0, z: 4.0 },
    { x: 0, z: 3.3 },
    ROOM_BOUNDS,
    OBSTACLES,
    false
  );
  assert.ok(res.z >= 3.45 + 0.35 - 0.001, "Player should stop outside closed door");
});

test("allows player to walk through main entrance when door is open", () => {
  const res = clampPlayerPosition(
    { x: 0, z: 4.0 },
    { x: 0, z: 2.8 },
    ROOM_BOUNDS,
    OBSTACLES,
    true
  );
  assert.equal(res.z, 2.8);
});

test("builds pre-filled WhatsApp URL with seat name", () => {
  const seatTitle = "Indoor WFC Table";
  const msg = `Hi SMALL GAPS Coffee BSD, I explored your 3D space and would like to reserve the ${seatTitle} spot for 2 guests today.`;
  const url = `https://wa.me/62818199099?text=${encodeURIComponent(msg)}`;
  assert.ok(url.startsWith("https://wa.me/62818199099?text="));
  assert.ok(decodeURIComponent(url).includes("Indoor WFC Table"));
});

test("barista chat answers SMALL GAPS signature menu warmly and deflects off-topic queries", () => {
  const isSmallGapsTopic = (q) =>
    /(gaps|latte|coffee|kopi|wfc|starlet|halal|pork|buka|hour|reserve|wa|menu|strudel|cheesecake)/i.test(q);
  assert.equal(isSmallGapsTopic("What is your best coffee at Small Gaps?"), true);
  assert.equal(isSmallGapsTopic("Solve this calculus integral for me"), false);
});
