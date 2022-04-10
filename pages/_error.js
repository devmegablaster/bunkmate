import { useRouter } from 'next/router'
import React from 'react'
import { signOut } from 'next-auth/react'
import Header from '../components/Header'

function error() {
  const router = useRouter()
  const err = router.query.error
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-2xl text-red-500 ">
      <Header />
      <h1>{err}</h1>
      <h3 className="text-lg text-red-500">New Changes have been made!</h3>
      <h3 className="text-lg text-red-500">Please refresh This page!</h3>
      <h3 className="mt-5 rounded-2xl bg-green-100 px-2 py-2 font-mono text-sm text-green-600">
        If the issue still persists, text MEGA-BLASTER#4496 on discord!
      </h3>
    </div>
  )
}

export default error
