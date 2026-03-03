import { useState, useEffect } from 'react'

const contacts = [
  {
    name: 'Luis — Entreno',
    href: 'https://wa.me/34613015102?text=Hola%20Luis,%20quiero%20reservar%20una%20sesión%20de%20entrenamiento',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M6.5 6.5a2 2 0 00-2 0L3 7.5v9l1.5 1a2 2 0 002 0L8 16.5v-9L6.5 6.5z" />
        <path d="M17.5 6.5a2 2 0 012 0L21 7.5v9l-1.5 1a2 2 0 01-2 0L16 16.5v-9l1.5-1z" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    name: 'Andreu — Fisio',
    href: 'https://wa.me/34606728257?text=Hola%20Andreu,%20me%20gustaría%20reservar%20una%20sesión%20de%20fisioterapia',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M18 8a4 4 0 00-8 0c0 3.5 4 7 4 7s4-3.5 4-7z" />
        <path d="M7 11c-2 1-3 3-3 5 0 2.5 3 5 8 5s8-2.5 8-5c0-1-.3-2-1-3" />
      </svg>
    ),
  },
  {
    name: 'Pau — Nutri',
    href: 'https://wa.me/34613007915?text=Hola%20Pau,%20me%20gustaría%20información%20sobre%20nutrición',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 2c-3 7-7 9-7 14a7 7 0 0014 0c0-5-4-7-7-14z" />
        <path d="M12 22v-8" />
      </svg>
    ),
  },
]

export default function WhatsAppFAB() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    function handleClick() { setOpen(false) }
    document.addEventListener('pointerdown', handleClick)
    return () => document.removeEventListener('pointerdown', handleClick)
  }, [open])

  return (
    <div
      className="fixed z-40"
      style={{
        bottom: 'calc(68px + env(safe-area-inset-bottom))',
        right: '16px',
      }}
    >
      {/* Contact options */}
      <div
        className={`mb-3 flex flex-col gap-2 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {contacts.map((c, i) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 self-end rounded-full bg-[#1E1E1E] py-2 pl-3 pr-4 text-sm font-medium text-trust-gray shadow-lg active:scale-[0.96] transition-all"
            style={{ transitionDelay: open ? `${(contacts.length - 1 - i) * 40}ms` : '0ms' }}
          >
            <span className="text-yellow-snap">{c.icon}</span>
            {c.name}
          </a>
        ))}
      </div>

      {/* FAB button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className={`ml-auto flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-200 active:scale-[0.92] ${
          open ? 'bg-[#1E1E1E]' : 'bg-[#25D366]'
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-trust-gray">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>
    </div>
  )
}
