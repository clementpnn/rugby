import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  const body = await request.json()
  const { phase, date, hour, minute, stadiumId, teamOne, teamTwo } = body

  if ( !phase || !date || !stadiumId || !teamOne || !teamTwo || !hour || !minute || teamOne === teamTwo ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const isMatchExist = await prisma.match.findUnique( {
    where: { date_stadiumId: { date, stadiumId } }
  } )

  if ( isMatchExist ) {
    return new NextResponse( 'A match already exists at the stadium and date.', { status: 400 } )
  }

  const match = await prisma.match.create( {
    data: { date, time: `${hour} : ${minute}`, stadiumId, phase }
  } )

  await prisma.matchTeam.create( {
    data: { matchId: match.id, team: teamOne }
  } )

  await prisma.matchTeam.create( {
    data: { matchId: match.id, team: teamTwo }
  } )

  return new NextResponse( 'Team Created', { status: 200 } )
}
