'use client'

import React, { useState } from 'react'
import axios from 'axios'

import useCSVFileReader from '@/hooks/useCSVFileReader'
import useCSVToArray, { FileRow } from '@/hooks/useCSVToArray'
import useCreatePassword from '@/hooks/useCreatePassword'

const Upload = () => {

  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsloading] = useState(false)
  const { readCSVFile, error: fileReaderError } = useCSVFileReader()
  const { csvFileToArray } = useCSVToArray()

  const sendDataToBackend = async (data: FileRow[]) => {
    for (let items of data) {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const password = useCreatePassword()
            console.log({...items, password});
            await axios.post('/api/accredited', {...items, password})
            .then((callback) => console.log(callback))
            .catch((callback) => console.log(callback))
            .finally(() => setIsloading(false))
        } catch (error) {
          console.error('Error:', error)
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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFile(files[0])
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={'file'}
          id={'csvFileInput'}
          accept={'.csv'}
          disabled={isLoading}
          onChange={handleFileChange}
        />

        <button
          onClick={(e) => {
            e.preventDefault()
            if (file) {
              handleOnFileSubmit(file)
            }
          }}
        >
          IMPORT CSV
        </button>
      </form>

      {/* Display FileReader error */}
      {fileReaderError && <p>Error reading file: {fileReaderError}</p>}
    </div>
  );
}

export default Upload;
