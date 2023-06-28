import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
  try{
    const body = await request.json()
    const { country, poule } = body

    if (!country || !poule) {
      return new NextResponse('Invalid Request', { status: 400 })
    }

    const isExist = await prisma.team.findUnique({
      where: { country }
    })

    if (isExist) {
      return new NextResponse('Team Existing', { status: 500 })
    }

    const team = await prisma.team.create({
      data: { country, poule }
    })

    return NextResponse.json(team)

  } catch {
    return new NextResponse('Server Error', { status: 500 })
  }
}