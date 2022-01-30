import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import firebase from 'firebase'
import Apple from '../Auth/Apple'
import Google from '../Auth/Google'
import { useNavigation } from '@react-navigation/native'

// import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../firebase1';
import AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

export default function Notifications() {

  const navigation = useNavigation()

  // SIGN OUT FUNCTION
  function signOut() {
    alert('signing out')
    firebase.auth().signOut();
    navigation.reset({ index: 0, routes: [{ name: 'SignedOut' }] })
  }

  // USE REFRESH TOKEN TO GET NEW ACCESS TOKEN (AFTER EXPIRATION)
  // const tokenResult = AuthSession.refreshAsync({
  //   clientId: `410819928050-r0q6jqltshqv8ji8hh6m6lmejfd3nmot.apps.googleusercontent.com`,
  //   refreshToken: `
  //   AFxQ4_pkus8atk8vNfqM6kyM7OfNLvuLrA7HNHnTRKmvIVJitqqSnel_2F7uYW2QSjtx31uRsIeDEAiu8hDuNKxOoKSK7eD_N5g21-SwIy_jol1ET90ICRbaGtcTN6kyIqcDGKAC3RVgxc2hCPPzS-6LukN9LRyWyUWmp-rO4sgiatOLaLSMEUxMxlE6LA0mVfdkeW9XPig7FF7OjAivfhJDJsOGZs7C02-ZQzaTwDNuAjeU_wMmPePz0X5By7UyPI_EIR5VBlst2HzV-WB3-yrzE-q6X6zwkqSkVC8M-fcgx4yCSwAaF78mFY0woAwwmE1E06uV0Jui1FduqkPLSOfupC0vH4YqNNK0w_Y3epVYaBl5YDagefoN8mUhDuowaU09GIopONy54q-YvKdFE5TyfPJv8R5Raqz6y7nl3Mm9cp7Dwx0hUS-CMWJaBsisyd9DWJW-F4Cg
  //   `,
  // }, {
  //   tokenEndpoint: "www.googleapis.com/oauth2/v4/token",
  // },
  // );
  // useEffect(() => {
  //   tokenResult()
  // }, [])

  // READ USER DATA FROM SECURE STORE
  // async function read(key) {
  //   const result = await SecureStore.getItemAsync(key);
  //   if (result) {
  //     console.log("🔐 Here's your value 🔐 \n" + result + "READ FROM SECURE STORE");
  //     auth.signInWithCredential(JSON.parse(result))
  //   } else {
  //     alert('No values stored under that key.');
  //   }
  // }
  // read('credential')
  // console.log(result, 'READ')
  //   console.log('SIGN IN SUCCESSFUL')
  // )


  // const user = firebase.auth().currentUser

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log(user, '유저')
  //     } else {
  //       console.log('no user');
  //     }
  //   }
  //   )
  // }, [])

  return (
    <View style={styles.container}>
      {
        firebase.auth().currentUser == null ?

          <>
            <Apple />
            <Google />
          </>
          :
          <>
            <Text>No Notifications yet</Text>
            <View
              style={styles.signOut}
            >
              <Text>You're currently signed in.</Text>
              <Button
                onPress={signOut}
                title='Sign out'
              />
              {/* <Button
                onPress={() => navigation.navigate('SetupPush')}
                title='Register for Push Notifications'
              /> */}
            </View>
          </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOut: {
    marginTop: 300,
  }
})
