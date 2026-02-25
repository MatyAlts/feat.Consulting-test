import { useState, useRef, useEffect, forwardRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CARDS = [
  {
    image: '/assets_mobile/plays_out_pic1.png',
    title: 'Engage in Live Investment Opportunities',
    subtitle: 'You don\'t "practice" investing. You take part in it.',
    body: 'You work with our pool of active startups, tangible materials, and real timelines (not case studies or simulations).\n\nYou evaluate opportunities as they unfold, discuss tradeoffs with peers, and co-invest in live deals.\n\nBy the end, this isn\'t theoretical exposure. It\'s experience you can recognize and reuse.',
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
    body: 'Through repeated real decisions, you emerge with a personal investment perspective: a repeatable way to assess risk, quality, and fit on your own terms.',
  },
]

const STACK_OFFSET = 16

/* ── Bottom Sheet ── */
function BottomSheet({ 
  card, 
  onClose 
}: { 
  card: typeof CARDS[0]
  onClose: () => void 
}) {
  const sheetRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Backdrop overlay with blur */}
      <motion.div
        key="sheet-backdrop"
        className="fixed inset-0 z-100"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1, 
          backgroundColor: 'rgba(0,0,0,0.35)',
        }}
        exit={{ 
          opacity: 0, 
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        onClick={onClose}
        style={{ 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* Sheet */}
      <motion.div
        key="sheet-panel"
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-101 max-w-[428px] mx-auto"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ 
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1],
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose()
          }
        }}
      >
        <div
          className="rounded-t-[24px] overflow-hidden"
          style={{
            background: '#0B2232',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
            maxHeight: '85vh',
          }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div 
              className="w-10 h-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            />
          </div>

          {/* Image */}
          <div className="w-full h-[200px] px-4">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="px-6 pt-5 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 260px)' }}>
            <h3 className="text-white text-2xl font-medium font-['Avenir'] leading-8 mb-2">
              {card.title}
            </h3>
            <p className="opacity-60 text-neutral-50 text-sm font-medium font-['Avenir'] leading-tight mb-5">
              {card.subtitle}
            </p>

            {/* Divider */}
            <div 
              className="w-full h-px mb-5" 
              style={{ background: 'rgba(255,255,255,0.1)' }} 
            />

            {/* Body paragraphs */}
            {card.body.split('\n\n').map((para, i) => (
              <p 
                key={i} 
                className="font-['Avenir'] text-neutral-50/80 text-[15px] leading-relaxed mb-4 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}

/* ── Card ── */
const PlaysOutCard = forwardRef<HTMLDivElement, { 
  card: typeof CARDS[0]
  index: number
  totalCards: number
  onTap: () => void 
}>(({ card, index, totalCards: _totalCards, onTap }, ref) => {
  // Increased offset to 110px to account for more top padding on title
  const titleOffset = 110
  const stickyTop = titleOffset + index * STACK_OFFSET
  const innerRef = useRef<HTMLDivElement>(null)
  const [shadowIntensity, setShadowIntensity] = useState(0)

  // Track scroll to apply upward shadow when this card is stuck and covering content
  const handleScroll = useCallback(() => {
    // First card never casts a shadow upward (nothing beneath it)
    if (!innerRef.current || index === 0) {
      setShadowIntensity(0)
      return
    }

    const stickyDiv = innerRef.current.parentElement
    if (!stickyDiv) return

    const myRect = stickyDiv.getBoundingClientRect()

    // When the card is stuck, its top will be at or near its stickyTop value
    // The closer it is to stickyTop, the more it's covering the card below
    const distanceFromStuck = myRect.top - stickyTop

    if (distanceFromStuck <= 0) {
      // Fully stuck — maximum shadow
      setShadowIntensity(1)
    } else if (distanceFromStuck < 120) {
      // Approaching stuck position — gradual shadow
      setShadowIntensity(1 - distanceFromStuck / 120)
    } else {
      setShadowIntensity(0)
    }
  }, [index, stickyTop])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Upward shadow: projects upward (-y) with increasing intensity
  const upwardShadow = shadowIntensity > 0.05
    ? `0px -${4 + shadowIntensity * 12}px ${12 + shadowIntensity * 20}px rgba(0,0,0,${0.08 + shadowIntensity * 0.14})`
    : 'none'

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: 20 + index, // Higher z-index than title (10)
        paddingBottom: 48,
      }}
    >
      <div
        ref={innerRef}
        className="relative w-full max-w-[340px] mx-auto overflow-visible cursor-pointer"
        onClick={onTap}
        style={{
          borderRadius: 16,
          boxShadow: upwardShadow,
          transition: 'box-shadow 0.2s ease-out',
        }}
      >
        {/* Image Container */}
        <div className="w-full h-[206px] relative z-0">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>

        {/* Content Box — compact, no accordion */}
        <div
          className="relative -mt-[32px] mx-[6.5px] z-10 bg-[#0B2232] rounded-2xl flex flex-col"
          style={{ boxShadow: '0px 4.15px 20.67px 0px rgba(0,0,0,0.15)' }}
        >
          <div className="px-5 py-4 flex flex-col justify-center items-start gap-2">
            <div className="flex flex-col justify-start items-start gap-[5px] w-full">
              <h3 className="w-full text-white text-2xl font-medium font-['Avenir'] leading-8">
                {card.title}
              </h3>
              <p className="w-full opacity-60 text-neutral-50 text-sm font-medium font-['Avenir'] leading-tight mt-1">
                {card.subtitle}
              </p>
            </div>

            {/* "+" indicator */}
            <div className="w-full flex justify-end mt-1">
              <span 
                className="text-[#FBD979] text-3xl font-avenir-light leading-none"
              >
                +
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

/* ── Section ── */
export default function PlaysOutCards() {
  const [selectedCard, setSelectedCard] = useState<typeof CARDS[0] | null>(null)
  const [bgHeight, setBgHeight] = useState(0)
  const lastCardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [titleY, setTitleY] = useState(0)

  const updateScrollEffects = () => {
    // 1. Update Background Height
    if (lastCardRef.current && containerRef.current) {
      const card = lastCardRef.current
      const height = card.offsetTop + (card.offsetHeight / 2)
      setBgHeight(height)
    }

    // 2. Push Title Up at the end
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const sectionBottom = rect.bottom
      
      // We start pushing earlier (account for stack height + title height)
      // This ensures the title leaves before it overlaps with the rest of the stack
      const pushThreshold = 460 
      if (sectionBottom < pushThreshold) {
        setTitleY(sectionBottom - pushThreshold)
      } else {
        setTitleY(0)
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(updateScrollEffects, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateScrollEffects)
    window.addEventListener('scroll', updateScrollEffects, { passive: true })
    return () => {
      window.removeEventListener('resize', updateScrollEffects)
      window.removeEventListener('scroll', updateScrollEffects)
    }
  }, [])

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedCard])

  return (
    <>
      <section 
        ref={containerRef}
        className="px-4 pt-0 relative" 
        style={{ background: '#f4f8ed' }}
      >
        {/* Dynamic Background Overlay */}
        <div 
          className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
          style={{ 
            background: '#EEE9DE', 
            height: bgHeight,
            transition: 'height 0.3s ease-out'
          }}
        />

        {/* Sticky Title - Lower Z-index (10) and dynamic exit */}
        <motion.div 
          className="sticky top-0 z-10 text-center pt-12 pb-5"
          style={{ 
            background: '#EEE9DE',
            y: titleY
          }}
        >
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="flex-1 h-px bg-[#070c17]/10" />
            <p
              className="font-avenir-heavy shrink-0"
              style={{ color: '#070c17', fontSize: 19 }}
            >
              Here&apos;s how that plays out:
            </p>
            <div className="flex-1 h-px bg-[#070c17]/10" />
          </div>
        </motion.div>

        {/* Cards Stack - Siblings of title to ensure clean relative positioning and exit */}
        {CARDS.map((card, i) => (
          <PlaysOutCard 
            key={i}
            card={card} 
            index={i}
            totalCards={CARDS.length}
            onTap={() => setSelectedCard(card)}
            ref={i === CARDS.length - 1 ? lastCardRef : null}
          />
        ))}

        {/* Increased spacer to provide room for the exit animation */}
        <div className="relative z-10" style={{ height: 100 }} />
      </section>

      {/* Bottom Sheet — rendered outside section for proper fixed positioning */}
      <AnimatePresence>
        {selectedCard && (
          <BottomSheet 
            card={selectedCard} 
            onClose={() => setSelectedCard(null)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}
