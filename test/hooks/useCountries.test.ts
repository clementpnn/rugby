import { expect, test, describe } from 'vitest'
import useCountries from '../../hooks/useCountries'

describe('useCountries hook', () => {
  test('should return all countries', () => {
    const { getAll } = useCountries()
    const result = getAll()
    expect(result).toHaveLength(20)
  })

  test('should return correct country by value', () => {
    const { getByValue } = useCountries()
    const result = getByValue('NEW ZEALAND')
    expect(result).toEqual({
      value: 'NEW ZEALAND',
      label: 'NEW',
      flag: '/flags/new.svg'
    })
  })
})
