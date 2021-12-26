import React, { useEffect, useState } from 'react'
import { View, Button, StyleSheet, TextInput, TouchableOpacity, Text, } from 'react-native'
import { auth } from '../firebase'
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppleAuth from './AppleAuth';
import GoogleAuth3 from './GoogleAuth3';

// import auth from '@react-native-firebase/auth';
// import { auth } from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }) {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Chat')
      } else {
        // navigation.canGoBack() &&
        // navigation.popToTop()
        null
      }
    })
    return unsubscribe
  }, [])


  return (
    <View style={styles.container}>

      {/* <LoginForm /> */}

      <AppleAuth />

      <GoogleAuth3 />
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
      {/* <ChatScreen /> */}
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
        {/* submit button */}
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


// alternative: 
// const onLogin = async(email, password) => {
//     try{
//         await firebase.auth().signInWithEmailAndPassword(email, password) {
//             console.log('success', email)
//         } catch (error) {
//             alert(error.message)
//     }
// }

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
