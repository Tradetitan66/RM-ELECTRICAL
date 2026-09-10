import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { BUSINESS } from '../config/business'
import { useWhatsAppModal } from './WhatsAppModalContext'
import WhatsAppGlyph from './WhatsAppGlyph'

export default function MobileActionBar() {
  const { openModal, isOpen } = useWhatsAppModal()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink text-white transition-transform duration-300 sm:hidden ${
        isOpen ? 'translate-y-full' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div
        className={`grid grid-cols-2 gap-3 px-4 transition-all duration-300 ${
          scrolled ? 'py-1.5' : 'py-3'
        }`}
      >
        <a
          href={BUSINESS.phoneHref}
          className={`btn btn-outline-light text-sm transition-all duration-300 ${
            scrolled ? 'px-3 py-1.5' : 'px-4 py-3'
          }`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <button
          type="button"
          onClick={() => openModal()}
          className={`btn btn-primary text-sm transition-all duration-300 ${
            scrolled ? 'px-3 py-1.5' : 'px-4 py-3'
          }`}
        >
          <WhatsAppGlyph className="h-4 w-4" />
          WhatsApp Quote
        </button>
      </div>
    </div>
  )
}