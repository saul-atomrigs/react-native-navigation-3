import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'
import Apple from '../Auth/Apple'
import Google from '../Auth/Google'


export default function Notifications() {
  return (
    <View style={styles.container}>
      {
        firebase.auth().currentUser == null ?
          <>
            <Apple />
            <Google />
          </>
          :
          <Text>No Notifications yet</Text>
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
})
