import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ShiftInFocus() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-6 py-10 text-white"
      style={{
        background: 'linear-gradient(to bottom, transparent 55%, #ede8dd 100%), radial-gradient(ellipse at 50% 45%, #4a1878 0%, #210836 60%)',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingBottom: 80,
      }}
    >
      {/* Label */}
      <motion.p
        className="font-avenir-light text-xs mb-4 tracking-widest"
        style={{ color: '#b7a9ff', opacity: 0.95 }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 0.95, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        A shift in focus:
      </motion.p>

      {/* Main heading — Avenir Medium, "knowing" italic */}
      <motion.h2
        className="font-avenir-medium text-center leading-snug mb-4"
        style={{ fontSize: '1.65rem', maxWidth: 310, color: '#b7a9ff' }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Angel Investing isn&apos;t about{' '}
        <em className="font-avenir-medium" style={{ fontStyle: 'italic', color: '#b7a9ff' }}>knowing</em>{' '}
        more.
      </motion.h2>

      {/* Divider */}
      <motion.div
        className="mb-4"
        style={{ width: 52, height: 1, background: 'rgba(183,169,255,0.3)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Body — Avenir Next, "deciding better." bold */}
      <motion.p
        className="font-avenir-regular text-white text-center text-base leading-relaxed"
        style={{ maxWidth: 300, opacity: 0.95 }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 0.95, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        It&apos;s about{' '}
        <strong className="font-avenir-heavy text-white">deciding better.</strong>
      </motion.p>
    </section>
  )
}
