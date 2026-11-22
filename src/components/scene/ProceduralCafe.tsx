"use client";

import { useState, useEffect } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { LIGHTING_PRESETS } from "@/lib/config/lightingPresets";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import { useCafeStore } from "@/store/useCafeStore";
import { InteractiveDoor } from "@/components/scene/InteractiveDoor";
import { BaristaActor } from "@/components/scene/BaristaActor";
import type { SeatZoneId } from "@/lib/types/scene";

/**
 * 1-to-1 Procedural Cafe matching Diara's Blender Mesh Naming Contract:
 * Env_Shell, Door_Main_Pivot, Door_Main, Bar_Counter, Barista_Rig,
 * Seat_WFC_01, Seat_Sofa_01, Seat_Window_01, Lamp_Pendant_01..03.
 */
export function ProceduralCafe() {
  const lightingMood = useCafeStore((s) => s.lightingMood);
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const focusSeat = useCafeStore((s) => s.focusSeat);
  const interactWithBarCounter = useCafeStore((s) => s.interactWithBarCounter);
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  const preset = LIGHTING_PRESETS[lightingMood];

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
      {/* Main Floor (Interior + Corridor Walkway) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2]}
        receiveShadow
      >
        <planeGeometry args={[11, 11.5]} />
        <meshStandardMaterial color="#D8CFC4" roughness={0.82} />
      </mesh>

      {/* Warm Oak Interior Rug/Wood Accent */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.005, -0.3]}
        receiveShadow
      >
        <planeGeometry args={[9.4, 6.8]} />
        <meshStandardMaterial color="#C8A986" roughness={0.72} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.25, -0.3]} receiveShadow>
        <boxGeometry args={[9.8, 0.15, 7.2]} />
        <meshStandardMaterial color="#F2ECE1" roughness={0.9} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 1.6, -3.85]} receiveShadow castShadow>
        <boxGeometry args={[9.8, 3.25, 0.2]} />
        <meshStandardMaterial color="#EFE8DC" roughness={0.88} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-4.8, 1.6, -0.3]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 3.25, 7.1]} />
        <meshStandardMaterial color="#E6DDD0" roughness={0.86} />
      </mesh>

      {/* Right Wall with Window Frame */}
      <mesh position={[4.8, 1.6, -0.3]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 3.25, 7.1]} />
        <meshStandardMaterial color="#E6DDD0" roughness={0.86} />
      </mesh>

      {/* Front Glass Facade - Left Partition */}
      <group position={[-2.85, 1.6, 3.25]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.9, 0.22, 0.16]} />
          <meshStandardMaterial color="#2B241F" roughness={0.6} />
        </mesh>
        <mesh position={[0, -1.49, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.9, 0.24, 0.16]} />
          <meshStandardMaterial color="#8B5A34" roughness={0.68} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.75, 2.75, 0.05]} />
          <meshPhysicalMaterial
            color="#E8F1F5"
            transparent
            opacity={0.26}
            roughness={0.08}
          />
        </mesh>
      </group>

      {/* Front Glass Facade - Right Partition */}
      <group position={[2.85, 1.6, 3.25]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.9, 0.22, 0.16]} />
          <meshStandardMaterial color="#2B241F" roughness={0.6} />
        </mesh>
        <mesh position={[0, -1.49, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.9, 0.24, 0.16]} />
          <meshStandardMaterial color="#8B5A34" roughness={0.68} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.75, 2.75, 0.05]} />
          <meshPhysicalMaterial
            color="#E8F1F5"
            transparent
            opacity={0.26}
            roughness={0.08}
          />
        </mesh>
      </group>

      {/* Front Header Beam & Signage */}
      <mesh position={[0, 2.8, 3.25]} castShadow receiveShadow>
        <boxGeometry args={[9.8, 0.9, 0.22]} />
        <meshStandardMaterial color="#26201C" roughness={0.75} />
      </mesh>
      <mesh position={[0, 2.78, 3.38]}>
        <boxGeometry args={[3.2, 0.42, 0.04]} />
        <meshStandardMaterial
          color="#FAF7F2"
          emissive="#FFF1D6"
          emissiveIntensity={preset.lampEmissiveIntensity * 0.35}
        />
      </mesh>

      {/* Clickable Hinged Main Glass Door */}
      <InteractiveDoor />

      {/* Espresso Bar Counter */}
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
          <boxGeometry args={[2.9, 1.04, 1.15]} />
          <meshStandardMaterial
            color={hoveredTarget === "bar" ? "#9C663F" : "#7D4F2E"}
            roughness={0.62}
          />
        </mesh>
        {/* Countertop Stone */}
        <mesh position={[0, 1.06, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.07, 1.24]} />
          <meshStandardMaterial color="#EAE2D6" roughness={0.45} />
        </mesh>
        {/* Espresso Machine */}
        <mesh position={[-0.75, 1.32, -0.12]} castShadow>
          <boxGeometry args={[0.72, 0.46, 0.48]} />
          <meshStandardMaterial
            color="#2E2A28"
            metalness={0.65}
            roughness={0.3}
          />
        </mesh>
        {/* Pastry Display Case */}
        <mesh position={[0.85, 1.26, 0.08]} castShadow>
          <boxGeometry args={[0.76, 0.34, 0.46]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transparent
            opacity={0.38}
            roughness={0.1}
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

      {/* Warm Pendant Lamps (emissive driven by 4-Mood Lighting) */}
      {[-2.8, -2.15, -1.5].map((xPos, idx) => (
        <group
          key={xPos}
          name={`Lamp_Pendant_0${idx + 1}`}
          position={[xPos, 2.48, -0.1]}
        >
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.75, 8]} />
            <meshStandardMaterial color="#1F1A17" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial
              color="#FFF6E5"
              emissive={preset.lampEmissiveColor}
              emissiveIntensity={preset.lampEmissiveIntensity}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}

      {/* Seat Zone 1: Indoor WFC Table */}
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
          <boxGeometry args={[1.35, 0.07, 0.85]} />
          <meshStandardMaterial
            color={hoveredTarget === "wfc" ? "#B57B4C" : "#9A673F"}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, 0.36, 0]} castShadow>
          <boxGeometry args={[0.12, 0.72, 0.55]} />
          <meshStandardMaterial color="#2B241F" roughness={0.7} />
        </mesh>
        {/* Two Minimalist Chairs */}
        {[-0.45, 0.45].map((zOff) => (
          <mesh key={zOff} position={[0, 0.42, zOff * 1.4]} castShadow>
            <boxGeometry args={[0.45, 0.44, 0.45]} />
            <meshStandardMaterial color="#574D45" roughness={0.8} />
          </mesh>
        ))}
        {explorationMode === "explore" && (
          <Html
            position={[0, 1.32, 0]}
            center
            distanceFactor={9}
          >
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

      {/* Seat Zone 2: Lounge & Group Sofa Corner */}
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
            color={hoveredTarget === "sofa" ? "#8E6C54" : "#6D5442"}
            roughness={0.9}
          />
        </mesh>
        <mesh position={[0, 0.72, -0.68]} castShadow>
          <boxGeometry args={[1.95, 0.42, 0.18]} />
          <meshStandardMaterial color="#5E4738" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.44, 0.48]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.06, 0.6]} />
          <meshStandardMaterial color="#9A673F" roughness={0.6} />
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

      {/* Seat Zone 3: Window Counter Seat */}
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
        <mesh position={[0.25, 0.92, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.07, 1.9]} />
          <meshStandardMaterial
            color={hoveredTarget === "window" ? "#B57B4C" : "#9A673F"}
            roughness={0.58}
          />
        </mesh>
        {[-0.45, 0.45].map((zOff) => (
          <mesh key={zOff} position={[-0.25, 0.62, zOff]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
            <meshStandardMaterial color="#4A3D34" roughness={0.75} />
          </mesh>
        ))}
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

      {/* Decorative Potted Indoor Plants */}
      {[
        [-4.2, 0, 2.6],
        [4.2, 0, -3.2],
        [-1.35, 0, 3.85],
        [1.35, 0, 3.85],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh position={[0, 0.24, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.16, 0.48, 12]} />
            <meshStandardMaterial color="#C4B5A5" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.68, 0]} castShadow>
            <dodecahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color="#3D6B4C" roughness={0.82} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
