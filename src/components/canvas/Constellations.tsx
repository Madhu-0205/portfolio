"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";

interface ConstellationProps {
  centerX: number;
  centerY: number;
  centerZ: number;
  targetScroll: number;
  name: string;
  purpose: string;
  projects: string;
  pointsData: [number, number, number][];
  connections: [number, number][];
  color?: string;
}

function SingleConstellation({
  centerX,
  centerY,
  centerZ,
  targetScroll,
  name,
  purpose,
  projects,
  pointsData,
  connections,
  color = "#00ffff",
}: ConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lineMaterialsRef = useRef<THREE.LineBasicMaterial[]>([]);
  const textGroupRef = useRef<THREE.Group>(null);
  
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  // Convert points relative to center
  const stars = useMemo(() => {
    return pointsData.map((pt) => new THREE.Vector3(centerX + pt[0], centerY + pt[1], centerZ + pt[2]));
  }, [pointsData, centerX, centerY, centerZ]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Slow rotation float
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.08;
      groupRef.current.rotation.z = Math.cos(time * 0.1) * 0.05;
    }

    // 2. Proximity calculation (centered around targetScroll midpoint)
    // Ramps to 1.0 at targetScroll, fades to 0.0 when +/- 0.125 scroll progress away
    const proximity = Math.max(0, 1.0 - Math.abs(scrollProgress - targetScroll) * 8.0);

    // 3. Modulate connecting lines' opacity (Assemble Constellation!)
    lineMaterialsRef.current.forEach((mat) => {
      if (mat) {
        mat.opacity = THREE.MathUtils.lerp(0.0, 0.28, proximity);
      }
    });

    // 4. Modulate text container transparency and float drift
    if (textGroupRef.current) {
      // Fade in text
      textGroupRef.current.position.y = centerY - 0.75 + Math.sin(time * 0.8) * 0.03;
      
      // Update text opacities programmatically
      textGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && (child as any).isText) {
          const textMesh = child as any;
          textMesh.fillOpacity = THREE.MathUtils.lerp(0.0, 1.0, proximity);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Glowing constellation stars */}
      {stars.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.032, 8, 8]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ))}

      {/* 2. Assembling line segments */}
      {connections.map(([a, b], idx) => (
        <Line
          key={idx}
          points={[stars[a], stars[b]]}
          color={color}
          lineWidth={0.8}
          transparent
          opacity={0} // modulated inside useFrame ref loop
          ref={(el: any) => {
            if (el && el.material) {
              lineMaterialsRef.current[idx] = el.material;
            }
          }}
        />
      ))}

      {/* 3. Floating constellation explanation tags */}
      <group ref={textGroupRef} position={[centerX - 0.65, centerY - 0.75, centerZ + 0.5]}>
        <Text
          fontSize={0.08}
          color="#ffffff"
          anchorX="left"
          anchorY="top"
          fillOpacity={0}
        >
          {name}
        </Text>
        
        <Text
          position={[0, -0.11, 0]}
          fontSize={0.052}
          color="#86868b"
          maxWidth={1.6}
          lineHeight={1.3}
          anchorX="left"
          anchorY="top"
          fillOpacity={0}
        >
          {purpose}
        </Text>

        <Text
          position={[0, -0.25, 0]}
          fontSize={0.048}
          color={color}
          maxWidth={1.6}
          anchorX="left"
          anchorY="top"
          fillOpacity={0}
        >
          {projects}
        </Text>
      </group>
    </group>
  );
}

export default function Constellations() {
  // Constellation 1: JS/TS midpoint between Stage 0 (0.0) and Stage 1 (0.25) -> targetScroll = 0.125
  const jsPoints: [number, number, number][] = [
    [0.0, 0.6, 0.4],
    [-0.5, 0.1, -0.3],
    [0.6, -0.4, 0.2],
    [-0.4, -0.5, 0.5],
    [0.3, 0.2, -0.6],
    [0.0, -0.1, 0.0],
  ];
  const jsConnections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 5], [3, 5]
  ];

  // Constellation 2: Python midpoint between Stage 1 (0.25) and Stage 2 (0.50) -> targetScroll = 0.375
  const pyPoints: [number, number, number][] = [
    [-0.6, 0.5, 0.2],
    [0.5, 0.4, -0.4],
    [0.4, -0.3, 0.5],
    [-0.5, -0.4, -0.2],
    [0.0, 0.0, 0.0],
  ];
  const pyConnections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [2, 4]
  ];

  // Constellation 3: Go/Rust midpoint between Stage 2 (0.50) and Stage 3 (0.75) -> targetScroll = 0.625
  const goPoints: [number, number, number][] = [
    [0.0, 0.7, 0.0],
    [-0.6, 0.1, -0.4],
    [0.6, 0.1, 0.4],
    [-0.4, -0.6, 0.2],
    [0.4, -0.6, -0.2],
  ];
  const goConnections: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 4]
  ];

  return (
    <group>
      {/* JS/TS Constellation */}
      <SingleConstellation
        centerX={4.0}
        centerY={1.8}
        centerZ={-2.0}
        targetScroll={0.125}
        name="[ JAVASCRIPT / TYPESCRIPT ]"
        purpose="PURPOSE // UI state layers, async query nodes, and modular library modules."
        projects="USED_IN // CampusConnect, MADHU//OS, AI SaaS"
        pointsData={jsPoints}
        connections={jsConnections}
        color="#00ffff"
      />

      {/* Python Constellation */}
      <SingleConstellation
        centerX={12.0}
        centerY={1.6}
        centerZ={-3.0}
        targetScroll={0.375}
        name="[ PYTHON ]"
        purpose="PURPOSE // Real-time conflict grid matrixing and neural pattern matching."
        projects="USED_IN // Railway AI, AI SaaS Core"
        pointsData={pyPoints}
        connections={pyConnections}
        color="#34c759" // Emerald green tint
      />

      {/* Go / Rust Constellation */}
      <SingleConstellation
        centerX={20.0}
        centerY={2.0}
        centerZ={-1.5}
        targetScroll={0.625}
        name="[ GO / RUST ]"
        purpose="PURPOSE // Thread-safe socket routing and low-latency storage engines."
        projects="USED_IN // AI SaaS Pipeline, Railway Core"
        pointsData={goPoints}
        connections={goConnections}
        color="#ffcc00" // Amber gold tint
      />
    </group>
  );
}
