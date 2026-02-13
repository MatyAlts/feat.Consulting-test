import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import BecomeInvestor from './BecomeInvestor'
import InvestorCardStack from './InvestorCardStack'
import FindYourPlace from './FindYourPlace'

export default function DarkZone() {
  const zoneRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (!triggerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger entered the viewport → go dark
          setDark(true)
        } else if (entry.boundingClientRect.top > 0) {
          // Trigger left the viewport from the BOTTOM 
          // (user scrolled back up past it) → revert to light
          setDark(false)
        }
        // If trigger left from the TOP (user scrolled further down),
        // we do nothing → dark stays true
      },
      { rootMargin: '0px 0px -20% 0px' }
    )

    observer.observe(triggerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={zoneRef} className="relative overflow-hidden" style={{ background: '#f4f7ec' }}>
      {/* SINGLE dark curtain covering ALL 3 sections */}
      <motion.div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{ background: '#1a1c25', transformOrigin: 'bottom' }}
        animate={{ scaleY: dark ? 1 : 0 }}
        transition={{ 
          duration: dark ? 0.8 : 1.4, 
          ease: dark ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1],
        }}
      />

      {/* Content sits above the curtain */}
      <div className="relative z-10">
        <BecomeInvestor dark={dark} />
        <InvestorCardStack triggerRef={triggerRef} />
        <FindYourPlace dark={dark} />
      </div>
    </div>
  )
}
