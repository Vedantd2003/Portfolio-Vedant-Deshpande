"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Shared material factory ─────────────────────────────────────────────────
function useMat(color: string, emissive: string, emissiveIntensity = 0.35) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity,
        metalness: 0.92,
        roughness: 0.08,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}

// ─── Robot ───────────────────────────────────────────────────────────────────
function Robot() {
  const groupRef = useRef<THREE.Group>(null);
  const eyeMatL = useRef<THREE.MeshStandardMaterial>(null!);
  const eyeMatR = useRef<THREE.MeshStandardMaterial>(null!);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null!);
  const antennaMat = useRef<THREE.MeshStandardMaterial>(null!);
  const armLRef = useRef<THREE.Group>(null);
  const armRRef = useRef<THREE.Group>(null);

  const body = "#1e1b4b";
  const bodyE = "#0f0d2e";
  const accent = "#5b21b6";
  const accentE = "#3b0764";
  const panelC = "#4f46e5";
  const panelE = "#312e81";

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.45;
    }
    // Eye glow pulse
    const eyeInt = 1.4 + Math.sin(t * 2.2) * 0.8;
    if (eyeMatL.current) eyeMatL.current.emissiveIntensity = eyeInt;
    if (eyeMatR.current) eyeMatR.current.emissiveIntensity = eyeInt;
    // Core pulse
    if (coreMat.current) {
      coreMat.current.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.5;
    }
    // Antenna blink
    if (antennaMat.current) {
      antennaMat.current.emissiveIntensity = 1.2 + Math.sin(t * 4) * 0.9;
    }
    // Arms swing
    if (armLRef.current) armLRef.current.rotation.x = Math.sin(t * 0.9) * 0.18;
    if (armRRef.current) armRRef.current.rotation.x = -Math.sin(t * 0.9) * 0.18;
  });

  return (
    <Float speed={1.1} rotationIntensity={0} floatIntensity={1.2}>
      <group ref={groupRef} position={[0, 0.1, 0]} scale={0.88}>
        {/* ── HEAD ── */}
        <mesh position={[0, 2.15, 0]} castShadow>
          <boxGeometry args={[1.05, 0.9, 0.9]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.3} metalness={0.92} roughness={0.08} />
        </mesh>

        {/* Head top ridge */}
        <mesh position={[0, 2.65, 0]}>
          <boxGeometry args={[0.55, 0.12, 0.55]} />
          <meshStandardMaterial color={panelC} emissive={panelE} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Forehead visor strip */}
        <mesh position={[0, 2.42, 0.46]}>
          <boxGeometry args={[0.7, 0.14, 0.04]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Left Eye */}
        <mesh position={[-0.24, 2.18, 0.46]}>
          <boxGeometry args={[0.22, 0.13, 0.06]} />
          <meshStandardMaterial
            ref={eyeMatL}
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.8}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>
        {/* Eye glow orb L */}
        <mesh position={[-0.24, 2.18, 0.44]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.5} transparent opacity={0.35} />
        </mesh>

        {/* Right Eye */}
        <mesh position={[0.24, 2.18, 0.46]}>
          <boxGeometry args={[0.22, 0.13, 0.06]} />
          <meshStandardMaterial
            ref={eyeMatR}
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.8}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>
        {/* Eye glow orb R */}
        <mesh position={[0.24, 2.18, 0.44]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.5} transparent opacity={0.35} />
        </mesh>

        {/* Mouth bar */}
        <mesh position={[0, 1.9, 0.46]}>
          <boxGeometry args={[0.42, 0.07, 0.04]} />
          <meshStandardMaterial color="#7c3aed" emissive="#5b21b6" emissiveIntensity={1} metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Chin detail */}
        <mesh position={[0, 1.75, 0.3]}>
          <boxGeometry args={[0.35, 0.08, 0.45]} />
          <meshStandardMaterial color={panelC} emissive={panelE} emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* ── ANTENNA ── */}
        <mesh position={[0, 2.78, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.35, 8]} />
          <meshStandardMaterial color={panelC} emissive={panelE} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 3.01, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial
            ref={antennaMat}
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={2}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>

        {/* ── NECK ── */}
        <mesh position={[0, 1.67, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.25, 8]} />
          <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.2} metalness={0.92} roughness={0.08} />
        </mesh>

        {/* ── TORSO ── */}
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[1.35, 1.35, 0.82]} />
          <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
        </mesh>

        {/* Chest center core (octahedron) */}
        <mesh position={[0, 1.0, 0.42]}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            ref={coreMat}
            color="#8b5cf6"
            emissive="#7c3aed"
            emissiveIntensity={1.2}
            transparent
            opacity={0.95}
            metalness={0.5}
            roughness={0.15}
          />
        </mesh>
        {/* Core halo */}
        <mesh position={[0, 1.0, 0.4]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.6} transparent opacity={0.12} />
        </mesh>

        {/* Left chest panel */}
        <mesh position={[-0.32, 0.85, 0.42]}>
          <boxGeometry args={[0.28, 0.52, 0.04]} />
          <meshStandardMaterial color={panelC} emissive={panelE} emissiveIntensity={0.4} metalness={0.88} roughness={0.12} />
        </mesh>
        {/* Right chest panel */}
        <mesh position={[0.32, 0.85, 0.42]}>
          <boxGeometry args={[0.28, 0.52, 0.04]} />
          <meshStandardMaterial color={panelC} emissive={panelE} emissiveIntensity={0.4} metalness={0.88} roughness={0.12} />
        </mesh>

        {/* Bottom torso band */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.3, 0.18, 0.78]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.35} metalness={0.92} roughness={0.08} />
        </mesh>

        {/* ── SHOULDERS ── */}
        <mesh position={[-0.86, 1.42, 0]}>
          <sphereGeometry args={[0.3, 20, 20]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.4} metalness={0.92} roughness={0.08} />
        </mesh>
        <mesh position={[0.86, 1.42, 0]}>
          <sphereGeometry args={[0.3, 20, 20]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.4} metalness={0.92} roughness={0.08} />
        </mesh>

        {/* ── LEFT ARM GROUP ── */}
        <group ref={armLRef} position={[-1.02, 0.85, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.32, 1.05, 0.32]} />
            <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
          </mesh>
          {/* Elbow */}
          <mesh position={[0, -0.6, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.4} metalness={0.92} roughness={0.08} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0, -1.05, 0]}>
            <boxGeometry args={[0.28, 0.62, 0.28]} />
            <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -1.48, 0]}>
            <boxGeometry args={[0.32, 0.3, 0.32]} />
            <meshStandardMaterial color={panelC} emissive={panelE} emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* ── RIGHT ARM GROUP ── */}
        <group ref={armRRef} position={[1.02, 0.85, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.32, 1.05, 0.32]} />
            <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
          </mesh>
          <mesh position={[0, -0.6, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.4} metalness={0.92} roughness={0.08} />
          </mesh>
          <mesh position={[0, -1.05, 0]}>
            <boxGeometry args={[0.28, 0.62, 0.28]} />
            <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
          </mesh>
          <mesh position={[0, -1.48, 0]}>
            <boxGeometry args={[0.32, 0.3, 0.32]} />
            <meshStandardMaterial color={panelC} emissive={panelE} emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* ── WAIST ── */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[1.05, 0.3, 0.7]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.35} metalness={0.92} roughness={0.08} />
        </mesh>

        {/* ── LEFT LEG ── */}
        {/* Upper */}
        <mesh position={[-0.33, -0.52, 0]}>
          <boxGeometry args={[0.4, 0.88, 0.42]} />
          <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
        </mesh>
        {/* Knee */}
        <mesh position={[-0.33, -1.0, 0]}>
          <boxGeometry args={[0.42, 0.2, 0.44]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.45} metalness={0.92} roughness={0.08} />
        </mesh>
        {/* Lower */}
        <mesh position={[-0.33, -1.52, 0]}>
          <boxGeometry args={[0.37, 0.82, 0.4]} />
          <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
        </mesh>
        {/* Foot */}
        <mesh position={[-0.33, -2.02, 0.1]}>
          <boxGeometry args={[0.44, 0.2, 0.7]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.35} metalness={0.92} roughness={0.08} />
        </mesh>

        {/* ── RIGHT LEG ── */}
        <mesh position={[0.33, -0.52, 0]}>
          <boxGeometry args={[0.4, 0.88, 0.42]} />
          <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
        </mesh>
        <mesh position={[0.33, -1.0, 0]}>
          <boxGeometry args={[0.42, 0.2, 0.44]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.45} metalness={0.92} roughness={0.08} />
        </mesh>
        <mesh position={[0.33, -1.52, 0]}>
          <boxGeometry args={[0.37, 0.82, 0.4]} />
          <meshStandardMaterial color={body} emissive={bodyE} emissiveIntensity={0.18} metalness={0.92} roughness={0.08} />
        </mesh>
        <mesh position={[0.33, -2.02, 0.1]}>
          <boxGeometry args={[0.44, 0.2, 0.7]} />
          <meshStandardMaterial color={accent} emissive={accentE} emissiveIntensity={0.35} metalness={0.92} roughness={0.08} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── Orbiting particles around the robot ────────────────────────────────────
function RobotParticles() {
  const count = 180;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.12;
      ref.current.rotation.z = clock.elapsedTime * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#a78bfa" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

// ─── Holo ring orbiting the robot ───────────────────────────────────────────
function HoloRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.18;
      ref.current.rotation.z = clock.elapsedTime * 0.08;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.2, 0.01, 2, 100]} />
      <meshBasicMaterial color="#6d28d9" transparent opacity={0.3} />
    </mesh>
  );
}

// ─── Scene root ──────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 8.5], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 6, 4]} color="#8b5cf6" intensity={4} />
      <pointLight position={[-4, -3, 3]} color="#3b82f6" intensity={3} />
      <pointLight position={[0, 4, -4]} color="#22d3ee" intensity={2} />
      <pointLight position={[0, -2, 5]} color="#a78bfa" intensity={1.5} />

      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0.4} fade speed={0.4} />

      <Robot />
      <RobotParticles />
      <HoloRing />
    </Canvas>
  );
}
