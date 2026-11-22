"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { detectArCapability } from "@/lib/engine/arDetector";
import { useCafeStore } from "@/store/useCafeStore";
import { TopBar } from "@/components/hud/TopBar";
import { HeroOverlay } from "@/components/hud/HeroOverlay";
import { MobileControls } from "@/components/hud/MobileControls";
import { MenuDrawer } from "@/components/hud/MenuDrawer";
import { LocationSheet } from "@/components/hud/LocationSheet";
import { SeatInfoDrawer } from "@/components/hud/SeatInfoDrawer";
import { ArGuideModal } from "@/components/hud/ArGuideModal";

const CafeCanvas = dynamic(
  () => import("@/components/scene/CafeCanvas").then((mod) => mod.CafeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-dvh w-full items-center justify-center bg-[#14110F] text-[#FAF7F2]">
        <div className="text-center">
          <p className="font-serif text-xl tracking-wider uppercase">
            SMALL GAPS
          </p>
          <p className="mt-2 text-xs text-[#D8CEC2]">
            Preparing 3D coffee space...
          </p>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  const setArCapability = useCafeStore((s) => s.setArCapability);

  useEffect(() => {
    let mounted = true;
    detectArCapability().then((capability) => {
      if (mounted) {
        setArCapability(capability);
      }
    });
    return () => {
      mounted = false;
    };
  }, [setArCapability]);

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#14110F]">
      <CafeCanvas />

      <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between">
        <TopBar />
        <HeroOverlay />
      </div>

      <MobileControls />
      <MenuDrawer />
      <LocationSheet />
      <SeatInfoDrawer />
      <ArGuideModal />
    </main>
  );
}
