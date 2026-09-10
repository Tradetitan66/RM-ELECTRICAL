import { BUSINESS } from '../config/business'
import { CallButton, WhatsAppButton } from './CTAButtons'

export default function About() {
  return (
    <section id="about" className="scroll-margin-offset bg-white py-20 sm:py-28" aria-labelledby="about-heading">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <img
            src="/img/about-rm.webp"
            alt="Electrical work completed by RM Electrical"
            className="h-auto w-full rounded-2xl"
            width={1200}
            height={900}
            loading="lazy"
          />
          <div className="absolute -bottom-6 -right-6 hidden border border-line bg-warm px-6 py-5 sm:block rounded-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-body/70">BASED IN</p>
            <p className="mt-1 text-lg font-bold text-ink">Alexandria, Scotland</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold tracking-[0.25em] text-orange">
            ABOUT RM ELECTRICAL
          </p>
          <h2
            id="about-heading"
            className="mt-4 text-4xl font-extrabold sm:text-5xl"
          >
            Your local contact
            <br />
            for <span className="text-orange">electrical work.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            {BUSINESS.name} serves Alexandria, Balloch and surrounding areas. Contact
            Ryan directly to discuss lighting, sockets, fuse board replacement,
            testing and external power.
          </p>
          <p className="mt-4 leading-relaxed">
            Whether you are updating your kitchen lighting or planning another
            electrical job, start with a conversation about what you need.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton href={BUSINESS.phoneHref} variant="dark" />
            <WhatsAppButton variant="outline-orange" size="md">
              Discuss Your Project
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  )
}