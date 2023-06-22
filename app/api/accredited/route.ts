import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
    try {
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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD
            }
        })
    
        const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: 'Hello',
        text: 'Hello world?'
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json(user)
    } catch {
        return new NextResponse('Internal Error', { status: 500 })
    }
}