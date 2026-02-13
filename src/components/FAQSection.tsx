import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const FAQ_INITIAL = [
  {
    q: 'Is this program right for me if I\'m new to angel investing?',
    a: 'Yes. The program is designed to meet you where you are. Whether you\'re curious about angel investing or have already made a few bets, SIA provides the structure, context, and real-deal exposure to level up your judgment—regardless of starting point.',
  },
  {
    q: 'Do I need to be an accredited investor to participate?',
    a: 'Not for the educational and evaluation components. For the co-investment portion, accreditation requirements depend on your jurisdiction. Our team can guide you through the specifics during onboarding.',
  },
  {
    q: 'What kind of participants is this designed for?',
    a: 'SIA is built for professionals who want to understand angel investing from the inside—founders, operators, high-earners, and career changers who want to act like investors, not just learn about investing.',
  },
  {
    q: 'Is this more educational or more practical?',
    a: 'Both—but the emphasis is on doing. The curriculum is structured around real decisions, live startups, and group deliberation. The learning is a byproduct of the action.',
  },
  {
    q: 'How much time does the program require each week?',
    a: 'Expect 3–5 hours per week, including cohort sessions, async review, and optional deep-dives. The schedule is designed to fit alongside a full professional life.',
  },
  {
    q: 'Is the program fully remote or hybrid?',
    a: 'The core program is remote-first, with optional in-person events at key moments (deal closings, cohort meetups). No relocation or travel is required.',
  },
]

const FAQ_MORE = [
  {
    q: 'What happens if I miss a session?',
    a: 'Sessions are recorded and materials are shared. You won\'t miss out on the content, but we encourage live participation for the group dynamics that make judgment-building real.',
  },
  {
    q: 'How long does the program run?',
    a: 'SIA Angel Hub is a 12-week program with a clear start and end date for each cohort.',
  },
  {
    q: 'Will I actually make investment decisions during the program?',
    a: 'Yes. Co-investment is a core component. You will evaluate real startups, deliberate with your cohort, and have the opportunity to commit capital.',
  },
  {
    q: 'Am I required to invest capital?',
    a: 'No. Participation in co-investment rounds is optional. You can go through the full evaluation and decision process without committing funds.',
  },
  {
    q: 'How are startups selected and evaluated?',
    a: 'Startups are sourced from SIA\'s existing deal flow network. They go through a pre-screening process before being presented to the cohort. You will see companies at various stages and sectors.',
  },
  {
    q: 'Do participants invest individually or together?',
    a: 'Both. Individual positions are made within a shared decision environment—everyone sees the same information, discusses openly, and commits on their own terms.',
  },
  {
    q: 'What will I leave with at the end of the program?',
    a: 'A personal investment perspective. Documented deal evaluations. A cohort network. And the confidence that comes from having made real decisions under real conditions.',
  },
  {
    q: 'Is an investment guaranteed?',
    a: 'No investment in early-stage startups is guaranteed. SIA provides the structure for sound decision-making, not guarantees of return.',
  },
  {
    q: 'How is this different from angel courses or syndicates?',
    a: 'Courses teach concepts. Syndicates execute deals. SIA does both inside a structured, cohort-based environment designed to build judgment—not just exposure.',
  },
  {
    q: 'What does the program fee cover?',
    a: 'Access to all cohort sessions, startup materials, evaluation tools, group deliberations, co-investment infrastructure, and ongoing community access after the program ends.',
  },
  {
    q: 'Why is there an application process?',
    a: 'The cohort model only works when participants are genuinely engaged and ready to contribute. The application ensures a high-quality peer environment for everyone.',
  },
  {
    q: 'What happens after I apply?',
    a: 'You\'ll receive a confirmation and be scheduled for a short orientation call. If it\'s a mutual fit, you\'ll receive an offer to join the next cohort.',
  },
]

function FAQItem({ item, delay = 0 }: { item: { q: string; a: string }; delay?: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="rounded-[20px] overflow-hidden border-2 cursor-pointer shadow-[0px_4px_20px_rgba(0,0,0,0.08)]"
      initial={{ opacity: 0, y: 8, backgroundColor: '#ffffff', borderColor: '#E5E7EB' }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundColor: open ? '#0d1a2c' : '#ffffff',
        borderColor: open ? 'transparent' : '#E5E7EB'
      }}
      transition={{ 
        backgroundColor: { duration: 0.3 },
        borderColor: { duration: 0.3 },
        opacity: { duration: 0.35, delay },
        y: { duration: 0.35, delay }
      }}
    >
      <div className="w-full flex items-center justify-between p-5 text-left gap-4">
        <motion.span 
          animate={{ color: open ? '#ffffff' : '#0d1a2c' }}
          className="font-avenir-regular text-[15.5px] leading-tight flex-1" 
          style={{ fontFamily: 'AvenirNext' }}
        >
          {item.q}
        </motion.span>
        
        {/* Leaf-shaped Toggle Button */}
        <motion.div
          className="flex items-center justify-center shrink-0"
          animate={{ 
            backgroundColor: open ? 'transparent' : '#0d1a2c',
            borderRadius: '12px 4px 12px 4px'
          }}
          style={{
            width: 32,
            height: 32,
            color: '#fbd979',
          }}
          aria-hidden="true"
        >
          <motion.span
            className="text-xl font-avenir-heavy leading-none"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
          >
            +
          </motion.span>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p 
              className="font-avenir-regular text-[13.5px] leading-relaxed px-5 pb-6 text-white/80" 
              style={{ fontFamily: 'AvenirNext' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface FAQProps {
  seeMoreRef?: React.RefObject<HTMLDivElement | null>;
}

export default function FAQSection({ seeMoreRef }: FAQProps) {
  const [showMore, setShowMore] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="px-4 pt-[50px] pb-0"
      style={{ background: '#EAEAEA99', paddingBottom: 0 }}
    >
      <motion.h2
        className="font-avenir-heavy text-center leading-none mb-3"
        style={{ fontSize: '2rem', color: '#060621' }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        Need a Little More
        <br />
        Information?
      </motion.h2>

      <motion.p
        className="font-avenir-regular text-[14px] text-center mb-[18px]"
        style={{ color: '#202020', fontFamily: 'AvenirNext' }}
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Common questions, answered clearly.
      </motion.p>

      <div className="flex flex-col gap-3">
        {FAQ_INITIAL.map((item, i) => (
          <FAQItem key={i} item={item} delay={inView ? i * 0.04 : 0} />
        ))}

        <AnimatePresence mode="wait">
          {showMore && (
            <motion.div
              key="more"
              className="flex flex-col gap-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {FAQ_MORE.map((item, i) => (
                <FAQItem key={i} item={item} delay={i * 0.03} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={seeMoreRef}>
          {!showMore && (
            <motion.button
              className="font-avenir-regular w-full mt-[6px] py-2 flex items-center justify-center gap-2 transition-opacity hover:opacity-70"
              style={{ 
                color: '#9096b5',
                fontSize: '15px'
              }}
              onClick={() => setShowMore(true)}
              aria-label="See more FAQ questions"
            >
              See more
              <svg 
                width="14" 
                height="8" 
                viewBox="0 0 14 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L7 7L13 1" stroke="#9096b5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  )
}
