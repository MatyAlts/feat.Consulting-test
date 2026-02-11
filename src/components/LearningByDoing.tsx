import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function LearningByDoing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 pt-0 pb-8"
      style={{ background: '#f4f7ec' }}
    >
      <motion.h2
        className="font-avenir-heavy text-center leading-[1.1] mb-6 text-[#0d1a2c]"
        style={{ fontSize: '1.9rem' }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Welcome to Learning
        <br />
        by Doing
      </motion.h2>

      <motion.p
        className="font-avenir-regular text-center text-[15px] leading-snug"
        style={{ color: '#0d1a2c', maxWidth: 350, opacity: 0.8 }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 0.8, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        A 12-week, hands-on experience where learning happens inside real investor meetings, live decisions, and shared outcomes.
      </motion.p>
    </section>
  )
}
