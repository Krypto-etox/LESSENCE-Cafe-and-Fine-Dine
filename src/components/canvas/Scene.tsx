"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { StudioLights } from "./StudioLights";
import { Centerpiece } from "./Centerpiece";
import { CameraRig } from "./CameraRig";

export const Scene: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <StudioLights />
          <Centerpiece />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
