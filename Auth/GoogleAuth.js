import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, StyleSheet } from 'react-native';
import { GoogleLogo } from 'phosphor-react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// FIREBASE V8.
import firebase from 'firebase/app';
import 'firebase/auth';


export default function GoogleAuth2() {

  const navigation = useNavigation();

  // EXPO-AUTH-SESSION: https://docs.expo.io/versions/latest/sdk/auth-session/
  // const [request, response, promptAsync] = Google.useAuthRequest({
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // CLIENT ID FROM FIREBASE
    clientId: `634344250588-lgu10halk6fqqu366rdnommu47pekmc4.apps.googleusercontent.com`
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      auth.signInWithCredential(credential)
        .then(() => {
          // IF LOGGED IN
          // navigation.navigate('Community');
          navigation.goBack();
          console.log('🚀 LOGGED IN');
        })
        .catch(error => {
          // IF NOT LOGGED IN
          navigation.navigate('Discover');
        })
    }
  }, [response])


  // console.log('request: ', request);
  console.log('response: ', response);
  // console.log('promptAsync: ', promptAsync);

  return (
    <>
      <View style={styles.googleBtn}>
        <GoogleLogo weight='bold' size={18} style={styles.googleLogo} />
        <Button
          disabled={!request}
          title="Login with Google"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyCz-Wd5fT_9DNmaJp_mGBYu9NjRSgBLk3U",
  authDomain: "dailykpop-ee1e3.firebaseapp.com",
  projectId: "dailykpop-ee1e3",
  storageBucket: "dailykpop-ee1e3.appspot.com",
  messagingSenderId: "634344250588",
  appId: "1:634344250588:web:6922ef76271f0f4a58e819",
  measurementId: "G-XNXPPVHXBC"
}
let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}
const auth = firebase.auth()

WebBrowser.maybeCompleteAuthSession();


const styles = StyleSheet.create({
  googleBtn: {
    flexDirection: 'row',
    width: 200,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#eee',
  },
  googleLogo: {
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
});