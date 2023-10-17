export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!login|forgot|favicon.ico).*)'],
}
