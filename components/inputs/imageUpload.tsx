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
          <div onClick={() => open?.()} className='cursor-pointer hover:opacity-70 transition border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'>
            <div className='font-semibold text-lg'>
              {children}
            </div>
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
