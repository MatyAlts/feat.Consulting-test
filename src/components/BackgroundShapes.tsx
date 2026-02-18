import { motion } from 'framer-motion'

export default function BackgroundShapes() {
  // SVGs categorized by user instructions
  const rightShapes = [
    '/assets_mobile/formas (1).svg',
    '/assets_mobile/formas (4).svg',
  ]
  const leftShapes = [
    '/assets_mobile/formas (2).svg',
    '/assets_mobile/formas (3).svg',
  ]

  // Generate shapes distributed along the FULL page height
  // Strictly Intercalating: 1 Right, 1 Left, 1 Right, 1 Left...
  const totalShapes = 32
  const shapes = []

  for (let i = 0; i < totalShapes; i++) {
    // i=0 (Right), i=1 (Left), i=2 (Right), i=3 (Left)...
    const isRight = i % 2 === 0
    const sideShapes = isRight ? rightShapes : leftShapes
    const src = sideShapes[Math.floor((i / 2) % sideShapes.length)]
    
    // Distribute along the full container height (from 0.5% to 99.5%)
    const top = `${0.5 + (i / totalShapes) * 99}%`
    
    // Fixed offsets to keep them at the edges
    const horizontalOffset = '-10%' 
    const rotate = (Math.random() - 0.5) * 60 
    const scale = 1.4 + (i % 5) * 0.2
    const opacity = 0.28 

    shapes.push({
      src,
      top,
      isRight,
      offset: horizontalOffset,
      rotate,
      scale,
      opacity
    })
  }

  return (
    /* 
       z-index: 0 ensures they are behind anything with z-index >= 1.
       We'll ensure main content has z-index: 10 or similar in AppDesktop.
    */
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-5 select-none hidden md:block">
      {shapes.map((shape, i) => (
        <motion.img
          key={i}
          src={shape.src}
          alt=""
          className="absolute"
          style={{
            top: shape.top,
            left: !shape.isRight ? shape.offset : 'auto',
            right: shape.isRight ? shape.offset : 'auto',
            transform: `rotate(${shape.rotate}deg)`,
            opacity: 0,
            width: 'auto',
            maxHeight: '600px',
            scale: shape.scale,
          }}
          whileInView={{ opacity: shape.opacity }}
          viewport={{ once: true, margin: "600px" }}
          transition={{ duration: 1.2 }}
        />
      ))}
    </div>
  )
}
