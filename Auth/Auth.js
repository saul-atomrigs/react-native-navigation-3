// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import auth from '@react-native-firebase/auth';
// // import { auth } from '../firebase'
// import { AppleButton } from '@invertase/react-native-apple-authentication';


// export default function Auth() {

//   // SET INITIAL STATE WHILE FIREBASE CONNECTS
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // HANDLE USER STATE CHANGES
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // UNSUBSCRIBE ON MOUNT
//   }, []);

//   function AppleSignIn() {
//     return (
//       <AppleButton
//         buttonStyle={AppleButton.Style.WHITE}
//         buttonType={AppleButton.Type.SIGN_IN}
//         style={{
//           width: 160,
//           height: 45,
//         }}
//         onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
//       />
//     );
//   }

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View>
//         <Text>Login</Text>
//         {/* <AppleSignIn /> */}
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );
// }