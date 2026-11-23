import { create } from "zustand";
import type {
  ActivityId,
  MenuCategory,
  MoodId,
  SpotId,
} from "@/lib/config/cafeData";
import type { UiLanguage } from "@/lib/config/i18n";
import { cafeAmbienceAudio } from "@/lib/engine/cafeAudio";

interface LandingStoreState {
  mood: MoodId;
  language: UiLanguage;
  audioEnabled: boolean;
  activeSpot: SpotId;
  activeActivity: ActivityId;
  activeCategory: MenuCategory;
  wayfindingStep: number;
  baristaOpen: boolean;
  orderedItemName: string | null;

  setMood: (mood: MoodId) => void;
  toggleLanguage: () => void;
  toggleAudio: () => void;
  setActiveSpot: (spot: SpotId) => void;
  setActiveActivity: (activity: ActivityId) => void;
  setActiveCategory: (category: MenuCategory) => void;
  setWayfindingStep: (step: number) => void;
  openBarista: (orderedName?: string) => void;
  closeBarista: () => void;
}

export const useCafeStore = create<LandingStoreState>((set, get) => ({
  mood: "sunset",
  language: "en",
  audioEnabled: false,
  activeSpot: "wfc",
  activeActivity: "wfc",
  activeCategory: "all",
  wayfindingStep: 0,
  baristaOpen: false,
  orderedItemName: null,

  setMood: (mood) => set({ mood }),

  toggleLanguage: () =>
    set((s) => ({ language: s.language === "en" ? "id" : "en" })),

  toggleAudio: () => {
    const next = !get().audioEnabled;
    if (next) cafeAmbienceAudio.start();
    else cafeAmbienceAudio.stop();
    set({ audioEnabled: next });
  },

  setActiveSpot: (activeSpot) => set({ activeSpot }),
  setActiveActivity: (activeActivity) => set({ activeActivity }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setWayfindingStep: (wayfindingStep) => set({ wayfindingStep }),

  openBarista: (orderedName) =>
    set({
      baristaOpen: true,
      orderedItemName: orderedName ?? null,
    }),

  closeBarista: () => set({ baristaOpen: false }),
}));
