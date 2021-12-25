// import * as React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import { ResponseType } from 'expo-auth-session';
// import * as Google from 'expo-auth-session/providers/google';
// import * as firebase from 'firebase';
// // import { firebase } from '@firebase/app'
// // import { firebase, initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { Button } from 'react-native';

// const config = {
//   apiKey: "AIzaSyB2RIWy_yejQZC7Ir-G_-Uyn5h1BQ6zmuY",
//   authDomain: "chat-app-399d2.firebaseapp.com",
//   projectId: "chat-app-399d2",
//   storageBucket: "chat-app-399d2.appspot.com",
//   messagingSenderId: "452397277148",
//   appId: "1:452397277148:web:79ad3b89672e59ffeab919",
//   measurementId: "G-VFBCCSNJC9"
// }

// firebase.initializeApp(config)

// // Initialize Firebase
// // initializeApp({
// //   apiKey: "AIzaSyB2RIWy_yejQZC7Ir-G_-Uyn5h1BQ6zmuY",
// //   authDomain: "chat-app-399d2.firebaseapp.com",
// //   projectId: "chat-app-399d2",
// //   storageBucket: "chat-app-399d2.appspot.com",
// //   messagingSenderId: "452397277148",
// //   appId: "1:452397277148:web:79ad3b89672e59ffeab919",
// //   measurementId: "G-VFBCCSNJC9"
// // });

// WebBrowser.maybeCompleteAuthSession();

// export default function GoogleAuth3() {

//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
//     {
//       clientId: '398637032546-3rp3jmc6u4cu0vlr335k9ml451qujm5v.apps.googleusercontent.com',
//     },
//   );

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;

//       const auth = getAuth();
//       const provider = new GoogleAuthProvider();
//       const credential = provider.credential(id_token);
//       signInWithCredential(auth, credential);
//     }
//   }, [response]);

//   return (
//     <Button
//       disabled={!request}
//       title="Login"
//       onPress={() => {
//         promptAsync();
//       }}
//     />
//   );
// }