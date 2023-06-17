'use client'

import { SessionProvider } from 'next-auth/react'

interface AuthProviderProperties {
    children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProperties) {
    return <SessionProvider>{children}</SessionProvider>
}