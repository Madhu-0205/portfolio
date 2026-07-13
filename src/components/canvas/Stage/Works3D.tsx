"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { ConcreteProps, TitaniumProps, BasaltProps, FrostedGlassProps } from "../materials";
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
  const textRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const targetScale = hovered ? 1.08 : 1.0;
    if (textRef.current) {
      textRef.current.scale.setScalar(
        THREE.MathUtils.lerp(textRef.current.scale.x, targetScale, delta * 6)
      );
    }
  });

  const handleClick = (e: any) => {
    if (link) {
      e.stopPropagation();
      window.open(link, "_blank");
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

// Traversing light train path
function MovingTrainPath({ points, color = "#00ffff", speed = 0.12 }: { 
  points: THREE.Vector3[]; 
  color?: string;
  speed?: number;
}) {
  const trainRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, true), [points]);
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const t = (time * speed) % 1.0;
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
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Synchronized flashing signal light component for railway optimization
function SignalLight({ position, index }: { position: [number, number, number]; index: number }) {
  const lightRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Flash synchronized to time
    const active = Math.sin(time * 3.5 + index * 1.6) > 0;
    if (lightRef.current) {
      const mat = lightRef.current.material as THREE.MeshBasicMaterial;
      mat.color.set(active ? "#00ffff" : "#112222");
    }
  });
  return (
    <mesh ref={lightRef} position={position}>
      <sphereGeometry args={[0.038, 8, 8]} />
      <meshBasicMaterial color="#112222" toneMapped={false} />
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

    // Proximity logic centered at 0.40 scroll Progress
    const proximity = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.40) * 5.0);

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
      <MovingTrainPath points={pathPoints1} color="#00ffff" speed={0.12} />
      <MovingTrainPath points={pathPoints2} color="#34c759" speed={0.16} />

      {/* Synchronized signal nodes */}
      <SignalLight position={[position[0] - 0.5, position[1] + 0.65, position[2] + 0.1]} index={0} />
      <SignalLight position={[position[0] + 0.5, position[1] + 0.65, position[2] - 0.1]} index={1} />
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

  // Reveal text only inside settled scroll window (0.37 to 0.43)
  const showText = scrollProgress >= 0.37 && scrollProgress <= 0.43;

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 4, -4]} intensity={2.0} color="#00ffaa" distance={8} />

      <RailwayAIModel position={[0, 0.15, 0]} scrollProgress={scrollProgress} />

      {/* ────────────────── HOLOGRAPHIC NARRATIVE TEXT ────────────────── */}
      {showText && (
        <group>
          <HolographicText 
            position={[-2.4, 0.1, 1.0]} 
            title="RAILWAY TRAFFIC OPTIMIZER" 
            body="THE CHALLENGE // Smart India Hackathon 2025. Preventing high-density routing deadlocks on national grids." 
          />

          <HolographicText 
            position={[1.1, -0.1, -0.8]} 
            title="THE LESSON" 
            body="MY LEARNING // Implementing spatial algorithms taught me that real-world constraints are the parameters that define the solution." 
          />

          <HolographicText 
            position={[-0.8, -1.1, 1.4]} 
            title="[ RESEARCH_PAPER ]" 
            link="https://arxiv.org/abs/railway-ai-routing"
          />
          <HolographicText 
            position={[0.3, -1.1, 1.4]} 
            link="https://railway-ai-demo.vercel.app"
            title="[ SIMULATOR_DEMO ]" 
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
          description: "Decision support system optimizing high-density traffic deadlocks and signal synchronization.",
          topics: ["reinforcement-learning", "a-star-search", "traffic-simulation", "sih-2025"],
          url: "https://github.com/madhu/railway-ai",
          homepageUrl: "https://railway-ai-demo.vercel.app"
        }}
        position={[-1.4, 0.8, 0.8]}
        targetCenter={[0, 0.75, 0]}
        targetScroll={0.40}
      />
    </group>
  );
}
