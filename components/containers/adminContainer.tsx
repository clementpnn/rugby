'use client'

import { useEffect } from 'react'
import Sidebar from '../sidebar/sidebar'

interface AdminContainerProperties {
    children: React.ReactNode;
}

const AdminContainer: React.FC<AdminContainerProperties> = ( { children } ) => {
  useEffect( () => {
    // On component mount, disable scroll on the entire body
    document.body.style.overflow = 'hidden'

    // On component unmount, re-enable scroll on the entire body
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [] )
  return (
    <div className="bg-neutral1 w-screen h-screen flex">
      <Sidebar />
      <div className="w-full h-full p-6">
        {children}
      </div>

    </div>
  )
}

export default AdminContainer
