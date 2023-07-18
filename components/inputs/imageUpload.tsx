'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useCallback } from 'react'

declare global {
    // eslint-disable-next-line no-var, no-unused-vars
    var cloudinary: any
}

interface ImageUploadProperties {
  onChange: ( _value: string ) => void
  children: React.ReactNode
}

const ImageUpload: React.FC<ImageUploadProperties> = ( { onChange, children } ) => {
  const handleUpload = useCallback( ( result: any ) => {
    onChange( result.info.secure_url )
  }, [ onChange ] )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='wf5a0ljd'
      options={{
        maxFiles: 1
      }}
    >
      {( { open } ) => {
        return (
          <div onClick={() => open?.()} className='bg-neutral0 rounded-md h-32 cursor-pointer transition border-[1px] border-neutral3 border-dashed flex flex-col justify-center items-center gap-4 text-blue6 hover:bg-neutral1 hover:scale-105 '>
            <div className='label-md text-lg flex flex-col items-center gap-y-2'>
              {children}
            </div>
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
