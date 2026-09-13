"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springX = useSpring(mouseX, { stiffness: 320, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 320, damping: 28 });

  // Instant dot
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, [data-cursor], input, select, textarea");
      if (interactive) {
        const customType = interactive.getAttribute("data-cursor");
        if (customType === "view") {
          setCursorVariant("view");
          setCursorText("EXPLORE");
        } else if (customType === "reserve") {
          setCursorVariant("hover");
          setCursorText("RESERVE");
        } else if (customType === "drag") {
          setCursorVariant("drag");
          setCursorText("DRAG");
        } else {
          setCursorVariant("hover");
          setCursorText("");
        }
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center border border-champagne-400/80 backdrop-blur-[2px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "default" ? 36 : cursorVariant === "hover" ? 64 : 88,
          height: cursorVariant === "default" ? 36 : cursorVariant === "hover" ? 64 : 88,
          backgroundColor:
            cursorVariant === "default"
              ? "rgba(212, 175, 55, 0.04)"
              : "rgba(212, 175, 55, 0.16)",
          boxShadow:
            cursorVariant === "default"
              ? "0 0 15px rgba(212, 175, 55, 0.15)"
              : "0 0 30px rgba(212, 175, 55, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorText && (
          <span className="text-[9px] font-sans tracking-widest text-champagne-200 uppercase font-medium select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Instant Focal Gold Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-champagne-400 shadow-[0_0_8px_#D4AF37]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorVariant === "default" ? 1 : 0,
          opacity: cursorVariant === "default" ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
