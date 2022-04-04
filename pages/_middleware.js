import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { useSession } from 'next-auth/react'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  if (pathname.includes('/login') && token) {
    console.log('here')
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`)
  }

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname !== '/login' && pathname !== '/error') {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
  }
  return NextResponse.next()
}
