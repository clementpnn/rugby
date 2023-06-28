import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
  try{
    const body = await request.json()
    const { name, adress } = body

    if (!name || !adress) {
      return new NextResponse('Invalid Request', { status: 400 })
    }

    const isExist = await prisma.stadium.findUnique({
      where: { name }
    })

    if (isExist) {
      return new NextResponse('Stadium Existing', { status: 500 })
    }

    const stadium = await prisma.stadium.create({
      data: { name, adress }
    })

    return NextResponse.json(stadium)

  } catch {
    return new NextResponse('Server Error', { status: 500 })
  }
}