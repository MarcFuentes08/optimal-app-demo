import { useState, useEffect } from 'react'

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-human-gray">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

function Toggle({ label, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)

  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-center justify-between py-3 active:opacity-70 transition-opacity"
    >
      <span className="text-sm text-trust-gray">{label}</span>
      <div
        className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
          on ? 'bg-yellow-snap' : 'bg-[#2A2A2A]'
        }`}
      >
        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            on ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
    </button>
  )
}

const accountRows = [
  { label: 'Idioma', value: 'Español' },
  { label: 'Unidades de peso', value: 'Kilogramos' },
  { label: 'Zona horaria', value: 'Madrid (GMT+1)' },
]

const legalRows = [
  'Política de privacidad',
  'Términos y condiciones',
  'Licencias de terceros',
]

export default function Settings({ onClose }) {
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
          <h2 className="text-2xl font-semibold text-trust-gray">Configuración</h2>
          <button onClick={handleClose} className="p-1 text-human-gray active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-10">
          {/* Notifications section */}
          <p className="text-[10px] font-semibold uppercase tracking-widest text-human-gray">
            Notificaciones
          </p>
          <div className="mt-2 rounded-xl bg-[#1E1E1E] px-4">
            <div className="border-b border-white/5">
              <Toggle label="Recordatorios de sesión" defaultOn />
            </div>
            <div className="border-b border-white/5">
              <Toggle label="Novedades del centro" defaultOn />
            </div>
            <div className="border-b border-white/5">
              <Toggle label="Actualizaciones de nutrición" defaultOn />
            </div>
            <div>
              <Toggle label="Promociones" />
            </div>
          </div>

          {/* Account section */}
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-human-gray">
            Cuenta
          </p>
          <div className="mt-2 rounded-xl bg-[#1E1E1E]">
            {accountRows.map((row, i) => (
              <button
                key={row.label}
                className={`flex w-full items-center justify-between px-4 py-3.5 active:bg-white/5 transition-colors ${
                  i !== accountRows.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className="text-sm text-trust-gray">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-human-gray">{row.value}</span>
                  <Chevron />
                </div>
              </button>
            ))}
          </div>

          {/* Legal section */}
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-human-gray">
            Legal
          </p>
          <div className="mt-2 rounded-xl bg-[#1E1E1E]">
            {legalRows.map((label, i) => (
              <button
                key={label}
                className={`flex w-full items-center justify-between px-4 py-3.5 active:bg-white/5 transition-colors ${
                  i !== legalRows.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className="text-sm text-trust-gray">{label}</span>
                <Chevron />
              </button>
            ))}
          </div>

          {/* App info */}
          <div className="mt-8 flex flex-col items-center">
            <img src="/avatar-negative.png" alt="OPTIMAL" width="40" height="40" className="h-10 w-10 opacity-30" />
            <p className="mt-2 text-xs text-human-gray/40">OPTIMAL App v1.0.0</p>
            <p className="mt-0.5 text-[10px] text-human-gray/30">© 2026 OPTIMAL Barberà del Vallès</p>
          </div>
        </div>
      </div>
    </div>
  )
}
