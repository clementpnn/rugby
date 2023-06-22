import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {

    const body = await request.json()
    const { firstName, lastName, email, role, password } = body

    if (!firstName || !lastName || !email || !role || !password) {
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
        data: {firstName, lastName, email, role, hashedPassword}
    })

    return NextResponse.json(user)
}