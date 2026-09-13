"use client";

import React, { useState } from "react";
import { SceneWrapper } from "@/components/canvas/SceneWrapper";
import { CustomCursor } from "@/components/common/CustomCursor";
import { NavigationDrawer } from "@/components/common/NavigationDrawer";
import { Hero } from "@/components/sections/Hero";
import { CulinaryJourney } from "@/components/sections/CulinaryJourney";
import { Manifesto } from "@/components/sections/Manifesto";
import { ScrollingMenu } from "@/components/sections/ScrollingMenu";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { IngredientsCurtain } from "@/components/sections/IngredientsCurtain";
import { ReservationFooter } from "@/components/sections/ReservationFooter";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCulinary = () => {
    const el = document.getElementById("culinary");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-onyx-900 text-silk-100 overflow-x-hidden">
      {/* Signature Custom Framer Motion Cursor */}
      <CustomCursor />

      {/* Navigation Fullscreen Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 3D WebGL Fixed Fullscreen Canvas */}
      <SceneWrapper />

      {/* Section 01: The Hero Hook */}
      <div id="hero">
        <Hero
          onOpenMenu={() => setIsMenuOpen(true)}
          onExplore={scrollToCulinary}
        />
      </div>

      {/* Section 02: The Culinary Journey (3D Scrollytelling) */}
      <div id="culinary">
        <CulinaryJourney />
      </div>

      {/* Section 02.5: The Manifesto (Word-by-word Scrubbed Philosophy) */}
      <div id="manifesto">
        <Manifesto />
      </div>

      {/* Section 03: The Alchemical Scrolling Menu */}
      <div id="menu">
        <ScrollingMenu />
      </div>

      {/* Section 04: The Atmosphere (Horizontal Parallax Gallery - Untouched & Preserved) */}
      <div id="gallery">
        <HorizontalGallery />
      </div>

      {/* Section 05: The Alchemical Ingredients (Curtain Reveal on Scroll) */}
      <div id="ingredients">
        <IngredientsCurtain />
      </div>

      {/* Section 06: The Reservation Sanctuary & Footer */}
      <div id="reservation">
        <ReservationFooter />
      </div>
    </main>
  );
}
