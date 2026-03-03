import { useState, useEffect } from 'react'

const weeklyData = [4, 3, 5, 4, 2, 5, 3, 4]
const maxSessions = Math.max(...weeklyData)

const records = [
  { label: '5K', value: '22:15', icon: '🏃', color: 'text-yellow-snap' },
  { label: '10K', value: '46:30', icon: '🏃', color: 'text-yellow-snap' },
  { label: 'Media maratón', value: '1:42:00', icon: '🏅', color: 'text-orange-fun' },
]

const recentSessions = [
  { date: 'Hoy', type: 'Series Umbral', dist: '12 km', icon: '🏃' },
  { date: 'Ayer', type: 'Descanso / Movilidad', dist: '—', icon: '🧘' },
  { date: 'Dom', type: 'Bici recuperación', dist: '30 km', icon: '🚴' },
  { date: 'Sáb', type: 'Tirada larga', dist: '18 km', icon: '🏃' },
  { date: 'Vie', type: 'Fuerza + Core', dist: '—', icon: '🏋️' },
]

export default function Progress({ onClose }) {
  const [visible, setVisible] = useState(false)
  const [animateBars, setAnimateBars] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const t = setTimeout(() => setAnimateBars(true), 400)
    return () => clearTimeout(t)
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${visible ? 'opacity-60' : 'opacity-0'}`}
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
        <div className="flex items-start justify-between px-5 pt-2 pb-4">
          <div>
            <h2 className="text-2xl font-semibold text-trust-gray">Tu Progreso</h2>
            <p className="mt-0.5 text-sm text-human-gray">Últimos 3 meses</p>
          </div>
          <button onClick={handleClose} className="p-1 text-human-gray active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-10">
          {/* Activity summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center rounded-xl bg-[#1E1E1E] p-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 h-4 w-4 text-human-gray">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-2xl font-bold text-yellow-snap">38</span>
              <span className="mt-0.5 text-center text-[10px] leading-tight text-human-gray">Sesiones totales</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-[#1E1E1E] p-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 h-4 w-4 text-human-gray">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span className="text-2xl font-bold text-yellow-snap">12.4</span>
              <span className="mt-0.5 text-center text-[10px] leading-tight text-human-gray">Media mensual</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-[#1E1E1E] p-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 h-4 w-4 text-human-gray">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              <span className="text-2xl font-bold text-yellow-snap">94%</span>
              <span className="mt-0.5 text-center text-[10px] leading-tight text-human-gray">Asistencia</span>
            </div>
          </div>

          {/* Weekly bar chart */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-human-gray">
              Actividad semanal
            </h3>
            <div className="mt-3 rounded-xl bg-[#1E1E1E] p-4">
              <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
                {weeklyData.map((val, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[10px] font-medium text-trust-gray">{val}</span>
                    <div className="w-full overflow-hidden rounded-t-md bg-[#2A2A2A]" style={{ height: 80 }}>
                      <div
                        className="w-full rounded-t-md bg-yellow-snap transition-all duration-700 ease-out"
                        style={{
                          height: animateBars ? `${(val / maxSessions) * 100}%` : '0%',
                          marginTop: animateBars ? `${100 - (val / maxSessions) * 100}%` : '100%',
                          transitionDelay: `${i * 80}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-human-gray">S{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Volume chart — km per week */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-human-gray">
              Volumen semanal (km)
            </h3>
            <div className="mt-3 rounded-xl bg-[#1E1E1E] p-4">
              {[
                { week: 'Sem 8 (actual)', km: 32, max: 55 },
                { week: 'Sem 7', km: 48, max: 55 },
                { week: 'Sem 6', km: 42, max: 55 },
                { week: 'Sem 5', km: 28, max: 55 },
                { week: 'Sem 4', km: 45, max: 55 },
                { week: 'Sem 3', km: 38, max: 55 },
              ].map((w, i) => (
                <div key={i} className={`flex items-center gap-3 ${i > 0 ? 'mt-3' : ''}`}>
                  <span className="w-24 shrink-0 text-[11px] text-human-gray">{w.week}</span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#2A2A2A]">
                    <div
                      className="h-full rounded-full bg-yellow-snap/70 transition-all duration-700 ease-out"
                      style={{
                        width: animateBars ? `${(w.km / w.max) * 100}%` : '0%',
                        transitionDelay: `${i * 100 + 300}ms`,
                      }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-xs font-medium text-trust-gray">{w.km}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal records */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-human-gray">
              Marcas personales
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {records.map((r) => (
                <div key={r.label} className="flex items-center gap-3 rounded-xl bg-[#1E1E1E] px-4 py-3">
                  <span className="text-lg">{r.icon}</span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-trust-gray">{r.label}</span>
                  </div>
                  <span className={`text-lg font-bold ${r.color}`}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent sessions */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-human-gray">
              Últimas sesiones
            </h3>
            <div className="mt-3 rounded-xl bg-[#1E1E1E]">
              {recentSessions.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    i !== recentSessions.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <span className="text-base">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-trust-gray">{s.type}</p>
                    <p className="text-[11px] text-human-gray">{s.date}</p>
                  </div>
                  {s.dist !== '—' && (
                    <span className="rounded-full bg-[#2A2A2A] px-2.5 py-0.5 text-xs text-trust-gray">
                      {s.dist}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
