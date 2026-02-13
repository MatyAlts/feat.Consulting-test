import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const CARDS = [
  {
    image: '/assets_mobile/investor_card_1.png',
    title: 'You see how investment decisions are formed',
    subtitle: '(not just chosen)',
    preview: "You'll recognize how real decisions come together: ho...",
    body: "You'll recognize how real decisions come together: how seasoned investors frame uncertainty, debate tradeoffs, and commit capital under pressure. You're not watching from outside the room — you're in it.",
  },
  {
    image: '/assets_mobile/investor_card_2.png',
    title: 'You stop confusing great businesses with great investments',
    subtitle: '',
    preview: "You'll be able to tell when a strong company is not nece...",
    body: "You develop the critical eye to separate a compelling pitch from a fundable business. Pattern recognition built through dozens of real evaluations — not textbooks, not simulations.",
  },
  {
    image: '/assets_mobile/investor_card_3.png',
    title: 'You become an investor.',
    subtitle: "You don't just learn investing.",
    preview: "Not by watching, but by deciding. You'll commit when it...",
    body: "By the end, you've co-invested in a real startup alongside your cohort. An actual commitment, with real capital. Not a case study. Not a mock deal. A decision you made and own.",
  },
]

function InvestorCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      layout
      className="overflow-hidden rounded-2xl"
      style={{ background: '#1a1c25' }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      {/* Top: photo + title block */}
      <div className="flex gap-3 p-3">
        <img
          src={card.image}
          alt=""
          className="rounded-xl object-cover shrink-0"
          style={{ width: 110, height: 110 }}
          loading="lazy"
        />
        <div className="flex flex-col justify-center pt-1">
          {index === 2 ? (
            <>
              <p className="leading-tight mb-1" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans', fontWeight: 100 }}>
                {card.subtitle}
              </p>
              <p className="text-white leading-tight" style={{ fontSize: '1.45rem', fontFamily: 'DM Sans', fontWeight: 400 }}>
                {card.title}
              </p>
            </>
          ) : (
            <>
              <p className="text-white leading-tight mb-0.5" style={{ fontSize: '1.35rem', fontFamily: 'DM Sans', fontWeight: 400 }}>
                {card.title}
              </p>
              {card.subtitle && (
                <p className="leading-tight" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.35rem', fontFamily: 'DM Sans', fontWeight: 100 }}>
                  {card.subtitle}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom: description preview + expand button */}
      <div className="flex items-center gap-2 px-4 pb-4">
        <p
          className="font-avenir-regular text-[13px] flex-1"
          style={{
            color: 'rgba(255,255,255,0.6)',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {card.preview}
        </p>
        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 flex items-center justify-center font-avenir-heavy"
          style={{ background: 'transparent', color: '#fbd979', fontSize: '1.2rem' }}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ lineHeight: 1 }}
          >
            +
          </motion.span>
        </button>
      </div>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p
              className="font-avenir-regular text-sm leading-relaxed px-3 pb-4"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {card.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function InvestorCardStack({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="px-4 pb-4 pt-0">
      <div className="flex flex-col gap-3">
        {CARDS.map((card, i) => (
          <React.Fragment key={i}>
            {/* Trigger right before second card */}
            {i === 2 && <div ref={triggerRef} style={{ height: 1, marginBottom: -1 }} />}
            <InvestorCard card={card} index={i} />
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
