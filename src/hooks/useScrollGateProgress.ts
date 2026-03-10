import { useEffect, useRef, type RefObject } from 'react'
import { useMotionValue, type MotionValue } from 'framer-motion'

type GateOptions = {
  containerRef: RefObject<HTMLElement | null>
  sensitivity?: number
  edgeHoldMs?: number
  maxEdgeHoldMs?: number
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
// Bound single-event input but allow enough for flings to complete progress.
const clampDelta = (value: number) => Math.max(-250, Math.min(250, value))
const ACTIVE_EPSILON_PX = 2
const PROGRESS_EPSILON = 0.001

export function useScrollGateProgress({
  containerRef,
  sensitivity = 0.002,
  edgeHoldMs = 300,
  maxEdgeHoldMs = 1500,
}: GateOptions): MotionValue<number> {
  const progress = useMotionValue(0)
  const progressRef = useRef(0)
  const touchYRef = useRef<number | null>(null)
  const phaseRef = useRef<'idle' | 'active' | 'owning-outward-burst' | 'dampening-exit'>('idle')
  const dampeningStartedAtRef = useRef(0)
  const ownershipStartedAtRef = useRef(0)
  const lastOutwardInputAtRef = useRef(0)
  const releaseTimerRef = useRef<number | null>(null)
  const windowCaptureEnabledRef = useRef(false)

  useEffect(() => {
    const unsubscribe = progress.on('change', (latest) => {
      progressRef.current = latest
    })
    return unsubscribe
  }, [progress])

  useEffect(() => {
    const containerEl = containerRef.current
    if (!containerEl) return

    const clearReleaseTimer = () => {
      if (releaseTimerRef.current != null) {
        window.clearTimeout(releaseTimerRef.current)
        releaseTimerRef.current = null
      }
    }

    const getBounds = () => {
      const rect = containerEl.getBoundingClientRect()
      const absoluteTop = window.scrollY + rect.top
      const absoluteBottom = window.scrollY + rect.bottom
      const gateEnd = Math.max(absoluteTop, absoluteBottom - window.innerHeight)

      return { absoluteTop, gateEnd }
    }

    const isInActiveWindow = (y: number, absoluteTop: number, gateEnd: number) =>
      y >= absoluteTop - ACTIVE_EPSILON_PX && y <= gateEnd + ACTIVE_EPSILON_PX

    const isCurrentlyInActiveWindow = () => {
      const bounds = getBounds()
      const y = window.scrollY
      return isInActiveWindow(y, bounds.absoluteTop, bounds.gateEnd)
    }

    const setActiveOrIdlePhase = () => {
      phaseRef.current = isCurrentlyInActiveWindow() ? 'active' : 'idle'
    }

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return
      if (!shouldConsume(event.deltaY)) return

      event.preventDefault()
      event.stopPropagation()
      consume(event.deltaY)
    }

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null
    }

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY
      const prevY = touchYRef.current
      if (currentY == null || prevY == null) return

      const deltaY = prevY - currentY
      touchYRef.current = currentY
      if (deltaY === 0 || !shouldConsume(deltaY)) return

      event.preventDefault()
      event.stopPropagation()
      consume(deltaY)
    }

    const enableWindowBurstCapture = () => {
      if (windowCaptureEnabledRef.current) return
      windowCaptureEnabledRef.current = true
      window.addEventListener('wheel', onWheel, { passive: false, capture: true })
      window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true })
    }

    const disableWindowBurstCapture = () => {
      if (!windowCaptureEnabledRef.current) return
      windowCaptureEnabledRef.current = false
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchstart', onTouchStart, { capture: true })
      window.removeEventListener('touchmove', onTouchMove, { capture: true })
    }

    const startDampenedExit = () => {
      phaseRef.current = 'dampening-exit'
      dampeningStartedAtRef.current = performance.now()
      // We keep window capture enabled for a brief period to apply friction
      window.setTimeout(() => {
        if (phaseRef.current === 'dampening-exit') {
          releaseOutwardOwnership()
        }
      }, 1200) // Increased to 1200ms to absorb high momentum
    }

    const releaseOutwardOwnership = () => {
      clearReleaseTimer()
      ownershipStartedAtRef.current = 0
      lastOutwardInputAtRef.current = 0
      disableWindowBurstCapture()
      setActiveOrIdlePhase()
    }

    const scheduleCompletionRelease = () => {
      clearReleaseTimer()
      releaseTimerRef.current = window.setTimeout(() => {
        if (phaseRef.current !== 'owning-outward-burst') return

        const idleFor = performance.now() - lastOutwardInputAtRef.current
        const atBottom = progressRef.current >= 1 - PROGRESS_EPSILON
        if (atBottom && idleFor >= edgeHoldMs) {
          releaseOutwardOwnership()
        }
      }, edgeHoldMs)
    }

    const beginOrRefreshOutwardOwnership = () => {
      const now = performance.now()

      if (phaseRef.current !== 'owning-outward-burst') {
        ownershipStartedAtRef.current = now
      }
      phaseRef.current = 'owning-outward-burst'
      lastOutwardInputAtRef.current = now
      enableWindowBurstCapture()
      scheduleCompletionRelease()
    }

    const advanceProgress = (deltaY: number) => {
      const next = clamp01(progressRef.current + clampDelta(deltaY) * sensitivity)
      progress.set(next)
    }

    const shouldConsume = (deltaY: number) => {
      const bounds = getBounds()
      const y = window.scrollY
      const inActiveWindow = isInActiveWindow(y, bounds.absoluteTop, bounds.gateEnd)
      const atBottom = progressRef.current >= 1 - PROGRESS_EPSILON
      const atTop = progressRef.current <= PROGRESS_EPSILON

      if (phaseRef.current === 'dampening-exit') {
        // Reverse cancels friction exit
        if (deltaY < 0) {
          releaseOutwardOwnership()
          return true
        }
        return true // Still consume to apply our custom friction
      }

      if (phaseRef.current === 'owning-outward-burst') {
        // Reverse input immediately cancels outward ownership and rewinds naturally.
        if (deltaY < 0) {
          releaseOutwardOwnership()
          return !atTop
        }

        if (deltaY > 0) {
          const ownedFor = performance.now() - ownershipStartedAtRef.current
          if (ownedFor > maxEdgeHoldMs) {
            startDampenedExit()
            return true
          }

          // Core ownership guarantee: while forward reveal isn't complete, keep consuming.
          if (!atBottom) {
            beginOrRefreshOutwardOwnership()
            return true
          }

          // At completion, only keep consuming trailing burst momentum briefly.
          const idleFor = performance.now() - lastOutwardInputAtRef.current
          if (idleFor <= edgeHoldMs) {
            beginOrRefreshOutwardOwnership()
            return true
          }

          startDampenedExit()
          return true
        }

        return false
      }

      phaseRef.current = inActiveWindow ? 'active' : 'idle'
      if (!inActiveWindow) return false

      if (deltaY > 0) {
        if (atBottom) return false
        beginOrRefreshOutwardOwnership()
        return true
      }
      return !atTop
    }

    const consume = (deltaY: number) => {
      if (phaseRef.current === 'dampening-exit') {
        // Apply 75% friction to the physical scroll (only moves 25% of delta)
        window.scrollBy(0, deltaY * 0.25)
        return
      }
      advanceProgress(deltaY)
    }

    const onTouchEnd = () => {
      touchYRef.current = null
    }

    containerEl.addEventListener('wheel', onWheel, { passive: false, capture: true })
    containerEl.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
    containerEl.addEventListener('touchmove', onTouchMove, { passive: false, capture: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      clearReleaseTimer()
      disableWindowBurstCapture()
      containerEl.removeEventListener('wheel', onWheel, { capture: true })
      containerEl.removeEventListener('touchstart', onTouchStart, { capture: true })
      containerEl.removeEventListener('touchmove', onTouchMove, { capture: true })
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [containerRef, edgeHoldMs, maxEdgeHoldMs, progress, sensitivity])

  return progress
}
