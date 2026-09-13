export const BUSINESS = {
  name: 'Local Electrical',
  wordmarkA: 'LOCAL',
  wordmarkB: 'ELECTRICAL',
  contactName: 'our team',
  phoneDisplay: '07345 384868',
  phoneHref: 'tel:+447345384868',
  whatsappHref: 'https://wa.me/447345384868?text=',
  whatsappNumber: '447345384868',
  area: 'Edinburgh, United Kingdom',
  coverage: 'Edinburgh and surrounding areas',
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
  { key: 'lighting', label: 'A website like this demo', formLabel: 'A website like this demo' },
  { key: 'sockets', label: 'A new website for my business', formLabel: 'A new website for my business' },
  { key: 'fuseBoard', label: 'Redesign an existing website', formLabel: 'Redesign an existing website' },
  { key: 'testing', label: 'Extra pages & features', formLabel: 'Extra pages & features' },
  { key: 'external', label: 'A website for a different trade', formLabel: 'A website for a different trade' },
  { key: 'other', label: 'Other website enquiry', formLabel: 'Other website enquiry' },
]

export const serviceLabel = (key: ServiceKey): string =>
  SERVICES.find((s) => s.key === key)?.label ?? 'Other electrical enquiry'