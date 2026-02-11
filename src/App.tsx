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
import BecomeInvestor from './components/BecomeInvestor'
import InvestorCardStack from './components/InvestorCardStack'
import FindYourPlace from './components/FindYourPlace'
import FAQSection from './components/FAQSection'
import ReadyNextStep from './components/ReadyNextStep'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-white overflow-x-hidden">
      <main className="max-w-[428px] mx-auto bg-white shadow-2xl relative overflow-hidden">
        {/* S1 — Hero */}
        <Hero />

        {/* S2 — A Shift in Focus */}
        <ShiftInFocus />

        {/* S3 — Introducing SIA Angel Hub */}
        <IntroducingSIA />

        {/* S4 — Cards "Here's How That Plays Out" (Accordion) */}
        <PlaysOutCards />

        {/* Sticky countdown — trigger after S4 */}
        <StickyCountdownFooter />

        {/* S6 — Welcome to Learning by Doing */}
        <LearningByDoing />

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

        {/* S12 — Become the Investor */}
        <BecomeInvestor />

        {/* S13 — Card Stack */}
        <InvestorCardStack />

        {/* S14 — Find Your Place */}
        <FindYourPlace />

        {/* S15 — FAQ */}
        <FAQSection />

        {/* S16 — Ready for the Next Step */}
        <ReadyNextStep />

        {/* S17 — Footer */}
        <Footer />
      </main>
    </div>
  )
}
