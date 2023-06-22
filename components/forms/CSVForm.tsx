'use client'

import { ChangeEvent, useState } from 'react'

import useCSVToArray, { FileRow } from '@/hooks/useCSVToArray'
import useCreatePassword from '@/hooks/useCreatePassword'
import useCSVFileReader from '@/hooks/useCSVFileReader'
import toast from 'react-hot-toast'

const CSVForm = () => {

  const [file, setFile] = useState<File | undefined>()
  const [isLoading, setIsloading] = useState(false)
  const { error: fileReaderError, readCSVFile } = useCSVFileReader()
  const { csvFileToArray } = useCSVToArray()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const sendDataToBackend = async (data: FileRow[]) => {
    for (let items of data) {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const password = useCreatePassword()
            console.log({...items, password})
            fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...items, password})
              })
              .then(() => {
                toast.success('Sign in')
              })
              .catch(error => toast.error(`${error}`))
              .finally(() => setIsloading(false))
        } catch (error) {
          toast.error(`${error}`)
        }
    }
  }

  const handleOnFileSubmit = async (file: File) => {
    try {
      const text = await readCSVFile(file)
      const array = csvFileToArray(text)
      await sendDataToBackend(await array)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setFile(files[0])
    }
  }

  return (
      <form>
        <input onChange={handleFileChange} disabled={isLoading} id={'csvFileInput'} accept={'.csv'} type={'file'} />
        <button onClick={(event) => {
            event.preventDefault()
            if (file) {
              handleOnFileSubmit(file)
            }
        }}>
          IMPORT CSV
        </button>
      </form>
  )
}

export default CSVForm
