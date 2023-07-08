import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  const body = await request.json()
  const { phase, date, hour, minute, stadium, image, teamOne, teamTwo } = body

  if ( !phase || !date || !stadium || !teamOne || !teamTwo || !hour || !minute || !image || teamOne === teamTwo ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const isExist = await prisma.match.findUnique( {
    where: { date_stadium: { date, stadium } }
  } )

  if ( isExist ) {
    return new NextResponse( 'A match already exists at the stadium and date.', { status: 400 } )
  }

  const match = await prisma.match.create( {
    data: { date, time: `${hour} : ${minute}`, stadium, phase, image }
  } )

  await prisma.matchTeam.create( {
    data: { matchId: match.id, team: teamOne }
  } )

  await prisma.matchTeam.create( {
    data: { matchId: match.id, team: teamTwo }
  } )

  return new NextResponse( 'Team Created', { status: 200 } )
}
