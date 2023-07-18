'use client'

import Image from 'next/image'

const Empty = () => {
  return(
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-12">
      <p className="text-neutral4 label-lg">Select a filter to continue !</p>
      <Image
        src={'/images/France.svg'}
        height={480}
        width={480}
        alt='France svg'
      />
    </div>
  )
}

export default Empty