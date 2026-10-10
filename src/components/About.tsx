import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
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
      {/* Background effects */}
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
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Mission statement */}
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
}
