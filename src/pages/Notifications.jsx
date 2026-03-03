import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const initialNotifications = [
  {
    id: 1,
    text: 'Recordatorio: Tienes sesión hoy a las 17:30 con Luis',
    time: 'Hace 2 horas',
    read: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 2,
    text: 'Pau ha actualizado tu plan de nutrición',
    time: 'Hace 5 horas',
    read: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 2c-3 7-7 9-7 14a7 7 0 0014 0c0-5-4-7-7-14z" />
        <path d="M12 22v-8" />
      </svg>
    ),
  },
  {
    id: 3,
    text: '¡Sesión completada! Llevas 12 esta semana 🔥',
    time: 'Ayer',
    read: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    id: 4,
    text: 'Nuevos horarios de OpTraining disponibles',
    time: 'Hace 2 días',
    read: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
      </svg>
    ),
  },
  {
    id: 5,
    text: 'Tu bono de Entrenamiento tiene 3 sesiones restantes',
    time: 'Hace 3 días',
    read: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    id: 6,
    text: 'Andreu te recomienda una sesión de fisio esta semana',
    time: 'Hace 5 días',
    read: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M18 8a4 4 0 00-8 0c0 3.5 4 7 4 7s4-3.5 4-7z" />
        <path d="M7 11c-2 1-3 3-3 5 0 2.5 3 5 8 5s8-2.5 8-5c0-1-.3-2-1-3" />
      </svg>
    ),
  },
]

export default function Notifications({ onClose, onMarkRead }) {
  const [visible, setVisible] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)

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

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    onMarkRead?.()
  }

  function toggleRead(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

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
          <div>
            <h2 className="text-xl font-semibold text-trust-gray">Notificaciones</h2>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="mt-1 text-sm text-yellow-snap active:opacity-70 transition-opacity"
              >
                Marcar todo como leído
              </button>
            )}
          </div>
          <button onClick={handleClose} className="p-1 text-human-gray active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-10" style={{ overscrollBehavior: 'contain' }}>
          <div className="flex flex-col gap-2">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => toggleRead(n.id)}
                className={`flex w-full items-start gap-3 rounded-xl p-4 text-left transition-all active:scale-[0.98] ${
                  n.read
                    ? 'bg-transparent'
                    : 'border-l-[3px] border-yellow-snap bg-[#1E1E1E]'
                }`}
              >
                {/* Icon */}
                <span className={`mt-0.5 shrink-0 ${n.read ? 'text-human-gray/40' : 'text-yellow-snap'}`}>
                  {n.icon}
                </span>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className={`text-sm leading-snug ${n.read ? 'text-human-gray/60' : 'font-medium text-trust-gray'}`}>
                    {n.text}
                  </p>
                  <p className={`mt-1 text-xs ${n.read ? 'text-human-gray/30' : 'text-human-gray'}`}>
                    {n.time}
                  </p>
                </div>

                {/* Unread dot */}
                {!n.read && (
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-snap" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
