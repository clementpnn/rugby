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
      
      <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&display=swap">
      </head>
      
      <body style="background-color:#ffffff;font-family: 'Barlow Condensed', sans-serif;">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);width:360px;margin:0 auto;padding:40px 0 90px">
          <tr style="width:100%">
              <td>
                  <!--        <img alt="Plaid" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/plaid-logo.png" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />-->
                  <img alt="logo blue inline" src="public/images/logoBlueInline.svg" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;margin-left: 20px" />
                  <div>
                      <p style="font-size:35px;margin:16px 0 0 20px;color:#212FE8;font-weight:700;height:16px;letter-spacing:0;text-transform:uppercase;">Reset</p>
                      <p style="font-size:35px;margin:16px 0 0 20px;color:#212FE8;font-weight:700;height:16px;letter-spacing:0;text-transform:uppercase;">Your Password</p>
                  </div>
                  <div style="margin-top: 70px">
                      <h1 style="color:#9E9E9E;display:inline-block;font-size:16px;font-weight:500;line-height:24px;margin:0 0 0 20px;text-align:center">Click here to reset your password.</h1>
                      <table style="background:#F5F5F5;border: 1px solid #BDBDBD;border-radius:12px;margin:16px auto 14px;vertical-align:middle;width:280px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                          <tbody>
                          <tr>
                              <td>
                                  <a href="http://localhost:3000/resetPassword/${token.resetToken}" style="font-size:25px;text-decoration:none;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-weight:700;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">Reset Password</a>
                              </td>
                          </tr>
                          </tbody>
                      </table>
                  </div>
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

