import { useRef, forwardRef, useState, memo } from 'react'
import { motion } from 'framer-motion'

// ── Components ────────────────────────────────────────────────────────────────
const PaintingText = ({ text, isExpanded }: { text: string; isExpanded: boolean }) => {
  const characters = text.split('')
  return (
    <p className="font-avenir-regular text-white" style={{ fontSize: 'clamp(24px, 1.8vw, 32px)' }}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          animate={{
            color: isExpanded ? '#F5C518' : 'rgba(255, 255, 255, 0.6)',
          }}
          transition={{
            duration: 0.2,
            delay: isExpanded ? i * 0.015 : 0,
            ease: 'easeOut'
          }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────
const CARDS = [
  {
    image: '/assets_mobile/plays_out_pic1.png',
    title: 'Engage in Live\nInvestment Opportunities',
    subtitle: 'Live companies. Real timelines. Actual stakes.',
    expandedTitle: 'Live companies. Real timelines. Actual stakes.',
    expandedBody: 'You work with our pool of active startups, tangible materials, and real timelines (not case studies or simulations).\nYou evaluate opportunities as they unfold, discuss tradeoffs with peers, and co-invest in live deals.'
  },
  {
    image: '/assets_mobile/plays_out_pic2.png',
    title: 'Sharpen Your Thinking\nwith Other Investors',
    subtitle: 'Judgment is formed in interaction, not isolation.',
    expandedTitle: 'Judgment is formed in interaction, not isolation.',
    expandedBody: 'You challenge assumptions, weigh perspectives, and pressure-test decisions alongside a diverse group of thoughtful investors, in real time.'
  },
  {
    image: '/assets_mobile/plays_out_pic3.png',
    title: 'Make an Investment\nTogether',
    subtitle: 'From discussion to commitment.',
    expandedTitle: 'From discussion to commitment.',
    expandedBody: 'You move from debate to action by co-investing with peers, pooling judgment, sharing responsibility, and committing capital together.'
  },
  {
    image: '/assets_mobile/plays_out_pic4.png',
    title: 'Forge Your Investor Lens',
    subtitle: 'The perspective you’ll use in every future investment.',
    expandedTitle: 'The perspective you’ll use in every future investment.',
    expandedBody: 'Through repeated real decisions, you emerge with a personal investment perspective: a repeatable way to assess risk, quality, and fit on your own terms.'
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
  const [isExpanded, setIsExpanded] = useState(false)
  const stickyTop = TITLE_OFFSET + index * STACK_OFFSET

  const textContainerJSX = (
    <div
      className="relative flex flex-col justify-center px-[39.28px] overflow-hidden shadow-2xl border border-white/5"
      style={{ background: '#0B2232', borderRadius: 40 }}
    >
      <div className="relative w-full">
        {/* Title and Subtitle Group — slides up when expanded */}
        <motion.div
          animate={{ y: isExpanded ? -80 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h3
            className="font-avenir-medium text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(38px, 3vw, 52px)' }}
          >
            {card.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < card.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h3>

          <div className="relative mb-0">
            <PaintingText text={card.subtitle} isExpanded={isExpanded} />
          </div>
        </motion.div>

        {/* Body Content — fades in/out with blur */}
        <motion.div
          animate={{
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? -40 : 20,
            filter: isExpanded ? 'blur(0px)' : 'blur(10px)',
          }}
          transition={{ duration: 0.5, delay: isExpanded ? 0.1 : 0, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-full left-0 w-full space-y-4"
          style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
        >
          {card.expandedBody.split('\n').map((line, idx) => (
            <p
              key={idx}
              className="font-avenir-regular text-white leading-relaxed"
              style={{ fontSize: 'clamp(18px, 1.2vw, 24px)', opacity: 0.8 }}
            >
              {line}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Toggle button — rotates from "+" to "x" */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute bottom-10 right-10 z-30 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <motion.span
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-4xl leading-none block font-avenir-light text-[#fbd979] origin-center"
        >
          +
        </motion.span>
      </button>
    </div>
  )

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: 20 + index,
        // Short scroll distance — next card appears quickly
        paddingBottom: '10vh',
      }}
    >
      <div
        className="w-full mx-auto grid grid-cols-2 box-border relative px-[42px] gap-[22px]"
        style={{
          height: 'calc(100vh - 296px)',
        }}
      >
        {imageRight ? (
          <>
            {textContainerJSX}
            <div className="overflow-hidden shadow-2xl relative" style={{ borderRadius: 40 }}>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ display: 'block' }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="overflow-hidden shadow-2xl relative" style={{ borderRadius: 40 }}>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ display: 'block' }}
              />
            </div>
            {textContainerJSX}
          </>
        )}
      </div>
    </div>
  )
})

PlaysOutCardDesktop.displayName = 'PlaysOutCardDesktop'

const MemoizedPlaysOutCard = memo(PlaysOutCardDesktop)

// ── Section ───────────────────────────────────────────────────────────────────
export default function PlaysOutDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ background: '#EEE9DE' }}
    >


      {/* ── Sticky "Here's how that plays out:" divider ──────────── */}
      <motion.div
        className="sticky top-0 z-10 py-5 px-6 md:px-10 lg:px-16"
        style={{ background: '#EEE9DE', y: 0 }}
      >
        <div className="flex items-center gap-5">
          <div className="flex-1 h-px" style={{ background: 'rgba(7,12,23,0.12)' }} />
          <p
            className="font-avenir-heavy shrink-0"
            style={{ color: '#070c17', fontSize: 'clamp(35px, 2.5vw, 45px)' }}
          >
            Here&apos;s how that plays out:
          </p>
          <div className="flex-1 h-px" style={{ background: 'rgba(7,12,23,0.12)' }} />
        </div>
      </motion.div>

      {/* ── Stacking full-screen cards ────────────────────────────── */}
      <div className="w-full">
        {CARDS.map((card, i) => (
          <MemoizedPlaysOutCard
            key={i}
            card={card}
            index={i}
            imageRight={i % 2 === 0}
          />
        ))}
      </div>

      {/* Spacer to allow the final card to sit before section ends */}
      <div className="relative" style={{ height: 0 }} />
    </section>
  )
}
