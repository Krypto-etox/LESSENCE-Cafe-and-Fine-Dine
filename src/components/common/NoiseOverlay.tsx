"use client";

import React from "react";

export const NoiseOverlay: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] h-full w-full overflow-hidden opacity-[0.038] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="cinematic-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
      </svg>
    </div>
  );
};
