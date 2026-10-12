import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center">
        {/* 3D rotating logo */}
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

        {/* Loading bar */}
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
}
