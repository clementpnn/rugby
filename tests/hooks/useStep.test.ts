import { expect, test } from 'vitest'
import useStep, { STEPS } from '../../hooks/useStep'

test( 'useStep store', () => {
  expect( useStep.getState().step ).toBe( STEPS.ONE )

  useStep.getState().setStep( STEPS.TWO )
  expect( useStep.getState().step ).toBe( STEPS.TWO )

  useStep.getState().setStep( STEPS.THREE )
  expect( useStep.getState().step ).toBe( STEPS.THREE )
} )