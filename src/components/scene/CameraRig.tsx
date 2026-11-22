"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import {
  CAFE_OBSTACLES,
  EXPLORE_START_POS,
  HERO_CAMERA_LOOKAT,
  HERO_CAMERA_POS,
  PLAYER_EYE_HEIGHT,
  PLAYER_RADIUS,
  PLAYER_WALK_SPEED,
  ROOM_BOUNDS,
} from "@/lib/config/colliders";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import { clampPlayerPosition } from "@/lib/engine/collisionAabb";
import { useCafeStore } from "@/store/useCafeStore";

export function CameraRig() {
  const { camera } = useThree();
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const activeSeat = useCafeStore((s) => s.activeSeat);

  const yawRef = useRef(0);
  const pitchRef = useRef(-0.04);
  const keysRef = useRef<Record<string, boolean>>({});
  const forwardVec = useRef(new THREE.Vector3());
  const rightVec = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));

  // Desktop WASD + Arrow keys + Escape shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const state = useCafeStore.getState();
        if (state.activeDrawer !== "none") {
          state.setActiveDrawer("none");
        } else if (state.explorationMode === "seat_focus") {
          state.clearSeatFocus();
        } else if (state.explorationMode === "explore") {
          state.exitToHero();
        }
        return;
      }
      keysRef.current[e.code] = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Smooth GSAP camera transitions when switching modes or focusing a seat
  useEffect(() => {
    if (explorationMode === "hero") {
      gsap.to(camera.position, {
        x: HERO_CAMERA_POS[0],
        y: HERO_CAMERA_POS[1],
        z: HERO_CAMERA_POS[2],
        duration: 1.0,
        ease: "power3.inOut",
        overwrite: "auto",
      });
      yawRef.current = 0;
      pitchRef.current = -0.04;
    } else if (explorationMode === "explore") {
      // Glide slightly forward to entryway if coming from outside hero view
      if (camera.position.z > 6.5) {
        gsap.to(camera.position, {
          x: EXPLORE_START_POS[0],
          y: EXPLORE_START_POS[1],
          z: EXPLORE_START_POS[2],
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    } else if (explorationMode === "seat_focus" && activeSeat) {
      const seat = SEAT_ZONES[activeSeat];
      gsap.to(camera.position, {
        x: seat.cameraPosition[0],
        y: seat.cameraPosition[1],
        z: seat.cameraPosition[2],
        duration: 1.05,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    }
  }, [explorationMode, activeSeat, camera]);

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const state = useCafeStore.getState();

    if (state.explorationMode === "hero") {
      // Gentle breathing camera sway on front facade
      const t = clock.getElapsedTime();
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        HERO_CAMERA_POS[0] + Math.sin(t * 0.35) * 0.32,
        0.04
      );
      camera.lookAt(...HERO_CAMERA_LOOKAT);
      return;
    }

    if (state.explorationMode === "seat_focus" && state.activeSeat) {
      const seat = SEAT_ZONES[state.activeSeat];
      camera.lookAt(...seat.lookAt);
      return;
    }

    if (state.explorationMode !== "explore") return;

    // 1. Apply queued touch-drag or mouse-drag look deltas
    const look = state.consumeLookDelta();
    if (look.dx !== 0 || look.dy !== 0) {
      yawRef.current -= look.dx * 0.0045;
      pitchRef.current = THREE.MathUtils.clamp(
        pitchRef.current - look.dy * 0.0038,
        -0.35,
        0.45
      );
    }

    euler.current.set(pitchRef.current, yawRef.current, 0, "YXZ");
    camera.quaternion.setFromEuler(euler.current);

    // 2. Combine virtual analog joystick + desktop WASD
    let moveX = state.analogVector.x;
    let moveY = state.analogVector.y;

    const k = keysRef.current;
    if (k.KeyW || k.ArrowUp) moveY += 1;
    if (k.KeyS || k.ArrowDown) moveY -= 1;
    if (k.KeyD || k.ArrowRight) moveX += 1;
    if (k.KeyA || k.ArrowLeft) moveX -= 1;

    const len = Math.hypot(moveX, moveY);
    if (len > 0.04) {
      const clampedScale = Math.min(1, len);
      const normX = (moveX / len) * clampedScale;
      const normY = (moveY / len) * clampedScale;

      forwardVec.current.set(0, 0, -1).applyAxisAngle(THREE.Object3D.DEFAULT_UP, yawRef.current);
      rightVec.current.set(1, 0, 0).applyAxisAngle(THREE.Object3D.DEFAULT_UP, yawRef.current);

      const step = PLAYER_WALK_SPEED * delta;
      const proposedX =
        camera.position.x +
        (forwardVec.current.x * normY + rightVec.current.x * normX) * step;
      const proposedZ =
        camera.position.z +
        (forwardVec.current.z * normY + rightVec.current.z * normX) * step;

      const resolved = clampPlayerPosition(
        { x: camera.position.x, z: camera.position.z },
        { x: proposedX, z: proposedZ },
        ROOM_BOUNDS,
        CAFE_OBSTACLES,
        state.isDoorOpen,
        PLAYER_RADIUS
      );

      camera.position.set(resolved.x, PLAYER_EYE_HEIGHT, resolved.z);
    }
  });

  return null;
}
