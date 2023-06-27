import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
  try{
    const body = await request.json()
    const { email, mfaToken } = body

    if (!email || !mfaToken) {
      return new NextResponse('Invalid Request', { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return new NextResponse('User Not Existing', { status: 500 })
    }

    const sentEmail = await prisma.sentEmail.findFirst({
      where: {
        userId: user.id,
        type: 'MFA'
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!sentEmail) {
      return new NextResponse('Invalid MFA Token', { status: 400 })
    }

    await prisma.sentEmail.delete({
      where: { id: sentEmail.id }
    })

    return NextResponse.json(user)

  } catch {
    return new NextResponse('Server Error', { status: 500 })
  }
}