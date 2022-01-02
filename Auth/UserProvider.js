import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Image, Text } from "react-native";
import firebase from 'firebase'
import { db } from "../firebase1";

export const UserContext = createContext({ user: null })

export default ({ props }) => {

  const [user, setUser] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      const { photoURL, displayName, email } = user;

      var uid = user.uid;
      console.log('token : ', uid)

      // AUTH => FIREBASE DB
      db.collection('users').add({
        uid: uid
      })

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