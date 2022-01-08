import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GoogleLogo } from 'phosphor-react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// FIREBASE V8.
import firebase from 'firebase';
import { db } from '../firebase1';

import { auth } from '../firebase1';
// import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { UserContext } from './UserProvider';


// GOOGLE SIGN IN MODAL
WebBrowser.maybeCompleteAuthSession();


export default function GoogleAuth() {

  const navigation = useNavigation();

  const user = useContext(UserContext);

  // firebase.auth().currentUser.getIdToken().then(function (token) {
  // console.log(firebase.auth().currentUser);

  // EXPO-AUTH-SESSION 
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // CLIENT ID FROM FIREBASE:
    clientId: `634344250588-lgu10halk6fqqu366rdnommu47pekmc4.apps.googleusercontent.com`,
    // CLiENT IDs FROM GCP: 
    iosClientId: `410819928050-7kmse291edmagjocpcf3ok8kpgrtllqr.apps.googleusercontent.com`,
    webClientId: `410819928050-r0q6jqltshqv8ji8hh6m6lmejfd3nmot.apps.googleusercontent.com`,
  });

  // SIGN IN WITH GOOGLE
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      const uid = firebase.auth().currentUser.uid;
      const displayName = firebase.auth().currentUser.displayName;
      // ADD USER TO FIRESTORE DB
      db.collection('users').doc(uid).set({
        displayName: displayName,
        uid: uid,
      })
      // console.log(credential)
      auth.signInWithCredential(credential)
        .then(() => {
          // IF LOGGED IN
          navigation.navigate('Nickname', { param: displayName });
          console.log('🚀 LOGGED IN', uid);
        })
        .catch(error => {
          // IF NOT LOGGED IN
          navigation.navigate('Discover');
          console.log(error.code)
          console.log(error.message)
        })
    }
  }, [response])

  // firebase.auth().onAuthStateChanged = (user) => {
  //   if (user != null) {
  //     console.log('🚀 SIGNED IN');
  //     console.log(user);
  //   } else {
  //     console.log('🚀 SIGNED OUT');
  //   }
  // };
  // db.collection('users').add({
  // userId: authUser.user.uid,
  // email: authUser.user.email
  // })

  // const firestore = getFirestore();

  // setDoc(doc(firestore, "characters", "mario"), {
  //   employment: "plumber",
  //   outfitColor: "red",
  //   specialAttack: "fireball"
  // });

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
      <Button title='sign out' onPress={() => firebase.auth().signOut()} />
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