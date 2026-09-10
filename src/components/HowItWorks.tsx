import { Phone } from 'lucide-react'
import { BUSINESS } from '../config/business'
import Reveal from './Reveal'

const STEPS = [
  {
    number: '1',
    title: 'Tell us about the job',
    copy: 'Choose a service and add your location and project details.',
  },
  {
    number: '2',
    title: 'Continue to WhatsApp',
    copy: 'Your message will be prepared for you. Tap Send in WhatsApp.',
  },
  {
    number: '3',
    title: 'Discuss the next steps',
    copy: 'Speak to Ryan about the work, availability and quotation.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-warm py-20 sm:py-28" aria-labelledby="how-heading">
      <div className="container-site">
        <p className="text-center text-xs font-semibold tracking-[0.25em] text-orange">
          HOW ENQUIRIES WORK
        </p>
        <h2
          id="how-heading"
          className="mt-4 text-center text-4xl font-extrabold sm:text-5xl"
        >
          Three simple steps.
        </h2>

        <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 100}>
              <li className="relative border-t-2 border-ink pt-6">
                <span className="absolute -top-5 left-0 bg-warm pr-3 text-5xl font-extrabold text-orange">
                  {step.number}
                </span>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed">{step.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <p className="mt-14 text-center">
          Prefer to talk?{' '}
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-orange"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {BUSINESS.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  )
}