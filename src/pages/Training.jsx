import { useState, useEffect } from 'react'

const blocks = [
  {
    id: 'warmup',
    title: 'Calentamiento',
    iconColor: 'text-orange-fun',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 12c0-3 2.5-6 2.5-6s2.5 3 2.5 6a2.5 2.5 0 1 1-5 0Z" />
        <path d="M7 16c0-3.5 3-7 3-7s3 3.5 3 7a3 3 0 1 1-6 0Z" />
      </svg>
    ),
    items: [
      { id: 'w1', text: '15 min trote suave Z1' },
      { id: 'w2', text: 'Movilidad articular dinámica' },
      { id: 'w3', text: '4 × 100m progresivos' },
    ],
  },
  {
    id: 'main',
    title: 'Parte Principal',
    iconColor: 'text-yellow-snap',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    items: [
      { id: 'm1', text: '5 × 1km a 4:30/km (Z3-Z4)' },
      { id: 'm2', text: 'Recuperación: 2 min trote suave entre series' },
    ],
    note: 'Mantén cadencia 85-90 ppm. Si las últimas dos series no puedes mantener ritmo, para.',
  },
  {
    id: 'cooldown',
    title: 'Vuelta a la calma',
    iconColor: 'text-trust-gray',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M17.7 7.7a7.5 7.5 0 1 0 0 8.6" />
        <path d="M21 12h-6" />
      </svg>
    ),
    items: [
      { id: 'c1', text: '10 min trote muy suave Z1' },
      { id: 'c2', text: 'Estiramientos: isquios, cuádriceps, gemelos, psoas — 30s cada uno' },
    ],
  },
  {
    id: 'strength',
    title: 'Fuerza complementaria (opcional)',
    iconColor: 'text-human-gray',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M6.5 6.5h-2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2" />
        <path d="M17.5 6.5h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2" />
        <rect x="6.5" y="4" width="2" height="16" rx="1" />
        <rect x="15.5" y="4" width="2" height="16" rx="1" />
        <line x1="8.5" y1="12" x2="15.5" y2="12" />
      </svg>
    ),
    items: [
      { id: 's1', text: '3 × 15 sentadilla goblet' },
      { id: 's2', text: '3 × 12 peso muerto rumano' },
      { id: 's3', text: '3 × 20 gemelo a una pierna' },
    ],
    note: 'Solo si te encuentras bien de piernas',
  },
]

const weekDays = [
  { day: 'Lun', label: 'Descanso / Movilidad', emoji: '🧘', color: 'text-human-gray', past: true },
  { day: 'Mar', label: 'Series Umbral', emoji: '🏃', color: 'text-yellow-snap', active: true },
  { day: 'Mié', label: 'Natación técnica', emoji: '🏊', color: 'text-trust-gray' },
  { day: 'Jue', label: 'Rodaje suave 45min', emoji: '🏃', color: 'text-trust-gray' },
  { day: 'Vie', label: 'Fuerza + Core', emoji: '🏋️', color: 'text-trust-gray' },
  { day: 'Sáb', label: 'Tirada larga 18km', emoji: '🏃', color: 'text-orange-fun', key: true },
  { day: 'Dom', label: 'Bici recuperación 1h', emoji: '🚴', color: 'text-trust-gray' },
]

const allItems = blocks.flatMap((b) => b.items)

export default function Training() {
  const [completed, setCompleted] = useState({})
  const [animatePlan, setAnimatePlan] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimatePlan(true), 300)
    return () => clearTimeout(t)
  }, [])

  const doneCount = Object.values(completed).filter(Boolean).length
  const sessionPct = (doneCount / allItems.length) * 100
  const allDone = doneCount === allItems.length

  function toggleItem(id) {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-full pb-28">
      {/* Plan header */}
      <header className="px-5 pt-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-human-gray">
          Plan activo
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-trust-gray">
          Preparación Media Maratón
        </h1>
        <p className="mt-0.5 text-sm font-medium text-yellow-snap">Fase de Carga</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-human-gray">
          <span>Semana 6 de 12</span>
          <span className="text-white/20">·</span>
          <span>Entrenador: Luis</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#2A2A2A]">
          <div
            className="h-full rounded-full bg-yellow-snap transition-all duration-1000 ease-out"
            style={{ width: animatePlan ? '50%' : '0%' }}
          />
        </div>
      </header>

      {/* Session card */}
      <div className="mt-6 px-5">
        <div className="rounded-2xl bg-[#1E1E1E] p-5">
          {/* Session title */}
          <h2 className="font-semibold text-trust-gray">
            Sesión — Martes: Series Umbral
          </h2>

          {/* Session metrics */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#2A2A2A] px-3 py-1 text-xs text-trust-gray">
              🏃 12 km
            </span>
            <span className="rounded-full bg-[#2A2A2A] px-3 py-1 text-xs text-trust-gray">
              ⏱ ~55 min
            </span>
            <span className="rounded-full bg-[#2A2A2A] px-3 py-1 text-xs text-trust-gray">
              💓 Z3-Z4
            </span>
          </div>

          {/* Session progress */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#2A2A2A]">
              <div
                className="h-full rounded-full bg-yellow-snap transition-all duration-500 ease-out"
                style={{ width: `${sessionPct}%` }}
              />
            </div>
            <span className="shrink-0 text-sm text-human-gray">
              {doneCount}/{allItems.length}
            </span>
          </div>

          {/* All done message */}
          {allDone && (
            <div className="mt-4 rounded-xl bg-yellow-snap/10 p-3 text-center">
              <p className="text-sm font-semibold text-yellow-snap">
                💪 Sesión completada
              </p>
            </div>
          )}

          {/* Blocks */}
          <div className="mt-5 space-y-4">
            {blocks.map((block) => (
              <div
                key={block.id}
                className="rounded-xl bg-[#252525] p-4"
              >
                {/* Block title */}
                <div className="flex items-center gap-2">
                  <span className={block.iconColor}>{block.icon}</span>
                  <h3 className="font-semibold text-trust-gray">{block.title}</h3>
                </div>

                {/* Block items */}
                <div className="mt-3 space-y-2.5">
                  {block.items.map((item) => {
                    const isDone = completed[item.id]
                    return (
                      <div key={item.id} className="flex gap-3">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                            isDone
                              ? 'animate-check-pop border-yellow-snap bg-yellow-snap'
                              : 'border-trust-gray/30'
                          }`}
                        >
                          {isDone && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                        <p
                          className={`text-sm transition-colors duration-200 ${
                            isDone ? 'text-human-gray/50 line-through' : 'text-trust-gray'
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Coach note */}
                {block.note && (
                  <div className="mt-3 flex gap-1.5 rounded-lg bg-orange-fun/5 px-3 py-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-fun">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p className="text-xs italic text-orange-fun">{block.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly plan */}
      <div className="mt-6 px-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-human-gray">
          Esta semana
        </h3>
        <div className="space-y-2">
          {weekDays.map((d) => (
            <div
              key={d.day}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                d.active
                  ? 'border-l-[3px] border-yellow-snap bg-[#1E1E1E]'
                  : 'bg-[#1A1A1A]'
              } ${d.past ? 'opacity-50' : ''}`}
            >
              {/* Day + done check */}
              <div className="w-9 shrink-0">
                {d.past ? (
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-yellow-snap">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-xs font-semibold text-human-gray">{d.day}</span>
                  </div>
                ) : (
                  <span className={`text-xs font-semibold ${d.active ? 'text-yellow-snap' : 'text-human-gray'}`}>
                    {d.day}
                  </span>
                )}
              </div>

              {/* Emoji */}
              <span className="text-base">{d.emoji}</span>

              {/* Label */}
              <span className={`text-sm ${d.active ? 'font-medium text-yellow-snap' : d.key ? 'font-medium text-orange-fun' : d.color}`}>
                {d.label}
              </span>

              {/* Key session badge */}
              {d.key && (
                <span className="ml-auto rounded-full bg-orange-fun/15 px-2 py-0.5 text-[10px] font-semibold text-orange-fun">
                  Clave
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
