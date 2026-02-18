import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppDesktop from './AppDesktop.tsx'
import SmoothScroll from './components/SmoothScroll.tsx'
import { isDesktopViewport } from './hooks/useViewport.ts'

const RootComponent = isDesktopViewport() ? AppDesktop : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll />
    <RootComponent />
  </StrictMode>,
)
