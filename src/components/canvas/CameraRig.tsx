"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 5.2));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const progress = scrollState.culinaryProgress;
    const { x: mouseX, y: mouseY } = state.pointer;

    // Base target camera positions based on scrollytelling progress
    let targetX = 0;
    let targetY = 0;
    let targetZ = 5.2;

    let lookX = 0;
    const lookY = 0;
    const lookZ = 0;

    if (progress <= 0.2) {
      // Hero
      targetX = mouseX * 0.3;
      targetY = mouseY * 0.2;
      targetZ = 5.2;
    } else if (progress <= 0.6) {
      // Cafe Atelier: camera offsets left, looks slightly right toward object
      const p = (progress - 0.2) / 0.4;
      targetX = THREE.MathUtils.lerp(0, -0.6, p) + mouseX * 0.2;
      targetY = THREE.MathUtils.lerp(0, 0.1, p) + mouseY * 0.15;
      targetZ = THREE.MathUtils.lerp(5.2, 4.6, p);

      lookX = THREE.MathUtils.lerp(0, 0.8, p);
    } else if (progress <= 1.0) {
      // Haute Gastronomie: camera offsets right, looks toward left
      const p = (progress - 0.6) / 0.4;
      targetX = THREE.MathUtils.lerp(-0.6, 0.6, p) + mouseX * 0.2;
      targetY = THREE.MathUtils.lerp(0.1, -0.1, p) + mouseY * 0.15;
      targetZ = THREE.MathUtils.lerp(4.6, 4.8, p);

      lookX = THREE.MathUtils.lerp(0.8, -0.8, p);
    } else {
      // Deep zoom-out for horizontal gallery
      targetZ = 6.0;
    }

    const damp = Math.min(1, 3.5 * delta);
    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), damp);
    currentLookAt.current.lerp(new THREE.Vector3(lookX, lookY, lookZ), damp);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
