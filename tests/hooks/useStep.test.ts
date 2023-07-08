import { expect, test } from 'vitest'
import useStep, { STEPS } from '../../hooks/useStep'

test( 'useStep store', () => {
  expect( useStep.getState().step ).toBe( STEPS.SIGNIN )

  useStep.getState().setStep( STEPS.VERIFICATION )
  expect( useStep.getState().step ).toBe( STEPS.VERIFICATION )

  useStep.getState().setStep( STEPS.SIGNIN )
  expect( useStep.getState().step ).toBe( STEPS.SIGNIN )
} )