import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Check, Loader2 } from 'lucide-react'
import { downloadSourceCode } from '../utils/downloadSource'

export default function DownloadButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadSourceCode()
      setDownloading(false)
      setDone(true)
      setTimeout(() => {
        setDone(false)
        setIsOpen(false)
      }, 2000)
    } catch (error) {
      setDownloading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-72 p-5 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-500/10"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Télécharger le code</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-gray-400 text-xs mb-4">
              Téléchargez tout le code source du site DOVVYTECH en fichier ZIP.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>React + Three.js + Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Scènes 3D interactives</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Animations Framer Motion</span>
              </div>
            </div>
            <button
              onClick={handleDownload}
              disabled={downloading || done}
              className={`w-full py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                done
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
              }`}
            >
              {downloading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Préparation...
                </>
              ) : done ? (
                <>
                  <Check size={16} />
                  Téléchargé !
                </>
              ) : (
                <>
                  <Download size={16} />
                  Télécharger ZIP
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-shadow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? <X size={24} /> : <Download size={22} />}
      </motion.button>

      {/* Pulse animation */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  )
}
