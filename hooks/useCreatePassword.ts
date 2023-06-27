const useCreatePassword = (length = 8) => {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const specialChars = '!@#$%^&*()-_=+'

  const getRandom = (charset: string) => charset.charAt(Math.floor(Math.random() * charset.length))
  let password = getRandom(lowerCase) + getRandom(upperCase) + getRandom(numbers) + getRandom(specialChars)
  const all = lowerCase + upperCase + numbers + specialChars
  for (let index = 4; index < length; index++) {
    password += getRandom(all)
  }

  return [...password].sort(() => 0.5 - Math.random()).join('')
}

export default useCreatePassword
