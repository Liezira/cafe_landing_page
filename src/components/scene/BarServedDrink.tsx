"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCafeStore } from "@/store/useCafeStore";

/**
 * Spawns the guest's freshly ordered drink or pastry directly on the Espresso
 * Bar counter with a warm scale-in entrance and rising steam glow.
 */
export function BarServedDrink() {
  const orderedItem = useCafeStore((s) => s.orderedItem);
  const groupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.14);
    }
    if (steamRef.current) {
      steamRef.current.position.y = 0.24 + Math.sin(t * 2.5) * 0.03;
      steamRef.current.rotation.y = t * 0.8;
    }
  });

  if (!orderedItem) return null;

  const isFood = orderedItem.category === "Pastry & Kitchen";
  const isThermosSignature =
    orderedItem.id === "elixavida" || orderedItem.id === "forbidden-fruit";

  return (
    <group
      ref={groupRef}
      position={[-2.1, 1.1, 0.25]}
      scale={[0.5, 0.5, 0.5]}
    >
      {/* Warm Serving Tray */}
      <mesh position={[0, 0.012, 0]} castShadow>
        <boxGeometry args={[0.36, 0.022, 0.2]} />
        <meshStandardMaterial color="#7D4F2E" roughness={0.6} />
      </mesh>

      {isFood ? (
        /* Warm Pastry / Kitchen Plate */
        <group position={[0, 0.028, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.11, 0.09, 0.016, 22]} />
            <meshStandardMaterial color="#F4F0E8" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.028, 0]} castShadow>
            <boxGeometry args={[0.11, 0.042, 0.08]} />
            <meshStandardMaterial color="#C8823B" roughness={0.72} />
          </mesh>
        </group>
      ) : isThermosSignature ? (
        /* Iconic White SMALL GAPS Capsule Thermos + Ice-Sphere Crystal Glass */
        <group position={[0, 0.024, 0]}>
          <mesh position={[-0.08, 0.09, 0]} castShadow>
            <cylinderGeometry args={[0.032, 0.032, 0.16, 18]} />
            <meshStandardMaterial color="#F7F4EE" roughness={0.32} />
          </mesh>
          <mesh position={[-0.08, 0.17, 0]} castShadow>
            <sphereGeometry args={[0.032, 16, 12]} />
            <meshStandardMaterial color="#F7F4EE" roughness={0.32} />
          </mesh>
          <mesh position={[0.08, 0.045, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.032, 0.085, 14]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transparent
              opacity={0.45}
              roughness={0.08}
              clearcoat={1}
            />
          </mesh>
          <mesh position={[0.08, 0.036, 0]}>
            <sphereGeometry args={[0.024, 14, 14]} />
            <meshPhysicalMaterial
              color="#EAF6FF"
              transparent
              opacity={0.78}
              roughness={0.08}
            />
          </mesh>
        </group>
      ) : (
        /* Fresh Layered Gaps Latte on Dark Stone Coaster */
        <group position={[0, 0.024, 0]}>
          <mesh position={[0, 0.006, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.012, 20]} />
            <meshStandardMaterial color="#23201E" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.068, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.035, 0.115, 20]} />
            <meshPhysicalMaterial
              color="#EEDCC4"
              roughness={0.12}
              clearcoat={1}
            />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.043, 0.043, 0.02, 20]} />
            <meshStandardMaterial color="#FAF4E8" roughness={0.7} />
          </mesh>
        </group>
      )}

      {/* Subtle Warm Rising Steam Wisp */}
      <mesh ref={steamRef} position={[0, 0.24, 0]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial
          color="#FFF5E0"
          emissive="#FFCF87"
          emissiveIntensity={0.45}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
