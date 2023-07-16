import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  const body = await request.json()
  const { userId, matchId } = body

  if ( !userId || !matchId ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const match = await prisma.demand.findUnique( {
    where: { userId_matchId: { userId, matchId } }
  } )

  if ( match ) {
    return new NextResponse( 'Demand already exists', { status: 400 } )
  }

  await prisma.demand.create( {
    data: { userId, matchId }
  } )

  return new NextResponse( 'Demand Created', { status: 200 } )
}
