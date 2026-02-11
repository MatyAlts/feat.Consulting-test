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

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      layout
      className="relative flex-1 bg-white rounded-lg p-3 pt-4 flex flex-col shadow-lg min-h-[90px] text-left"
      style={{ minWidth: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      onClick={() => setOpen(!open)}
    >
      {/* Left yellow bar */}
      <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-[#fad46e] rounded-r-sm" />
      
      <div className="pl-1">
        <span className="font-avenir-heavy text-[1.4rem] block leading-tight text-[#0d1a2c]">
          {stat.value}
        </span>
        <span className="font-avenir-heavy text-[0.8rem] block leading-tight text-[#0d1a2c] mt-0.5">
          {stat.label.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="body"
            className="font-avenir-regular text-[10px] leading-snug mt-2 text-gray-500"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {stat.body}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="absolute bottom-2 right-2 text-[#0d1a2c] opacity-30 text-[10px]">
        <motion.span 
          style={{ display: 'block' }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </div>
    </motion.div>
  )
}

export default function ProgramBuiltOnExperience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section 
      ref={ref} 
      className="relative px-5 pt-12"
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
          className="font-avenir-regular text-[14px] mt-4 px-2"
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

        {/* Overlapping Stats Row - Using items-start for independent height */}
        <div className="absolute left-0 right-0 px-2" style={{ top: 'calc(100% - 45px)', zIndex: 20 }}>
          <div className="flex items-start gap-2.5">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Fluid Gradient Transition to next section (#F5F0E8) */}
      <div 
        className="h-24 -mx-5" 
        style={{ 
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #F5F0E8 100%)',
          marginTop: '10px',
          width: 'calc(100% + 40px)'
        }} 
      />
    </section>
  )
}
