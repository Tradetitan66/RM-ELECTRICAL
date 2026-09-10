export const BUSINESS = {
  name: 'RM Electrical',
  wordmarkA: 'RM',
  wordmarkB: 'ELECTRICAL',
  contactName: 'Ryan',
  phoneDisplay: '07972 915912',
  phoneHref: 'tel:+447972915912',
  whatsappHref: 'https://wa.me/447972915912?text=',
  whatsappNumber: '447972915912',
  area: 'Alexandria, Scotland',
  coverage: 'Alexandria, Balloch and surrounding areas',
  logo: '/logo-placeholder.svg',
} as const

export type ServiceKey =
  | 'lighting'
  | 'sockets'
  | 'fuseBoard'
  | 'testing'
  | 'external'
  | 'other'

export interface ServiceOption {
  key: ServiceKey
  label: string
  formLabel: string
}

export const SERVICES: ServiceOption[] = [
  { key: 'lighting', label: 'Lighting installation', formLabel: 'Lighting installation' },
  { key: 'sockets', label: 'Sockets & fittings', formLabel: 'Sockets & fittings' },
  { key: 'fuseBoard', label: 'Fuse board replacement', formLabel: 'Fuse board replacement' },
  { key: 'testing', label: 'Testing & inspection', formLabel: 'Testing & inspection' },
  { key: 'external', label: 'External power', formLabel: 'External power' },
  { key: 'other', label: 'Other electrical enquiry', formLabel: 'Other electrical enquiry' },
]

export const serviceLabel = (key: ServiceKey): string =>
  SERVICES.find((s) => s.key === key)?.label ?? 'Other electrical enquiry'