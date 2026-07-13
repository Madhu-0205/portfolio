"use client";

/* eslint-disable react-hooks/refs */

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";

interface FragmentProps {
  label: string;
  description: string;
  angle: number;
  color: string;
  scrollProgress: number;
}

interface TextMesh extends THREE.Mesh {
  isText?: boolean;
  fillOpacity?: number;
}

function ArchiveFragment({ label, description, angle, color, scrollProgress }: FragmentProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const textOpacityRef = useRef(0);

  // Transition scroll trigger: unfolds between 0.82 and 0.95
  const unfoldFactor = useMemo(() => {
    if (scrollProgress < 0.82) return 0;
    if (scrollProgress > 0.95) return 1;
    return (scrollProgress - 0.82) / 0.13;
  }, [scrollProgress]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animDelta = prefersReducedMotion ? delta * 0.05 : delta;
    const animTime = prefersReducedMotion ? time * 0.05 : time;

    // Position fragment on an expanding orbit based on scroll unfold
    const baseRadius = 0.5;
    const targetRadius = baseRadius + unfoldFactor * 2.5;
    
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle) * targetRadius;
      meshRef.current.position.z = Math.sin(angle) * targetRadius;
      meshRef.current.position.y = Math.sin(animTime * 0.8 + angle) * 0.2;
      
      // Detached rotation
      meshRef.current.rotation.y += animDelta * (hovered ? 1.6 : 0.4);
      meshRef.current.rotation.x += animDelta * 0.2;
      
      // Pulse scale on hover
      const targetScale = hovered ? 1.25 : 1.0;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 6)
      );
    }

    // Fade text in when approached or hovered
    const targetOpacity = hovered || (unfoldFactor > 0.6 && scrollProgress > 0.90) ? 1.0 : 0.0;
    textOpacityRef.current = THREE.MathUtils.lerp(textOpacityRef.current, targetOpacity, delta * (prefersReducedMotion ? 10 : 4));
    
    // Modulate text children opacities
    if (meshRef.current) {
      const textGroup = meshRef.current.parent?.getObjectByName(`${label}-text`);
      if (textGroup) {
        textGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const textMesh = child as TextMesh;
            if (textMesh.isText) {
              textMesh.fillOpacity = textOpacityRef.current;
            }
          }
        });
      }
    }
  });

  return (
    <group>
      {/* 3D Fragment Body */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setCursorState("hover");
        }}
        onPointerOut={() => {
          setHovered(false);
          setCursorState("default");
        }}
      >
        <coneGeometry args={[0.16, 0.42, 4]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.06}
          metalness={0.92}
          transmission={0.85}
          thickness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 2.0 : 0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Dynamic line linking back to core */}
      <Line
        points={[new THREE.Vector3(0, 0, 0), meshRef.current ? meshRef.current.position : new THREE.Vector3(0, 0, 0)]}
        color={color}
        lineWidth={0.5}
        transparent
        opacity={unfoldFactor * 0.12}
      />

      {/* Floating text labels facing camera */}
      <Billboard
        name={`${label}-text`}
        follow={true}
        ref={(el: THREE.Group | null) => {
          if (el && meshRef.current) {
            el.position.copy(meshRef.current.position).add(new THREE.Vector3(0, 0.45, 0));
          }
        }}
      >
        <Text
          fontSize={0.075}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
        >
          {label.toUpperCase()}
        </Text>
        <Text
          position={[0, -0.07, 0]}
          fontSize={0.045}
          color="#86868b"
          maxWidth={1.4}
          textAlign="center"
          lineHeight={1.3}
          anchorX="center"
          anchorY="top"
        >
          {description}
        </Text>
      </Billboard>
    </group>
  );
}

export default function CrystallineArchive() {
  const crystalRef = useRef<THREE.Mesh>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  const fragments = useMemo(() => [
    {
      label: "Journey",
      description: "Undergraduate Builder // CSE & Data Science Student // Founder of CampusConnect & JobNest",
      angle: (0 / 6) * Math.PI * 2,
      color: "#34c759"
    },
    {
      label: "Education",
      description: "B.Tech in Computer Science & Engineering (Data Science) // Pragati Engineering College // Class of 2027",
      angle: (1 / 6) * Math.PI * 2,
      color: "#00ffff"
    },
    {
      label: "Achievements",
      description: "Runner-Up: Smart India Hackathon 2025 Grand Finale // Spatial routing engine deployed to 20 peers",
      angle: (2 / 6) * Math.PI * 2,
      color: "#ff3b30"
    },
    {
      label: "Leadership",
      description: "SIH 2025 Team Lead & Algorithm Architect // Solo Founder of JobNest & CampusConnect opportunity graphs",
      angle: (3 / 6) * Math.PI * 2,
      color: "#ffcc00"
    },
    {
      label: "Featured Projects",
      description: "CampusConnect (Live opportunity graph) // Railway AI Optimizer (SIH runner-up) // JobNest (Proximity matching)",
      angle: (4 / 6) * Math.PI * 2,
      color: "#af52de"
    },
    {
      label: "Engineering Philosophy",
      description: "Relational database constraints over bloated stores // Solve local problems first // Math-proven collision safety",
      angle: (5 / 6) * Math.PI * 2,
      color: "#ffffff"
    }
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animTime = prefersReducedMotion ? time * 0.05 : time;

    const motionScale = scrollProgress >= 0.95 ? Math.max(0, 1.0 - (scrollProgress - 0.95) / 0.05) : 1.0;

    if (crystalRef.current) {
      crystalRef.current.rotation.y = animTime * 0.22 * motionScale;
      crystalRef.current.rotation.z = Math.sin(animTime * 0.4) * 0.1 * motionScale;
      
      const mat = crystalRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.emissiveIntensity = (0.5 + Math.sin(animTime * 1.5) * 0.18) * motionScale;
      }
    }
  });

  // Reveal crystal archive when scroll is above 0.78
  if (scrollProgress < 0.78) return null;

  return (
    <group position={[12, 6.2, 8.0]}>
      {/* Central crystal core */}
      <mesh ref={crystalRef} castShadow>
        <octahedronGeometry args={[0.3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.03}
          metalness={0.96}
          transmission={0.95}
          thickness={1.5}
          emissive="#ffffff"
          emissiveIntensity={0.5}
          toneMapped={false}
          clearcoat={1.0}
        />
      </mesh>

      {/* Orbiting fragments */}
      {fragments.map((frag) => (
        <ArchiveFragment
          key={frag.label}
          label={frag.label}
          description={frag.description}
          angle={frag.angle}
          color={frag.color}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
}
