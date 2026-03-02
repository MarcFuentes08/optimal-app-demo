const stats = [
  { value: '12', label: 'Sesiones' },
  { value: '2', label: 'Bonos activos' },
  { value: '94%', label: 'Asistencia' },
]

const menuItems = [
  {
    label: 'Mis Citas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
      </svg>
    ),
  },
  {
    label: 'Mi Entrenamiento',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M6.5 6.5a2 2 0 00-2 0L3 7.5v9l1.5 1a2 2 0 002 0L8 16.5v-9L6.5 6.5z" />
        <path d="M17.5 6.5a2 2 0 012 0L21 7.5v9l-1.5 1a2 2 0 01-2 0L16 16.5v-9l1.5-1z" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    label: 'Nutrición',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 2c-3 7-7 9-7 14a7 7 0 0014 0c0-5-4-7-7-14z" />
        <path d="M12 22v-8" />
        <path d="M9 17c1-1 2-3 3-5" />
      </svg>
    ),
  },
  {
    label: 'Progreso',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: 'Mis Bonos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    label: 'Historial',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Notificaciones',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    label: 'Configuración',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001.08 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z" />
      </svg>
    ),
  },
]

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-human-gray">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function Profile() {
  return (
    <div className="min-h-full pb-28">
      {/* Avatar + name */}
      <header className="flex flex-col items-center px-5 pt-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-snap">
          <span className="text-2xl font-bold text-core-black">CF</span>
        </div>
        <h1 className="mt-4 text-xl font-semibold text-trust-gray">Carlos Fernández</h1>
        <p className="mt-0.5 text-sm text-human-gray">Cliente desde 2023</p>
      </header>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 px-5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center rounded-xl bg-[#1E1E1E] p-3">
            <span className="text-2xl font-bold text-yellow-snap">{s.value}</span>
            <span className="mt-0.5 text-[11px] text-human-gray">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mt-6 px-5">
        <div className="rounded-2xl bg-[#1E1E1E]">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-4 px-4 py-3.5 active:scale-[0.98] active:bg-white/5 transition-all ${
                i !== menuItems.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <span className="text-human-gray">{item.icon}</span>
              <span className="flex-1 text-left font-medium text-trust-gray">{item.label}</span>
              <Chevron />
            </button>
          ))}
        </div>
      </div>

      {/* Brand footer */}
      <div className="mt-8 flex flex-col items-center px-5 pb-4">
        <img src="/logo-trust-gray.png" alt="OPTIMAL" width="100" height="24" className="h-6 w-auto opacity-30" />
        <p className="mt-2 text-xs italic text-human-gray/40">
          Human approach. To sport, to life.
        </p>
      </div>
    </div>
  )
}
