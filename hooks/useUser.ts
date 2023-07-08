import { create } from 'zustand'

interface UserStore {
  email: string
  setEmail: ( _newEmail: string ) => void
  password: string
  setPassword: ( _newPassword: string ) => void
}

const useUser = create<UserStore>( set => ( {
  email: '',
  setEmail: ( newEmail: string ) => set( { email: newEmail } ),
  password: '',
  setPassword: ( newPassword: string ) => set( { password: newPassword } )
} ) )

export default useUser