import React from 'react'
import enterDetails from './enterDetails'
import Header from '../components/Header'
import { signOut } from 'next-auth/react'
import Form from './Form'

function DetailsPage({ session, setRefresh }) {
  const regex =
    /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?[a-zA-Z]+[0-9][0-9][0-9][0-9]/
  return (
    <div className="h-screen w-screen bg-white">
      <Header
        name={session?.user.name.replace(regex, '')}
        image={session?.user.image}
      />
      <div className="flex flex-col px-5 pt-10 md:px-20">
        <h1 className="text-3xl md:text-7xl">Find your Roommate</h1>
        <h4 className="mt-6 text-lg text-gray-400 md:text-2xl">
          To find your Roommate, Enter some of your details!
        </h4>
        <Form
          name={session?.user.name.replace(regex, '')}
          reg={session?.user.name.match(regex)[0]}
          setRefresh={setRefresh}
        />
      </div>
      <div className="fixed bottom-0 right-10 flex h-[500px] justify-end px-10">
        <img
          className="hidden h-[500px] md:flex"
          src="https://gist.githubusercontent.com/MEGA-BLASTER2004/25d8dba60b6ccf218a077ab79fa35adb/raw/81ec6888aca845e8c3ed305a681af62c47b36bf4/Friends.svg"
          alt=""
        />
      </div>
    </div>
  )
}

export default DetailsPage
