import prisma from '@/libs/prismadb'

export default async function getListings() {
    try {
        const teams = await prisma.team.findMany()

        return teams
    } catch (error: any) {
        throw new Error(error)
    }
}