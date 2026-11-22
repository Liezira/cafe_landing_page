"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import {
  CAFE_OBSTACLES,
  HERO_CAMERA_LOOKAT,
  HERO_CAMERA_POS,
  PLAYER_RADIUS,
  PLAYER_WALK_SPEED,
  ROOM_BOUNDS,
} from "@/lib/config/colliders";
import {
  ESCALATOR_TOP_POS,
  ESCALATOR_TRIGGER_BOX,
  ROUTE_STAGE_LABELS,
  SECOND_FLOOR_Y,
  STARLET_SPAWN_POS,
  resolveStageAndElevation,
} from "@/lib/config/routeWaypoints";
import { SEAT_ZONES } from "@/lib/config/seatZones";
import { clampPlayerPosition } from "@/lib/engine/collisionAabb";
import { PlayerAvatar } from "@/components/scene/PlayerAvatar";
import { useCafeStore } from "@/store/useCafeStore";

export function CameraRig() {
  const { camera } = useThree();
  const explorationMode = useCafeStore((s) => s.explorationMode);
  const activeSeat = useCafeStore((s) => s.activeSeat);
  const teleportNonce = useCafeStore((s) => s.teleportNonce);
  const teleportTarget = useCafeStore((s) => s.teleportTarget);

  const avatarRef = useRef<THREE.Group>(null);
  const avatarPosRef = useRef(new THREE.Vector3(...STARLET_SPAWN_POS));
  const isMovingRef = useRef(false);

  const cameraOrbitYawRef = useRef(0);
  const seatYawOffsetRef = useRef(0);
  const seatPitchOffsetRef = useRef(0);

  const keysRef = useRef<Record<string, boolean>>({});
  const forwardVec = useRef(new THREE.Vector3());
  const rightVec = useRef(new THREE.Vector3());
  const desiredCamPos = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  // Sync avatar position whenever Skip-to-Cafe or Start-from-Hotel teleport is triggered
  useEffect(() => {
    avatarPosRef.current.set(...teleportTarget);
    if (avatarRef.current) {
      avatarRef.current.position.set(...teleportTarget);
    }
    cameraOrbitYawRef.current = 0;
  }, [teleportNonce, teleportTarget]);

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

  useEffect(() => {
    if (explorationMode === "hero") {
      // Hero view showcases SMALL GAPS Coffee 2F Front Facade directly
      gsap.to(camera.position, {
        x: HERO_CAMERA_POS[0],
        y: SECOND_FLOOR_Y + HERO_CAMERA_POS[1],
        z: HERO_CAMERA_POS[2],
        duration: 1.0,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    } else if (explorationMode === "seat_focus" && activeSeat) {
      seatYawOffsetRef.current = 0;
      seatPitchOffsetRef.current = 0;
      const seat = SEAT_ZONES[activeSeat];
      gsap.to(camera.position, {
        x: seat.cameraPosition[0],
        y: SECOND_FLOOR_Y + seat.cameraPosition[1],
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

    // 1. Hero Breathing Front Facade (2F)
    if (state.explorationMode === "hero") {
      isMovingRef.current = false;
      const t = clock.getElapsedTime();
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        HERO_CAMERA_POS[0] + Math.sin(t * 0.35) * 0.32,
        0.04
      );
      camera.lookAt(
        HERO_CAMERA_LOOKAT[0],
        SECOND_FLOOR_Y + HERO_CAMERA_LOOKAT[1],
        HERO_CAMERA_LOOKAT[2]
      );
      return;
    }

    // 2. Seated First-Person Eye-Level POV (WFC / Hangout / Solo)
    if (state.explorationMode === "seat_focus" && state.activeSeat) {
      isMovingRef.current = false;
      const seat = SEAT_ZONES[state.activeSeat];
      const look = state.consumeLookDelta();
      if (look.dx !== 0 || look.dy !== 0) {
        seatYawOffsetRef.current = THREE.MathUtils.clamp(
          seatYawOffsetRef.current - look.dx * 0.0035,
          -0.62,
          0.62
        );
        seatPitchOffsetRef.current = THREE.MathUtils.clamp(
          seatPitchOffsetRef.current - look.dy * 0.003,
          -0.35,
          0.26
        );
      }

      const offsetX = Math.sin(seatYawOffsetRef.current) * 2.2;
      const offsetY = Math.sin(seatPitchOffsetRef.current) * 1.4;
      camera.lookAt(
        seat.lookAt[0] + offsetX,
        SECOND_FLOOR_Y + seat.lookAt[1] + offsetY,
        seat.lookAt[2]
      );
      return;
    }

    if (state.explorationMode !== "explore") return;

    // 3. Harvest Moon 3rd-Person Cozy Follow-Cam + Avatar Movement
    const look = state.consumeLookDelta();
    if (look.dx !== 0) {
      cameraOrbitYawRef.current -= look.dx * 0.005;
    }

    if (!state.isRidingEscalator) {
      let moveX = state.analogVector.x;
      let moveY = state.analogVector.y;

      const k = keysRef.current;
      if (k.KeyW || k.ArrowUp) moveY += 1;
      if (k.KeyS || k.ArrowDown) moveY -= 1;
      if (k.KeyD || k.ArrowRight) moveX += 1;
      if (k.KeyA || k.ArrowLeft) moveX -= 1;

      const len = Math.hypot(moveX, moveY);
      isMovingRef.current = len > 0.04;

      if (len > 0.04) {
        const clampedScale = Math.min(1, len);
        const normX = (moveX / len) * clampedScale;
        const normY = (moveY / len) * clampedScale;

        forwardVec.current
          .set(0, 0, -1)
          .applyAxisAngle(THREE.Object3D.DEFAULT_UP, cameraOrbitYawRef.current);
        rightVec.current
          .set(1, 0, 0)
          .applyAxisAngle(THREE.Object3D.DEFAULT_UP, cameraOrbitYawRef.current);

        const dx = (forwardVec.current.x * normY + rightVec.current.x * normX) * PLAYER_WALK_SPEED * 1.15 * delta;
        const dz = (forwardVec.current.z * normY + rightVec.current.z * normX) * PLAYER_WALK_SPEED * 1.15 * delta;

        const proposedX = avatarPosRef.current.x + dx;
        const proposedZ = avatarPosRef.current.z + dz;

        let resolvedX = proposedX;
        let resolvedZ = proposedZ;

        if (state.onSecondFloor) {
          // If inside cafe zone, apply full cafe AABB collision clamping
          if (proposedZ <= 5.6 && Math.abs(proposedX) <= 4.7) {
            const clamped = clampPlayerPosition(
              { x: avatarPosRef.current.x, z: avatarPosRef.current.z },
              { x: proposedX, z: proposedZ },
              ROOM_BOUNDS,
              CAFE_OBSTACLES,
              state.isDoorOpen,
              PLAYER_RADIUS
            );
            resolvedX = clamped.x;
            resolvedZ = clamped.z;
          } else {
            // Keep player within 2F landing & corridor bounds
            resolvedX = THREE.MathUtils.clamp(proposedX, -2.0, 8.6);
            resolvedZ = THREE.MathUtils.clamp(proposedZ, 4.0, 8.6);
          }
        } else {
          // Keep player within Ground Floor Hotel Starlet front + right lobby bounds
          resolvedX = THREE.MathUtils.clamp(proposedX, -4.2, 8.6);
          resolvedZ = THREE.MathUtils.clamp(proposedZ, 12.2, 19.6);
        }

        // Rotate avatar smoothly toward walking direction
        if (avatarRef.current) {
          const targetAngle = Math.atan2(dx, dz);
          avatarRef.current.rotation.y = THREE.MathUtils.lerp(
            avatarRef.current.rotation.y,
            targetAngle,
            0.22
          );
        }

        const { y, stage } = resolveStageAndElevation(
          resolvedX,
          resolvedZ,
          state.onSecondFloor
        );
        avatarPosRef.current.set(resolvedX, y, resolvedZ);

        if (stage !== state.routeStage) {
          state.setRouteStage(stage);
          state.setContextHint(ROUTE_STAGE_LABELS[stage].hint);
        }

        // Trigger smooth automatic ride up the Twin Escalators to 2F!
        if (
          !state.onSecondFloor &&
          resolvedX >= ESCALATOR_TRIGGER_BOX.minX &&
          resolvedX <= ESCALATOR_TRIGGER_BOX.maxX &&
          resolvedZ >= ESCALATOR_TRIGGER_BOX.minZ &&
          resolvedZ <= ESCALATOR_TRIGGER_BOX.maxZ
        ) {
          state.setIsRidingEscalator(true);
          state.setRouteStage("escalator_up");
          state.setContextHint(ROUTE_STAGE_LABELS.escalator_up.hint);
          isMovingRef.current = false;

          gsap.to(avatarPosRef.current, {
            x: ESCALATOR_TOP_POS[0],
            y: ESCALATOR_TOP_POS[1],
            z: ESCALATOR_TOP_POS[2],
            duration: 2.6,
            ease: "none",
            onComplete: () => {
              const latest = useCafeStore.getState();
              latest.setOnSecondFloor(true);
              latest.setIsRidingEscalator(false);
              latest.setRouteStage("corridor_2f");
              latest.setContextHint(ROUTE_STAGE_LABELS.corridor_2f.hint);
            },
          });
        }
      }
    }

    if (avatarRef.current) {
      avatarRef.current.position.copy(avatarPosRef.current);
    }

    // Harvest Moon cozy overhead-angled 3rd-person follow camera
    const camDist = 4.6;
    const camHeight = 3.85;
    desiredCamPos.current.set(
      avatarPosRef.current.x + Math.sin(cameraOrbitYawRef.current) * camDist,
      avatarPosRef.current.y + camHeight,
      avatarPosRef.current.z + Math.cos(cameraOrbitYawRef.current) * camDist
    );
    camera.position.lerp(desiredCamPos.current, 0.12);

    lookTarget.current.set(
      avatarPosRef.current.x,
      avatarPosRef.current.y + 1.05,
      avatarPosRef.current.z
    );
    camera.lookAt(lookTarget.current);
  });

  if (explorationMode !== "explore") {
    return null;
  }

  return <PlayerAvatar ref={avatarRef} isMovingRef={isMovingRef} />;
}
