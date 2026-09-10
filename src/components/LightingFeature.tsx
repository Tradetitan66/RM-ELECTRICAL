import { useWhatsAppModal } from './WhatsAppModalContext'
import WhatsAppGlyph from './WhatsAppGlyph'
import { ArrowRight } from 'lucide-react'

export default function LightingFeature() {
  const { openModal } = useWhatsAppModal()

  return (
    <section className="bg-ink py-20 text-white sm:py-28" aria-labelledby="lighting-heading">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-orange">
            LIGHTING PROJECTS
          </p>
          <h2
            id="lighting-heading"
            className="mt-4 text-4xl font-extrabold sm:text-5xl"
          >
            Small changes.
            <br />
            A <span className="text-orange">brighter</span> space.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-white/80">
            Planning wall lights, kitchen downlights or under-cabinet lighting?
            Tell Ryan about your room and the result you have in mind.
          </p>
          <button
            type="button"
            onClick={() => openModal('lighting')}
            className="btn btn-primary mt-8 px-6 py-3.5 text-sm"
          >
            <WhatsAppGlyph className="h-4 w-4" />
            Enquire About Lighting
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <figure>
          <img
            src="/img/lighting-feature.webp"
            alt="Illustrative photograph of a bright living room interior with warm recessed lighting"
            className="aspect-[4/3] w-full object-cover"
            width={1100}
            height={825}
            loading="lazy"
          />
          <figcaption className="mt-3 text-xs text-white/50">
            Illustrative lighting photograph, not RM Electrical&rsquo;s work.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}