import { expect, test } from 'vitest'
import useUser from '../../hooks/useUser'

test('useUser store', () => {
  expect(useUser.getState().email).toBe('')
  expect(useUser.getState().password).toBe('')

  useUser.getState().setEmail('test@example.com')
  expect(useUser.getState().email).toBe('test@example.com')

  useUser.getState().setPassword('testpassword')
  expect(useUser.getState().password).toBe('testpassword')

  useUser.getState().setEmail('')
  useUser.getState().setPassword('')
  expect(useUser.getState().email).toBe('')
  expect(useUser.getState().password).toBe('')
})
