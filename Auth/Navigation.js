import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'
import firebase from 'firebase/app'
import UserProvider from './UserProvider'
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
        // IF USER IS LOGGED IN
        currentUser ?

          // SIGN OUT BUTTONN
          <>
            <Button
              title='sign out'
              onPress={() => firebase.auth().signOut()} />
          </>

          :

          // OTHERWISE, GOOGLE & APPLE SIGN IN BUTTONS
          <>
            <Apple />
            <Google />
            {/* <UserProvider /> */}
          </>

      }
    </>
  )
}