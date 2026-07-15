"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 400;

function createParticlePositions() {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 12;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  return arr;
}

const particlePositions = createParticlePositions();

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.3;
    meshRef.current.rotation.y = t * 0.15;

    const targetX = (state.pointer.x * viewport.width) / 8;
    const targetY = (state.pointer.y * viewport.height) / 8;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#cdff4c"
          attach="material"
          distort={0.45}
          speed={1.8}
          roughness={0.15}
          metalness={0.4}
          emissive="#7c5cff"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <Points ref={ref} positions={particlePositions} stride={3}>
      <PointMaterial
        transparent
        color="#f5f5f2"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <Suspense fallback={null}>
        <Blob />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
