import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {

  const body = await request.json()
  const { name, matchId, type, places, image } = body

  if (!name || !matchId || !type || !places || !image) {
    return new NextResponse('Invalid Request', { status: 400 })
  }

  const isExist = await prisma.section.findUnique({
    where: { matchId_name: { matchId, name } }
  })

  if (isExist) {
    return new NextResponse('Section existing', { status: 500 })
  }

  await prisma.section.create({
    data: { name, matchId, type, places, image }
  })

  return new NextResponse('Team Created', { status: 200 })

}
