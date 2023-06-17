import { useState } from 'react'

const useCSVFileReader = () => {
  const [error, setError] = useState<string | null>(null)

  const readCSVFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = function (event) {
        const text = event.target?.result as string
        resolve(text)
      };

      fileReader.onerror = function (event) {
        const errorMsg = `Error reading file: ${event.target?.error}`
        setError(errorMsg)
        reject(errorMsg)
      };

      fileReader.readAsText(file)
    })
  }

  return { readCSVFile, error }
}

export default useCSVFileReader