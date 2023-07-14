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

  return match
}