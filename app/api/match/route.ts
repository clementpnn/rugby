import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
  try{
    const body = await request.json()
    const { type, date, stadiumId, teamOneId, teamTwoId } = body

    if (!type || !date || !stadiumId || !teamOneId || !teamTwoId) {
      return new NextResponse('Invalid Request', { status: 400 })
    }

    const isExist = await prisma.match.findFirst({
      where: { stadiumId, date }
    })

    if (!isExist) {
      return new NextResponse('Stadium not Existing', { status: 500 })
    }

    const match = await prisma.match.create({
      data: { stadiumId, type, date }
    })

    return NextResponse.json(match)

  } catch {
    return new NextResponse('Server Error', { status: 500 })
  }
}
