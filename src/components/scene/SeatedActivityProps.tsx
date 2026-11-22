"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import { useCafeStore } from "@/store/useCafeStore";

/**
 * Dynamic 3D tabletop props anchored to the active seat when the user sits down.
 * Modeled after real SMALL GAPS BSD tableware: white capsule thermos on wooden tray,
 * crystal ice-sphere glass, matte-black wood-lid tissue box, layered Gaps Latte,
 * slim WFC laptop, and pastry plate.
 */
export function SeatedActivityProps() {
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const activeSeat = useCafeStore((s) => s.activeSeat);
  const seatedActivity = useCafeStore((s) => s.seatedActivity);
  const groupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.14);
    }
    if (steamRef.current) {
      steamRef.current.position.y = 0.18 + Math.sin(t * 2.2) * 0.025;
      steamRef.current.rotation.y = t * 0.6;
    }
  });

  if (explorationMode !== "seat_focus" || !activeSeat) {
    return null;
  }

  const [x, y, z] = SEAT_ZONES[activeSeat].tableTopPosition;

  return (
    <group
      ref={groupRef}
      position={[x, y, z]}
      scale={[0.82, 0.82, 0.82]}
    >
      {/* Signature SMALL GAPS Matte-Black Wood-Lid Tissue Box (present on all tables) */}
      <group position={[0.38, 0.055, -0.18]}>
        <mesh castShadow>
          <boxGeometry args={[0.13, 0.11, 0.13]} />
          <meshStandardMaterial color="#1A1715" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.058, 0]}>
          <boxGeometry args={[0.125, 0.012, 0.125]} />
          <meshStandardMaterial color="#9A673F" roughness={0.55} />
        </mesh>
      </group>

      {/* WORK (WFC) MODE: Slim Aluminum Laptop + Notebook + Layered Gaps Latte */}
      {seatedActivity === "wfc" && (
        <group>
          {/* Laptop Base */}
          <mesh position={[-0.12, 0.01, 0.04]} castShadow>
            <boxGeometry args={[0.34, 0.014, 0.23]} />
            <meshStandardMaterial
              color="#B8BDC4"
              metalness={0.75}
              roughness={0.28}
            />
          </mesh>
          {/* Open Glowing Screen */}
          <group position={[-0.12, 0.11, -0.075]} rotation={[-0.22, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.34, 0.21, 0.01]} />
              <meshStandardMaterial
                color="#A6ACB5"
                metalness={0.75}
                roughness={0.25}
              />
            </mesh>
            <mesh position={[0, 0, 0.007]}>
              <planeGeometry args={[0.31, 0.185]} />
              <meshStandardMaterial
                color="#FAF7F2"
                emissive="#FFF2DE"
                emissiveIntensity={0.45}
              />
            </mesh>
          </group>

          {/* Minimal Notebook */}
          <mesh position={[-0.36, 0.012, 0.08]} rotation={[0, 0.14, 0]} castShadow>
            <boxGeometry args={[0.14, 0.018, 0.19]} />
            <meshStandardMaterial color="#3A322C" roughness={0.85} />
          </mesh>

          {/* Layered Gaps Latte on Dark Stone Coaster */}
          <group position={[0.18, 0, 0.08]}>
            <mesh position={[0, 0.006, 0]}>
              <cylinderGeometry args={[0.055, 0.055, 0.012, 20]} />
              <meshStandardMaterial color="#262321" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.068, 0]} castShadow>
              <cylinderGeometry args={[0.044, 0.034, 0.115, 20]} />
              <meshPhysicalMaterial
                color="#EEDCC4"
                roughness={0.12}
                transmission={0.2}
                clearcoat={1}
              />
            </mesh>
            {/* Cream Foam Top */}
            <mesh position={[0, 0.115, 0]}>
              <cylinderGeometry args={[0.042, 0.042, 0.02, 20]} />
              <meshStandardMaterial color="#FAF4E8" roughness={0.7} />
            </mesh>
          </group>
        </group>
      )}

      {/* HANGOUT MODE: Iconic SMALL GAPS White Capsule Thermos + Ice-Sphere Glass + Strudel/Pastry */}
      {seatedActivity === "hangout" && (
        <group>
          {/* Wooden Serving Tray */}
          <mesh position={[-0.18, 0.012, 0.06]} castShadow>
            <boxGeometry args={[0.36, 0.022, 0.15]} />
            <meshStandardMaterial color="#7D4F2E" roughness={0.62} />
          </mesh>
          {/* Iconic White SMALL GAPS Capsule Thermos */}
          <group position={[-0.29, 0.115, 0.06]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.036, 0.036, 0.16, 20]} />
              <meshStandardMaterial color="#F4F1EC" roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.08, 0]} castShadow>
              <sphereGeometry args={[0.036, 20, 14]} />
              <meshStandardMaterial color="#F4F1EC" roughness={0.35} />
            </mesh>
          </group>
          {/* Cut-Crystal Glass + Giant Clear Ice Sphere */}
          <group position={[-0.08, 0.065, 0.06]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.042, 0.034, 0.09, 12]} />
              <meshPhysicalMaterial
                color="#FFFFFF"
                transparent
                opacity={0.42}
                roughness={0.06}
                clearcoat={1}
              />
            </mesh>
            <mesh position={[0, -0.008, 0]}>
              <sphereGeometry args={[0.026, 16, 16]} />
              <meshPhysicalMaterial
                color="#EAF6FF"
                transparent
                opacity={0.75}
                roughness={0.08}
              />
            </mesh>
          </group>

          {/* Shared Pastry Plate (Pineapple Apple Strudel & Ice Cream) */}
          <group position={[0.16, 0.01, -0.02]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.12, 0.1, 0.016, 24]} />
              <meshStandardMaterial color="#EFECE6" roughness={0.4} />
            </mesh>
            <mesh position={[0.02, 0.03, 0]} rotation={[0, 0.3, 0]} castShadow>
              <boxGeometry args={[0.11, 0.038, 0.07]} />
              <meshStandardMaterial color="#C8823B" roughness={0.72} />
            </mesh>
            <mesh position={[-0.055, 0.032, 0.02]} castShadow>
              <sphereGeometry args={[0.028, 14, 14]} />
              <meshStandardMaterial color="#FFF8E7" roughness={0.6} />
            </mesh>
          </group>

          {/* Second Amber Drink (Forbidden Fruit / Iced Tea) */}
          <mesh position={[0.16, 0.075, 0.14]} castShadow>
            <cylinderGeometry args={[0.035, 0.03, 0.135, 18]} />
            <meshPhysicalMaterial
              color="#D97A2B"
              transparent
              opacity={0.85}
              roughness={0.1}
              clearcoat={1}
            />
          </mesh>
        </group>
      )}

      {/* SOLO COFFEE MODE: Ceramic Cup + Rising Steam + Hardcover Book */}
      {seatedActivity === "solo" && (
        <group>
          {/* Ceramic Cup & Saucer */}
          <group position={[-0.1, 0.01, 0.06]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.08, 0.06, 0.012, 20]} />
              <meshStandardMaterial color="#B8D4DA" roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.042, 0]} castShadow>
              <cylinderGeometry args={[0.052, 0.04, 0.07, 20]} />
              <meshStandardMaterial color="#C4DFE4" roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.072, 0]}>
              <cylinderGeometry args={[0.046, 0.046, 0.008, 20]} />
              <meshStandardMaterial color="#6F3B1B" roughness={0.25} />
            </mesh>
            {/* Subtle Animated Steam Wisp */}
            <mesh ref={steamRef} position={[0, 0.18, 0]}>
              <sphereGeometry args={[0.028, 10, 10]} />
              <meshStandardMaterial
                color="#FFFFFF"
                transparent
                opacity={0.18}
                depthWrite={false}
              />
            </mesh>
          </group>

          {/* Small Open Book */}
          <mesh position={[0.15, 0.016, 0.04]} rotation={[0, -0.25, 0]} castShadow>
            <boxGeometry args={[0.21, 0.022, 0.15]} />
            <meshStandardMaterial color="#EDE5D8" roughness={0.88} />
          </mesh>
        </group>
      )}
    </group>
  );
}
