'use client'

import Image from 'next/image'
import { useState } from 'react'
import Button from '../buttons/button'

const PictureForm = () => {
  const [ selectedImage, setSelectedImage ] = useState<File | undefined>( undefined )

  const handleImageChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    // Logique de gestion de l'image
  }

  const handleSubmit = async ( event: React.FormEvent ) => {
    event.preventDefault()

    if ( selectedImage ) {
      // Envoyer l'image sélectionnée à la base de données
      // Ajoutez votre logique ici
      setSelectedImage( undefined )
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='w-80 flex flex-col items-start'>
        <div className='mb-12'>
          <Image src='/images/logoBlueInline.svg' height={48} width={132} alt='logo blue inline' className='mb-2' />
          <p className='text-blue7 h2-barlow-m sm:h1-barlow-m'>Add</p>
          <p className='text-blue6 h2-barlow-m sm:h1-barlow-m'>a picture</p>
        </div>

        <div className='w-full flex justify-center'>
          <div className='w-44 h-44 rounded-full border-2 border-neutral-100 flex justify-center items-center mb-8'>
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt='Profile' className='object-cover w-full h-full' />
            ) : (
              <label htmlFor='imageInput' className='cursor-pointer'>
                <span className='text-6xl text-neutral-300'>+</span>
                <input type='file' id='imageInput' accept='image/*' className='hidden' onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <Button className='w-full max-w-2xl bg-blue-600 hover:bg-blue-500 py-3 px-6 rounded' type='submit' variant='primary' size='md'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default PictureForm


// const PictureForm = () => {
//     const [selectedImage, setSelectedImage] = useState<File | null>(null)

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files && event.target.files[0]
//       if (file) {
//         const image = document.createElement('img')
//         image.src = URL.createObjectURL(file)
//         image.onload = () => {
//           const canvas = document.createElement('canvas')
//           const ctx = canvas.getContext('2d')
//           if (ctx && image.width > image.height) {
//             canvas.width = image.height
//             canvas.height = image.height
//             ctx.drawImage(image, (image.width - image.height) / 2, 0, image.height, image.height, 0, 0, image.height, image.height)
//             canvas.toBlob((resizedImage) => {
//               if (resizedImage) {
//                 setSelectedImage(new File([resizedImage], file.name, { type: file.type }))
//               }
//             }, file.type)
//           } else if (ctx && image.height > image.width) {
//             canvas.width = image.width
//             canvas.height = image.width
//             ctx.drawImage(image, 0, (image.height - image.width) / 2, image.width, image.width, 0, 0, image.width, image.width)
//             canvas.toBlob((resizedImage) => {
//               if (resizedImage) {
//                 setSelectedImage(new File([resizedImage], file.name, { type: file.type }))
//               }
//             }, file.type)
//           } else {
//             setSelectedImage(file)
//           }
//         }
//       }
//     }

//     const handleSubmit = async (event: React.FormEvent) => {
//       event.preventDefault();

//       if (selectedImage) {
//         // Send the selected image to the database
//         // Add your logic here
//         setSelectedImage(null);
//       }
//     }

//   return (
//     <div className='w-screen h-screen box-border flex justify-center items-center'>
//       <Container>
//         <form>
//           <div className='h-fit w-full flex flex-col max-w-[350px]'>
//             <Image
//               src={'/images/logoBlueInline.svg'}
//               height={48}
//               width={132}
//               alt='logo blue inline'
//               className='mb-[60px]'
//             />
//             <div className='mb-20'>
//               <p className='text-blue7 h2-barlow-m sm:h1-barlow-m'>Add</p>
//               <p className='text-blue6 h2-barlow-m sm:h1-barlow-m'>Your profile picture</p>
//             </div>

//             <div className='w-44 h-44 rounded-full border-2 border-gray-400 flex justify-center items-center overflow-hidden'>
//                 {selectedImage ? (
//                 <img src={URL.createObjectURL(selectedImage)} alt='Photo de profil' className='object-cover w-full h-full' />
//                 ) : (
//                 <label htmlFor='imageInput' className='cursor-pointer'>
//                     <span className='text-4xl'>+</span>
//                     <input type='file' id='imageInput' accept='image/*' className='hidden' onChange={handleImageChange} />
//                 </label>
//                 )}
//             </div>
//             <Button type='submit' className='w-full max-w-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded'>Submit</Button>
//           </div>
//         </form>
//       </Container>
//     </div>
//   )
// }

// export default PictureForm

