import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const CARDS = [
  {
    emoji: '\uD83C\uDF0D',
    title: 'Designed to Integrate with Real Life',
    subtitle: 'Participate in live cohort sessions from wherever you are, with optional in-person moments at key points in the program.',
    body: 'The format is built to fit alongside a full professional life, without relocation or disruption.',
  },
  {
    emoji: '\uD83E\uDDED',
    title: 'Expert-Guided Decision Making',
    subtitle: "You don't just hear conclusions; you learn how those conclusions are formed.",
    body: "Evaluation sessions are guided by experienced angels. Not lectures: facilitated discussions at the moments where tradeoffs matter.",
  },
  {
    emoji: '\u2B06\uFE0F\uD83D\uDE80',
    title: 'Real Startups, Real Decisions',
    subtitle: "You don't study examples. You participate in real investment decisions.",
    body: "You'll see 75+ early-stage startups across industries and stages, with real materials, and real timelines. Not every company will be a winner, and that's the point.",
  },
  {
    emoji: '\uD83E\uDD1D\uD83D\uDDF3\uFE0F\uD83D\uDCAC',
    title: 'Thinking Together, Investing Together',
    subtitle: 'You see how others reason, disagree, and commit, with outcomes shared and discussed openly.',
    body: "Decisions are debated openly within the cohort. When it's time to act, participants commit individually, inside a shared decision environment, ensuring everyone's voice is heard.",
  },
]

function FeatureCard({ card, index, onOpen }: {
  card: typeof CARDS[0]
  index: number
  onOpen: (index: number) => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="relative rounded-[20px] p-4 flex flex-col justify-between cursor-pointer aspect-square"
      style={{ background: '#0d1a2c' }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onOpen(index)}
    >
      <div>
        <div className="text-xl mb-3">{card.emoji}</div>
        <h3 className="font-avenir-medium text-white text-[16px] leading-tight pr-2">
          {card.title}
        </h3>
      </div>
      
      <div className="absolute bottom-3 right-4 opacity-30 text-white text-[14px]">
        +
      </div>
    </motion.div>
  )
}

export default function FeatureCardsGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (openIndex === null) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenIndex(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [openIndex])

  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openIndex])

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="px-5 pb-16" style={{ background: '#f4f7ec' }}>
      <motion.div
        className="grid grid-cols-2 gap-2.5 max-w-[400px] mx-auto"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        {CARDS.map((card, i) => (
          <FeatureCard key={i} card={card} index={i} onOpen={setOpenIndex} />
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {openIndex !== null && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-60"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpenIndex(null)}
            />

            <motion.div
              key="modal"
              className="fixed z-70 rounded-2xl p-7 shadow-2xl"
              style={{
                background: '#0d1a2c',
                left: '20px',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: '-45%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, y: '-45%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-label={CARDS[openIndex].title}
            >
              <div className="text-3xl mb-4">{CARDS[openIndex].emoji}</div>
              <h3 className="font-avenir-heavy text-white text-[22px] leading-tight mb-4 pr-6">
                {CARDS[openIndex].title}
              </h3>
              
              <div className="space-y-4">
                <p className="font-avenir-regular text-[15px] italic leading-relaxed"
                  style={{ color: '#F5C518' }}>
                  {CARDS[openIndex].subtitle}
                </p>
                <p className="font-avenir-regular text-[15px] leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {CARDS[openIndex].body}
                </p>
              </div>

              <button
                className="absolute top-5 right-5 flex items-center justify-center rounded-full text-white opacity-40 hover:opacity-100 transition-opacity"
                onClick={() => setOpenIndex(null)}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
