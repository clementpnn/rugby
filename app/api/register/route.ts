import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

import prisma from '@/libs/prismadb'
import { EMAIL_TYPE } from '@prisma/client'

export async function POST( request: Request ) {
  // eslint-disable-next-line no-console
  console.log( 'on' )
  const body = await request.json()
  const { firstName, lastName, email, role, password } = body

  if ( !firstName || !lastName || !email || !role || !password ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const isExist = await prisma.user.findUnique( {
    where: { email }
  } )

  if ( isExist ) {
    return new NextResponse( 'User Existing', { status: 500 } )
  }

  const hashedPassword = await bcrypt.hash( password, 12 )

  const user = await prisma.user.create( {
    data: { firstName, lastName, email, role, password: hashedPassword }
  } )

  const mfaToken = Math.floor( 100_000 + Math.random() * 900_000 ).toString()

  await prisma.sentEmail.create( {
    data: { userId: user.id, type: EMAIL_TYPE.MFA, mfaToken }
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
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
              <html lang="en">
              
              <head></head>
              
              <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
                  <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 0 130px">
                  <tr style="width:100%">
                      <td><img alt="Plaid" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/plaid-logo.png" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
                      <p style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">Verify Your Identity</p>
                      <h1 style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">Enter the following code to finish sign in.</h1>
                      <table style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                          <tbody>
                          <tr>
                              <td>
                              <p style="font-size:32px;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">${mfaToken}</p>
                              </td>
                          </tr>
                          </tbody>
                      </table>
                      </td>
                  </tr>
                  </table>
                  <p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">Securely powered by Plaid.</p>
              </body>
              
              </html>`
  }

  await transporter.sendMail( mailOptions )

  return new NextResponse( 'Email send', { status: 200 } )
}