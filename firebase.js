import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBJGjwYDihh-O1-O0DcolWcfIZ7pyJvtHw',
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
