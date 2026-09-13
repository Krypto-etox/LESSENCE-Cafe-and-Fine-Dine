"use client";

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { MagneticButton } from "@/components/common/MagneticButton";
import { ArrowRight, Check, Clock, Sparkles, User, X } from "lucide-react";

export const ReservationFooter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string>("nocturne");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedTime, setSelectedTime] = useState<string>("20:00");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // Background Ambient Canvas: Fluid Golden Embers Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle system
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      hue: number;
    }[] = [];

    const count = 55;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
        hue: 42 + Math.random() * 8, // warm champagne gold
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial dark vignette
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.1,
        width / 2,
        height / 2,
        width * 0.7
      );
      grad.addColorStop(0, "rgba(20, 16, 12, 0.4)");
      grad.addColorStop(1, "rgba(12, 12, 14, 0.95)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render & update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#D4AF37";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#F5F5F0", "#E5C365", "#A38023"],
    });

    setTimeout(() => {
      setIsConfirmed(false);
      setIsModalOpen(false);
    }, 2400);
  };

  return (
    <footer className="relative min-h-screen w-full bg-onyx-950 flex flex-col justify-between px-6 sm:px-12 md:px-20 lg:px-28 py-16 overflow-hidden z-20 select-none">
      {/* Background Ambient Canvas Fluid Simulation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Top Header of Footer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center border-b border-onyx-800 pb-8">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-champagne-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest-luxury text-silk-300 font-sans">
            L’ÉSSENCE • TABLE &amp; ATELIER SANCTUARY
          </span>
        </div>

        <span className="text-xs font-sans uppercase tracking-ultra-wide text-champagne-400">
          BOOKING CYCLE : 2026
        </span>
      </div>

      {/* Center Cinematic Reservation Hook */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto py-20 flex flex-col items-center text-center">
        <p className="text-xs sm:text-sm uppercase tracking-ultra-wide text-champagne-400 font-sans mb-8">
          An Immersion Like No Other
        </p>

        <h2 className="text-6xl sm:text-8xl md:text-9xl font-serif font-light text-silk-50 tracking-tight leading-[0.9] mb-12 gold-gradient-text">
          Reserve a Table
        </h2>

        <p className="text-silk-300 font-sans text-sm sm:text-base font-light tracking-wide max-w-lg leading-relaxed mb-12">
          Only sixteen covers each evening. We invite you to experience the confluence of dawn roasted alchemy and dusk culinary theater.
        </p>

        {/* The Magnetic Button */}
        <MagneticButton
          onClick={() => setIsModalOpen(true)}
          strength={0.4}
          dataCursor="reserve"
          className="group px-10 sm:px-14 py-5 rounded-full border border-champagne-400/80 bg-onyx-900/80 backdrop-blur-xl text-silk-100 hover:text-onyx-950 hover:bg-champagne-400 hover:border-champagne-400 shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-500 cursor-pointer"
        >
          <div className="flex items-center gap-4 text-xs sm:text-sm uppercase tracking-ultra-wide font-sans font-medium">
            <span>Initiate Reservation</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </MagneticButton>
      </div>

      {/* Bottom Legal & Colophon Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-onyx-800/80 pt-8 text-xs font-sans text-silk-400">
        <div className="md:col-span-4 flex flex-col gap-2">
          <span className="text-silk-200 font-medium tracking-wider uppercase">L’ÉSSENCE ATELIER</span>
          <p className="text-[11px] text-silk-400 leading-relaxed font-light">
            18 Place de la Concorde, 75008 Paris, France.<br />
            Service de Conciergerie : +33 (0)1 42 68 00 00
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col gap-2">
          <span className="text-silk-200 font-medium tracking-wider uppercase">HEURES D’OUVERTURE</span>
          <p className="text-[11px] text-silk-400 leading-relaxed font-light">
            Atelier Café : Mardi — Dimanche | 08:00 — 16:00<br />
            Haute Gastronomie : Mardi — Dimanche | 19:00 — Minuit
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col md:items-end justify-between gap-4">
          <div className="flex items-center gap-6 text-[11px] tracking-widest text-champagne-400 uppercase">
            <span className="hover:text-champagne-200 cursor-pointer">Instagram</span>
            <span className="hover:text-champagne-200 cursor-pointer">Guide Michelin</span>
            <span className="hover:text-champagne-200 cursor-pointer">Press</span>
          </div>
          <div className="text-[10px] text-silk-400">
            © MMXXIV L’ÉSSENCE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* Luxury Slide-Over Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-onyx-950/85 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300">
          <div className="relative w-full max-w-xl bg-onyx-900 rounded-sm border border-champagne-500/30 p-8 sm:p-10 shadow-2xl overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-silk-400 hover:text-champagne-300 transition-colors cursor-pointer"
              aria-label="Close Reservation"
            >
              <X className="w-6 h-6" />
            </button>

            {isConfirmed ? (
              <div className="py-16 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-champagne-500/20 border border-champagne-400 flex items-center justify-center text-champagne-400">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif font-light text-silk-50">
                  Votre Table est Réservée
                </h3>
                <p className="text-sm font-sans text-silk-300 max-w-sm">
                  Our Maitre d’ will confirm your personalized culinary itinerary via confidential concierge email within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest-luxury text-champagne-400 font-sans">
                    Table Concierge
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-silk-50 mt-1">
                    Select Your Culinary Immersion
                  </h3>
                </div>

                {/* Experience Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedExperience("nocturne")}
                    className={`p-4 text-left rounded-sm border transition-all cursor-pointer ${
                      selectedExperience === "nocturne"
                        ? "border-champagne-400 bg-champagne-500/10 text-silk-50"
                        : "border-onyx-700 bg-onyx-850/60 text-silk-400 hover:border-onyx-600"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-serif font-light">
                      <span>Le Nocturne</span>
                      <span className="font-mono text-champagne-400">€295</span>
                    </div>
                    <p className="text-[10px] font-sans text-silk-400 mt-1">
                      12-Course Haute Cuisine Tasting Menu
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedExperience("dawn")}
                    className={`p-4 text-left rounded-sm border transition-all cursor-pointer ${
                      selectedExperience === "dawn"
                        ? "border-champagne-400 bg-champagne-500/10 text-silk-50"
                        : "border-onyx-700 bg-onyx-850/60 text-silk-400 hover:border-onyx-600"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-serif font-light">
                      <span>L&apos;Aurore Alchemy</span>
                      <span className="font-mono text-champagne-400">€95</span>
                    </div>
                    <p className="text-[10px] font-sans text-silk-400 mt-1">
                      Rare Siphon Coffee &amp; Patisserie Flight
                    </p>
                  </button>
                </div>

                {/* Party Size & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-silk-400 font-sans block mb-2">
                      <User className="inline w-3 h-3 mr-1 text-champagne-400" />
                      Couvers (Guests)
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-onyx-800 border border-onyx-700 text-silk-100 text-xs rounded-sm focus:border-champagne-400 focus:outline-none cursor-pointer"
                    >
                      <option value={1}>1 Guest (Chef&apos;s Counter)</option>
                      <option value={2}>2 Guests (Intimate Table)</option>
                      <option value={4}>4 Guests (Salon Table)</option>
                      <option value={6}>6 Guests (The Vault)</option>
                      <option value={8}>8 Guests (Private Sanctuary)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-silk-400 font-sans block mb-2">
                      <Clock className="inline w-3 h-3 mr-1 text-champagne-400" />
                      Preferred Seating
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-onyx-800 border border-onyx-700 text-silk-100 text-xs rounded-sm focus:border-champagne-400 focus:outline-none cursor-pointer"
                    >
                      <option value="19:00">19:00 (First Seating)</option>
                      <option value="20:00">20:00 (Prime Nocturne)</option>
                      <option value="21:15">21:15 (Late Atelier)</option>
                    </select>
                  </div>
                </div>

                {/* Contact Input */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-silk-400 font-sans block mb-2">
                    Concierge Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@luxury-residence.com"
                    className="w-full px-4 py-3 bg-onyx-800 border border-onyx-700 text-silk-100 text-xs rounded-sm focus:border-champagne-400 focus:outline-none tracking-wider"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 mt-2 bg-champagne-500 hover:bg-champagne-400 text-onyx-950 text-xs uppercase tracking-ultra-wide font-sans font-semibold rounded-sm transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  Confirm Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
