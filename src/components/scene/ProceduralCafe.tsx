"use client";

import { useState, useEffect } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { Html, Sparkles } from "@react-three/drei";
import { LIGHTING_PRESETS } from "@/lib/config/lightingPresets";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import { useCafeStore } from "@/store/useCafeStore";
import { InteractiveDoor } from "@/components/scene/InteractiveDoor";
import { BaristaActor } from "@/components/scene/BaristaActor";
import { BarServedDrink } from "@/components/scene/BarServedDrink";
import { SeatedActivityProps } from "@/components/scene/SeatedActivityProps";
import type { SeatZoneId } from "@/lib/types/scene";

/**
 * Architectural 3D representation modeled after the real SMALL GAPS Coffee BSD
 * photos (Hotel Starlet BSD Lt. 2):
 * - Exposed dark industrial steel ceiling + iconic long linear LED tube over Main Bar
 * - Raw concrete back wall with illuminated wood bottle shelves
 * - Fluted concrete accent wall with warm recessed cove lighting
 * - Floor-to-ceiling black-framed glass partition separating indoor & 2F outdoor balcony
 * - Terracotta exposed-brick cushioned bench + warm teak wood plank decking
 * Matches Blender Mesh Naming Contract 1-to-1 for future .glb hot-swap.
 */
export function ProceduralCafe() {
  const lightingMood = useCafeStore((s) => s.lightingMood);
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const focusSeat = useCafeStore((s) => s.focusSeat);
  const interactWithBarCounter = useCafeStore((s) => s.interactWithBarCounter);
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  const preset = LIGHTING_PRESETS[lightingMood];
  const showDustMotes = lightingMood === "morning" || lightingMood === "sunset";

  useEffect(() => {
    document.body.style.cursor = hoveredTarget ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hoveredTarget]);

  const handleSeatClick = (seatId: SeatZoneId) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    focusSeat(seatId);
  };

  const handleBarClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    interactWithBarCounter();
  };

  return (
    <group name="Env_Shell">
      {/* Subtle floating warm sunbeam dust particles in Morning & Sunset */}
      {showDustMotes && (
        <Sparkles
          count={38}
          scale={[8.5, 2.8, 7.5]}
          position={[0, 1.5, 0.5]}
          size={1.6}
          speed={0.22}
          opacity={0.2}
          color={lightingMood === "sunset" ? "#FFD2A0" : "#FFF6E5"}
        />
      )}

      {/* Teak Wood Plank Floor (Indoor + Outdoor Balcony Decking) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2]}
        receiveShadow
      >
        <planeGeometry args={[11, 11.5]} />
        <meshStandardMaterial color="#8F5E38" roughness={0.68} />
      </mesh>

      {/* Polished Concrete Walkway Strip */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-2.9, 0.004, 1.4]}
        receiveShadow
      >
        <planeGeometry args={[2.8, 7.8]} />
        <meshStandardMaterial color="#A8A198" roughness={0.76} />
      </mesh>

      {/* Dark Exposed Industrial Ceiling */}
      <mesh position={[0, 3.25, -0.3]} receiveShadow>
        <boxGeometry args={[9.8, 0.16, 7.2]} />
        <meshStandardMaterial color="#181716" roughness={0.92} />
      </mesh>

      {/* Raw Concrete Back Wall behind Main Espresso Bar */}
      <mesh position={[0, 1.6, -3.85]} receiveShadow castShadow>
        <boxGeometry args={[9.8, 3.25, 0.2]} />
        <meshStandardMaterial color="#8C8984" roughness={0.86} />
      </mesh>

      {/* Back Bar Illuminated Wood Shelves (signature SMALL GAPS display) */}
      {[1.55, 2.02].map((yPos, i) => (
        <group key={yPos} position={[-2.1, yPos, -3.65]}>
          <mesh castShadow>
            <boxGeometry args={[3.4, 0.06, 0.26]} />
            <meshStandardMaterial color="#9A5B32" roughness={0.6} />
          </mesh>
          {/* Warm under-shelf LED glow */}
          <mesh position={[0, -0.04, 0.02]}>
            <boxGeometry args={[3.3, 0.02, 0.04]} />
            <meshStandardMaterial
              color="#FFF0D4"
              emissive="#FFCB80"
              emissiveIntensity={Math.max(0.6, preset.lampEmissiveIntensity * 0.85)}
            />
          </mesh>
          {/* Displayed Elixir/Syrup Bottles */}
          {[-1.2, -0.6, 0, 0.6, 1.2].map((bx) => (
            <mesh key={`${i}-${bx}`} position={[bx, 0.14, 0]} castShadow>
              <cylinderGeometry args={[0.032, 0.036, 0.22, 10]} />
              <meshPhysicalMaterial
                color={bx % 2 === 0 ? "#3A2518" : "#6D3B1E"}
                roughness={0.18}
                clearcoat={0.8}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Left Industrial Charcoal Wall */}
      <mesh position={[-4.8, 1.6, -0.3]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 3.25, 7.1]} />
        <meshStandardMaterial color="#23211F" roughness={0.88} />
      </mesh>

      {/* Right Fluted Concrete Feature Wall + Warm Recessed Uplight Strip */}
      <group position={[4.8, 1.6, -0.3]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.2, 3.25, 7.1]} />
          <meshStandardMaterial color="#595550" roughness={0.84} />
        </mesh>
        <mesh position={[-0.12, -0.55, 0]}>
          <boxGeometry args={[0.04, 0.05, 6.6]} />
          <meshStandardMaterial
            color="#FFE6B8"
            emissive="#FFBF69"
            emissiveIntensity={Math.max(0.7, preset.lampEmissiveIntensity)}
          />
        </mesh>
      </group>

      {/* Floor-to-Ceiling Black-Framed Glass Partition (Left & Right of Door) */}
      {[-2.85, 2.85].map((xPos) => (
        <group key={xPos} position={[xPos, 1.6, 3.25]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.9, 0.18, 0.14]} />
            <meshStandardMaterial color="#161514" roughness={0.55} />
          </mesh>
          <mesh position={[0, -1.49, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.9, 0.24, 0.16]} />
            <meshStandardMaterial color="#161514" roughness={0.62} />
          </mesh>
          <mesh>
            <boxGeometry args={[3.78, 2.76, 0.045]} />
            <meshPhysicalMaterial
              color="#DCE6EC"
              transparent
              opacity={0.24}
              roughness={0.06}
              clearcoat={1}
              reflectivity={0.65}
            />
          </mesh>
        </group>
      ))}

      {/* Front Header Beam & Illuminated SMALL GAPS Signage */}
      <mesh position={[0, 2.82, 3.25]} castShadow receiveShadow>
        <boxGeometry args={[9.8, 0.86, 0.22]} />
        <meshStandardMaterial color="#171615" roughness={0.78} />
      </mesh>
      <mesh position={[0, 2.8, 3.38]}>
        <boxGeometry args={[3.1, 0.36, 0.04]} />
        <meshStandardMaterial
          color="#FAF7F2"
          emissive="#FFF1D6"
          emissiveIntensity={Math.max(0.45, preset.lampEmissiveIntensity * 0.45)}
        />
      </mesh>

      {/* Clickable Hinged Main Glass Door */}
      <InteractiveDoor />

      {/* Iconic Long Suspended Linear LED Tube Bar Light over Espresso Bar */}
      <group name="Lamp_Pendant_01" position={[-2.15, 2.48, -0.35]}>
        <mesh>
          <boxGeometry args={[3.8, 0.045, 0.055]} />
          <meshStandardMaterial
            color="#FFFDF8"
            emissive={preset.lampEmissiveColor}
            emissiveIntensity={Math.max(0.95, preset.lampEmissiveIntensity * 1.1)}
          />
        </mesh>
      </group>

      {/* Main Espresso Bar Counter (Slatted Warm Wood Front + Black Stone Top) */}
      <group
        name="Bar_Counter"
        position={[-2.15, 0, -0.15]}
        onClick={handleBarClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredTarget("bar");
        }}
        onPointerOut={() => setHoveredTarget(null)}
      >
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.1, 1.04, 1.12]} />
          <meshStandardMaterial
            color={hoveredTarget === "bar" ? "#8E5835" : "#6D4124"}
            roughness={0.64}
          />
        </mesh>
        {/* Matte Black Countertop */}
        <mesh position={[0, 1.06, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.065, 1.24]} />
          <meshStandardMaterial color="#1E1C1B" roughness={0.38} />
        </mesh>
        {/* Commercial Dual-Group Espresso Machine */}
        <mesh position={[-0.82, 1.32, -0.1]} castShadow>
          <boxGeometry args={[0.78, 0.46, 0.5]} />
          <meshStandardMaterial
            color="#262423"
            metalness={0.78}
            roughness={0.24}
          />
        </mesh>
        {/* Angled Illuminated Bottle Showcase */}
        <mesh position={[0.72, 1.28, 0.06]} castShadow>
          <boxGeometry args={[0.88, 0.42, 0.44]} />
          <meshPhysicalMaterial
            color="#FFF8EC"
            transparent
            opacity={0.32}
            roughness={0.08}
            clearcoat={1}
          />
        </mesh>
        {explorationMode === "explore" && (
          <Html position={[0, 1.78, 0.35]} center distanceFactor={9}>
            <button
              type="button"
              onClick={() => interactWithBarCounter()}
              className="hud-glass rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F]"
            >
              Espresso Bar · Menu
            </button>
          </Html>
        )}
      </group>

      {/* Barista Character */}
      <BaristaActor />
      <BarServedDrink />

      {/* Seat Zone 1: Indoor WFC Teak Table */}
      <group
        name="Seat_WFC_01"
        position={[2.6, 0, -0.5]}
        onClick={handleSeatClick("wfc")}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredTarget("wfc");
        }}
        onPointerOut={() => setHoveredTarget(null)}
      >
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.065, 0.86]} />
          <meshStandardMaterial
            color={hoveredTarget === "wfc" ? "#AD7546" : "#8E5E35"}
            roughness={0.56}
          />
        </mesh>
        <mesh position={[0, 0.36, 0]} castShadow>
          <boxGeometry args={[0.12, 0.72, 0.55]} />
          <meshStandardMaterial color="#1D1A18" roughness={0.68} />
        </mesh>
        {[-0.45, 0.45].map((zOff) => (
          <mesh key={zOff} position={[0, 0.42, zOff * 1.4]} castShadow>
            <boxGeometry args={[0.46, 0.44, 0.46]} />
            <meshStandardMaterial color="#252220" roughness={0.78} />
          </mesh>
        ))}
        {explorationMode === "explore" && (
          <Html position={[0, 1.32, 0]} center distanceFactor={9}>
            <button
              type="button"
              onClick={() => focusSeat("wfc")}
              className="hud-glass rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F]"
            >
              {SEAT_ZONES.wfc.title}
            </button>
          </Html>
        )}
      </group>

      {/* Seat Zone 2: Fluted-Wall Lounge Banquette */}
      <group
        name="Seat_Sofa_01"
        position={[-2.6, 0, -2.35]}
        onClick={handleSeatClick("sofa")}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredTarget("sofa");
        }}
        onPointerOut={() => setHoveredTarget(null)}
      >
        <mesh position={[0, 0.38, -0.35]} castShadow receiveShadow>
          <boxGeometry args={[1.95, 0.46, 0.78]} />
          <meshStandardMaterial
            color={hoveredTarget === "sofa" ? "#4F463F" : "#342E29"}
            roughness={0.88}
          />
        </mesh>
        <mesh position={[0, 0.72, -0.68]} castShadow>
          <boxGeometry args={[1.95, 0.42, 0.18]} />
          <meshStandardMaterial color="#28231F" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.44, 0.48]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.06, 0.6]} />
          <meshStandardMaterial color="#8E5E35" roughness={0.58} />
        </mesh>
        {explorationMode === "explore" && (
          <Html position={[0, 1.3, 0]} center distanceFactor={9}>
            <button
              type="button"
              onClick={() => focusSeat("sofa")}
              className="hud-glass rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F]"
            >
              {SEAT_ZONES.sofa.title}
            </button>
          </Html>
        )}
      </group>

      {/* Seat Zone 3: Outdoor Terracotta Brick Bench Terrace */}
      <group
        name="Seat_Window_01"
        position={[4.1, 0, 2.0]}
        onClick={handleSeatClick("window")}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredTarget("window");
        }}
        onPointerOut={() => setHoveredTarget(null)}
      >
        {/* Terracotta Exposed Brick Bench Base */}
        <mesh position={[0.15, 0.24, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.72, 0.48, 2.1]} />
          <meshStandardMaterial
            color={hoveredTarget === "window" ? "#B86B46" : "#9E5738"}
            roughness={0.86}
          />
        </mesh>
        {/* Grey & Brown Cushions */}
        {[-0.55, 0.55].map((zOff, idx) => (
          <mesh key={zOff} position={[0.15, 0.51, zOff]} castShadow>
            <boxGeometry args={[0.52, 0.07, 0.52]} />
            <meshStandardMaterial
              color={idx === 0 ? "#6C6A67" : "#5A4637"}
              roughness={0.92}
            />
          </mesh>
        ))}
        {/* Square Teak Side Table */}
        <mesh position={[-0.36, 0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.05, 0.45]} />
          <meshStandardMaterial color="#8E5E35" roughness={0.58} />
        </mesh>
        <mesh position={[-0.36, 0.36, 0]} castShadow>
          <boxGeometry args={[0.06, 0.72, 0.06]} />
          <meshStandardMaterial color="#181716" roughness={0.7} />
        </mesh>
        {explorationMode === "explore" && (
          <Html position={[0, 1.48, 0]} center distanceFactor={9}>
            <button
              type="button"
              onClick={() => focusSeat("window")}
              className="hud-glass rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap text-[#FAF7F2] transition hover:bg-[#FAF7F2] hover:text-[#14110F]"
            >
              {SEAT_ZONES.window.title}
            </button>
          </Html>
        )}
      </group>

      {/* Dynamic Tabletop Props for WFC / Hangout / Solo Seated Mode */}
      <SeatedActivityProps />

      {/* Decorative Potted Greenery */}
      {[
        [-4.2, 0, 2.6],
        [4.2, 0, -3.2],
        [-1.35, 0, 3.85],
        [1.35, 0, 3.85],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh position={[0, 0.24, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.16, 0.48, 12]} />
            <meshStandardMaterial color="#2C2926" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.68, 0]} castShadow>
            <dodecahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color="#2F593D" roughness={0.82} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
