import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Faq {
  question: string
  answer: string
}

const FAQS: Faq[] = [
  {
    question: 'What electrical services do you offer?',
    answer:
      'RM Electrical advertises lighting, sockets, fuse board replacement, testing and inspection, and external power. Contact Ryan to discuss your specific job.',
  },
  {
    question: 'Can you help with kitchen lighting?',
    answer:
      'Yes. Get in touch about under-cabinet lighting and kitchen downlights.',
  },
  {
    question: 'Which areas do you cover?',
    answer:
      'Alexandria, Balloch and surrounding areas. Contact Ryan to confirm availability at your address.',
  },
  {
    question: 'How do I request a quote?',
    answer:
      "Call 07972 915912 or choose 'Get a Quote on WhatsApp'. Complete the short form, then send the prepared message in WhatsApp.",
  },
  {
    question: 'Does the popup send my enquiry automatically?',
    answer:
      'No. It prepares your message. You must tap Send in WhatsApp to start the conversation.',
  },
]

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section
      id="faqs"
      className="scroll-margin-offset bg-warm py-20 sm:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="container-site max-w-3xl">
        <p className="text-center text-xs font-semibold tracking-[0.25em] text-orange">
          FREQUENTLY ASKED QUESTIONS
        </p>
        <h2
          id="faq-heading"
          className="mt-4 text-center text-4xl font-extrabold sm:text-5xl"
        >
          Questions, answered.
        </h2>

        <div className="mt-12 border-t border-line">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div key={faq.question} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-orange"
                  >
                    <span className="text-lg font-bold">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-orange' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}