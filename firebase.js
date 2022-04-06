import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: 'bunkmate-d219e.firebaseapp.com',
  projectId: 'bunkmate-d219e',
  storageBucket: 'bunkmate-d219e.appspot.com',
  messagingSenderId: '312835789875',
  appId: '1:312835789875:web:bd60baf33b4f2c167a7f46',
  measurementId: 'G-4WCJZZ26CV',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

export default db
