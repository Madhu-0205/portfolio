"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { useGitHubData } from "@/hooks/useGitHubData";
import { usePortfolioStore } from "@/state/usePortfolioStore";

interface SatelliteProps {
  repoName: string;
  defaultStats: {
    stars: number;
    forks: number;
    size: number;
    language: string;
    commits: number;
    updatedAt?: string;
    description?: string;
    topics?: string[];
    url?: string;
    homepageUrl?: string;
  };
  position: [number, number, number]; // Orbit center offset
  targetCenter?: [number, number, number]; // Monument core coordinates to stream particles toward
  targetScroll?: number; // Scroll progress marker for proximity focus
}

export default function RepositorySatellite({
  repoName,
  defaultStats,
  position,
  targetCenter = [0, 0, 0],
  targetScroll = 0.5,
}: SatelliteProps) {
  const data = useGitHubData();
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const setCursorState = usePortfolioStore((state) => state.setCursorState);

  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Group>(null);
  const moonsRef = useRef<THREE.Group>(null);
  const commitParticlesRef = useRef<THREE.Group>(null);
  const loadingRingRef = useRef<THREE.Mesh>(null);
  const hudRingRef1 = useRef<THREE.Mesh>(null);
  const hudRingRef2 = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const awakenRef = useRef(0);

  // Determine if live data is still loading
  const isLoading = data === null;

  // Extract or fallback
  const stats = useMemo(() => {
    if (!data) return defaultStats;
    const repo = data.find((r: any) => r.name.toLowerCase() === repoName.toLowerCase());
    return repo ? {
      ...defaultStats,
      ...repo,
      topics: repo.topics || defaultStats.topics || []
    } : { ...defaultStats, ...repo };
  }, [data, repoName, defaultStats]);

  // Derive "Energy Level" from updatedAt
  const energyLevel = useMemo(() => {
    const dateStr = stats.updatedAt || defaultStats.updatedAt || new Date().toISOString();
    try {
      const lastUpdate = new Date(dateStr).getTime();
      // Target current time provided in metadata
      const now = new Date("2026-07-13T10:24:57+05:30").getTime();
      const diffMs = now - lastUpdate;
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      // Decays from 100% (today) to 10% (1 year ago)
      const energy = Math.max(10, Math.min(100, Math.round(100 - (diffDays / 365) * 90)));
      return energy;
    } catch (e) {
      return 50;
    }
  }, [stats.updatedAt, defaultStats.updatedAt]);

  // Derive celestial parameters
  // Size -> scale
  const scale = useMemo(() => {
    // Restrict scale bounds to fit nice and elegantly in scene
    return Math.min(0.38, Math.max(0.14, (stats.size / 50000) * 0.22 + 0.12));
  }, [stats.size]);

  // Stars -> emissive brightness
  const glowIntensity = useMemo(() => {
    return Math.min(8.0, (stats.stars / 100) * 4.0 + 1.2);
  }, [stats.stars]);

  // Language -> color
  const color = useMemo(() => {
    const lang = stats.language?.toLowerCase();
    if (lang === "typescript" || lang === "javascript") return "#00ffff"; // Cyan
    if (lang === "python") return "#34c759"; // Emerald Green
    if (lang === "go" || lang === "rust") return "#ffcc00"; // Gold
    if (lang === "css" || lang === "html") return "#ff9500"; // Orange
    if (lang === "ruby" || lang === "cpp" || lang === "c++") return "#ff3b30"; // Red
    return "#ffffff"; // Default Silver
  }, [stats.language]);

  // Commit frequency & Energy level -> particle speed and urgency
  const speedFactor = useMemo(() => {
    const commitWeight = Math.min(2.0, (stats.commits / 150) * 0.5);
    const energyWeight = energyLevel / 100;
    return Math.min(4.5, Math.max(0.2, (commitWeight + energyWeight) * 1.5));
  }, [stats.commits, energyLevel]);

  // Initialize commit particles
  const particleCount = 5;
  const commitParticles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < particleCount; i++) {
      pts.push({
        offset: i / particleCount, // stagger initial positions along path
      });
    }
    return pts;
  }, [particleCount]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Check system prefers-reduced-motion
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animDelta = prefersReducedMotion ? delta * 0.05 : delta;
    const animTime = prefersReducedMotion ? time * 0.05 : time;

    // 1. Calculate proximity and awaken level
    const proximity = Math.max(0, 1.0 - Math.abs(scrollProgress - targetScroll) * 8.0);
    const targetAwaken = hovered ? 1.0 : proximity;
    awakenRef.current = THREE.MathUtils.lerp(awakenRef.current, targetAwaken, delta * (prefersReducedMotion ? 12 : 4));
    const awaken = awakenRef.current;

    // Pulse properties based on energy level
    const pulseFreq = 0.5 + (energyLevel / 100) * 2.5;
    const pulseAmp = 0.015 + (energyLevel / 100) * 0.045;
    const pulse = 1.0 + Math.sin(animTime * pulseFreq) * pulseAmp * (0.5 + awaken * 0.5);

    // 2. Float and rotate primary orb
    if (orbRef.current) {
      orbRef.current.position.x = position[0] + Math.sin(animTime * 0.8) * 0.15;
      orbRef.current.position.y = position[1] + Math.cos(animTime * 0.6) * 0.12 + Math.sin(animTime * pulseFreq) * 0.05;
      orbRef.current.position.z = position[2] + Math.sin(animTime * 0.4) * 0.1;
      
      // Dynamic rotation speed based on momentum (commits/activity) and focus
      const rotationSpeed = (0.35 + speedFactor * 0.3) * (1.0 + awaken * 1.5);
      orbRef.current.rotation.y += animDelta * rotationSpeed;
      orbRef.current.rotation.x += animDelta * 0.1;
      
      orbRef.current.scale.setScalar(pulse * (1.0 + awaken * 0.15));

      // Modulate material glow intensity dynamically
      const mat = (orbRef.current.children[0] as THREE.Mesh)?.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.emissiveIntensity = glowIntensity * (0.8 + awaken * 1.8) * (1.0 + Math.sin(animTime * pulseFreq * 2.0) * 0.1);
      }
    }

    // 3. Rotate orbiting moons (Forks)
    if (moonsRef.current && orbRef.current) {
      moonsRef.current.position.copy(orbRef.current.position);
      moonsRef.current.rotation.y = animTime * 0.6 * (1.0 + awaken * 0.5);
      moonsRef.current.rotation.x = animTime * 0.2;
    }

    // 4. Animate commit particle streams flowing from satellite to monument targetCenter
    if (commitParticlesRef.current && orbRef.current) {
      const children = commitParticlesRef.current.children;
      const startPos = orbRef.current.position;
      const endPos = new THREE.Vector3(...targetCenter);

      commitParticles.forEach((p, idx) => {
        const mesh = children[idx] as THREE.Mesh;
        if (mesh) {
          // Advance coordinate offset along line path
          p.offset += animDelta * 0.12 * speedFactor;
          if (p.offset > 1.0) p.offset = 0;
          
          // Interpolate point position
          mesh.position.lerpVectors(startPos, endPos, p.offset);
          // Scale down as they get closer to core merge
          mesh.scale.setScalar((1.0 - p.offset) * (0.8 + awaken * 0.6));
        }
      });
    }

    // 5. Spin loading placeholder ring
    if (loadingRingRef.current) {
      loadingRingRef.current.rotation.z = -animTime * 1.8;
      loadingRingRef.current.rotation.x = animTime * 0.4;
    }

    // 6. Spin holographic reticle HUD rings
    if (hudRingRef1.current) {
      hudRingRef1.current.rotation.z = animTime * 0.8;
    }
    if (hudRingRef2.current) {
      hudRingRef2.current.rotation.z = -animTime * 1.3;
    }
  });

  // Calculate forks moons count (clamp between 0 and 5 to avoid draw calls)
  const forksCount = Math.min(5, stats.forks);
  const forkMoons = useMemo(() => {
    const arr = [];
    const orbitRadius = scale + 0.3;
    for (let i = 0; i < forksCount; i++) {
      const angle = (i / forksCount) * Math.PI * 2;
      arr.push(new THREE.Vector3(Math.cos(angle) * orbitRadius, Math.sin(angle) * 0.1, Math.sin(angle) * orbitRadius));
    }
    return arr;
  }, [forksCount, scale]);

  // Dynamic HUD Layout
  const hudOffset = scale + 0.42;

  return (
    <group ref={groupRef}>
      {/* Interactive Hover Probe */}
      <group
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
        {/* Invisible larger hover buffer sphere */}
        <mesh visible={false}>
          <sphereGeometry args={[scale + 0.25, 16, 16]} />
          <meshBasicMaterial />
        </mesh>

        {/* Primary Repository Satellite Body */}
        <group ref={orbRef}>
          <mesh castShadow>
            <sphereGeometry args={[scale, 32, 32]} />
            <meshPhysicalMaterial
              color="#0d0d11"
              roughness={0.08}
              metalness={0.92}
              emissive={color}
              emissiveIntensity={glowIntensity}
              toneMapped={false}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
            />
          </mesh>
        </group>
      </group>

      {/* Orbiting Moon Fragments (Forks) */}
      <group ref={moonsRef}>
        {forkMoons.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.024, 8, 8]} />
            <meshBasicMaterial color={color} opacity={0.7} transparent />
          </mesh>
        ))}
      </group>

      {/* Commit Particle Streams (Flowing Lights) */}
      <group ref={commitParticlesRef}>
        {commitParticles.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>

      {/* ────────────────── DYNAMIC HOLOGRAPHIC HUD & LOADING PLACEHOLDERS ────────────────── */}

      {/* 1. Loading Placeholder System */}
      {isLoading && (
        <group position={position}>
          {/* Holographic Spinning Loading Ring */}
          <mesh ref={loadingRingRef}>
            <torusGeometry args={[scale + 0.15, 0.008, 8, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.22} wireframe />
          </mesh>
          <Billboard follow={true}>
            <Text
              fontSize={0.055}
              color="#86868b"
              anchorY="middle"
              textAlign="center"
            >
              [ CONNECTING_OBSERVATORY_STREAM... ]
            </Text>
          </Billboard>
        </group>
      )}

      {/* 2. Fully Assembled Telemetry HUD (Shown when loaded & approached/hovered) */}
      {!isLoading && (
        <group>
          {/* Subtle connection line to core monument */}
          <Line
            points={[position, targetCenter]}
            color={color}
            lineWidth={0.5}
            transparent
            opacity={awakenRef.current * 0.15}
          />

          {/* Compass / Orbital Alignment Reticle Rings */}
          <group position={position}>
            <mesh ref={hudRingRef1} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[scale + 0.22, 0.005, 8, 48]} />
              <meshBasicMaterial color={color} transparent opacity={awakenRef.current * 0.18} />
            </mesh>
            <mesh ref={hudRingRef2} rotation={[Math.PI / 2, Math.PI / 6, 0]}>
              <torusGeometry args={[scale + 0.26, 0.003, 8, 48]} />
              <meshBasicMaterial color={color} transparent opacity={awakenRef.current * 0.1} />
            </mesh>
          </group>

          {/* Billboard HUD Telemetry Panel */}
          <Billboard
            follow={true}
            position={[position[0] + hudOffset, position[1] + 0.1, position[2]]}
          >
            <group scale={[awakenRef.current, awakenRef.current, awakenRef.current]}>
              {/* HUD borders */}
              <Line
                points={[
                  new THREE.Vector3(-0.05, 0.65, 0),
                  new THREE.Vector3(1.85, 0.65, 0),
                  new THREE.Vector3(1.85, -0.65, 0),
                  new THREE.Vector3(-0.05, -0.65, 0),
                  new THREE.Vector3(-0.05, 0.65, 0)
                ]}
                color={color}
                lineWidth={0.8}
                transparent
                opacity={0.35}
              />
              
              {/* Telemetry labels */}
              <Text
                position={[0.05, 0.55, 0]}
                fontSize={0.060}
                color="#ffffff"
                anchorX="left"
                anchorY="top"
              >
                {`// REPO : ${stats.name.toUpperCase()}`}
              </Text>

              {/* Description */}
              <Text
                position={[0.05, 0.44, 0]}
                fontSize={0.038}
                color="#86868b"
                anchorX="left"
                anchorY="top"
                maxWidth={1.72}
              >
                {stats.description || "No description provided."}
              </Text>

              <Text
                position={[0.05, 0.22, 0]}
                fontSize={0.046}
                color="#86868b"
                anchorX="left"
                anchorY="top"
              >
                {`SPECTRAL_CLASS  : [ ${stats.language.toUpperCase()} ]`}
              </Text>

              <Text
                position={[0.05, 0.11, 0]}
                fontSize={0.046}
                color="#86868b"
                anchorX="left"
                anchorY="top"
              >
                {`GRAVITY_MASS   : [ ${stats.size} KB ]`}
              </Text>

              <Text
                position={[0.05, 0.0, 0]}
                fontSize={0.046}
                color="#86868b"
                anchorX="left"
                anchorY="top"
              >
                {`MOMENTUM_COMM  : [ ${stats.commits} PTS ]`}
              </Text>

              <Text
                position={[0.05, -0.11, 0]}
                fontSize={0.046}
                color="#86868b"
                anchorX="left"
                anchorY="top"
              >
                {`LUMINESCENCE   : [ ${stats.stars} LM ]`}
              </Text>

              <Text
                position={[0.05, -0.22, 0]}
                fontSize={0.046}
                color={color}
                anchorX="left"
                anchorY="top"
              >
                {`ENERGY_FLUX    : [ ${energyLevel}% ]`}
              </Text>
              
              {/* Topics */}
              <Text
                position={[0.05, -0.33, 0]}
                fontSize={0.038}
                color="#86868b"
                anchorX="left"
                anchorY="top"
                maxWidth={1.72}
              >
                {`TOPICS         : [ ${stats.topics ? stats.topics.join(", ") : ""} ]`}
              </Text>

              {/* Links */}
              <Text
                position={[0.05, -0.45, 0]}
                fontSize={0.036}
                color="#00ffff"
                anchorX="left"
                anchorY="top"
                maxWidth={1.72}
              >
                {`LINK           : ${stats.homepageUrl || stats.url || "github.com/madhu"}`}
              </Text>
            </group>
          </Billboard>
        </group>
      )}
    </group>
  );
}
