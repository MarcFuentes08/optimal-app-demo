import { useState } from 'react'

const tabs = [
  {
    id: 'home',
    label: 'Inicio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 10v9a1 1 0 001 1h3.5v-5a1.5 1.5 0 013 0v5H16a1 1 0 001-1v-9" />
      </svg>
    ),
  },
  {
    id: 'classes',
    label: 'Clases',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
      </svg>
    ),
  },
  {
    id: 'training',
    label: 'Entreno',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M6.5 6.5a2 2 0 00-2 0L3 7.5v9l1.5 1a2 2 0 002 0L8 16.5v-9L6.5 6.5z" />
        <path d="M17.5 6.5a2 2 0 012 0L21 7.5v9l-1.5 1a2 2 0 01-2 0L16 16.5v-9l1.5-1z" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 20a7 7 0 0114 0" />
      </svg>
    ),
  },
]

export default function TabBar({ activeTab, onTabChange }) {
  const [pressed, setPressed] = useState(null)

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t bg-core-black"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="mx-auto flex max-w-md items-center justify-around py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              onPointerDown={() => setPressed(tab.id)}
              onPointerUp={() => setPressed(null)}
              onPointerLeave={() => setPressed(null)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-all duration-100 ${
                pressed === tab.id ? 'scale-[0.85] opacity-60' : 'scale-100 opacity-100'
              } ${isActive ? 'text-yellow-snap' : 'text-human-gray'}`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
