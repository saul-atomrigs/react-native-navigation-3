import firebase from 'firebase'
import 'firebase/auth'
// import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCz-Wd5fT_9DNmaJp_mGBYu9NjRSgBLk3U",
  authDomain: "dailykpop-ee1e3.firebaseapp.com",
  projectId: "dailykpop-ee1e3",
  storageBucket: "dailykpop-ee1e3.appspot.com",
  messagingSenderId: "634344250588",
  appId: "1:634344250588:web:6922ef76271f0f4a58e819",
  measurementId: "G-XNXPPVHXBC"
};

let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}
// const db = app.firestore()
const auth = firebase.auth()

export {
  // db,
  auth
}