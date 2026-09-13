"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  aspect: string;
  details: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "01",
    title: "Le Pass du Chef",
    subtitle: "Artisanal Precision Under Copper Heat",
    category: "Cuisine • The Line",
    image: "/images/kitchen-pass.jpg",
    aspect: "w-[75vw] sm:w-[55vw] lg:w-[48vw]",
    details: "Executive brigade staging 12 bespoke courses under focused tungsten warmth.",
  },
  {
    id: "02",
    title: "Le Grand Salon",
    subtitle: "Onyx Velvet & Intimate Shadows",
    category: "Atmosphere • The Room",
    image: "/images/interior-dining.jpg",
    aspect: "w-[80vw] sm:w-[60vw] lg:w-[52vw]",
    details: "Fluted acoustic oak walls, custom leather banquettes, and backlit Grand Cru cellar.",
  },
  {
    id: "03",
    title: "La Cave Souterraine",
    subtitle: "Centuries of Vintage Alchemy",
    category: "Oenology • Grand Cru",
    image: "/images/wine-cellar.jpg",
    aspect: "w-[75vw] sm:w-[55vw] lg:w-[48vw]",
    details: "Subterranean vaulted limestone cellar housing 1,400 rare biodynamic selections.",
  },
  {
    id: "04",
    title: "L'Atelier Siphon",
    subtitle: "Dawn Extraction Rituals",
    category: "Atelier • Coffee Laboratory",
    image: "/images/cafe-atelier.jpg",
    aspect: "w-[75vw] sm:w-[55vw] lg:w-[48vw]",
    details: "Hand-blown Japanese siphons releasing volatile aromatics of Gesha Village 1931.",
  },
  {
    id: "05",
    title: "L'Hiver Gastronomique",
    subtitle: "Périgord Truffle & Gold Leaf",
    category: "Tasting Menu • Nocturne",
    image: "/images/hero-dish.jpg",
    aspect: "w-[75vw] sm:w-[55vw] lg:w-[48vw]",
    details: "Dry-aged heritage venison loin encased in black winter truffle reduction.",
  },
];

export const HorizontalGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.15}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Internal Parallax for images inside each card
      const imageContainers = track.querySelectorAll(".gallery-parallax-image");
      imageContainers.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: 8 },
          {
            xPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getScrollAmount() * 1.15}`,
              scrub: 1,
              containerAnimation: scrollTween,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-onyx-950 overflow-hidden z-20 select-none flex flex-col justify-between py-12"
    >
      {/* Header bar of horizontal gallery */}
      <div className="w-full px-8 md:px-16 flex justify-between items-end border-b border-onyx-800/80 pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-ultra-wide text-champagne-400 font-sans">
              03 // L’ATMOSPHÈRE
            </span>
            <span className="w-8 h-[1px] bg-champagne-500/40" />
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-silk-50 tracking-tight">
            Cinematic Sanctuary
          </h3>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-sans text-silk-400 uppercase tracking-widest">
          <span>Horizontal Drag or Scroll</span>
          <span className="inline-block w-8 h-[1px] bg-champagne-500/50" />
          <span className="text-champagne-400 font-mono">01 — 05</span>
        </div>
      </div>

      {/* Horizontal Scrolling Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 md:gap-14 pl-8 md:pl-16 pr-32 my-auto h-[68vh] will-change-transform"
      >
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            data-cursor="view"
            className={`group relative h-full ${item.aspect} flex-shrink-0 flex flex-col justify-between p-4 bg-onyx-900/60 rounded-sm border border-onyx-800 hover:border-champagne-500/40 transition-all duration-700 cursor-pointer overflow-hidden`}
          >
            {/* Top metadata row */}
            <div className="flex justify-between items-center z-10 text-[11px] font-sans tracking-widest-luxury uppercase text-silk-400">
              <span className="text-champagne-400 font-mono">[{item.id}]</span>
              <span>{item.category}</span>
              <ArrowUpRight className="w-4 h-4 text-champagne-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
            </div>

            {/* Giant Screen-Filling Parallax Image Mask */}
            <div className="relative my-3 w-full flex-1 overflow-hidden rounded-[2px] bg-onyx-950">
              <div className="gallery-parallax-image relative w-[116%] -left-[8%] h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 80vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95 contrast-105"
                  priority={item.id === "01"}
                />
              </div>

              {/* Ambient Steam / Smoke Veil on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/90 via-onyx-950/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-champagne-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* Bottom Caption */}
            <div className="flex flex-col gap-1 z-10 pt-2">
              <h4 className="text-xl md:text-2xl font-serif font-light text-silk-50 group-hover:text-champagne-200 transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-xs text-silk-400 font-sans font-light tracking-wide line-clamp-1">
                {item.subtitle} • {item.details}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Track progress indicator */}
      <div className="w-full px-8 md:px-16 flex justify-between items-center text-[10px] font-sans text-silk-400 uppercase tracking-widest-luxury pt-2">
        <span>L’ÉSSENCE ARCHIVE • MMXXIV</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-500" />
          <span>CINEMATIC FRAMEWORK 2.39:1</span>
        </div>
      </div>
    </section>
  );
};
