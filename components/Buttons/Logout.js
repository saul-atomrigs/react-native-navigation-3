import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { firebase } from '../firebase'

export default function Logout() {
  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut()
      console.log('sign out success')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TouchableOpacity
      onPress={handleSignOut}
    >
      <Text>Sign out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})
