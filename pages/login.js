import React, { useEffect } from 'react'
import Header from '../components/Header'
import { app } from '../firebase'
import firebase from 'firebase'
import Router from 'next/router'

function login() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        Router.push('/')
      }
    })
  })
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  googleProvider.setCustomParameters({
    hd: 'vitstudent.ac.in',
  })
  return (
    <div className=" h-screen w-screen bg-white text-black">
      <header>
        <title>BunkMate</title>
      </header>
      <Header />
      <div className=" mt-8 grid w-screen grid-cols-1 justify-items-center space-y-4 md:grid-cols-2 md:justify-items-start md:space-y-0 2xl:justify-items-center">
        <div className="flex flex-col space-y-7 px-5 md:space-y-14 md:px-20">
          <h1 className="flex flex-col text-3xl md:text-7xl">
            Find your <span>Roommate</span>
          </h1>
          <h3 className="flex flex-col text-base text-gray-400 md:text-xl">
            Login with your VIT Email Address to find your<span>Roommate!</span>
          </h3>
          <button
            className="flex w-fit items-center space-x-2 rounded-md bg-blue-500 px-2 py-1 duration-150 hover:scale-105 hover:bg-blue-600 hover:shadow-lg active:scale-95 active:shadow-md"
            onClick={() => {
              console.log('AUTH')
              firebase
                .auth()
                .signInWithPopup(googleProvider)
                .then((result) => {
                  /** @type {firebase.auth.OAuthCredential} */
                  var credential = result.credential

                  // This gives you a Google Access Token. You can use it to access the Google API.
                  var token = credential.accessToken
                  // The signed-in user info.
                  var user = result.user
                  // ...
                })
                .catch((error) => {
                  // Handle Errors here.
                  var errorCode = error.code
                  var errorMessage = error.message
                  // The email of the user's account used.
                  var email = error.email
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential
                  // ...
                })
            }}
          >
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt=""
              className="h-8 rounded-md bg-white p-1"
            />
            <h4 className="text-white">Login with Google</h4>
          </button>
        </div>
        <img
          src="https://gist.githubusercontent.com/devmegablaster/cfe069e9ee0788873a2d8a6bd46c250d/raw/a5fea8b2557f2c67201c3bfd31f408a201e7cc47/LandingSvg.svg"
          alt=""
          className="h-[29rem] p-4 md:p-0"
        />
      </div>
      <div className=" mt-4 flex items-center justify-between px-5 pb-10 md:mt-16 md:px-20 2xl:px-64">
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
