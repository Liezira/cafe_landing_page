import { create } from "zustand";
import type {
  AtmosphereMood,
  SpaceSpotId,
  VisitActivity,
} from "@/lib/config/cafeData";
import type { UiLanguage } from "@/lib/config/i18n";
import { cafeAmbienceAudio } from "@/lib/engine/cafeAudio";

export interface EditorialCafeStore {
  mood: AtmosphereMood;
  language: UiLanguage;
  audioEnabled: boolean;
  activeSpot: SpaceSpotId;
  activeActivity: VisitActivity;
  baristaOpen: boolean;
  baristaPromptItem: string | null;

  setMood: (mood: AtmosphereMood) => void;
  toggleLanguage: () => void;
  toggleAudio: () => void;
  setActiveSpot: (spot: SpaceSpotId) => void;
  setActiveActivity: (activity: VisitActivity) => void;
  openBarista: (itemName?: string) => void;
  closeBarista: () => void;
  clearBaristaPromptItem: () => void;
}

export const useCafeStore = create<EditorialCafeStore>((set, get) => ({
  mood: "sunset",
  language: "en",
  audioEnabled: false,
  activeSpot: "wfc",
  activeActivity: "wfc",
  baristaOpen: false,
  baristaPromptItem: null,

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
  openBarista: (itemName) =>
    set({
      baristaOpen: true,
      baristaPromptItem: itemName ?? null,
    }),
  closeBarista: () => set({ baristaOpen: false }),
  clearBaristaPromptItem: () => set({ baristaPromptItem: null }),
}));
