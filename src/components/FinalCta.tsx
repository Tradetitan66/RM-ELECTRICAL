import { BUSINESS } from '../config/business'
import { CallButton, WhatsAppButton } from './CTAButtons'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28" aria-labelledby="final-cta-heading">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-orange/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative text-center">
        <h2
          id="final-cta-heading"
          className="mx-auto max-w-3xl text-4xl font-extrabold sm:text-6xl"
        >
          Let&rsquo;s talk about
          <br />
          your <span className="text-orange">electrical job.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
          Contact Ryan at {BUSINESS.name} to discuss what you need.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CallButton href={BUSINESS.phoneHref} size="lg" />
          <WhatsAppButton size="lg" variant="outline-light" />
        </div>
      </div>
    </section>
  )
}