import prisma from '@/libs/prismadb'

export default async function getAllTeams() {
  try {
    return await prisma.team.findMany()
  } catch (error: any) {
    throw new Error(error)
  }
}