import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import firebase from 'firebase'
import Apple from '../Auth/Apple'
import Google from '../Auth/Google'
import { useNavigation } from '@react-navigation/native'

export default function Notifications() {

  const navigation = useNavigation()

  function signOut() {
    alert('signing out')
    firebase.auth().signOut();
    navigation.reset({ index: 0, routes: [{ name: 'SignedOut' }] })
  }

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
