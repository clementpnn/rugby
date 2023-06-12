import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {firstName, lastName, company, job, accreditation, email, password} = body

        if (!firstName || !lastName || !company || !job?.value || !accreditation || !email) {
            return new NextResponse('Invalid Request', { status: 400 })
        }

        const accredited = await prisma.accredited.findUnique({
            where: {
                email
            }
        })

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!accredited) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (user) {
            return new NextResponse('User Existing', { status: 500 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        await prisma.user.create({
            data: {firstName, lastName, company, job: job?.value, accreditation, email, hashedPassword}
        })

        return NextResponse.json(user)

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}