import AuthProvider from '@/providers/authProvider'
import ToasterProvider from '@/providers/toasterProvider'
import './globals.css'

// import { Inter, Barlow_Condensed } from 'next/font/google'

// import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
// const barlowFont = localFont({
//   src: [
//     {
//       path: '/fonts/Barlow-Bold.ttf',
//       weight: 'bold',
//       style: 'normal',
//       variable: '--font-barlow'
//     }
//   ]
// })

// const inter = Inter({ subsets: ['latin'] })

import { Poppins, Barlow_Condensed } from 'next/font/google'

const poppins = Poppins( {
  subsets: [ 'latin' ],
  variable: '--font-poppins',
  weight: [ '300', '400', '700' ]
} )

// const barlow = localFont({
//   src: "/fonts/Barlow/BarlowCondensed-Bold.woff2",
//   variable: "--font-barlow-condensed",
// })

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
  return (
    <html lang="fr">
      {/* <body className={inter.className}> */}
      <body className={`${poppins.variable} ${barlow.variable}`}>
        <ToasterProvider />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
