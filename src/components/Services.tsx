import { motion, useInView } from 'framer-motion'
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
      {/* Background grid */}
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
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="text-white" size={28} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Hover gradient */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
