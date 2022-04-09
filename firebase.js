import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: 'bunkmates-74b8e.firebaseapp.com',
  projectId: 'bunkmates-74b8e',
  storageBucket: 'bunkmates-74b8e.appspot.com',
  messagingSenderId: '556794576679',
  appId: '1:556794576679:web:b8e61e2ae3c4ad4742b302',
  measurementId: 'G-J1MTVTVJ7W',
}
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

export default db
