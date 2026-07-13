"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";

export default function Atmosphere() {
  const { scene } = useThree();
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#050505", 0.8);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  useFrame((state, delta) => {
    // 1. Calculate proximity to the nearest stage milestone (6 keyframes: 0.0, 0.20, 0.40, 0.60, 0.80, 1.00)
    // Scale scroll progress to [0, 5] range
    const progress = scrollProgress * 5;
    const nearestStage = Math.round(progress);
    const distanceToStage = Math.abs(progress - nearestStage); // [0.0, 0.5]
    
    // Ramps to 1.0 when perfectly arrived, 0.0 when mid-transit
    const arrivalFactor = 1.0 - distanceToStage * 2.0;

    // 2. Base metrics determined by the narrative chapter scroll progress
    let targetAmbient = 0.25;
    let targetDir = 1.5;
    let targetFogDensity = 0.015;

    if (scrollProgress < 0.12) {
      // Chapter 1: Boot (Pitch black)
      const t = scrollProgress / 0.12;
      targetAmbient = 0.0;
      targetDir = 0.0;
      targetFogDensity = THREE.MathUtils.lerp(0.85, 0.45, t);
    } else if (scrollProgress < 0.30) {
      // Chapter 2: CampusConnect (Lights sweep up, fog clears)
      const t = (scrollProgress - 0.12) / 0.18;
      targetAmbient = THREE.MathUtils.lerp(0.0, 0.18, t);
      targetDir = THREE.MathUtils.lerp(0.0, 1.2, t);
      targetFogDensity = THREE.MathUtils.lerp(0.45, 0.02, t);
    } else if (scrollProgress < 0.50) {
      // Chapter 3: Railway AI (SIH)
      targetAmbient = 0.18;
      targetDir = 1.5;
      targetFogDensity = 0.015;
    } else if (scrollProgress < 0.70) {
      // Chapter 4: AI SaaS (High contrast shadows)
      targetAmbient = 0.08;
      targetDir = 2.0;
      targetFogDensity = 0.012;
    } else if (scrollProgress < 0.85) {
      // Chapter 5: MADHU//OS Shrine (Warm focus highlight)
      const t = (scrollProgress - 0.70) / 0.15;
      targetAmbient = THREE.MathUtils.lerp(0.08, 0.22, t);
      targetDir = THREE.MathUtils.lerp(2.0, 2.5, t);
      targetFogDensity = 0.015;
    } else {
      // Chapter 6: The Founder's Vision (Spacious sky, bright materials, thin fog for infinite horizon)
      const t = (scrollProgress - 0.85) / 0.15;
      targetAmbient = THREE.MathUtils.lerp(0.22, 0.42, t); // Brighten scene elements
      targetDir = THREE.MathUtils.lerp(2.5, 0.6, t); // Softer, less directional spotlight shadow density
      targetFogDensity = THREE.MathUtils.lerp(0.015, 0.006, t); // Thinner fog reveals open horizon
    }

    // 3. Modulate parameters using the arrival factor (Anticipation / Relief cycle)
    // In transition: darken direct lights and thicken fog
    if (scrollProgress >= 0.12) {
      targetDir *= THREE.MathUtils.lerp(0.5, 1.0, arrivalFactor);
      targetAmbient *= THREE.MathUtils.lerp(0.7, 1.0, arrivalFactor);
      
      // Make fog denser during camera transitions to hide boundaries
      // Except in the final stage where we want it to open up
      if (scrollProgress < 0.85) {
        targetFogDensity += (1.0 - arrivalFactor) * 0.022;
      }
    }

    // 4. Smooth updates
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        ambientLightRef.current.intensity,
        targetAmbient,
        delta * 2.0
      );
    }

    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.lerp(
        dirLightRef.current.intensity,
        targetDir,
        delta * 2.0
      );
    }

    if (scene.fog && scene.fog instanceof THREE.FogExp2) {
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, targetFogDensity, delta * 2.0);
    }
  });

  return (
    <group>
      <ambientLight ref={ambientLightRef} intensity={0} />
      <directionalLight
        ref={dirLightRef}
        position={[5, 10, 3]}
        intensity={0}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </group>
  );
}
