'use client'

import { useEffect } from 'react'
import CSVForm from '../forms/csvForm'

const Import = () => {
  useEffect( () => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [] )
  return (
    <CSVForm />
  )
}

export default Import
