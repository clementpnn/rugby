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
      where: { country: country }
    })
    
    if (isExist) {
      return new NextResponse('Team Existing', { status: 500 })
    }

    const pouleCount = await prisma.team.count({
      where: { poule }
    })

    if (pouleCount >= 4) {
      return new NextResponse('Poule is full', { status: 500 })
    }

    await prisma.team.create({
      data: { country, poule }
    })
      
    return new NextResponse('Team Created', { status: 200 })

  } catch {
    return new NextResponse('Server Error', { status: 500 })
  }
}