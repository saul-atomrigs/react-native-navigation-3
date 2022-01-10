import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { CheckCircle } from 'phosphor-react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

// AWS 
import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createUser } from '../src/graphql/mutations'
import { listUsers } from '../src/graphql/queries'
Amplify.configure(config)

export default function Nickname() {
  const { param } = useRoute().params
  const navigation = useNavigation()

  const [formStateNickname, setFormStateNickname] = useState({ nickname: '' })
  const [nickname, setNickname] = useState([])

  // ADD USER NICKNAME TO DYNAMO DB
  async function addUser() {
    try {
      const user = { ...formStateNickname }
      setNickname([...nickname, user])
      setFormStateNickname({ nickname: '' })
      const result = await API.graphql(graphqlOperation(
        createUser,
        {
          // input: user
          input: {
            nickname: user.nickname,
            // userPostId: user.id
          }
        }
      ))
      setNickname([...nickname, result.data.createUser])
      console.log('🚀 createUser: ', result)
    } catch (err) {
      console.log('error creating 에러!!', err)
    }
  }

  function setInputNickname(key, value) {
    setFormStateNickname({ ...formStateNickname, [key]: value })
  }


  return (
    <View style={styles.component}>
      <Text style={styles.text}>Welcome, {param} </Text>
      <Text style={styles.text}>Choose your nickname. </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setInputNickname('nickname', text)}
        value={nickname}
        placeholder='Nickname'
      />
      <TouchableOpacity
        onPress={() => {
          addUser()
          navigation.navigate('HomeTabNavigation', { nickname: nickname })
        }
          // ADD USER TO FIRESTORE DB
          // () => {
          //   db.collection('users').doc(nickname).set({
          //     nickname: nickname,
          //     displayName: param,
          //     uid: auth.currentUser.uid
          //   })
          //   navigation.navigate('HomeTabNavigation')
          // }

          // ADD USER TO DYNAMO DB
          // ,
        }
      >
        <CheckCircle size={50} />
      </TouchableOpacity>
    </View >
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
