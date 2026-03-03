import { useState, useEffect, useMemo } from 'react'
import PullToRefresh from '../components/PullToRefresh'

const schedule = {
  1: [
    { name: 'OpTraining', time: '07:00', spots: 8, max: 14 },
    { name: 'Functional', time: '09:30', spots: 6, max: 14 },
    { name: 'Strong', time: '12:00', spots: 0, max: 14 },
    { name: 'OpTraining', time: '17:30', spots: 3, max: 14 },
    { name: 'Hybrid', time: '19:00', spots: 10, max: 14 },
  ],
  2: [
    { name: 'OpTraining', time: '07:00', spots: 11, max: 14 },
    { name: 'Strong', time: '10:00', spots: 4, max: 14 },
    { name: 'Functional', time: '18:00', spots: 7, max: 14 },
    { name: 'Hybrid', time: '19:30', spots: 2, max: 14 },
  ],
  3: [
    { name: 'OpTraining', time: '07:00', spots: 9, max: 14 },
    { name: 'Functional', time: '09:30', spots: 5, max: 14 },
    { name: 'Strong', time: '17:30', spots: 1, max: 14 },
    { name: 'OpTraining', time: '19:00', spots: 12, max: 14 },
  ],
  4: [
    { name: 'Hybrid', time: '07:00', spots: 10, max: 14 },
    { name: 'OpTraining', time: '10:00', spots: 6, max: 14 },
    { name: 'Strong', time: '18:00', spots: 3, max: 14 },
    { name: 'Functional', time: '19:30', spots: 8, max: 14 },
  ],
  5: [
    { name: 'OpTraining', time: '07:00', spots: 7, max: 14 },
    { name: 'OpTraining', time: '09:30', spots: 13, max: 14 },
    { name: 'Hybrid', time: '17:30', spots: 4, max: 14 },
  ],
  6: [
    { name: 'OpTraining', time: '09:00', spots: 11, max: 14 },
    { name: 'Functional', time: '10:30', spots: 9, max: 14 },
  ],
}

const intensity = {
  OpTraining: 'alta',
  Strong: 'alta',
  Functional: 'media',
  Hybrid: 'media',
}

const descriptions = {
  OpTraining: 'CrossTraining a nuestra manera. Entreno de alta intensidad combinando fuerza, cardio y técnica en formato grupal. Cada día es diferente.',
  Functional: 'Entrenamiento funcional enfocado en movimientos naturales del cuerpo. Ideal para mejorar movilidad, estabilidad y fuerza general.',
  Strong: 'Sesión de fuerza pura con barras y mancuernas. Progresión de cargas controlada. Para quienes buscan ganar fuerza real.',
  Hybrid: 'Lo mejor de dos mundos: combina trabajo funcional con bloques de fuerza. Versátil y adaptable a cualquier nivel.',
}

const dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function getWeekDays() {
  const today = new Date()
  const dow = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dow === 0 ? 7 : dow) - 1))

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return {
      dayOfWeek: i + 1,
      label: dayLabels[i],
      date: d.getDate(),
      isToday:
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear(),
    }
  })
}

function SpotsIndicator({ spots, max }) {
  const free = spots
  let color = '#4ADE80'
  if (free <= 5 && free > 0) color = '#F3AF3E'
  if (free === 0) color = '#EF3E07'

  return (
    <div className="flex items-center gap-1">
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <circle cx="9" cy="7" r="3" />
        <path d="M2 20a7 7 0 0110-6.3" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M14 20a5 5 0 016-4.8" />
      </svg>
      <span className="text-xs" style={{ color }}>
        {spots}/{max}
      </span>
    </div>
  )
}

function IntensityTag({ level }) {
  const isAlta = level === 'alta'
  return (
    <span
      className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
        isAlta
          ? 'bg-red-pulse/15 text-red-pulse'
          : 'bg-orange-fun/15 text-orange-fun'
      }`}
    >
      {isAlta ? 'Alta' : 'Media'}
    </span>
  )
}

function ClassDetail({ cls, isReserved, isFull, onReserve, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const endTime = (() => {
    const [h, m] = cls.time.split(':').map(Number)
    const end = new Date(0, 0, 0, h, m + 60)
    return end.toTimeString().slice(0, 5)
  })()

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${visible ? 'opacity-60' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div
        className={`relative z-10 w-full max-w-lg rounded-t-2xl border-t border-white/10 bg-core-black px-5 pb-8 pt-4 transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag indicator */}
        <div className="mb-3 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-trust-gray">{cls.name}</h2>
            <IntensityTag level={intensity[cls.name]} />
          </div>
          <button onClick={handleClose} className="p-1 text-human-gray active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-human-gray">
          {descriptions[cls.name]}
        </p>

        {/* Session info */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#1E1E1E] p-3">
            <p className="text-[10px] uppercase tracking-wider text-human-gray/60">Hora</p>
            <p className="mt-0.5 text-sm font-semibold text-trust-gray">{cls.time} — {endTime}</p>
          </div>
          <div className="rounded-xl bg-[#1E1E1E] p-3">
            <p className="text-[10px] uppercase tracking-wider text-human-gray/60">Duración</p>
            <p className="mt-0.5 text-sm font-semibold text-trust-gray">60 minutos</p>
          </div>
          <div className="rounded-xl bg-[#1E1E1E] p-3">
            <p className="text-[10px] uppercase tracking-wider text-human-gray/60">Entrenador</p>
            <p className="mt-0.5 text-sm font-semibold text-trust-gray">Luis</p>
          </div>
          <div className="rounded-xl bg-[#1E1E1E] p-3">
            <p className="text-[10px] uppercase tracking-wider text-human-gray/60">Plazas</p>
            <div className="mt-0.5">
              <SpotsIndicator spots={cls.spots} max={cls.max} />
            </div>
          </div>
        </div>

        {/* Reserve button */}
        <div className="mt-5">
          {isFull ? (
            <button className="w-full rounded-xl border border-orange-fun py-3 text-sm font-semibold text-orange-fun active:scale-[0.97] transition-transform">
              Apuntarme a lista de espera
            </button>
          ) : isReserved ? (
            <button
              onClick={onReserve}
              className="w-full rounded-xl bg-yellow-snap py-3 text-sm font-semibold text-core-black active:scale-[0.97] transition-transform"
            >
              ✓ Reservado — Cancelar reserva
            </button>
          ) : (
            <button
              onClick={onReserve}
              className="w-full rounded-xl bg-yellow-snap py-3 text-sm font-semibold text-core-black active:scale-[0.97] transition-transform"
            >
              Reservar plaza
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Classes() {
  const weekDays = useMemo(getWeekDays, [])
  const todayDow = weekDays.find((d) => d.isToday)?.dayOfWeek ?? 1
  const [selectedDay, setSelectedDay] = useState(todayDow)
  const [reserved, setReserved] = useState({})
  const [staggerKey, setStaggerKey] = useState(0)
  const [detailClass, setDetailClass] = useState(null)

  const classes = schedule[selectedDay] || []

  function handleDayChange(dow) {
    setSelectedDay(dow)
    setStaggerKey((k) => k + 1)
  }

  function toggleReserve(dayTime) {
    setReserved((prev) => ({ ...prev, [dayTime]: !prev[dayTime] }))
  }

  return (
    <PullToRefresh>
    <div className="min-h-full pb-28">
      {/* Header */}
      <header className="px-5 pt-6">
        <h1 className="text-2xl font-semibold text-trust-gray">Clases Grupales</h1>
        <p className="mt-0.5 text-sm text-human-gray">Reserva tu plaza</p>
      </header>

      {/* Day selector */}
      <div className="mt-5 flex gap-1.5 px-5">
        {weekDays.map((d) => {
          const isSelected = selectedDay === d.dayOfWeek
          return (
            <button
              key={d.dayOfWeek}
              onClick={() => handleDayChange(d.dayOfWeek)}
              className={`flex flex-1 flex-col items-center rounded-xl py-2 transition-colors ${
                isSelected
                  ? 'bg-yellow-snap text-core-black'
                  : 'text-trust-gray'
              }`}
            >
              <span className="text-[11px] font-medium">{d.label}</span>
              <span className="mt-0.5 text-lg font-bold">{d.date}</span>
              {d.isToday && !isSelected && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-yellow-snap" />
              )}
              {d.isToday && isSelected && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-core-black" />
              )}
            </button>
          )
        })}
      </div>

      {/* Empty state */}
      {classes.length === 0 && (
        <div className="mt-16 flex flex-col items-center px-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-20 w-20 text-human-gray/30">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18" />
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
          <p className="mt-4 text-lg font-semibold text-human-gray/50">No hay clases programadas</p>
          <p className="mt-1 text-sm text-human-gray/30">Disfruta del descanso 💤</p>
        </div>
      )}

      {/* Class list */}
      <div key={staggerKey} className="mt-5 flex flex-col gap-3 px-5">
        {classes.map((cls, i) => {
          const key = `${selectedDay}-${cls.time}`
          const isReserved = reserved[key]
          const isFull = cls.spots === 0

          return (
            <div
              key={key}
              className="animate-card-in flex items-center gap-4 rounded-xl bg-[#1E1E1E] p-4"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Time + Info (clickable area) */}
              <button
                onClick={() => setDetailClass(cls)}
                className="flex min-w-0 flex-1 items-center gap-4 text-left active:opacity-70 transition-opacity"
              >
                <div className="w-14 shrink-0">
                  <span className="text-2xl font-bold text-trust-gray">{cls.time}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-trust-gray">{cls.name}</span>
                    <IntensityTag level={intensity[cls.name]} />
                  </div>
                  <p className="mt-0.5 text-sm text-human-gray">Luis</p>
                  <div className="mt-1">
                    <SpotsIndicator spots={cls.spots} max={cls.max} />
                  </div>
                </div>
              </button>

              {/* Button */}
              <div className="shrink-0">
                {isFull ? (
                  <button className="rounded-lg border border-orange-fun px-3 py-1.5 text-xs font-semibold text-orange-fun active:scale-[0.96] transition-transform">
                    Lista espera
                  </button>
                ) : isReserved ? (
                  <button
                    onClick={() => toggleReserve(key)}
                    className="rounded-lg bg-yellow-snap px-3 py-1.5 text-xs font-semibold text-core-black active:scale-[0.96] transition-transform"
                  >
                    ✓ Reservado
                  </button>
                ) : (
                  <button
                    onClick={() => toggleReserve(key)}
                    className="rounded-lg border border-yellow-snap px-3 py-1.5 text-xs font-semibold text-yellow-snap active:scale-[0.96] transition-transform"
                  >
                    Reservar
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Class detail sheet */}
      {detailClass && (
        <ClassDetail
          cls={detailClass}
          isReserved={reserved[`${selectedDay}-${detailClass.time}`]}
          isFull={detailClass.spots === 0}
          onReserve={() => toggleReserve(`${selectedDay}-${detailClass.time}`)}
          onClose={() => setDetailClass(null)}
        />
      )}
    </div>
    </PullToRefresh>
  )
}
