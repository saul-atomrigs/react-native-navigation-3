// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as Crypto from 'expo-crypto';
// import firebase from 'firebase';
// import React, { useEffect, useState } from 'react';

// export const signInWithApple = () => {
//     const nonce = Math.random().toString(36).substring(2, 10);

//     return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
//         .then((hashedNonce) =>
//             AppleAuthentication.signInAsync({
//                 requestedScopes: [
//                     AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//                     AppleAuthentication.AppleAuthenticationScope.EMAIL
//                 ],
//                 nonce: hashedNonce
//             })
//         )
//         .then((appleCredential) => {
//             const { identityToken } = appleCredential;
//             const provider = new firebase.auth.OAuthProvider('apple.com');
//             const credential = provider.credential({
//                 // idToken: identityToken!,
//                 idToken: identityToken,
//                 rawNonce: nonce
//             });
//             return firebase.auth().signInWithCredential(credential);
//             // Successful sign in is handled by firebase.auth().onAuthStateChanged
//         })
//         .catch((e) => {
//             // ...
//             console.log(e)
//         });
// };