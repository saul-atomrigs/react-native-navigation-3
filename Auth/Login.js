import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import Apple from './Apple';
import Google from './Google';

import * as SecureStore from 'expo-secure-store';
import { auth } from '../firebase1';


export default function LoginScreen() {
  // GET USER DATA FROM SECURE STORAGE
  const [credentialState, setCredentialState] = useState({});

  const getUserData = async () => {
    try {
      const credential2 = await SecureStore.getItemAsync('credential');
      setCredentialState(JSON.parse(credential2));
      console.log(JSON.parse(credential2), '크레덴셜2') // null
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUserData()
  }, [])

  function signIn() {
    console.log(credentialState, '크레덴셜3')
    auth.signInWithCredential(credentialState)
  }

  function signOut() {
    auth.signOut()
  }

  return (
    <View style={styles.container}>
      <Apple />
      <Google />
      <Button title='signin' onPress={signIn} />
      <Text>{credentialState.oauthIdToken}</Text>
    </View>
  );
}

// STYLING 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
})
