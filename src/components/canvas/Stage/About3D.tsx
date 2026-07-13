"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { ConcreteProps, TitaniumProps, BasaltProps } from "../materials";
import RepositorySatellite from "./RepositorySatellite";

// Hover-interactive 3D Text Card component
function HolographicText({ 
  position, 
  title, 
  body, 
  color = "#86868b" 
}: { 
  position: [number, number, number]; 
  title: string; 
  body?: string; 
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

  return (
    <group 
      ref={textRef} 
      position={position}
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
      <Text
        fontSize={0.09}
        color={hovered ? "#ff3b30" : "#ffffff"}
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

// Holographic module representing geometry assembling itself
function AssemblingModule({ position, index }: { position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = Math.sin(time * 1.2 + index * 2.5);
    if (meshRef.current) {
      meshRef.current.scale.setScalar(0.45 + pulse * 0.12);
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = time * 0.15;
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.08 + (pulse + 1.0) * 0.15;
      }
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

// Glowing drone flight representing construction activity
function ConstructionDrone({ color, speed, heightOffset }: { color: string; speed: number; heightOffset: number }) {
  const droneRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const theta = time * speed;
    const radius = 2.3;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const y = heightOffset + Math.sin(time * 2.2) * 0.2;
    if (droneRef.current) {
      droneRef.current.position.set(x, y, z);
    }
  });
  return (
    <mesh ref={droneRef}>
      <sphereGeometry args={[0.042, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

export default function About3D() {
  const pointsRef = useRef<THREE.Points>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);
  const scaffoldRef = useRef<THREE.Mesh>(null);
  const crackGlowMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const reactorPointLightRef = useRef<THREE.PointLight>(null);
  
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const [beaconColor, setBeaconColor] = useState("#ffcc00");

  const count = 32;
  const separation = 0.22;

  // Set up particle coordinate buffer
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    let index = 0;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        pos[index++] = (x - count / 2) * separation;
        pos[index++] = 0;
        pos[index++] = (z - count / 2) * separation;
      }
    }
    return [pos];
  }, [count, separation]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // 1. Blinking warning beacons
    const blink = Math.sin(time * 6.0) > 0;
    setBeaconColor(blink ? "#ffaa00" : "#221100");

    // 2. Modulate particle wave heights
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      let index = 1;
      
      for (let x = 0; x < count; x++) {
        for (let z = 0; z < count; z++) {
          const px = positionsAttr.array[index - 1] as number;
          const pz = positionsAttr.array[index + 1] as number;
          
          const dist = Math.sqrt(
            Math.pow(px - pointer.x * 2.2, 2) + Math.pow(pz - pointer.y * 2.2, 2)
          );
          
          const baseSine = Math.sin(px * 0.7 + time * 1.3) * Math.cos(pz * 0.7 + time * 1.1) * 0.22;
          const mouseRipple = Math.sin(dist * 3.5 - time * 2.5) * 0.12 / (dist + 0.4);
          
          positionsAttr.array[index] = baseSine + mouseRipple;
          index += 3;
        }
      }
      positionsAttr.needsUpdate = true;
    }

    // 3. Ring rotations
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = time * 0.22;
      innerRingRef.current.rotation.z = time * 0.1;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * 0.12;
      outerRingRef.current.rotation.y = -time * 0.18;
    }

    // 4. Float floating fragments
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(time * 0.6) * 0.05;
    }

    // 5. Rotate scaffolding frame
    if (scaffoldRef.current) {
      scaffoldRef.current.rotation.y = time * 0.05;
    }

    // 6. Proximity-based lighting crack glow (centered around scroll progress 0.60)
    const proximity = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.60) * 5.0);

    // Warm up concrete fault line crack glow and spot lighting
    if (crackGlowMaterialRef.current) {
      crackGlowMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(0.2, 5.0, proximity);
    }
    if (reactorPointLightRef.current) {
      reactorPointLightRef.current.intensity = THREE.MathUtils.lerp(0.8, 3.5, proximity);
    }
  });

  // Reveal texts only within narrow, earned scroll window (0.57 to 0.63)
  const showText = scrollProgress >= 0.57 && scrollProgress <= 0.63;

  return (
    <group position={[0, -0.2, 0]}>
      {/* Central amber/red glow */}
      <pointLight ref={reactorPointLightRef} position={[0, 1.5, 0]} intensity={0.8} color="#ff5500" distance={6} />

      {/* ────────────────── FAILURE: FRACTURED FOUNDATIONS ────────────────── */}
      <group position={[0, -0.65, 0]}>
        {/* Left base segment */}
        <mesh position={[-0.8, 0, 0]} rotation={[0.04, 0, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.2, 3.0]} />
          <meshPhysicalMaterial {...ConcreteProps} />
        </mesh>
        
        {/* Right base segment */}
        <mesh position={[0.8, -0.1, 0.15]} rotation={[-0.04, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.25, 3.0]} />
          <meshPhysicalMaterial {...ConcreteProps} />
        </mesh>

        {/* Emissive fault line crack glow between the slabs */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.2, 2.6]} />
          <meshPhysicalMaterial
            ref={crackGlowMaterialRef}
            color="#000000"
            emissive="#ff3b00"
            emissiveIntensity={0.2}
            toneMapped={false}
            transparent
          />
        </mesh>

        {/* Orbiting fragments */}
        <mesh position={[-1.8, 0.4, 1.4]} rotation={[0.5, 0.8, 0.2]} castShadow>
          <boxGeometry args={[0.22, 0.15, 0.2]} />
          <meshPhysicalMaterial {...BasaltProps} />
        </mesh>
        <mesh position={[2.0, 0.1, -1.5]} rotation={[0.9, 0.2, 0.8]} castShadow>
          <boxGeometry args={[0.18, 0.25, 0.15]} />
          <meshPhysicalMaterial {...BasaltProps} />
        </mesh>
      </group>

      {/* ────────────────── UNFINISHED CAGE: SCAFFOLD & BEAMS ────────────────── */}
      <mesh ref={scaffoldRef} position={[0, 0.8, 0]}>
        <boxGeometry args={[3.2, 2.4, 3.2]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.04} />
      </mesh>

      <mesh position={[0, 2.0, 1.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 3.6, 8]} />
        <meshPhysicalMaterial {...TitaniumProps} />
      </mesh>
      <mesh position={[0, 2.0, -1.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 3.6, 8]} />
        <meshPhysicalMaterial {...TitaniumProps} />
      </mesh>

      <mesh position={[-1.5, 2.0, 1.2]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={beaconColor} />
      </mesh>
      <mesh position={[1.5, 2.0, -1.2]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={beaconColor} />
      </mesh>

      {/* ────────────────── BUILDING: THE ACTIVE REACTOR CORE ────────────────── */}
      <group ref={coreRef}>
        <mesh position={[-2.4, 0.6, -1.2]} castShadow>
          <boxGeometry args={[0.15, 2.5, 0.15]} />
          <meshPhysicalMaterial {...TitaniumProps} />
        </mesh>
        <mesh position={[2.4, 0.6, -1.2]} castShadow>
          <boxGeometry args={[0.15, 2.5, 0.15]} />
          <meshPhysicalMaterial {...TitaniumProps} />
        </mesh>
        <mesh position={[0, 0.6, 2.4]} castShadow>
          <boxGeometry args={[0.15, 2.5, 0.15]} />
          <meshPhysicalMaterial {...TitaniumProps} />
        </mesh>

        <mesh ref={innerRingRef} position={[0, 0.2, 0]}>
          <torusGeometry args={[2.3, 0.03, 8, 64]} />
          <meshPhysicalMaterial {...TitaniumProps} roughness={0.1} />
        </mesh>

        <mesh ref={outerRingRef} position={[0, 0.2, 0]}>
          <torusGeometry args={[2.6, 0.04, 8, 64]} />
          <meshPhysicalMaterial {...TitaniumProps} roughness={0.1} />
        </mesh>

        <points ref={pointsRef} position={[0, 0.2, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#ff4400"
            size={0.05}
            sizeAttenuation={true}
            transparent
            opacity={0.8}
          />
        </points>
      </group>

      {/* Living Construction Drones circling the unfinished exhibit */}
      <ConstructionDrone color="#00ffff" speed={0.7} heightOffset={0.8} />
      <ConstructionDrone color="#ffcc00" speed={-1.0} heightOffset={1.6} />

      {/* Assembling modules representation */}
      <AssemblingModule position={[-1.3, 1.3, -1.3]} index={0} />
      <AssemblingModule position={[1.3, 0.8, 1.3]} index={1} />

      {/* ────────────────── HOLOGRAPHIC NARRATIVE TEXT ────────────────── */}
      {showText && (
        <group>
          <HolographicText 
            position={[-2.5, 0.3, 0.7]} 
            title="JOBNEST" 
            body="THE PROBLEM // Local gig work is heavily fragmented. Micro-opportunities are hard to discover." 
          />

          <HolographicText 
            position={[1.2, 0.1, -0.7]} 
            title="THE MECHANISM" 
            body="MY APPROACH // I am building a geolocation pipeline to match local skills with micro-jobs in real time." 
          />
        </group>
      )}

      {/* JobNest Repository satellite system */}
      <RepositorySatellite
        repoName="jobnest"
        defaultStats={{
          stars: 42,
          forks: 8,
          size: 18400,
          language: "Python",
          commits: 112,
          description: "AI-powered proximity matching network connecting local gig workers with micro-opportunities.",
          topics: ["python", "postgresql", "ai-matching", "gig-economy", "react"],
          url: "https://github.com/madhu/jobnest",
          homepageUrl: "https://jobnest-demo.vercel.app"
        }}
        position={[2.2, 0.8, 1.2]}
        targetCenter={[0, 0.2, 0]}
        targetScroll={0.60}
      />
    </group>
  );
}
