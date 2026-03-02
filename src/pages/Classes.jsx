import { useState, useMemo } from 'react'

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

const dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

function getWeekDays() {
  const today = new Date()
  const dow = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dow === 0 ? 7 : dow) - 1))

  return Array.from({ length: 6 }, (_, i) => {
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

export default function Classes() {
  const weekDays = useMemo(getWeekDays, [])
  const todayDow = weekDays.find((d) => d.isToday)?.dayOfWeek ?? 1
  const [selectedDay, setSelectedDay] = useState(todayDow)
  const [reserved, setReserved] = useState({})
  const [staggerKey, setStaggerKey] = useState(0)

  const classes = schedule[selectedDay] || []

  function handleDayChange(dow) {
    setSelectedDay(dow)
    setStaggerKey((k) => k + 1)
  }

  function toggleReserve(dayTime) {
    setReserved((prev) => ({ ...prev, [dayTime]: !prev[dayTime] }))
  }

  return (
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
              {/* Time */}
              <div className="w-14 shrink-0">
                <span className="text-2xl font-bold text-trust-gray">{cls.time}</span>
              </div>

              {/* Info */}
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
    </div>
  )
}
