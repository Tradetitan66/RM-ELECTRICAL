import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useWhatsAppModal } from './WhatsAppModalContext'
import WhatsAppGlyph from './WhatsAppGlyph'

const SLIDES = [
  {
    src: '/img/lighting-project.webp',
    alt: 'Lighting work completed by RM Electrical',
    width: 1200,
    height: 1037,
  },
  {
    src: '/img/lighting-project-2.webp',
    alt: 'Kitchen lighting installed by RM Electrical',
    width: 1200,
    height: 900,
  },
  {
    src: '/img/lighting-project-1.webp',
    alt: 'Lighting work completed by RM Electrical',
    width: 1200,
    height: 895,
  },
]

function ProjectCarousel() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const count = SLIDES.length
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    timer.current = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      3000
    )

    return () => {
      if (timer.current !== null) window.clearInterval(timer.current)
    }
  }, [playing, count])

  const go = (next: number) => setIndex(((next % count) + count) % count)

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10"
      role="region"
      aria-roledescription="carousel"
      aria-label="Lighting projects"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onFocus={() => setPlaying(false)}
      onBlur={() => setPlaying(true)}
    >
      <div
        className="flex transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {SLIDES.map((slide) => (
          <div key={slide.src} className="min-w-full">
            <img
              src={slide.src}
              alt={slide.alt}
              className="aspect-[4/3] w-full object-cover"
              width={slide.width}
              height={slide.height}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous project"
        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-white transition-colors hover:bg-orange hover:text-ink"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next project"
        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-white transition-colors hover:bg-orange hover:text-ink"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="absolute bottom-3 right-4 flex gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to project ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? 'bg-orange' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

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
        <ProjectCarousel />
      </div>
    </section>
  )
}