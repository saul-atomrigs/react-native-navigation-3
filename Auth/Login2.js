import { useState, useEffect } from 'react';
import React from 'react';
import { Button } from 'react-native';
import { signInWithGoogle } from './GoogleAuth5';
import firebase from './GoogleAuth5';


export default function Login2() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  console.log(user);

  return (
    <>
      <Login />
    </>
  );
}

export const Login = () => {
  return (
    <>
      <Button
        title="Login with Google"
        onPress={signInWithGoogle}
      />
    </>
  )
}
