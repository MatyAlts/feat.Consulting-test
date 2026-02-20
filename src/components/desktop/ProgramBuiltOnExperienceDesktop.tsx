import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'

const REVIEWS = [
  {
    quote: '\u201cIt didn\u2019t just teach me investing. It changed how I decide.\u201d',
    body: "What an amazing program! I joined it 'knowing' what the discussions would be about. And I was surprised not only by the conversations' content but about what I learned about investing and my investment thesis. My favorite question was asked in Session 16, by a fellow participant: 'As investors, do you want to be seen as the investor that invested in X, or the investor that invested in Y?' This question helped solidify my choice.",
    name: 'Matteo Costa',
    role: 'Business Administrator | Angel Investor',
    avatar: '/assets_mobile/review1.png',
  },
  {
    quote: '\u201cDeep learning comes from real-life context.\u201d',
    body: 'There is no better way of learning what you read in textbooks and watch in videos about valuations, security types, economic terms, investors rights, and so forth, than to put it into practice in real life conversations with founders. At every cohort, we are able to evaluate 60+ of companies, examine their team culture, understand their market opportunity. As I continue my journey as startup investor, I feel more equipped to evaluate companies at an early stage with a deep understanding of what it takes to support them in their journey to success.',
    name: 'Matteo Costa',
    role: 'Business Administrator | Angel Investor',
    avatar: '/assets_mobile/review2.png',
  },
  {
    quote: '\u201cA safe space for you to broaden your knowledge in industries.\u201d',
    body: 'One exciting thing about the program is that it creates a safe space for you to broaden your knowledge in industries. You can be an expert in a particular sector and never venture outside it. This program is excellent at providing you with a network of other investors with additional expertise you can tap into and many companies from different backgrounds and locations. This is an excellent way of learning the ropes of angel investing with like-minded people.',
    name: 'Joao Paulo Diogo',
    role: 'Business Administrator | Angel Investor',
    avatar: '/assets_mobile/review3.png',
  },
]

const PURPLE_GRADIENT_BG = 'radial-gradient(ellipse at 50% 45%, #4a1878 0%, #210836 60%)'

const STATS = [
  {
    value: 35,
    prefix: '+',
    label: 'Rounds Run',
    body: 'Repeated decision cycles, not one-off experiences.',
    background: PURPLE_GRADIENT_BG,
    textColor: '#ffffff',
  },
  {
    value: 1000,
    prefix: '+',
    label: 'Investors Formed',
    body: 'A diverse base of thoughtful, active participants.',
    color: '#F3F4F6', // Light Grey
    textColor: '#0d1a2c',
  },
  {
    value: 2000,
    prefix: '+',
    label: 'Startups Reviewed',
    body: 'Broad exposure across industries, stages, and quality levels.',
    color: '#E6E8FF', // Light Blue/Purple
    textColor: '#0d1a2c',
  },
]

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const count = useMotionValue(0)
  const display = useTransform(count, (current) => Math.floor(current).toLocaleString())

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 3,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [inView, value, count])

  return <motion.span>{display}</motion.span>
}

export default function ProgramBuiltOnExperienceDesktop() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-250px' })

  return (
    <section 
      ref={ref}
      className="w-full py-24 px-10 xl:px-24"
      style={{ background: '#EEE9DE' }}
    >
      <div className="max-w-350 mx-auto relative z-10">
        <div className="absolute -right-24 top-1/4 w-80 h-100 bg-[#fbd979]/15 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute -left-24 bottom-1/4 w-64 h-80 bg-[#fbd979]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
        
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <h2 
            className="font-avenir-heavy text-[#0d1a2c] leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 56px)', maxWidth: '700px' }}
          >
            <div className="flex flex-wrap">
              {["A", "Program", "Built", "on"].map((word, i) => (
                <motion.span
                  key={`line1-${i}`}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap">
              {["Experience,", "Not", "Theory."].map((word, i) => (
                <motion.span
                  key={`line2-${i}`}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: (i + 4) * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h2>
          
          <motion.p
            className="font-avenir-regular text-[#0d1a2c]/70 text-lg lg:text-xl max-w-125 text-left lg:text-right lg:mb-2"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            SIA is built on a proven investing methodology developed through years of real Angel Investing: Shaped by thousands of evaluations.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto lg:h-180">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6 h-full">
            {/* LARGE PURPLE CARD — Stats 1 */}
            <motion.div 
              className="flex-1 rounded-[40px] p-10 flex flex-col justify-end text-white shadow-lg relative overflow-hidden"
              style={{ background: STATS[0].background }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative z-10">
                <span className="block font-avenir-heavy text-[72px] leading-none mb-4">
                  {STATS[0].prefix}<AnimatedNumber value={STATS[0].value} inView={inView} />
                </span>
                <p className="font-avenir-medium text-xl opacity-90 mb-2">
                  {STATS[0].label}
                </p>
                <p className="font-avenir-regular text-sm opacity-70 leading-relaxed max-w-60">
                  {STATS[0].body}
                </p>
              </div>
            </motion.div>

            {/* DARK QUOTE CARD */}
            <motion.div 
              className="h-55 rounded-[40px] p-8 flex flex-col justify-center bg-[#0d1a2c] shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-avenir-medium italic text-white text-lg leading-relaxed">
                &ldquo;This isn&apos;t theoretical exposure. It&apos;s experience you can recognize and reuse.&rdquo;
              </p>
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 h-full">
            {/* IMAGE CARD 1 */}
            <motion.div 
              className="flex-1 rounded-[40px] shadow-lg relative overflow-hidden group min-h-75"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <img 
                src="/assets_mobile/APBoE_pic.png" 
                alt="Experience" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl">
                <p className="font-avenir-heavy text-[#0d1a2c] text-[17px] mb-1">
                  Proven Methodology
                </p>
                <p className="font-avenir-regular text-slate-500 text-sm">
                  Evaluated through years of active investing.
                </p>
              </div>
            </motion.div>

            {/* LIGHT BLUE CARD — Stats 3 */}
            <motion.div 
              className="h-70 rounded-[40px] p-10 flex flex-col justify-center shadow-lg"
              style={{ background: STATS[2].color }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="block font-avenir-heavy text-[56px] leading-none mb-4 text-[#060621]">
                {STATS[2].prefix}<AnimatedNumber value={STATS[2].value} inView={inView} />
              </span>
              <p className="font-avenir-medium text-lg text-[#0d1a2c] mb-2">
                {STATS[2].label}
              </p>
              <p className="font-avenir-regular text-sm text-[#0d1a2c]/60 leading-relaxed">
                {STATS[2].body}
              </p>
            </motion.div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 h-full">
            {/* LIGHT GREY CARD — Stats 2 */}
            <motion.div 
              className="h-70 rounded-[40px] p-10 flex flex-col justify-center shadow-lg"
              style={{ background: STATS[1].color }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="block font-avenir-heavy text-[56px] leading-none mb-4 text-[#060621]">
                {STATS[1].prefix}<AnimatedNumber value={STATS[1].value} inView={inView} />
              </span>
              <p className="font-avenir-medium text-lg text-[#0d1a2c] mb-2">
                {STATS[1].label}
              </p>
              <p className="font-avenir-regular text-sm text-[#0d1a2c]/60 leading-relaxed">
                {STATS[1].body}
              </p>
            </motion.div>

            {/* IMAGE CARD 2 (Waitlist or community) */}
            <motion.div 
              className="flex-1 rounded-[40px] shadow-lg relative overflow-hidden group min-h-75"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {/* Using specific asset requested */}
              <img 
                src="/assets_mobile/APBoE_pic2.png" 
                alt="Community" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-3xl">
                <p className="font-avenir-heavy text-[#0d1a2c] text-[17px] mb-1">
                  Invest Together
                </p>
                <p className="font-avenir-regular text-slate-500 text-sm">
                  Pooling judgment and committing capital with peers.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* BACKED BY PEOPLE SECTION */}
        <BackedByPeopleSlider inView={inView} />

      </div>
    </section>
  )
}

function BackedByPeopleSlider({ inView }: { inView: boolean }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedReviewPopup, setSelectedReviewPopup] = useState<number | null>(null)
  
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-50px' })

  const n = REVIEWS.length
  const next = () => setCurrent((c) => (c + 1) % n)
  const goTo = (i: number) => setCurrent(i)

  useEffect(() => {
    if (!inView || isPaused || selectedReviewPopup !== null) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [inView, isPaused, current, selectedReviewPopup])

  // Returns index with wrapping
  const wrap = (i: number) => ((i % n) + n) % n

  // Card positions: -1 = left peek, 0 = center, 1 = right peek
  const getOffset = (i: number) => {
    let diff = i - current
    // Normalize to -1, 0, 1 for infinite loop
    if (diff > n / 2) diff -= n
    if (diff < -n / 2) diff += n
    return diff
  }

  return (
    <div className="mt-32">
      {/* Header Row */}
      <div className="flex justify-end mb-16">
        <div className="text-right flex flex-col items-end">
          <h2
            ref={titleRef}
            className="font-avenir-heavy text-[#0d1a2c] leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 56px)', maxWidth: '850px' }}
          >
            <div className="flex flex-wrap justify-end">
              {["… and", "Backed", "by", "People"].map((word, i) => (
                <motion.span
                  key={`rev-line1-${i}`}
                  className="inline-block ml-[0.3em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap justify-end">
              {["Who", "Do", "This", "for", "Real"].map((word, i) => (
                <motion.span
                  key={`rev-line2-${i}`}
                  className="inline-block ml-[0.3em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: (i + 4) * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h2>
          <motion.p
            className="font-avenir-regular text-[#0d1a2c]/70 text-lg lg:text-xl max-w-125 lg:mb-2 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What changes when learning turns into real decisions.
          </motion.p>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative overflow-hidden"
        style={{ height: '480px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {REVIEWS.map((review, i) => {
          const offset = getOffset(i)
          // Only render center and ±1 neighbors
          if (Math.abs(offset) > 1) return null

          const isCenter = offset === 0
          const isLeft = offset === -1
          const isRight = offset === 1

          return (
            <motion.div
              key={i}
              className="absolute top-0 flex flex-col items-center justify-center rounded-[32px] shadow-xl p-8 cursor-pointer"
              style={{
                width: isCenter ? '46%' : '28%',
                height: isCenter ? '100%' : '88%',
                top: isCenter ? '0%' : '6%',
                background: '#ffffff',
                zIndex: isCenter ? 10 : 5,
                filter: isCenter ? 'none' : 'brightness(0.75) saturate(0.5)',
              }}
              animate={{
                opacity: isCenter ? 1 : 0.7,
                scale: isCenter ? 1 : 0.95,
                left: isLeft ? '2%' : isCenter ? '27%' : isRight ? '70%' : '27%',
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] // Custom quintic ease for ultra-smooth feel
              }}
              onClick={() => !isCenter && goTo(i)}
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center mt-4">
                {/* Avatar circle */}
                <div
                  className="rounded-full overflow-hidden shadow-md mx-auto mb-8"
                  style={{
                    width: isCenter ? 180 : 120,
                    height: isCenter ? 180 : 120,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content - strictly Name and Role */}
                <p
                  className="font-avenir-heavy text-[#0d1a2c]"
                  style={{ fontSize: isCenter ? '28px' : '20px' }}
                >
                  {review.name}
                </p>
                <p
                  className="font-avenir-regular text-[#0d1a2c]/70 leading-snug mt-2"
                  style={{ fontSize: isCenter ? '18px' : '14px', maxWidth: '85%' }}
                >
                  {review.role}
                </p>
              </div>

              {/* Bottom right "+" */}
              {isCenter && (
                <div className="absolute bottom-6 right-6 z-50">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelectedReviewPopup(i);
                    }}
                    className="flex items-center justify-center rounded-full text-white font-avenir-light transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                    style={{ 
                      width: 52, 
                      height: 52, 
                      background: '#0d1a2c', 
                      fontSize: '36px', 
                      lineHeight: 1,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    <span style={{ transform: 'translateY(-2px)'}}>+</span>
                  </button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Avatar dot indicators */}
      <div className="flex justify-center gap-4 mt-8">
        {REVIEWS.map((review, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${review.name}`}
            className="flex flex-col items-center gap-1 group relative outline-hidden cursor-pointer"
          >
            <motion.div
              className="rounded-full overflow-hidden shadow-sm"
              initial={false}
              animate={{
                width: i === current ? 44 : 36,
                height: i === current ? 44 : 36,
                opacity: i === current ? 1 : 0.45,
                border: i === current ? '2px solid #0d1a2c' : '2px solid transparent',
              }}
              whileHover={{ 
                scale: 1.25, 
                opacity: 1,
                y: -5,
                boxShadow: '0 8px 16px rgba(13, 26, 44, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </motion.div>
          </button>
        ))}
      </div>

      {/* Full Review Popup */}
      <AnimatePresence>
        {selectedReviewPopup !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedReviewPopup(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white rounded-[40px] p-8 md:p-12 max-w-4xl w-full relative shadow-2xl flex flex-col md:flex-row gap-8 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedReviewPopup(null)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-[#0d1a2c]/60 hover:text-[#0d1a2c] bg-gray-100/50 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close review popup"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="shrink-0">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <img 
                    src={REVIEWS[selectedReviewPopup].avatar} 
                    alt={REVIEWS[selectedReviewPopup].name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                <h4 className="font-avenir-heavy text-[#0d1a2c] text-2xl md:text-[32px] mb-4 leading-tight">
                  {REVIEWS[selectedReviewPopup].quote}
                </h4>
                <p className="font-avenir-regular text-[#0d1a2c]/80 text-lg md:text-[20px] mb-8 leading-relaxed italic">
                  {REVIEWS[selectedReviewPopup].body}
                </p>
                <div>
                  <p className="font-avenir-heavy text-[#0d1a2c] text-xl mb-1">{REVIEWS[selectedReviewPopup].name}</p>
                  <p className="font-avenir-regular text-[#0d1a2c]/70 text-lg">{REVIEWS[selectedReviewPopup].role}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}



