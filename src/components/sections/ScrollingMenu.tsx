"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, X, Wine, Coffee } from "lucide-react";

interface MenuItem {
  id: string;
  category: "cafe" | "dining";
  title: string;
  subtitle: string;
  price: string;
  image: string;
  notes: string[];
  pairing: string;
  origin: string;
  description: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "01",
    category: "cafe",
    title: "Gesha Village 1931 • Halogen Siphon",
    subtitle: "Sun-Dried Single-Terroir Extraction",
    price: "€32",
    image: "/images/cafe-atelier.jpg",
    notes: ["Jasmine Blossom", "Sun-Dried Apricot", "Bergamot Rind"],
    pairing: "Truffle Brioche & Salted French Butter",
    origin: "Bench Maji Zone, Ethiopia • 2,050 MASL",
    description: "Extracted via hand-blown halogen vacuum siphon at precisely 93.4°C. Releases an ethereal clarity and floral perfume unmatched by pressure extraction.",
  },
  {
    id: "02",
    category: "cafe",
    title: "Brioche Feuilletée & Truffe Noire",
    subtitle: "Laminated 72-Hour Fermented Dough",
    price: "€28",
    image: "/images/ingredients.jpg",
    notes: ["Brown Butter", "Subterranean Hazelnut", "Raw Fleur de Sel"],
    pairing: "Double Shot Natural Anaerobic Espresso",
    origin: "Normandy Cultured Butter & Lot-et-Garonne Truffles",
    description: "Flaky brioche feuilletée infused with cultured churned butter, generously shaved with fresh black Périgord truffle at service.",
  },
  {
    id: "03",
    category: "dining",
    title: "Langoustine Royale & Caviar Osciètre",
    subtitle: "Wild Breton Crustacean with Saffron Emulsion",
    price: "€78",
    image: "/images/kitchen-pass.jpg",
    notes: ["Iodine Sweetness", "Iranian Saffron", "Sea Urchin Foam"],
    pairing: "Chablis Grand Cru 'Les Clos' 2018",
    origin: "Guilvinec Harbor, Brittany",
    description: "Gently poached in aromatic sea butter for 90 seconds. Topped with imperial Oscietra caviar and a whisper of smoked sea kelp velouté.",
  },
  {
    id: "04",
    category: "dining",
    title: "Filet de Cerf & Réduction Périgord",
    subtitle: "Wood-Smoked Heritage Venison Loin",
    price: "€88",
    image: "/images/hero-dish.jpg",
    notes: ["Black Truffle Glaze", "Roasted Parsnip Purée", "Wood Smoke"],
    pairing: "Vosne-Romanée 1er Cru 2015",
    origin: "Fontainebleau Heritage Forage",
    description: "Seared over aromatic cherrywood embers. Glazed with a 48-hour bone and winter truffle marrow reduction, crowned with 24k edible gold leaf.",
  },
  {
    id: "05",
    category: "dining",
    title: "Sélection du Sommelier • Grand Cru Flight",
    subtitle: "Biodynamic Cellar Rare Allocations",
    price: "€140",
    image: "/images/wine-cellar.jpg",
    notes: ["Sous-Bois", "Crushed Damson Plum", "Vintage Tobacco"],
    pairing: "Curated with each nocturnal course",
    origin: "Underground Vault, Paris VIII",
    description: "Four exceptional pours retrieved directly from our subterranean 14°C vaulted limestone cellar, decanted 45 minutes before presentation.",
  },
  {
    id: "06",
    category: "dining",
    title: "Sphère Cacao Noir & Or Fumé",
    subtitle: "Single-Plantation Chuao Chocolate",
    price: "€34",
    image: "/images/hero-dish.jpg",
    notes: ["74% Smoked Cacao", "Bourbon Vanilla Gel", "Toasted Tonka Bean"],
    pairing: "Cold Drip Geisha Coffee Liqueur",
    origin: "Chuao Valley, Venezuela",
    description: "Thin tempered dark chocolate sphere filled with molten caramel smoked over coffee husks, cracked tableside under liquid nitrogen.",
  },
];

export const ScrollingMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "cafe" | "dining">("all");
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth springs for cursor-following preview card
  const previewX = useSpring(mouseX, { stiffness: 260, damping: 24 });
  const previewY = useSpring(mouseY, { stiffness: 260, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 24);
    mouseY.set(e.clientY - 140);
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-onyx-950 py-28 px-6 sm:px-12 md:px-20 lg:px-28 z-20 select-none overflow-hidden"
    >
      {/* Top Infinite Marquee Ribbon */}
      <div className="w-full overflow-hidden border-y border-onyx-800/60 py-4 mb-20">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 text-[11px] font-sans tracking-widest-luxury uppercase text-champagne-400">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span>HAUTE GASTRONOMIE</span>
              <span>•</span>
              <span>3 ÉTOILES MICHELIN GUIDE 2026</span>
              <span>•</span>
              <span>EXTRACTION SYPHON DE PRÉCISION</span>
              <span>•</span>
              <span>12-COURSE NOCTURNE TASTING</span>
              <span>•</span>
              <span>VINS BIODYNAMIQUES DU DOMAINE</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section Header & Tab Controls */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs uppercase tracking-ultra-wide text-champagne-400 font-sans">
              02.5 // LA CARTE DÉGUSTATION
            </span>
            <span className="w-8 h-[1px] bg-champagne-500/40" />
          </div>
          <h3 className="text-4xl sm:text-6xl font-serif font-light text-silk-50 tracking-tight leading-[1.05]">
            The Alchemical Menu
          </h3>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 p-1.5 rounded-full border border-onyx-800 bg-onyx-900/80 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              activeTab === "all"
                ? "bg-champagne-500 text-onyx-950 font-medium shadow-md"
                : "text-silk-400 hover:text-silk-200"
            }`}
          >
            All Movements
          </button>
          <button
            onClick={() => setActiveTab("cafe")}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              activeTab === "cafe"
                ? "bg-champagne-500 text-onyx-950 font-medium shadow-md"
                : "text-silk-400 hover:text-silk-200"
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            L&apos;Aurore Café
          </button>
          <button
            onClick={() => setActiveTab("dining")}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              activeTab === "dining"
                ? "bg-champagne-500 text-onyx-950 font-medium shadow-md"
                : "text-silk-400 hover:text-silk-200"
            }`}
          >
            <Wine className="w-3.5 h-3.5" />
            Le Soir Dining
          </button>
        </div>
      </div>

      {/* Menu Rows */}
      <div className="max-w-7xl mx-auto flex flex-col divide-y divide-onyx-800/80 border-y border-onyx-800/80">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => setSelectedItem(item)}
            data-cursor="view"
            className="group relative py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-onyx-900/40 px-4 transition-colors duration-300"
          >
            {/* Left: Number & Titles */}
            <div className="flex items-baseline gap-6 sm:gap-10">
              <span className="text-sm font-mono text-champagne-400/60 group-hover:text-champagne-400 transition-colors">
                [{item.id}]
              </span>
              <div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-silk-100 group-hover:text-champagne-300 transition-all duration-300 group-hover:translate-x-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-silk-400 font-light mt-1 tracking-wide">
                  {item.subtitle} • {item.origin}
                </p>
              </div>
            </div>

            {/* Right: Notes, Price, Arrow */}
            <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10">
              <div className="hidden lg:flex items-center gap-2">
                {item.notes.slice(0, 2).map((note) => (
                  <span
                    key={note}
                    className="text-[10px] uppercase font-sans tracking-wider px-2.5 py-1 rounded-sm border border-onyx-800 bg-onyx-900 text-silk-400"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <span className="text-xl sm:text-2xl font-serif font-light text-champagne-300 font-mono">
                {item.price}
              </span>

              <div className="w-9 h-9 rounded-full border border-onyx-700 flex items-center justify-center text-silk-400 group-hover:text-onyx-950 group-hover:bg-champagne-400 group-hover:border-champagne-400 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cursor-Following Image Preview Card (Awwwards Signature Feature) */}
      {hoveredItem && (
        <motion.div
          style={{
            x: previewX,
            y: previewY,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed top-0 left-0 z-[9990] hidden md:block w-72 h-44 rounded-sm overflow-hidden gold-border shadow-[0_15px_35px_rgba(0,0,0,0.8)] bg-onyx-900"
        >
          <div className="relative w-full h-full">
            <Image
              src={hoveredItem.image}
              alt={hoveredItem.title}
              fill
              sizes="300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-[10px] font-sans text-silk-200">
              <span className="uppercase tracking-widest text-champagne-400">
                {hoveredItem.title}
              </span>
              <span className="font-mono text-silk-300">{hoveredItem.price}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Detailed Course Modal / Tasting Notes Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-onyx-950/85 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-onyx-900 rounded-sm border border-champagne-500/30 p-8 sm:p-10 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-8">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-silk-400 hover:text-champagne-300 transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Image */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] rounded-sm overflow-hidden gold-border">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-champagne-400">
                {selectedItem.origin}
              </span>
            </div>

            {/* Right Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne-400 font-sans">
                  COURSE [{selectedItem.id}] • {selectedItem.category === "cafe" ? "ATELIER ROASTERY" : "HAUTE GASTRONOMIE"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-silk-50 mt-1">
                  {selectedItem.title}
                </h3>
                <span className="text-xl font-mono text-champagne-300 font-light mt-2 block">
                  {selectedItem.price}
                </span>
                <p className="text-xs sm:text-sm font-sans text-silk-300 font-light leading-relaxed mt-4">
                  {selectedItem.description}
                </p>
              </div>

              {/* Pairing and Notes */}
              <div className="border-t border-onyx-800 pt-4 flex flex-col gap-2 text-xs font-sans">
                <div className="text-silk-400">
                  <span className="text-champagne-400 uppercase tracking-widest text-[10px] block">
                    Sommelier Pairing
                  </span>
                  <span className="text-silk-200">{selectedItem.pairing}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedItem.notes.map((n) => (
                    <span
                      key={n}
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-onyx-800 text-champagne-300"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
