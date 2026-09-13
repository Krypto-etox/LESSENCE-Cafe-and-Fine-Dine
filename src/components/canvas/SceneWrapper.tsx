"use client";

import dynamic from "next/dynamic";
import React from "react";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border border-champagne-500/20 border-t-champagne-500 animate-spin opacity-30" />
    </div>
  ),
});

export const SceneWrapper: React.FC = () => {
  return <Scene />;
};
