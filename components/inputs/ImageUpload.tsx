'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'

declare global {
    // eslint-disable-next-line no-var
    var cloudinary: any
}

interface ImageUploadProperties {
    onChange: (value: string) => void
    value: string
}

const ImageUpload: React.FC<ImageUploadProperties> = ({ onChange, value }) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url)
  }, [onChange])

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='wf5a0ljd'
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()} className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'>
            <div className='font-semibold text-lg'>
                            Click to upload
            </div>
            {value && (
              <div className='absolute inset-0 w-full h-full'>
                <Image alt='Upload' fill style={{ objectFit: 'cover' }} src={value}  />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload