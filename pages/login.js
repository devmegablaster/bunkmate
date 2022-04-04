import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Header from '../components/Header'

function login({ providers }) {
  return (
    <div className=" h-screen w-screen bg-white text-black">
      <Header />
      <div className="mt-8 grid grid-cols-2">
        <div className="flex flex-col space-y-14 px-20">
          <h1 className="flex flex-col text-7xl">
            Find your <span>Roommate</span>
          </h1>
          <h3 className="flex flex-col text-xl text-gray-400">
            Login with your VIT Email Address to find your<span>Roommate!</span>
          </h3>
          {Object.values(providers).map((provider) => {
            return (
              <div key={provider.name}>
                <button
                  className=" flex items-center rounded-md bg-blue-500  px-2 py-1 font-sans text-lg font-normal text-white duration-150 hover:bg-blue-600 hover:shadow-lg active:scale-95"
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                >
                  <img
                    src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                    alt="spotifyLogo"
                    className="mr-2 h-10 w-10 rounded-sm bg-white p-2"
                  />
                  Sign In with {provider.name}
                </button>
              </div>
            )
          })}
        </div>
        <img
          src="https://gist.githubusercontent.com/MEGA-BLASTER2004/cfe069e9ee0788873a2d8a6bd46c250d/raw/a5fea8b2557f2c67201c3bfd31f408a201e7cc47/LandingSvg.svg"
          alt=""
          className="h-[29rem]"
        />
      </div>
      <div className="mt-16 flex items-center justify-between px-20">
        <div className="flex flex-col">
          <h3>For Queries and Suggestions related to BunkMates</h3>
          <div className="mt-4 flex items-center space-x-2">
            <h3 className="font-bold">devmegablaster@gmail.com</h3>
            <a
              href="mailto:devmegablaster@gmail.com"
              className="rounded-full bg-blue-500 px-3 py-1 text-sm text-white duration-100 hover:bg-blue-600"
            >
              Send
            </a>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <h3 className="font-bold">aryanofficial375@gmail.com</h3>
            <a
              href="mailto:aryanofficial375@gmail.com"
              className="rounded-full bg-blue-500 px-3 py-1 text-sm text-white duration-100 hover:bg-blue-600"
            >
              Send
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
