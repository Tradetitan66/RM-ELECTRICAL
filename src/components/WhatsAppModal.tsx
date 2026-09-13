import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { AlertCircle, Phone, X } from 'lucide-react'
import { BUSINESS, SERVICES, serviceLabel, type ServiceKey } from '../config/business'
import { useWhatsAppModal } from './WhatsAppModalContext'
import WhatsAppGlyph from './WhatsAppGlyph'

interface FormValues {
  name: string
  service: string
  location: string
  details: string
}

type Errors = Partial<Record<keyof FormValues, string>>

const EMPTY_FORM: FormValues = {
  name: '',
  service: '',
  location: '',
  details: '',
}

const buildMessage = (values: FormValues): string => {
  const name = values.name.trim()
  const service = values.service.trim()
  const location = values.location.trim()
  const details = values.details.trim()

  return [
    'I have seen website demo and would like to build one like for me.',
    '',
    `Name: ${name}`,
    `Service: ${service}`,
    `Location: ${location}`,
    `Project details: ${details}`,
    '',
    'Could you let me know your availability and the next steps?',
  ].join('\n')
}

const validate = (values: FormValues): Errors => {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.service) errors.service = 'Please choose an option.'
  if (!values.location.trim()) errors.location = 'Please enter a town or postcode.'
  if (!values.details.trim()) errors.details = 'Please add a few details about the job.'
  return errors
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function WhatsAppModal() {
  const { isOpen, preselectedService, closeModal } = useWhatsAppModal()
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const triggerRef = useRef<Element | null>(null)
  const nameInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isOpen || !preselectedService) return
    setValues((current) => ({
      ...current,
      service: serviceLabel(preselectedService as ServiceKey),
    }))
  }, [isOpen, preselectedService])

  useEffect(() => {
    if (!isOpen) return

    triggerRef.current = document.activeElement
    setSubmitted(false)
    setErrors({})

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus()
      } else if (closeButtonRef.current) {
        closeButtonRef.current.focus()
      }
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent) => {
      if (!isOpen) return

      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const dialog = dialogRef.current
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement)

      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [isOpen, closeModal]
  )

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    if (submitted) {
      setErrors(validate(nextValues))
    }
  }

  const handleContinue = (event: FormEvent<HTMLAnchorElement>) => {
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitted(true)

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault()
      const order: (keyof FormValues)[] = ['name', 'service', 'location', 'details']
      const firstInvalidKey = order.find((key) => nextErrors[key])
      if (firstInvalidKey) {
        dialogRef.current
          ?.querySelector<HTMLElement>(`#contact-${firstInvalidKey === 'name' ? 'name' : firstInvalidKey}`)
          ?.focus()
      }
      return
    }

    const url = `${BUSINESS.whatsappHref}${encodeURIComponent(buildMessage(values))}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const messageUrl = `${BUSINESS.whatsappHref}${encodeURIComponent(buildMessage(values))}`

  return (
    <div
      data-testid="whatsapp-modal"
      className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="whatsapp-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div
        className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeModal}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative z-10 flex modal-sheet w-full flex-col overflow-hidden border-t border-white/20 bg-white shadow-2xl transition-[transform,opacity] duration-300 motion-reduce:transition-none sm:max-w-lg sm:border sm:border-line ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-full opacity-0 sm:translate-y-8 sm:scale-95'
        }`}
      >
        <header className="flex items-center justify-between gap-4 border-b border-line bg-warm px-4 py-3.5 sm:px-6 sm:py-4">
          <div>
            <h2 id="whatsapp-modal-title" className="text-xl font-bold text-ink sm:text-2xl">
              Tell us about your project
            </h2>
            <p className="mt-0.5 text-xs text-body sm:text-sm">
              Add a few details, then continue to WhatsApp to send your enquiry.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeModal}
            aria-label="Close enquiry form"
            className="inline-flex shrink-0 items-center justify-center rounded border border-line p-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <form
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-semibold text-ink"
              >
                Your name <span className="text-orange" aria-hidden="true">*</span>
              </label>
              <input
                ref={nameInputRef}
                type="text"
                id="contact-name"
                name="name"
                value={values.name}
                onChange={handleChange}
                autoComplete="name"
                placeholder="e.g. Jamie"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={`w-full rounded-none border bg-white px-4 py-2.5 text-body outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/30 sm:py-3 ${
                  errors.name ? 'border-red-500' : 'border-line'
                }`}
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-service"
                className="mb-1.5 block text-sm font-semibold text-ink"
              >
                What do you need? <span className="text-orange" aria-hidden="true">*</span>
              </label>
              <select
                id="contact-service"
                name="service"
                value={values.service}
                onChange={handleChange}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? 'contact-service-error' : undefined}
                className={`w-full rounded-none border bg-white px-4 py-2.5 text-body outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/30 sm:py-3 ${
                  errors.service ? 'border-red-500' : 'border-line'
                }`}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {SERVICES.map((service) => (
                  <option key={service.key} value={service.formLabel}>
                    {service.label}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p id="contact-service-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {errors.service}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-location"
                className="mb-1.5 block text-sm font-semibold text-ink"
              >
                Your location <span className="text-orange" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="contact-location"
                name="location"
                value={values.location}
                onChange={handleChange}
                autoComplete="postal-code"
                placeholder="e.g. Edinburgh, EH1"
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? 'contact-location-error' : undefined}
                className={`w-full rounded-none border bg-white px-4 py-2.5 text-body outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/30 sm:py-3 ${
                  errors.location ? 'border-red-500' : 'border-line'
                }`}
              />
              {errors.location && (
                <p id="contact-location-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {errors.location}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-details"
                className="mb-1.5 block text-sm font-semibold text-ink"
              >
                More about your website <span className="text-orange" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-details"
                name="details"
                value={values.details}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. I run a plumbing business in Edinburgh and want a similar site with services, FAQs and WhatsApp enquiries."
                aria-invalid={Boolean(errors.details)}
                aria-describedby={errors.details ? 'contact-details-error' : undefined}
                className={`w-full resize-y rounded-none border bg-white px-4 py-2.5 text-body outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/30 sm:py-3 ${
                  errors.details ? 'border-red-500' : 'border-line'
                }`}
              />
              {errors.details && (
                <p id="contact-details-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {errors.details}
                </p>
              )}
            </div>
          </div>
        </form>

        <footer className="border-t border-line bg-warm px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-3">
            <a
              href={messageUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleContinue}
              className="btn btn-primary w-full px-5 py-3.5 text-base sm:py-4"
            >
              <WhatsAppGlyph className="h-5 w-5" />
              Continue to WhatsApp
            </a>

            <p className="border-t border-line pt-3 text-sm">
              Prefer to call?{' '}
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-1 font-semibold text-ink underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-orange"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}