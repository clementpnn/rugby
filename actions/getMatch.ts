import prisma from '@/libs/prismadb'
import { JOB } from '@prisma/client'

export default async function getMatchs() {
  try {
    const matchs = await prisma.match.findMany( {
      // orderBy: {
      //   date: 'desc',
      //   time: 'desc'
      // },
      include: {
        matchTeams: true
      }
    } )

    if ( !matchs ) return

    return matchs

  } catch ( error: any ) {
    throw new Error( error )
  }
}

interface IParameters {
  matchId?: string
}

interface IUser {
  userId: string
}

export async function getMatchsInfoByUser( parameters: IUser ) {
  const { userId } = parameters

  const match = await prisma.match.findMany( {
    include: {
      matchTeams: true,
      demands: {
        where: {
          userId: userId
        },
        include: {
          user: true
        }
      }
    }
  } )

  if ( !match ) return

  return match.map( matchItem => {
    const userDemand = matchItem.demands.find( demand => demand.user?.id === userId )
    return {
      ...matchItem,
      userDemandStatus: userDemand ? userDemand.state : 'NOT_DEMANDED'
    }
  } )
}

export async function getMatchById( parameters: IParameters ) {

  const { matchId } = parameters

  const match = await prisma.match.findUnique( {
    where: { id: matchId },
    include: {
      matchTeams: true,
      demands: {
        include: {
          user: true
        }
      }
    } } )

  if ( !match ) return

  const demandsWithUserDemandsInfo = await Promise.all( match.demands.map( async ( demand ) => {
    const userId = demand.user.id

    const amount = await prisma.demand.count( {
      where: { userId }
    } )

    const accepted = await prisma.demand.count( {
      where: { userId, state: 'ACCEPTED' }
    } )

    const refused = await prisma.demand.count( {
      where: { userId, state: 'REJECTED' }
    } )

    const processing = await prisma.demand.count( {
      where: { userId, state: 'IN_PROGRESS' }
    } )

    return {
      demandState: demand.state,
      name: `${demand.user.firstName} ${demand.user.lastName}`,
      company: demand.user.company || 'No company',
      status: demand.user.job || JOB.JOURNALIST,
      email: demand.user.email,
      emailVerified: demand.user.emailVerified,
      amount,
      accepted,
      refused,
      processing
    }
  } ) )

  return {
    match: { ...match },
    demands: demandsWithUserDemandsInfo
  }
}

export async function getMatchUpdateById( parameters: IParameters ) {
  const { matchId } = parameters

  const match = await prisma.match.findUnique( {
    where: { id: matchId },
    include: {
      matchTeams: true
    }
  } )

  if ( !match ) return

  return match
}

export async function getMatchDemandById( parameters: IParameters ) {
  const { matchId } = parameters

  const match = await prisma.match.findUnique( {
    where: { id: matchId },
    include: {
      matchTeams: true,
      demands: true
    }
  } )

  if ( !match ) return

  const stadium = await prisma.stadium.findUnique( {
    where: { id: match?.stadiumId },
    include: {
      tribunes: true
    }
  } )

  if ( !stadium ) return

  const demandsWithUserDemandsInfo = await Promise.all( match.demands.map( async ( demand ) => {
    const userId = demand.userId

    const user = await prisma.user.findUnique( {
      where: { id: userId }
    } )

    return {
      demand, user
    }
  } ) )

  return {
    match: {
      ...match,
      matchTeams: match.matchTeams,
      demands: demandsWithUserDemandsInfo
    },
    stadium
  }
}

export async function getMatchByIdUser( parameters: IParameters ) {

  const { matchId } = parameters

  const match = await prisma.match.findUnique( {
    where: { id: matchId },
    include: {
      matchTeams: true,
      demands: {
        include: {
          user: true
        }
      }
    } } )

  if ( !match ) return

  return match
}