import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: {
        url: process.env.NEXTAUTH_URL,
        params: {
          prompt: 'select_account',
          hd: 'vitstudent.ac.in',
        },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        return (
          profile.email_verified && profile.email.endsWith('@vitstudent.ac.in')
        )
      }
      return true
    },
  },
})
