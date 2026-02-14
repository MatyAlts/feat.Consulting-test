import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

const REVIEWS = [
  {
    quote: '\u201cIt didn\u2019t just teach me investing. It changed how I decide.\u201d',
    body: "What an amazing program! I joined it 'knowing' what the discussions would be about\u2026 I was wrong. The depth of interaction and the practical approach completely transformed how I evaluate opportunities.",
    name: 'Matteo Costa',
    role: 'Business Administrator | Angel Investor',
    avatar: '/assets_mobile/investors (1).png',
  },
  {
    quote: '\u201cDeep learning comes from real-life context.\u201d',
    body: 'There is no better way of learning what you read in textbooks and watch in videos than by applying it in real time with real startups and real capital.',
    name: 'Matteo Costa',
    role: 'Business Administrator | Angel Investor',
    avatar: '/assets_mobile/investors (2).png',
  },
  {
    quote: '\u201cA safe space for you to broaden your knowledge in industries.\u201d',
    body: 'One exciting thing about the program is that it creates a safe space for you to broaden your knowledge across sectors without the usual barriers of entry.',
    name: 'Joao Paulo Diogo',
    role: 'Business Administrator | Angel Investor',
    avatar: '/assets_mobile/investors (3).png',
  },
]

const CARD_GAP = 12
const CARD_PEEK = 40   // how much of the next card is visible
const CARD_LEFT_PAD = 16

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [cardWidth, setCardWidth] = useState(300)
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setCardWidth(containerRef.current.offsetWidth - CARD_LEFT_PAD - CARD_PEEK)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Auto-slide every 4 seconds, paused if a card is expanded
  useEffect(() => {
    if (!inView || expanded !== null) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [inView, current, expanded])

  // Close expanded card when moving to a different slide
  useEffect(() => {
    requestAnimationFrame(() => setExpanded(null))
  }, [current])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) {
      setCurrent((c) => (c + 1) % REVIEWS.length)
    } else if (info.offset.x > 50) {
      setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)
    }
  }

  return (
    <section
      ref={ref}
      className="pt-0 pb-4"
      style={{ background: 'linear-gradient(to bottom, #EEE9DE 0%, #EEE9DE 50%, #f4f7ec 100%)' }}
    >
      {/* Carousel track */}
      <motion.div
        ref={containerRef}
        style={{ overflow: 'hidden' }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex"
          style={{ paddingLeft: CARD_LEFT_PAD }}
          animate={{ 
            x: -(current * (cardWidth + CARD_GAP)) + (current / (REVIEWS.length - 1)) * (CARD_PEEK - CARD_LEFT_PAD)
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{
            left: -((REVIEWS.length - 1) * (cardWidth + CARD_GAP)) + (CARD_PEEK - CARD_LEFT_PAD),
            right: 0,
          }}
          onDragEnd={handleDragEnd}
        >
          {REVIEWS.map((review, i) => {
            const isExpanded = expanded === i
            return (
              <div
                key={i}
                style={{ width: cardWidth, flexShrink: 0, marginRight: CARD_GAP }}
              >
                <div
                  className="rounded-2xl bg-white p-4"
                  style={{ border: '1px solid #E5E7EB' }}
                >
                  {/* Quote */}
                  <p
                    className="font-avenir-heavy text-sm italic leading-snug mb-2"
                    style={{ color: '#1B2A4A' }}
                  >
                    {review.quote}
                  </p>

                  {/* Body — Animated expansion */}
                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 40 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <p
                      className="font-avenir-regular text-xs leading-relaxed mb-3"
                      style={{ color: '#6B7280' }}
                    >
                      {review.body}
                    </p>
                  </motion.div>

                  {/* Footer: avatar + name/role + chevron */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="rounded-full object-cover shrink-0"
                        style={{ width: 32, height: 32 }}
                        loading="lazy"
                      />
                      <div>
                        <p className="font-avenir-medium text-xs" style={{ color: '#1B2A4A' }}>
                          &mdash; {review.name}
                        </p>
                        <p className="font-avenir-light text-xs" style={{ color: '#6B7280' }}>
                          {review.role}
                        </p>
                      </div>
                    </div>

                    {/* Chevron expand button */}
                    <button
                      onClick={() => setExpanded(isExpanded ? null : i)}
                      className="shrink-0 flex items-center justify-center"
                      style={{ color: '#9CA3AF', padding: 4 }}
                      aria-label={isExpanded ? 'Collapse review' : 'Expand review'}
                    >
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </motion.div>

      {/* Dot indicators — circle outlines, active filled yellow */}
      <div className="flex justify-center gap-2 mt-5">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-200"
            style={{
              width: 8,
              height: 8,
              background: i === current ? '#FBD979' : '#D1D5DB',
              border: `1px solid ${i === current ? '#FBD979' : '#D1D5DB'}`,
            }}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
