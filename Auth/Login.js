import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppleAuth from './AppleAuth';
import GoogleAuth from './GoogleAuth';
import UserProvider from './UserProvider';

export default function LoginScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <UserProvider />

      <AppleAuth />

      <GoogleAuth />
    </View>
  );
}

export function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      })
  }

  return (
    <>
      <TextInput
        value={email}
        onChengeText={(text) => setEmail(text)}
        name="email"
        placeholder="Enter your email"
        placeholderTextColor={'#666'}
        style={styles.textInput}
        label="Email"
      />
      <TextInput
        value={password}
        onChengeText={(text) => setPassword(text)}
        name="password"
        placeholder="Enter your password"
        placeholderTextColor={'#666'}
        style={styles.textInput}
        label="Password"
        secureTextEntry
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => { signIn }}
        >
          <Text style={styles.floatingBtnText}> Sign In </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.floatingBtnReverse}
          onPress={() => {
            navigation.navigate('Register')
          }}
        >
          <Text style={styles.floatingBtnTextReverse}> Register </Text>
        </TouchableOpacity>
      </View>
    </>

  )
}


// STYLING 
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
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around'
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
  floatingBtnReverse: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 40,
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 100,
    // shadow ios:
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  floatingBtnTextReverse: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    textDecorationLine: 'underline'
  }

})
