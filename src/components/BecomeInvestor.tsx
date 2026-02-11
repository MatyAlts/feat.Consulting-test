import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BecomeInvestor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="px-6 py-12 text-center"
      style={{ background: '#f4f7ec', paddingBottom: 40 }}
    >
      <motion.h2
        className="font-avenir-heavy leading-none mb-3"
        style={{ fontSize: '2rem', color: '#060621' }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        Become the Investor
        <br />
        You Want to Be
      </motion.h2>

      <motion.p
        className="font-avenir-regular"
        style={{ color: '#202020', margin: '0 auto', fontSize: '13.51px', fontFamily: 'AvenirNext', whiteSpace: 'nowrap' }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        What happens when learning turns into real decisions.
      </motion.p>
    </section>
  )
}
