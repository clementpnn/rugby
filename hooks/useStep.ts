/* eslint-disable no-unused-vars */
import { create } from 'zustand'

export enum STEPS {
  SIGNIN = 0,
  VERIFICATION = 1
}

interface StepsStore {
  step: STEPS
  setStep: (_newStep: STEPS) => void
}

const useStep = create<StepsStore>((set) => ({
  step: STEPS.SIGNIN,
  setStep: (newStep: STEPS) => set({ step: newStep })
}))

export default useStep