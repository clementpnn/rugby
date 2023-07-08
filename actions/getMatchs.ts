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

    return matchs

  } catch ( error: any ) {
    throw new Error( error )
  }
}