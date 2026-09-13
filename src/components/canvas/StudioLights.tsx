"use client";

import React, { useRef } from "react";
import * as THREE from "three";

export const StudioLights: React.FC = () => {
  const spotKeyRef = useRef<THREE.SpotLight>(null);
  const spotRimRef = useRef<THREE.SpotLight>(null);

  return (
    <>
      {/* Deep moody ambient floor */}
      <ambientLight color="#161514" intensity={0.8} />

      {/* Dramatic key spotlight sculpting the luxury centerpiece */}
      <spotLight
        ref={spotKeyRef}
        position={[4, 7, 5]}
        angle={0.45}
        penumbra={0.85}
        intensity={14}
        color="#FFF5DF"
        distance={25}
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Champagne golden rim light illuminating the silhouette */}
      <spotLight
        ref={spotRimRef}
        position={[-6, -2, -4]}
        angle={0.6}
        penumbra={0.9}
        intensity={9}
        color="#D4AF37"
        distance={20}
      />

      {/* Warm espresso underglow */}
      <pointLight position={[0, -4, 2]} intensity={3} color="#C49B5A" distance={15} />

      {/* Directional glancing highlight */}
      <directionalLight position={[0, 5, -5]} intensity={1.5} color="#E8D2A0" />
    </>
  );
};
