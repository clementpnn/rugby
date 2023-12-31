'use client'

interface InformationDescriptionProperties {
  data: {
    shortcut: string
    title: string
    description: string
  }
}

const InformationDescription: React.FC<InformationDescriptionProperties> = ( { data } ) => {
  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex flex-row justify-between items-end'>
        <p className='text-blue6 h4-barlow-m'>{data.shortcut}</p>
        <p className='text-blue4 h6-inter-d'>{data.title}</p>
      </div>
      <p className='text-blue9 base-md'>{data.description}</p>
    </div>
  )
}

export default InformationDescription
