import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const LOGOS = Array.from({ length: 5 }, (_, i) => `/assets_mobile/trusted_by (${i + 1}).png`)

export default function TrustedByLogos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="px-4 pt-0 pb-10"
      style={{ background: '#f4f7ec', paddingBottom: 40 }}
    >
      <motion.p
        className="font-avenir-regular text-center mb-5 tracking-widest"
        style={{ color: '#6B7280', fontSize: 13.25, fontFamily: 'AvenirNext' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        Trusted by
      </motion.p>

      <motion.div
        className="flex items-center justify-around gap-3 flex-wrap"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {LOGOS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Trusted partner ${i + 1}`}
            className="object-contain"
            style={{ height: 36, filter: 'grayscale(30%)' }}
            loading="lazy"
          />
        ))}
      </motion.div>
    </section>
  )
}
