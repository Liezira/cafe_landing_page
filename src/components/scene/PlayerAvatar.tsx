"use client";

import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlayerAvatarProps {
  isMovingRef: React.MutableRefObject<boolean>;
}

/**
 * Cozy Harvest Moon style stylized 3rd-person playable guest avatar.
 * Smoothly swings legs & arms when moving via analog joystick or WASD.
 */
export const PlayerAvatar = forwardRef<THREE.Group, PlayerAvatarProps>(
  function PlayerAvatar({ isMovingRef }, ref) {
    const leftLegRef = useRef<THREE.Mesh>(null);
    const rightLegRef = useRef<THREE.Mesh>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const rightArmRef = useRef<THREE.Mesh>(null);
    const bodyRef = useRef<THREE.Group>(null);
    const phaseRef = useRef(0);

    useFrame((_, rawDelta) => {
      const delta = Math.min(rawDelta, 0.05);
      const moving = isMovingRef.current;

      if (moving) {
        phaseRef.current += delta * 10;
      }

      const swing = moving ? Math.sin(phaseRef.current) * 0.52 : 0;
      const bounce = moving ? Math.abs(Math.sin(phaseRef.current)) * 0.045 : 0;

      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(
          leftLegRef.current.rotation.x,
          swing,
          0.2
        );
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(
          rightLegRef.current.rotation.x,
          -swing,
          0.2
        );
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
          leftArmRef.current.rotation.x,
          -swing * 0.85,
          0.2
        );
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.x,
          swing * 0.85,
          0.2
        );
      }
      if (bodyRef.current) {
        bodyRef.current.position.y = THREE.MathUtils.lerp(
          bodyRef.current.position.y,
          bounce,
          0.22
        );
      }
    });

    return (
      <group ref={ref} name="Player_Avatar">
        <group ref={bodyRef}>
          {/* Legs */}
          <mesh ref={leftLegRef} position={[-0.1, 0.24, 0]} castShadow>
            <capsuleGeometry args={[0.068, 0.28, 6, 12]} />
            <meshStandardMaterial color="#2C3540" roughness={0.85} />
          </mesh>
          <mesh ref={rightLegRef} position={[0.1, 0.24, 0]} castShadow>
            <capsuleGeometry args={[0.068, 0.28, 6, 12]} />
            <meshStandardMaterial color="#2C3540" roughness={0.85} />
          </mesh>

          {/* Cozy Sweater Torso */}
          <mesh position={[0, 0.72, 0]} castShadow>
            <capsuleGeometry args={[0.18, 0.34, 8, 16]} />
            <meshStandardMaterial color="#C88D55" roughness={0.78} />
          </mesh>

          {/* Small Crossbody Tote / Sling */}
          <mesh position={[0.16, 0.64, -0.06]} castShadow>
            <boxGeometry args={[0.08, 0.2, 0.16]} />
            <meshStandardMaterial color="#3A2A20" roughness={0.85} />
          </mesh>

          {/* Arms */}
          <mesh ref={leftArmRef} position={[-0.24, 0.72, 0]} castShadow>
            <capsuleGeometry args={[0.055, 0.28, 6, 12]} />
            <meshStandardMaterial color="#C88D55" roughness={0.78} />
          </mesh>
          <mesh ref={rightArmRef} position={[0.24, 0.72, 0]} castShadow>
            <capsuleGeometry args={[0.055, 0.28, 6, 12]} />
            <meshStandardMaterial color="#C88D55" roughness={0.78} />
          </mesh>

          {/* Stylized Cozy Head (Harvest Moon proportions) */}
          <mesh position={[0, 1.18, 0]} castShadow>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial color="#F2C6A8" roughness={0.62} />
          </mesh>
          {/* Hair Cap */}
          <mesh position={[0, 1.24, -0.02]} castShadow>
            <sphereGeometry args={[0.21, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
            <meshStandardMaterial color="#2A1E19" roughness={0.85} />
          </mesh>
        </group>
      </group>
    );
  }
);
