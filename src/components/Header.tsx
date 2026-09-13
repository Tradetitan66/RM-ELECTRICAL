import { useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import Wordmark from './Wordmark'
import { BUSINESS } from '../config/business'
import { useWhatsAppModal } from './WhatsAppModalContext'
import WhatsAppGlyph from './WhatsAppGlyph'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)
  const { openModal } = useWhatsAppModal()

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
    {bannerVisible && (
      <div className="bg-orange text-ink">
        <div className="container-site flex items-center justify-center gap-3 py-2 text-center sm:justify-between sm:text-left">
          <p className="text-xs font-semibold sm:text-sm">
            This is a <span className="uppercase tracking-[0.15em]">demo</span> website - like the design? We can build one like this for your business.
          </p>
          <button
            type="button"
            onClick={() => openModal()}
            className="hidden shrink-0 bg-ink px-3 py-1.5 text-xs font-bold tracking-wide text-white transition-colors hover:bg-ink/80 sm:inline-flex"
          >
            Get yours
          </button>
          <button
            type="button"
            onClick={() => setBannerVisible(false)}
            aria-label="Dismiss demo notice"
            className="shrink-0 p-1 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    )}
    <header className="entrance-down sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={BUSINESS.phoneHref}
            className="btn btn-outline-light px-4 py-2 text-sm"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
          <button
            type="button"
            onClick={() => openModal()}
            className="btn btn-primary px-4 py-2 text-sm"
          >
            <WhatsAppGlyph className="h-4 w-4" />
            WhatsApp Quote
          </button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded border border-white/20 p-2 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <nav aria-label="Mobile" className="container-site flex flex-col gap-2 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded px-2 py-3 text-lg font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-orange"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={BUSINESS.phoneHref}
              onClick={closeMenu}
              className="btn btn-outline-light px-4 py-3 text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
            <button
              type="button"
              onClick={() => {
                closeMenu()
                openModal()
              }}
              className="btn btn-primary px-4 py-3 text-sm"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              WhatsApp
            </button>
          </div>
        </nav>
      </div>
    </header>
    </>
  )
}