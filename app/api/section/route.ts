import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
  try{
    const body = await request.json()
    const { name, type, places, stadiumId } = body

    if (!name || !type || !places || !stadiumId) {
      return new NextResponse('Invalid Request', { status: 400 })
    }

    // const isExist = await prisma.stadium.findUnique({
    //   where: { id: stadiumId }
    // })

    // if (!isExist) {
    //   return new NextResponse('Stadium not Existing', { status: 500 })
    // }

    // const space = await prisma.space.create({
    //   data: { name, stadiumId, type, places }
    // })

    // return NextResponse.json(space)

  } catch {
    return new NextResponse('Server Error', { status: 500 })
  }
}
