'use client'

import React, { useState } from 'react'
import axios from 'axios'

import useCSVToArray, { FileRow } from '@/hooks/useCSVToArray'
import useCreatePassword from '@/hooks/useCreatePassword'
import useCSVFileReader from '@/hooks/useCSVFileReader'

const Upload = () => {

  const [file, setFile] = useState<File | undefined>()
  const [isLoading, setIsloading] = useState(false)
  const { error: fileReaderError, readCSVFile } = useCSVFileReader()
  const { csvFileToArray } = useCSVToArray()

  const sendDataToBackend = async (data: FileRow[]) => {
    for (let items of data) {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const password = useCreatePassword()
            console.log({...items, password});
            await axios.post('/api/accredited', {...items, password})
            .then((callback) => console.log(callback))
            .catch((error) => console.log(error))
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


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setFile(files[0])
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          onChange={handleFileChange}
          disabled={isLoading}
          id={'csvFileInput'}
          accept={'.csv'}
          type={'file'}
        />

        <button
          onClick={(event) => {
            event.preventDefault()
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
