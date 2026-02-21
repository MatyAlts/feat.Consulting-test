import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_FAQS = [
  // Group 1 (1-6)
  { q: 'Is this program right for me if I\'m new to angel investing?', a: 'Yes. The program is designed to meet you where you are.' },
  { q: 'Do I need to be an accredited investor to participate?', a: 'Not for the educational and evaluation components.' },
  { q: 'What kind of participants is this designed for?', a: 'SIA is built for professionals who want to understand angel investing.' },
  { q: 'Is this more educational or more practical?', a: 'Both—but the emphasis is on doing.' },
  { q: 'How much time does the program require each week?', a: 'Expect 3–5 hours per week.' },
  { q: 'Is the program fully remote or hybrid?', a: 'The core program is remote-first.' },
  // Group 2 (7-12)
  { q: 'What happens if I miss a session?', a: 'Sessions are recorded and materials are shared.' },
  { q: 'How long does the program run?', a: 'SIA Angel Hub is a 12-week program.' },
  { q: 'Will I actually make investment decisions?', a: 'Yes. Co-investment is a core component.' },
  { q: 'Am I required to invest capital?', a: 'No. Participation in co-investment rounds is optional.' },
  { q: 'How are startups selected and evaluated?', a: 'Startups are sourced from SIA\'s existing deal flow network.' },
  { q: 'Do participants invest individually or together?', a: 'Both options are available.' },
  // Group 3 (13-18)
  { q: 'What will I leave with at the end of the program?', a: 'A personal investment perspective and cohort network.' },
  { q: 'Is an investment guaranteed?', a: 'No investment in early-stage startups is guaranteed.' },
  { q: 'How is this different from angel courses?', a: 'Courses teach concepts. SIA does action.' },
  { q: 'What does the program fee cover?', a: 'Access to sessions, tools, and community.' },
  { q: 'Why is there an application process?', a: 'To ensure a high-quality peer environment.' },
  { q: 'What happens after I apply?', a: 'Confirmation followed by a short orientation call.' },
]

function FAQItemDesktop({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setOpen(!open)}
      className="rounded-[20px] overflow-hidden border cursor-pointer transition-all duration-300"
      style={{
        border: '1.5px solid #E5E7EB',
        backgroundColor: open || hovered ? '#0d1a2c' : '#ffffff',
        boxShadow: open || hovered ? '0px 10px 40px rgba(0,0,0,0.12)' : '0px 4px 12px rgba(0,0,0,0.03)',
      }}
    >
      <div className="w-full flex items-center justify-between p-7 text-left gap-8">
        <motion.span 
          animate={{ color: open || hovered ? '#ffffff' : '#0d1a2c' }}
          className="font-avenir-regular text-[19px] leading-tight flex-1"
          style={{ fontFamily: 'AvenirNext' }}
        >
          {item.q}
        </motion.span>
        
        <motion.div
          className="flex items-center justify-center shrink-0"
          animate={{ 
            backgroundColor: open || hovered ? 'transparent' : '#0d1a2c',
            borderRadius: '12px 4px 12px 4px'
          }}
          style={{ width: 40, height: 40, color: '#fbd979' }}
        >
          <motion.span
            className="text-2xl font-avenir-heavy leading-none"
            animate={{ rotate: open ? 45 : 0 }}
          >
            +
          </motion.span>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="font-avenir-regular text-[17px] leading-relaxed px-7 pb-8 text-white/80" style={{ fontFamily: 'AvenirNext' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function TitleBlock({ active }: { active: boolean }) {
  return (
    <motion.div 
      className="transition-all duration-700 flex flex-col text-left"
      animate={{ 
        opacity: active ? 1 : 0.15, 
        filter: active ? 'blur(0px)' : 'blur(2px)',
        x: active ? 0 : -5
      }}
    >
      <h2 className="font-avenir-heavy leading-tight text-[#060621] m-0 mb-3" style={{ fontSize: '56px' }}>
        Need a Little<br />More Information?
      </h2>
      <p className="font-avenir-regular text-2xl m-0" style={{ color: '#202020CC', fontFamily: 'AvenirNext' }}>
        Common questions, answered clearly.
      </p>
    </motion.div>
  )
}



interface FAQDesktopProps {
  onLastFAQVisible?: (visible: boolean) => void
}

export default function FAQDesktop({ onLastFAQVisible }: FAQDesktopProps) {
  const [showMore, setShowMore] = useState(false)

  const endRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleScroll = () => {
      if (!endRef.current) return
      const rect = endRef.current.getBoundingClientRect()
      
      // We consider the "end" reached if the bottom of FAQ section 
      // moves above the lower half of the screen.
      const isPastEnd = rect.top < window.innerHeight * 0.75
      onLastFAQVisible?.(!isPastEnd)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onLastFAQVisible])

  return (
    <section
      className="relative w-full px-10 xl:px-24 flex flex-col py-[224px]"
      style={{ background: '#F8F9FA' }}
    >
      <div
        className="absolute top-0 left-0 w-100 h-125 bg-[#FBD979]/10 rounded-full blur-[100px] z-0"
        style={{ transform: 'translate(-40%, -10%)' }}
      />

      <div className="relative z-10 flex flex-col gap-0">
        {/* Territory for the sticky title */}
        <div className="flex gap-24 relative">
          {/* ── Left column — sticky ───────── */}
          <div className="w-[45%] relative">
            <div
              className="sticky"
              style={{
                top: '10vh',
              }}
            >
              <TitleBlock active={true} />
            </div>
          </div>

          {/* ── Right column — FAQ items that pull the sticky title ────────── */}
          <div className="flex-1 flex flex-col relative pb-4">
            <div className="flex flex-col gap-4">
              {/* Always sticky: first 3 FAQs */}
              {ALL_FAQS.slice(0, 3).map((item, i) => (
                <FAQItemDesktop key={i} item={item} />
              ))}
              
              {/* Conditionally sticky territory: FAQs 4 to 14 */}
              {showMore && (
                <div className="flex flex-col gap-4">
                  {ALL_FAQS.slice(3, 14).map((item, i) => (
                    <FAQItemDesktop key={i + 3} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Second section — Non-sticky FAQs (Title will no longer follow here) */}
        <div className="flex gap-24 relative">
          {/* Empty spacer for the left side */}
          <div className="w-[45%]" />

          {/* Remaining content */}
          <div className="flex-1 flex flex-col relative">
            {!showMore ? (
              <>
                <div className="flex flex-col gap-4">
                  {/* FAQs 4 to 6 are here when not expanded so they don't pull the title */}
                  {ALL_FAQS.slice(3, 6).map((item, i) => (
                    <FAQItemDesktop key={i + 3} item={item} />
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <motion.button
                    onClick={() => setShowMore(true)}
                    className="flex items-center gap-3 font-avenir-medium text-xl text-[#9096b5] hover:gap-5 transition-all bg-transparent border-none p-0 cursor-pointer"
                  >
                    See more
                    <svg width="18" height="10" viewBox="0 0 14 8" fill="none">
                      <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-4">
                  {/* Final 4 FAQs */}
                  {ALL_FAQS.slice(14, 18).map((item, i) => (
                    <FAQItemDesktop key={i + 14} item={item} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Sensor for the last question */}
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </section>
  )
}
