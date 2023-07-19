import { NextResponse } from 'next/server'
import { COUNTIES, PHASE, RESULT } from '@prisma/client'

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

function getNextPhase( currentPhase: PHASE ): PHASE | undefined {
  switch ( currentPhase ) {
  case PHASE.POULE_A:
  case PHASE.POULE_B:
  case PHASE.POULE_C:
  case PHASE.POULE_D: {
    return undefined
  }
  case PHASE.QUARTERFINAL: {
    return PHASE.SEMI_FINAL
  }
  case PHASE.SEMI_FINAL: {
    return PHASE.FINAL
  }
  case PHASE.FINAL: {
    return undefined
  }
  default: {
    throw new Error( 'Invalid phase' )
  }
  }
}

export async function PATCH( request: Request ) {
  const body = await request.json()
  const { matchId, team1Result, team2Result, team1Points, team2Points, team1Bonus, team2Bonus, team1DefenseBonus, team2DefenseBonus } = body

  if ( !matchId || !team1Result || !team2Result || !team1Points || !team2Points || !team1Bonus || !team2Bonus || !team1DefenseBonus || !team2DefenseBonus ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const match = await prisma.match.findUnique( {
    where: { id: matchId },
    include: {
      matchTeams: true
    }
  } )

  if ( !match ) {
    return new NextResponse( 'Match Not Existing', { status: 500 } )
  }

  await prisma.matchTeam.updateMany ( {
    where: { matchId, team: match.matchTeams[0].team },
    data: { result: team1Result }
  } )
  await prisma.matchTeam.updateMany( {
    where: { matchId, team: match.matchTeams[1].team },
    data: { result: team2Result }
  } )

  await prisma.team.updateMany( {
    where: { country: match.matchTeams[0].team as COUNTIES },
    data: {
      points: { increment: team1Points },
      bonus: { increment: team1Bonus },
      defenseBonus: { increment: team1DefenseBonus }
    }
  } )

  await prisma.team.updateMany( {
    where: { country: match.matchTeams[1].team as COUNTIES },
    data: {
      points: { increment: team2Points },
      bonus: { increment: team2Bonus },
      defenseBonus: { increment: team2DefenseBonus }
    }
  } )

  if ( team1Result === RESULT.WINNER ) {
    const nextPhase = getNextPhase( match.phase )
    if ( nextPhase ) {
      await prisma.team.updateMany( {
        where: { country: match.matchTeams[0].team as COUNTIES },
        data: { phase: nextPhase }
      } )
    }
  } else if ( team2Result === RESULT.WINNER ) {
    const nextPhase = getNextPhase( match.phase )
    if ( nextPhase ) {
      await prisma.team.updateMany( {
        where: { country: match.matchTeams[1].team as COUNTIES },
        data: { phase: nextPhase }
      } )
    }
  }

  return new NextResponse( 'Match Updated', { status: 200 } )
}

