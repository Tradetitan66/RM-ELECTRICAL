import { BUSINESS } from '../config/business'

interface WordmarkProps {
  className?: string
  compact?: boolean
}

export default function Wordmark({ className = '', compact = false }: WordmarkProps) {
  return (
    <a
      href="#top"
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label={`${BUSINESS.name} home`}
    >
      <img
        src={BUSINESS.logo}
        alt=""
        className="h-10 w-10 object-contain"
        aria-hidden="true"
      />
      <span className="inline-flex flex-col leading-none">
        <span className="font-heading text-xl font-extrabold tracking-wide text-white">
          {BUSINESS.wordmarkA}
        </span>
        {!compact && (
          <span className="text-[10px] font-semibold tracking-[0.35em] text-white/70">
            {BUSINESS.wordmarkB}
          </span>
        )}
      </span>
    </a>
  )
}