"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import * as THREE from "three";
import { SECOND_FLOOR_Y } from "@/lib/config/routeWaypoints";
import { LightingEngine } from "@/components/scene/LightingEngine";
import { HotelStarletRoute } from "@/components/scene/HotelStarletRoute";
import { ProceduralCafe } from "@/components/scene/ProceduralCafe";
import { CameraRig } from "@/components/scene/CameraRig";
import { useCafeStore } from "@/store/useCafeStore";

export const xrStore = createXRStore();

export function CafeCanvas() {
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const addLookDelta = useCafeStore((s) => s.addLookDelta);
  const dragPointerId = useRef<number | null>(null);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const canLookAround =
    explorationMode === "explore" || explorationMode === "seat_focus";

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canLookAround) return;
    const isBottomLeft =
      e.clientX < 180 && e.clientY > window.innerHeight - 190;
    if (
      explorationMode === "explore" &&
      isBottomLeft &&
      e.pointerType === "touch"
    ) {
      return;
    }

    dragPointerId.current = e.pointerId;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canLookAround || dragPointerId.current !== e.pointerId) {
      return;
    }
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    addLookDelta(dx, dy);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current === e.pointerId) {
      dragPointerId.current = null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-0 h-dvh w-full touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, SECOND_FLOOR_Y + 1.75, 7.6],
          fov: 48,
          near: 0.1,
          far: 80,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.06,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <XR store={xrStore}>
          <Suspense fallback={null}>
            <Environment resolution={256} frames={1}>
              <Lightformer
                form="rect"
                intensity={2.2}
                color="#FFE5C2"
                scale={[6, 2, 1]}
                position={[-2, SECOND_FLOOR_Y + 3, -1]}
                rotation={[Math.PI / 2, 0, 0]}
              />
              <Lightformer
                form="rect"
                intensity={1.5}
                color="#D6E8FF"
                scale={[8, 4, 1]}
                position={[0, SECOND_FLOOR_Y + 2, 7]}
              />
            </Environment>

            <LightingEngine />
            <HotelStarletRoute />

            {/* SMALL GAPS Coffee mounted accurately on the 2nd Floor (y = 3.6m) */}
            <group position={[0, SECOND_FLOOR_Y, 0]}>
              <ProceduralCafe />
              <ContactShadows
                position={[0, 0.01, 0]}
                opacity={0.45}
                scale={14}
                blur={2.2}
                far={3.5}
              />
            </group>

            <CameraRig />
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}
