import { motion } from 'framer-motion'

const INVESTORS = Array.from({ length: 9 }, (_, i) => `/assets_mobile/investors (${i + 1}).png`)

export default function Hero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Background image container - starting below the logo */}
      <div className="absolute inset-x-0 bottom-0 z-0" style={{ top: '105px' }}>
        <img
          src="/assets_mobile/BG_sin_opacidad.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 1 }}
          loading="eager"
        />
        {/* White overlay to create the "faded" effect from the reference */}
        <div
          className="absolute inset-0"
          style={{ 
            background: 'rgba(255,255,255,0.92)' 
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-5 pt-10 pb-10 text-center">

        {/* Logo */}
        <motion.img
          src="/assets_mobile/LOGO SIA.svg"
          alt="SIA Angel Hub"
          className="h-10 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          loading="eager"
        />

        {/* Pill badge */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span
            className="font-avenir-regular text-xs px-4 py-1.5 rounded-full"
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

        {/* Headline */}
        <motion.h1
          className="font-avenir-heavy leading-tight mb-5 text-center"
          style={{ fontSize: '2.6rem', color: '#1B2A4A', maxWidth: 340 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          Learn Investing
          <br />
          {/* "while" — Avenir Medium italic + SVG circle overlay */}
          <span className="relative inline-block" style={{ isolation: 'isolate' }}>
            <span
              className="font-avenir-medium"
              style={{ fontStyle: 'italic' }}
            >
              while
            </span>
            <svg
              width="119"
              height="58"
              viewBox="0 0 119 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute pointer-events-none select-none"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '130%',
                maxWidth: 'none',
                height: 'auto',
              }}
            >
              <motion.path
                d="M98.5638 9.75685C90.7739 6.65065 34.8676 5.38727 15.472 13.3068C9.09838 16.3325 3.7872 19.2973 1.7099 24.1785C-0.367393 29.0597 3.00821 37.7127 5.60483 40.3751C8.20145 43.0376 14.138 47.338 19.5274 49.7076C33.6491 55.9165 49.4286 57.3177 65.1138 55.0339C86.9023 51.8615 122.042 39.2443 116.474 16.3965C113.981 6.16613 100.275 2.12196 89.3252 1.26275C82.2782 0.709803 68.1834 1.26275 60.9128 3.54444"
                stroke="#FBD979"
                strokeWidth="2.12844"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  pathLength: { duration: 2.4, ease: [0.4, 0, 0.2, 1], delay: 0.6 },
                  opacity: { duration: 0.2, delay: 0.6 }
                }}
              />
            </svg>
          </span>
          {' '}Investing
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-avenir-regular text-sm leading-relaxed mb-7 text-center"
          style={{ color: '#4B5563', maxWidth: 320 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Step into Angel Investing alongside other investors, working with live startups, and taking positions under real conditions.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href={import.meta.env.VITE_APPLY_URL || '#'}
          className="font-avenir-medium text-white flex items-center justify-center rounded-2xl py-4 text-base mb-2 px-6 w-full"
          style={{ 
            backgroundColor: '#09092c', 
            border: '1.5px solid #fbd979',
            maxWidth: 380 
          }}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          variants={{
            initial: { opacity: 0, scale: 0.96 },
            animate: { opacity: 1, scale: 1 },
            hover: { 
              backgroundColor: '#fbd979',
              color: '#09092c',
            },
            tap: { 
              scale: 0.97,
              backgroundColor: '#fbd979',
              color: '#09092c',
            }
          }}
          transition={{ 
            duration: 0.25, 
            ease: "easeInOut",
          }}
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
              tap: { filter: 'brightness(0) invert(0)' }
            }}
          />
        </motion.a>

        {/* Below CTA */}
        <motion.p
          className="font-avenir-light text-xs text-center mb-8"
          style={{ color: '#6B7280' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.42 }}
        >
          Participate from anywhere.
        </motion.p>

        {/* Stars + count + avatars — NO card, all centered */}
        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
        >
          {/* Stars */}
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#F5C518">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Label */}
          <p className="font-avenir-medium text-xs" style={{ color: '#1B2A4A' }}>
            1000+ Investors Worldwide
          </p>

          {/* Stacked avatars */}
          <div className="flex mt-1">
            {INVESTORS.map((src, i) => {
              const hoverAnim = [
                { scale: 1.25, rotate: -6, y: -4, zIndex: 20 },
                { scale: 1.25, rotate: 5, y: -6, zIndex: 20 },
                { scale: 1.25, rotate: -3, y: -2, zIndex: 20 },
                { scale: 1.25, rotate: 4, y: -5, zIndex: 20 },
                { scale: 1.25, rotate: -8, y: -3, zIndex: 20 },
                { scale: 1.25, rotate: 3, y: -7, zIndex: 20 },
                { scale: 1.25, rotate: -4, y: -4, zIndex: 20 },
                { scale: 1.25, rotate: 7, y: -5, zIndex: 20 },
                { scale: 1.25, rotate: -5, y: -3, zIndex: 20 },
              ][i % 9];

              return (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Investor ${i + 1}`}
                  className="rounded-full border-2 border-white object-cover cursor-pointer"
                  style={{
                    width: 32,
                    height: 32,
                    marginLeft: i === 0 ? 0 : -10,
                    zIndex: i,
                    position: 'relative',
                  }}
                  whileHover={hoverAnim}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  loading="lazy"
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
