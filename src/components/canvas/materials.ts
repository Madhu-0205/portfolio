import * as THREE from "three";

// Shared Physical Material properties for props spreading
export const TitaniumProps = {
  color: new THREE.Color("#161618"),
  metalness: 0.95,
  roughness: 0.18,
  clearcoat: 1.0,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.5,
};

export const BrushedAluminumProps = {
  color: new THREE.Color("#6c6c70"),
  metalness: 0.88,
  roughness: 0.32,
  clearcoat: 0.3,
  clearcoatRoughness: 0.15,
};

export const FrostedGlassProps = {
  color: new THREE.Color("#ffffff"),
  roughness: 0.12,
  metalness: 0.02,
  transmission: 0.92, // Apple spatial glass look
  ior: 1.55,           // Index of refraction
  thickness: 1.6,      // Refraction thickness
  transparent: true,
  opacity: 0.9,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
};

export const BasaltProps = {
  color: new THREE.Color("#08080a"), // Monumental dark stone
  roughness: 0.88,
  metalness: 0.0,
};

export const ConcreteProps = {
  color: new THREE.Color("#1c1c1e"),
  roughness: 0.75,
  metalness: 0.05,
};

export const EmissiveGlowProps = (color: string = "#ffffff", intensity: number = 1.0) => ({
  color: new THREE.Color("#000000"),
  emissive: new THREE.Color(color),
  emissiveIntensity: intensity,
});
