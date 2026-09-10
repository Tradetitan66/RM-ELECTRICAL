import { Phone } from 'lucide-react'
import { BUSINESS } from '../config/business'
import { WhatsAppButton } from './CTAButtons'

const DETAILS = [
  { label: 'Based in', value: BUSINESS.area },
  { label: 'Coverage', value: BUSINESS.coverage },
  { label: 'Telephone', value: BUSINESS.phoneDisplay },
]

export default function ServiceArea() {
  return (
    <section
      id="contact"
      className="scroll-margin-offset bg-white py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-orange">
            SERVICE AREA &amp; CONTACT
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-4xl font-extrabold sm:text-5xl"
          >
            Local to Alexandria.
            <br />
            Covering Balloch and <span className="text-orange">nearby.</span>
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed">
            Get in touch to discuss your electrical job and confirm availability
            at your address.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={BUSINESS.phoneHref}
              className="btn btn-dark px-6 py-3.5 text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
            <WhatsAppButton size="md" className="px-6 py-3.5" />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-warm p-6 sm:p-8">
          <div className="mb-5 overflow-hidden rounded-xl border border-line">
          <iframe
            title="Google Map showing Alexandria and Balloch in West Dunbartonshire, Scotland"
            src="https://maps.google.com/maps?q=Alexandria,+West+Dunbartonshire,+Scotland,+GB&z=13&output=embed"
            className="block h-44 w-full border-0 sm:h-56"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
          <dl className="divide-y divide-line">
            {DETAILS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="shrink-0 text-xs font-semibold uppercase tracking-[0.15em] text-body/60">
                  {item.label}
                </dt>
                <dd className="text-right text-base font-semibold text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}