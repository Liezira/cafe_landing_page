export type Vector3Tuple = [number, number, number];

export type ExplorationMode = "hero" | "explore" | "seat_focus" | "ar";

export type RouteStage =
  | "starlet_front"
  | "lobby_right"
  | "escalator_up"
  | "corridor_2f"
  | "cafe_main";

export type SeatZoneId = "wfc" | "sofa" | "window";

export type SeatedActivity = "wfc" | "hangout" | "solo";

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
  | "reviews"
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
  defaultActivity: SeatedActivity;
  previewPhoto: string;
  cameraPosition: Vector3Tuple;
  lookAt: Vector3Tuple;
  tableTopPosition: Vector3Tuple;
}
