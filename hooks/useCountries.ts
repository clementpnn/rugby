import countries from 'world-countries'
import emojiFlags from 'emoji-flags'

const formattedCountries = countries.map((country) => ({
    value: country.cca3,
    label: country.name.common,
    flag: emojiFlags.countryCode(country.cca2).emoji
}))

const useCountries = () => {
    const getAll = () => formattedCountries

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    return { getAll, getByValue }
}

export default useCountries
