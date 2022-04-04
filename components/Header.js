import { signOut } from 'next-auth/react'
import React from 'react'

function Header({ name, image }) {
  return (
    <div className="flex items-center justify-between py-6 px-10">
      <img
        src="https://gist.githubusercontent.com/MEGA-BLASTER2004/d1c04c7695d1410c4c34254b00c37e1d/raw/29205b600f8166a93a9aad4e18dfc1ce44d83707/BunkMates.svg"
        alt=""
      />
      {name ? (
        <div className="flex items-center space-x-2">
          <img src={image} className="h-12 w-12 rounded-full" alt="" />
          <div>
            <h3 className="">{name}</h3>
            <button
              className="text-sm text-red-500"
              onClick={() => {
                signOut()
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
