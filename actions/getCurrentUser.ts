import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/libs/prismadb'

export async function getSession() {
  return await getServerSession( authOptions )
}

export default async function getCurrentUser() {
  try {
    if ( typeof window === 'undefined' ) {
      return
    }

    const session = await getSession()

    if( !session?.user?.email ) {
      return
    }

    const currentUser = await prisma.user.findUnique( {
      where: { email: session.user.email as string }
    } )

    if ( !currentUser ) {
      return
    }

    return currentUser

  } catch( error: any ) {
    throw new Error( error )
  }
}