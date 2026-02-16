import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

const REVIEWS = [
  {
    quote: '\u201cIt didn\u2019t just teach me investing. It changed how I decide.\u201d',
    body: "What an amazing program! I joined it 'knowing' what the discussions would be about\u2026 I was wrong. The depth of interaction and the practical approach completely transformed how I evaluate opportunities.",
    name: 'Matteo Costa',
    role: 'Business Administrator | Angel Investor',
    avatar: '/assets_mobile/review1.png',
  },
  {
    quote: '\u201cDeep learning comes from real-life context.\u201d',
    body: 'There is no better way of learning what you read in textbooks and watch in videos than by applying it in real time with real startups and real capital.',
    name: 'Matteo Costa',
    role: 'Business Administrator | Angel Investor',
    avatar: '/assets_mobile/review2.png',
  },
  {
    quote: '\u201cA safe space for you to broaden your knowledge in industries.\u201d',
    body: 'One exciting thing about the program is that it creates a safe space for you to broaden your knowledge across sectors without the usual barriers of entry.',
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
      <div className="max-w-350 mx-auto">
        
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
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-50px' })
  
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length)
  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)

  useEffect(() => {
    if (!inView || isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [inView, isPaused])

  return (
    <div className="mt-32">
      {/* Header Row — Aligned to the right */}
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

      {/* Main Slider Card */}
      <motion.div 
        className="relative bg-white rounded-[40px] p-10 lg:p-14 shadow-xl border border-[#0d1a2c]/5 flex flex-col lg:flex-row gap-12 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Floating Arrows in top-right corner of the card */}
        <div className="absolute top-12 right-16 flex gap-10 z-20">
          <button 
            onClick={prev}
            className="flex items-center justify-center transition-all duration-300 group cursor-pointer border-none bg-transparent p-0"
            aria-label="Previous testimonial"
          >
            <svg 
              width="54" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="rotate-180 transition-all duration-300 opacity-30 group-hover:opacity-100 group-hover:text-[#0d1a2c]"
              style={{ color: '#000' }}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button 
            onClick={next}
            className="flex items-center justify-center transition-all duration-300 group cursor-pointer border-none bg-transparent p-0"
            aria-label="Next testimonial"
          >
            <svg 
              width="54" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-all duration-300 opacity-30 group-hover:opacity-100 group-hover:text-[#0d1a2c]"
              style={{ color: '#000' }}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className="lg:w-95 shrink-0">
          <div className="relative aspect-4/5 rounded-4xl overflow-hidden shadow-lg group">
             <motion.img 
               key={REVIEWS[current].avatar}
               src={REVIEWS[current].avatar} 
               alt={REVIEWS[current].name}
               className="w-full h-full object-cover"
               initial={{ scale: 1.1, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.6 }}
             />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
           <motion.div 
             key={REVIEWS[current].quote}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
           >
             <p className="font-avenir-heavy text-[#0d1a2c] leading-tight mb-8" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 32px)' }}>
               {REVIEWS[current].quote}
             </p>
             <p className="font-avenir-regular text-[#0d1a2c]/70 text-lg lg:text-xl leading-relaxed mb-12">
               &ldquo;{REVIEWS[current].body}&rdquo;
             </p>
             
             <div>
                <p className="font-avenir-heavy text-[#0d1a2c] text-xl mb-1">{REVIEWS[current].name}</p>
                <p className="font-avenir-regular text-[#0d1a2c]/50 text-base">{REVIEWS[current].role}</p>
             </div>
           </motion.div>
        </div>
      </motion.div>
      
      {/* Dot Indicators */}
      <div className="flex justify-center gap-3 mt-10">
         {REVIEWS.map((_, i) => (
           <button 
             key={i} 
             onClick={() => setCurrent(i)}
             className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#5643CC]' : 'w-2.5 bg-[#0d1a2c]/10 hover:bg-[#0d1a2c]/20'}`}
             aria-label={`Go to slide ${i + 1}`}
           />
         ))}
      </div>
    </div>
  )
}
