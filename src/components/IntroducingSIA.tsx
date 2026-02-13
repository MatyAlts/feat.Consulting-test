import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function IntroducingSIA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-6 text-center"
      style={{ background: '#EEE9DE', paddingTop: 40, paddingBottom: 0 }}
    >
      {/* Label — Avenir Light, #1c0831 */}
      <motion.p
        className="font-avenir-light mb-[3px]"
        style={{ color: '#1c0831', fontSize: 13 }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Introducing SIA Angel Hub
      </motion.p>

      {/* Main heading */}
      <motion.h2
        className="text-center leading-tight mb-[3px]"
        style={{ maxWidth: 320 }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* "Build Judgment through Action" — Avenir Heavy, #070c17 */}
        <span
          className="font-avenir-heavy"
          style={{ fontSize: '2rem', color: '#070c17', display: 'inline' }}
        >
          Build Judgment through Action{' '}
        </span>
        {/* "(not theory)" — Avenir Light italic */}
        <span
          className="font-avenir-light"
          style={{ fontSize: '1.75rem', color: '#070c17', fontStyle: 'italic', display: 'inline' }}
        >
          (not theory)
        </span>
      </motion.h2>

      {/* Subtitle — Avenir Next (regular), #344466 */}
      <motion.p
        className="font-avenir-regular text-sm text-center leading-relaxed mb-[34px]"
        style={{ color: '#344466', maxWidth: 300 }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Real startups. Real decisions. Real outcomes.
      </motion.p>
    </section>
  )
}
