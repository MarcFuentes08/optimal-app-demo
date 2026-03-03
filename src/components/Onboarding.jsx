import { useState } from 'react'

const slides = [
  {
    image: true,
    title: 'Bienvenido a OPTIMAL',
    subtitle: 'Tu centro de entrenamiento, fisioterapia y nutrición, ahora en tu bolsillo.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-24 w-24">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    title: 'Todo en un solo lugar',
    subtitle: 'Reserva clases, sigue tu entrenamiento, consulta tu nutrición y contacta con tus profesionales.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-24 w-24">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0113 0" />
        <circle cx="19" cy="11" r="2.5" />
        <path d="M21.5 21a4 4 0 00-5-3.5" />
        <circle cx="5" cy="11" r="2.5" />
        <path d="M2.5 21a4 4 0 015-3.5" />
      </svg>
    ),
    title: 'Tu equipo te acompaña',
    subtitle: 'Luis, Andreu y Pau. Entrenamiento, fisioterapia y nutrición adaptados a ti.',
  },
]

export default function Onboarding({ onFinish }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [animating, setAnimating] = useState(false)

  const isLast = current === slides.length - 1
  const slide = slides[current]

  function goTo(idx) {
    if (animating || idx === current) return
    setDirection(idx > current ? 1 : -1)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 250)
  }

  function next() {
    if (isLast) {
      onFinish()
    } else {
      goTo(current + 1)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-core-black">
      {/* Skip */}
      {!isLast && (
        <div className="flex justify-end px-5 pt-4">
          <button
            onClick={onFinish}
            className="text-sm text-human-gray active:opacity-60 transition-opacity"
          >
            Saltar
          </button>
        </div>
      )}
      {isLast && <div className="pt-10" />}

      {/* Slide content */}
      <div
        className={`flex flex-1 flex-col items-center justify-center px-8 transition-all duration-250 ${
          animating
            ? direction > 0
              ? 'translate-x-8 opacity-0'
              : '-translate-x-8 opacity-0'
            : 'translate-x-0 opacity-100'
        }`}
      >
        {/* Visual */}
        {slide.image ? (
          <img
            src="/avatar-negative.png"
            alt="OPTIMAL"
            className="mb-8 h-28 w-28"
          />
        ) : (
          <div className="mb-8 text-yellow-snap">{slide.icon}</div>
        )}

        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-trust-gray">
          {slide.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-xs text-center text-base leading-relaxed text-human-gray">
          {slide.subtitle}
        </p>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-6 px-8 pb-12">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 bg-yellow-snap'
                  : 'w-2 bg-human-gray/30'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={next}
          className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-transform active:scale-[0.97] ${
            isLast
              ? 'bg-yellow-snap text-core-black'
              : 'border border-yellow-snap text-yellow-snap'
          }`}
        >
          {isLast ? 'Empezar' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}
