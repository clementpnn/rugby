import { NextResponse } from 'next/server'
import { PHASE } from '@prisma/client'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  try{
    const body = await request.json()
    const { country, poule } = body

    if ( !country || !poule ) {
      return new NextResponse( 'Invalid Request', { status: 400 } )
    }

    const isExist = await prisma.team.findUnique( {
      where: { country: country }
    } )

    if ( isExist ) {
      return new NextResponse( 'Team Existing', { status: 500 } )
    }

    return new NextResponse( 'Team Created', { status: 200 } )

  } catch {
    return new NextResponse( 'Server Error', { status: 500 } )
  }
}

export async function PATCH( request: Request ) {
  const body = await request.json()
  const { teamId } = body

  if ( !teamId ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const team = await prisma.team.findUnique( {
    where: { id: teamId }
  } )

  if ( !team ) {
    return new NextResponse( 'Team Not Existing', { status: 500 } )
  }

  await prisma.team.update( {
    where: { id: teamId },
    data: { phase: PHASE.QUARTERFINAL }
  } )

  return new NextResponse( 'Team Updated', { status: 200 } )
}