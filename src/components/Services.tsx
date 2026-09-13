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
    copy: 'Tell us what you need and check whether Local Electrical can help.',
  },
]

function ServiceCard({ card }: { card: Card }) {
  const { openModal } = useWhatsAppModal()
  const Icon = card.icon

  return (
    <article className="group flex flex-col rounded-2xl border border-line bg-white p-5 transition-shadow duration-300 hover:shadow-[0_16px_40px_-20px_rgba(17,17,17,0.3)] sm:p-6">
      <div className="flex items-center gap-2.5">
        <Icon className="h-5 w-5 shrink-0 text-orange transition-colors group-hover:[stroke-width:2]" strokeWidth={1.75} aria-hidden="true" />
        <h3 className="text-xl font-bold">{card.title}</h3>
      </div>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-body">{card.copy}</p>
      <button
        type="button"
        onClick={() => openModal(card.key)}
        className="mt-4 inline-flex items-center gap-2 self-start pb-1 text-sm font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-orange hover:decoration-orange"
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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