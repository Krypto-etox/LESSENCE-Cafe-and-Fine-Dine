"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";

export const Centerpiece: React.FC = () => {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const coreGemRef = useRef<THREE.Mesh>(null);
  const primaryRingRef = useRef<THREE.Mesh>(null);
  const secondaryRingRef = useRef<THREE.Mesh>(null);
  const dishRef = useRef<THREE.Mesh>(null);

  // Smooth vectors for 60fps interpolation
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetScale = useRef(1);

  const isMobile = viewport.width < 6;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const progress = scrollState.culinaryProgress; // 0 (hero) -> 1 (end of culinary journey)
    const { x: mouseX, y: mouseY } = state.pointer;

    // Responsive position calculation based on viewport width
    const lateralShift = isMobile ? 0 : viewport.width * 0.24;
    const baseScale = isMobile ? Math.min(0.72, viewport.width * 0.14) : 1.05;

    // Organic rotations
    if (crystalRef.current) {
      crystalRef.current.rotation.x = time * 0.18 + progress * Math.PI * 1.2;
      crystalRef.current.rotation.y = time * 0.25 + progress * Math.PI * 1.8;
    }

    if (coreGemRef.current) {
      coreGemRef.current.rotation.y = -time * 0.35;
      coreGemRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
    }

    if (primaryRingRef.current) {
      primaryRingRef.current.rotation.z = time * 0.1 + progress * Math.PI * 0.8;
      primaryRingRef.current.rotation.x = Math.sin(time * 0.3) * 0.25 + mouseY * 0.2;
      primaryRingRef.current.rotation.y = mouseX * 0.2;
    }

    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.y = -time * 0.15 - progress * Math.PI;
      secondaryRingRef.current.rotation.z = Math.cos(time * 0.35) * 0.3;
    }

    if (dishRef.current) {
      dishRef.current.rotation.y = time * 0.08 + progress * 0.5;
    }

    // Scroll States Orchestration:
    // Phase 0 (0.0 to 0.25): Hero - Majestic Center
    // Phase 1 (0.25 to 0.65): Café Atelier - Glides to Right, tilts to catch light
    // Phase 2 (0.65 to 1.0): Haute Cuisine - Glides to Left, elevates, reveals golden profile
    // Phase 3 (> 1.0): Recedes deep into dark background bokeh for Gallery & Menu

    if (progress <= 0.2) {
      // Hero: centered, majestic
      const p = progress / 0.2;
      targetPos.current.set(0, isMobile ? 0.3 : 0, 0);
      targetScale.current = baseScale * (1.0 - p * 0.08);
    } else if (progress <= 0.6) {
      // Cafe Atelier: glide to right (or slightly elevated on mobile)
      const p = (progress - 0.2) / 0.4;
      targetPos.current.set(
        isMobile ? 0 : THREE.MathUtils.lerp(0, lateralShift, p),
        isMobile ? THREE.MathUtils.lerp(0.3, 1.2, p) : THREE.MathUtils.lerp(0, -0.15, p),
        THREE.MathUtils.lerp(0, -0.3, p)
      );
      targetScale.current = baseScale * THREE.MathUtils.lerp(0.92, 0.84, p);
    } else if (progress <= 1.0) {
      // Haute Cuisine: glide to left (or slightly lowered on mobile)
      const p = (progress - 0.6) / 0.4;
      targetPos.current.set(
        isMobile ? 0 : THREE.MathUtils.lerp(lateralShift, -lateralShift, p),
        isMobile ? THREE.MathUtils.lerp(1.2, -1.0, p) : THREE.MathUtils.lerp(-0.15, 0.2, p),
        THREE.MathUtils.lerp(-0.3, -0.1, p)
      );
      targetScale.current = baseScale * THREE.MathUtils.lerp(0.84, 0.9, p);
    } else {
      // Deep fade-out for subsequent sections
      const p = Math.min(1, (progress - 1.0) / 0.4);
      targetPos.current.set(
        isMobile ? 0 : THREE.MathUtils.lerp(-lateralShift, 0, p),
        THREE.MathUtils.lerp(0.2, 0, p),
        THREE.MathUtils.lerp(-0.1, -9.0, p)
      );
      targetScale.current = baseScale * THREE.MathUtils.lerp(0.9, 0.15, p);
    }

    // High performance smooth lerp dampening
    const dampSpeed = Math.min(1, 5 * delta);
    groupRef.current.position.lerp(targetPos.current, dampSpeed);
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale.current, dampSpeed);
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
        {/* Sculpted Obsidian Dish Base */}
        <mesh ref={dishRef} position={[0, -1.1, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.35, 0.9, 0.14, 64]} />
          <meshPhysicalMaterial
            color="#141210"
            emissive="#080605"
            roughness={0.1}
            metalness={0.85}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Central Refractive Amber/Smoked Crystal Gastronomy Monolith */}
        <mesh ref={crystalRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.05, 0.32, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#FFF4DE"
            emissive="#1E170A"
            roughness={0.08}
            metalness={0.12}
            transmission={0.92}
            thickness={1.8}
            ior={1.54}
            reflectivity={0.95}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
          />
        </mesh>

        {/* Inner Luminous Champagne Gem Core */}
        <mesh ref={coreGemRef}>
          <dodecahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial
            color="#E8C76D"
            emissive="#73520E"
            emissiveIntensity={1.4}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        {/* Primary Polished Champagne Gold Orbital Ring */}
        <mesh ref={primaryRingRef}>
          <torusGeometry args={[2.08, 0.024, 32, 128]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#3E2C06"
            metalness={0.98}
            roughness={0.12}
          />
        </mesh>

        {/* Secondary Delicate Gold Filigree Ring */}
        <mesh ref={secondaryRingRef}>
          <torusGeometry args={[2.35, 0.014, 24, 128]} />
          <meshStandardMaterial
            color="#F3DC8F"
            emissive="#352405"
            metalness={0.94}
            roughness={0.18}
          />
        </mesh>

        {/* Ambient Golden Embers */}
        <Sparkles
          count={65}
          scale={7}
          size={2.4}
          speed={0.45}
          color="#E8C872"
          opacity={0.7}
        />
      </Float>
    </group>
  );
};
