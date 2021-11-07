import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB2RIWy_yejQZC7Ir-G_-Uyn5h1BQ6zmuY",
    authDomain: "chat-app-399d2.firebaseapp.com",
    projectId: "chat-app-399d2",
    storageBucket: "chat-app-399d2.appspot.com",
    messagingSenderId: "452397277148",
    appId: "1:452397277148:web:79ad3b89672e59ffeab919",
    measurementId: "G-VFBCCSNJC9"
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