import JSZip from 'jszip'
import { saveAs } from 'file-saver'

// All source files content
const files: Record<string, string> = {
  'package.json': `{
  "name": "dovvytech-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-three/drei": "^9.92.7",
    "@react-three/fiber": "^8.15.12",
    "framer-motion": "^11.16.1",
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.7",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.1.7",
    "typescript": "^5.7.0",
    "vite": "^6.3.5"
  }
}`,

  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src"]
}`,

  'vite.config.ts': `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});`,

  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOVVYTECH - Future of Technology</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

  'src/main.tsx': `import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);`,

  'src/index.css': `@import "tailwindcss";

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #000;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #000;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #22d3ee, #a78bfa);
  }
}

@layer components {
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

@layer utilities {
  .text-gradient {
    background: linear-gradient(to right, #06b6d4, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}`,

  'src/App.tsx': `import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Tech3D from './components/Tech3D'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Tech3D />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </div>
  )
}

export default App`,

  'src/components/Loader.tsx': `import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative w-32 h-32"
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg transform rotate-45 opacity-80" />
          <div className="absolute inset-2 border-2 border-purple-500 rounded-lg transform rotate-12 opacity-60" />
          <div className="absolute inset-4 border-2 border-blue-400 rounded-lg transform -rotate-12 opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              D
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-xl font-bold tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            DOVVYTECH
          </span>
        </motion.div>

        <motion.div
          className="mt-6 w-48 h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}`,

  'src/components/Navbar.tsx': `import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Technology', href: '#technology' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-300 \${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }\`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-black text-lg">
            D
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            DOVVYTECH
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Get Started
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}`,

  'src/components/Hero.tsx': `import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Scene3D from './Scene3D'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20 z-[1]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <span className="text-cyan-400 text-sm font-medium">🚀 Next-Gen Technology Solutions</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Building the
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Digital Future
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          DOVVYTECH delivers cutting-edge solutions in AI, cloud computing, and immersive 3D experiences that transform businesses and redefine possibilities.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#services"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:scale-105"
          >
            Explore Services
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
          >
            Learn More
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold text-cyan-400">500+</div>
            <div className="text-gray-500 text-sm">Projects</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-purple-400">99%</div>
            <div className="text-gray-500 text-sm">Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-400">24/7</div>
            <div className="text-gray-500 text-sm">Support</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-cyan-400" size={28} />
      </motion.div>
    </section>
  )
}`,

  'src/components/Scene3D.tsx': `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Box } from '@react-three/drei'
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
}`,

  'src/components/About.tsx': `import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Cpu, Globe, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'AI-Powered',
    description: 'Leveraging cutting-edge artificial intelligence to solve complex problems and automate processes.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Deploying solutions across the globe with scalable cloud infrastructure and CDN networks.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with sub-millisecond response times and edge computing capabilities.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Enterprise-grade security with zero-trust architecture and end-to-end encryption.',
    color: 'from-green-400 to-emerald-500',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">About Us</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Pioneering Innovation
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            At DOVVYTECH, we merge creativity with technology to build solutions that push boundaries. Our team of experts is dedicated to transforming ideas into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={\`w-12 h-12 rounded-xl bg-gradient-to-br \${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform\`}>
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
            <p className="text-xl md:text-2xl text-gray-300 italic max-w-3xl">
              "Our mission is to empower businesses with transformative technology that drives growth, efficiency, and innovation in an ever-evolving digital landscape."
            </p>
            <div className="mt-4 text-cyan-400 font-medium">— DOVVYTECH Vision</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}`,

  'src/components/Services.tsx': `import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Cloud, Brain, Layers, Smartphone, BarChart3 } from 'lucide-react'

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Custom AI models, natural language processing, computer vision, and predictive analytics solutions.',
    gradient: 'from-cyan-500 to-blue-600',
    features: ['NLP Solutions', 'Computer Vision', 'Predictive Models', 'Deep Learning'],
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Scalable cloud infrastructure design, migration, and management across AWS, Azure, and GCP.',
    gradient: 'from-purple-500 to-pink-600',
    features: ['Multi-Cloud', 'Auto-Scaling', 'Cost Optimization', 'DevOps'],
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Full-stack web applications with modern frameworks, real-time features, and stunning UI/UX.',
    gradient: 'from-blue-500 to-indigo-600',
    features: ['React/Next.js', 'API Design', 'Real-time Apps', 'Progressive Web Apps'],
  },
  {
    icon: Layers,
    title: '3D & Immersive Tech',
    description: 'WebGL experiences, AR/VR applications, 3D visualization, and interactive digital environments.',
    gradient: 'from-emerald-500 to-teal-600',
    features: ['WebGL/Three.js', 'AR/VR Experiences', '3D Modeling', 'Virtual Tours'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps with native performance, offline capabilities, and beautiful design.',
    gradient: 'from-orange-500 to-red-600',
    features: ['React Native', 'iOS & Android', 'Offline-First', 'Push Notifications'],
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Business intelligence, data warehousing, real-time dashboards, and actionable insights.',
    gradient: 'from-yellow-500 to-amber-600',
    features: ['BI Dashboards', 'Data Pipelines', 'Real-time Analytics', 'ETL Solutions'],
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What We Offer
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive technology solutions tailored to your business needs. From concept to deployment, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={\`w-14 h-14 rounded-2xl bg-gradient-to-br \${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300\`}>
                <service.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span key={feature} className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10">
                    {feature}
                  </span>
                ))}
              </div>
              <div className={\`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br \${service.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500\`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`,

  'src/components/Tech3D.tsx': `import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Torus, Octahedron } from '@react-three/drei'
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
                      animate={isInView ? { width: \`\${tech.level}%\` } : {}}
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
}`,

  'src/components/Contact.tsx': `import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Let's Build Together
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to start your next project? Get in touch with our team and let's create something extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-white">hello@dovvytech.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Phone</div>
                    <div className="text-white">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Location</div>
                    <div className="text-white">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
                <a key={social} href="#" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Your Name</label>
                <input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all" placeholder="John Doe" required />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Email Address</label>
                <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Message</label>
                <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all h-32 resize-none" placeholder="Tell us about your project..." required />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group">
                {submitted ? '✓ Message Sent!' : (<>Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}`,

  'src/components/Footer.tsx': `export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: ['About Us', 'Careers', 'Blog', 'Press'],
    Services: ['AI Solutions', 'Cloud Services', 'Web Development', 'Mobile Apps'],
    Resources: ['Documentation', 'API Reference', 'Case Studies', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  }

  return (
    <footer className="relative border-t border-white/10 bg-black/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-black text-lg">D</div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">DOVVYTECH</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Building the future of technology with innovative solutions in AI, cloud computing, and immersive experiences.
            </p>
            <div className="flex gap-3">
              {['X', 'Li', 'Gh', 'Dc'].map((icon) => (
                <a key={icon} href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-xs hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4 text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {currentYear} DOVVYTECH. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Crafted with ❤️ and cutting-edge technology</p>
        </div>
      </div>
    </footer>
  )
}`,

  'README.md': `# DOVVYTECH - 3D Website

A stunning 3D website built with React, Three.js, and Tailwind CSS.

## 🚀 Features

- Interactive 3D scenes with Three.js
- Smooth animations with Framer Motion
- Responsive design with Tailwind CSS
- Modern glassmorphism UI
- Dark theme with gradient accents

## 🛠️ Tech Stack

- **React** - UI framework
- **Three.js** / **React Three Fiber** - 3D rendering
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **TypeScript** - Type safety

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

## 🏃 Development

\`\`\`bash
npm run dev
\`\`\`

## 🏗️ Build

\`\`\`bash
npm run build
\`\`\`

## 📁 Project Structure

\`\`\`
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Loader.tsx
│   │   ├── Navbar.tsx
│   │   ├── Scene3D.tsx
│   │   ├── Services.tsx
│   │   └── Tech3D.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
\`\`\`

## 🎨 Customization

- Change colors in the gradient classes (cyan, purple, blue)
- Modify 3D objects in Scene3D.tsx and Tech3D.tsx
- Update content in each component file
- Adjust animations in Framer Motion props

## 📄 License

MIT License - feel free to use this project!
`,
}

export async function downloadSourceCode() {
  const zip = new JSZip()

  // Add all files to the zip
  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content)
  })

  // Generate the zip file
  const blob = await zip.generateAsync({ type: 'blob' })

  // Download the file
  saveAs(blob, 'dovvytech-website.zip')
}
