// import React, { useEffect } from 'react';
// import { Button } from 'react-native';

// import * as WebBrowser from 'expo-web-browser';
// import { ResponseType } from 'expo-auth-session';
// import * as Google from 'expo-auth-session/providers/google';

// import { initializeApp } from 'firebase/app';
// import { getAuth, signOut, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// // FIREBASE CONFIG 
// // const firebaseApp = initializeApp(firebaseConfig);

// const firebaseConfig = {
//   apiKey: "AIzaSyB2RIWy_yejQZC7Ir-G_-Uyn5h1BQ6zmuY",
//   authDomain: "chat-app-399d2.firebaseapp.com",
//   projectId: "chat-app-399d2",
//   storageBucket: "chat-app-399d2.appspot.com",
//   messagingSenderId: "452397277148",
//   appId: "1:452397277148:web:79ad3b89672e59ffeab919",
//   measurementId: "G-VFBCCSNJC9"
// }
// initializeApp(firebaseConfig);
// // let app
// // if (firebase.apps.length === 0) {
// //   app = firebase.initializeApp(firebaseConfig)
// // } else {
// //   app = firebase.app()
// // }

// // firebase.initializeApp(firebaseConfig)
// // app

// onAuthStateChanged(auth, user => { console.log(user); });

// WebBrowser.maybeCompleteAuthSession();

// export default function GoogleAuth3() {

//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
//     {
//       // AUTO CREATED (SEE DOCUMENTATION: https://docs.expo.dev/guides/authentication/#google)
//       clientId: '452397277148-dh5p6n7iq8sjq6cfsg6b7b7fk8urdilc.apps.googleusercontent.com',
//     },
//   );

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;

//       const auth = getAuth();
//       const provider = new GoogleAuthProvider();
//       const credential = provider.credential(id_token);
//       signInWithCredential(auth, credential);
//     }
//   }, [response]);

//   // SIGN OUT 
//   // const auth = getAuth();
//   // signOut(auth).then(() => {
//   //   // Sign-out successful.
//   // }).catch((error) => {
//   //   // An error happened.
//   // });

//   return (
//     <>
//       <View style={styles.googleBtn}>
//         <GoogleLogo weight='bold' size={18} style={styles.googleLogo} />
//         <Button
//           disabled={!request}
//           title="Login with Google"
//           onPress={() => {
//             promptAsync();
//           }}
//         />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   googleBtn: {
//     flexDirection: 'row',
//     width: 200,
//     height: 45,
//     borderRadius: 5,
//     borderWidth: 1,
//     marginTop: 10,
//     backgroundColor: '#eee',
//   },
//   googleLogo: {
//     justifyContent: 'center',
//     marginLeft: 10,
//     marginTop: 10,
//   },
// });