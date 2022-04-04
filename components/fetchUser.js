import React from 'react'
import db from '../firebase'

function fetchUser(reg, setData) {
  db.collection('users')
    .doc(reg)
    .get()
    .then((user) => {
      if (user.exists) {
        const data = user.data()
        db.collection('Blocks')
          .doc(data.block)
          .collection('Rooms')
          .doc(data.room)
          .get()
          .then((bunkmates) => {
            if (bunkmates.exists) {
              setData({
                bunkMates: bunkmates.data().bunkMates,
                block: data.block,
                room: data.room,
              })
            } else {
              setData({ loading: false })
            }
          })
      } else {
        setData({ loading: false })
      }
    })
}

export default fetchUser
