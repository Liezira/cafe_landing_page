"use client";

import { useEffect, useRef, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import type * as THREE from "three";
import { useCafeStore } from "@/store/useCafeStore";

export function InteractiveDoor() {
  const pivotRef = useRef<THREE.Group>(null);
  const isDoorOpen = useCafeStore((s) => s.isDoorOpen);
  const toggleDoor = useCafeStore((s) => s.toggleDoor);
  const setDoorState = useCafeStore((s) => s.setDoorState);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useEffect(() => {
    if (!pivotRef.current) return;
    const targetY = isDoorOpen ? -Math.PI * 0.52 : 0;

    gsap.to(pivotRef.current.rotation, {
      y: targetY,
      duration: 0.75,
      ease: "power2.inOut",
      overwrite: "auto",
      onComplete: () => {
        setDoorState(isDoorOpen ? "open" : "closed");
      },
    });
  }, [isDoorOpen, setDoorState]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    toggleDoor();
  };

  return (
    <group name="Door_Main_Pivot" ref={pivotRef} position={[-0.85, 0, 3.25]}>
      <group
        name="Door_Main"
        position={[0.85, 1.15, 0]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Wooden Door Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.66, 2.28, 0.08]} />
          <meshStandardMaterial
            color={hovered ? "#A66A3E" : "#8B5A34"}
            roughness={0.62}
          />
        </mesh>

        {/* Glass Window Insert */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[1.34, 1.72, 0.095]} />
          <meshPhysicalMaterial
            color="#E8F1F5"
            transparent
            opacity={0.34}
            roughness={0.08}
            metalness={0.1}
          />
        </mesh>

        {/* Brass Pull Handle */}
        <mesh position={[0.62, -0.05, 0.09]} castShadow>
          <cylinderGeometry args={[0.022, 0.022, 0.42, 12]} />
          <meshStandardMaterial
            color={hovered ? "#F2B866" : "#C99652"}
            metalness={0.75}
            roughness={0.28}
          />
        </mesh>
      </group>
    </group>
  );
}
