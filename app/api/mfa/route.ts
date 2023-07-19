import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  try{
    const body = await request.json()
    const { email, mfaToken } = body
    // eslint-disable-next-line no-console
    console.log( email, mfaToken )
    if ( !email || !mfaToken ) {
      return new NextResponse( 'Invalid Request', { status: 400 } )
    }
    // eslint-disable-next-line no-console
    console.log( 'ok' )
    const user = await prisma.user.findUnique( {
      where: { email }
    } )
    // eslint-disable-next-line no-console
    console.log( 'ok' )
    if ( !user ) {
      return new NextResponse( 'User Not Existing', { status: 500 } )
    }
    // eslint-disable-next-line no-console
    console.log( 'ok' )
    const sentEmail = await prisma.sentEmail.findUnique( {
      where: { userId_mfaToken: { userId: user.id, mfaToken } }
    } )
    // eslint-disable-next-line no-console
    console.log( 'ok' )
    if ( !sentEmail ) {
      return new NextResponse( 'Invalid MFA Token', { status: 400 } )
    }
    // eslint-disable-next-line no-console
    console.log( 'ok' )
    if ( sentEmail.userId !== user.id ) {
      return new NextResponse( 'Invalid User', { status: 400 } )
    }
    // eslint-disable-next-line no-console
    console.log( 'ok' )
    await prisma.sentEmail.delete( {
      where: { id: sentEmail.id }
    } )
    // eslint-disable-next-line no-console
    console.log( 'ok' )
    return new NextResponse( 'Sign In', { status: 200 } )

  } catch {
    return new NextResponse( 'Server Error', { status: 500 } )
  }
}