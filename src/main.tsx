import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppDesktop from './AppDesktop.tsx'
import SmoothScroll from './components/SmoothScroll.tsx'
import { isDesktopViewport } from './hooks/useViewport.ts'
import { usePreloader } from './hooks/usePreloader.ts'

function Root() {
  const isReady = usePreloader()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isReady) {
      // Small delay for smooth transition
      const timer = setTimeout(() => setShow(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isReady])

  if (!show) {
    return (
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'white', 
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Simple elegant loader or just white screen as requested to hide the jump */}
        <div style={{
          width: '40px',
          height: '40px',
          border: '2px solid #f3f4f6',
          borderTop: '2px solid #1B2A4A',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  const RootComponent = isDesktopViewport() ? AppDesktop : App

  return (
    <>
      <SmoothScroll />
      <RootComponent />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

