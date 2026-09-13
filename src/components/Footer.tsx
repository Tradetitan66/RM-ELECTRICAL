import { Phone } from 'lucide-react'
import { BUSINESS } from '../config/business'
import Wordmark from './Wordmark'

const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-ink pb-28 pt-14 text-white sm:pb-14">
      <div className="container-site grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm text-white/65">
            Electrical services in Edinburgh and surrounding areas.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/80 transition-colors hover:text-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Get in touch
          </p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-orange"
              >
                <Phone className="h-4 w-4 text-orange" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site mt-12 border-t border-white/10 pt-6">
        <p className="text-xs text-white/45">
          &copy; {year} {BUSINESS.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}