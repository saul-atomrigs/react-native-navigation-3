import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, StyleSheet } from 'react-native';
import { GoogleLogo } from 'phosphor-react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// FIREBASE V8.
import firebase from 'firebase/app';
import { db } from '../firebase1';
import { auth } from '../firebase1';

import { UserContext } from './UserProvider';

export default function GoogleAuth() {

  const navigation = useNavigation();

  const user = useContext(UserContext);
  console.log('유저:', user);

  // EXPO-AUTH-SESSION 
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // CLIENT ID FROM FIREBASE:
    clientId: `634344250588-lgu10halk6fqqu366rdnommu47pekmc4.apps.googleusercontent.com`
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      auth.signInWithCredential(credential)
        .then(() => {
          // IF LOGGED IN
          navigation.navigate('Welcome');
          console.log('🚀 LOGGED IN');
        })
        .catch(error => {
          // IF NOT LOGGED IN
          navigation.navigate('Discover');
        })
    }
  }, [response])

  db.collection('users').add({
    // userId: authUser.user.uid,
    // email: authUser.user.email
  })

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
      <Button title='sign out' onPress={() => firebase.auth().signOut()} />
    </>
  );
}

// GOOGLE SIGN IN MODAL
WebBrowser.maybeCompleteAuthSession();

// STYLES
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