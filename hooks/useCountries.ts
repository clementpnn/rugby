const countries = [
  'NEW_ZEALAND',
  'FRANCE',
  'ITALY',
  'URUGUAY',
  'NAMIBIA',
  'SOUTH_AFRICA',
  'IRELAND',
  'SCOTLAND',
  'TONGA',
  'ROMANIA',
  'WALES',
  'AUSTRALIA',
  'FIJI',
  'GEORGIA',
  'PORTUGAL',
  'ENGLAND',
  'JAPAN',
  'ARGENTINA',
  'SAMOA',
  'CHILI'
]

const formattedCountries = countries.map((country) => ({
    value: country.replaceAll('_', ' '),
    label: country.slice(0, 3),
    flag: `/flags/${country.slice(0, 3).toLowerCase()}.svg`
}))

const useCountries = () => {
    const getAll = () => formattedCountries

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    return { getAll, getByValue }
}

export default useCountries