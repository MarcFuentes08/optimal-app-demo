import { useState, useRef, useCallback } from 'react'

const THRESHOLD = 60

export default function PullToRefresh({ children }) {
  const [pullY, setPullY] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(null)
  const pulling = useRef(false)

  const onTouchStart = useCallback((e) => {
    const el = e.currentTarget
    if (el.scrollTop > 0 || refreshing) return
    startY.current = e.touches[0].clientY
    pulling.current = true
  }, [refreshing])

  const onTouchMove = useCallback((e) => {
    if (!pulling.current || startY.current === null) return
    const diff = e.touches[0].clientY - startY.current
    if (diff < 0) {
      setPullY(0)
      return
    }
    const dampened = Math.min(diff * 0.4, 80)
    setPullY(dampened)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!pulling.current) return
    pulling.current = false
    startY.current = null

    if (pullY >= THRESHOLD * 0.4) {
      setRefreshing(true)
      setPullY(40)
      setTimeout(() => {
        setRefreshing(false)
        setPullY(0)
      }, 1000)
    } else {
      setPullY(0)
    }
  }, [pullY])

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative min-h-full"
    >
      {/* Spinner */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-20 flex justify-center transition-all duration-200"
        style={{
          top: -40,
          transform: `translateY(${pullY}px)`,
          opacity: pullY > 10 ? 1 : 0,
        }}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#1E1E1E] shadow-lg ${
            refreshing ? 'animate-spin-slow' : ''
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-4 w-4 text-yellow-snap">
            <path d="M21 12a9 9 0 11-6.22-8.56" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{ transform: `translateY(${pullY > 10 ? pullY * 0.3 : 0}px)` }}
      >
        {children}
      </div>
    </div>
  )
}
