import prisma from '@/libs/prismadb'

export default async function getTeams() {
  try {
    const teams = await prisma.team.findMany( {
      orderBy: { country: 'desc' }
    } )

    if ( !teams ) return

    return teams

  } catch ( error: any ) {
    throw new Error( error )
  }
}

interface IParameters {
  teamId?: string
}

export async function getTeambyId( parameters: IParameters ) {
  const { teamId } = parameters

  if ( !teamId ) return

  const team = await prisma.team.findUnique( {
    where: { id: teamId }
  } )

  if ( !team ) return

  return team
}