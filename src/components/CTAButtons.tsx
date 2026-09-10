import { Phone } from 'lucide-react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import WhatsAppGlyph from './WhatsAppGlyph'
import { useWhatsAppModal } from './WhatsAppModalContext'
import type { ServiceKey } from '../config/business'

const SIZES = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
} as const

type ButtonVariant =
  | 'primary'
  | 'dark'
  | 'outline-dark'
  | 'outline-light'
  | 'outline-orange'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  dark: 'btn-dark',
  'outline-dark': 'btn-outline-dark',
  'outline-light': 'btn-outline-light',
  'outline-orange': 'btn-outline-orange',
}

interface CallButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: keyof typeof SIZES
  variant?: ButtonVariant
  children?: ReactNode
  href: string
}

export function CallButton({
  size = 'md',
  variant = 'primary',
  className = '',
  children = 'Call Now',
  ...rest
}: CallButtonProps) {
  return (
    <a
      className={`btn ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </a>
  )
}

interface WhatsAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES
  variant?: ButtonVariant
  service?: ServiceKey
  children?: ReactNode
}

export function WhatsAppButton({
  size = 'md',
  variant = 'primary',
  service,
  className = '',
  children = 'Get a Quote on WhatsApp',
  ...rest
}: WhatsAppButtonProps) {
  const { openModal } = useWhatsAppModal()

  return (
    <button
      type="button"
      onClick={() => openModal(service)}
      className={`btn ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      <WhatsAppGlyph className="h-4 w-4 shrink-0" />
      {children}
    </button>
  )
}