import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: processs.env.FIREBASE_API_KEY,
  authDomain: "dailykpop-ee1e3.firebaseapp.com",
  projectId: "dailykpop-ee1e3",
  storageBucket: "dailykpop-ee1e3.appspot.com",
  messagingSenderId: "634344250588",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-XNXPPVHXBC"
};

let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}
const db = app.firestore()
const auth = firebase.auth()

export {
  db,
  auth
}