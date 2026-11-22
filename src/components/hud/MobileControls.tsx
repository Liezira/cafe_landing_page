"use client";

import { useRef, useState } from "react";
import { useCafeStore } from "@/store/useCafeStore";

const MAX_RADIUS = 38;

/**
 * Translucent bottom-left virtual analog joystick (Sakura / Minecraft style)
 * engineered for zero collision with right-side swipe-look and drawers.
 */
export function MobileControls() {
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const activeDrawer = useCafeStore((s) => s.activeDrawer);
  const setAnalogVector = useCafeStore((s) => s.setAnalogVector);

  const baseRef = useRef<HTMLDivElement>(null);
  const activePointerId = useRef<number | null>(null);
  const [knobOffset, setKnobOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  if (explorationMode !== "explore" || activeDrawer !== "none") {
    return null;
  }

  const updateVectorFromClient = (clientX: number, clientY: number) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rawDx = clientX - centerX;
    const rawDy = clientY - centerY;
    const dist = Math.hypot(rawDx, rawDy);
    const clampedDist = Math.min(dist, MAX_RADIUS);
    const angle = Math.atan2(rawDy, rawDx);

    const offsetX = Math.cos(angle) * clampedDist;
    const offsetY = Math.sin(angle) * clampedDist;

    setKnobOffset({ x: offsetX, y: offsetY });
    // Invert Y so pushing thumb up moves forward (+1)
    setAnalogVector(offsetX / MAX_RADIUS, -offsetY / MAX_RADIUS, true);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    activePointerId.current = e.pointerId;
    updateVectorFromClient(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== e.pointerId) return;
    e.stopPropagation();
    updateVectorFromClient(e.clientX, e.clientY);
  };

  const handlePointerRelease = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== e.pointerId) return;
    e.stopPropagation();
    activePointerId.current = null;
    setKnobOffset({ x: 0, y: 0 });
    setAnalogVector(0, 0, false);
  };

  return (
    <div
      className="fixed bottom-[max(20px,env(safe-area-inset-bottom))] left-4 z-20 flex flex-col items-center gap-2 touch-none sm:bottom-6 sm:left-6"
      aria-label="Virtual movement joystick"
    >
      <div
        ref={baseRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        className="relative flex h-[116px] w-[116px] items-center justify-center rounded-full border border-[#FAF7F2]/30 bg-[#14110F]/56 backdrop-blur-md"
      >
        <div
          style={{
            transform: `translate3d(${knobOffset.x}px, ${knobOffset.y}px, 0)`,
          }}
          className="h-[44px] w-[44px] rounded-full bg-[#FAF7F2]/88 shadow-md transition-transform duration-75"
        />
      </div>
      <span className="rounded-full bg-[#14110F]/70 px-2.5 py-0.5 text-[11px] font-medium text-[#D8CEC2]">
        Move left · Look right
      </span>
    </div>
  );
}
