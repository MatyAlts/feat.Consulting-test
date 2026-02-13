import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const STATS = [
  {
    value: '+35',
    label: 'Rounds Run',
    body: 'Repeated decision cycles, not one-off experiences.',
  },
  {
    value: '+1000',
    label: 'Investors Formed',
    body: 'A diverse base of thoughtful, active participants.',
  },
  {
    value: '+2000',
    label: 'Startups Reviewed',
    body: 'Broad exposure across industries, stages, and quality levels.',
  },
]

function StatCard({ stat, index, visible }: { stat: typeof STATS[0]; index: number; visible: boolean }) {
  const [open, setOpen] = useState(false)

  // Split label to ensure multiple lines
  const labelLines = stat.label.split(' ')

  return (
    <motion.div
      className="relative bg-white rounded shadow-[0px_3.45px_14.8px_4.93px_rgba(49,48,63,0.11)] flex flex-col cursor-pointer overflow-hidden border-none shrink-0"
      style={{ width: open ? '97px' : '97.7px' }}
      initial={{ opacity: 0, y: 28, scale: 0.92, height: 70.6 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        y: visible ? 0 : 28,
        scale: visible ? 1 : 0.92,
        height: open ? 95 : 70.6 
      }}
      transition={{ 
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.5, delay: 0.1 + index * 0.12 },
        y: { duration: 0.5, delay: 0.1 + index * 0.12 },
        scale: { duration: 0.5, delay: 0.1 + index * 0.12 },
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-start items-start gap-1.5 pt-1.5 pb-5">
        {/* Yellow stroke bar - exactly as snippet, style used to satisfy lint */}
        <div 
          className="w-0 h-9 shrink-0 ml-[1.73px]" 
          style={{ outline: '3.45px solid #FBD979', outlineOffset: '-1.73px' }}
        />
        
        <div className="flex-1 flex flex-col justify-start items-start gap-px pr-2">
          {/* Title - Avenir Heavy 15px */}
          <div className="text-gray-900 text-[15px] font-avenir-heavy leading-4 tracking-tight">
            <span className="block">{stat.value}</span>
            {labelLines.map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </div>

          {/* Description - Avenir Next 8.12px */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="overflow-hidden w-full mt-1"
              >
                <p 
                  className="text-slate-700 font-avenir-regular leading-[7.95px] pr-1"
                  style={{ fontSize: '8.12px', fontFamily: 'AvenirNext' }}
                >
                  {stat.body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Unified toggle icon - Absolute to ensure it never gets cut off */}
      <div className="absolute bottom-1 right-1.5 opacity-40 text-slate-700 text-[8.81px] font-normal leading-none h-2 w-2 flex items-center justify-end">
        {open ? '—' : '+'}
      </div>
    </motion.div>
  )
}

export default function ProgramBuiltOnExperience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const statsRef = useRef(null)
  const statsVisible = useInView(statsRef, { once: true, margin: '-20%' })

  return (
    <section 
      ref={ref} 
      className="relative px-4 pt-8"
      style={{ 
        background: 'linear-gradient(to bottom, #f4f7ec 0%, #ffffff 120px, #ffffff 100%)' 
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
          <span style={{ whiteSpace: 'nowrap' }}>Experience, Not Theory</span>
        </motion.h2>

        <motion.p
          className="font-avenir-regular text-[14px] mt-0.5 px-2"
          style={{ color: '#2d344e', lineHeight: 1.4, fontFamily: 'AvenirNext' }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          SIA is built on a proven investing methodology developed through years of real Angel Investing: Shaped by thousands of startup evaluations, investor discussions, and live investment decisions.
        </motion.p>
      </div>

      <div className="relative max-w-[400px] mx-auto z-10">
        <motion.img
          src="/assets_mobile/APBoE_pic.png"
          alt="Program experience"
          className="w-full rounded-2xl object-cover shadow-sm"
          style={{ height: 'auto', minHeight: '340px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          loading="lazy"
        />

        {/* Stats Row - Absolute to prevent pushing content below on expansion */}
        <div className="absolute left-0 right-0 px-1 z-20" style={{ top: 'calc(100% - 32px)' }}>
          <div ref={statsRef} className="flex justify-center items-start gap-3 h-fit">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} visible={statsVisible} />
            ))}
          </div>
        </div>
      </div>

      {/* Fluid Gradient Transition - Set to 88px to achieve 55.76px gap from card bottom to title */}
      <div 
        className="h-[88px] -mx-5" 
        style={{ 
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #F5F0E8 100%)',
          width: 'calc(100% + 40px)'
        }} 
      />
    </section>
  )
}
