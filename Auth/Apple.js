import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';

import firebase from 'firebase';

export default function AppleAuth() {

  const navigation = useNavigation();
  async function signInWithApple() {

    // today's date
    // const date = new Date().toISOString().slice(0, 10);
    const nonce = Math.random().toString(36).substring(2, 10);
    // combine date and nonce to create a unique nonce

    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
      .then((hashedNonce) =>
        AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL
          ],
          nonce: hashedNonce
        })
      )
      .then((appleCredential) => {
        const { identityToken } = appleCredential;
        const provider = new firebase.auth.OAuthProvider('apple.com');
        const credential = provider.credential({
          // idToken: identityToken!,
          idToken: identityToken,
          rawNonce: nonce
        });
        navigation.navigate('Nickname', { param: hashedNonce });
        return firebase.auth().signInWithCredential(credential);
        // try {
        //   // Successful sign in is handled by firebase.auth().onAuthStateChanged
        //   // await firebase.auth().signInWithPopup(provider)
        //   await firebase.auth().signInWithCredential(credential);
        //   // SIGNED IN 
        //   navigation.navigate('Nickname', { param: firebase.auth().currentUser.uid });
        // } catch (e) {
        //   navigation.navigate('Nickname', { param: e.message });
        // }
      })
      .catch((e) => {
        navigation.navigate('Nickname', { param: e.message });
        // ...
      });
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={20}
      style={{ width: 300, height: 60, }}
      onPress={
        // null
        signInWithApple
        // async () => {
        //   try {
        //     const credential = await AppleAuthentication.signInAsync({
        //       requestedScopes: [
        //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
        //       ],
        //     });

        //     // START SIGN IN PROCESS
        //     const provider = new firebase.auth.OAuthProvider("apple.com").credential({
        //       idToken: credential.identityToken,
        //       rawNonce: nonce, // notice this isn't encoded
        //     })

        //     try {
        //       await firebase.auth().signInWithPopup(provider)
        //       // SIGNED IN 
        //       navigation.navigate('Nickname', { param: firebase.auth().currentUser.uid });
        //     } catch (e) {
        //       navigation.navigate('Nickname', { param: e.message });
        //     }

        //   } catch (e) {
        //     if (e.code === 'ERR_CANCELED') {
        //       // handle that the user canceled the sign-in flow
        //       navigation.navigate('Nickname', { param: 'failed(canceled)' });
        //       // Go back
        //       // navigation.goBack();
        //       // navigation.navigate('Community')
        //     } else {
        //       // handle other errors
        //       navigation.navigate('Nickname', { param: e.message });
        //       // navigation.navigate('Discover')
        //     }
        //   }
        // }
      }
    />
  );
}


// <AppleAuthentication.AppleAuthenticationButton
// buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
// buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
// cornerRadius={20}
// style={{ width: 300, height: 60, }}
// onPress={async () => {
//   try {
//     const credential = await AppleAuthentication.signInAsync({
//       requestedScopes: [
//         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//         AppleAuthentication.AppleAuthenticationScope.EMAIL,
//       ],
//       nonce: sha256("CUSTOM STRING"),
//     })

//     const provider = new firebase.auth.OAuthProvider(
//       "apple.com"
//     ).credential({
//       idToken: credential.identityToken,
//       rawNonce: "CUSTOM STRING", // notice this isn't encoded
//     })

//     try {
//       await firebase.auth().signInWithRedirect(provider)
//     } catch (e) {
//     }
//     // signed in
//   } catch (e) {
//     if (e.code === "ERR_CANCELED") {
//       // handle that the user canceled the sign-in flow
//     } else {
//       // handle other errors
//     }
//   }
// }}
// />