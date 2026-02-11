import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

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

function PlusIcon({ open }: { open: boolean }) {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-avenir-heavy text-xl"
      style={{
        width: 36,
        height: 36,
        background: '#F5C518',
        color: '#1B2A4A',
        flexShrink: 0,
      }}
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    >
      +
    </motion.div>
  )
}

function PlaysOutCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      layout
      className="relative overflow-hidden rounded-2xl shadow-md"
      style={{ background: '#1B2A4A' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative" style={{ height: 220 }}>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(27,42,74,0.1) 0%, rgba(27,42,74,0.75) 100%)' }}
        />
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div className="flex-1 pr-3">
            <h3 className="font-avenir-heavy text-white text-lg leading-snug mb-1">
              {card.title}
            </h3>
            <p className="font-avenir-regular text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {card.subtitle}
            </p>
          </div>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? `Collapse ${card.title}` : `Expand ${card.title}`}
            className="shrink-0"
          >
            <PlusIcon open={open} />
          </button>
        </div>
      </div>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-3">
              {card.body.split('\n\n').map((para, i) => (
                <p key={i} className="font-avenir-regular text-sm leading-relaxed mb-3 last:mb-0"
                  style={{ color: 'rgba(255,255,255,0.88)' }}>
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PlaysOutCards() {
  return (
    <section className="px-4 relative" style={{ background: '#ede8dd' }}>
      <div className="flex flex-col gap-4">
        {CARDS.map((card, i) => (
          <PlaysOutCard key={i} card={card} index={i} />
        ))}
      </div>

      {/* Fluid Gradient Transition to #f4f7ec */}
      <div 
        className="h-24 -mx-4" 
        style={{ 
          background: 'linear-gradient(to bottom, #ede8dd 0%, #f4f7ec 100%)',
          width: 'calc(100% + 32px)',
          marginBottom: '-1px',
          position: 'relative'
        }} 
      />
    </section>
  )
}
