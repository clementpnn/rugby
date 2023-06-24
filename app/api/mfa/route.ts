import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const { email, mfaToken } = body

        if (!email || !mfaToken) {
            return new NextResponse('Invalid Request', { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if (!user) {
            return new NextResponse('User Not Existing', { status: 500 })
        }

        const sentEmails = await prisma.sentEmail.findMany({
            where: {userId: user.id}
        })

        const emailRecord = sentEmails.find(sentEmail => sentEmail.mfaToken === mfaToken)

        if (!emailRecord) {
            return new NextResponse('Invalid MFA Token', { status: 400 })
        }

        await prisma.sentEmail.delete({
            where: {id: emailRecord.id}
        })

        return NextResponse.json(user)

    } catch {
        return new NextResponse('Server Error', { status: 500 })
    }
}