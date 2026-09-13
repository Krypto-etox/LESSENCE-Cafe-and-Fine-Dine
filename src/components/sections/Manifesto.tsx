"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TEXT =
  "We do not merely extract coffee or plate courses. We orchestrate fleeting moments of transcendence between fire, volcanic earth, and time.";

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll(".manifesto-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.18, y: 5 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.7,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 sm:px-16 md:px-24 py-24 bg-onyx-950 z-20 select-none overflow-hidden"
    >
      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-champagne-500/[0.035] filter blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-[1px] bg-champagne-500/40" />
          <span className="text-xs uppercase tracking-ultra-wide text-champagne-400 font-sans">
            LE MANIFESTE • L’ÉSSENCE
          </span>
          <span className="w-8 h-[1px] bg-champagne-500/40" />
        </div>

        <p
          ref={textRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-silk-100 leading-[1.2] tracking-tight"
        >
          {MANIFESTO_TEXT.split(" ").map((word, i) => (
            <span
              key={i}
              className="manifesto-word inline-block mr-[0.3em] transition-colors duration-200"
            >
              {word}
            </span>
          ))}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 text-xs font-sans text-silk-400 tracking-widest-luxury uppercase">
          <span>PARIS • VIII ARRONDISSEMENT</span>
          <span className="hidden sm:inline text-champagne-500">•</span>
          <span>CHEF DE CUISINE &amp; MAÎTRE ROASTER</span>
        </div>
      </div>
    </section>
  );
};
