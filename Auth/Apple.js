import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication';
import React from 'react';
import useAppleAuthentication from './useAppleAuthentication';
import { isAvailableAsync, AppleAuthenticationScope, signInAsync } from 'expo-apple-authentication';
import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto';
// import { OAuthProvider } from 'firebase/auth';
import firebase from 'firebase'
import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
// import { RootStackScreenProps } from '../types';


export default function AppleAuth() {
  const navigation = useNavigation();

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={20}
      style={{ width: 300, height: 60, }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          const provider = new firebase.auth.OAuthProvider(
            "apple.com"
          ).credential({
            idToken: credential.identityToken,
            rawNonce: "CUSTOM STRING", // notice this isn't encoded
          })
          try {
            await firebase.auth().signInWithRedirect(provider)
            // SIGNED IN 
            navigation.navigate('Nickname', { param: firebase.auth().currentUser.uid });
          } catch (e) {
            navigation.navigate('Nickname', { param: e.message });
          }

        } catch (e) {
          if (e.code === 'ERR_CANCELED') {
            // handle that the user canceled the sign-in flow
            navigation.navigate('Nickname', { param: 'failed(canceled)' });
            // Go back
            // navigation.goBack();
            // navigation.navigate('Community')
          } else {
            // handle other errors
            navigation.navigate('Nickname', { param: e.message });
            // navigation.navigate('Discover')
          }
        }
      }}
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