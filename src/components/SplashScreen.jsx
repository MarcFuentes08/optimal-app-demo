import { useState, useEffect } from 'react'

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2200)
    const finish = setTimeout(() => onFinish(), 2900)
    return () => {
      clearTimeout(timer)
      clearTimeout(finish)
    }
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-core-black transition-all duration-700 ease-in-out ${
        fadeOut ? 'scale-[1.03] opacity-0' : 'opacity-100'
      }`}
    >
      <div className="animate-splash-in flex flex-col items-center">
        <img
          src="/avatar-negative.png"
          alt="OPTIMAL"
          width="80"
          height="80"
          className="mb-5 w-20"
        />
        <img
          src="/imago-trust-gray.png"
          alt="OPTIMAL"
          width="144"
          height="24"
          className="mb-4 w-36"
        />
        <p className="font-body text-sm italic text-human-gray">
          Human approach. To sport, to life.
        </p>
      </div>
    </div>
  )
}
