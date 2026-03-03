import { useState, useEffect } from 'react'
import Progress from './Progress'

function getFormattedDate() {
  const d = new Date()
  const day = d.toLocaleDateString('es-ES', { weekday: 'long' })
  const num = d.getDate()
  const month = d.toLocaleDateString('es-ES', { month: 'long' })
  return day.charAt(0).toUpperCase() + day.slice(1) + ', ' + num + ' de ' + month
}

const bonos = [
  { name: 'Entrenamiento 1h', used: 5, total: 8 },
  { name: 'Nutrición', used: 2, total: 3 },
]

const novedades = [
  {
    emoji: '🔥',
    title: 'Nuevos horarios OpTraining',
    subtitle: 'A partir del 10 de marzo',
  },
  {
    emoji: '🥗',
    title: 'Nutrición deportiva disponible',
    subtitle: 'Consulta con Pau, nuestro nutricionista',
  },
]

const servicios = [
  {
    title: 'Fisioterapia',
    color: '#DBD8D2',
    description: 'Tratamiento manual especializado para dolor, lesiones y recuperación.',
    professional: 'Andreu — Fisioterapeuta',
    btnLabel: 'Pedir cita',
    whatsapp: 'https://wa.me/34606728257?text=Hola%20Andreu,%20me%20gustaría%20reservar%20una%20sesión%20de%20fisioterapia',
    phone: 'tel:+34606728257',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M18 8a4 4 0 00-8 0c0 3.5 4 7 4 7s4-3.5 4-7z" />
        <path d="M14 8a.5.5 0 11-1 0 .5.5 0 011 0z" fill="currentColor" />
        <path d="M7 11c-2 1-3 3-3 5 0 2.5 3 5 8 5s8-2.5 8-5c0-1-.3-2-1-3" />
      </svg>
    ),
  },
  {
    title: 'Readaptación de Lesiones',
    color: '#F3AF3E',
    description: 'Vuelve a tu nivel deportivo con un plan personalizado post-lesión.',
    professional: 'Andreu — Especialista en readaptación',
    btnLabel: 'Más info',
    whatsapp: 'https://wa.me/34606728257?text=Hola%20Andreu,%20me%20interesa%20el%20servicio%20de%20readaptación',
    phone: 'tel:+34606728257',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <circle cx="12" cy="5" r="2.5" />
        <path d="M12 7.5v5" />
        <path d="M9 20l3-7.5 3 7.5" />
        <path d="M7 12.5l5 1 5-1" />
        <path d="M18 16l2-1" />
        <path d="M20 15v3" />
      </svg>
    ),
  },
  {
    title: 'Nutrición Deportiva',
    color: '#E5FA76',
    description: 'Planes nutricionales adaptados a tu entrenamiento y objetivos.',
    professional: 'Pau — Nutricionista',
    btnLabel: 'Consultar',
    whatsapp: 'https://wa.me/34613007915?text=Hola%20Pau,%20me%20gustaría%20información%20sobre%20nutrición',
    phone: 'tel:+34613007915',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M12 2c-3 7-7 9-7 14a7 7 0 0014 0c0-5-4-7-7-14z" />
        <path d="M12 22v-8" />
        <path d="M9 17c1-1 2-3 3-5" />
      </svg>
    ),
  },
  {
    title: 'Entrenamiento Personal',
    color: '#EF3E07',
    description: 'Sesiones 1:1 o en grupo reducido, adaptadas a tu nivel y objetivos.',
    professional: 'Luis — Entrenador personal',
    btnLabel: 'Reservar',
    whatsapp: 'https://wa.me/34613015102?text=Hola%20Luis,%20quiero%20reservar%20una%20sesión%20de%20entrenamiento',
    phone: 'tel:+34613015102',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M6.5 6.5a2 2 0 00-2 0L3 7.5v9l1.5 1a2 2 0 002 0L8 16.5v-9L6.5 6.5z" />
        <path d="M17.5 6.5a2 2 0 012 0L21 7.5v9l-1.5 1a2 2 0 01-2 0L16 16.5v-9l1.5-1z" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
]

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)

function NutricionSheet({ onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${visible ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div
        className={`relative z-10 w-full max-w-lg rounded-t-2xl border-t border-white/10 bg-core-black px-5 pb-8 pt-5 transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button onClick={handleClose} className="absolute right-4 top-4 p-1 text-human-gray">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-lg font-semibold text-trust-gray">Tu Nutrición</h2>

        <div className="mt-4 rounded-xl bg-[#1E1E1E] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-human-gray">Plan activo</p>
          <p className="mt-1 font-medium text-trust-gray">Definición — Semana 4</p>
          <p className="mt-3 text-sm text-human-gray">📋 Última dieta enviada: 28 feb 2026</p>
        </div>

        <a
          href="https://wa.me/34613007915?text=Hola%20Pau,%20tengo%20una%20consulta%20sobre%20mi%20plan%20nutricional"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-snap py-3 text-sm font-semibold text-core-black active:scale-[0.97] transition-transform"
        >
          <WhatsAppIcon />
          Contactar con Pau
        </a>
      </div>
    </div>
  )
}

export default function Home({ onNavigate }) {
  const [animateBars, setAnimateBars] = useState(false)
  const [showNutricion, setShowNutricion] = useState(false)
  const [showProgress, setShowProgress] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimateBars(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-full pb-28">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-start justify-between bg-core-black px-5 pb-4 pt-4">
        <div>
          <img src="/logo-trust-gray.png" alt="OPTIMAL" width="120" height="28" className="mb-2 h-7 w-auto" />
          <h1 className="text-2xl font-semibold text-trust-gray">
            Hola, Carlos 👋
          </h1>
          <p className="mt-0.5 text-sm text-human-gray">{getFormattedDate()}</p>
        </div>
        <button className="relative mt-1 p-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-trust-gray">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-pulse text-[9px] font-bold text-white">
            2
          </span>
        </button>
      </header>

      <div className="flex flex-col gap-6 px-5">
        {/* Próxima sesión */}
        <section>
          <div className="overflow-hidden rounded-2xl bg-[#1E1E1E] border-l-[3px] border-yellow-snap p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-human-gray">
              Próxima sesión
            </p>
            <h2 className="mt-1.5 text-lg font-semibold text-trust-gray">
              Entrenamiento Personal
            </h2>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-yellow-snap">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-sm text-human-gray">Hoy, 17:30h</span>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-yellow-snap">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 20a7 7 0 0114 0" />
                </svg>
                <span className="text-sm text-human-gray">Luis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-yellow-snap">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm text-human-gray">OPTIMAL — Barberà</span>
              </div>
            </div>
          </div>
        </section>

        {/* Accesos rápidos */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate?.('classes')}
              className="flex flex-col items-center gap-2 rounded-xl bg-[#1E1E1E] p-4 active:scale-[0.97] transition-transform"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-snap">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18" />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
              </svg>
              <span className="text-sm font-medium text-trust-gray">Reservar Clase</span>
            </button>

            <button
              onClick={() => onNavigate?.('training')}
              className="flex flex-col items-center gap-2 rounded-xl bg-[#1E1E1E] p-4 active:scale-[0.97] transition-transform"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-snap">
                <path d="M6.5 6.5a2 2 0 00-2 0L3 7.5v9l1.5 1a2 2 0 002 0L8 16.5v-9L6.5 6.5z" />
                <path d="M17.5 6.5a2 2 0 012 0L21 7.5v9l-1.5 1a2 2 0 01-2 0L16 16.5v-9l1.5-1z" />
                <path d="M8 12h8" />
              </svg>
              <span className="text-sm font-medium text-trust-gray">Mi Entreno</span>
            </button>

            <button
              onClick={() => setShowNutricion(true)}
              className="flex flex-col items-center gap-2 rounded-xl bg-[#1E1E1E] p-4 active:scale-[0.97] transition-transform"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-snap">
                <path d="M12 2c-3 7-7 9-7 14a7 7 0 0014 0c0-5-4-7-7-14z" />
                <path d="M12 22v-8" />
                <path d="M9 17c1-1 2-3 3-5" />
              </svg>
              <span className="text-sm font-medium text-trust-gray">Nutrición</span>
            </button>

            <button
              onClick={() => setShowProgress(true)}
              className="flex flex-col items-center gap-2 rounded-xl bg-[#1E1E1E] p-4 active:scale-[0.97] transition-transform"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-snap">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span className="text-sm font-medium text-trust-gray">Progreso</span>
            </button>
          </div>
        </section>

        {/* Bonos activos */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-trust-gray">Tus bonos</h3>
          <div className="flex flex-col gap-3">
            {bonos.map((bono) => {
              const pct = (bono.used / bono.total) * 100
              return (
                <div key={bono.name} className="rounded-xl bg-[#1E1E1E] p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-trust-gray">{bono.name}</span>
                    <span className="text-sm text-human-gray">
                      {bono.used} de {bono.total} sesiones
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#2A2A2A]">
                    <div
                      className="h-full rounded-full bg-yellow-snap transition-all duration-1000 ease-out"
                      style={{ width: animateBars ? `${pct}%` : '0%' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Nuestros servicios */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-trust-gray">Nuestros Servicios</h3>
          <div className="flex flex-col gap-3">
            {servicios.map((srv) => (
              <div key={srv.title} className="overflow-hidden rounded-xl bg-[#1E1E1E]">
                <div className="h-1" style={{ backgroundColor: srv.color }} />
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span style={{ color: srv.color }}>{srv.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-trust-gray">{srv.title}</h4>
                      <p className="mt-1 text-sm leading-snug text-human-gray">{srv.description}</p>
                      <p className="mt-2 text-xs italic text-human-gray">{srv.professional}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={srv.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium active:scale-[0.97] transition-transform"
                      style={{ borderColor: srv.color, color: srv.color }}
                    >
                      <WhatsAppIcon />
                      {srv.btnLabel}
                    </a>
                    <a
                      href={srv.phone}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border active:scale-[0.95] transition-transform"
                      style={{ borderColor: srv.color, color: srv.color }}
                    >
                      <PhoneIcon />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Novedades */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-trust-gray">Novedades</h3>
          <div className="flex flex-col gap-3">
            {novedades.map((item) => (
              <div key={item.title} className="rounded-xl bg-[#1E1E1E] p-4">
                <p className="font-medium text-trust-gray">
                  {item.emoji} {item.title}
                </p>
                <p className="mt-1 text-sm text-human-gray">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Nutrición bottom sheet */}
      {showNutricion && <NutricionSheet onClose={() => setShowNutricion(false)} />}

      {/* Progress bottom sheet */}
      {showProgress && <Progress onClose={() => setShowProgress(false)} />}
    </div>
  )
}
