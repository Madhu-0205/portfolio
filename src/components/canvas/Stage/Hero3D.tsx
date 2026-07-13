"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { FrostedGlassProps } from "../materials";
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

export default function Hero3D() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const prismRef = useRef<THREE.Mesh>(null);
  const glassMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  const PLATFORMS = useMemo(() => [
    { name: "LinkedIn", color: "#0077b5", angle: 0 },
    { name: "WhatsApp", color: "#25d366", angle: (Math.PI * 2) / 6 },
    { name: "Telegram", color: "#0088cc", angle: (Math.PI * 4) / 6 },
    { name: "College Portal", color: "#ffcc00", angle: Math.PI },
    { name: "Unstop", color: "#ff3b30", angle: (Math.PI * 8) / 6 },
    { name: "Internshala", color: "#00ffff", angle: (Math.PI * 10) / 6 },
  ], []);

  const platformRefs = useRef<(THREE.Group | null)[]>([]);

  const nodes = useMemo(() => [
    new THREE.Vector3(-0.4, 0.4, -0.2),
    new THREE.Vector3(0.5, 0.2, 0.1),
    new THREE.Vector3(-0.3, -0.3, 0.2),
    new THREE.Vector3(0.4, -0.4, -0.1),
    new THREE.Vector3(0.0, 0.0, 0.3),
  ], []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // 1. Group tilt
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.12,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.12,
        delta * 3
      );
    }

    // 2. Proximity calculation (centered around scroll progress 0.40)
    // Ramps to 1.0 when arrived at CampusConnect stage
    const proximity = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.40) * 5.0);

    // 3. Modulate frosted glass refraction and transparency based on proximity
    if (glassMaterialRef.current) {
      glassMaterialRef.current.transmission = THREE.MathUtils.lerp(0.85, 0.98, proximity);
      glassMaterialRef.current.roughness = THREE.MathUtils.lerp(0.18, 0.02, proximity);
    }

    // 4. Modulate central Birth of Light core scale and glow
    if (coreRef.current) {
      let targetScale = 0.05;
      let targetEmissive = 2.0;

      if (scrollProgress < 0.32) {
        targetScale = 0.05;
        targetEmissive = 1.5;
      } else if (scrollProgress < 0.50) {
        const t = (scrollProgress - 0.32) / 0.18;
        targetScale = THREE.MathUtils.lerp(0.05, 1.25, t);
        targetEmissive = THREE.MathUtils.lerp(1.5, 12.0, t);
      } else {
        targetScale = 1.0;
        targetEmissive = 3.0;
      }

      coreRef.current.scale.setScalar(
        THREE.MathUtils.lerp(coreRef.current.scale.x, targetScale, delta * 3)
      );

      const mat = coreRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        targetEmissive,
        delta * 3
      );
      
      const pulse = 1.0 + Math.sin(time * 3.0) * 0.03;
      coreRef.current.scale.multiplyScalar(pulse);
    }

    // 5. Floating motion for the glass monolith
    if (prismRef.current) {
      prismRef.current.position.y = Math.sin(time * 0.7) * 0.08;
      prismRef.current.rotation.z = Math.sin(time * 0.3) * 0.02;
    }

    // 6. Orient integrated platform labels to face the camera
    PLATFORMS.forEach((platform, idx) => {
      const ref = platformRefs.current[idx];
      if (ref) {
        ref.quaternion.copy(state.camera.quaternion);
      }
    });
  });

  // Reveal texts only within a narrow, earned scroll window (0.37 to 0.43)
  const showText = scrollProgress >= 0.37 && scrollProgress <= 0.43;

  return (
    <group ref={groupRef}>
      {/* Central "Birth of Light" Core */}
      <mesh ref={coreRef} position={[0, 0, -0.8]} castShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial
          color="#000000"
          emissive="#ffffff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* ────────────────── CAMPUSCONNECT MONOLITH ────────────────── */}
      <group ref={prismRef}>
        {/* Core Glass Monolith Slab */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 2.2, 0.08]} />
          <meshPhysicalMaterial ref={glassMaterialRef} {...FrostedGlassProps} thickness={2.2} />
        </mesh>

        {/* Network Node Graph inside the glass block */}
        <group>
          {nodes.map((pos: THREE.Vector3, i: number) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color="#00ffff" />
            </mesh>
          ))}
          <Line points={[nodes[0], nodes[1]]} color="#00ffff" lineWidth={1} transparent opacity={0.3} />
          <Line points={[nodes[1], nodes[2]]} color="#00ffff" lineWidth={1} transparent opacity={0.3} />
          <Line points={[nodes[2], nodes[3]]} color="#00ffff" lineWidth={1} transparent opacity={0.3} />
          <Line points={[nodes[3], nodes[4]]} color="#00ffff" lineWidth={1} transparent opacity={0.3} />
          <Line points={[nodes[4], nodes[0]]} color="#00ffff" lineWidth={1} transparent opacity={0.3} />
          <Line points={[nodes[4], nodes[2]]} color="#00ffff" lineWidth={1} transparent opacity={0.3} />
        </group>
      </group>

      {/* Unified ecosystem platforms */}
      {PLATFORMS.map((platform, idx) => {
        const radius = 1.95;
        const x = Math.cos(platform.angle) * radius;
        const z = -0.8 + Math.sin(platform.angle) * radius;
        const y = 0.5 + Math.sin(idx) * 0.15;
        
        return (
          <group key={idx} ref={(el) => { platformRefs.current[idx] = el; }} position={[x, y, z]}>
            <Text
              fontSize={0.065}
              color={platform.color}
              font="var(--font-family-mono)"
              anchorX="center"
              anchorY="middle"
            >
              {platform.name.toUpperCase()}
            </Text>
            {/* Connection line showing unification to core */}
            <Line
              points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(-x, -y, -0.8 - z)]}
              color="#00ffff"
              lineWidth={0.5}
              transparent
              opacity={0.15}
            />
          </group>
        );
      })}

      {/* ────────────────── HOLOGRAPHIC NARRATIVE TEXT ────────────────── */}
      {showText && (
        <group>
          <HolographicText 
            position={[-2.4, 0.2, 0.4]} 
            title="CHAPTER 4 // CAMPUSCONNECT" 
            body="THE PROBLEM // Scattered directories. Talent is everywhere, but opportunities are scattered. Students miss key milestones." 
          />

          <HolographicText 
            position={[1.1, 0.0, 0.0]} 
            title="THE CORE ARCHITECTURE" 
            body="THE SOLUTION // A skill-matching recommendation graph connecting students directly to gigs, events, hackathons, and networks." 
          />

          <HolographicText 
            position={[-2.0, -1.3, 0.5]} 
            title="[ CASE_STUDY ]" 
            link="case-study:campusconnect"
          />
          <HolographicText 
            position={[-0.9, -1.3, 0.5]} 
            title="[ GITHUB_CODE ]" 
            link="https://github.com/Madhu-0205/campusconnect"
          />
          <HolographicText 
            position={[0.2, -1.3, 0.5]} 
            title="[ LIVE_DEMO ]" 
            link="https://www.campusconnectco.in"
          />
        </group>
      )}

      {/* CampusConnect Repository satellite system */}
      <RepositorySatellite
        repoName="campusconnect"
        defaultStats={{
          stars: 38,
          forks: 7,
          size: 14200,
          language: "TypeScript",
          commits: 142,
          description: "Decentralized collegiate opportunity and professional resource alignment graph.",
          topics: ["react", "graphql", "collaboration", "networking"],
          url: "https://github.com/Madhu-0205/campusconnect",
          homepageUrl: "https://www.campusconnectco.in"
        }}
        position={[1.8, 0.8, -0.6]}
        targetCenter={[0, 0, -0.8]}
        targetScroll={0.40}
      />
    </group>
  );
}
