import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const CARDS = [
  {
    image: '/assets_mobile/investor_desktop1.png',
    title: "You see how investment decisions are formed",
    subtitle: "(not just chosen)",
    preview: "You’ll recognize how real decisions come together: how uncertainty is handled, tradeoffs are weighed, and conviction is built before anyone commits.",
    highlights: [
      'ambiguity is handled before certainty exists',
      'disagreement is surfaced and worked through',
      'tradeoffs are weighed before anyone commits',
    ],
    body: 'You’ll see how experienced investors reason as **decisions are forming**, not after the fact.\n\nIn real time, you observe how:\n\nThere’s no single “right answer.” Just better and worse reasoning under pressure.\n\nBy the end, you have a **clear mental model** of how conviction is built when information is incomplete and how to apply that thinking yourself.',
  },
  {
    image: '/assets_mobile/investor_desktop2.png',
    title: "You stop confusing great businesses with great investments",
    preview: "You’ll be able to tell when a strong company is not necessarily a good investment; and how the right structure, timing, and context can make it one.",
    highlights: [
      'business or product quality',
      'from valuation, terms, timing, and risk',
    ],
    body: 'Through repeated exposure to real opportunities, you’ll practice separating:\n\nYou see why promising startups can still be poor investments — and how less obvious opportunities become compelling once structure and downside are understood.\n\nThe outcome: clearer judgments about viability, fit, and risk, not just appeal.',
  },
  {
    image: '/assets_mobile/investor_desktop3.png',
    title: "You become an investor.",
    subtitle: "You don’t just learn investing.",
    preview: "Not by watching, but by deciding. You’ll commit when it counts, see outcomes play out, and carry that judgment forward.",
    highlights: [
      'evaluate live opportunities',
      'debate decisions with peers',
      'commit capital',
      'live with outcomes',
    ],
    body: 'By the end of the program, you’ve gone through the same cycle experienced investors repeat: forming a view, pressure-testing it, committing, and reflecting on results.\n\nThat repetition is what turns participation into experience and experience into judgment you can trust.',
  },
]

function InvestorCard({ card, index, imageRight }: { card: (typeof CARDS)[0]; index: number; imageRight: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      layout
      transition={{ 
        layout: { type: 'spring', stiffness: 150, damping: 25 },
        opacity: { duration: 0.6 }
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="relative w-full bg-[#12141D] rounded-[40px] mb-20 border border-white/5 shadow-2xl overflow-visible"
    >
      <div className={`flex flex-col lg:flex-row items-start ${imageRight ? 'lg:flex-row-reverse' : ''}`}>
        {/* Image Container — Padded: 20px top, 20px outer side, 28px gap to text, 0px bottom (protrudes) */}
        <div className={`shrink-0 h-0 ${imageRight ? 'pt-5 pr-5 pl-7' : 'pt-5 pl-5 pr-7'}`}>
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
            className="w-102.5 h-102.5 rounded-4xl overflow-hidden shadow-xl shadow-black/50"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Text Container */}
        <div
          className={`flex-1 relative pb-17.75 ${index === 2 ? 'pt-[86.53px]' : 'pt-5'}`}
          style={{
            paddingLeft: imageRight ? '60px' : '28px',
            paddingRight: imageRight ? '28px' : '60px'
          }}
        >
          <motion.div layout="position">
            {index === 2 ? (
              /* Special layout for 3rd card */
              <>
                <h4 className="font-dm-thin text-white text-[50px] mb-0 leading-tight">
                  {card.subtitle}
                </h4>
                <h3 className="text-white leading-[1.1] mb-0 font-dm-regular text-[50px] tracking-tight">
                  {card.title}
                </h3>
              </>
            ) : (
              /* Standard layout for 1st and 2nd cards */
              <>
                <h3 className="text-white leading-[1.1] mb-0 font-dm-regular text-[50px] tracking-tight">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <h4 className="font-dm-thin text-white/25 text-[40px] mb-0 leading-tight">
                    {card.subtitle}
                  </h4>
                )}
              </>
            )}
          </motion.div>

          <motion.div layout className="relative mt-1.75 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              {!isExpanded ? (
                <motion.p
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="m-0 font-avenir-regular text-white/40 text-[25.62px] leading-relaxed"
                >
                  {card.preview}
                </motion.p>
              ) : (
                <motion.div
                  key="body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {card.body.split('\n\n').map((para, i) => {
                    if (para.startsWith('In real time')) {
                      return (
                        <div key={i} className="space-y-3">
                          <p className="m-0 font-avenir-regular text-white/60 text-[25.62px] leading-relaxed">{para}</p>
                          <ul className="space-y-2 pl-1">
                            {card.highlights.map((h, hi) => (
                              <li key={hi} className="flex items-center gap-3 font-avenir-regular text-white/50 text-[25.62px]">
                                <span className="w-1 h-1 rounded-full bg-[#fbd979]/50 shrink-0" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    }
                    
                    const formattedPara = para.split('**').map((part, pi) => 
                      pi % 2 === 1 ? <strong key={pi} className="font-avenir-heavy text-white/85">{part}</strong> : part
                    )

                    return (
                      <p key={i} className="m-0 font-avenir-regular text-white/45 text-[25.62px] leading-relaxed">
                        {formattedPara}
                      </p>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Toggle Button — Yellow, anchored to bottom-right of the text area */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute bottom-5 ${index === 1 ? 'left-5' : 'right-5'} z-30 transition-all hover:scale-110 active:scale-95`}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-3xl leading-none block font-avenir-light text-[#fbd979]"
            >
              +
            </motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function BecomeTheInvestorDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-56"
      style={{ background: '#0D0F14' }}
    >
      <div className="absolute top-[15%] left-[5%] w-64 h-64 bg-[#fbd979]/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[#fbd979]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div ref={headingRef} className="text-center px-10 mb-24 max-w-5xl mx-auto relative z-10">
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
          className="font-avenir-regular text-white/50 text-2xl"
          initial={{ opacity: 0, y: 15 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          What happens when learning turns into real decisions.
        </motion.p>
      </div>

      <div className="max-w-310 mx-auto px-10 relative z-10">
        {CARDS.map((card, i) => (
          <InvestorCard 
            key={i} 
            card={card} 
            index={i} 
            imageRight={i === 1} 
          />
        ))}
      </div>

      {/* Final CTA Assessment Block */}
      <motion.div 
        layout 
        transition={{ layout: { type: 'spring', stiffness: 150, damping: 25 } }} 
        className="mt-56 flex justify-center px-10 pb-32"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="inline-flex flex-col items-center text-center"
        >
          <h2 className="font-avenir-medium text-white leading-tight text-center" style={{ fontSize: '64.5px', marginBottom: '4px' }}>
            Find Your Place in the<br />Investing Journey
          </h2>
          <p className="font-avenir-regular text-white/50 max-w-2xl text-center" style={{ fontSize: '22px', marginBottom: '16px' }}>
            A 2-minute assessment to understand where you are today (and what typically comes next).
          </p>
          
          <div className="w-full flex flex-col items-center">
            <motion.a 
              href={import.meta.env.VITE_APPLY_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[440px] font-avenir-heavy text-[#0d1a2c] flex items-center justify-center rounded-[20px] group shadow-lg border border-transparent"
              style={{
                backgroundColor: '#fbd979',
                whiteSpace: 'nowrap',
                fontSize: '22px',
                height: '74px'
              }}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              variants={{
                initial: { opacity: 0, scale: 0.98 },
                animate: { opacity: 1, scale: 1 },
                hover: { backgroundColor: '#09092C', color: '#ffffff', borderColor: '#fbd979' },
                tap: { scale: 0.99, backgroundColor: '#09092C', color: '#ffffff', borderColor: '#fbd979' },
              }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <span className="mr-2">See if SIA is right for you</span>
              <motion.img 
                src="/assets_mobile/flecha.svg" 
                alt="" 
                className="w-[8.5px] h-[8.5px]"
                variants={{
                  initial: { filter: 'brightness(0)' },
                  animate: { filter: 'brightness(0)' },
                  hover: { filter: 'brightness(0) invert(1)' },
                  tap: { filter: 'brightness(0) invert(1)' },
                }}
              />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
