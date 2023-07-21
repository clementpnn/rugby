/* eslint-disable no-console */
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  const body = await request.json()
  const { demandId, points, tribuneId } = body

  if ( !demandId || !points[0].x || !points[0].y || !tribuneId ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  await prisma.demand.update( {
    where: { id: demandId },
    data: { state: 'ACCEPTED' }
  } )

  await prisma.point.create( {
    data: {
      demandId,
      x: points[0].x,
      y: points[0].y
    }
  } )

  return new NextResponse( 'Demand Created', { status: 200 } )
}
