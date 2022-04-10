import React from 'react'
import db from '../firebase'

function fetchUser(reg, setData, setUser) {
  var temp = []
  db.collection('users')
    .doc(reg)
    .get()
    .then((user) => {
      if (user.exists) {
        const data = user.data()
        setUser(data)
        db.collection('Blocks')
          .doc(data.gender)
          .collection(data.block)
          .doc(data.room)
          .collection('BunkMates')
          .onSnapshot((snap) => {
            snap.forEach((bunkMate) => {
              temp.push(bunkMate.data())
            })
            setData({ bunkMates: temp })
            temp = []
          })
      } else {
        setData({ loading: false })
        return
      }
    })
}

export default fetchUser
