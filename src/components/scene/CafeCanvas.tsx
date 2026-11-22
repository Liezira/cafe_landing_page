"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { LightingEngine } from "@/components/scene/LightingEngine";
import { ProceduralCafe } from "@/components/scene/ProceduralCafe";
import { CameraRig } from "@/components/scene/CameraRig";
import { useCafeStore } from "@/store/useCafeStore";

export const xrStore = createXRStore();

export function CafeCanvas() {
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const addLookDelta = useCafeStore((s) => s.addLookDelta);
  const dragPointerId = useRef<number | null>(null);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (explorationMode !== "explore") return;
    // Ignore touches starting in the bottom-left joystick safe zone on mobile
    const isBottomLeft =
      e.clientX < 180 && e.clientY > window.innerHeight - 190;
    if (isBottomLeft && e.pointerType === "touch") return;

    dragPointerId.current = e.pointerId;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      explorationMode !== "explore" ||
      dragPointerId.current !== e.pointerId
    ) {
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
        camera={{ position: [0, 1.75, 7.6], fov: 50, near: 0.1, far: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <XR store={xrStore}>
          <Suspense fallback={null}>
            <LightingEngine />
            <ProceduralCafe />
            <CameraRig />
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}
