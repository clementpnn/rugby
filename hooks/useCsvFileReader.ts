import { useState } from 'react'

const useCSVFileReader = () => {
  const [ error, setError ] = useState<string | undefined>()

  const readCSVFile = ( file: File ): Promise<string> => {
    return new Promise( ( resolve, reject ) => {
      const fileReader = new FileReader()

      fileReader.addEventListener( 'load', function ( event ) {
        const text = event.target?.result as string
        resolve( text )
      } )

      fileReader.addEventListener( 'error', function ( event ) {
        const errorMessage = event.target ? `Error reading file: ${event.target.error}` : 'Error reading file'
        setError( errorMessage )
        reject( errorMessage )
      } )

      fileReader.readAsText( file )
    } )
  }

  return { readCSVFile, error }
}

export default useCSVFileReader
