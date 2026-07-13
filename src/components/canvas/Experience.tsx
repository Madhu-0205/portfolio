"use client";

/* eslint-disable react-hooks/purity */

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { ConcreteProps } from "./materials";
import Hero3D from "./Stage/Hero3D";
import Works3D from "./Stage/Works3D";
import About3D from "./Stage/About3D";
import Contact3D from "./Stage/Contact3D";
import Constellations from "./Constellations";
import CrystallineArchive from "./Stage/CrystallineArchive";
import ArchitecturalPortal from "./Stage/ArchitecturalPortal";

// Volumetric light beam component
function LightBeam({ position, rotation, scale, color = "#ffffff", opacity = 0.15 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <cylinderGeometry args={[0.2, 0.6, 10, 16, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Monumental Column component
function Pillar({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[0.8, 12, 0.8]} />
      <meshPhysicalMaterial {...ConcreteProps} />
    </mesh>
  );
}

// Global repository-to-repository light stream component representing commit momentum
function UniverseStream({
  start,
  end,
  color = "#ffffff",
  count = 4,
  speed = 1.0,
  prefersReducedMotion = false,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
  count?: number;
  speed?: number;
  prefersReducedMotion?: boolean;
}) {
  const pointsRef = useRef<THREE.Group>(null);
  
  // Generate a smooth quadratic Bezier curve to simulate floating orbital pathing
  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    midPoint.y += 1.8; // arc upward in the sky
    midPoint.z += (Math.random() - 0.5) * 3.0; // bend outward
    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end]);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({ offset: i / count });
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const children = pointsRef.current.children;
      particles.forEach((p, idx) => {
        const mesh = children[idx] as THREE.Mesh;
        if (mesh) {
          // Staggered flow animation along the spline path
          p.offset += delta * 0.08 * speed;
          if (p.offset > 1.0) p.offset = 0;
          
          const pos = curve.getPointAt(p.offset);
          mesh.position.copy(pos);
          mesh.scale.setScalar(0.024 * (1.0 + Math.sin(time * 5.0 + idx) * 0.25));
        }
      });
    }
  });

  return (
    <group>
      {/* Dotted path pathway line */}
      <Line
        points={curve.getPoints(40)}
        color={color}
        lineWidth={0.5}
        transparent
        opacity={0.06}
      />
      {/* Light stream particles */}
      <group ref={pointsRef}>
        {particles.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.65} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Set up coordinates for the global celestial connection streams
function ObservedUniverseStreams() {
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Exact absolute coordinates of repository satellites in world space
  const repoPositions = useMemo(() => [
    new THREE.Vector3(2.2, 1.3, -2.8),    // JobNest (About3D at X=0)
    new THREE.Vector3(9.8, 2.6, -8.6),    // CampusConnect (Hero3D at X=8)
    new THREE.Vector3(14.6, 1.8, -7.2),   // Railway AI (Works3D at X=16)
    new THREE.Vector3(22.4, 2.0, 4.0),    // MADHU//OS (Contact3D at X=24)
  ], []);

  return (
    <group>
      {/* Stream 1: CampusConnect -> Railway AI */}
      <UniverseStream start={repoPositions[0]} end={repoPositions[1]} color="#00ffff" count={3} speed={1.1} prefersReducedMotion={prefersReducedMotion} />
      {/* Stream 2: Railway AI -> AI SaaS */}
      <UniverseStream start={repoPositions[1]} end={repoPositions[2]} color="#34c759" count={3} speed={0.9} prefersReducedMotion={prefersReducedMotion} />
      {/* Stream 3: AI SaaS -> MADHU//OS */}
      <UniverseStream start={repoPositions[2]} end={repoPositions[3]} color="#00ffff" count={4} speed={1.3} prefersReducedMotion={prefersReducedMotion} />
      {/* Stream 4: MADHU//OS -> CampusConnect */}
      <UniverseStream start={repoPositions[3]} end={repoPositions[0]} color="#00ffff" count={4} speed={0.8} prefersReducedMotion={prefersReducedMotion} />
    </group>
  );
}

interface TextMesh extends THREE.Mesh {
  fillOpacity: number;
}

export default function Experience() {
  const dustRef = useRef<THREE.Points>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  
  // Refs for philosophy wall texts
  const philText1Ref = useRef<TextMesh>(null);
  const philText2Ref = useRef<TextMesh>(null);
  const philText3Ref = useRef<TextMesh>(null);
  const philText4Ref = useRef<TextMesh>(null);

  // Track scroll velocity across frames
  const prevScrollRef = useRef(0);
  const velocityRef = useRef(0);

  // Initialize particles spread across the entire environment space
  const [particles, initialPositions] = useMemo(() => {
    const count = 180;
    const arr = new Float32Array(count * 3);
    const initialArr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const x = (Math.random() - 0.5) * 45 + 12;
      const y = Math.random() * 8 + 0.5;
      const z = (Math.random() - 0.5) * 20;
      
      arr[i] = x;
      arr[i + 1] = y;
      arr[i + 2] = z;
      
      initialArr[i] = x;
      initialArr[i + 1] = y;
      initialArr[i + 2] = z;
    }
    return [arr, initialArr];
  }, []);

  useFrame((state, delta) => {
    // 1. Compute scroll velocity
    const currentScroll = scrollProgress;
    const rawDiff = Math.abs(currentScroll - prevScrollRef.current);
    velocityRef.current = THREE.MathUtils.lerp(velocityRef.current, rawDiff / (delta || 0.016), delta * 4.0);
    prevScrollRef.current = currentScroll;

    // 2. Modulate particle coordinates dynamically (Streaming & Clustering physics)
    if (dustRef.current) {
      const geometry = dustRef.current.geometry;
      const posAttr = geometry.attributes.position;
      const array = posAttr.array as Float32Array;
      
      const stageProgress = scrollProgress * 5;
      const nearestStage = Math.round(stageProgress);
      const stageCenterX = nearestStage * 6.5; // adjusted for 6 stages
      
      const stationaryFactor = Math.max(0, 1.0 - velocityRef.current * 4.0);
      const motionScale = scrollProgress >= 0.95 ? Math.max(0, 1.0 - (scrollProgress - 0.95) / 0.05) : 1.0;

      for (let i = 0; i < array.length; i += 3) {
        array[i + 1] += Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.0015 * motionScale;
        
        if (velocityRef.current > 0.05 && motionScale > 0.01) {
          const streamDirection = currentScroll > prevScrollRef.current ? -1 : 1;
          array[i] += streamDirection * velocityRef.current * delta * 0.8 * motionScale;
          
          if (array[i] < -10) array[i] = 35;
          if (array[i] > 35) array[i] = -10;
        }

        if (stationaryFactor > 0.5 && motionScale > 0.01) {
          const origX = initialPositions[i];
          const distToStageX = Math.abs(origX - stageCenterX);
          
          if (distToStageX < 8) {
            array[i] = THREE.MathUtils.lerp(array[i], stageCenterX + (origX - stageCenterX) * 0.7, delta * 1.5 * stationaryFactor);
          }
        }
      }
      posAttr.needsUpdate = true;

      // 2.1 Modulate particle opacity for clean Act 1 boot
      const mat = dustRef.current.material as THREE.PointsMaterial;
      if (mat) {
        const particleOpacity = scrollProgress < 0.09 ? 0.0 : Math.min(0.35, ((scrollProgress - 0.09) / 0.06) * 0.35);
        mat.opacity = particleOpacity;
      }
    }

    // 3. Modulate Engineering Philosophy Wall Text Opacities (aligned with 6-stage transitions)
    const p1 = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.10) * 10.0);
    const p2 = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.30) * 10.0);
    const p3 = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.50) * 10.0);
    const p4 = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.70) * 10.0);

    if (philText1Ref.current) philText1Ref.current.fillOpacity = p1;
    if (philText2Ref.current) philText2Ref.current.fillOpacity = p2;
    if (philText3Ref.current) philText3Ref.current.fillOpacity = p3;
    if (philText4Ref.current) philText4Ref.current.fillOpacity = p4;
  });

  return (
    <group>
      {/* 1. Volumetric light shafts */}
      <group>
        <LightBeam position={[-2, 4, 1]} rotation={[0.4, 0, -0.3]} scale={[1, 1.2, 1]} color="#ffffff" opacity={0.12} />
        <LightBeam position={[2, 5, -1]} rotation={[0.4, 0, -0.3]} scale={[0.8, 1.4, 0.8]} color="#fffaed" opacity={0.10} />
        <LightBeam position={[8, 5, -8]} rotation={[0, 0, 0]} scale={[1.2, 1, 1.2]} color="#00ffcc" opacity={0.06} />
        <LightBeam position={[16, 4, -4]} rotation={[0, 0, 0]} scale={[2.5, 0.8, 2.5]} color="#ff3b30" opacity={0.05} />
        <LightBeam position={[24, 4, 5]} rotation={[0.2, 0, 0.1]} scale={[1.5, 1.0, 1.5]} color="#ffffff" opacity={0.08} />
      </group>

      {/* 2. Dust Particles (Dynamic points cloud) */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.038}
          sizeAttenuation={true}
          transparent
          opacity={0.35}
        />
      </points>

      {/* 3. Monumental columns & ceiling arches */}
      <group>
        {/* Gallery Back Concrete Wall */}
        <mesh position={[12, 4, -15]} receiveShadow>
          <boxGeometry args={[60, 10, 0.5]} />
          <meshPhysicalMaterial {...ConcreteProps} roughness={0.9} />
        </mesh>
        
        <mesh position={[12, 8.5, -4]} receiveShadow>
          <boxGeometry args={[60, 0.4, 12]} />
          <meshPhysicalMaterial {...ConcreteProps} />
        </mesh>
        
        <Pillar position={[-5, 4, -6]} />
        <Pillar position={[-5, 4, 4]} />
        <Pillar position={[5, 4, -12]} />
        <Pillar position={[12, 4, -12]} />
        <Pillar position={[20, 4, -8]} />
        <Pillar position={[28, 4, -4]} />
        <Pillar position={[28, 4, 8]} />
      </group>

      {/* 4. Engineering Philosophy Wall Engravings (Projected onto Back Wall Z=-14.7) */}
      <group position={[0, 0, 0]}>
        <Text
          ref={philText1Ref}
          position={[0, 4.2, -14.7]}
          fontSize={0.20}
          color="#ffffff"
          maxWidth={6.5}
          textAlign="center"
          lineHeight={1.45}
          fillOpacity={0}
        >
          Technology is only useful if it opens doors for people.
        </Text>
        <Text
          ref={philText2Ref}
          position={[8, 4.2, -14.7]}
          fontSize={0.20}
          color="#ffffff"
          maxWidth={6.5}
          textAlign="center"
          lineHeight={1.45}
          fillOpacity={0}
        >
          The best products are built to solve real local problems.
        </Text>
        <Text
          ref={philText3Ref}
          position={[16, 4.2, -14.7]}
          fontSize={0.20}
          color="#ffffff"
          maxWidth={6.5}
          textAlign="center"
          lineHeight={1.45}
          fillOpacity={0}
        >
          We optimize systems not for prizes, but for throughput.
        </Text>
        <Text
          ref={philText4Ref}
          position={[24, 4.2, -14.7]}
          fontSize={0.20}
          color="#ffffff"
          maxWidth={6.5}
          textAlign="center"
          lineHeight={1.45}
          fillOpacity={0}
        >
          I write code to build companies that last.
        </Text>
      </group>

      {/* 5. Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[12, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 30]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={30}
          mixStrength={1.5}
          roughness={0.7}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.2}
          mirror={0.5}
        />
      </mesh>

      {/* 6. Language Constellations Midground Layer */}
      <Constellations />

      {/* 7. Focal Stages coordinates */}
      <group position={[0, 0.5, -4]}>
        <About3D />
      </group>

      <group position={[8, 1.8, -8]}>
        <Hero3D />
      </group>

      <group position={[16, 1.0, -8]}>
        <Works3D />
      </group>

      <group position={[24, 1.2, 5]}>
        <Contact3D />
      </group>

      {/* 8. Global repository-to-repository commit streams */}
      <ObservedUniverseStreams />

      {/* 9. Crystalline Archive & Architectural Portal (Founder's Vision Chapter) */}
      <CrystallineArchive />
      <ArchitecturalPortal />
    </group>
  );
}
