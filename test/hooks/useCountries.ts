// import { test } from 'vitest'
// import useCountries from '../../hooks/useCountries'

// test('getAll should return all countries', async ({ is }) => {
//   const { getAll } = useCountries()
//   const result = getAll()
//   is(result.length, 20) // expect 20 countries
// })

// test('getByValue should return the country with the provided value', async ({ is }) => {
//   const { getByValue } = useCountries()
//   const countryName = 'NEW ZEALAND' // you can change this to any country in your list
//   const result = getByValue(countryName)
//   is(result.value, countryName) // expect the country with the provided name to be returned
// })

// test('getByValue should return undefined for non-existent country', async ({ is }) => {
//   const { getByValue } = useCountries()
//   const countryName = 'NON EXISTENT' // this country doesn't exist in your list
//   const result = getByValue(countryName)
//   is(result, undefined) // expect undefined to be returned
// })
// eslint-disable-next-line unicorn/no-empty-file
