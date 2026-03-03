import { useState, useCallback, useRef } from 'react'
import Onboarding from './components/Onboarding'
import Skeleton from './components/Skeleton'
import SplashScreen from './components/SplashScreen'
import TabBar from './components/TabBar'
import WhatsAppFAB from './components/WhatsAppFAB'
import Home from './pages/Home'
import Classes from './pages/Classes'
import Training from './pages/Training'
import Profile from './pages/Profile'

const pages = {
  home: Home,
  classes: Classes,
  training: Training,
  profile: Profile,
}

function hasSeenOnboarding() {
  try {
    return localStorage.getItem('optimal_onboarding_seen') === '1'
  } catch {
    return false
  }
}

function markOnboardingSeen() {
  try {
    localStorage.setItem('optimal_onboarding_seen', '1')
  } catch {}
}

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(!hasSeenOnboarding())
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const [loading, setLoading] = useState(false)
  const prevTab = useRef('home')

  const handleOnboardingFinish = useCallback(() => {
    markOnboardingSeen()
    setShowOnboarding(false)
  }, [])

  const handleSplashFinish = useCallback(() => setShowSplash(false), [])

  const handleTabChange = useCallback((tab) => {
    if (tab === prevTab.current) return
    prevTab.current = tab
    setLoading(true)
    setActiveTab(tab)
    setTimeout(() => setLoading(false), 300)
  }, [])

  const Page = pages[activeTab]
  const showFAB = activeTab === 'home' || activeTab === 'profile'

  return (
    <div className="min-h-full bg-core-black font-body text-trust-gray">
      {showOnboarding && <Onboarding onFinish={handleOnboardingFinish} />}
      {!showOnboarding && showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <div className="mx-auto max-w-lg">
        {loading ? (
          <Skeleton />
        ) : (
          <div key={activeTab} className="animate-page-in">
            <Page onNavigate={handleTabChange} />
          </div>
        )}
      </div>
      {showFAB && <WhatsAppFAB />}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
