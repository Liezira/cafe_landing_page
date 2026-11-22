export type Vector3Tuple = [number, number, number];

export type ExplorationMode = "hero" | "explore" | "seat_focus" | "ar";

export type SeatZoneId = "wfc" | "sofa" | "window";

export type DoorTransitionState = "closed" | "opening" | "open" | "closing";

export type BaristaState =
  | "idle_brewing"
  | "greeting_wave"
  | "pouring_serving";

export type LightingMood = "morning" | "midday" | "sunset" | "night";

export type ActiveDrawer =
  | "none"
  | "menu"
  | "location"
  | "seat_info"
  | "ar_guide";

export type ArMode = "webxr" | "quicklook" | "unsupported";

export interface AnalogVector {
  x: number;
  y: number;
  active: boolean;
}

export interface LookDelta {
  dx: number;
  dy: number;
}

export interface ArCapability {
  supported: boolean;
  mode: ArMode;
  checked: boolean;
}

export interface Aabb2D {
  id: string;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  disabledWhenDoorOpen?: boolean;
}

export interface RoomBounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface SeatZoneConfig {
  id: SeatZoneId;
  meshName: string;
  title: string;
  subtitle: string;
  tags: string[];
  capacity: string;
  cameraPosition: Vector3Tuple;
  lookAt: Vector3Tuple;
  hotspotPosition: Vector3Tuple;
}
