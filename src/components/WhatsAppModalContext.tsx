import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ServiceKey } from '../config/business'

interface ModalState {
  isOpen: boolean
  preselectedService?: ServiceKey
}

interface WhatsAppModalContextValue {
  isOpen: boolean
  preselectedService?: ServiceKey
  openModal: (service?: ServiceKey) => void
  closeModal: () => void
}

const WhatsAppModalContext = createContext<WhatsAppModalContextValue | null>(null)

export function WhatsAppModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({ isOpen: false })

  const openModal = useCallback((service?: ServiceKey) => {
    setState({ isOpen: true, preselectedService: service })
  }, [])

  const closeModal = useCallback(() => {
    setState({ isOpen: false })
  }, [])

  const value = useMemo(
    () => ({
      isOpen: state.isOpen,
      preselectedService: state.preselectedService,
      openModal,
      closeModal,
    }),
    [state, openModal, closeModal]
  )

  return (
    <WhatsAppModalContext.Provider value={value}>
      {children}
    </WhatsAppModalContext.Provider>
  )
}

export function useWhatsAppModal(): WhatsAppModalContextValue {
  const ctx = useContext(WhatsAppModalContext)
  if (!ctx) {
    throw new Error('useWhatsAppModal must be used within WhatsAppModalProvider')
  }
  return ctx
}