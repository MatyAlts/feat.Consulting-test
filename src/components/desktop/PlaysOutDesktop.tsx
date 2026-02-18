import { useRef, forwardRef, useState, memo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// ── Components ────────────────────────────────────────────────────────────────
const PaintingText = ({ text, isExpanded }: { text: string; isExpanded: boolean }) => {
  const characters = text.split('')
  return (
    <p className="font-avenir-regular text-white" style={{ fontSize: '25.62px' }}>
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
    title: 'Engage in Live Investment Opportunities',
    subtitle: 'Live companies. Real timelines. Actual stakes.',
    expandedTitle: 'Live companies. Real timelines. Actual stakes.',
    expandedBody: 'You work with our pool of active startups, tangible materials, and real timelines (not case studies or simulations).\nYou evaluate opportunities as they unfold, discuss tradeoffs with peers, and co-invest in live deals.\nBy the end, this isn’t theoretical exposure. It’s experience you can recognize and reuse.'
  },
  {
    image: '/assets_mobile/plays_out_pic2.png',
    title: 'Sharpen Your Thinking with Other Investors',
    subtitle: 'Judgment is formed in interaction, not isolation.',
    expandedTitle: 'Judgment is formed in interaction, not isolation.',
    expandedBody: 'You challenge assumptions, weigh perspectives, and pressure-test decisions alongside a diverse group of thoughtful investors, in real time.'
  },
  {
    image: '/assets_mobile/plays_out_pic3.png',
    title: 'Make an Investment Together',
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
        className="w-full max-w-350 mx-auto flex overflow-hidden shadow-2xl relative"
        style={{
          // Cards are now shorter to let the layout breathe
          height: '75vh',
          background: '#0B2232',
          borderRadius: 40,
        }}
      >
        {/* Yellow Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute bottom-10 ${imageRight ? 'left-10' : 'right-10'} z-30 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}
          style={{ background: '#F5C518', cursor: 'pointer' }}
        >
          <motion.span
            animate={{ rotate: isExpanded ? 45 : 0 }}
            className="text-4xl text-[#0B2232] font-avenir-heavy leading-none"
            style={{ marginTop: -4 }}
          >
            +
          </motion.span>
        </button>

        {imageRight ? (
          <>
            <div
              className="relative flex flex-col justify-center px-16 xl:px-20 overflow-hidden"
              style={{ width: '50%', flexShrink: 0 }}
            >
                <div className="relative w-full">
                  {/* Title and Subtitle Group - This moves as one unit */}
                  <motion.div
                    animate={{ y: isExpanded ? -120 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <h3
                      className="font-avenir-medium text-white leading-tight mb-4"
                      style={{ fontSize: '45.74px' }}
                    >
                      {card.title}
                    </h3>

                    {/* Subtitle / Yellow Painting area */}
                    <div className="relative mb-8" style={{ minHeight: '60px' }}>
                      <PaintingText text={card.subtitle} isExpanded={isExpanded} />
                    </div>
                  </motion.div>

                  {/* Body Content - Absolute positioned so it doesn't affect initial justify-center */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      y: isExpanded ? -100 : 20,
                      filter: isExpanded ? 'blur(0px)' : 'blur(10px)',
                    }}
                    transition={{ duration: 0.6, delay: isExpanded ? 0.3 : 0, ease: 'easeInOut' }}
                    className="absolute top-full left-0 w-full space-y-4"
                    style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
                  >
                    {card.expandedBody.split('\n').map((line, idx) => (
                      <p
                        key={idx}
                        className="font-avenir-regular text-white leading-relaxed"
                        style={{ fontSize: '18px', opacity: 0.8 }}
                      >
                        {line}
                      </p>
                    ))}
                  </motion.div>
                </div>
            </div>
            <div className="flex-1 overflow-hidden" style={{ minWidth: 0 }}>
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
            <div className="flex-1 overflow-hidden" style={{ minWidth: 0 }}>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ display: 'block' }}
              />
            </div>
            <div
              className="relative flex flex-col justify-center px-16 xl:px-20 overflow-hidden"
              style={{ width: '50%', flexShrink: 0 }}
            >
                <div className="relative w-full">
                  {/* Title and Subtitle Group - This moves as one unit */}
                  <motion.div
                    animate={{ y: isExpanded ? -120 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <h3
                      className="font-avenir-medium text-white leading-tight mb-4"
                      style={{ fontSize: '45.74px' }}
                    >
                      {card.title}
                    </h3>

                    {/* Subtitle / Yellow Painting area */}
                    <div className="relative mb-8" style={{ minHeight: '60px' }}>
                      <PaintingText text={card.subtitle} isExpanded={isExpanded} />
                    </div>
                  </motion.div>

                  {/* Body Content - Absolute positioned so it doesn't affect initial justify-center */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      y: isExpanded ? -100 : 20,
                      filter: isExpanded ? 'blur(0px)' : 'blur(10px)',
                    }}
                    transition={{ duration: 0.6, delay: isExpanded ? 0.3 : 0, ease: 'easeInOut' }}
                    className="absolute top-full left-0 w-full space-y-4"
                    style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
                  >
                    {card.expandedBody.split('\n').map((line, idx) => (
                      <p
                        key={idx}
                        className="font-avenir-regular text-white leading-relaxed"
                        style={{ fontSize: '18px', opacity: 0.8 }}
                      >
                        {line}
                      </p>
                    ))}
                  </motion.div>
                </div>
            </div>
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
  
  // High performance scroll tracking without triggering re-renders
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"]
  })

  // Smoothly move the title out as we reach the end of the section
  const titleY = useTransform(scrollYProgress, [0.8, 1], [0, -200])
  const smoothTitleY = useSpring(titleY, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ background: '#EEE9DE' }}
    >


      {/* ── Sticky "Here's how that plays out:" divider ──────────── */}
      <motion.div
        className="sticky z-10 py-5 px-6 md:px-10 lg:px-16"
        style={{ top: 0, background: '#EEE9DE', y: smoothTitleY }}
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
          <MemoizedPlaysOutCard
            key={i}
            card={card}
            index={i}
            imageRight={i % 2 === 0}
          />
        ))}
      </div>

      {/* Bottom spacer minimized to respect existing 178px div */}
      <div style={{ height: 0 }} />
    </section>
  )
}
