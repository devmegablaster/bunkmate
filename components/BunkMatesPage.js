import React from 'react'

function BunkMatesPage({ session, data }) {
  return (
    <div>
      <h1>
        {data.bunkMates.map((bunkMate) => {
          return (
            <div>
              <h1>{bunkMate.name}</h1>
              <h1>{bunkMate.reg}</h1>
            </div>
          )
        })}
      </h1>
    </div>
  )
}

export default BunkMatesPage
