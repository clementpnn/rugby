import { create } from 'zustand'

interface UserStore {
  email: string
  setEmail: (_newEmail: string) => void
  password: string
  setPassword: (_newPassword: string) => void
}

const useUser = create<UserStore>(set => ({
  email: '',
  setEmail: (_newEmail: string) => set({ email: _newEmail }),
  password: '',
  setPassword: (_newPassword: string) => set({ password: _newPassword })
}))

export default useUser