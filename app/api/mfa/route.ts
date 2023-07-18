import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  try{
    const body = await request.json()
    const { email, mfaToken } = body

    if ( !email || !mfaToken ) {
      return new NextResponse( 'Invalid Request', { status: 400 } )
    }

    const user = await prisma.user.findUnique( {
      where: { email }
    } )

    if ( !user ) {
      return new NextResponse( 'User Not Existing', { status: 500 } )
    }

    const sentEmail = await prisma.sentEmail.findUnique( {
      where: {
        mfaToken
      }
    } )

    if ( !sentEmail ) {
      return new NextResponse( 'Invalid MFA Token', { status: 400 } )
    }

    if ( sentEmail.userId !== user.id ) {
      return new NextResponse( 'Invalid User', { status: 400 } )
    }

    await prisma.sentEmail.delete( {
      where: { id: sentEmail.id }
    } )

    return new NextResponse( 'MFA Token Valid', { status: 200 } )

  } catch {
    return new NextResponse( 'Server Error', { status: 500 } )
  }
}