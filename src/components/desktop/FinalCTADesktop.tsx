import { motion } from 'framer-motion'

export default function FinalCTADesktop() {
  return (
    <section className="relative w-full py-40 overflow-hidden bg-white flex flex-col items-center justify-center text-center">
      {/* Decor shapes */}
      {/* Grey shape top-left - approximating rounded shape */}
      <div className="absolute top-0 left-0 w-100 h-100 bg-[#D4D8DD] rounded-[100%] blur-3xl opacity-40 transform -translate-x-[40%] -translate-y-[40%] pointer-events-none" />
      {/* Sharper grey shape if needed, user image shows solid shape */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4D8DD] rounded-br-[100px] transform -translate-x-[20%] -translate-y-[20%] pointer-events-none" style={{ borderRadius: '0 0 150px 0' }} />

      {/* Beige shape bottom-right */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FFE8CC] transform translate-x-[30%] translate-y-[30%] rotate-45 pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl px-6 flex flex-col items-center"
      >
        <div className="inline-flex flex-col items-center text-center">
          <h2 className="font-avenir-heavy text-[#0d1a2c] text-6xl md:text-7xl mb-6 leading-tight">
            Ready for the <br /> Next Step?
          </h2>
          <p className="font-avenir-regular text-[#5b616e] text-xl md:text-2xl mb-10 max-w-xl mx-auto leading-relaxed">
            If you’re serious about learning through real <br className="hidden md:block"/> decisions, let’s talk.
          </p>
          
          <motion.a
            href={import.meta.env.VITE_APPLY_URL || '#'}
            className="w-full font-avenir-medium text-white flex items-center justify-center gap-3 rounded-2xl cursor-pointer no-underline"
            style={{
              backgroundColor: '#09092c',
              border: '1.5px solid #fbd979',
              whiteSpace: 'nowrap',
              fontSize: '20.83px',
              height: '69px'
            }}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={{
              initial: { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              hover: { backgroundColor: '#fbd979', color: '#09092c' },
              tap: { scale: 0.97, backgroundColor: '#fbd979', color: '#09092c' },
            }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <span>Start a Conversation</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
