"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { ConcreteProps, TitaniumProps } from "../materials";
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

// Traversing light train path with scroll-bound conflict simulation
function MovingTrainPath({ points, color = "#00ffff", speed = 0.12, scrollProgress, trainId }: { 
  points: THREE.Vector3[]; 
  color?: string;
  speed?: number;
  scrollProgress: number;
  trainId: number;
}) {
  const trainRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, true), [points]);
  const tempPos = useMemo(() => new THREE.Vector3(), []);
  
  // Track accumulated virtual time to support stopping and resuming
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    // Determine speed multiplier based on scroll progress and position
    // If scrollProgress < 0.60, we want to stop the train when it gets close to the center conflict zone (around t = 0.5)
    let speedMultiplier = 1.0;
    
    // Calculate current position parameter t
    const t = (timeRef.current * speed) % 1.0;
    
    if (scrollProgress < 0.60) {
      // Train 1 stops at t = 0.42, Train 2 stops at t = 0.52 (where they almost collide)
      const stopTarget = trainId === 1 ? 0.42 : 0.52;
      const distToStop = Math.abs(t - stopTarget);
      if (distToStop < 0.15) {
        // Smoothly decelerate as we get closer to the stop target
        speedMultiplier = Math.max(0.0, distToStop / 0.15);
      }
    } else {
      // Deadlock resolved! Resume movement
      speedMultiplier = 1.0;
    }
    
    // Accumulate time only if moving
    timeRef.current += delta * speedMultiplier;
    
    curve.getPointAt(t, tempPos);
    if (trainRef.current) {
      trainRef.current.position.copy(tempPos);
    }
  });

  return (
    <group>
      <Line 
        points={curve.getPoints(60)} 
        color={color} 
        lineWidth={0.5} 
        transparent 
        opacity={0.12} 
      />
      <mesh ref={trainRef}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={scrollProgress < 0.60 ? "#ff3b30" : color} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Synchronized flashing signal light component that changes color during deadlock conflict
function SignalLight({ position, index, scrollProgress }: { position: [number, number, number]; index: number; scrollProgress: number }) {
  const lightRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lightRef.current) {
      const mat = lightRef.current.material as THREE.MeshBasicMaterial;
      if (scrollProgress < 0.60) {
        // Red lights flash warning during conflict
        const active = Math.sin(time * 8.0 + index) > 0;
        mat.color.set(active ? "#ff3b30" : "#220505");
      } else {
        // Green / Cyan lights pulse calmly after resolution
        const active = Math.sin(time * 2.5 + index * 1.6) > 0;
        mat.color.set(active ? "#00ffff" : "#021c1c");
      }
    }
  });
  return (
    <mesh ref={lightRef} position={position}>
      <sphereGeometry args={[0.038, 8, 8]} />
      <meshBasicMaterial color="#ff3b30" toneMapped={false} />
    </mesh>
  );
}

function RailwayAIModel({ position, scrollProgress }: { position: [number, number, number]; scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const setCursorState = usePortfolioStore((state) => state.setCursorState);

  const pathPoints1 = useMemo(() => [
    new THREE.Vector3(position[0] - 0.9, position[1] + 0.6, position[2] + 0.3),
    new THREE.Vector3(position[0] - 0.4, position[1] + 0.9, position[2] - 0.7),
    new THREE.Vector3(position[0] + 0.8, position[1] + 0.5, position[2] - 0.6),
    new THREE.Vector3(position[0] + 0.6, position[1] + 0.8, position[2] + 0.5),
    new THREE.Vector3(position[0] - 0.2, position[1] + 0.4, position[2] + 0.7),
  ], [position]);

  const pathPoints2 = useMemo(() => [
    new THREE.Vector3(position[0] - 0.7, position[1] + 0.4, position[2] - 0.5),
    new THREE.Vector3(position[0] + 0.3, position[1] + 0.7, position[2] + 0.7),
    new THREE.Vector3(position[0] + 0.7, position[1] + 0.4, position[2] - 0.4),
    new THREE.Vector3(position[0] - 0.3, position[1] + 0.8, position[2] - 0.6),
  ], [position]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Group float
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.cos(time * 0.8) * 0.05;
      const scale = THREE.MathUtils.lerp(groupRef.current.scale.x, hovered ? 1.08 : 1.0, delta * 6);
      groupRef.current.scale.setScalar(scale);
    }

    // Spin rings
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3;
      ringRef.current.rotation.y = time * 0.18;
    }

    // Proximity logic centered at 0.60 scroll Progress
    const proximity = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.60) * 5.0);

    // Polish titanium material on approach
    if (ringMaterialRef.current) {
      ringMaterialRef.current.roughness = THREE.MathUtils.lerp(0.32, 0.06, proximity);
      ringMaterialRef.current.metalness = THREE.MathUtils.lerp(0.85, 0.98, proximity);
      ringMaterialRef.current.envMapIntensity = THREE.MathUtils.lerp(1.0, 2.2, proximity);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); setCursorState("hover"); }}
      onPointerOut={() => { setHovered(false); setCursorState("default"); }}
    >
      <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <meshPhysicalMaterial {...ConcreteProps} />
      </mesh>
      
      <mesh position={[position[0], position[1] + 0.6, position[2]]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.0, 16]} />
        <meshPhysicalMaterial {...TitaniumProps} />
      </mesh>

      <mesh ref={ringRef} position={[position[0], position[1] + 0.6, position[2]]} castShadow>
        <torusGeometry args={[0.7, 0.04, 16, 64]} />
        <meshPhysicalMaterial ref={ringMaterialRef} {...TitaniumProps} />
      </mesh>

      {/* Living Intersecting Railway Network splines */}
      <MovingTrainPath points={pathPoints1} color="#00ffff" speed={0.12} scrollProgress={scrollProgress} trainId={1} />
      <MovingTrainPath points={pathPoints2} color="#34c759" speed={0.16} scrollProgress={scrollProgress} trainId={2} />

      {/* Synchronized signal nodes */}
      <SignalLight position={[position[0] - 0.5, position[1] + 0.65, position[2] + 0.1]} index={0} scrollProgress={scrollProgress} />
      <SignalLight position={[position[0] + 0.5, position[1] + 0.65, position[2] - 0.1]} index={1} scrollProgress={scrollProgress} />
    </group>
  );
}

export default function Works3D() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.08) * 0.02;
    }
  });

  // Reveal text only inside settled scroll window (0.57 to 0.63)
  const showText = scrollProgress >= 0.57 && scrollProgress <= 0.63;

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 4, -4]} intensity={2.0} color="#00ffaa" distance={8} />

      <RailwayAIModel position={[0, 0.15, 0]} scrollProgress={scrollProgress} />

      {/* ────────────────── HOLOGRAPHIC NARRATIVE TEXT ────────────────── */}
      {showText && (
        <group>
          <HolographicText 
            position={[-2.4, 0.1, 1.0]} 
            title="CHAPTER 5 // RAILWAY AI" 
            body="THE CHALLENGE // Preventing signal deadlocks and traffic bottlenecks on high-density national grids." 
          />

          <HolographicText 
            position={[1.1, -0.1, -0.8]} 
            title="THE DECISION SYSTEM" 
            body="HUMAN IN THE LOOP // AI runs spatial search routing to suggest deadlock resolutions, assisting (never replacing) the human controller's authority." 
          />

          <HolographicText 
            position={[-1.9, -1.1, 1.4]} 
            title="[ CASE_STUDY ]" 
            link="case-study:railway-ai"
          />
          <HolographicText 
            position={[-0.8, -1.1, 1.4]} 
            title="[ RESEARCH_PAPER ]" 
            link="https://arxiv.org/abs/railway-ai-routing"
          />
          <HolographicText 
            position={[0.3, -1.1, 1.4]} 
            title="[ RESEARCH_PROTOTYPE ]" 
          />
        </group>
      )}

      {/* Railway AI Repository satellite system */}
      <RepositorySatellite
        repoName="railway-ai"
        defaultStats={{
          stars: 84,
          forks: 12,
          size: 28900,
          language: "Python",
          commits: 268,
          description: "PROBLEM SOLVED: High-density rail signal deadlocks causing cascading delays. | STATUS: Smart India Hackathon 2025 Runner-Up. | TECH: Python, FastAPI, A* Search Heuristics, React.",
          topics: ["a-star-search", "traffic-simulation", "fastapi", "sih-2025"],
          url: "https://github.com/Madhu-0205/railway-ai",
          homepageUrl: "research-prototype"
        }}
        position={[-1.4, 0.8, 0.8]}
        targetCenter={[0, 0.75, 0]}
        targetScroll={0.60}
      />
    </group>
  );
}
