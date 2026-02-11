import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ReadyNextStep() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 pt-12 pb-20"
      style={{ background: '#f2f2f2' }}
    >
      {/* Zoom Image Section */}
      <div className="relative w-full max-w-[360px] flex flex-col items-center z-0">
        <div className="relative w-full h-[220px] flex items-center justify-center">
          {/* Background container SVG (The Zoom window frame) */}
          <img 
            src="/assets_mobile/zoom_container.svg" 
            alt="" 
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0, objectFit: 'contain' }}
          />
          
          {/* Blurred Zoom Image - Positioned to fit inside the frame's content area */}
          <motion.img
            src="/assets_mobile/zoom.png"
            alt="Team video call"
            className="rounded-lg object-cover"
            style={{ 
              width: '90%',
              height: '142px',
              marginTop: '-4px', // Center vertically within the content area
              filter: 'blur(3.5px)',
              zIndex: 1,
              position: 'relative'
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55 }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Overlapping White Info Card */}
      <motion.div
        className="relative bg-white w-full max-w-[360px] rounded-[40px] px-8 pt-10 pb-10 flex flex-col items-center text-center shadow-xl shadow-gray-200/50"
        style={{ marginTop: '-45px', zIndex: 2 }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2
          className="font-avenir-heavy leading-none mb-3"
          style={{ fontSize: '1.95rem', color: '#0d1a2c' }}
        >
          Ready for the
          <br />
          Next Step?
        </h2>

        <p
          className="font-avenir-regular text-[15px] leading-snug mb-9"
          style={{ color: '#4b5563', maxWidth: 280, fontFamily: 'AvenirNext' }}
        >
          If you're serious about learning through real decisions, let's talk.
        </p>

        <motion.a
          href={import.meta.env.VITE_APPLY_URL || '#'}
          className="font-avenir-medium bg-[#0052cc] text-white flex items-center justify-center rounded-2xl py-4 text-base px-10 w-full shadow-lg shadow-blue-600/20"
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          variants={{
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            hover: { backgroundColor: '#0043a4' },
            tap: { scale: 0.98 }
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          aria-label="Start a Conversation"
        >
          <span className="mr-2">Start a Conversation</span>
          <img src="/assets_mobile/flecha.svg" alt="" className="w-[11px] h-[11px] invert brightness-200" />
        </motion.a>
      </motion.div>
    </section>
  )
}
