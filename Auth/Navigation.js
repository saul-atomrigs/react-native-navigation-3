import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'
// import { SignedInStack, SignedOutStack } from './Navigation'
// import { firebase } from '../firebase1'
import firebase from 'firebase/app'
import UserProvider from './UserProvider'
import AWS3 from './AWS3'
import Apple from './Apple'
import Google from './Google'
export default function Navigation() {
  const [currentUser, setCurrentUser] = useState('')
  const userHandler = (user) => {
    user ? setCurrentUser(user) : setCurrentUser('')
  }

  useEffect(() => {
    () => firebase.auth().onAuthStateChanged(user => userHandler(user))
  }, [])


  return (
    <>
      {
        currentUser ?

          <>
            <Button
              title='sign out'
              onPress={() => firebase.auth().signOut()} />
          </>

          :

          <>
            <Apple />
            <Google />
            {/* <UserProvider /> */}
          </>

      }
    </>
  )
}