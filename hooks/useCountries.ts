import countries from 'world-countries'

function getFlagEmoji(countryCode: string) {
    const codePoints = [...countryCode.toUpperCase()].map(char => {
      const code = char.codePointAt(0)
      if (code === undefined) {
        throw new Error('Invalid country code')
      }
      return 127_397 + code
    })
    return String.fromCodePoint(...codePoints)
}

const formattedCountries = countries.map((country) => ({
    value: country.cca3,
    label: country.name.common,
    flag: getFlagEmoji(country.cca2),
    region: country.region
}))

const useCountries = () => {
    const getAll = () => formattedCountries

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    return { getAll, getByValue }
}

export default useCountries
