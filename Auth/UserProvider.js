import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { listUsers } from '../src/graphql/queries'
Amplify.configure(config)

export const UserContext = createContext({ user: null })
export default ({ props }) => {
  const [user, setUser] = useState([])

  // FETCH USER
  async function fetchUser() {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers,))
      setUser(userData.data.listUsers.items)
      console.log('🚀 listUsers: ', userData)
    } catch (err) {
      console.log('error fetching 에러!!', err)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      {
        user
          ?
          <>
            {
              user.map((eachUser, index) => {
                return (
                  <View key={eachUser.id ? eachUser.id : index}>
                    <Text>
                      {eachUser.nickname}
                    </Text>
                  </View>
                )
              })
            }
            <UserContext.Provider value={user}>
              <Image
                style={styles.image}
                source={{ uri: user.photoURL }} />
              <Text style={styles.text}> {user.uid} </Text>
            </UserContext.Provider>
          </>
          :
          'loading...'
      }
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
})
