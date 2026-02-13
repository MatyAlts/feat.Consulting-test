import { useState, useEffect, useId, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useOutsideClick } from '../hooks/use-outside-click'

const CARDS = [
  {
    emoji: '\uD83C\uDF0D',
    title: 'Designed to Integrate with Real Life',
    subtitle: 'Participate in live cohort sessions from wherever you are, with optional in-person moments at key points in the program.',
    body: 'The format is built to fit alongside a full professional life, without relocation or disruption.',
  },
  {
    emoji: '\uD83E\uDDED',
    title: 'Expert-Guided Decision Making',
    subtitle: "You don't just hear conclusions; you learn how those conclusions are formed.",
    body: "Evaluation sessions are guided by experienced angels. Not lectures: facilitated discussions at the moments where tradeoffs matter.",
  },
  {
    emoji: '\u2B06\uFE0F\uD83D\uDE80',
    title: 'Real Startups,\nReal Decisions',
    subtitle: "You don't study examples. You participate in real investment decisions.",
    body: "You'll see 75+ early-stage startups across industries and stages, with real materials, and real timelines. Not every company will be a winner, and that's the point.",
  },
  {
    emoji: '\uD83E\uDD1D\uD83D\uDDF3\uFE0F\uD83D\uDCAC',
    title: 'Thinking Together, Investing Together',
    subtitle: 'You see how others reason, disagree, and commit, with outcomes shared and discussed openly.',
    body: "Decisions are debated openly within the cohort. When it's time to act, participants commit individually, inside a shared decision environment, ensuring everyone's voice is heard.",
  },
]

export default function FeatureCardsGrid() {
  const [active, setActive] = useState<(typeof CARDS)[number] | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section ref={sectionRef} className="px-5 pb-0 pt-[30px]" style={{ background: '#f4f7ec' }}>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-100"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-110 px-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-[420px] h-fit max-h-[90vh] flex flex-col bg-[#0d1a2c] rounded-[28px] overflow-hidden shadow-2xl relative"
            >
              <div className="p-8 pb-10">
                <motion.div 
                  layoutId={`emoji-${active.title}-${id}`}
                  className="text-4xl mb-6"
                >
                  {active.emoji}
                </motion.div>
                
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="font-avenir-heavy text-white text-[24px] leading-tight mb-4 pr-4 whitespace-pre-line"
                >
                  {active.title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="space-y-4"
                >
                  <p className="font-avenir-regular text-[#F5C518] italic text-[16px] leading-relaxed">
                    {active.subtitle}
                  </p>
                  <p className="font-avenir-regular text-white/90 text-[16px] leading-relaxed">
                    {active.body}
                  </p>
                </motion.div>

                <button 
                  onClick={() => setActive(null)}
                  className="absolute bottom-4 right-6 opacity-30 hover:opacity-100 text-white text-xl transition-opacity p-2 -m-2"
                >
                  —
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="relative max-w-[500px] mx-auto">
        <motion.ul 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {CARDS.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="px-4 pb-4 pt-5 flex flex-col bg-[#0d1a2c] hover:bg-[#122338] rounded-[28px] cursor-pointer transition-colors aspect-square relative"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div 
                layoutId={`emoji-${card.title}-${id}`}
                className="text-2xl mb-4"
              >
                {card.emoji}
              </motion.div>
              
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-avenir-medium text-white leading-tight mt-1 whitespace-pre-line"
                style={{ fontSize: '15.48px' }}
              >
                {card.title}
              </motion.h3>

              <div className="absolute bottom-4 right-6 opacity-30 text-white text-xl">
                +
              </div>
            </motion.div>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
