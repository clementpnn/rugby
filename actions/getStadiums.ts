import prisma from '@/libs/prismadb'

export default async function getStadiums() {
  return await prisma.stadium.findMany()
}