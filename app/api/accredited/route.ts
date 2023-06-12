import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {firstName, lastName, company, job, email} = body

        if (!firstName || !lastName || !company || !job?.value || !email) {
            return new NextResponse('Invalid Request', { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return new NextResponse('User Existing', { status: 500 })
        }

        await prisma.accredited.create({
            data: {firstName, lastName, company, job: job?.value, email}
        })

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}