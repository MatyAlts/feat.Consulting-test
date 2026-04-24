import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useScrollGateProgress } from "../hooks/useScrollGateProgress";

// Same gradients as Desktop
const PURPLE_GRADIENT =
  "radial-gradient(ellipse at 50% 45%, #4a1878 0%, #210836 60%)";

// ── Problem View (purple card) ─────────────────────────────────────────────

function ProblemView({
  showProblem,
  showDeciding,
}: {
  showProblem: boolean;
  showDeciding: boolean;
}) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const wordAnim = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const },
    },
  };

  const decidingContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const decidingWord = {
    hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 text-center">
      {/* Label */}
      <motion.p
        className="font-avenir-light text-xs mb-5 tracking-widest"
        style={{ color: "#b7a9ff", opacity: 0.95 }}
        initial={{ opacity: 0 }}
        animate={showProblem ? { opacity: 0.95 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        A shift in focus:
      </motion.p>

      {/* Problem heading */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={showProblem ? "show" : "hidden"}
        className="mb-4"
      >
        <h2
          className="font-avenir-medium leading-snug"
          style={{ fontSize: "1.55rem", color: "#b7a9ff", maxWidth: 300 }}
        >
          <div className="flex flex-wrap justify-center gap-x-[0.3em]">
            {["Angel", "Investing", "isn't", "about"].map((w, i) => (
              <motion.span key={i} variants={wordAnim}>
                {w}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.3em]">
            <motion.span
              variants={wordAnim}
              className="font-avenir-medium"
              style={{ fontStyle: "italic" }}
            >
              knowing
            </motion.span>
            <motion.span variants={wordAnim}>more.</motion.span>
          </div>
        </h2>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="mb-5"
        style={{ width: 52, height: 1, background: "rgba(183,169,255,0.3)" }}
        initial={{ scaleX: 0 }}
        animate={showProblem ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* "It's about deciding better." */}
      <motion.div
        variants={decidingContainer}
        initial="hidden"
        animate={showDeciding ? "show" : "hidden"}
        className="flex flex-wrap justify-center gap-x-[0.35em]"
      >
        {["It's", "about", "deciding", "better."].map((word, i) => (
          <motion.span
            key={i}
            variants={decidingWord}
            className="font-avenir-regular text-white text-base leading-relaxed"
            style={
              i >= 2
                ? {
                    textShadow:
                      "0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(183,169,255,0.5)",
                    filter: "brightness(1.5)",
                  }
                : {}
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Solution View (cream card) ─────────────────────────────────────────────

function SolutionView() {
  const container = {
    show: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full px-7 text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Label */}
      <motion.p
        variants={item}
        className="font-avenir-light mb-2 text-center"
        style={{ color: "rgba(7, 12, 23, 0.6)", fontSize: "0.9rem" }}
      >
        Introducing SIA Angel Hub
      </motion.p>

      {/* Heading */}
      <motion.h2
        variants={item}
        className="text-center leading-tight mb-4"
        style={{ color: "#070C17", fontSize: "1.75rem" }}
      >
        <span className="font-avenir-heavy block">Build Judgment through</span>
        <span className="block">
          <span className="font-avenir-heavy">Action </span>
          <span
            className="font-avenir-medium"
            style={{ fontStyle: "italic", fontWeight: 300 }}
          >
            (not theory)
          </span>
        </span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={item}
        className="font-avenir-regular text-center leading-snug mb-2"
        style={{ color: "rgba(7, 12, 23, 0.55)", fontSize: "1rem" }}
      >
        Real startups. Real outcomes.
      </motion.p>

      {/* Description */}
      <motion.p
        variants={item}
        className="font-avenir-medium text-center leading-snug"
        style={{ color: "#344466", fontSize: "0.95rem" }}
      >
        A cohort-based Angel Investing program built around tangible decisions
        on live deals.
      </motion.p>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function ShiftInFocus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showProblem, setShowProblem] = useState(false);
  const [showDeciding, setShowDeciding] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const gatedProgress = useScrollGateProgress({
    containerRef,
    sensitivity: 0.001, // Reduced for a more deliberate scroll feel
  });

  // Global scroll for triggers that start at the very top (Hero)
  const { scrollY } = useScroll();

  const smoothProgress = useSpring(gatedProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001,
  });

  // Card grows from ~84% to ~96% width of screen as user scrolls
  // Now completes at 0.45 to allow a huge "held" state at the end
  const cardWidthPct = useTransform(smoothProgress, [0.0, 0.45], [84, 96]);
  const cardWidth = useTransform(cardWidthPct, (v) => `${v}%`);

  // Card height grows too (from compact to near full-screen)
  const cardHeightPx = useTransform(smoothProgress, [0.0, 0.45], [300, 440]);
  const cardHeight = useTransform(cardHeightPx, (v) => `${v}px`);

  // Border radius shrinks slightly as it fills the screen
  const cardRadius = useTransform(smoothProgress, [0.0, 0.45], [28, 24]);

  // 1. Initial Problem Reveal & Momentum Fallback (Security Sync)
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Basic reveal logic based on absolute page scroll
    if (latest > 80 && !showProblem) {
      setShowProblem(true);
    } else if (latest < 20 && (showProblem || showDeciding)) {
      setShowProblem(false);
      setShowDeciding(false);
    }

    // MOMENTUM FALLBACK: Sync gated progress with physical scroll position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, progress));

      // Force sync if they drift too much (ensures card grows during flings)
      if (Math.abs(gatedProgress.get() - p) > 0.05) {
        gatedProgress.set(p);
      }
    }
  });

  // 2. Inner transitions based on container progress (SINGLE SOURCE OF TRUTH)
  useMotionValueEvent(gatedProgress, "change", (v) => {
    // Deciding state zone
    const isDeciding = v > 0.05 && v < 0.5;
    if (isDeciding !== showDeciding) setShowDeciding(isDeciding);

    // Solution triggers at 0.45, leaving 55% of the scroll as a 'held' state
    const isSolution = v >= 0.45;
    if (isSolution !== showSolution) setShowSolution(isSolution);
  });

  return (
    // Extra tall container
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "700vh" }}
    >
      {/* Background layer — transitions from transparent to cream */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          backgroundColor: showSolution ? "#eee9de" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Sticky content */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-30">
        <motion.div
          className="relative flex items-center justify-center overflow-hidden"
          animate={{
            background: showSolution ? "#eee9de" : PURPLE_GRADIENT,
          }}
          style={{
            width: cardWidth,
            height: cardHeight,
            borderRadius: cardRadius,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
  );
}
