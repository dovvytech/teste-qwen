import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Box, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[2.5, 0.08, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.1} />
      </Torus>
    </Float>
  )
}

function FloatingTorus2() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1}>
      <Torus ref={meshRef} args={[3, 0.05, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} />
      </Torus>
    </Float>
  )
}

function SmallCubes() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const cubes = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2
    const radius = 4 + Math.random() * 2
    return {
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius - 2,
      ] as [number, number, number],
      scale: 0.05 + Math.random() * 0.1,
      color: ['#06b6d4', '#8b5cf6', '#3b82f6', '#ec4899'][Math.floor(Math.random() * 4)],
    }
  })

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={1 + Math.random() * 2} floatIntensity={0.5}>
          <Box args={[cube.scale, cube.scale, cube.scale]} position={cube.position}>
            <meshStandardMaterial color={cube.color} emissive={cube.color} emissiveIntensity={0.5} />
          </Box>
        </Float>
      ))}
    </group>
  )
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 500

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#06b6d4" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[5, -3, 3]} intensity={0.5} color="#06b6d4" />

      <AnimatedSphere />
      <FloatingTorus />
      <FloatingTorus2 />
      <SmallCubes />
      <Particles />
    </>
  )
}
