// import React, { useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// import * as Google from 'expo-auth-session/providers/google';
// import * as SecureStore from 'expo-secure-store';

// // FIREBASE V8.
// import firebase from 'firebase';
// import { auth } from '../firebase1';


// export default function LoginInitial() {
//   const [user, setUser] = useState(null);
//   // GET USER DATA FROM SECURE STORAGE
//   const [credentialState, setCredentialState] = useState({});

//   const navigation = useNavigation();

//   const getUserData = async () => {
//     try {
//       const credential2 = await SecureStore.getItemAsync('credential');
//       setCredentialState(JSON.parse(credential2));
//       console.log(credentialState, '크레덴셜2') // null
//     } catch (e) {
//       console.log(e)
//     }
//   }
//   useEffect(() => {
//     getUserData()
//   }, [])

//   // EXPO-AUTH-SESSION 
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     iosClientId: `410819928050-7kmse291edmagjocpcf3ok8kpgrtllqr.apps.googleusercontent.com`,
//     clientId: `410819928050-r0q6jqltshqv8ji8hh6m6lmejfd3nmot.apps.googleusercontent.com`,
//     webClientId: `410819928050-r0q6jqltshqv8ji8hh6m6lmejfd3nmot.apps.googleusercontent.com`,
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
//       firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//           setUser({ user });
//         } else {
//           console.log('no user');
//         }
//       });

//       auth.signInWithCredential(credentialState)
//         .then(() => {
//           console.log(credential, '크레덴셜')
//           // IF LOGGED IN
//           navigation.replace('HomeTabNavigation');
//         })
//         .catch(error => {
//         })
//     }
//   }, [response])

//   return (
//     <View>
//       <Text>
//       </Text>
//     </View>
//   );
// }

