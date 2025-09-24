import React from 'react'
import HeroSection from '@/components/HeroSection'
import Benefits from '@/components/Benefits'
import Solutions from '@/components/Solutions'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import SystemSimulation from '@/components/SystemSimulation'
import NewsEvents from '@/components/NewsEvents'
import CallToAction from '@/components/CallToAction'
import { FloatButton } from 'antd'

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans">
      <HeroSection />
      <Benefits />
      <Solutions />
      <Features />
      <HowItWorks />
      <SystemSimulation />
      <NewsEvents />
      <CallToAction />
      <FloatButton.BackTop />
    </div>
  )
}

export default HomePage
