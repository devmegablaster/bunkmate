import { signOut } from 'next-auth/react'
import React from 'react'
import firebase from 'firebase'

function Header({ name, image, setStatus }) {
  return (
    <div className="flex items-center justify-between py-6 px-5 md:px-10">
      <img
        src="https://gist.githubusercontent.com/devmegablaster/d1c04c7695d1410c4c34254b00c37e1d/raw/29205b600f8166a93a9aad4e18dfc1ce44d83707/BunkMates.svg"
        alt=""
        className="h-8 md:h-12"
      />
      {name ? (
        <div className="flex items-center space-x-2">
          <img
            src={image}
            className="h-10 w-10 rounded-full border-2 border-blue-500 md:h-12 md:w-12"
            alt=""
          />
          <div>
            <h3 className="">{name}</h3>
            <button
              className="text-sm text-red-500"
              onClick={() => {
                firebase.auth().signOut()
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Header
