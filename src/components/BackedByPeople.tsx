import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BackedByPeople() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative px-6 pt-2 pb-4 text-center"
      style={{ background: '#F5F0E8' }}
    >
      <motion.h2
        className="font-avenir-heavy leading-tight mb-[2px] text-center"
        style={{ fontSize: '1.75rem', color: '#060621' }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        … and Backed by People Who Do This for Real
      </motion.h2>

      <motion.p
        className="font-avenir-regular text-sm leading-relaxed text-center"
        style={{ color: '#202020', fontFamily: 'AvenirNext' }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        What changes when learning turns into real decisions.
      </motion.p>
    </section>
  )
}
