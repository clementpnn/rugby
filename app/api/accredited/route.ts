import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
    const body = await request.json()
    const {accreditationId, firstName, lastName, email, company, job, password } = body

    if (!accreditationId || !firstName || !lastName || !email || !company || !job || !password) {
        return new NextResponse('Invalid Request', { status: 400 })
    }

    const isExist = await prisma.user.findUnique({
        where: {email}
    })

    if (isExist) {
        return new NextResponse('User Existing', { status: 500 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: {accreditationId, firstName, lastName, email, company, job, hashedPassword}
    })

    return NextResponse.json(user)
}