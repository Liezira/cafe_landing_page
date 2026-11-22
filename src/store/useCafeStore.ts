import { create } from "zustand";
import { ASSET_CONFIG } from "@/lib/config/assetConfig";
import type {
  ActiveDrawer,
  AnalogVector,
  ArCapability,
  BaristaState,
  DoorTransitionState,
  ExplorationMode,
  LightingMood,
  LookDelta,
  SeatZoneId,
} from "@/lib/types/scene";

export interface CafeStoreState {
  explorationMode: ExplorationMode;
  analogVector: AnalogVector;
  lookDelta: LookDelta;

  isDoorOpen: boolean;
  doorState: DoorTransitionState;
  activeSeat: SeatZoneId | null;
  baristaState: BaristaState;

  lightingMood: LightingMood;
  activeDrawer: ActiveDrawer;
  arCapability: ArCapability;
  useGlbAssets: boolean;
  contextHint: string | null;

  enterExplore: () => void;
  exitToHero: () => void;
  setAnalogVector: (x: number, y: number, active: boolean) => void;
  addLookDelta: (dx: number, dy: number) => void;
  consumeLookDelta: () => LookDelta;

  toggleDoor: () => void;
  setDoorState: (state: DoorTransitionState) => void;

  focusSeat: (seatId: SeatZoneId) => void;
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
  analogVector: { x: 0, y: 0, active: false },
  lookDelta: { dx: 0, dy: 0 },

  isDoorOpen: false,
  doorState: "closed",
  activeSeat: null,
  baristaState: "idle_brewing",

  lightingMood: "sunset",
  activeDrawer: "none",
  arCapability: { supported: false, mode: "unsupported", checked: false },
  useGlbAssets: ASSET_CONFIG.useGlbAssets,
  contextHint: null,

  enterExplore: () =>
    set({
      explorationMode: "explore",
      activeDrawer: "none",
      activeSeat: null,
      contextHint: "Tap door to enter",
    }),

  exitToHero: () =>
    set({
      explorationMode: "hero",
      activeDrawer: "none",
      activeSeat: null,
      analogVector: { x: 0, y: 0, active: false },
      contextHint: null,
    }),

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
        ? "Walk inside · Tap bar to meet barista"
        : "Tap door to enter",
    });
  },

  setDoorState: (doorState) => set({ doorState }),

  focusSeat: (seatId) =>
    set({
      explorationMode: "seat_focus",
      activeSeat: seatId,
      activeDrawer: "seat_info",
      analogVector: { x: 0, y: 0, active: false },
    }),

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
