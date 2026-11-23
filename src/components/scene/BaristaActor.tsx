"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ASSET_CONFIG } from "@/lib/config/assetConfig";
import { useCafeStore } from "@/store/useCafeStore";

/**
 * Semi-realistic Mixamo / Ready Player Me GLB Barista Loader.
 * Automatically activates when ASSET_CONFIG.useGlbAssets === true.
 */
function GlbBaristaRig() {
  const baristaState = useCafeStore((s) => s.baristaState);
  const interactWithBarCounter = useCafeStore((s) => s.interactWithBarCounter);
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(ASSET_CONFIG.baristaGlbUrl);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    const clipMap = {
      idle_brewing: "Anim_Idle_Brewing",
      greeting_wave: "Anim_Greeting_Wave",
      pouring_serving: "Anim_Pouring_Serving",
    } as const;

    const targetName = clipMap[baristaState];
    const nextAction = actions[targetName] ?? Object.values(actions)[0];
    if (!nextAction) return;

    Object.values(actions).forEach((action) => {
      if (action && action !== nextAction) {
        action.fadeOut(0.4);
      }
    });
    nextAction.reset().fadeIn(0.4).play();
  }, [baristaState, actions]);

  return (
    <group
      ref={groupRef}
      name="Barista_Rig"
      position={[-2.15, 0, -0.78]}
      onClick={(e) => {
        e.stopPropagation();
        interactWithBarCounter();
      }}
    >
      <primitive object={scene} />
    </group>
  );
}

/**
 * Articulated fluid fallback barista modeled after the user's reference photo:
 * Black short-sleeve tee, espresso-brown apron with straps, natural dark hair,
 * articulated shoulders + elbows + wrists, holding a matte-black milk pitcher
 * and ceramic cup with animated latte-art pouring stream & natural head tracking.
 */
function ArticulatedFallbackBarista() {
  const { camera } = useThree();
  const baristaState = useCafeStore((s) => s.baristaState);
  const interactWithBarCounter = useCafeStore((s) => s.interactWithBarCounter);
  const setBaristaState = useCafeStore((s) => s.setBaristaState);

  const rootRef = useRef<THREE.Group>(null);
  const spineRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const rightShoulderRef = useRef<THREE.Group>(null);
  const rightElbowRef = useRef<THREE.Group>(null);
  const leftShoulderRef = useRef<THREE.Group>(null);
  const leftElbowRef = useRef<THREE.Group>(null);
  const milkStreamRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useEffect(() => {
    if (baristaState !== "greeting_wave") return;
    const timer = window.setTimeout(() => {
      setBaristaState("idle_brewing");
    }, 3400);
    return () => window.clearTimeout(timer);
  }, [baristaState, setBaristaState]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (
      !spineRef.current ||
      !headGroupRef.current ||
      !rightShoulderRef.current ||
      !rightElbowRef.current ||
      !leftShoulderRef.current ||
      !leftElbowRef.current
    ) {
      return;
    }

    // Organic breathing & subtle weight shift (eliminates stiff robot feel)
    const breath = Math.sin(t * 2.1) * 0.012;
    const weightShift = Math.sin(t * 0.85) * 0.025;
    spineRef.current.position.y = breath;
    spineRef.current.rotation.z = weightShift;

    // Gentle head look-at toward guest camera (clamped to natural neck angle)
    const camLocalX = THREE.MathUtils.clamp(
      (camera.position.x - -2.15) * 0.14,
      -0.42,
      0.42
    );

    if (baristaState === "greeting_wave") {
      spineRef.current.rotation.x = THREE.MathUtils.lerp(
        spineRef.current.rotation.x,
        0.04,
        0.1
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        camLocalX,
        0.12
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        -0.06,
        0.1
      );

      // Friendly natural elbow wave
      rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(
        rightShoulderRef.current.rotation.z,
        2.1,
        0.14
      );
      rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(
        rightShoulderRef.current.rotation.x,
        -0.35,
        0.14
      );
      rightElbowRef.current.rotation.z = THREE.MathUtils.lerp(
        rightElbowRef.current.rotation.z,
        0.45 + Math.sin(t * 8.5) * 0.32,
        0.2
      );

      leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(
        leftShoulderRef.current.rotation.x,
        -0.35,
        0.1
      );
      leftElbowRef.current.rotation.x = THREE.MathUtils.lerp(
        leftElbowRef.current.rotation.x,
        -0.45,
        0.1
      );
    } else if (baristaState === "pouring_serving") {
      // Natural focused latte-art pour pose (matching reference photo!)
      spineRef.current.rotation.x = THREE.MathUtils.lerp(
        spineRef.current.rotation.x,
        0.14,
        0.1
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        0.26,
        0.12
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        0.08 + Math.sin(t * 1.4) * 0.05,
        0.1
      );

      // Right hand holds matte-black pitcher and gently wiggles latte art
      rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(
        rightShoulderRef.current.rotation.z,
        0.22,
        0.12
      );
      rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(
        rightShoulderRef.current.rotation.x,
        -0.68,
        0.12
      );
      rightElbowRef.current.rotation.z = THREE.MathUtils.lerp(
        rightElbowRef.current.rotation.z,
        -0.35 + Math.sin(t * 5.2) * 0.08,
        0.18
      );
      rightElbowRef.current.rotation.x = THREE.MathUtils.lerp(
        rightElbowRef.current.rotation.x,
        -0.62,
        0.14
      );

      // Left hand cradles ceramic cup steady
      leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(
        leftShoulderRef.current.rotation.x,
        -0.55,
        0.12
      );
      leftElbowRef.current.rotation.x = THREE.MathUtils.lerp(
        leftElbowRef.current.rotation.x,
        -0.72,
        0.12
      );
    } else {
      // idle_brewing: relaxed organic posture with subtle micro-movements
      spineRef.current.rotation.x = THREE.MathUtils.lerp(
        spineRef.current.rotation.x,
        0.08,
        0.08
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        camLocalX * 0.5 + Math.sin(t * 0.7) * 0.1,
        0.06
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        0.14,
        0.08
      );

      rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(
        rightShoulderRef.current.rotation.z,
        0.14,
        0.08
      );
      rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(
        rightShoulderRef.current.rotation.x,
        -0.46 + Math.sin(t * 1.9) * 0.06,
        0.08
      );
      rightElbowRef.current.rotation.z = THREE.MathUtils.lerp(
        rightElbowRef.current.rotation.z,
        -0.18,
        0.08
      );
      rightElbowRef.current.rotation.x = THREE.MathUtils.lerp(
        rightElbowRef.current.rotation.x,
        -0.48,
        0.08
      );

      leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(
        leftShoulderRef.current.rotation.x,
        -0.42 + Math.cos(t * 1.7) * 0.05,
        0.08
      );
      leftElbowRef.current.rotation.x = THREE.MathUtils.lerp(
        leftElbowRef.current.rotation.x,
        -0.52,
        0.08
      );
    }

    if (milkStreamRef.current) {
      milkStreamRef.current.visible = baristaState === "pouring_serving";
      milkStreamRef.current.scale.x = 0.85 + Math.sin(t * 14) * 0.15;
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
      <group ref={spineRef}>
        {/* Black Short-Sleeve Tee Torso */}
        <mesh position={[0, 1.08, 0]} castShadow>
          <capsuleGeometry args={[0.19, 0.44, 10, 20]} />
          <meshStandardMaterial color="#1A1A1C" roughness={0.88} />
        </mesh>

        {/* Espresso-Brown Canvas Apron + Dual Shoulder Straps */}
        <mesh position={[0, 1.0, 0.135]} castShadow>
          <boxGeometry args={[0.32, 0.56, 0.12]} />
          <meshStandardMaterial
            color={hovered ? "#5C3A24" : "#3E281B"}
            roughness={0.86}
          />
        </mesh>
        {[-0.1, 0.1].map((sx) => (
          <mesh key={sx} position={[sx, 1.3, 0.11]} castShadow>
            <boxGeometry args={[0.032, 0.22, 0.04]} />
            <meshStandardMaterial color="#2A1B12" roughness={0.82} />
          </mesh>
        ))}

        {/* Neck & Head Group (tracks guest smoothly) */}
        <group ref={headGroupRef} position={[0, 1.44, 0]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.062, 0.068, 0.12, 14]} />
            <meshStandardMaterial color="#D9A788" roughness={0.62} />
          </mesh>
          <mesh position={[0, 0.15, 0.01]} castShadow>
            <sphereGeometry args={[0.145, 22, 22]} />
            <meshStandardMaterial color="#DFB092" roughness={0.6} />
          </mesh>
          {/* Natural Dark Wavy Hair */}
          <mesh position={[0, 0.21, -0.015]} castShadow>
            <sphereGeometry
              args={[0.156, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]}
            />
            <meshStandardMaterial color="#181615" roughness={0.88} />
          </mesh>
          <mesh position={[0.04, 0.23, 0.07]} rotation={[0.2, 0.3, -0.2]}>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshStandardMaterial color="#181615" roughness={0.88} />
          </mesh>
        </group>

        {/* Right Arm (Shoulder -> Elbow -> Matte-Black Milk Pitcher) */}
        <group ref={rightShoulderRef} position={[0.24, 1.3, 0]}>
          {/* Black T-shirt Sleeve */}
          <mesh position={[0, -0.09, 0]} castShadow>
            <capsuleGeometry args={[0.062, 0.14, 8, 14]} />
            <meshStandardMaterial color="#1A1A1C" roughness={0.88} />
          </mesh>
          {/* Forearm Joint */}
          <group ref={rightElbowRef} position={[0, -0.22, 0]}>
            <mesh position={[0, -0.13, 0]} castShadow>
              <capsuleGeometry args={[0.046, 0.2, 8, 14]} />
              <meshStandardMaterial color="#DFB092" roughness={0.62} />
            </mesh>
            {/* Matte-Black Milk Pitcher */}
            <mesh position={[0, -0.27, 0.06]} rotation={[0.45, 0, 0]} castShadow>
              <cylinderGeometry args={[0.036, 0.046, 0.1, 16]} />
              <meshStandardMaterial
                color="#1E1E20"
                metalness={0.55}
                roughness={0.35}
              />
            </mesh>
            {/* Animated Pouring Milk Stream */}
            <mesh
              ref={milkStreamRef}
              position={[-0.06, -0.34, 0.12]}
              rotation={[0.2, 0, 0.35]}
              visible={false}
            >
              <cylinderGeometry args={[0.008, 0.005, 0.14, 8]} />
              <meshStandardMaterial color="#FAF7F2" roughness={0.3} />
            </mesh>
          </group>
        </group>

        {/* Left Arm (Shoulder -> Elbow -> Ceramic Latte Cup) */}
        <group ref={leftShoulderRef} position={[-0.24, 1.3, 0]}>
          <mesh position={[0, -0.09, 0]} castShadow>
            <capsuleGeometry args={[0.062, 0.14, 8, 14]} />
            <meshStandardMaterial color="#1A1A1C" roughness={0.88} />
          </mesh>
          <group ref={leftElbowRef} position={[0, -0.22, 0]}>
            <mesh position={[0, -0.13, 0]} castShadow>
              <capsuleGeometry args={[0.046, 0.2, 8, 14]} />
              <meshStandardMaterial color="#DFB092" roughness={0.62} />
            </mesh>
            {/* Ceramic Cup held in hand */}
            <mesh position={[0.04, -0.27, 0.07]} castShadow>
              <cylinderGeometry args={[0.045, 0.036, 0.07, 16]} />
              <meshStandardMaterial color="#3A3532" roughness={0.5} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

export function BaristaActor() {
  const useGlbAssets = useCafeStore((s) => s.useGlbAssets);
  return useGlbAssets ? <GlbBaristaRig /> : <ArticulatedFallbackBarista />;
}
