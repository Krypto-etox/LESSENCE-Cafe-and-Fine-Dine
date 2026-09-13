"use client";

import React, { useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: "hero", num: "01", label: "L’Éssence", desc: "Maison & Haute Philosophie" },
  { id: "culinary", num: "02", label: "L’Aurore & Le Soir", desc: "Café Roastery & Haute Gastronomie" },
  { id: "menu", num: "03", label: "La Carte Dégustation", desc: "Alchemical Menu & Pairings" },
  { id: "gallery", num: "04", label: "L’Atmosphère", desc: "Cinematic Sanctuary Gallery" },
  { id: "ingredients", num: "05", label: "La Matière", desc: "Terroir & Foraged Ingredients" },
  { id: "reservation", num: "06", label: "Réservations", desc: "Concierge Private Dining" },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [parisTime, setParisTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setParisTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99990] flex flex-col justify-between bg-onyx-950/95 backdrop-blur-3xl px-8 sm:px-16 md:px-24 py-12 animate-in fade-in duration-400 select-none">
      {/* Top Header */}
      <div className="w-full flex justify-between items-center border-b border-onyx-800/80 pb-6">
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest-luxury text-champagne-400 font-sans">
            L’ÉSSENCE NAVIGATION
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-silk-400">
            PARIS : {parisTime}
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs uppercase tracking-ultra-wide text-silk-300 hover:text-champagne-300 transition-colors cursor-pointer"
        >
          <span>Fermer</span>
          <X className="w-5 h-5 text-champagne-400" />
        </button>
      </div>

      {/* Center Links */}
      <nav className="my-auto py-12 flex flex-col gap-8 max-w-4xl">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => {
              onNavigate(link.id);
              onClose();
            }}
            data-cursor="view"
            className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-left border-b border-onyx-850 hover:border-champagne-500/40 pb-4 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-baseline gap-6">
              <span className="text-sm font-mono text-champagne-400/70 group-hover:text-champagne-400">
                {link.num}
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-silk-100 group-hover:text-champagne-300 group-hover:translate-x-3 transition-all duration-500">
                {link.label}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-sans text-silk-400 group-hover:text-silk-200">
              <span className="hidden md:inline-block tracking-wider uppercase">
                {link.desc}
              </span>
              <ArrowUpRight className="w-5 h-5 text-champagne-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </button>
        ))}
      </nav>

      {/* Bottom Footer Info */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-sans text-silk-400 border-t border-onyx-800/80 pt-6">
        <div className="text-[11px] tracking-widest text-silk-400">
          PLACE DE LA CONCORDE • 8ÈME ARRONDISSEMENT
        </div>
        <div className="text-champagne-400 uppercase tracking-widest">
          PARIS • TOKYO • NEW YORK (OPENING MMXXV)
        </div>
      </div>
    </div>
  );
};
