"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type * as THREE from "three";
import { SECOND_FLOOR_Y } from "@/lib/config/routeWaypoints";
import { useCafeStore } from "@/store/useCafeStore";

/**
 * Playable Harvest Moon style real-world wayfinding journey:
 * 1. Front of Hotel Starlet BSD (street + short entrance steps)
 * 2. Turn Right along Ground Lobby
 * 3. Twin Animated Escalators ascending to 2nd Floor (y = 3.6m)
 * 4. Turn Left + Turn Left again into the signature Orange-Terracotta & White-Pillar
 *    2F Corridor (observed in videoplayback (1).mp4) with A-frame chalkboard
 *    leading straight into SMALL GAPS Coffee!
 */
export function HotelStarletRoute() {
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const routeStage = useCafeStore((s) => s.routeStage);
  const skipToCafe = useCafeStore((s) => s.skipToCafe);
  const stepsGroupRef = useRef<THREE.Group>(null);

  // Subtle moving escalator tread motion
  useFrame(({ clock }) => {
    if (!stepsGroupRef.current) return;
    const offset = (clock.getElapsedTime() * 0.65) % 0.45;
    stepsGroupRef.current.position.y = offset * 0.5;
    stepsGroupRef.current.position.z = -offset * 0.7;
  });

  return (
    <group name="Hotel_Starlet_Journey">
      {/* ================================================================
          STAGE 1: FRONT OF HOTEL STARLET BSD (Ground Level y = 0)
         ================================================================ */}
      {/* Driveway / Street Plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.5, -0.02, 17.5]} receiveShadow>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color="#4A4A4D" roughness={0.9} />
      </mesh>

      {/* Hotel Starlet Front Canopy & Facade Pillar */}
      <group position={[0, 0, 16.4]}>
        <mesh position={[0, 3.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[10.5, 0.45, 2.2]} />
          <meshStandardMaterial color="#252830" roughness={0.7} />
        </mesh>
        {/* Starlet Accent Orange Stripe */}
        <mesh position={[0, 3.85, 1.05]}>
          <boxGeometry args={[6.4, 0.22, 0.08]} />
          <meshStandardMaterial
            color="#E86F2C"
            emissive="#E86F2C"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Left & Right Canopy Pillars */}
        {[-4.4, 4.4].map((x) => (
          <mesh key={x} position={[x, 1.8, 0.8]} castShadow>
            <boxGeometry args={[0.45, 3.6, 0.45]} />
            <meshStandardMaterial color="#E6E4E0" roughness={0.75} />
          </mesh>
        ))}

        {explorationMode === "explore" && routeStage === "starlet_front" && (
          <Html position={[0, 4.35, 1.1]} center distanceFactor={11}>
            <div className="hud-glass rounded-full px-3.5 py-1 text-xs font-semibold whitespace-nowrap text-[#FAF7F2]">
              Hotel Starlet BSD · Entrance
            </div>
          </Html>
        )}
      </group>

      {/* Short Entrance Steps Up (y = 0 -> 0.45m) */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, 0.075 + i * 0.15, 16.4 - i * 0.48]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[5.4, 0.15, 0.5]} />
          <meshStandardMaterial color="#D6D2CA" roughness={0.78} />
        </mesh>
      ))}

      {/* ================================================================
          STAGE 2: GROUND LOBBY TURN RIGHT (y = 0.45m)
         ================================================================ */}
      <mesh position={[3.6, 0.22, 13.8]} receiveShadow>
        <boxGeometry args={[11.6, 0.45, 3.6]} />
        <meshStandardMaterial color="#E5E0D6" roughness={0.65} />
      </mesh>

      {/* Glowing Golden Harvest Moon Wayfinding Guide Arrows on Floor */}
      {[
        [0, 0.47, 14.4],
        [2.2, 0.47, 13.9],
        [4.8, 0.47, 13.6],
        [7.2, 0.47, 13.2],
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.24, 16]} />
          <meshStandardMaterial
            color="#F5B041"
            emissive="#F5B041"
            emissiveIntensity={0.85}
          />
        </mesh>
      ))}

      {/* ================================================================
          STAGE 3: TWIN ESCALATORS TO 2ND FLOOR (y = 0.45 -> y = 3.6m)
         ================================================================ */}
      <group name="Twin_Escalators" position={[7.2, 0.45, 10.4]}>
        {/* Left & Right Escalator Side Balustrades */}
        {[-1.15, 0, 1.15].map((xOff) => (
          <mesh
            key={xOff}
            position={[xOff, 1.55, 0]}
            rotation={[0.53, 0, 0]}
            castShadow
          >
            <boxGeometry args={[0.14, 0.9, 6.2]} />
            <meshPhysicalMaterial
              color="#C8DCE6"
              transparent
              opacity={0.42}
              roughness={0.12}
            />
          </mesh>
        ))}

        {/* Escalator Metallic Ramp Core */}
        <mesh position={[0, 1.4, 0]} rotation={[0.53, 0, 0]} receiveShadow>
          <boxGeometry args={[2.3, 0.28, 6.1]} />
          <meshStandardMaterial
            color="#36393F"
            metalness={0.65}
            roughness={0.35}
          />
        </mesh>

        {/* Animated Escalator Treads */}
        <group ref={stepsGroupRef}>
          {Array.from({ length: 10 }).map((_, idx) => (
            <mesh
              key={idx}
              position={[0, 0.12 + idx * 0.3, 2.2 - idx * 0.48]}
              receiveShadow
            >
              <boxGeometry args={[2.05, 0.08, 0.36]} />
              <meshStandardMaterial
                color="#5A5E66"
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>

        {explorationMode === "explore" && routeStage === "lobby_right" && (
          <Html position={[0, 2.2, 2.3]} center distanceFactor={10}>
            <button
              type="button"
              onClick={skipToCafe}
              className="hud-glass-elevated rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap text-[#F5B041]"
            >
              2 Escalators · Walk onto steps for 2F
            </button>
          </Html>
        )}
      </group>

      {/* ================================================================
          STAGE 4: 2ND FLOOR CORRIDOR (TURN LEFT -> TURN LEFT AGAIN)
          Modeled directly from videoplayback (1).mp4 (00:03-00:07):
          Warm orange-terracotta upper arch, tall white pillars, palms,
          and "COFFEE AND ALL DAY DINING" A-frame chalkboard!
         ================================================================ */}
      <group position={[0, SECOND_FLOOR_Y, 0]}>
        {/* 2F Landing & Left-Turn Walkway Floor */}
        <mesh position={[3.6, -0.05, 7.2]} receiveShadow>
          <boxGeometry args={[10.5, 0.1, 2.8]} />
          <meshStandardMaterial color="#CFC6B8" roughness={0.75} />
        </mesh>

        {/* 2F Corridor Leading Straight to SMALL GAPS Entrance */}
        <mesh position={[0, -0.05, 5.2]} receiveShadow>
          <boxGeometry args={[4.2, 0.1, 4.4]} />
          <meshStandardMaterial color="#C8BEB0" roughness={0.76} />
        </mesh>

        {/* Signature Starlet 2F Orange-Terracotta Upper Wall Arch */}
        <mesh position={[0, 3.1, 6.2]} castShadow>
          <boxGeometry args={[6.2, 1.2, 0.35]} />
          <meshStandardMaterial color="#C86A36" roughness={0.82} />
        </mesh>
        {/* Tall White Structural Columns */}
        {[-2.15, 2.15].map((x) => (
          <mesh key={x} position={[x, 1.7, 6.2]} castShadow>
            <boxGeometry args={[0.55, 3.4, 0.55]} />
            <meshStandardMaterial color="#EAE7E1" roughness={0.78} />
          </mesh>
        ))}

        {/* "COFFEE AND ALL DAY DINING" Dark A-Frame Chalkboard at Threshold */}
        <group position={[-1.15, 0.42, 4.45]} rotation={[0, 0.25, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.52, 0.82, 0.08]} />
            <meshStandardMaterial color="#1E1C1A" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.05, 0.045]}>
            <planeGeometry args={[0.42, 0.62]} />
            <meshStandardMaterial color="#2C2A28" roughness={0.9} />
          </mesh>
        </group>

        {/* Golden Floor Dots on 2F Guiding Left -> Left -> Cafe */}
        {[
          [5.4, 0.02, 7.2],
          [2.6, 0.02, 7.2],
          [0.0, 0.02, 6.6],
          [0.0, 0.02, 4.8],
        ].map(([x, y, z], idx) => (
          <mesh key={idx} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.2, 16]} />
            <meshStandardMaterial
              color="#F5B041"
              emissive="#F5B041"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
