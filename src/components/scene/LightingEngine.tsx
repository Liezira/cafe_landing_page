"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { LIGHTING_PRESETS } from "@/lib/config/lightingPresets";
import { useCafeStore } from "@/store/useCafeStore";

export function LightingEngine() {
  const lightingMood = useCafeStore((s) => s.lightingMood);
  const { scene } = useThree();

  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);
  const barPointRef = useRef<THREE.PointLight>(null);
  const loungePointRef = useRef<THREE.PointLight>(null);

  const targetDirColor = useRef(new THREE.Color());
  const targetHemiSky = useRef(new THREE.Color());
  const targetHemiGround = useRef(new THREE.Color());
  const targetBgColor = useRef(new THREE.Color());
  const targetDirPos = useRef(new THREE.Vector3());

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = Math.min(1, delta * 3.2);
    const preset = LIGHTING_PRESETS[lightingMood];

    targetDirColor.current.set(preset.dirColor);
    targetHemiSky.current.set(preset.hemiSky);
    targetHemiGround.current.set(preset.hemiGround);
    targetBgColor.current.set(preset.skyHorizon);
    targetDirPos.current.set(...preset.dirPosition);

    if (dirLightRef.current) {
      dirLightRef.current.color.lerp(targetDirColor.current, t);
      dirLightRef.current.intensity = THREE.MathUtils.lerp(
        dirLightRef.current.intensity,
        preset.dirIntensity,
        t
      );
      dirLightRef.current.position.lerp(targetDirPos.current, t);
    }

    if (hemiLightRef.current) {
      hemiLightRef.current.color.lerp(targetHemiSky.current, t);
      hemiLightRef.current.groundColor.lerp(targetHemiGround.current, t);
      hemiLightRef.current.intensity = THREE.MathUtils.lerp(
        hemiLightRef.current.intensity,
        preset.hemiIntensity,
        t
      );
    }

    if (barPointRef.current) {
      barPointRef.current.intensity = THREE.MathUtils.lerp(
        barPointRef.current.intensity,
        preset.pointLightIntensity,
        t
      );
    }

    if (loungePointRef.current) {
      loungePointRef.current.intensity = THREE.MathUtils.lerp(
        loungePointRef.current.intensity,
        preset.pointLightIntensity * 0.75,
        t
      );
    }

    if (!scene.background || !(scene.background instanceof THREE.Color)) {
      scene.background = new THREE.Color(preset.skyHorizon);
    } else {
      scene.background.lerp(targetBgColor.current, t);
    }

    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(targetBgColor.current, t);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#D9A082", 14, 34]} />
      <hemisphereLight
        ref={hemiLightRef}
        args={["#FFAD7A", "#5C4338", 0.58]}
      />
      <directionalLight
        ref={dirLightRef}
        position={[-8, 3.5, 7]}
        intensity={1.45}
        color="#FF9E5E"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight
        ref={barPointRef}
        position={[-2.1, 2.55, -0.2]}
        color="#FFBF75"
        intensity={1.2}
        distance={8}
        decay={2}
      />
      <pointLight
        ref={loungePointRef}
        position={[2.4, 2.6, -0.5]}
        color="#FFC88A"
        intensity={0.9}
        distance={8}
        decay={2}
      />
    </>
  );
}
