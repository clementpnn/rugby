'use client'

import { useEffect } from 'react'
import Sidebar from '../sidebar/sidebar'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface AdminContainerProperties {
    children: React.ReactNode;
}

const AdminContainer: React.FC<AdminContainerProperties> = ( { children } ) => {
  const [ parent ] = useAutoAnimate()
  useEffect( () => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [] )
  return (
    <div className="bg-neutral1 w-screen h-screen flex">
      <Sidebar />
      <div ref={parent} className="w-full h-full p-6" >
        {children}
      </div>

    </div>
  )
}

export default AdminContainer
