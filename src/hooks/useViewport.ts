import { useState, useEffect } from 'react'

type Viewport = 'mobile' | 'tablet' | 'desktop'

// mobile:  < 768px
// tablet:  768px – 1279px
// desktop: >= 1280px
function getViewport(width: number): Viewport {
  if (width < 768) return 'mobile'
  if (width < 1280) return 'tablet'
  return 'desktop'
}

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(() =>
    getViewport(window.innerWidth)
  )

  useEffect(() => {
    const handler = () => setViewport(getViewport(window.innerWidth))
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return viewport
}

export function isDesktopViewport(): boolean {
  return window.innerWidth >= 768
}
