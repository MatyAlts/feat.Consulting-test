import { useRef, forwardRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    image: '/assets_mobile/investor_desktop1.png',
    titleSegments: [
      { text: "You’ll understand how investment decisions are formed ", fontClass: 'font-dm-regular' },
      { text: "(not just chosen)", fontClass: 'font-dm-thin' },
    ],
    highlights: [
      'ambiguity is handled before certainty exists',
      'disagreement is surfaced and worked through',
      'tradeoffs are weighed before anyone commits',
    ],
    body: 'In real time, you’ll see how experienced investors reason as decisions are forming, not after the fact.\n\nThere’s no single “right answer.” Just better and worse reasoning under pressure.\n\nBy the end, you have a clear mental model of how conviction is built when information is incomplete and how to apply that thinking yourself.',
  },
  {
    image: '/assets_mobile/investor_desktop2.png',
    titleSegments: [
      { text: "You stop confusing great businesses with great investments", fontClass: 'font-dm-regular' },
    ],
    highlights: [
      'business or product quality',
      'from valuation, terms, timing, and risk',
    ],
    body: 'Through repeated exposure to real opportunities, you’ll practice separating:\n\nYou see why promising startups can still be poor investments — and how less obvious opportunities become compelling once structure and downside are understood.\n\nThe outcome: clearer judgments about viability, fit, and risk, not just appeal.',
  },
  {
    image: '/assets_mobile/investor_desktop3.png',
    titleSegments: [
      { text: "You don’t just learn investing.", fontClass: 'font-dm-thin' },
      { text: "You become an investor.", fontClass: 'font-dm-regular', block: true },
    ],
    highlights: [
      'evaluate live opportunities',
      'debate decisions with peers',
      'commit capital',
      'live with outcomes',
    ],
    body: 'By the end of the program, you’ve gone through the same cycle experienced investors repeat: forming a view, pressure-testing it, committing, and reflecting on results.\n\nThat repetition is what turns participation into experience and experience into judgment you can trust.',
  },
]

const STACK_OFFSET = 12
const TITLE_OFFSET = 80

const InvestorCard = forwardRef<
  HTMLDivElement,
  { card: (typeof CARDS)[0]; index: number; imageRight: boolean }
>(({ card, index, imageRight }, ref) => {
  const stickyTop = TITLE_OFFSET + index * STACK_OFFSET

  const textPanel = (
    <div
      className="relative flex flex-col justify-start py-12 xl:py-16 px-16 xl:px-20 overflow-hidden"
      style={{ width: '50%', flexShrink: 0 }}
    >
      <h3
        className="text-white leading-tight mb-4"
        style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)' }}
      >
        {card.titleSegments.map((seg: any, i: number) => (
          <span 
            key={i} 
            className={`${seg.fontClass} ${seg.block ? 'block mt-2' : ''}`}
          >
            {seg.text}
          </span>
        ))}
      </h3>

      <div className="flex flex-col gap-2.5 mb-6">
        {card.highlights.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FBD979] shrink-0" />
            <p className="font-avenir-medium text-[#FBD979]/90 text-lg italic leading-snug">
              {item}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mb-6"
        style={{ width: 60, height: 1, background: 'rgba(255,255,255,0.15)' }}
      />

      {card.body.split('\n\n').map((para, i) => (
        <p
          key={i}
          className="font-avenir-regular leading-relaxed mb-3 last:mb-0"
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}
        >
          {para}
        </p>
      ))}
    </div>
  )

  const imagePanel = (
    <div className="flex-1 overflow-hidden" style={{ minWidth: 0 }}>
      <img
        src={card.image}
        alt={card.titleSegments.map((s: any) => s.text).join(' ')}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
    </div>
  )

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: 20 + index,
        paddingBottom: '10vh',
      }}
    >
      <div
        className="w-full max-w-350 mx-auto flex overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
        style={{
          height: '80vh',
          background: '#0d1a2c',
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

InvestorCard.displayName = 'InvestorCard'

export default function BecomeTheInvestorDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24"
      style={{ background: '#1A1C25' }}
    >
      <div ref={headingRef} className="text-center px-10 mb-20 max-w-5xl mx-auto">
        <motion.h2 
          className="font-avenir-heavy text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 64px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Become the Investor<br />You Were Meant to Be
        </motion.h2>
        <motion.p 
          className="font-avenir-regular text-white/60 text-2xl"
          initial={{ opacity: 0, y: 15 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          What happens when learning turns into real decisions.
        </motion.p>
      </div>

      <div className="px-10 xl:px-24">
        {CARDS.map((card, i) => (
          <InvestorCard 
            key={i} 
            card={card} 
            index={i} 
            imageRight={i % 2 !== 0} 
          />
        ))}
      </div>

      {/* Final CTA Assessment Block */}
      <div className="mt-12 flex justify-center px-10 pb-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="inline-flex flex-col items-center text-center"
        >
          <h2 className="font-avenir-medium text-white mb-1 leading-tight text-center" style={{ fontSize: '64.5px' }}>
            Find Your Place in the<br />Investing Journey
          </h2>
          <p className="font-avenir-regular text-white/50 max-w-2xl mb-4 text-center" style={{ fontSize: '22px' }}>
            A 2-minute assessment to understand where you are today (and what typically comes next).
          </p>
          
          <div className="w-full flex flex-col items-center">
            <motion.a 
              href={import.meta.env.VITE_APPLY_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full font-avenir-heavy text-[#0d1a2c] flex items-center justify-center rounded-2xl py-5 text-xl group shadow-lg"
              style={{
                backgroundColor: '#fbd979',
                border: '1.5px solid #fbd979',
                whiteSpace: 'nowrap'
              }}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              variants={{
                initial: { opacity: 0, scale: 0.98 },
                animate: { opacity: 1, scale: 1 },
                hover: { backgroundColor: '#09092c', color: '#ffffff' },
                tap: { scale: 0.99, backgroundColor: '#09092c', color: '#ffffff' },
              }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <span className="mr-3">See if SIA is right for you</span>
              <motion.img
                src="/assets_mobile/flecha.svg"
                alt=""
                className="w-4 h-4"
                variants={{
                  initial: { filter: 'brightness(0)' },
                  animate: { filter: 'brightness(0)' },
                  hover: { filter: 'brightness(0) invert(1)' },
                  tap: { filter: 'brightness(0) invert(1)' },
                }}
              />
            </motion.a>
            <p className="mt-[4.9px] font-avenir-light text-white/30 text-sm">
              No commitment. Just a starting point.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
