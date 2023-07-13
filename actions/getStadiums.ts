import prisma from '@/libs/prismadb'

export default async function getStadiums() {
  try {
    const stadiums = await prisma.stadium.findMany()

    if ( !stadiums ) return

    return stadiums

  } catch ( error: any ) {
    throw new Error( error )
  }
}