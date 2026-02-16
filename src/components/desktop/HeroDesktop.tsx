import { motion } from 'framer-motion'

const INVESTORS = Array.from({ length: 9 }, (_, i) => `/assets_mobile/investors (${i + 1}).png`)

// Gradient that matches the mobile ShiftInFocus section
const PURPLE_GRADIENT = 'linear-gradient(to bottom, transparent 55%, #EEE9DE 100%), radial-gradient(ellipse at 50% 45%, #4a1878 0%, #210836 60%)'

export default function HeroDesktop() {
  return (
    <>
      {/* ── Hero header (logo only, not sticky) ────────────────────── */}
      <nav className="w-full bg-white flex items-center justify-center px-8 py-4 border-b border-gray-100">
        <motion.img
          src="/assets_mobile/LOGO SIA.svg"
          alt="SIA Angel Hub"
          className="h-10"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          loading="eager"
        />
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col overflow-hidden bg-white">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets_mobile/BG_sin_opacidad.png"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(255,255,255,0.88)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full text-center mx-auto px-6 pt-14 pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 max-w-3xl lg:max-w-4xl">

          {/* Pill badge */}
          <motion.div
            className="mb-5 md:mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="font-avenir-regular px-5 py-2 rounded-full text-sm md:text-sm"
              style={{
                border: '1px solid #EAB308',
                color: '#A16207',
                background: '#FEFCE8',
                letterSpacing: '0.01em',
              }}
            >
              An Experience-Driven Program
            </span>
          </motion.div>

          {/* Wrapper to sync Button width with Title width */}
          <div className="inline-flex flex-col items-center text-center">
            {/* Headline */}
            <motion.h1
              className="font-avenir-heavy leading-tight mb-5 md:mb-6"
              style={{
                fontSize: '82.86px',
                color: '#1B2A4A',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              Learn Investing
              <br />
              {/* "while" — italic + animated SVG circle */}
              <span className="relative inline-block" style={{ isolation: 'isolate' }}>
                <span className="font-avenir-medium" style={{ fontStyle: 'italic' }}>
                  while
                </span>
                <svg
                  viewBox="0 0 119 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '133%',
                    maxWidth: 'none',
                    height: 'auto',
                  }}
                >
                  <motion.path
                    d="M98.5638 9.75685C90.7739 6.65065 34.8676 5.38727 15.472 13.3068C9.09838 16.3325 3.7872 19.2973 1.7099 24.1785C-0.367393 29.0597 3.00821 37.7127 5.60483 40.3751C8.20145 43.0376 14.138 47.338 19.5274 49.7076C33.6491 55.9165 49.4286 57.3177 65.1138 55.0339C86.9023 51.8615 122.042 39.2443 116.474 16.3965C113.981 6.16613 100.275 2.12196 89.3252 1.26275C82.2782 0.709803 68.1834 1.26275 60.9128 3.54444"
                    stroke="#FBD979"
                    strokeWidth="2.12844"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
                  />
                </svg>
              </span>
              {' '}Investing
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-avenir-regular leading-relaxed mb-8 text-center"
              style={{
                color: '#4B5563',
                fontSize: '19px',
                maxWidth: '610px',
                width: '100%'
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Step into Angel Investing alongside other investors, working with
              live startups, and taking positions under real conditions.
            </motion.p>

            {/* CTA Button */}
            <motion.a
              href={import.meta.env.VITE_APPLY_URL || '#'}
              className="w-full font-avenir-medium text-white flex items-center justify-center rounded-2xl mb-3"
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
              aria-label="Apply to Join SIA Angel Hub"
            >
              <span className="mr-2">Apply to Join</span>
              <motion.img
                src="/assets_mobile/flecha.svg"
                alt=""
                className="w-[8.5px] h-[8.5px]"
                variants={{
                  initial: { filter: 'brightness(0) invert(1)' },
                  animate: { filter: 'brightness(0) invert(1)' },
                  hover: { filter: 'brightness(0) invert(0)' },
                  tap: { filter: 'brightness(0) invert(0)' },
                }}
              />
            </motion.a>
          </div>

          {/* Below CTA */}
          <motion.p
            className="font-avenir-light text-sm text-center mb-10"
            style={{ color: '#6B7280' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.42 }}
          >
            Participate from anywhere.
          </motion.p>

          {/* Stars + count + avatars */}
          <motion.div
            className="flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
          >
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#F5C518">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Label */}
            <p className="font-avenir-medium text-sm" style={{ color: '#1B2A4A' }}>
              1000+ Investors Worldwide
            </p>

            {/* Stacked avatars */}
            <div className="flex mt-1">
              {INVESTORS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Investor ${i + 1}`}
                  className="rounded-full border-2 border-white object-cover"
                  style={{
                    width: 36,
                    height: 36,
                    marginLeft: i === 0 ? 0 : -12,
                    zIndex: i,
                    position: 'relative',
                  }}
                  loading="lazy"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Two Purple Rectangles (stacked) ────────────────────────────── */}
      {/*
        Back  : full-width, no border-radius, flush to page edges
        Front : centered, rounded (28px), sits on top with negative margin
                Contains all the ShiftInFocus text
      */}
      <div className="relative w-full" style={{ marginTop: '1.5rem' }}>

        {/* Back rectangle — full width, no border-radius */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            background: PURPLE_GRADIENT,
            top: '40%',         // starts partway down so it peeks behind the front rect
            borderRadius: 0,
            zIndex: 0,
          }}
        />

        {/* Front rectangle — centered, rounded, all content inside */}
        <motion.div
          className="relative mx-auto flex flex-col items-center justify-center text-white text-center px-10 py-14"
          style={{
            background: PURPLE_GRADIENT,
            borderRadius: 28,
            maxWidth: '93%',
            minHeight: 220,
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/* Label */}
          <p
            className="font-avenir-light mb-6 tracking-widest"
            style={{ color: '#b7a9ff', opacity: 0.95, fontSize: '22px' }}
          >
            A shift in focus:
          </p>

          {/* Main heading — Forced to 1 line with whitespace-nowrap */}
          <h2
            className="font-avenir-medium leading-tight mb-8 whitespace-nowrap max-w-300"
            style={{
              fontSize: '52.5px',
              color: '#b7a9ff',
            }}
          >
            Angel Investing isn&apos;t about{' '}
            <em className="font-avenir-medium" style={{ fontStyle: 'italic' }}>knowing</em>{' '}
            more.
          </h2>

          {/* Divider */}
          <div
            className="mb-8"
            style={{ width: 80, height: 1.5, background: 'rgba(183,169,255,0.3)' }}
          />

          {/* Subtitle — word-by-word animation triggered on scroll */}
          <div className="flex flex-wrap justify-center gap-x-[0.35em] w-full max-w-300">
            {["It's", "about", "deciding", "better."].map((word, i) => (
              <motion.span
                key={i}
                className="font-avenir-regular text-white leading-relaxed"
                style={{ 
                  fontSize: '28px',
                  ...(i >= 2 ? { 
                    textShadow: '0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(183,169,255,0.4)',
                    filter: 'brightness(1.4)'
                  } : {})
                }}
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.15,
                  ease: [0.4, 0, 0.2, 1] 
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </>
  )
}
