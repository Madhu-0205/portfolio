"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { BasaltProps, TitaniumProps } from "../materials";
import RepositorySatellite from "./RepositorySatellite";

// Hover-interactive 3D Text Card component
function HolographicText({ 
  position, 
  title, 
  body, 
  link,
  color = "#86868b" 
}: { 
  position: [number, number, number]; 
  title: string; 
  body?: string; 
  link?: string;
  color?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const setCaseStudyOpen = usePortfolioStore((state) => state.setCaseStudyOpen);
  const setActiveCaseStudyId = usePortfolioStore((state) => state.setActiveCaseStudyId);
  const textRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const targetScale = hovered ? 1.08 : 1.0;
    if (textRef.current) {
      textRef.current.scale.setScalar(
        THREE.MathUtils.lerp(textRef.current.scale.x, targetScale, delta * 6)
      );
    }
  });

  const handleClick = (e: import("@react-three/fiber").ThreeEvent<MouseEvent>) => {
    if (link) {
      e.stopPropagation();
      if (link.startsWith("case-study:")) {
        const id = link.split(":")[1];
        setActiveCaseStudyId(id);
        setCaseStudyOpen(true);
      } else {
        window.open(link, "_blank");
      }
    }
  };

  return (
    <group 
      ref={textRef} 
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setCursorState(link ? "drag" : "hover");
      }}
      onPointerOut={() => {
        setHovered(false);
        setCursorState("default");
      }}
      onClick={handleClick}
    >
      <Text
        fontSize={0.09}
        color={hovered ? "#00ffff" : "#ffffff"}
        anchorX="left"
        anchorY="top"
      >
        {title}
      </Text>

      {body && (
        <Text
          position={[0, -0.13, 0]}
          fontSize={0.065}
          color={color}
          maxWidth={1.8}
          lineHeight={1.3}
          anchorX="left"
          anchorY="top"
        >
          {body}
        </Text>
      )}
    </group>
  );
}

export default function Contact3D() {
  const orbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const orbMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // 1. Orb floating drift
    if (orbRef.current) {
      const pulse = 1.0 + Math.sin(time * 1.5) * 0.035;
      orbRef.current.scale.setScalar(pulse);

      orbRef.current.rotation.y += delta * 0.15;
      orbRef.current.rotation.x += delta * 0.1;

      orbRef.current.position.x = THREE.MathUtils.lerp(orbRef.current.position.x, pointer.x * 0.4, delta * 3);
      orbRef.current.position.y = THREE.MathUtils.lerp(orbRef.current.position.y, 0.6 + pointer.y * 0.4, delta * 3);
    }

    // 2. Gyro ring around the titanium core
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.35;
      ringRef.current.rotation.y = time * 0.18;
      
      if (orbRef.current) {
        ringRef.current.position.copy(orbRef.current.position);
      }
    }

    // 3. Proximity-based orb polish (centered around scroll progress 0.80)
    const proximity = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.80) * 5.0);

    // Modulate physical properties of the orb to become mirror-like on arrival
    if (orbMaterialRef.current) {
      orbMaterialRef.current.roughness = THREE.MathUtils.lerp(0.24, 0.02, proximity);
      orbMaterialRef.current.metalness = THREE.MathUtils.lerp(0.80, 0.98, proximity);
      orbMaterialRef.current.clearcoat = THREE.MathUtils.lerp(0.0, 1.0, proximity);
      orbMaterialRef.current.clearcoatRoughness = THREE.MathUtils.lerp(0.18, 0.01, proximity);
      orbMaterialRef.current.envMapIntensity = THREE.MathUtils.lerp(1.0, 3.2, proximity);
    }
  });

  // Reveal texts only inside settled final scroll window (0.77 to 0.83)
  const showText = scrollProgress >= 0.77 && scrollProgress <= 0.83;

  return (
    <group>
      {/* Dynamic spot light casting shadow columns */}
      <spotLight
        position={[2, 6, 2]}
        angle={0.35}
        penumbra={0.8}
        intensity={2.8}
        color="#ffffff"
        castShadow
      />

      {/* Altar base made of matte basalt */}
      <mesh position={[0, -0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.15, 3.2]} />
        <meshPhysicalMaterial {...BasaltProps} />
      </mesh>

      {/* ────────────────── MONOLITH SHRINE CORE ────────────────── */}
      {/* Corners (basalt columns) */}
      <mesh position={[-1.4, 0.7, -1.4]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshPhysicalMaterial {...BasaltProps} />
      </mesh>
      <mesh position={[1.4, 0.7, -1.4]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshPhysicalMaterial {...BasaltProps} />
      </mesh>
      <mesh position={[-1.4, 0.7, 1.4]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshPhysicalMaterial {...BasaltProps} />
      </mesh>
      <mesh position={[1.4, 0.7, 1.4]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshPhysicalMaterial {...BasaltProps} />
      </mesh>

      {/* Capital lintel cap */}
      <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.15, 3.2]} />
        <meshPhysicalMaterial {...BasaltProps} />
      </mesh>

      {/* ────────────────── SCHEMATICS: CYAN GLOW OVERLAYS ────────────────── */}
      <mesh position={[-1.4, 0.7, -1.4]} scale={[1.02, 1.01, 1.02]}>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh position={[1.4, 0.7, -1.4]} scale={[1.02, 1.01, 1.02]}>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh position={[-1.4, 0.7, 1.4]} scale={[1.02, 1.01, 1.02]}>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh position={[1.4, 0.7, 1.4]} scale={[1.02, 1.01, 1.02]}>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.12} />
      </mesh>
      
      <mesh position={[0, 2.1, 0]} scale={[1.01, 1.04, 1.01]}>
        <boxGeometry args={[3.2, 0.15, 3.2]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.1} />
      </mesh>

      {/* ────────────────── GROWTH: VOLUMETRIC LIGHT PILLAR ────────────────── */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 2.7, 32, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbit Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.3, 0.012, 16, 100]} />
        <meshPhysicalMaterial {...TitaniumProps} roughness={0.05} />
      </mesh>

      {/* ────────────────── IMPACT: FLOATING CORE ORB ────────────────── */}
      <mesh ref={orbRef} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial ref={orbMaterialRef} {...TitaniumProps} />
      </mesh>

      {/* ────────────────── HOLOGRAPHIC NARRATIVE TEXT ────────────────── */}
      {showText && (
        <group>
          <HolographicText 
            position={[-2.5, 0.3, 0.6]} 
            title="CHAPTER 6" 
            body="HOW I BUILD // I design scalable full-stack systems from the user's perspective, using data to make key decisions." 
          />

          <HolographicText 
            position={[1.2, 0.1, -0.5]} 
            title="MADHU//OS" 
            body="THE CRAFT // Beautiful, clean code is not a vanity metric. It forms a direct, functional connection with the user." 
          />

          <HolographicText 
            position={[-0.6, -1.0, 0.0]} 
            title="[ CASE_STUDY ]" 
            link="case-study:madhu-os"
          />
        </group>
      )}

      {/* MADHU//OS Repository satellite system */}
      <RepositorySatellite
        repoName="madhu-os"
        defaultStats={{
          stars: 256,
          forks: 32,
          size: 11800,
          language: "TypeScript",
          commits: 165,
          description: "PROBLEM SOLVED: Generic portfolios failing to convey engineering depth and visual craft. | STATUS: Deployed production. | TECH: Next.js, React Three Fiber, Three.js, GSAP, Zustand.",
          topics: ["threejs", "react-three-fiber", "gsap", "webgl"],
          url: "https://github.com/Madhu-0205/portfolio",
          homepageUrl: "https://github.com/Madhu-0205/portfolio"
        }}
        position={[-1.6, 0.8, -1.0]}
        targetCenter={[0, 0.6, 0]}
        targetScroll={0.80}
      />
    </group>
  );
}
