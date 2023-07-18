import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  const body = await request.json()
  const { resetToken, password } = body

  if ( !resetToken || !password ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const token = await prisma.sentEmail.findUnique( {
    where: { resetToken }
  } )

  if ( !token ) {
    return new NextResponse( 'Invalid Token', { status: 400 } )
  }

  const user = await prisma.user.findUnique( {
    where: { id: token.userId }
  } )

  if ( !user ) {
    return new NextResponse( 'Invalid User', { status: 400 } )
  }

  const hashedPassword = await bcrypt.hash( password, 12 )

  await prisma.user.update( {
    where: { id: user.id },
    data: { password: hashedPassword }
  } )

  await prisma.sentEmail.delete( {
    where: { id: token.id }
  } )

  return new NextResponse( 'Password Updated', { status: 200 } )
}
