import { useState, useEffect } from 'react'

const exercises = [
  { id: 1, name: 'Sentadilla Búlgara', sets: '4 × 8/lado', weight: '16kg', note: 'Controlar bajada 3s' },
  { id: 2, name: 'Press Banca Inclinado', sets: '4 × 10', weight: '60kg', note: 'Agarre medio' },
  { id: 3, name: 'Remo con Mancuerna', sets: '3 × 12/lado', weight: '22kg', note: '' },
  { id: 4, name: 'Hip Thrust', sets: '4 × 10', weight: '80kg', note: 'Pausa 1s arriba' },
  { id: 5, name: 'Plancha Lateral', sets: '3 × 30s/lado', weight: 'Corporal', note: '' },
  { id: 6, name: 'Pallof Press', sets: '3 × 12/lado', weight: 'Banda roja', note: 'Mantener core activado' },
]

export default function Training() {
  const [completed, setCompleted] = useState({})
  const [weights, setWeights] = useState({})
  const [animatePlan, setAnimatePlan] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimatePlan(true), 300)
    return () => clearTimeout(t)
  }, [])

  const doneCount = Object.values(completed).filter(Boolean).length
  const sessionPct = (doneCount / exercises.length) * 100
  const allDone = doneCount === exercises.length

  function toggleExercise(id) {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function updateWeight(id, value) {
    setWeights((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div className="min-h-full pb-28">
      {/* Plan header */}
      <header className="px-5 pt-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-human-gray">
          Plan activo
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-trust-gray">Fase de Fuerza</h1>
        <div className="mt-2 flex items-center gap-3 text-sm text-human-gray">
          <span>Semana 3 de 6</span>
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
          {/* Session header */}
          <h2 className="font-semibold text-trust-gray">
            Sesión A — Tren Superior + Core
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#2A2A2A]">
              <div
                className="h-full rounded-full bg-yellow-snap transition-all duration-500 ease-out"
                style={{ width: `${sessionPct}%` }}
              />
            </div>
            <span className="shrink-0 text-sm text-human-gray">
              {doneCount}/{exercises.length}
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

          {/* Exercise list */}
          <div className="mt-5">
            {exercises.map((ex, i) => {
              const isDone = completed[ex.id]
              const isLast = i === exercises.length - 1

              return (
                <div
                  key={ex.id}
                  className={`py-4 ${!isLast ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleExercise(ex.id)}
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        isDone
                          ? 'animate-check-pop border-yellow-snap bg-yellow-snap'
                          : 'border-trust-gray/40'
                      }`}
                    >
                      {isDone && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>

                    {/* Exercise info */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-medium transition-colors duration-200 ${
                          isDone ? 'text-human-gray' : 'text-trust-gray'
                        }`}
                      >
                        {ex.name}
                      </p>
                      <p className="mt-0.5 text-sm text-human-gray">
                        {ex.sets} · {ex.weight}
                      </p>
                      {ex.note && (
                        <p className="mt-1 text-xs italic text-orange-fun">{ex.note}</p>
                      )}

                      {/* Weight input */}
                      {isDone && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Peso usado"
                            value={weights[ex.id] || ''}
                            onChange={(e) => updateWeight(ex.id, e.target.value)}
                            className="w-28 rounded-lg border border-white/10 bg-[#2A2A2A] px-2.5 py-1.5 text-xs text-trust-gray placeholder-human-gray/50 outline-none focus:border-yellow-snap/40"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
