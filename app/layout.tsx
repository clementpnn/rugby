import AuthProvider from '@/providers/authProvider'
import ToasterProvider from '@/providers/toasterProvider'
import './globals.css'
import { hotjar } from 'react-hotjar'

import { Inter, Barlow_Condensed } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter( {
  subsets: [ 'latin' ],
  variable: '--font-inter',
  weight: [ '300', '400', '700' ]
} )

const barlow = Barlow_Condensed( {
  subsets: [ 'latin' ],
  variable: '--font-barlow-condensed',
  weight: '700'
} )

export const metadata = {
  title: 'Rugby',
  description: 'End of school year project'
}

export default function RootLayout( {
  children
}: {
  children: React.ReactNode
} ) {

  useEffect( () => {
    // eslint-disable-next-line unicorn/numeric-separators-style
    hotjar.initialize( 3585976, 6 )
  }, [] )

  return (
    <html lang="fr">
      <body className={`${inter.variable} ${barlow.variable}`}>
        <ToasterProvider />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
