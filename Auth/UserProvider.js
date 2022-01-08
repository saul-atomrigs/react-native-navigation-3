import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Image, Text } from "react-native";
import firebase from 'firebase'
import { db } from "../firebase1";

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost, } from '../src/graphql/mutations'
import { listPosts } from '../src/graphql/queries'
Amplify.configure(config)

export const UserContext = createContext({ user: null })

export default ({ props }) => {

  const [user, setUser] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      const { photoURL, displayName, email } = user;

      var uid = user.uid;
      console.log('token : ', uid)

      // AUTH => FIREBASE DB
      // db.collection('users').add({
      //   uid: uid,
      //   displayName: displayName,
      //   image: photoURL,
      // })

      // AUTH => AWS DB


      setUser({
        photoURL,
        displayName,
        email
      })
    })
  }, [])

  return (
    <UserContext.Provider value={user}>
      <Image
        style={styles.image}
        source={{ uri: user.photoURL }} />
      <Text style={styles.text}> {user.displayName} </Text>
    </UserContext.Provider>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
})