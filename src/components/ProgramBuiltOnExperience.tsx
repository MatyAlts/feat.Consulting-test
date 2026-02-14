import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion'

const STATS = [
  {
    target: 35,
    prefix: '+',
    label: 'Rounds Run',
    body: 'Repeated decision cycles, not one-off experiences.',
  },
  {
    target: 1000,
    prefix: '+',
    label: 'Investors Formed',
    body: 'A diverse base of thoughtful, active participants.',
  },
  {
    target: 2000,
    prefix: '+',
    label: 'Startups Reviewed',
    body: 'Broad exposure across industries, stages, and quality levels.',
  },
]

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString())

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}

function StatCardTrigger({ stat, index, onClick, visible }: { stat: typeof STATS[0]; index: number; onClick: () => void; visible: boolean }) {
  const labelLines = stat.label.split(' ')

  return (
    <motion.div
      layoutId={`stat-card-${index}`}
      onClick={onClick}
      className="relative bg-white rounded shadow-[0px_3.45px_14.8px_4.93px_rgba(49,48,63,0.11)] flex flex-col cursor-pointer overflow-hidden border-none shrink-0"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 28 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileTap={{ scale: 0.96 }}
      style={{ width: '97.7px', height: '70.6px' }}
    >
      <div className="flex justify-start items-start gap-1.5 pt-1.5 pb-5">
        <motion.div 
          layoutId={`yellow-accent-${index}`}
          className="w-0 h-9 shrink-0 ml-[1.73px]" 
          style={{ outline: '3.45px solid #FBD979', outlineOffset: '-1.73px' }}
        />
        
        <div className="flex-1 flex flex-col justify-start items-start gap-px pr-2">
          <motion.div 
            layoutId={`stat-title-${index}`}
            className="text-gray-900 text-[15px] font-avenir-heavy leading-4 tracking-tight"
          >
            <span className="block">
              {stat.prefix}{visible ? <AnimatedNumber value={stat.target} /> : '0'}
            </span>
            {labelLines.map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div 
        layoutId={`plus-btn-${index}`}
        className="absolute bottom-1 right-1.5 opacity-30 text-[#0d1a2c] text-[8px]"
      >
        +
      </motion.div>
    </motion.div>
  )
}

export default function ProgramBuiltOnExperience() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const statsRef = useRef(null)
  const statsVisible = useInView(statsRef, { once: true, margin: '-20%' })

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  return (
    <section 
      ref={ref} 
      className="relative px-4 pt-8"
      style={{ 
        background: 'linear-gradient(to bottom, #f4f8ed 0%, #ffffff 120px, #ffffff 65%, #EEE9DE 100%)' 
      }}
    >
      <div className="max-w-[400px] mx-auto text-center mb-8">
        <motion.h2
          className="font-avenir-heavy leading-none text-[#060621]"
          style={{ fontSize: '29px' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          A Program Built on
          <br />
          Experience, Not Theory
        </motion.h2>
      </div>

      <motion.p
        className="font-avenir-regular text-center text-slate-700 leading-normal px-2 mb-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ fontSize: '15.5px' }}
      >
        SIA is built on a proven investing methodology developed through years of real Angel Investing: Shaped by thousands of startup evaluations, investor discussions, and live investment decisions.
      </motion.p>

      <div className="relative max-w-[400px] mx-auto z-10">
        <motion.img
          src="/assets_mobile/APBoE_pic.png"
          alt="Program experience"
          className="w-full rounded-2xl object-cover shadow-sm mb-4"
          style={{ height: 'auto', minHeight: '340px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          loading="lazy"
        />

        <div className="absolute left-0 right-0 px-2 z-20" style={{ top: 'calc(100% - 32px)' }}>
          <div ref={statsRef} className="flex justify-center items-start gap-3 h-fit">
            {STATS.map((stat, i) => (
              <StatCardTrigger 
                key={i} 
                stat={stat} 
                index={i} 
                onClick={() => setIsModalOpen(true)} 
                visible={statsVisible}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-16" />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            {/* Backdrop: neutral black/60 with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container - NO horizontal/scale animation here to avoid jitter */}
            <div className="relative w-full max-w-[400px] z-10 flex flex-col items-center">
              {/* Close Button UI elements */}
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 text-white/50 p-2"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-8"
              >
                <h3 className="font-avenir-heavy text-[34px] leading-[1.1] text-white">
                  SIA'S Numbers
                  <br />
                  at a Glance
                </h3>
              </motion.div>

              <div className="flex flex-col gap-4 w-full">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={i}
                    layoutId={`stat-card-${i}`}
                    className="bg-white rounded-[20px] overflow-hidden shadow-2xl flex relative"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* The yellow bar also transforms via layoutId */}
                    <motion.div 
                      layoutId={`yellow-accent-${i}`}
                      className="w-[6px] bg-[#fad46e] shrink-0" 
                    />
                    
                    <div className="p-5 flex-1 flex flex-col justify-center">
                      <motion.div 
                        layoutId={`stat-title-${i}`}
                        className="font-avenir-heavy text-[21px] text-[#0d1a2c] mb-1 leading-tight"
                      >
                        {stat.prefix}<AnimatedNumber value={stat.target} /> {stat.label}
                      </motion.div>
                      
                      {/* Body text appears after layout settles */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-avenir-regular text-[14.5px] text-slate-500 leading-tight"
                      >
                        {stat.body}
                      </motion.p>
                    </div>

                    {/* Plus vanishes into the transition */}
                    <motion.div layoutId={`plus-btn-${i}`} className="opacity-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
