"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { audioEngine } from "@/lib/audioEngine";
import { Volume2, VolumeX } from "lucide-react";

interface HeroProps {
  onOpenMenu: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMenu, onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLButtonElement>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-mask-reveal",
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, delay: 0.2 }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.2 },
          "-=0.9"
        )
        .fromTo(
          scrollPromptRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleToggleAudio = () => {
    if (audioEngine) {
      const active = audioEngine.toggle();
      setIsPlayingAudio(active);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between items-center px-6 sm:px-12 md:px-16 py-8 md:py-10 z-10 select-none"
    >
      {/* Top Luxury Header Bar */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        {/* Left: Maison Location */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-champagne-500 animate-pulse" />
          <span className="text-[11px] sm:text-xs uppercase tracking-widest-luxury text-silk-300 font-sans">
            L’ÉSSENCE • 18 PLACE DE LA CONCORDE
          </span>
        </div>

        {/* Right: Audio Soundscape Toggle & Menu Trigger */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Soundscape Toggle */}
          <button
            onClick={handleToggleAudio}
            data-cursor="view"
            aria-label="Toggle Soundscape"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-champagne-500/20 bg-onyx-900/60 backdrop-blur-md text-silk-300 hover:text-champagne-300 hover:border-champagne-400 transition-all text-[11px] font-sans tracking-wider cursor-pointer"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-champagne-400" />
                <span className="hidden sm:inline">SOUNDSCAPE ACTIVE</span>
                <span className="flex gap-0.5 items-end h-3 w-3">
                  <span className="w-0.5 h-full bg-champagne-400 animate-pulse" />
                  <span className="w-0.5 h-2/3 bg-champagne-400 animate-pulse" />
                  <span className="w-0.5 h-1/2 bg-champagne-400 animate-pulse" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-silk-400" />
                <span className="hidden sm:inline">SOUNDSCAPE</span>
              </>
            )}
          </button>

          {/* Minimalist Menu Trigger */}
          <button
            type="button"
            onClick={onOpenMenu}
            data-cursor="view"
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-champagne-500/30 bg-onyx-900/70 backdrop-blur-md text-silk-100 hover:text-champagne-300 hover:border-champagne-400 transition-all duration-300 group cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <span className="text-[11px] uppercase tracking-widest text-silk-200 group-hover:text-champagne-300">
              Menu
            </span>
            <div className="flex flex-col gap-1 w-4">
              <span className="w-full h-[1px] bg-champagne-400 transition-transform duration-300 group-hover:translate-y-[2px]" />
              <span className="w-2/3 h-[1px] bg-champagne-400 transition-all duration-300 group-hover:w-full" />
            </div>
          </button>
        </div>
      </header>

      {/* Center Stage Typographic Monument */}
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto my-auto pointer-events-none">
        {/* Pre-title with overflow mask */}
        <div className="overflow-hidden mb-3">
          <p className="hero-mask-reveal text-xs sm:text-sm uppercase tracking-ultra-wide text-champagne-400 font-sans">
            Haute Gastronomie &amp; Café Atelier
          </p>
        </div>

        {/* Master Serif Title with overflow mask */}
        <div className="overflow-hidden pb-4">
          <h1
            ref={titleRef}
            className="hero-mask-reveal text-7xl sm:text-9xl md:text-[11.5rem] lg:text-[13.5rem] font-serif font-extralight tracking-tight text-silk-50 leading-[0.84] gold-gradient-text drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
          >
            L’ÉSSENCE
          </h1>
        </div>

        {/* Thin Champagne Hairline */}
        <div
          ref={lineRef}
          className="w-28 sm:w-36 h-[1px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent my-4"
        />

        {/* Minimal Narrative Hook */}
        <div className="overflow-hidden max-w-xl">
          <p className="hero-mask-reveal text-silk-300/90 font-sans text-xs sm:text-sm font-light tracking-widest leading-relaxed uppercase">
            70% Visual Storytelling • 3D WebGL Scrollytelling
          </p>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <footer className="w-full max-w-7xl mx-auto flex justify-between items-end text-xs font-sans text-silk-400 pb-2 pointer-events-none">
        <div className="hidden sm:block text-[11px] tracking-widest text-silk-400">
          48°52&apos;11.2&quot;N • 2°20&apos;45.8&quot;E
        </div>

        <button
          ref={scrollPromptRef}
          onClick={onExplore}
          data-cursor="view"
          className="mx-auto sm:mx-0 flex flex-col items-center gap-2 text-champagne-400/90 pointer-events-auto hover:text-champagne-300 transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-ultra-wide font-sans">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-champagne-400 via-champagne-400/40 to-transparent animate-pulse" />
        </button>

        <div className="hidden sm:block text-[11px] tracking-widest text-champagne-400">
          MICHELIN ★★★ 2026
        </div>
      </footer>
    </section>
  );
};
