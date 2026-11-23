import { create } from "zustand";
import { ASSET_CONFIG } from "@/lib/config/assetConfig";
import type { UiLanguage } from "@/lib/config/i18n";
import { CURATED_MENU, type MenuItem } from "@/lib/config/menuData";
import {
  CAFE_TELEPORT_POS,
  STARLET_SPAWN_POS,
} from "@/lib/config/routeWaypoints";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import { cafeAmbienceAudio } from "@/lib/engine/cafeAudio";
import type {
  ActiveDrawer,
  AnalogVector,
  ArCapability,
  BaristaState,
  CameraPerspective,
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
  cameraPerspective: CameraPerspective;
  language: UiLanguage;
  audioEnabled: boolean;
  liteMode: boolean;

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
  showBaristaDialogue: boolean;
  orderedItem: MenuItem | null;

  lightingMood: LightingMood;
  activeDrawer: ActiveDrawer;
  arCapability: ArCapability;
  useGlbAssets: boolean;
  contextHint: string | null;

  enterExplore: () => void;
  startJourneyFromHotel: () => void;
  skipToCafe: () => void;
  exitToHero: () => void;

  toggleLanguage: () => void;
  toggleAudio: () => void;
  toggleLiteMode: () => void;

  setCameraPerspective: (perspective: CameraPerspective) => void;
  toggleCameraPerspective: () => void;

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
  orderMenuItemPreview: (menuId: string) => void;
  dismissBaristaDialogue: () => void;

  setLightingMood: (mood: LightingMood) => void;
  setActiveDrawer: (drawer: ActiveDrawer) => void;
  setArCapability: (capability: ArCapability) => void;
  setContextHint: (hint: string | null) => void;
  launchAr: () => void;
  exitAr: () => void;
}

export const useCafeStore = create<CafeStoreState>((set, get) => ({
  explorationMode: "hero",
  cameraPerspective: "tpp",
  language: "en",
  audioEnabled: false,
  liteMode: false,

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
  showBaristaDialogue: false,
  orderedItem: null,

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
      showBaristaDialogue: false,
      teleportNonce: s.teleportNonce + 1,
      teleportTarget: STARLET_SPAWN_POS,
      contextHint:
        s.language === "id"
          ? "Naik tangga pendek & belok kanan ke eskalator Lt. 2"
          : "Walk up the steps & turn right to the 2F escalators",
    })),

  startJourneyFromHotel: () =>
    set((s) => ({
      explorationMode: "explore",
      routeStage: "starlet_front",
      onSecondFloor: false,
      isRidingEscalator: false,
      activeDrawer: "none",
      activeSeat: null,
      showBaristaDialogue: false,
      teleportNonce: s.teleportNonce + 1,
      teleportTarget: STARLET_SPAWN_POS,
      contextHint:
        s.language === "id"
          ? "Mulai dari Hotel Starlet BSD · Naik tangga & belok kanan"
          : "Start at Hotel Starlet BSD · Walk up & turn right",
    })),

  skipToCafe: () =>
    set((s) => ({
      explorationMode: "explore",
      routeStage: "cafe_main",
      onSecondFloor: true,
      isRidingEscalator: false,
      activeDrawer: "none",
      activeSeat: null,
      showBaristaDialogue: false,
      teleportNonce: s.teleportNonce + 1,
      teleportTarget: CAFE_TELEPORT_POS,
      contextHint:
        s.language === "id"
          ? "Tiba di SMALL GAPS Lt. 2 · Ketuk pintu kaca untuk masuk"
          : "Arrived at SMALL GAPS 2F · Tap glass door to enter",
    })),

  exitToHero: () =>
    set({
      explorationMode: "hero",
      activeDrawer: "none",
      activeSeat: null,
      showBaristaDialogue: false,
      analogVector: { x: 0, y: 0, active: false },
      contextHint: null,
    }),

  toggleLanguage: () =>
    set((s) => ({
      language: s.language === "en" ? "id" : "en",
    })),

  toggleAudio: () => {
    const next = !get().audioEnabled;
    if (next) {
      cafeAmbienceAudio.start();
    } else {
      cafeAmbienceAudio.stop();
    }
    set({ audioEnabled: next });
  },

  toggleLiteMode: () =>
    set((s) => ({
      liteMode: !s.liteMode,
      activeDrawer: "none",
      showBaristaDialogue: false,
    })),

  setCameraPerspective: (cameraPerspective) => set({ cameraPerspective }),

  toggleCameraPerspective: () =>
    set((s) => ({
      cameraPerspective: s.cameraPerspective === "tpp" ? "fpp" : "tpp",
    })),

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
    const { isDoorOpen, language } = get();
    const nextOpen = !isDoorOpen;
    set({
      isDoorOpen: nextOpen,
      doorState: nextOpen ? "opening" : "closing",
      baristaState: nextOpen ? "greeting_wave" : "idle_brewing",
      contextHint: nextOpen
        ? language === "id"
          ? "Selamat datang · Klik meja untuk duduk atau sapa barista"
          : "Welcome inside · Click any table to sit or meet the barista"
        : language === "id"
        ? "Ketuk pintu kaca untuk masuk"
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
      showBaristaDialogue: false,
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
    set((s) => ({
      baristaState: "pouring_serving",
      showBaristaDialogue: true,
      contextHint:
        s.language === "id"
          ? "Ngobrol dengan barista atau coba pesan menu"
          : "Chat with our barista or preview a menu item",
    })),

  orderMenuItemPreview: (menuId) => {
    const item = CURATED_MENU.find((m) => m.id === menuId) ?? CURATED_MENU[0];
    set((s) => ({
      orderedItem: item,
      baristaState: "pouring_serving",
      activeDrawer: "none",
      showBaristaDialogue: true,
      contextHint:
        s.language === "id"
          ? `Barista sedang menyiapkan ${item.name}`
          : `Barista is freshly preparing ${item.name}`,
    }));
  },

  dismissBaristaDialogue: () =>
    set({
      showBaristaDialogue: false,
      baristaState: "idle_brewing",
    }),

  setLightingMood: (lightingMood) => set({ lightingMood }),

  setActiveDrawer: (activeDrawer) =>
    set((state) => ({
      activeDrawer,
      showBaristaDialogue:
        activeDrawer !== "none" ? false : state.showBaristaDialogue,
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
