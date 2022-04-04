import { Loader } from '@mantine/core'
import React from 'react'
import Header from './Header'

function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Header />
      <Loader color="green" className="mt-10" size="xl" />
    </div>
  )
}

export default Loading
