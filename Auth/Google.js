import React, { useEffect, } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GoogleLogo } from 'phosphor-react-native';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// FIREBASE V8.
import firebase from 'firebase';
import { auth } from '../firebase1';

// GOOGLE SIGN IN MODAL
WebBrowser.maybeCompleteAuthSession()

export default function GoogleAuth() {
  const navigation = useNavigation();

  // EXPO-AUTH-SESSION 
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: `410819928050-7kmse291edmagjocpcf3ok8kpgrtllqr.apps.googleusercontent.com`,
    clientId: `410819928050-r0q6jqltshqv8ji8hh6m6lmejfd3nmot.apps.googleusercontent.com`,
    webClientId: `410819928050-r0q6jqltshqv8ji8hh6m6lmejfd3nmot.apps.googleusercontent.com`,
  });

  // SIGN IN WITH GOOGLE
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      auth
        .signInWithCredential(credential)
        .then(() => {
          // IF LOGGED IN
          navigation.navigate('Nickname',
            {
              param: firebase.auth().currentUser.uid,
              // credential: JSON.stringify(credential),
            });
        })
        .catch(error => {
          console.log('error: ', error);
        })
    }
  }, [response])

  return (
    <TouchableOpacity
      onPress={() => { promptAsync() }}
      style={styles.googleBtn}>
      <GoogleLogo weight='bold' color='red' size={20} style={styles.googleLogo} />
      <Text style={styles.btnText}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

// STYLES
const styles = StyleSheet.create({
  googleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 60,
    borderRadius: 28,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    borderColor: '#7a7a7a',
  },
  googleLogo: {
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
  }
});