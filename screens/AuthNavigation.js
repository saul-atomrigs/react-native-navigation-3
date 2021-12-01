import React, { useState, useEffect } from 'react'
import { SignedInStack, SignedOutStack } from './Navigation'
import { firebase } from './firebase'
export default function AuthNavigation() {
  const [currentUser, setCurrentUser] = useState(null)
  const userHandler = (user) => {
    user ? setCurrentUser(user) : setCurrentUser(null)
  }

  useEffect(() => {
    () => firebase.auth().onAuthStateChanged(user => userHandler(user))
  }, [])

  return (
    <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
  )
}