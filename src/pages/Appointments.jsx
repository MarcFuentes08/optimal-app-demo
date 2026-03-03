import { useState, useEffect } from 'react'

const upcoming = [
  {
    id: 1,
    dateLabel: 'Hoy, Lunes 3 mar',
    service: 'Entrenamiento Personal 1h',
    time: '17:30 - 18:30',
    professional: 'Luis',
    status: 'Confirmada',
  },
  {
    id: 2,
    dateLabel: 'Miércoles 5 mar',
    service: 'Entrenamiento Personal 1h',
    time: '17:30 - 18:30',
    professional: 'Luis',
    status: 'Confirmada',
  },
  {
    id: 3,
    dateLabel: 'Jueves 6 mar',
    service: 'Nutrición — Seguimiento',
    time: '11:00 - 11:30',
    professional: 'Pau',
    status: 'Confirmada',
  },
]

const past = [
  {
    id: 4,
    dateLabel: 'Viernes 28 feb',
    service: 'Entrenamiento Personal 1h',
    time: '17:30 - 18:30',
    professional: 'Luis',
    status: 'Completada',
  },
  {
    id: 5,
    dateLabel: 'Miércoles 26 feb',
    service: 'Entrenamiento Personal 1h',
    time: '17:30 - 18:30',
    professional: 'Luis',
    status: 'Completada',
  },
  {
    id: 6,
    dateLabel: 'Lunes 24 feb',
    service: 'Fisioterapia — Sesión',
    time: '10:00 - 11:00',
    professional: 'Andreu',
    status: 'Completada',
  },
  {
    id: 7,
    dateLabel: 'Jueves 20 feb',
    service: 'Nutrición — Seguimiento',
    time: '11:00 - 11:30',
    professional: 'Pau',
    status: 'Completada',
  },
]

function AppointmentCard({ cita, isPast }) {
  return (
    <div className={`rounded-xl bg-[#1E1E1E] p-4 ${isPast ? 'opacity-50' : ''}`}>
      {/* Date */}
      <p className={`text-sm font-semibold ${isPast ? 'text-human-gray' : 'text-yellow-snap'}`}>
        {cita.dateLabel}
      </p>

      {/* Service */}
      <h3 className="mt-2 font-semibold text-trust-gray">{cita.service}</h3>

      {/* Details */}
      <div className="mt-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-human-gray">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-sm text-human-gray">{cita.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-human-gray">
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20a7 7 0 0114 0" />
          </svg>
          <span className="text-sm text-human-gray">{cita.professional}</span>
        </div>
      </div>

      {/* Footer: badge + cancel */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
            isPast
              ? 'bg-human-gray/15 text-human-gray'
              : 'bg-green-500/15 text-green-400'
          }`}
        >
          {isPast ? '✓ ' : ''}{cita.status}
        </span>
        {!isPast && (
          <button className="text-xs font-medium text-red-pulse active:scale-95 transition-transform">
            Cancelar
          </button>
        )}
      </div>
    </div>
  )
}

export default function Appointments({ onClose }) {
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState('upcoming')

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const citas = tab === 'upcoming' ? upcoming : past

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${visible ? 'opacity-60' : 'opacity-0'}`}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className={`relative z-10 flex h-[95dvh] w-full max-w-lg flex-col rounded-t-2xl border-t border-white/10 bg-core-black transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-2">
          <h2 className="text-2xl font-semibold text-trust-gray">Mis Citas</h2>
          <button onClick={handleClose} className="p-1 text-human-gray active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-1 px-5">
          <button
            onClick={() => setTab('upcoming')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              tab === 'upcoming'
                ? 'bg-yellow-snap text-core-black'
                : 'bg-[#1E1E1E] text-human-gray'
            }`}
          >
            Próximas
          </button>
          <button
            onClick={() => setTab('past')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              tab === 'past'
                ? 'bg-yellow-snap text-core-black'
                : 'bg-[#1E1E1E] text-human-gray'
            }`}
          >
            Pasadas
          </button>
        </div>

        {/* Scrollable content */}
        <div className="mt-4 flex-1 overflow-y-auto px-5 pb-10">
          <div className="flex flex-col gap-3">
            {citas.map((cita) => (
              <AppointmentCard key={cita.id} cita={cita} isPast={tab === 'past'} />
            ))}
          </div>

          {/* Empty state hint */}
          {tab === 'upcoming' && (
            <p className="mt-6 text-center text-xs italic text-human-gray/50">
              Toca en un servicio del Home para reservar tu próxima cita
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
