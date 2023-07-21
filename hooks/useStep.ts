/* eslint-disable no-unused-vars */
import { create } from 'zustand'

export enum STEPS {
  ONE = 0,
  TWO = 1,
  THREE = 2,
  FOUR = 3,
}

interface StepsStore {
  step: STEPS
  setStep: ( _newStep: STEPS ) => void
}

const useStep = create<StepsStore>( ( set ) => ( {
  step: STEPS.ONE,
  setStep: ( newStep: STEPS ) => set( { step: newStep } )
} ) )

export default useStep