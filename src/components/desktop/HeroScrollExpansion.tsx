import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'

// Helper for responsive scaling
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return width
}

// Same gradient used in the mobile ShiftInFocus & old purple rects
const PURPLE_GRADIENT =
  'radial-gradient(ellipse at 50% 45%, #4a1878 0%, #210836 60%)'

// ── Text Components ──────────────────────────────────────────────────────────

function DecidingBetterReveal({ show }: { show: boolean }) {
  // Staggered blur-in effect triggered by "show" state
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const wordAnim = {
    hidden: { opacity: 0, y: 15, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] as const },
    },
  }

  const line1 = ["It's", 'about']
  const line2 = ['deciding', 'better.']

  return (
    <motion.div
      className="flex flex-col items-start w-full text-white"
      variants={container}
      initial="hidden"
      animate={show ? 'show' : 'hidden'}
      style={{ fontSize: '1em' }}
    >
      {/* Line 1 */}
      <div className="flex gap-x-[0.35em] mb-1">
        {line1.map((word, i) => (
          <motion.span
            key={i}
            variants={wordAnim}
            className="font-avenir-regular leading-none"
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Line 2 — Specific line-height 30 */}
      <div className="flex gap-x-[0.35em]" style={{ lineHeight: '30px' }}>
        {line2.map((word, i) => (
          <motion.span
            key={i}
            variants={wordAnim}
            className="font-avenir-next-demi"
            style={{
              textShadow: '0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(183,169,255,0.4)',
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

function ProblemView({ 
  showProblem,
  showDeciding, 
  responsiveScale 
}: { 
  showProblem: boolean,
  showDeciding: boolean, 
  responsiveScale: number 
}) {
  const baseGap = 147 * responsiveScale
  const baseFontSize = 52.5 * responsiveScale
  const decidingFontSize = 48 * responsiveScale

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const wordAnim = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const },
    },
  }

  return (
    <div className="flex flex-row items-center justify-center h-full w-full px-12 gap-0">
      {/* Left side: Problem Question */}
      <motion.div 
        className="flex flex-col items-end text-left w-1/2"
        variants={container}
        initial="hidden"
        animate={showProblem ? 'show' : 'hidden'}
      >
        <h2
          className="font-avenir-medium leading-[1.3]"
          style={{ fontSize: `${baseFontSize}px`, color: '#b7a9ff' }}
        >
          <div className="flex flex-col items-start">
            <div className="flex gap-x-[0.3em]">
              {['Angel', 'investing', "isn't"].map((w, i) => (
                <motion.span key={i} variants={wordAnim}>{w}</motion.span>
              ))}
            </div>
            <div className="flex gap-x-[0.3em]">
              {['about'].map((w, i) => (
                <motion.span key={i} variants={wordAnim}>{w}</motion.span>
              ))}
              <motion.span variants={wordAnim} className="font-avenir-medium-oblique">knowing</motion.span>
              <motion.span variants={wordAnim}>more.</motion.span>
            </div>
          </div>
        </h2>
      </motion.div>

      {/* Center Divider */}
      <motion.div
        className="h-48 w-px"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: showProblem ? 0.3 : 0, scaleY: showProblem ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ 
          background: 'rgba(183,169,255,1)',
          marginLeft: `${baseGap}px`,
          marginRight: `${baseGap}px`
        }}
      />

      {/* Right side: Deciding better */}
      <div className="flex flex-col items-start w-1/2" style={{ fontSize: `${decidingFontSize}px` }}>
        <DecidingBetterReveal show={showDeciding} />
      </div>
    </div>
  )
}

function SolutionView() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    },
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Label */}
      <motion.p
        variants={item}
        className="font-avenir-light mb-4 text-center"
        style={{ color: 'rgba(7, 12, 23, 0.65)', fontSize: '40px' }}
      >
        Introducing SIA Angel Hub
      </motion.p>

      {/* Heading */}
      <motion.h2
        variants={item}
        className="text-center leading-[1.1] mb-8"
        style={{ fontSize: '82px', color: '#070C17' }}
      >
        <span className="font-avenir-heavy block">
          Build Judgment through
        </span>
        <span className="block">
          <span className="font-avenir-heavy">Action </span>
          <span className="font-avenir-medium" style={{ fontStyle: 'italic', fontWeight: 300 }}>(not theory)</span>
        </span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={item}
        className="font-avenir-regular text-center leading-relaxed"
        style={{ color: 'rgba(7, 12, 23, 0.55)', fontSize: '44px' }}
      >
        Real startups. Real decisions. Real outcomes.
      </motion.p>
    </motion.div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function HeroScrollExpansion() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Global scroll for triggers that start at the very top (Hero)
  const { scrollY } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001,
  })

  // ── Delayed Shrink Animation ──────────────────────────────────────────
  // Now starts at 0.2 to allow first text to animate in while rect is "full"
  const horizontalPadding = useTransform(smoothProgress, [0.2, 0.8], [81.5, 168])
  const width = useTransform(horizontalPadding, (p) => `calc(100vw - (${p}px * 2))`)
  const contentScale = useTransform(smoothProgress, [0.2, 0.8], [1, 0.82])
  const heightVal = useTransform(smoothProgress, [0.2, 0.8], [85, 80])
  const height = useTransform(heightVal, (v) => `${v}vh`)

  const borderRadius = 40

  // ── Logic Triggers ─────────────────────────────────────────────────────
  const [showProblem, setShowProblem] = useState(false)
  const [showDeciding, setShowDeciding] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  // 1. Initial Problem Reveal: trigger as soon as user scrolls from HERO
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 350 && !showProblem) {
      setShowProblem(true)
    } else if (latest < 250 && (showProblem || showDeciding)) {
      setShowProblem(false)
      setShowDeciding(false)
    }
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // 2. "It's about deciding better" trigger: only when not in solution
    if (latest > 0.02 && latest < 0.62 && !showDeciding && !showSolution) {
      setShowDeciding(true)
    } 

    // 2. Switch to Solution content
    if (latest > 0.65 && !showSolution) {
      setShowSolution(true)
    } else if (latest < 0.62 && showSolution) {
      setShowSolution(false)
      // When returning from solution to problem, we want a sequential reveal:
      // First the left side (showProblem is already true), 
      // then with a delay, the right side.
      setShowDeciding(false)
      setTimeout(() => setShowDeciding(true), 600)
    }
  })

  const windowWidth = useWindowWidth()
  const responsiveScale = Math.max(0.7, Math.min(1, windowWidth / 1920))

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '350vh' }}
    >
      {/* Background Layer — Animate color here */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          backgroundColor: showSolution ? '#eee9de' : 'rgba(255, 255, 255, 0)'
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Content Layer — Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        <motion.div
          className="relative overflow-hidden flex items-center justify-center"
          animate={{
            background: showSolution ? '#eee9de' : PURPLE_GRADIENT,
          }}
          style={{
            width,
            height,
            borderRadius,
            minHeight: 550,
            scale: contentScale,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {!showSolution ? (
              <motion.div
                key="problem"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProblemView 
                  showProblem={showProblem}
                  showDeciding={showDeciding} 
                  responsiveScale={responsiveScale} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="solution"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SolutionView />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
