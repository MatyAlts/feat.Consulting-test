import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import './index.css'
import HeroDesktop from './components/desktop/HeroDesktop'
import PlaysOutDesktop from './components/desktop/PlaysOutDesktop'
import LearningByDoingDesktop from './components/desktop/LearningByDoingDesktop'
import ProgramBuiltOnExperienceDesktop from './components/desktop/ProgramBuiltOnExperienceDesktop'
import BecomeTheInvestorDesktop from './components/desktop/BecomeTheInvestorDesktop'
import FAQDesktop from './components/desktop/FAQDesktop'
import StickyCountdownFooterDesktop from './components/desktop/StickyCountdownFooterDesktop'
import FinalCTADesktop from './components/desktop/FinalCTADesktop'
import FooterDesktop from './components/desktop/FooterDesktop'
import BackgroundShapes from './components/BackgroundShapes'

export default function AppDesktop() {
  const [activated, setActivated] = useState(false)
  const [footerSuppressed, setFooterSuppressed] = useState(false)
  const activationRef = useRef<HTMLDivElement>(null)
  
  const inView = useInView(activationRef, { margin: '0px 0px -100px 0px' })

  useEffect(() => {
    if (inView && !activated) {
      requestAnimationFrame(() => setActivated(true))
    }
  }, [inView, activated])

  // Force scroll to top on reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white min-h-screen relative" style={{ overflowX: 'clip' }}>
      <BackgroundShapes />
      <main className="w-full relative">
        {/* S1 — Hero */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <HeroDesktop />
        </motion.div>

        {/* S2 — Plays Out */}
        <PlaysOutDesktop />

        {/* Activation point — sticky footer appears after PlayOutCards */}
        <div ref={activationRef} className="h-0 w-0 pointer-events-none" />

        {/* S3 — Learning by Doing */}
        <LearningByDoingDesktop />

        {/* S4 — Program Built on Experience */}
        <ProgramBuiltOnExperienceDesktop />

        {/* S5 — Become the Investor */}
        <BecomeTheInvestorDesktop />

        {/* S6 — FAQ Section */}
        <FAQDesktop 
          onLastFAQVisible={(visible) => {
            // If the last FAQ sensor is NOT visible, it means we are below it
            // We suppress the footer when we are below the FAQ items
            setFooterSuppressed(!visible)
          }} 
        />

        {/* S7 — Final CTA */}
        <FinalCTADesktop />

        {/* Footer */}
        <FooterDesktop />
      </main>

      {/* Sticky countdown footer */}
      <StickyCountdownFooterDesktop 
        activated={activated} 
        externallySuppressed={footerSuppressed}
      />
    </div>
  )
}
