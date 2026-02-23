import { motion } from 'framer-motion'

export default function FinalCTADesktop() {
  return (
    <section className="relative w-full py-40 overflow-hidden bg-white flex flex-col items-center justify-center">
      {/* Decor shapes outside the container */}
      {/* Grey shape top-left */}
      <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-[#E5E7EB] rounded-[80px] rotate-45 pointer-events-none opacity-60" />
      
      {/* Beige arc bottom-right */}
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] border-[50px] border-[#FCE6D2] rounded-full pointer-events-none opacity-70" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[1020px] bg-[#1A1C25] rounded-[60px] flex flex-col items-center justify-center text-center shadow-2xl mx-4 aspect-[502/269]"
      >
        <h2 className="font-avenir-medium text-white leading-[1.1] tracking-tight" style={{ fontSize: '64.5px', marginBottom: '4px' }}>
          Ready for the <br /> Next Step?
        </h2>
        
        <p className="font-avenir-regular text-[#94969C] max-w-xl mx-auto leading-relaxed" style={{ fontSize: '22px', marginBottom: '16px' }}>
          If you're serious about learning through real <br className="hidden md:block" /> decisions, let's talk.
        </p>
        
        <motion.a
          href={import.meta.env.VITE_APPLY_URL || '#'}
          className="w-full max-w-[440px] font-avenir-heavy text-[#1A1C25] flex items-center justify-center gap-2 rounded-[20px] cursor-pointer no-underline hover:brightness-105 transition-all"
          style={{
            backgroundColor: '#FED97F',
            fontSize: '22px',
            height: '74px',
            boxShadow: '0 4px 14px 0 rgba(254, 217, 127, 0.2)',
            marginBottom: '5px'
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Start a Conversation</span>
          <img 
            src="/assets_mobile/flecha.svg" 
            alt="" 
            className="w-[8.5px] h-[8.5px]" 
            style={{ filter: 'brightness(0) invert(0.1)' }}
          />
        </motion.a>


        <p className="font-avenir-regular text-[#667085] text-lg opacity-70">
          No commitment. Just a starting point.
        </p>
      </motion.div>
    </section>
  )
}
