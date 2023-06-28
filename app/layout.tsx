import AuthProvider from '@/providers/AuthProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fr'>
      <body className={inter.className}>
        <ToasterProvider />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
