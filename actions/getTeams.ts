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