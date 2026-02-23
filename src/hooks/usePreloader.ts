import { useState, useEffect } from 'react'

export function usePreloader() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const criticalImages = [
      '/assets_mobile/LOGO SIA.svg',
      '/assets_mobile/BG_sin_opacidad.png'
    ]

    const loadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
      })
    }

    const loadFonts = async () => {
      if ('fonts' in document) {
        try {
          const fontsToLoad = [
            '800 16px Avenir',
            '500 16px Avenir',
            '400 16px Avenir',
            '300 16px Avenir',
            '400 16px AvenirNext',
            '600 16px AvenirNext'
          ]
          
          await Promise.all(fontsToLoad.map(f => document.fonts.load(f)))
          await document.fonts.ready
        } catch (e) {
          console.error('Fonts loading error:', e)
        }
      }
    }

    const loadAll = async () => {
      try {
        // Start loading both fonts and images
        await Promise.all([
          loadFonts(),
          ...criticalImages.map(loadImage)
        ])
      } catch (e) {
        console.error('Preloader error:', e)
      } finally {
        // Even if some image fails, we show the page after a timeout or try to proceed
        setIsReady(true)
      }
    }

    loadAll()
  }, [])

  return isReady
}
