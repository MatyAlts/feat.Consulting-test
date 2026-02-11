import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const APPLY_URL = import.meta.env.VITE_APPLY_URL || '#'

export default function FindYourPlace() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-6 py-14 text-center relative"
      style={{ 
        background: 'linear-gradient(to bottom, #ffffff 60%, #f2f2f2 100%)', 
        paddingBottom: 80 
      }}
    >
      <motion.h2
        className="font-avenir-heavy leading-tight mb-4"
        style={{ fontSize: '1.75rem', color: '#060621', maxWidth: 300 }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        Find Your Place in the Investing Journey
      </motion.h2>

      <motion.p
        className="font-avenir-regular text-sm leading-relaxed mb-8"
        style={{ color: '#202020', maxWidth: 320, fontFamily: 'AvenirNext' }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        A 2-minute assessment to understand where you are today (and what typically comes next).
      </motion.p>

      <motion.a
        href={APPLY_URL}
        className="font-avenir-medium text-white flex items-center justify-center rounded-2xl py-4 text-base mb-2 px-6 w-full"
        style={{ 
          backgroundColor: '#09092c', 
          border: '1.5px solid #fbd979',
          maxWidth: 380 
        }}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        whileHover="hover"
        whileTap="tap"
        variants={{
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          hover: { 
            backgroundColor: '#fbd979',
            color: '#09092c',
          },
          tap: { 
            scale: 0.97,
            backgroundColor: '#fbd979',
            color: '#09092c',
          }
        }}
        transition={{ 
          duration: 0.25, 
          ease: "easeInOut",
        }}
        aria-label="See if SIA is right for you"
      >
        <span className="mr-2">See if SIA is right for you</span>
        <motion.img 
          src="/assets_mobile/flecha.svg" 
          alt="" 
          className="w-[10px] h-[10px]" 
          variants={{
            initial: { filter: 'brightness(0) invert(1)' },
            animate: { filter: 'brightness(0) invert(1)' },
            hover: { filter: 'brightness(0) invert(0)' },
            tap: { filter: 'brightness(0) invert(0)' }
          }}
        />
      </motion.a>

      <motion.p
        className="font-avenir-regular mt-2"
        style={{ color: '#2d344e', fontSize: 13, fontFamily: 'AvenirNext' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        No commitment. Just a starting point.
      </motion.p>
    </section>
  )
}
