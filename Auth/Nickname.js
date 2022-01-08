import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { CheckCircle } from 'phosphor-react-native'
import { useRoute } from '@react-navigation/native'

export default function Nickname() {
  const { param } = useRoute().params

  return (
    <View style={styles.component}>
      <Text style={styles.text}>Welcome, {param} </Text>
      <Text style={styles.text}>Choose your nickname. </Text>
      <TextInput
        style={styles.textInput}
      />
      <TouchableOpacity onPress={
        // addComment
        null
      }>
        <CheckCircle size={50} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 23,
    color: 'gray',
  },
  textInput: {
    // borderWidth: 1,
    marginVertical: 20,
    marginHorizontal: 5,
    width: "90%",
    fontSize: 15,
    color: '#000',
    borderRadius: 10,
    backgroundColor: "#eee",
    padding: 10,
    height: 50,
  }
})
