'use client'

import { ChangeEvent, useState } from 'react'

import useCSVToArray, { FileRow } from '@/hooks/useCsvToArray'
import useCreatePassword from '@/hooks/useCreatePassword'
import useCSVFileReader from '@/hooks/useCsvFileReader'
import toast from 'react-hot-toast'
import { UserSchema } from '@/types/forms'

const CSVForm = () => {
  const [ file, setFile ] = useState<File | undefined>()
  const [ isLoading, setIsloading ] = useState( false )
  const { error: fileReaderError, readCSVFile } = useCSVFileReader()
  const { csvFileToArray } = useCSVToArray()

  const sendDataToBackend = async ( data: FileRow[] ) => {
    setIsloading( true )
    for ( let items of data ) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const password = useCreatePassword()
      fetch( '/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { ...items, password } )
      } )
        .then( ( callback ) => {
          if ( callback.status === 200 ) { toast.success( `${callback.statusText}` ) }
          if ( callback.status !== 200 ) { toast.error( `${callback.statusText}` ) }
        } )
    }
    setIsloading( false )
  }

  const handleOnFileSubmit = async ( file: File ) => {
    try {
      const text = await readCSVFile( file )
      if ( fileReaderError ) {
        toast.error( `Error reading file: ${fileReaderError}` )
        return
      }
      const array = csvFileToArray( text )
      let validatedRows = []
      for ( let row of await array ) {
        try {
          const validatedRow = UserSchema.parse( row )
          validatedRows.push( validatedRow )
        } catch ( error: any ) {
          toast.error( `Validation error: ${error.message}` )
          return
        }
      }
      await sendDataToBackend( validatedRows )
    } catch ( error ) {
      toast.error( `${error}` )
    }
  }

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const files = event.target.files
    if ( files ) {
      setFile( files[0] )
    }
  }

  return (
    <form>
      <input onChange={handleFileChange} disabled={isLoading} id={'csvFileInput'} accept={'.csv'} type={'file'} />
      <button onClick={( event ) => {
        event.preventDefault()
        if ( file ) {
          handleOnFileSubmit( file )
        }
      }}>
          IMPORT CSV
      </button>
    </form>
  )
}

export default CSVForm
