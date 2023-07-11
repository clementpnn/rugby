import Image from 'next/image'

interface ImageContainerProperties {
    image: string
    onClick?: ( _event: React.MouseEvent<HTMLDivElement> ) => void
    tribunes?: {name: string, type: 'JOURNALIST'|'PHOTOGRAPHER', places: number, image: string, x: number, y: number}[]
}

const ImageContainer: React.FC<ImageContainerProperties> = ( { image, onClick, tribunes } ) => {
  return (
    <div onClick={onClick} className='w-96 h-96 relative'>
      <Image alt='stadium' fill style={{ objectFit: 'cover' }} src={image === '' ? '/placeholder-image.png' : image} />
      {tribunes && tribunes.map( ( tribune, index ) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `calc(${tribune.y}px - 15px)`,
            left: `calc(${tribune.x}px - 15px)`,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {index + 1}
        </div>
      ) )}
    </div>
  )
}

export default ImageContainer