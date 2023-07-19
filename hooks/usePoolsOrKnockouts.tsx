import { create } from 'zustand'

interface isPoolsStore {
  isPools: boolean
  setIsPools: ( _newIsPools : boolean ) => void
}

const useIsPools = create<isPoolsStore>( set => ( {
  isPools: true,
  setIsPools: ( _newIsPools : boolean ) => set( { isPools : _newIsPools } )
} ) )

export default useIsPools