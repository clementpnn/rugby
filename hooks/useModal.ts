import { create } from 'zustand'

interface ModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useModal = create<ModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

g

export default useModal