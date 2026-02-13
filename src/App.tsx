import { useState, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import './index.css'
import Hero from './components/Hero'
import ShiftInFocus from './components/ShiftInFocus'
import IntroducingSIA from './components/IntroducingSIA'
import PlaysOutCards from './components/PlaysOutCards'
import StickyCountdownFooter from './components/StickyCountdownFooter'
import LearningByDoing from './components/LearningByDoing'
import FeatureCardsGrid from './components/FeatureCardsGrid'
import ProgramBuiltOnExperience from './components/ProgramBuiltOnExperience'
import BackedByPeople from './components/BackedByPeople'
import ReviewsCarousel from './components/ReviewsCarousel'
import TrustedByLogos from './components/TrustedByLogos'
import DarkZone from './components/DarkZone'
import FAQSection from './components/FAQSection'
import ReadyNextStep from './components/ReadyNextStep'
import Footer from './components/Footer'

export default function App() {
  const [activated, setActivated] = useState(false)
  const activationRef = useRef<HTMLDivElement>(null)
  const inView = useInView(activationRef, { margin: '0px 0px -100px 0px' })

  // Once it enters view, keep it activated
  useEffect(() => {
    if (inView && !activated) {
      requestAnimationFrame(() => setActivated(true))
    }
  }, [inView, activated])

  return (
    <div className="bg-white" style={{ overflowX: 'clip' }}>
      <main className="max-w-[428px] mx-auto bg-white shadow-2xl relative" style={{ overflowX: 'clip' }}>
        {/* S1 — Hero */}
        <Hero />

        {/* S2 — A Shift in Focus */}
        <ShiftInFocus />

        {/* S3 — Introducing SIA Angel Hub */}
        <IntroducingSIA />

        {/* S4 — Cards "Here's How That Plays Out" (Accordion) */}
        <PlaysOutCards />

        {/* S6 — Welcome to Learning by Doing */}
        <LearningByDoing />

        {/* Activation Point for Sticky Footer - Absolute to avoid white line */}
        <div ref={activationRef} className="absolute h-0 w-0 pointer-events-none" />

        {/* S7 — Feature Cards Grid (Modal) */}
        <FeatureCardsGrid />

        {/* S8 — A Program Built on Experience */}
        <ProgramBuiltOnExperience />

        {/* S9 — Backed by People */}
        <BackedByPeople />

        {/* S10 — Reviews Carousel */}
        <ReviewsCarousel />

        {/* S11 — Trusted By */}
        <TrustedByLogos />

        {/* S12-14 — Dark Zone (Become + Cards + CTA) */}
        <DarkZone />

        {/* S15 — FAQ */}
        <FAQSection />

        {/* S16 — Ready for the Next Step */}
        <ReadyNextStep />

        {/* Sticky countdown — now sitting before official footer */}
        <StickyCountdownFooter activated={activated} />

        {/* S17 — Footer */}
        <Footer />
      </main>
    </div>
  )
}
