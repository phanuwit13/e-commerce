import { create } from 'zustand'

export type useModalCheckoutStoreType = {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

const initialState = {
  open: false,
}

export const useModalCheckoutStore = create<useModalCheckoutStoreType>(
  (set) => ({
    ...initialState,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false }),
  })
)

export default useModalCheckoutStore
