"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";

// 6-Keyframe Narrative Camera Trajectory Path
const STAGES = [
  // Keyframe 0 (Boot Start - scroll 0.0): Far back in the pitch black hallway
  { position: new THREE.Vector3(0, 2.5, 12.0), target: new THREE.Vector3(0, 2.5, 0) },
  // Keyframe 1 (CampusConnect - scroll 0.20): Glided close, light waking up
  { position: new THREE.Vector3(0, 2.5, 7.5), target: new THREE.Vector3(0, 1.8, 0) },
  // Keyframe 2 (Railway AI / SIH - scroll 0.40): Diagonal perspective of gallery slabs
  { position: new THREE.Vector3(8, 1.8, -4.0), target: new THREE.Vector3(10, 1.2, -10.0) },
  // Keyframe 3 (AI SaaS Monument - scroll 0.60): Tall columns, overhead view of core
  { position: new THREE.Vector3(16, 4.5, 4.0), target: new THREE.Vector3(16, 0.5, -4.0) },
  // Keyframe 4 (MADHU//OS Shrine - scroll 0.80): Close-up of titanium orb
  { position: new THREE.Vector3(23, 1.5, 9.5), target: new THREE.Vector3(24, 1.2, 5.0) },
  // Keyframe 5 (Founder's Vision - scroll 1.00): Rising above monuments, open sky, horizon
  { position: new THREE.Vector3(12, 10.0, 20.0), target: new THREE.Vector3(12, 4.0, -12.0) },
];

export default function CameraChoreography() {
  const { camera } = useThree();
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  
  // Track target camera coordinates
  const targetPosRef = useRef(new THREE.Vector3().copy(STAGES[0].position));
  const targetLookRef = useRef(new THREE.Vector3().copy(STAGES[0].target));
  
  // Mouse parallax refs
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const lerpedMouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // 1. Calculate camera position and look target along the 5 keyframe steps
    const stageProgress = scrollProgress * (STAGES.length - 1);
    const index = Math.floor(stageProgress);
    const fraction = stageProgress - index;

    if (index >= STAGES.length - 1) {
      targetPosRef.current.copy(STAGES[STAGES.length - 1].position);
      targetLookRef.current.copy(STAGES[STAGES.length - 1].target);
    } else {
      const currentStage = STAGES[index];
      const nextStage = STAGES[index + 1];

      // Blend position and lookAt vectors
      targetPosRef.current.lerpVectors(currentStage.position, nextStage.position, fraction);
      targetLookRef.current.lerpVectors(currentStage.target, nextStage.target, fraction);
    }

    // 2. Smoothly interpolate mouse movement with lag-inertia
    lerpedMouseRef.current.lerp(mouseRef.current, delta * 1.8); // heavy lens drag

    // 3. Inject subtle camera breathing + mouse parallax offset
    const time = state.clock.getElapsedTime();
    const finalCameraPos = targetPosRef.current.clone();
    
    // Imperceptible handheld drift/breathing
    finalCameraPos.x += Math.sin(time * 0.3) * 0.03 + lerpedMouseRef.current.x * 0.12;
    finalCameraPos.y += Math.cos(time * 0.25) * 0.03 + lerpedMouseRef.current.y * 0.08;
    
    const finalLookTarget = targetLookRef.current.clone();
    finalLookTarget.x += lerpedMouseRef.current.x * 0.06;
    finalLookTarget.y += lerpedMouseRef.current.y * 0.06;

    // 4. Update camera position and look target slowly
    camera.position.lerp(finalCameraPos, delta * 1.6);
    
    const currentLookTarget = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLookTarget.lerp(finalLookTarget, delta * 1.6);
    camera.lookAt(currentLookTarget);
  });

  return null;
}
