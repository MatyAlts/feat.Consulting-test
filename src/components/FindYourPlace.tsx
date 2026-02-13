import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const APPLY_URL = import.meta.env.VITE_APPLY_URL || '#'

export default function FindYourPlace({ dark }: { dark: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-6 pt-[47px] pb-14 text-center"
      style={{ paddingBottom: '69px' }}
    >
      <motion.h2
        className="font-avenir-heavy leading-tight mb-[2px]"
        style={{ fontSize: '1.75rem', maxWidth: 300 }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          y: inView ? 0 : 14,
          color: dark ? '#ffffff' : '#060621',
        }}
        transition={{ duration: 0.55 }}
      >
        Find Your Place in the Investing Journey
      </motion.h2>

      <motion.p
        className="font-avenir-regular text-sm leading-relaxed mb-[11px]"
        style={{ maxWidth: 320, fontFamily: 'AvenirNext' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          y: inView ? 0 : 10,
          color: dark ? 'rgba(255,255,255,0.6)' : '#202020',
        }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        A 2-minute assessment to understand where you are today (and what typically comes next).
      </motion.p>

      <motion.a
        href={APPLY_URL}
        className="font-avenir-medium flex items-center justify-center rounded-2xl py-4 text-base mb-[3px] px-6 w-full"
        style={{ maxWidth: 380, borderStyle: 'solid' }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          scale: inView ? 1 : 0.96,
          backgroundColor: dark ? '#fbd979' : '#09092c',
          color: dark ? '#09092c' : '#ffffff',
          borderColor: '#fbd979',
          borderWidth: dark ? 0 : 1.5,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        aria-label="See if SIA is right for you"
      >
        <span className="mr-2 font-avenir-medium">See if SIA is right for you</span>
        <motion.img 
          src="/assets_mobile/flecha.svg" 
          alt="" 
          className="w-[8.5px] h-[8.5px]" 
          animate={{
            filter: dark ? 'brightness(0)' : 'brightness(0) invert(1)',
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.a>

      <motion.p
        className="font-avenir-regular mt-0"
        style={{ fontSize: 13, fontFamily: 'AvenirNext' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: inView ? 1 : 0,
          color: dark ? 'rgba(255,255,255,0.5)' : '#2d344e',
        }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        No commitment. Just a starting point.
      </motion.p>
    </section>
  )
}
