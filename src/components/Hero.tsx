import { Check } from 'lucide-react'
import { BUSINESS } from '../config/business'
import { CallButton, WhatsAppButton } from './CTAButtons'

const HERO_POINTS = [
  'Based in Alexandria',
  'Lighting, sockets & power',
  'Speak directly to Ryan',
]

export default function Hero() {
  return (
    <section className="bg-ink text-white" aria-labelledby="hero-heading">
      <div className="container-site py-14 sm:py-16 lg:py-24">
        <div className="max-w-3xl">
          <p
            className="entrance-up mb-5 inline-flex w-fit items-center border border-white/20 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white/75"
            style={{ animationDelay: '80ms' }}
          >
            ALEXANDRIA &bull; BALLOCH &bull; SURROUNDING AREAS
          </p>

          <h1
            id="hero-heading"
            className="entrance-up text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.95]"
            style={{ animationDelay: '200ms' }}
          >
            Electrical work.
            <br />
            Made <span className="text-orange">simple.</span>
          </h1>

          <p
            className="entrance-up mt-6 max-w-xl text-lg leading-relaxed text-white/80"
            style={{ animationDelay: '320ms' }}
          >
            From lighting and sockets to fuse board replacement and testing,
            speak to Ryan at {BUSINESS.name} about your next electrical job.
          </p>

          <div
            className="entrance-up mt-8 hidden flex-col gap-3 sm:flex sm:flex-row sm:flex-wrap"
            style={{ animationDelay: '440ms' }}
          >
            <CallButton href={BUSINESS.phoneHref} size="lg" />
            <WhatsAppButton size="lg" variant="outline-light" />
          </div>

          <ul
            className="entrance-up mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8"
            style={{ animationDelay: '560ms' }}
          >
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-white/70">
                <Check className="h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}