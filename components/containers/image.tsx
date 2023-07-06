'use client'

import Image from 'next/image'

import useImage from '@/hooks/useImage'

const ImageContainer = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { image } = useImage()
    return (
        <div className='w-64 h-64 relative'>
            <Image alt='stadium' fill style={{ objectFit: 'cover' }} src={image === '' ? '/placeholder-image.png' : image}  />
        </div>
    )
}

export default ImageContainer