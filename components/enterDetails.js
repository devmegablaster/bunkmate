import React from 'react'
import db from '../firebase'
import firebase from 'firebase'

function enterDetails(block, room, name, reg, phone, insta, para, mail) {
  db.collection('Blocks')
    .doc(block)
    .collection('Rooms')
    .doc(room)
    .get()
    .then((doc) => {
      if (doc.exists) {
        db.collection('Blocks')
          .doc(block)
          .collection('Rooms')
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
          .doc(block)
          .collection('Rooms')
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
  db.collection('users').doc(reg).set({ name, reg, block, room, mail })
}

export default enterDetails
