import { create } from "zustand";
import { ASSET_CONFIG } from "@/lib/config/assetConfig";
import {
  CAFE_TELEPORT_POS,
  STARLET_SPAWN_POS,
} from "@/lib/config/routeWaypoints";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import type {
  ActiveDrawer,
  AnalogVector,
  ArCapability,
  BaristaState,
  DoorTransitionState,
  ExplorationMode,
  LightingMood,
  LookDelta,
  RouteStage,
  SeatedActivity,
  SeatZoneId,
  Vector3Tuple,
} from "@/lib/types/scene";

export interface CafeStoreState {
  explorationMode: ExplorationMode;
  routeStage: RouteStage;
  onSecondFloor: boolean;
  isRidingEscalator: boolean;
  teleportNonce: number;
  teleportTarget: Vector3Tuple;

  analogVector: AnalogVector;
  lookDelta: LookDelta;

  isDoorOpen: boolean;
  doorState: DoorTransitionState;
  activeSeat: SeatZoneId | null;
  seatedActivity: SeatedActivity;
  baristaState: BaristaState;

  lightingMood: LightingMood;
  activeDrawer: ActiveDrawer;
  arCapability: ArCapability;
  useGlbAssets: boolean;
  contextHint: string | null;

  enterExplore: () => void;
  startJourneyFromHotel: () => void;
  skipToCafe: () => void;
  exitToHero: () => void;

  setRouteStage: (stage: RouteStage) => void;
  setOnSecondFloor: (val: boolean) => void;
  setIsRidingEscalator: (val: boolean) => void;

  setAnalogVector: (x: number, y: number, active: boolean) => void;
  addLookDelta: (dx: number, dy: number) => void;
  consumeLookDelta: () => LookDelta;

  toggleDoor: () => void;
  setDoorState: (state: DoorTransitionState) => void;

  focusSeat: (seatId: SeatZoneId) => void;
  setSeatedActivity: (activity: SeatedActivity) => void;
  clearSeatFocus: () => void;

  setBaristaState: (state: BaristaState) => void;
  interactWithBarCounter: () => void;

  setLightingMood: (mood: LightingMood) => void;
  setActiveDrawer: (drawer: ActiveDrawer) => void;
  setArCapability: (capability: ArCapability) => void;
  setContextHint: (hint: string | null) => void;
  launchAr: () => void;
  exitAr: () => void;
}

export const useCafeStore = create<CafeStoreState>((set, get) => ({
  explorationMode: "hero",
  routeStage: "starlet_front",
  onSecondFloor: false,
  isRidingEscalator: false,
  teleportNonce: 0,
  teleportTarget: STARLET_SPAWN_POS,

  analogVector: { x: 0, y: 0, active: false },
  lookDelta: { dx: 0, dy: 0 },

  isDoorOpen: false,
  doorState: "closed",
  activeSeat: null,
  seatedActivity: "wfc",
  baristaState: "idle_brewing",

  lightingMood: "sunset",
  activeDrawer: "none",
  arCapability: { supported: false, mode: "unsupported", checked: false },
  useGlbAssets: ASSET_CONFIG.useGlbAssets,
  contextHint: null,

  enterExplore: () =>
    set((s) => ({
      explorationMode: "explore",
      routeStage: "starlet_front",
      onSecondFloor: false,
      isRidingEscalator: false,
      activeDrawer: "none",
      activeSeat: null,
      teleportNonce: s.teleportNonce + 1,
      teleportTarget: STARLET_SPAWN_POS,
      contextHint: "Walk up the steps & turn right to the 2F escalators",
    })),

  startJourneyFromHotel: () =>
    set((s) => ({
      explorationMode: "explore",
      routeStage: "starlet_front",
      onSecondFloor: false,
      isRidingEscalator: false,
      activeDrawer: "none",
      activeSeat: null,
      teleportNonce: s.teleportNonce + 1,
      teleportTarget: STARLET_SPAWN_POS,
      contextHint: "Start at Hotel Starlet BSD · Walk up & turn right",
    })),

  skipToCafe: () =>
    set((s) => ({
      explorationMode: "explore",
      routeStage: "cafe_main",
      onSecondFloor: true,
      isRidingEscalator: false,
      activeDrawer: "none",
      activeSeat: null,
      teleportNonce: s.teleportNonce + 1,
      teleportTarget: CAFE_TELEPORT_POS,
      contextHint: "Arrived at SMALL GAPS 2F · Tap glass door to enter",
    })),

  exitToHero: () =>
    set({
      explorationMode: "hero",
      activeDrawer: "none",
      activeSeat: null,
      analogVector: { x: 0, y: 0, active: false },
      contextHint: null,
    }),

  setRouteStage: (routeStage) => set({ routeStage }),
  setOnSecondFloor: (onSecondFloor) => set({ onSecondFloor }),
  setIsRidingEscalator: (isRidingEscalator) => set({ isRidingEscalator }),

  setAnalogVector: (x, y, active) =>
    set({
      analogVector: { x, y, active },
    }),

  addLookDelta: (dx, dy) =>
    set((state) => ({
      lookDelta: {
        dx: state.lookDelta.dx + dx,
        dy: state.lookDelta.dy + dy,
      },
    })),

  consumeLookDelta: () => {
    const current = get().lookDelta;
    if (current.dx !== 0 || current.dy !== 0) {
      set({ lookDelta: { dx: 0, dy: 0 } });
    }
    return current;
  },

  toggleDoor: () => {
    const { isDoorOpen } = get();
    const nextOpen = !isDoorOpen;
    set({
      isDoorOpen: nextOpen,
      doorState: nextOpen ? "opening" : "closing",
      baristaState: nextOpen ? "greeting_wave" : "idle_brewing",
      contextHint: nextOpen
        ? "Welcome inside · Click any table to sit or tap the bar"
        : "Tap glass door to enter",
    });
  },

  setDoorState: (doorState) => set({ doorState }),

  focusSeat: (seatId) =>
    set({
      explorationMode: "seat_focus",
      onSecondFloor: true,
      routeStage: "cafe_main",
      activeSeat: seatId,
      seatedActivity: SEAT_ZONES[seatId].defaultActivity,
      activeDrawer: "seat_info",
      analogVector: { x: 0, y: 0, active: false },
    }),

  setSeatedActivity: (seatedActivity) => set({ seatedActivity }),

  clearSeatFocus: () =>
    set((state) => ({
      explorationMode:
        state.explorationMode === "seat_focus"
          ? "explore"
          : state.explorationMode,
      activeSeat: null,
      activeDrawer:
        state.activeDrawer === "seat_info" ? "none" : state.activeDrawer,
    })),

  setBaristaState: (baristaState) => set({ baristaState }),

  interactWithBarCounter: () =>
    set({
      baristaState: "pouring_serving",
      activeDrawer: "menu",
      contextHint: "Barista is preparing Gaps Latte",
    }),

  setLightingMood: (lightingMood) => set({ lightingMood }),

  setActiveDrawer: (activeDrawer) =>
    set((state) => ({
      activeDrawer,
      baristaState:
        activeDrawer === "none" && state.baristaState === "pouring_serving"
          ? "idle_brewing"
          : state.baristaState,
    })),

  setArCapability: (arCapability) => set({ arCapability }),
  setContextHint: (contextHint) => set({ contextHint }),

  launchAr: () => {
    const { arCapability } = get();
    if (arCapability.mode === "webxr") {
      set({ explorationMode: "ar", activeDrawer: "none" });
    } else {
      set({ activeDrawer: "ar_guide" });
    }
  },

  exitAr: () => set({ explorationMode: "hero" }),
}));
