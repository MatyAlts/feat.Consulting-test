import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { useScrollDirection } from '../hooks/useScrollDirection'

const TARGET_DATE = import.meta.env.VITE_COUNTDOWN_DATE || '2025-09-01T00:00:00'
const APPLY_URL = import.meta.env.VITE_APPLY_URL || '#'

function CountBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-avenir-heavy text-white" style={{ fontSize: '18.72px', lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-avenir-light mt-0.5" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <span className="font-avenir-heavy text-white self-start mt-0.5" style={{ fontSize: '18.72px', opacity: 0.7 }}>
      :
    </span>
  )
}

function CountdownInner() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE)

  return (
    <div className="w-full max-w-[428px] mx-auto flex flex-col items-center pointer-events-auto">
      {/* Gray shelf layer behind */}
      <div className="w-[92%] h-4 rounded-t-2xl bg-gray-400 opacity-20 translate-y-2 pointer-events-none" />
      
      <div
        className="relative w-full px-5 pt-4 pb-4 rounded-t-[32px] overflow-hidden"
        style={{ 
          // Changed to match Dark Zone precisely
          backgroundColor: '#1a1c25',
          borderTop: '0.5px solid rgba(255,255,255,0.2)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'
        }}
      >
        {/* Subtle top inner glow line */}
        <div 
          className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" 
          style={{ filter: 'blur(1px)' }}
        />

        <p className="font-avenir-regular text-center mb-2 text-white" style={{ fontSize: '16px' }}>
          Next Program Starts in:
        </p>

        <div className="flex items-center justify-center gap-4 mb-3.5">
          <CountBlock value={days} label="Days" />
          <Colon />
          <CountBlock value={hours} label="Hours" />
          <Colon />
          <CountBlock value={minutes} label="Minutes" />
          <Colon />
          <CountBlock value={seconds} label="Seconds" />
        </div>

        <div className="relative flex justify-center w-full px-3">
          {/* Pulsing Glow behind button */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{ 
              background: 'radial-gradient(circle, rgba(165,243,252,0.4) 0%, transparent 70%)',
              filter: 'blur(15px)',
              zIndex: 0,
              width: '90%',
              height: '100%',
              left: '5%'
            }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [0.98, 1.05, 0.98]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.a
            href={APPLY_URL}
            className="relative z-10 font-avenir-heavy flex items-center justify-center w-full py-2.5 rounded-[16px] text-[16px] gap-2 shadow-2xl"
            style={{ 
              backgroundColor: '#fad46e', 
              color: '#0d1a2c'
            }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: [
                '0 0 10px rgba(165,243,252,0.2)',
                '0 0 25px rgba(165,243,252,0.5)',
                '0 0 10px rgba(165,243,252,0.2)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Apply to Join SIA Angel Hub"
          >
            Apply to Join
            <img 
              src="/assets_mobile/flecha.svg" 
              alt="" 
              className="w-[8.5px] h-[8.5px]" 
              style={{ filter: 'brightness(0)' }}
            />
          </motion.a>
        </div>

        <p className="font-avenir-light text-center mt-2.5" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          No commitment. Just orientation.
        </p>
      </div>
    </div>
  )
}

interface Props {
  activated: boolean
  isAtSeeMore: boolean
}

export default function StickyCountdownFooter({ activated, isAtSeeMore }: Props) {
  const scrollDirection = useScrollDirection()
  const [hasReachedFaq, setHasReachedFaq] = useState(false)

  // When we reach "See more", suppress the sticky bar
  useEffect(() => {
    if (isAtSeeMore) {
      setHasReachedFaq(true)
    }
  }, [isAtSeeMore])

  // If scrolling up AND we're far enough from the "See more" area, reset the suppression
  useEffect(() => {
    // Reset only when scrolling up AND we are definitely out of the trigger zone
    if (scrollDirection === 'up' && !isAtSeeMore) {
      setHasReachedFaq(false)
    }
  }, [scrollDirection, isAtSeeMore])

  // Pure floating logic
  const isVisible = activated && !hasReachedFaq && scrollDirection === 'down'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="sticky-countdown-overlay"
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-0 pointer-events-none"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        >
          <CountdownInner />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
