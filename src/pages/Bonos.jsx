import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const activeBonos = [
  {
    id: 1,
    name: 'Entrenamiento Personal 1h',
    used: 5,
    total: 8,
    purchased: '15 enero 2026',
    expires: '15 julio 2026',
    professional: 'Luis',
    price: '220€',
    paid: true,
  },
  {
    id: 2,
    name: 'Nutrición — Seguimiento trimestral',
    used: 2,
    total: 3,
    purchased: '1 febrero 2026',
    expires: '1 mayo 2026',
    professional: 'Pau',
    price: '114€',
    paid: true,
  },
]

const completedBonos = [
  {
    id: 3,
    name: 'Entrenamiento Personal 1h',
    used: 8,
    total: 8,
    purchased: '10 junio 2025',
    expires: '10 diciembre 2025',
    professional: 'Luis',
    price: '220€',
  },
  {
    id: 4,
    name: 'Fisioterapia — Bono 5 sesiones',
    used: 5,
    total: 5,
    purchased: '3 marzo 2025',
    expires: '3 septiembre 2025',
    professional: 'Andreu',
    price: '195€',
  },
]

function BonoCard({ bono, completed, animateBars }) {
  const pct = (bono.used / bono.total) * 100

  return (
    <div className={`rounded-xl bg-[#1E1E1E] p-4 ${completed ? 'opacity-60' : ''}`}>
      {/* Name + badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-trust-gray">{bono.name}</h3>
        {completed ? (
          <span className="shrink-0 rounded-full bg-human-gray/15 px-2.5 py-0.5 text-[10px] font-semibold text-human-gray">
            Completado
          </span>
        ) : bono.paid ? (
          <span className="shrink-0 rounded-full bg-green-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-green-400">
            ✓ Pagado
          </span>
        ) : null}
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-human-gray">
            {bono.used} de {bono.total} sesiones
          </span>
          <span className="text-xs text-human-gray">{Math.round(pct)}%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#2A2A2A]">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              completed ? 'bg-human-gray/50' : 'bg-yellow-snap'
            }`}
            style={{ width: animateBars ? `${pct}%` : '0%' }}
          />
        </div>
      </div>

      {/* Details grid */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-human-gray/60">Profesional</p>
          <p className="text-sm text-trust-gray">{bono.professional}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-human-gray/60">Precio</p>
          <p className="text-sm text-trust-gray">{bono.price}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-human-gray/60">Compra</p>
          <p className="text-sm text-trust-gray">{bono.purchased}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-human-gray/60">Caduca</p>
          <p className="text-sm text-trust-gray">{bono.expires}</p>
        </div>
      </div>
    </div>
  )
}

export default function Bonos({ onClose }) {
  const [visible, setVisible] = useState(false)
  const [animateBars, setAnimateBars] = useState(false)

  useEffect(() => {
    const sc = document.getElementById('scroll-container')
    if (sc) sc.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    const t = setTimeout(() => setAnimateBars(true), 400)
    return () => { clearTimeout(t); if (sc) sc.style.overflow = '' }
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(() => {
      const sc = document.getElementById('scroll-container')
      if (sc) sc.style.overflow = ''
      onClose()
    }, 300)
  }

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[59] bg-black transition-opacity duration-300 ${visible ? 'opacity-60' : 'opacity-0'}`}
        onClick={handleClose}
      />

      {/* Side panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[60] flex w-[85vw] max-w-[360px] flex-col bg-core-black border-l border-white/10 transition-transform duration-300 ease-out ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-white/10">
          <div>
            <h2 className="text-xl font-semibold text-trust-gray">Mis Bonos</h2>
            <p className="mt-0.5 text-sm text-human-gray">Gestiona tus paquetes de sesiones</p>
          </div>
          <button onClick={handleClose} className="p-1 text-human-gray active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-10" style={{ overscrollBehavior: 'contain' }}>
          {/* Active bonos */}
          <p className="text-[10px] font-semibold uppercase tracking-widest text-yellow-snap">
            Activos
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {activeBonos.map((bono) => (
              <BonoCard key={bono.id} bono={bono} animateBars={animateBars} />
            ))}
          </div>

          {/* Completed bonos */}
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-widest text-human-gray">
            Completados
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {completedBonos.map((bono) => (
              <BonoCard key={bono.id} bono={bono} completed animateBars={animateBars} />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 rounded-xl bg-[#1E1E1E] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-human-gray">
              Resumen
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-yellow-snap">4</span>
                <span className="mt-0.5 text-center text-[10px] leading-tight text-human-gray">Bonos totales</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-yellow-snap">2</span>
                <span className="mt-0.5 text-center text-[10px] leading-tight text-human-gray">Activos</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-yellow-snap">749€</span>
                <span className="mt-0.5 text-center text-[10px] leading-tight text-human-gray">Invertido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
