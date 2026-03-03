import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const months = [
  {
    key: '2026-03',
    label: 'Marzo 2026',
    summary: { sessions: 8, absences: 1, attendance: '88%' },
    weeks: [
      {
        label: 'Semana del 3 mar',
        sessions: [
          { date: 'Lun 3 mar — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
        ],
      },
      {
        label: 'Semana del 24 feb',
        sessions: [
          { date: 'Vie 28 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed', note: 'Press banca: 75kg PR 🎉' },
          { date: 'Jue 27 feb — 11:00', service: 'Nutrición — Seguimiento', pro: 'Pau', status: 'completed' },
          { date: 'Mié 26 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
          { date: 'Lun 24 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'absent' },
        ],
      },
      {
        label: 'Semana del 17 feb',
        sessions: [
          { date: 'Vie 21 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
          { date: 'Mié 19 feb — 10:00', service: 'Fisioterapia — Sesión', pro: 'Andreu', status: 'completed' },
          { date: 'Lun 17 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed', note: 'Sentadilla: 100kg × 5 PR 🎉' },
        ],
      },
      {
        label: 'Semana del 10 feb',
        sessions: [
          { date: 'Vie 14 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
        ],
      },
    ],
  },
  {
    key: '2026-02',
    label: 'Febrero 2026',
    summary: { sessions: 11, absences: 1, attendance: '92%' },
    weeks: [
      {
        label: 'Semana del 3 feb',
        sessions: [
          { date: 'Vie 7 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
          { date: 'Jue 6 feb — 11:00', service: 'Nutrición — Seguimiento', pro: 'Pau', status: 'completed' },
          { date: 'Mié 5 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
          { date: 'Lun 3 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'absent' },
        ],
      },
      {
        label: 'Semana del 10 feb',
        sessions: [
          { date: 'Vie 14 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
          { date: 'Mié 12 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed', note: 'Hip thrust: 120kg × 8 PR 🎉' },
          { date: 'Lun 10 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
        ],
      },
      {
        label: 'Semana del 17 feb',
        sessions: [
          { date: 'Vie 21 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
          { date: 'Mié 19 feb — 10:00', service: 'Fisioterapia — Sesión', pro: 'Andreu', status: 'completed' },
          { date: 'Lun 17 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
        ],
      },
      {
        label: 'Semana del 24 feb',
        sessions: [
          { date: 'Vie 28 feb — 17:30', service: 'Entrenamiento Personal 1h', pro: 'Luis', status: 'completed' },
        ],
      },
    ],
  },
]

export default function History({ onClose }) {
  const [visible, setVisible] = useState(false)
  const [monthIdx, setMonthIdx] = useState(0)

  useEffect(() => {
    const sc = document.getElementById('scroll-container')
    if (sc) sc.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => { if (sc) sc.style.overflow = '' }
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(() => {
      const sc = document.getElementById('scroll-container')
      if (sc) sc.style.overflow = ''
      onClose()
    }, 300)
  }

  const month = months[monthIdx]

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
          <h2 className="text-xl font-semibold text-trust-gray">Historial</h2>
          <button onClick={handleClose} className="p-1 text-human-gray active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Month selector */}
        <div className="mt-3 flex items-center justify-center gap-4 px-5">
          <button
            onClick={() => setMonthIdx((i) => Math.min(i + 1, months.length - 1))}
            disabled={monthIdx === months.length - 1}
            className="p-1 text-human-gray disabled:opacity-20 active:scale-90 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="min-w-[140px] text-center text-sm font-semibold text-trust-gray">
            {month.label}
          </span>
          <button
            onClick={() => setMonthIdx((i) => Math.max(i - 1, 0))}
            disabled={monthIdx === 0}
            className="p-1 text-human-gray disabled:opacity-20 active:scale-90 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Month summary */}
        <div className="mt-4 mx-5 rounded-xl bg-[#1E1E1E] px-4 py-3">
          <p className="text-center text-sm text-trust-gray">
            <span className="font-semibold text-yellow-snap">{month.summary.sessions}</span> sesiones
            <span className="mx-1.5 text-white/20">·</span>
            <span className="font-semibold text-red-pulse">{month.summary.absences}</span> ausencia{month.summary.absences !== 1 ? 's' : ''}
            <span className="mx-1.5 text-white/20">·</span>
            <span className="font-semibold text-yellow-snap">{month.summary.attendance}</span> asistencia
          </p>
        </div>

        {/* Scrollable content */}
        <div className="mt-4 flex-1 overflow-y-auto px-5 pb-10" style={{ overscrollBehavior: 'contain' }}>
          {month.weeks.map((week) => (
            <div key={week.label} className="mb-5">
              {/* Week separator */}
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-human-gray">
                {week.label}
              </p>

              <div className="flex flex-col gap-2">
                {week.sessions.map((s, i) => (
                  <div key={i} className="rounded-xl bg-[#1E1E1E] p-4">
                    {/* Date + status */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-trust-gray">{s.date}</p>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          s.status === 'completed'
                            ? 'bg-green-500/15 text-green-400'
                            : 'bg-red-pulse/15 text-red-pulse'
                        }`}
                      >
                        {s.status === 'completed' ? 'Completada' : 'Ausencia'}
                      </span>
                    </div>

                    {/* Service + professional */}
                    <p className="mt-1.5 font-semibold text-trust-gray">{s.service}</p>
                    <p className="mt-0.5 text-xs text-human-gray">{s.pro}</p>

                    {/* Note */}
                    {s.note && (
                      <p className="mt-2 text-xs italic text-yellow-snap">{s.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>,
    document.body
  )
}
