import {
  Lightbulb,
  PlugZap,
  CircuitBoard,
  ClipboardCheck,
  Zap,
  HelpCircle,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceKey } from '../config/business'
import { useWhatsAppModal } from './WhatsAppModalContext'
import WhatsAppGlyph from './WhatsAppGlyph'
import Reveal from './Reveal'

interface Card {
  key: ServiceKey
  icon: LucideIcon
  title: string
  copy: string
}

const CARDS: Card[] = [
  {
    key: 'lighting',
    icon: Lightbulb,
    title: 'Lighting Installation',
    copy: 'Discuss wall lights, kitchen downlights and under-cabinet lighting.',
  },
  {
    key: 'sockets',
    icon: PlugZap,
    title: 'Sockets & Fittings',
    copy: 'Get in touch about socket replacements and additional electrical points.',
  },
  {
    key: 'fuseBoard',
    icon: CircuitBoard,
    title: 'Fuse Board Replacement',
    copy: 'Discuss your existing fuse board and replacement requirements.',
  },
  {
    key: 'testing',
    icon: ClipboardCheck,
    title: 'Testing & Inspection',
    copy: 'Talk through the electrical testing and inspection you need.',
  },
  {
    key: 'external',
    icon: Zap,
    title: 'External Power',
    copy: 'Enquire about electrical power for outdoor spaces.',
  },
  {
    key: 'other',
    icon: HelpCircle,
    title: 'Other Electrical Enquiries',
    copy: 'Tell Ryan what you need and check whether RM Electrical can help.',
  },
]

function ServiceCard({ card }: { card: Card }) {
  const { openModal } = useWhatsAppModal()
  const Icon = card.icon

  return (
    <article className="group flex flex-col border border-line bg-white p-7 transition-shadow duration-300 hover:shadow-[0_16px_40px_-20px_rgba(17,17,17,0.3)]">
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center border border-line text-ink transition-colors group-hover:border-orange group-hover:text-orange">
        <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="text-2xl font-bold">{card.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{card.copy}</p>
      <button
        type="button"
        onClick={() => openModal(card.key)}
        className="mt-6 inline-flex items-center gap-2 self-start pb-1 text-sm font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-orange hover:decoration-orange"
      >
        <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" />
        Enquire on WhatsApp
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  )
}

export default function Services() {
  return (
    <section id="services" className="scroll-margin-offset bg-warm py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="container-site">
        <p className="text-xs font-semibold tracking-[0.25em] text-orange">
          ELECTRICAL SERVICES
        </p>
        <h2
          id="services-heading"
          className="mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl"
        >
          Help with the jobs
          <br />
          your home <span className="text-orange">needs.</span>
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, index) => (
            <Reveal key={card.key} delay={(index % 3) * 80}>
              <ServiceCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}