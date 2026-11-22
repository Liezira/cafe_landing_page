import type { LightingMood, Vector3Tuple } from "@/lib/types/scene";

export interface LightingPreset {
  id: LightingMood;
  label: string;
  timeLabel: string;
  ambientNote: string;
  dirPosition: Vector3Tuple;
  dirColor: string;
  dirIntensity: number;
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  skyTop: string;
  skyHorizon: string;
  fogColor: string;
  lampEmissiveColor: string;
  lampEmissiveIntensity: number;
  pointLightIntensity: number;
}

export const LIGHTING_PRESETS: Record<LightingMood, LightingPreset> = {
  morning: {
    id: "morning",
    label: "Morning",
    timeLabel: "08:00 WIB",
    ambientNote: "Soft opening light & fresh brew calm",
    dirPosition: [7, 6, 8],
    dirColor: "#FFF1D6",
    dirIntensity: 1.6,
    hemiSky: "#CFE8FF",
    hemiGround: "#C4A484",
    hemiIntensity: 0.72,
    skyTop: "#6BA6E8",
    skyHorizon: "#FBE3C2",
    fogColor: "#EFE6D8",
    lampEmissiveColor: "#FFDFB0",
    lampEmissiveIntensity: 0.25,
    pointLightIntensity: 0.3,
  },
  midday: {
    id: "midday",
    label: "Midday",
    timeLabel: "12:00 WIB",
    ambientNote: "Crisp natural daylight for focused WFC",
    dirPosition: [2, 12, 5],
    dirColor: "#FFFFFF",
    dirIntensity: 2.1,
    hemiSky: "#E6F2FF",
    hemiGround: "#B8A898",
    hemiIntensity: 0.9,
    skyTop: "#4A90D9",
    skyHorizon: "#D9ECFF",
    fogColor: "#E8EFF5",
    lampEmissiveColor: "#FFF5E0",
    lampEmissiveIntensity: 0.05,
    pointLightIntensity: 0.1,
  },
  sunset: {
    id: "sunset",
    label: "Sunset",
    timeLabel: "17:00 WIB",
    ambientNote: "Warm golden-hour glow across the bar",
    dirPosition: [-8, 3.5, 7],
    dirColor: "#FF9E5E",
    dirIntensity: 1.45,
    hemiSky: "#FFAD7A",
    hemiGround: "#5C4338",
    hemiIntensity: 0.58,
    skyTop: "#3B4270",
    skyHorizon: "#FF8855",
    fogColor: "#D9A082",
    lampEmissiveColor: "#FFBF75",
    lampEmissiveIntensity: 1.3,
    pointLightIntensity: 1.2,
  },
  night: {
    id: "night",
    label: "Night",
    timeLabel: "20:00 WIB",
    ambientNote: "Intimate warm pendant glow after dusk",
    dirPosition: [-4, 8, -5],
    dirColor: "#7A94C9",
    dirIntensity: 0.35,
    hemiSky: "#1C2541",
    hemiGround: "#2A211B",
    hemiIntensity: 0.35,
    skyTop: "#0B1021",
    skyHorizon: "#1B233D",
    fogColor: "#141929",
    lampEmissiveColor: "#FFB35C",
    lampEmissiveIntensity: 2.4,
    pointLightIntensity: 2.4,
  },
};

export const LIGHTING_MOOD_ORDER: LightingMood[] = [
  "morning",
  "midday",
  "sunset",
  "night",
];
