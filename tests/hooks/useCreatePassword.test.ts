import { expect, test } from 'vitest'
import useCreatePassword from '../../hooks/useCreatePassword'

test('generates a password of correct length', () => {
  const password = useCreatePassword(12)
  test('should have length of 12', () => {
    expect(password.length).toBe(12)
  })
})

test('generates a password with at least one lowercase, one uppercase, one digit, and one special char', () => {
  const password = useCreatePassword(12)
  test('should have at least one lowercase', () => {
    expect(password).toMatch(/[a-z]/)
  })
  test('should have at least one uppercase', () => {
    expect(password).toMatch(/[A-Z]/)
  })
  test('should have at least one digit', () => {
    expect(password).toMatch(/\d/)
  })
  test('should have at least one special char', () => {
    expect(password).toMatch(/[!#$%&()-_]/)
  })
})
