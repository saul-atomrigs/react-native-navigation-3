// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as Crypto from 'expo-crypto';
// import firebase from 'firebase';
// import { signInWithApple } from './signInWithApple';
// import React, { useEffect, useState } from 'react';


// // export const AuthScreen: React.FC = (props) => {
// export function AuthScreen() {
//     const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);

//     useEffect(() => {
//         AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
//     }, []);

//     return (
//         <>
//             {/* {isAppleLoginAvailable && ( */}
//             {/* <View style={{ alignItems: 'center' }}> */}
//             <AppleAuthentication.AppleAuthenticationButton
//                 buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
//                 buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
//                 cornerRadius={25}
//                 onPress={signInWithApple}
//                 style={{ width: '100%', height: 50 }}
//             />
//             {/* </View> */}
//             {/* )} */}
//         </>
//     );
// };
