import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';

import firebase from 'firebase';

export default function AppleAuth() {
  const navigation = useNavigation();

  async function signInWithApple() {
    const nonce = Math.random().toString(36).substring(2, 10);
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
          idToken: identityToken,
          rawNonce: nonce
        });
        return firebase.auth().signInWithCredential(credential)
      })
      .then(() => {
        navigation.navigate('Nickname', { param: firebase.auth().currentUser.uid });
      })
      .catch((e) => {
        // navigation.navigate('Nickname', { param: e.message });
        console.log(e)
      });
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={20}
      style={{ width: 300, height: 60, }}
      onPress={signInWithApple}
    />
  );
}

