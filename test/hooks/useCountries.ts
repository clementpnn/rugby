import { expect, test } from 'vitest'
import useCountries from '../../hooks/useCountries'

test('useCountries should return all countries', () => {
  const { getAll } = useCountries()
  const result = getAll()

  expect(result.length).toBe(250) 
})

test('useCountries should return a country by its value', () => {
  const { getByValue } = useCountries()
  const result = getByValue('FRA')

  expect(result).toEqual({
    value: 'FRA',
    label: 'France',
    flag: '🇫🇷',
  })
})

test('useCountries should return undefined if the country value does not exist', () => {
  const { getByValue } = useCountries()
  const result = getByValue('XYZ')

  expect(result).toBeUndefined()
})
