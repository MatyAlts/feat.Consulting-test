import { useState, useEffect, useId, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useOutsideClick } from '../../hooks/use-outside-click'

const APPLY_URL = import.meta.env.VITE_APPLY_URL || '#'

const CARDS = [
  {
    emoji: '🌍',
    title: 'Designed to Integrate with Real Life',
    subtitle: 'Participate in live cohort sessions from wherever you are, with optional in-person moments at key points in the program.',
    body: 'The format is built to fit alongside a full professional life, without relocation or disruption.',
  },
  {
    emoji: '🧭',
    title: 'Expert-Guided Decision Making',
    subtitle: "You don't just hear conclusions; you learn how those conclusions are formed.",
    body: "Evaluation sessions are guided by experienced angels. Not lectures: facilitated discussions at the moments where tradeoffs matter.",
  },
  {
    emoji: '⬆️🚀',
    title: 'Real Startups,\nReal Decisions',
    subtitle: "You don't study examples. You participate in real investment decisions.",
    body: "You'll see 75+ early-stage startups across industries and stages, with real materials, and real timelines. Not every company will be a winner, and that's the point.",
  },
  {
    emoji: '🤝🗳️💬',
    title: 'Thinking Together,\nInvesting Together',
    subtitle: 'You see how others reason, disagree, and commit, with outcomes shared and discussed openly.',
    body: "Decisions are debated openly within the cohort. When it's time to act, participants commit individually, inside a shared decision environment, ensuring everyone's voice is heard.",
  },
];

export default function LearningByDoingDesktop() {
  const [active, setActive] = useState<(typeof CARDS)[number] | null>(null)
  const id = useId()
  const modalRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  // Keyboard + scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null) }
    document.body.style.overflow = active ? 'hidden' : 'auto'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = 'auto'
    }
  }, [active])

  useOutsideClick(modalRef, () => setActive(null))

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: '#f4f8ed' }}
    >
      {/* ── Backdrop ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Expanded card (modal) ────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-110 px-6">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={modalRef}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="w-full flex flex-row bg-[#0d1a2c] rounded-[40px] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
              style={{ maxWidth: 940, minHeight: 480 }}
            >
              {/* Left Identity Panel */}
              <div className="w-[45%] bg-[#122338] p-10 xl:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[60px]" />
                
                <motion.div 
                  layoutId={`emoji-${active.title}-${id}`} 
                  className="text-7xl mb-10 relative z-10 whitespace-nowrap"
                >
                  {active.emoji}
                </motion.div>
                
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="font-avenir-heavy text-white text-[34px] leading-[1.05] relative z-10 whitespace-pre-line tracking-tight"
                >
                  {active.title}
                </motion.h3>
              </div>

              {/* Right Content Panel */}
              <div className="flex-1 p-14 flex flex-col justify-center relative">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="space-y-8"
                >
                  <p className="font-avenir-regular text-[#FBD979] italic text-[22px] leading-tight">
                    {active.subtitle}
                  </p>
                  
                  <div className="w-16 h-px bg-white/10" />
                  
                  <p className="font-avenir-regular text-white/80 text-[18px] leading-relaxed">
                    {active.body}
                  </p>
                </motion.div>

                {/* Internal Close Button */}
                <button
                  onClickCapture={(e) => {
                    e.stopPropagation();
                    setActive(null);
                  }}
                  className="absolute top-10 right-10 p-2 text-white/30 hover:text-white transition-colors group"
                  aria-label="Close modal"
                >
                  <svg 
                    width="26" 
                    height="26" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                    className="group-hover:rotate-90 transition-transform duration-300"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Section body ─────────────────────────────────────────────── */}
      <div 
        className="relative z-10 flex items-center min-h-[90vh] w-full py-20 pr-10 xl:pr-24"
        style={{ padding: '0 81.5px' }}
      >

        {/* LEFT — text column */}
        <div 
          className="flex flex-col justify-center" 
          style={{ flex: '0 1 45%' }}
        >
          <motion.h2
            className="font-avenir-heavy leading-[1.05] text-[#0d1a2c] mb-8"
            style={{ fontSize: 'clamp(3rem, 5vw, 76px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Welcome to<br />Learning by Doing
          </motion.h2>

          <motion.p
            className="font-avenir-regular leading-relaxed mb-10 text-[#0d1a2c]/70"
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 20px)',
              maxWidth: 480,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            A 12-week, hands-on experience where learning happens inside real investor meetings, live decisions, and shared outcomes.
          </motion.p>

          <div className="flex flex-col items-start gap-4">
            <motion.a
              href={APPLY_URL}
              className="font-avenir-medium flex items-center justify-center gap-3 rounded-2xl"
              style={{
                color: '#0d1a2c',
                border: '1.5px solid #0d1a2c',
                background: 'transparent',
                fontSize: '1.1rem',
                padding: '18px 48px',
                width: 'fit-content',
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.22 }}
              whileHover={{ backgroundColor: '#0d1a2c', color: '#ffffff' }}
              whileTap={{ scale: 0.97 }}
              aria-label="Apply to Join SIA Angel Hub"
            >
              Apply to Join <span style={{ fontSize: '1.4rem' }}>↗</span>
            </motion.a>

            <motion.p
              className="font-avenir-regular opacity-40 ml-6"
              style={{ color: '#0d1a2c', fontSize: '0.85rem' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Participate from anywhere.
            </motion.p>
          </div>
        </div>

        {/* RIGHT — Card Grid Container */}
        <div className="flex-1 flex justify-end items-center" style={{ flex: '0 1 55%' }}>
          <motion.div
            className="grid grid-cols-2"
            style={{ gap: '17.15px' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {CARDS.map((card) => (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={card.title}
                onClick={() => setActive(card)}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex flex-col bg-[#0d1a2c] hover:bg-[#122338] rounded-[28px] cursor-pointer relative shadow-xl"
                style={{
                  width: 'clamp(280px, 22vw, 360px)',
                  height: 'clamp(280px, 21vw, 340px)',
                  padding: '2.5rem 2rem 1.5rem',
                  flexShrink: 1,
                }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  layoutId={`emoji-${card.title}-${id}`}
                  className="mb-8"
                  style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', whiteSpace: 'nowrap' }}
                >
                  {card.emoji}
                </motion.div>

                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-avenir-heavy text-white leading-[1.2] whitespace-pre-line tracking-tight"
                  style={{ fontSize: 'clamp(1.3rem, 1.8vw, 26px)' }}
                >
                  {card.title}
                </motion.h3>

                {/* "+" indicator - positioned absolutely so it does NOT affect flow */}
                <div
                  className="absolute bottom-6 right-6 text-white opacity-20 pointer-events-none"
                  style={{ fontSize: '1.6rem' }}
                >
                  +
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
