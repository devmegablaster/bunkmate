import React from 'react'
import db from '../firebase'
import firebase from 'firebase'

function enterDetails(
  block,
  room,
  name,
  reg,
  phone,
  insta,
  para,
  mail,
  gender
) {
  db.collection('Blocks')
    .doc(gender)
    .collection(block)
    .doc(room)
    .collection('BunkMates')
    .doc(reg)
    .set({
      name,
      reg,
      phone,
      insta,
      para,
      mail,
    })

  db.collection('users').doc(reg).set({ name, reg, block, room, mail, gender })
}

export default enterDetails
