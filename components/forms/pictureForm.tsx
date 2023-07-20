'use client'

import Image from 'next/image'
import { useState } from 'react'
import Button from '../buttons/button'

const PictureForm = () => {
  const [ selectedImage, setSelectedImage ] = useState<File | undefined>( )

  const handleImageChange = ( _event: React.ChangeEvent<HTMLInputElement> ) => {
    // Logique de gestion de l'image
  }

  const handleSubmit = async ( event: React.FormEvent ) => {
    event.preventDefault()

    if ( selectedImage ) {
      // Envoyer l'image sélectionnée à la base de données
      // Ajoutez votre logique ici
      // eslint-disable-next-line unicorn/no-useless-undefined
      setSelectedImage( undefined )
    }
  }
  return (
    <div className='flex justify-center w-screen h-screen'>
      <form onSubmit={handleSubmit} className='w-80 flex flex-col items-start pt-14 sm:pt-20'>
        <div className='mb-12'>
          <Image src='/images/logoBlueInline.svg' height={48} width={132} alt='logo blue inline' className='mb-2' />
          <p className='text-blue7 h2-barlow-m sm:h1-barlow-m'>ADD</p>
          <p className='text-blue6 h2-barlow-m sm:h1-barlow-m'>A PICTURE</p>
        </div>

        <div className='w-full flex justify-center'>
          <div className='w-44 h-44 rounded-full border-2 border-neutral-100 flex justify-center items-center mb-8'>
            {selectedImage ? (
              <Image src={URL.createObjectURL( selectedImage )} alt='Profile' className='object-cover w-full h-full' />

            ) : (
              <label htmlFor='imageInput' className='cursor-pointer'>
                <span className='text-6xl text-neutral-300'>+</span>
                <input type='file' id='imageInput' accept='image/*' className='hidden' onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>
        <Button className='w-full' type='submit' variant='primary' size='md'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default PictureForm