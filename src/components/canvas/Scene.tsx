"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import CameraChoreography from "./Camera";
import Experience from "./Experience";
import Atmosphere from "./Atmosphere";

export default function Scene() {
  return (
    <div id="webgl-canvas-container">
      <Canvas
        gl={{
          antialias: false, // Turn off native antialiasing, handled by SMAA/postprocessing if needed
          powerPreference: "high-performance",
          alpha: false, // Keep canvas opaque for faster blending
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]} // Restrict device pixel ratio to max 2 for performance
      >
        <color attach="background" args={["#050505"]} />
        
        {/* Dynamic Light and Fog Controller */}
        <Atmosphere />
        
        {/* Self-hosted studio lighting — no runtime CDN dependency (Environment preset
            fetched an HDR from raw.githubusercontent.com; a CDN outage meant a black canvas). */}
        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={1.2} position={[0, 6, 8]} scale={[12, 6, 1]} color="#f5f4f0" />
            <Lightformer intensity={0.55} position={[-8, 2, -4]} scale={[6, 8, 1]} color="#8fd8e8" />
            <Lightformer intensity={0.35} position={[8, 2, -4]} scale={[6, 8, 1]} color="#ffd9c4" />
            <Lightformer intensity={0.4} form="ring" position={[0, 10, 0]} scale={10} color="#ffffff" />
          </Environment>
        </Suspense>

        {/* Dynamic Scene Content */}
        <Suspense fallback={null}>
          <CameraChoreography />
          <Experience />
        </Suspense>

        {/* Cinematic Post-Processing Composer */}
        <Suspense fallback={null}>
          <EffectComposer enableNormalPass={false}>
            <Bloom 
              intensity={0.4} 
              luminanceThreshold={0.8} 
              luminanceSmoothing={0.3} 
            />
            <Noise 
              opacity={0.015} 
              blendFunction={BlendFunction.OVERLAY} // Subtle analog film grain
            />
            <Vignette 
              eskil={false} 
              offset={0.4} 
              darkness={0.7} 
            />
          </EffectComposer>
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}
