import { NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'
import nodemailer from 'nodemailer'

import prisma from '@/libs/prismadb'
import { EMAIL_TYPE } from '@prisma/client'

export async function POST( request: Request ) {
  const body = await request.json()
  const { email } = body

  if ( !email ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const user = await prisma.user.findUnique( {
    where: { email }
  } )

  if ( !user ) {
    return new NextResponse( 'Invalid User', { status: 400 } )
  }

  const token = await prisma.sentEmail.create( {
    data: {
      userId: user.id,
      type: EMAIL_TYPE.RESET,
      resetToken: uuid()
    }
  } )

  const transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  } )

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Your MFA Token',
    html:  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                <html lang="en">
                
                <head></head>
                
                <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
                    <a href="http://localhost:3000/resetPassword/${token.resetToken}">Reset Password</a>
                </body>
                
                </html>`
  }

  await transporter.sendMail( mailOptions )

  return new NextResponse( 'Email send', { status: 200 } )

}

