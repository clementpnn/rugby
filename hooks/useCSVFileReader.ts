import { useState } from 'react'

const useCSVFileReader = () => {
  const [error, setError] = useState<string | undefined>()

  const readCSVFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.addEventListener('load', function (event) {
        const text = event.target?.result as string
        resolve(text)
      });

      // eslint-disable-next-line unicorn/prefer-add-event-listener
      fileReader.onerror = function (event) {
        const errorMessage = `Error reading file: ${event.target?.error}`
        setError(errorMessage)
        reject(errorMessage)
      };

      // eslint-disable-next-line unicorn/prefer-blob-reading-methods
      fileReader.readAsText(file)
    })
  }

  return { readCSVFile, error }
}

export default useCSVFileReader