import prisma from '@/libs/prismadb'

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

    const totalDemands = await prisma.demand.count( {
      where: { userId }
    } )

    const totalAccepted = await prisma.demand.count( {
      where: { userId, state: 'ACCEPTED' }
    } )

    const totalRejected = await prisma.demand.count( {
      where: { userId, state: 'REJECTED' }
    } )

    const totalPending = await prisma.demand.count( {
      where: { userId, state: 'IN_PROGRESS' }
    } )

    return {
      ...demand,
      user: {
        ...demand.user,
        totalDemands,
        totalAccepted,
        totalRejected,
        totalPending
      }
    }
  } ) )

  return {
    ...match.matchTeams,
    demands: demandsWithUserDemandsInfo
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