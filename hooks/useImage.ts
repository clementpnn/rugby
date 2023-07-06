import { create } from 'zustand'

interface ImageStore {
  image: string
  setImage: (_newImage: string) => void
}

const useImage = create<ImageStore>(set => ({
  image: '',
  setImage: (newImage: string) => set({ image: newImage })
}))

export default useImage