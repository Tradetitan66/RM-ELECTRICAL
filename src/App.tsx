import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import LightingFeature from './components/LightingFeature'
import HowItWorks from './components/HowItWorks'
import ServiceArea from './components/ServiceArea'
import Faqs from './components/Faqs'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import MobileActionBar from './components/MobileActionBar'
import WhatsAppModal from './components/WhatsAppModal'
import { WhatsAppModalProvider } from './components/WhatsAppModalContext'

export default function App() {
  return (
    <WhatsAppModalProvider>
      <div id="top" className="min-h-screen bg-white text-body">
        <Header />
        <main>
          <Hero />
          <Services />
          <About />
          <LightingFeature />
          <HowItWorks />
          <ServiceArea />
          <Faqs />
          <FinalCta />
        </main>
        <Footer />
        <MobileActionBar />
        <WhatsAppModal />
      </div>
    </WhatsAppModalProvider>
  )
}