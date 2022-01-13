import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, StyleSheet, TouchableOpacity, Text, AccessibilityInfo } from 'react-native';
import { GoogleLogo } from 'phosphor-react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// FIREBASE V8.
import firebase from 'firebase';
import { db } from '../firebase1';
import { auth } from '../firebase1';

import { UserContext } from './UserProvider';


// GOOGLE SIGN IN MODAL
WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {

  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // const user = useContext(UserContext);

  // EXPO-AUTH-SESSION 
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // CLIENT ID FROM FIREBASE:
    // clientId: `634344250588-lgu10halk6fqqu366rdnommu47pekmc4.apps.googleusercontent.com`,
    // 보안비번: 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

    // CLiENT IDs FROM GCP: 
    iosClientId: `410819928050-7kmse291edmagjocpcf3ok8kpgrtllqr.apps.googleusercontent.com`,
    clientId: `410819928050-r0q6jqltshqv8ji8hh6m6lmejfd3nmot.apps.googleusercontent.com`,
    webClientId: `410819928050-r0q6jqltshqv8ji8hh6m6lmejfd3nmot.apps.googleusercontent.com`,
  });


  // SIGN IN WITH GOOGLE
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser({ user });
          console.log(credential);
          const displayName = firebase.auth().currentUser.displayName;
        } else {
          console.log('no user');
        }
      });

      auth.signInWithCredential(credential)
        .then(() => {
          // IF LOGGED IN
          navigation.navigate('Nickname',
            { param: firebase.auth().currentUser.uid });
        })
        .catch(error => {
          // IF NOT LOGGED IN
          navigation.navigate('Nickname', { param: error.message });
        })
    }
  }, [response])

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
        style={styles.googleBtn}>
        <GoogleLogo weight='bold' color='red' size={20} style={styles.googleLogo} />
        <Text style={styles.btnText}>Continue with Google</Text>
      </TouchableOpacity>
      <Text>
        {user ?
          // "You are now signed in"
          <Button title='sign out' onPress={() => firebase.auth().signOut()} />
          :
          ""}
      </Text>
    </>
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