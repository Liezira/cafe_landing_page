"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useCafeStore } from "@/store/useCafeStore";

/**
 * Stylized procedural barista with 3 reactive animation states:
 * - idle_brewing: gentle breathing + subtle espresso bar sway
 * - greeting_wave: friendly raised right-arm wave when guest opens door
 * - pouring_serving: leaning forward pour-over / cup serving motion when bar is clicked
 *
 * Replace with Mixamo barista_rig.glb via useAnimations when Blender rig is ready.
 */
export function BaristaActor() {
  const baristaState = useCafeStore((s) => s.baristaState);
  const interactWithBarCounter = useCafeStore((s) => s.interactWithBarCounter);
  const setBaristaState = useCafeStore((s) => s.setBaristaState);

  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Automatically settle back to idle_brewing after greeting wave finishes
  useEffect(() => {
    if (baristaState !== "greeting_wave") return;
    const timer = window.setTimeout(() => {
      setBaristaState("idle_brewing");
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [baristaState, setBaristaState]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!rootRef.current || !rightArmRef.current || !leftArmRef.current) return;

    if (baristaState === "greeting_wave") {
      rootRef.current.position.y = Math.sin(t * 3.5) * 0.015;
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        2.35 + Math.sin(t * 9) * 0.35,
        0.18
      );
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.x,
        -0.2,
        0.12
      );
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(t * 2.5) * 0.16;
      }
    } else if (baristaState === "pouring_serving") {
      rootRef.current.position.y = Math.sin(t * 2.4) * 0.01;
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        0.35,
        0.14
      );
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        -0.95 + Math.sin(t * 4) * 0.15,
        0.16
      );
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.x,
        -0.75,
        0.14
      );
      if (headRef.current) {
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          0.18,
          0.12
        );
      }
    } else {
      // idle_brewing
      rootRef.current.position.y = Math.sin(t * 1.8) * 0.012;
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        0.18,
        0.1
      );
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        -0.45 + Math.sin(t * 2.2) * 0.12,
        0.1
      );
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.x,
        -0.42 + Math.cos(t * 2.2) * 0.1,
        0.1
      );
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(t * 0.9) * 0.12;
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          0.06,
          0.1
        );
      }
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    interactWithBarCounter();
  };

  return (
    <group
      name="Barista_Rig"
      ref={rootRef}
      position={[-2.15, 0, -0.78]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Torso + Coffee Apron */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <capsuleGeometry args={[0.21, 0.44, 8, 16]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.98, 0.14]} castShadow>
        <boxGeometry args={[0.34, 0.56, 0.16]} />
        <meshStandardMaterial
          color={hovered ? "#8A4A1F" : "#4A3525"}
          roughness={0.85}
        />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.56, 0]} castShadow>
        <sphereGeometry args={[0.165, 18, 18]} />
        <meshStandardMaterial color="#E6B89C" roughness={0.65} />
      </mesh>
      {/* Barista Cap */}
      <mesh position={[0, 1.67, 0.02]} castShadow>
        <cylinderGeometry args={[0.15, 0.17, 0.08, 16]} />
        <meshStandardMaterial color="#231D1A" roughness={0.85} />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.27, 1.28, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <capsuleGeometry args={[0.065, 0.3, 6, 12]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.27, 1.28, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <capsuleGeometry args={[0.065, 0.3, 6, 12]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
