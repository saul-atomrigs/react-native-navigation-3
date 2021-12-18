import { User } from 'phosphor-react-native'
import React, { useState } from 'react'
import { View, Button, StyleSheet, TextInput, TouchableOpacity, Text, } from 'react-native'
import { Input } from 'react-native-elements'
import { auth } from '../firebase'

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [imageURL, setImageURL] = useState('')

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // SIGNED IN 
        userCredential.user.updateProfile({
          displayName: name,
          photoURL: imageURL ? imageURL :
            "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
        }).then(function () {
          // update successful
        }).catch(function (error) {
          // An error happened.
        });
        navigation.popToTop()
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        name="name"
        placeholder="usename"
        style={styles.textInput}
        placeholderTextColor='#666'
        autoCompleteType="off"
        autoCorrect={false}
        // leftIcon={<User />}
        leftIcon={{ type: 'material', name: 'badge' }}
        label='name'
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Enter your email'
        style={styles.textInput}
        placeholderTextColor='#666'
        autoCompleteType="off"
        autoCorrect={false}
        label='email'
      />
      <TextInput
        placeholder='Enter your password'
        label='password'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.textInput}
        placeholderTextColor='#666'
        autoCompleteType="off"
        autoCorrect={false}
      />
      <TextInput
        placeholder='Confirm your password'
        label='ImageURL'
        leftIcon={{ type: 'material', name: 'badge' }}
        // secureTextEntry
        style={styles.textInput}
        placeholderTextColor='#666'
        autoCompleteType="off"
        autoCorrect={false}
      />

      {/* submit button */}
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          addItem();
          goBack();
          forceUpdate();
        }}
      >
        <View style={styles.floatingBtn}>
          <Text style={styles.floatingBtnText}> Register </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    height: 50,
    width: 300,
    borderColor: '#e6e6e6',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    marginBottom: 30,
  },
  floatingBtn: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 40,
    position: 'relative',
    backgroundColor: 'black',
    borderRadius: 100,
    // shadow ios:
    shadowColor: 'lightgray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // shadow android: 
    elevation: 0.8,
  },
  floatingBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    textDecorationLine: 'underline'
  },
})
