import { useRouter } from 'next/router'
import React from 'react'
import { signOut } from 'next-auth/react'

function error() {
  const router = useRouter()
  const err = router.query.error
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-900 text-2xl text-red-500 ">
      <h1>{err}</h1>
      <h3 className="text-lg text-gray-300">
        Please use your VIT mail to Login!
      </h3>
      <button
        onClick={() => {
          router.push('login')
        }}
        className="mt-4 rounded-2xl bg-green-500 px-3 py-2 text-base text-white duration-150 hover:bg-green-600"
      >
        Back To Login
      </button>
    </div>
  )
}

export default error
