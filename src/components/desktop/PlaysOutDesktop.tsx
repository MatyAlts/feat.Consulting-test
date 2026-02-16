import { useRef, useEffect, forwardRef, useCallback, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Data ─────────────────────────────────────────────────────────────────────
const CARDS = [
  {
    image: '/assets_mobile/plays_out_pic1.png',
    title: 'Engage in Live Investment Opportunities',
    subtitle: 'Live companies. Real timelines. Actual stakes.',
    body: 'You work with our pool of active startups, tangible materials, and real timelines — not case studies or simulations.\n\nYou evaluate opportunities as they unfold, discuss tradeoffs with peers, and co-invest in live deals.\n\nBy the end, this isn\'t theoretical exposure. It\'s experience you can recognize and reuse.',
  },
  {
    image: '/assets_mobile/plays_out_pic2.png',
    title: 'Sharpen Your Thinking with Other Investors',
    subtitle: 'Judgment is formed in interaction, not isolation.',
    body: 'You challenge assumptions, weigh perspectives, and pressure-test decisions alongside a diverse group of thoughtful investors, in real time.',
  },
  {
    image: '/assets_mobile/plays_out_pic3.png',
    title: 'Make an Investment Together',
    subtitle: 'From discussion to commitment.',
    body: 'You move from debate to action by co-investing with peers, pooling judgment, sharing responsibility, and committing capital together.',
  },
  {
    image: '/assets_mobile/plays_out_pic4.png',
    title: 'Forge Your Investor Lens',
    subtitle: 'The perspective you\'ll use in every future investment.',
    body: 'Through repeated real decisions, you emerge with a personal investment perspective — a repeatable way to assess risk, quality, and fit on your own terms.',
  },
]

// 0 = complete overlap (next card fully covers the previous)
const STACK_OFFSET = 12
// top offset = space for the sticky "Here's how that plays out:" bar
const TITLE_OFFSET = 100

// ── Card ──────────────────────────────────────────────────────────────────────
const PlaysOutCardDesktop = forwardRef<
  HTMLDivElement,
  { card: (typeof CARDS)[0]; index: number; imageRight: boolean }
>(({ card, index, imageRight }, ref) => {
  const stickyTop = TITLE_OFFSET + index * STACK_OFFSET

  // Text panel
  const textPanel = (
    <div
      className="relative flex flex-col justify-center px-16 xl:px-20 overflow-hidden"
      style={{ width: '45%', flexShrink: 0 }}
    >
      {/* Title */}
      <h3
        className="font-avenir-heavy text-white leading-tight mb-4"
        style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)' }}
      >
        {card.title}
      </h3>

      {/* Subtitle */}
      <p
        className="font-avenir-medium mb-6"
        style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
      >
        {card.subtitle}
      </p>

      {/* Divider */}
      <div
        className="mb-6"
        style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.15)' }}
      />

      {/* Full body */}
      {card.body.split('\n\n').map((para, i) => (
        <p
          key={i}
          className="font-avenir-regular leading-relaxed mb-4 last:mb-0"
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)' }}
        >
          {para}
        </p>
      ))}
    </div>
  )

  // Image panel
  const imagePanel = (
    <div className="flex-1 overflow-hidden" style={{ minWidth: 0 }}>
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover"
        loading="lazy"
        style={{ display: 'block' }}
      />
    </div>
  )

  return (
    // Outer wrapper — sticky + paddingBottom creates scroll distance for stacking
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: 20 + index,
        // Short scroll distance — next card appears quickly
        paddingBottom: '25vh',
      }}
    >
      <div
        className="w-full max-w-350 mx-auto flex overflow-hidden shadow-2xl"
        style={{
          // Cards are now shorter to let the layout breathe
          height: '75vh',
          background: '#0B2232',
          borderRadius: 40,
        }}
      >
        {imageRight ? (
          <>
            {textPanel}
            {imagePanel}
          </>
        ) : (
          <>
            {imagePanel}
            {textPanel}
          </>
        )}
      </div>
    </div>
  )
})

PlaysOutCardDesktop.displayName = 'PlaysOutCardDesktop'

// ── Section ───────────────────────────────────────────────────────────────────
export default function PlaysOutDesktop() {
  const [titleY, setTitleY] = useState(0)
  const lastCardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  const updateScrollEffects = useCallback(() => {
    if (containerRef.current) {
      const bottom = containerRef.current.getBoundingClientRect().bottom
      const threshold = 620
      setTitleY(bottom < threshold ? bottom - threshold : 0)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(updateScrollEffects, 100)
    return () => clearTimeout(t)
  }, [updateScrollEffects])

  useEffect(() => {
    window.addEventListener('scroll', updateScrollEffects, { passive: true })
    window.addEventListener('resize', updateScrollEffects)
    return () => {
      window.removeEventListener('scroll', updateScrollEffects)
      window.removeEventListener('resize', updateScrollEffects)
    }
  }, [updateScrollEffects])

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ background: '#EEE9DE' }}
    >
      {/* ── Introducing SIA heading ───────────────────────────────── */}
      <div
        ref={headingRef}
        className="text-center px-6 pt-16 pb-12 max-w-4xl mx-auto"
      >
        <motion.p
          className="font-avenir-light mb-4 text-[#1c0831]"
          style={{ fontSize: '22px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Introducing SIA Angel Hub
        </motion.p>

        <motion.h2
          className="text-center leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: '64.5px' }}
        >
          <span className="font-avenir-heavy block text-[#070c17]">
            Build Judgment through
          </span>
          <span className="block text-[#070c17]">
            <span className="font-avenir-heavy">Action </span>
            <span className="font-avenir-medium">(not theory)</span>
          </span>
        </motion.h2>

        <motion.p
          className="font-avenir-regular text-center leading-relaxed whitespace-nowrap text-[#344466]"
          style={{ fontSize: '28px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Real startups. Real decisions. Real outcomes.
        </motion.p>
      </div>

      {/* ── Sticky "Here's how that plays out:" divider ──────────── */}
      <motion.div
        className="sticky z-10 py-5 px-6 md:px-10 lg:px-16"
        style={{ top: 0, background: '#EEE9DE', y: titleY }}
      >
        <div className="flex items-center gap-5">
          <div className="flex-1 h-px" style={{ background: 'rgba(7,12,23,0.12)' }} />
          <p
            className="font-avenir-heavy shrink-0"
            style={{ color: '#070c17', fontSize: '35px' }}
          >
            Here&apos;s how that plays out:
          </p>
          <div className="flex-1 h-px" style={{ background: 'rgba(7,12,23,0.12)' }} />
        </div>
      </motion.div>

      {/* ── Stacking full-screen cards ────────────────────────────── */}
      {/* Padding so cards don't touch the page edges */}
      <div className="px-6 md:px-10 lg:px-14">
        {CARDS.map((card, i) => (
          <PlaysOutCardDesktop
            key={i}
            card={card}
            index={i}
            // 0 → text left, image right
            // 1 → image left, text right
            // 2 → text left, image right
            // 3 → image left, text right
            imageRight={i % 2 === 0}
            ref={i === CARDS.length - 1 ? lastCardRef : null}
          />
        ))}
      </div>

      {/* Bottom spacer minimized to respect existing 178px div */}
      <div style={{ height: 0 }} />
    </section>
  )
}
