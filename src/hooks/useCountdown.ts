import { useState, useEffect, useCallback } from 'react'

interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function useCountdown(targetDate: string): CountdownValues {
  const calculateTimeLeft = useCallback((): CountdownValues => {
    const target = new Date(targetDate).getTime()
    const now = Date.now()
    const diff = target - now

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState<CountdownValues>(calculateTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [calculateTimeLeft])

  return timeLeft
}
