import Image from 'next/image'

interface ImageContainerProperties {
    image: string
    onClick?: ( _event: React.MouseEvent<HTMLDivElement> ) => void
    points?: {x: Number, y: Number}[]
}

const ImageContainer: React.FC<ImageContainerProperties> = ( { image, onClick, points } ) => {
  return (
    <div onClick={onClick} className='w-96 h-96 relative'>
      <Image alt='stadium' fill style={{ objectFit: 'cover' }} src={image === '' ? '/placeholder-image.png' : image} />
      {points && points.map( ( point, index ) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `calc(${point.y}px - 5px)`, // adjust position to center the point
            left: `calc(${point.x}px - 5px)`, // adjust position to center the point
            width: '20px',
            height: '20px',
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
          {index + 1} {/* +1 pour démarrer à partir de 1 au lieu de 0 */}
        </div>
      ) )}
    </div>
  )
}

export default ImageContainer
