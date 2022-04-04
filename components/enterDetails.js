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
    .get()
    .then((doc) => {
      if (doc.exists) {
        db.collection('Blocks')
          .doc(gender)
          .collection(block)
          .doc(room)
          .update({
            bunkMates: firebase.firestore.FieldValue.arrayUnion({
              name,
              reg,
              phone,
              insta,
              para,
              mail,
            }),
          })
          .then(() => {
            console.log('Document successfully written!')
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
          })
      } else {
        db.collection('Blocks')
          .doc(gender)
          .collection(block)
          .doc(room)
          .set({
            bunkMates: firebase.firestore.FieldValue.arrayUnion({
              name,
              reg,
              phone,
              insta,
              para,
              mail,
            }),
          })
          .then(() => {
            console.log('Document successfully written!')
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
          })
      }
    })
  db.collection('users').doc(reg).set({ name, reg, block, room, mail, gender })
}

export default enterDetails
