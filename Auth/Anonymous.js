import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase/app'

export default function Anonymous() {

  firebase.auth().signInAnonymously()
    .then(() => {
      console.log('🚀 SIGNED IN')
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode)
    })

  return (
    <View>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({})
