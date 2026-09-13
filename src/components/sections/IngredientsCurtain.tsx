"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Ingredient {
  id: string;
  name: string;
  botanical: string;
  terroir: string;
  elevation: string;
  tastingNotes: string[];
  image: string;
  narrative: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    id: "01",
    name: "Truffe Noire du Périgord",
    botanical: "Tuber Melanosporum",
    terroir: "Lot-et-Garonne, France",
    elevation: "Subterranean Limestone",
    tastingNotes: ["Damp Forest Floor", "Smoked Cacao", "Black Hazelnut", "Volcanic Earth"],
    image: "/images/ingredients.jpg",
    narrative: "Harvested at dawn beneath ancient oak roots by third-generation truffiers. Shaved raw at table temperature onto 48-hour bone glaze.",
  },
  {
    id: "02",
    name: "Gesha Village 1931 • Oma Lot",
    botanical: "Coffea Arabica • Heirloom Gori Gesha",
    terroir: "Bench Maji Zone, Ethiopia",
    elevation: "2,050 MASL",
    tastingNotes: ["Jasmine Blossom", "Sun-Dried Apricot", "Bergamot Rind", "Wild Honey"],
    image: "/images/cafe-atelier.jpg",
    narrative: "Naturally dried on raised African beds for 28 days. Roasted in 4kg micro-batches on our custom cast-iron drum roaster.",
  },
  {
    id: "03",
    name: "Vosne-Romanée • Les Suchots",
    botanical: "Pinot Noir Grand Millésime",
    terroir: "Côte de Nuits, Burgundy",
    elevation: "260m Limestone Terraces",
    tastingNotes: ["Sous-Bois", "Crushed Damson Plum", "Dried Violets", "Graphite"],
    image: "/images/wine-cellar.jpg",
    narrative: "Unfiltered, biodynamic, aged 30 months in neutral oak. Poured directly from our subterranean 14°C limestone vault.",
  },
];

export const IngredientsCurtain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll(".ingredient-row");
      rows?.forEach((row) => {
        const curtain = row.querySelector(".curtain-wipe");
        const image = row.querySelector(".curtain-image");
        const content = row.querySelectorAll(".reveal-text");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            end: "center center",
            toggleActions: "play none none reverse",
          },
        });

        // Curtain slide reveal
        tl.to(curtain, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 1.2,
          ease: "power3.inOut",
        })
          .fromTo(
            image,
            { scale: 1.2 },
            { scale: 1.0, duration: 1.4, ease: "power2.out" },
            "-=1.1"
          )
          .fromTo(
            content,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
            "-=0.9"
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-onyx-900 px-6 sm:px-12 md:px-20 lg:px-28 py-32 z-20"
    >
      {/* Editorial Section Header */}
      <div className="max-w-7xl mx-auto mb-28 border-b border-onyx-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs uppercase tracking-ultra-wide text-champagne-400 font-sans">
              04 // LA MATIÈRE PREMIÈRE
            </span>
            <span className="w-8 h-[1px] bg-champagne-500/40" />
          </div>
          <h3 className="text-4xl sm:text-6xl font-serif font-light text-silk-50 tracking-tight leading-[1.05]">
            Alchemical Raw Elements
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-sans text-silk-400 max-w-md font-light leading-relaxed">
          Culinary purism. We forage, import, and roast directly from sovereign micro-terroirs without intermediary compromise.
        </p>
      </div>

      {/* Ingredient Showcase Rows */}
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {INGREDIENTS.map((item, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={item.id}
              className={`ingredient-row grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image with sliding curtain */}
              <div
                data-cursor="view"
                className={`relative lg:col-span-6 w-full aspect-[4/3] overflow-hidden rounded-sm gold-border shadow-2xl ${
                  isReversed ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {/* The Image */}
                <div className="curtain-image relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/70 via-transparent to-transparent" />
                </div>

                {/* The Curtain: Solid dark onyx mask sliding open on scroll */}
                <div className="curtain-wipe absolute inset-0 bg-onyx-950 z-10 pointer-events-none origin-right border-l border-champagne-400/40" />

                {/* Coordinate badge inside image */}
                <div className="absolute bottom-4 left-4 z-20 text-[10px] font-sans tracking-widest uppercase text-champagne-300">
                  {item.terroir}
                </div>
              </div>

              {/* Minimal Editorial Text */}
              <div
                className={`lg:col-span-6 flex flex-col gap-6 ${
                  isReversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="reveal-text flex items-center gap-3 text-xs font-sans tracking-widest-luxury uppercase text-champagne-400">
                  <span className="font-mono">[{item.id}]</span>
                  <span>{item.botanical}</span>
                </div>

                <h4 className="reveal-text text-3xl sm:text-4xl md:text-5xl font-serif font-light text-silk-50 leading-[1.1]">
                  {item.name}
                </h4>

                <p className="reveal-text text-silk-300 font-sans text-sm sm:text-base font-light leading-relaxed">
                  {item.narrative}
                </p>

                {/* Tasting Notes Tags */}
                <div className="reveal-text flex flex-wrap gap-2 pt-2">
                  {item.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="text-[11px] font-sans uppercase tracking-widest px-3 py-1.5 rounded-full border border-onyx-700 bg-onyx-850/80 text-silk-300 hover:border-champagne-400/60 transition-colors"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Provenance metadata bar */}
                <div className="reveal-text pt-4 border-t border-onyx-800/80 flex justify-between items-center text-xs font-sans text-silk-400">
                  <span>Elevation: {item.elevation}</span>
                  <span className="text-champagne-400/80 uppercase tracking-widest">
                    Direct Farm Allocation
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
