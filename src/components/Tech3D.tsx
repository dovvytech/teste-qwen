import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Torus, Octahedron, Text3D, Center, Environment } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'

function RotatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Octahedron ref={meshRef} args={[1.5, 0]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Octahedron>
    </Float>
  )
}

function OrbitalRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5
    }
  })

  return (
    <Torus ref={meshRef} args={[radius, 0.02, 16, 100]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
    </Torus>
  )
}

function TechScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" angle={0.3} penumbra={1} />

      <RotatingOctahedron />
      <OrbitalRing radius={2.5} speed={0.5} color="#06b6d4" />
      <OrbitalRing radius={3} speed={-0.3} color="#8b5cf6" />
      <OrbitalRing radius={3.5} speed={0.4} color="#3b82f6" />
    </>
  )
}

const techStack = [
  { name: 'React', level: 95 },
  { name: 'Python', level: 90 },
  { name: 'Three.js', level: 88 },
  { name: 'AWS', level: 92 },
  { name: 'TensorFlow', level: 85 },
  { name: 'Docker', level: 88 },
]

export default function Tech3D() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="technology" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visual */}
          <motion.div
            className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-black/50"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
              <Suspense fallback={null}>
                <TechScene />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Tech Stack Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Our Tech Stack</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Powered by Modern Tech
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              We use the latest technologies and frameworks to build robust, scalable, and future-proof solutions for our clients.
            </p>

            <div className="space-y-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-white font-medium text-sm">{tech.name}</span>
                    <span className="text-cyan-400 text-sm">{tech.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${tech.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
