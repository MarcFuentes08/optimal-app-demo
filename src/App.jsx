import { useState, useCallback } from 'react'
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

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState('home')

  const handleSplashFinish = useCallback(() => setShowSplash(false), [])

  const Page = pages[activeTab]
  const showFAB = activeTab === 'home' || activeTab === 'profile'

  return (
    <div className="min-h-full bg-core-black font-body text-trust-gray">
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <div className="mx-auto max-w-lg">
        <div key={activeTab} className="animate-page-in">
          <Page onNavigate={setActiveTab} />
        </div>
      </div>
      {showFAB && <WhatsAppFAB />}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
