import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {

    const body = await request.json()
    const {email} = body

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        },
      })

      let mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: 'Hello',
        text: 'Hello world?',
      }
  
      let info = await transporter.sendMail(mailOptions)

    return NextResponse.json(info)
}