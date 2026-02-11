import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountdown } from '../hooks/useCountdown'

const TARGET_DATE = import.meta.env.VITE_COUNTDOWN_DATE || '2025-09-01T00:00:00'
const APPLY_URL = import.meta.env.VITE_APPLY_URL || '#'

function CountBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-avenir-heavy text-white" style={{ fontSize: '1.45rem', lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-avenir-light text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <span className="font-avenir-heavy text-white text-xl self-start mt-1" style={{ opacity: 0.7 }}>
      :
    </span>
  )
}

export default function StickyCountdownFooter() {
  const triggerRef = useRef(null)
  const visible = useInView(triggerRef, { margin: '0px 0px -100px 0px' })
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE)

  return (
    <>
      {/* Invisible trigger element */}
      <div ref={triggerRef} style={{ height: 1 }} />

      <AnimatePresence>
        {visible && (
          <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-0 pointer-events-none">
            <div className="w-full max-w-[428px] mx-auto flex flex-col items-center pointer-events-auto">
              {/* Gray layer behind */}
              <motion.div 
                className="w-[92%] h-4 rounded-t-2xl bg-gray-400 opacity-20 translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.2, y: 8 }}
                exit={{ opacity: 0, y: 20 }}
              />
              
              <motion.div
                key="sticky-footer"
                className="relative w-full px-5 pt-5 pb-6 rounded-t-[32px] overflow-hidden"
                style={{ 
                  backgroundColor: '#0d1a2c',
                  borderTop: '0.5px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 -4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                {/* Subtle top inner glow */}
                <div 
                  className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" 
                  style={{ filter: 'blur(1px)' }}
                />

                <p className="font-avenir-regular text-center text-[15px] mb-2.5 text-white">
                  Next Program Starts in:
                </p>

                <div className="flex items-center justify-center gap-4 mb-4.5">
                  <CountBlock value={days} label="Days" />
                  <Colon />
                  <CountBlock value={hours} label="Hours" />
                  <Colon />
                  <CountBlock value={minutes} label="Minutes" />
                  <Colon />
                  <CountBlock value={seconds} label="Seconds" />
                </div>

                <div className="relative flex justify-center w-full px-2">
                  {/* Animated Glow behind button */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(165,243,252,0.6) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                      zIndex: 0,
                      margin: '0 auto',
                      width: '90%',
                      height: '100%'
                    }}
                    animate={{ 
                      opacity: [0.6, 0.9, 0.6],
                      scale: [0.95, 1.05, 0.95]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />

                  <motion.a
                    href={APPLY_URL}
                    className="relative z-10 font-avenir-heavy flex items-center justify-center w-full py-3.5 rounded-[18px] text-[17px] gap-2 shadow-2xl"
                    style={{ 
                      backgroundColor: '#fad46e', 
                      color: '#0d1a2c',
                      boxShadow: '0 0 15px rgba(165,243,252,0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ boxShadow: '0 0 10px rgba(165,243,252,0.3)' }}
                    animate={{ 
                      boxShadow: [
                        '0 0 10px rgba(165,243,252,0.3)',
                        '0 0 25px rgba(165,243,252,0.7)',
                        '0 0 10px rgba(165,243,252,0.3)'
                      ]
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    aria-label="Apply to Join SIA Angel Hub"
                  >
                    Apply to Join
                    <img 
                      src="/assets_mobile/flecha.svg" 
                      alt="" 
                      className="w-4 h-4" 
                      style={{ filter: 'brightness(0)' }}
                    />
                  </motion.a>
                </div>

                <p className="font-avenir-regular text-center text-[13px] mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  No commitment. Just orientation.
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
