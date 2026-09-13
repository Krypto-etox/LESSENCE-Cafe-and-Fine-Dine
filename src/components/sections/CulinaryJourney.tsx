"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scrollStore";
import { Sparkles, Thermometer, Wind } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const CulinaryJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cafeSectionRef = useRef<HTMLDivElement>(null);
  const diningSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Synchronize 3D camera and centerpiece starting smoothly from hero exit
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          scrollState.culinaryProgress = self.progress;
          scrollState.velocity = self.getVelocity();
        },
      });

      // Café step stagger reveal
      if (cafeSectionRef.current) {
        gsap.fromTo(
          cafeSectionRef.current.querySelectorAll(".reveal-item"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cafeSectionRef.current,
              start: "top 70%",
              end: "center center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Fine Dining step stagger reveal
      if (diningSectionRef.current) {
        gsap.fromTo(
          diningSectionRef.current.querySelectorAll(".reveal-item"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: diningSectionRef.current,
              start: "top 70%",
              end: "center center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ----------------- PHASE 1: THE CAFÉ ATELIER (Dawn) ----------------- */}
      <section
        ref={cafeSectionRef}
        className="relative min-h-screen flex items-center px-6 sm:px-12 md:px-20 lg:px-28 py-28 z-10"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Typographic Content & Visual on Left (3D object sits on Right) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="reveal-item flex items-center gap-3">
              <span className="w-6 h-[1px] bg-champagne-500/60" />
              <span className="text-xs uppercase tracking-widest-luxury text-champagne-400 font-sans flex items-center gap-2">
                <span>01 // L’AURORE</span>
                <span className="text-silk-400">• 08:00 — 16:00</span>
              </span>
            </div>

            <h2 className="reveal-item text-4xl sm:text-5xl md:text-6xl font-serif font-light text-silk-50 leading-[1.08]">
              The Micro-Roastery &amp; <br />
              <span className="italic font-normal text-champagne-300">
                Siphon Laboratory
              </span>
            </h2>

            <p className="reveal-item text-silk-300 font-sans text-sm md:text-base font-light leading-relaxed max-w-lg">
              Rare heirloom varietals roasted in micro-batches of five kilograms. Prepared through halogen vacuum siphons to extract floral volatile notes unseen in conventional brewing.
            </p>

            {/* Tasting Notes Badges */}
            <div className="reveal-item flex flex-wrap gap-2">
              {["Bergamot Blossom", "Candied Meyer Lemon", "White Peach", "Wild Jasmine"].map((note) => (
                <span
                  key={note}
                  className="text-[10px] uppercase font-sans tracking-widest px-3 py-1 rounded-full border border-champagne-500/20 bg-onyx-950/60 text-champagne-300"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Embedded Visual: Café Atelier */}
            <div
              data-cursor="view"
              className="reveal-item relative mt-4 overflow-hidden rounded-sm group gold-border shadow-2xl max-w-lg transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/cafe-atelier.jpg"
                  alt="L'ÉSSENCE Café Atelier Roastery"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/85 via-onyx-950/20 to-transparent" />
                
                {/* Environmental Data Overlay */}
                <div className="absolute top-4 left-4 flex gap-3 text-[10px] font-mono text-champagne-300 bg-onyx-950/70 backdrop-blur-md px-2.5 py-1 rounded-sm border border-onyx-800">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-champagne-400" /> 93.4°C
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-champagne-400" /> 9.2 BAR
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-sans text-silk-200">
                  <span className="uppercase tracking-widest text-[11px] text-champagne-400">
                    Station 01 • The Siphon Bar
                  </span>
                  <span className="text-[10px] text-silk-400 font-mono">
                    PARIS VIII
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column placeholder for 3D model */}
          <div className="hidden lg:block lg:col-span-6 pointer-events-none h-96" />
        </div>
      </section>

      {/* ----------------- PHASE 2: HAUTE GASTRONOMIE (Dusk) ----------------- */}
      <section
        ref={diningSectionRef}
        className="relative min-h-screen flex items-center px-6 sm:px-12 md:px-20 lg:px-28 py-28 z-10"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column placeholder for 3D model */}
          <div className="hidden lg:block lg:col-span-6 pointer-events-none h-96" />

          {/* Typographic Content & Visual on Right */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-8">
            <div className="reveal-item flex items-center gap-3">
              <span className="w-6 h-[1px] bg-champagne-500/60" />
              <span className="text-xs uppercase tracking-widest-luxury text-champagne-400 font-sans flex items-center gap-2">
                <span>02 // LE SOIR</span>
                <span className="text-silk-400">• 19:00 — MINUIT</span>
              </span>
            </div>

            <h2 className="reveal-item text-4xl sm:text-5xl md:text-6xl font-serif font-light text-silk-50 leading-[1.08]">
              Avant-Garde <br />
              <span className="italic font-normal text-champagne-300">
                Michelin Gastronomy
              </span>
            </h2>

            <p className="reveal-item text-silk-300 font-sans text-sm md:text-base font-light leading-relaxed max-w-lg">
              When twilight falls, the atelier dissolves into an intimate culinary theater. Twelve bespoke courses sculpted around seasonal forage, heritage venison, and black Périgord truffles.
            </p>

            <div className="reveal-item flex items-center gap-2 text-xs font-sans text-champagne-400/90">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span className="uppercase tracking-widest text-[11px]">
                3-Star Michelin Brigade • Chef Antoine &amp; Élise
              </span>
            </div>

            {/* Embedded Visual: Haute Plating & Dining Room */}
            <div className="reveal-item grid grid-cols-2 gap-4 mt-2 max-w-lg">
              <div
                data-cursor="view"
                className="relative overflow-hidden rounded-sm group gold-border shadow-2xl aspect-[4/5] transition-transform duration-500 hover:-translate-y-1"
              >
                <Image
                  src="/images/hero-dish.jpg"
                  alt="Michelin Star Plated Course"
                  fill
                  sizes="(max-width: 768px) 50vw, 260px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/75 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-champagne-300 font-sans">
                  The Dish • L&apos;Hiver
                </span>
              </div>

              <div
                data-cursor="view"
                className="relative overflow-hidden rounded-sm group gold-border shadow-2xl aspect-[4/5] transition-transform duration-500 hover:-translate-y-1"
              >
                <Image
                  src="/images/interior-dining.jpg"
                  alt="Intimate Dining Room Atmosphere"
                  fill
                  sizes="(max-width: 768px) 50vw, 260px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/75 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-champagne-300 font-sans">
                  The Room • Velvet Onyx
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
