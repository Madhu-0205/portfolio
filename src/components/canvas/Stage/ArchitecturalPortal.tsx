"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";

interface InteractiveLinkProps {
  label: string;
  url: string;
  position: [number, number, number];
  opacity: number;
}

function InteractivePortalLink({ label, url, position, opacity }: InteractiveLinkProps) {
  const [hovered, setHovered] = useState(false);
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.08 : 1.0;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 6));
    }
  });

  const handleClick = (e: import("@react-three/fiber").ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setCursorState("drag");
      }}
      onPointerOut={() => {
        setHovered(false);
        setCursorState("default");
      }}
      onClick={handleClick}
    >
      {/* 3D Link Text */}
      <Text
        fontSize={0.12}
        color={hovered ? "#00ffff" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity}
      >
        {label}
      </Text>
      
      {/* Underlying glow border line */}
      <Line
        points={[new THREE.Vector3(-0.55, -0.09, 0), new THREE.Vector3(0.55, -0.09, 0)]}
        color={hovered ? "#00ffff" : "#2a2a2c"}
        lineWidth={1.2}
        transparent
        opacity={opacity * 0.8}
      />
    </group>
  );
}

export default function ArchitecturalPortal() {
  const portalRef = useRef<THREE.Group>(null);
  const lightFieldRef = useRef<THREE.Mesh>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  // Reveal portal details only at the climax of scroll (0.94 to 1.00)
  const portalOpacity = useMemo(() => {
    if (scrollProgress < 0.94) return 0;
    if (scrollProgress > 0.98) return 1;
    return (scrollProgress - 0.94) / 0.04;
  }, [scrollProgress]);

  // Reveal links only after the final overlay text is displayed (0.992 to 1.00)
  const linksOpacity = useMemo(() => {
    if (scrollProgress < 0.992) return 0;
    return (scrollProgress - 0.992) / 0.008;
  }, [scrollProgress]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animTime = prefersReducedMotion ? time * 0.05 : time;

    const motionScale = scrollProgress >= 0.95 ? Math.max(0, 1.0 - (scrollProgress - 0.95) / 0.05) : 1.0;

    if (lightFieldRef.current) {
      const mat = lightFieldRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.12 + Math.sin(animTime * 1.8 * motionScale) * 0.06 * motionScale;
      }
    }
  });

  if (scrollProgress < 0.90) return null;

  return (
    <group ref={portalRef} position={[12, 1.8, -12.0]}>
      {/* Left Pillar */}
      <mesh position={[-2.2, 2.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 4.0, 0.4]} />
        <meshPhysicalMaterial color="#0b0b0d" roughness={0.8} metalness={0.15} />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[2.2, 2.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 4.0, 0.4]} />
        <meshPhysicalMaterial color="#0b0b0d" roughness={0.8} metalness={0.15} />
      </mesh>
      {/* Arch Crossbar */}
      <mesh position={[0, 4.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.7, 0.3, 0.4]} />
        <meshPhysicalMaterial color="#0b0b0d" roughness={0.8} metalness={0.15} />
      </mesh>

      {/* Portal thin boundary wireframes */}
      <Line
        points={[
          new THREE.Vector3(-2.36, 0.0, 0.21),
          new THREE.Vector3(-2.36, 4.16, 0.21),
          new THREE.Vector3(2.36, 4.16, 0.21),
          new THREE.Vector3(2.36, 0.0, 0.21)
        ]}
        color="#00ffff"
        lineWidth={0.8}
        transparent
        opacity={portalOpacity * 0.2}
      />

      {/* Fluid gateway backing field */}
      <mesh ref={lightFieldRef} position={[0, 2.0, -0.05]}>
        <planeGeometry args={[4.1, 3.8]} />
        <meshPhysicalMaterial
          color="#000000"
          emissive="#004466"
          emissiveIntensity={0.15}
          transparent
          opacity={portalOpacity * 0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Telemetry invitation title */}
      <Billboard follow={true} position={[0, 2.3, 0.5]}>
        <Text
          fontSize={0.12}
          color="#ffffff"
          textAlign="center"
          maxWidth={3.8}
          fillOpacity={linksOpacity}
        >
          {"Let's build it together."}
        </Text>
      </Billboard>

      {/* Subtle interactive contact nodes */}
      <group position={[0, 0.9, 0.5]}>
        <InteractivePortalLink label="[ EMAIL ]" url="mailto:madhuvalurouthu@gmail.com" position={[-1.6, 0, 0]} opacity={linksOpacity} />
        <InteractivePortalLink label="[ GITHUB ]" url="https://github.com/Madhu-0205" position={[-0.5, 0, 0]} opacity={linksOpacity} />
        <InteractivePortalLink label="[ LINKEDIN ]" url="https://linkedin.com/in/madhu-valurouthu" position={[0.6, 0, 0]} opacity={linksOpacity} />
        <InteractivePortalLink label="[ RESUME ]" url="https://github.com/Madhu-0205/portfolio/raw/main/resume.pdf" position={[1.7, 0, 0]} opacity={linksOpacity} />
      </group>
    </group>
  );
}
