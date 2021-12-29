import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
// import { initializeApp } from 'firebase/app';
// import { firebase } from '@firebase/app'
// import 'firebase/auth';
import firebase from 'firebase'
// require('firebase/auth')
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';

// INITIALIZE FIREBASE (NEW CREATED)
const firebaseConfig = {
  apiKey: "AIzaSyCz-Wd5fT_9DNmaJp_mGBYu9NjRSgBLk3U",
  authDomain: "dailykpop-ee1e3.firebaseapp.com",
  projectId: "dailykpop-ee1e3",
  storageBucket: "dailykpop-ee1e3.appspot.com",
  messagingSenderId: "634344250588",
  appId: "1:634344250588:web:6922ef76271f0f4a58e819",
  measurementId: "G-XNXPPVHXBC"
};
firebase.initializeApp(firebaseConfig);

// FIREBASE ANALYTICS 
// const analytics = getAnalytics(app);

onAuthStateChanged(auth, user => { console.log(user); });
WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      // clientId: '452397277148-dh5p6n7iq8sjq6cfsg6b7b7fk8urdilc.apps.googleusercontent.com',
      clientId: '634344250588-lgu10halk6fqqu366rdnommu47pekmc4.apps.googleusercontent.com'
    },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}