import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const TARGET_DATE = import.meta.env.VITE_COUNTDOWN_DATE || '2025-09-01T00:00:00'
const APPLY_URL   = import.meta.env.VITE_APPLY_URL   || '#'

// ── Countdown block ───────────────────────────────────────────────────────────
function CountBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-avenir-heavy text-white"
        style={{ fontSize: '23.11px', lineHeight: 1 }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        className="font-avenir-light mt-1"
        style={{ fontSize: '12.35px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}
      >
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <span
      className="font-avenir-heavy text-white self-start"
      style={{ fontSize: '23.11px', opacity: 0.6, marginTop: 1 }}
    >
      :
    </span>
  )
}

// ── Inner bar ─────────────────────────────────────────────────────────────────
function FooterBar() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE)

  return (
    <div
      className="w-full flex items-center"
      style={{
        backgroundColor: '#1a1c25',
        borderTop: '0.5px solid rgba(255,255,255,0.15)',
        height: 80,
        padding: '0 85.34px',
      }}
    >
      {/* Left — label + countdown */}
      <div className="flex items-center shrink-0" style={{ gap: '40px' }}>
        {/* Label */}
        <div className="flex flex-col leading-tight whitespace-nowrap">
          <span className="font-avenir-regular text-white" style={{ fontSize: '17.73px' }}>
            Next Program
          </span>
          <span className="font-avenir-regular text-white" style={{ fontSize: '17.73px' }}>
            Starts in:
          </span>
        </div>

        {/* Numbers */}
        <div className="flex items-center gap-4">
          <CountBlock value={days}    label="Days"    />
          <Colon />
          <CountBlock value={hours}   label="Hours"   />
          <Colon />
          <CountBlock value={minutes} label="Minutes" />
          <Colon />
          <CountBlock value={seconds} label="Seconds" />
        </div>
      </div>

      {/* FIXED GAP 40px between Countdown and Button */}
      <div style={{ width: '40px' }} className="shrink-0" />

      {/* Center — CTA button (taking available space) */}
      <div className="flex-1 relative flex items-center">
        {/* Pulsing glow */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(250,212,110,0.35) 0%, transparent 70%)',
            filter: 'blur(18px)',
          }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.97, 1.04, 0.97] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.a
          href={APPLY_URL}
          className="relative font-avenir-heavy flex items-center justify-center rounded-full gap-2 w-full"
          style={{
            backgroundColor: '#fad46e',
            color: '#0d1a2c',
            height: 48,
            fontSize: '1rem',
            minWidth: 260,
          }}
          whileHover={{ backgroundColor: '#f5c842' }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              '0 0 12px rgba(250,212,110,0.25)',
              '0 0 28px rgba(250,212,110,0.55)',
              '0 0 12px rgba(250,212,110,0.25)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Apply to Join SIA Angel Hub"
        >
          Apply to Join
          <img
            src="/assets_mobile/flecha.svg"
            alt=""
            style={{ width: 9, height: 9, filter: 'brightness(0)' }}
          />
        </motion.a>
      </div>

      {/* FIXED GAP 21.09px between Button and Disclaimer */}
      <div style={{ width: '21.09px' }} className="shrink-0" />

      {/* Right — disclaimer */}
      <div className="flex flex-col items-end shrink-0 text-right whitespace-nowrap">
        <span
          className="font-avenir-light"
          style={{ fontSize: '14.51px', lineHeight: 1.2, color: '#F5F5F5' }}
        >
          No commitment.
        </span>
        <span
          className="font-avenir-light"
          style={{ fontSize: '14.51px', lineHeight: 1.2, color: '#F5F5F5' }}
        >
          Just orientation.
        </span>
      </div>
    </div>
  )
}

// ── Exported component ────────────────────────────────────────────────────────
interface Props {
  activated: boolean
  externallySuppressed?: boolean
}

export default function StickyCountdownFooterDesktop({ activated, externallySuppressed = false }: Props) {
  const scrollDirection = useScrollDirection()
  const [suppressed, setSuppressed] = useState(false)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)

  // Track if we ever reached the end to "lock" it hidden
  useEffect(() => {
    if (externallySuppressed) {
      setHasReachedEnd(true)
    }
  }, [externallySuppressed])

  // Reset the "lock" when scrolling up
  useEffect(() => {
    if (scrollDirection === 'up') {
      setSuppressed(true)
      setHasReachedEnd(false) // Unlock when user goes back up
    } else if (scrollDirection === 'down') {
      setSuppressed(false)
    }
  }, [scrollDirection])

  const isVisible = activated && !suppressed && !externallySuppressed && !hasReachedEnd

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="sticky-footer-desktop"
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 240 }}
        >
          <FooterBar />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
