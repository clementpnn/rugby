import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/'
  }
})

export const config = {
  matcher: [
    '/user/:path*',
    '/admin/:path*',
    '/dev/:path*'
  ]
}