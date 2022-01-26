// import React, { useState, useEffect } from 'react'
// import { Button } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
// import firebase from 'firebase/app'
// import UserProvider from './UserProvider'
// import Apple from './Apple'
// import Google from './Google'
// export default function Navigation() {
//   const [currentUser, setCurrentUser] = useState(null)
//   const navigation = useNavigation()
//   const userHandler = (user) => {
//     user ? setCurrentUser(user) : setCurrentUser(null)
//   }

//   useEffect(() => {
//     () => firebase.auth().onAuthStateChanged(user => userHandler(user))
//   }, [])

//   // SIGN OUT FUCTION
//   function signOut() {
//     alert('signing out')
//     firebase.auth().signOut();
//     navigation.reset({ index: 0, routes: [{ name: 'SignedOut' }] })
//   }

//   return (
//     <>
//       {
//         // IF USER IS LOGGED IN
//         currentUser == null ?
//           // firebase.auth().currentUser == null ?

//           // OTHERWISE, GOOGLE & APPLE SIGN IN BUTTONS
//           <>
//             <Button
//               title='sign out'
//               // onPress={() => firebase.auth().signOut()} />
//               onPress={signOut} />
//           </>


//           :
//           // SIGN OUT BUTTONN
//           <>
//             <Apple />
//             <Google />
//           </>

//       }
//     </>
//   )
// }