// import React from 'react'
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet, Text, View } from 'react-native'
// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as Crypto from 'expo-crypto';
// import firebase from 'firebase';
// NO support lower iOS versions, Android, or web.

// export default function AppleAuth() {
//   const navigation = useNavigation();

//   return (
//     <AppleAuthentication.AppleAuthenticationButton
//       buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
//       buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
//       cornerRadius={20}
//       style={{ width: 300, height: 60, }}
//       onPress={async () => {
//         try {
//           const credential = await AppleAuthentication.signInAsync({
//             requestedScopes: [
//               AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//               AppleAuthentication.AppleAuthenticationScope.EMAIL,
//             ],
//           });
//           // SIGNED IN 
//           console.log('🚀 SIGNED IN APPLE', credential)
//           navigation.navigate('Nickname', { param: 'testname' });

//         } catch (e) {
//           if (e.code === 'ERR_CANCELED') {
//             // handle that the user canceled the sign-in flow
//             navigation.navigate('Nickname', { param: 'failed(canceled)' });
//           } else {
//             // handle other errors
//             navigation.navigate('Nickname', { param: 'failed' });
//           }
//         }
//       }}
//     />
//   );
// }



// export default function signInWithApple() {
//   const nonce = Math.random().toString(36).substring(2, 10);

//   return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
//     .then((hashedNonce) =>
//       AppleAuthentication.signInAsync({
//         requestedScopes: [
//           AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//           AppleAuthentication.AppleAuthenticationScope.EMAIL
//         ],
//         nonce: hashedNonce
//       })
//     )
//     .then((appleCredential) => {
//       const { identityToken } = appleCredential;
//       const provider = new firebase.auth.OAuthProvider('apple.com');
//       const credential = provider.credential({
//         idToken: identityToken!,
//         rawNonce: nonce
//       });
//       return firebase.auth().signInWithCredential(credential);
//       // Successful sign in is handled by firebase.auth().onAuthStateChanged
//     })
//     .catch((error) => {
//       // ...
//     });
// };

// import { isAvailableAsync, AppleAuthenticationScope, signInAsync } from 'expo-apple-authentication';
// import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto';
// // import { OAuthProvider } from 'firebase/auth';
// import firebase from 'firebase'
// import { useState, useEffect } from 'react';
// import { Alert, Platform } from 'react-native';

// async function login() {
//   console.log('Signing in with Apple...');
//   const state = Math.random().toString(36).substring(2, 15);
//   const rawNonce = Math.random().toString(36).substring(2, 10);
//   const requestedScopes = [AppleAuthenticationScope.FULL_NAME, AppleAuthenticationScope.EMAIL];

//   try {
//     const nonce = await digestStringAsync(CryptoDigestAlgorithm.SHA256, rawNonce);

//     const appleCredential = await signInAsync({
//       requestedScopes,
//       state,
//       nonce,
//     });

//     const { identityToken, email, fullName } = appleCredential;

//     if (!identityToken) {
//       throw new Error('No identity token provided.');
//     }

//     // const provider = new OAuthProvider('apple.com');
//     const provider = new firebase.auth.OAuthProvider('apple.com');

//     provider.addScope('email');
//     provider.addScope('fullName');

//     const credential = provider.credential({
//       idToken: identityToken,
//       rawNonce,
//     });

//     const displayName = fullName ? `${fullName.givenName} ${fullName.familyName}` : undefined;
//     const data = { email, displayName };

//     return [credential, data] as const;
//   } catch (error: any) {
//     throw error;
//   }
// }

// export default function useAppleAuthentication() {
//   const [authenticationLoaded, setAuthenticationLoaded] = useState < boolean > (false);

//   useEffect(() => {
//     async function checkAvailability() {
//       try {
//         const available = await isAvailableAsync();

//         setAuthenticationLoaded(available);
//       } catch (error: any) {
//         Alert.alert('Error', error?.message);
//       }
//     }

//     if (Platform.OS === 'ios' && !authenticationLoaded) {
//       checkAvailability();
//     }
//   }, []);

//   return [authenticationLoaded, login] as const;
// }