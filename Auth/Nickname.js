import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { CheckCircle } from 'phosphor-react-native'

// AWS 
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import config from '../src/aws-exports'
import { createUser } from '../src/graphql/mutations'
import { getUser } from '../src/graphql/queries'

Amplify.configure(config)

export default function Nickname() {
  const [uid, setUid] = useState('')
  const [nickname, setNickname] = useState([])
  const [formStateNickname, setFormStateNickname] = useState({ nickname: '' })

  const { param } = useRoute().params // uid
  const navigation = useNavigation()

  // SAVE USER DATA TO SECURE STORAGE
  // const saveUserDataInStorage = async () => {
  //   try {
  //     await SecureStore.setItemAsync('nickname', formStateNickname.nickname)
  //     await SecureStore.setItemAsync('uid', param)
  //     await SecureStore.setItemAsync('credential', credential)

  //     console.log(credential, '닉네임 크레덴셜')
  //   } catch (e) {
  //     console.log(e
  //   }
  // }

  // ADD USER NICKNAME TO DYNAMO DB
  async function addUserToDynamoDB() {
    try {
      const user = { ...formStateNickname }
      setNickname([...nickname, user])
      setFormStateNickname({ nickname: '' })
      const result = await API.graphql(graphqlOperation(
        createUser,
        {
          input: {
            nickname: user.nickname,
            id: param
          }
        }
      ))
      setNickname([...nickname, result.data.createUser])
    } catch (err) {
      console.log('error creating 에러!!', err)
    }
  }
  function setInputNickname(key, value) {
    setFormStateNickname({ ...formStateNickname, [key]: value })
  }

  // GET USER UID FROM DYNAMO DB
  async function getUserNickname() {
    try {
      const result = await API.graphql(graphqlOperation(
        getUser, { id: param }
      ))
      setUid(result.data.getUser.id)
    } catch (err) {
      console.log('error getting 에러!!', err)
    }
  }
  useEffect(() => {
    getUserNickname()
  }, [])

  return (
    // IF USER EXISTS IN FIREBASE AUTHENTICATION
    <>
      {
        param == uid ?
          navigation.goBack()
          :
          // IF USER DOES NOT EXIST IN DYNAMO DB
          <ScrollView
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.component}>
              <Text style={styles.text}>Welcome to DailyKpop, </Text>
              <Text style={styles.text}>Choose your nickname. </Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setInputNickname('nickname', text)}
                value={nickname}
                placeholder='Nickname'
              />
              <TouchableOpacity
                // disabled={formStateNickname.content.length === 0}
                onPress={() => {
                  addUserToDynamoDB()
                  // saveUserDataInStorage()
                  navigation.replace('Welcome', { nickname: nickname })
                }
                }
              >
                <CheckCircle size={50} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alert(eula)}
              >
                <Text
                  style={styles.terms}
                >by signing up you agree to terms and conditions</Text>
              </TouchableOpacity>
            </View >
          </ScrollView>
      }
    </>

  )
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
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
  },
  terms: {
    fontSize: 13,
    color: 'blue',
    marginVertical: 20,
  }
})

export const eula = `
End-User License Agreement (EULA) of DailyKpop
This End-User License Agreement ("EULA") is a legal agreement between you and DailyKpop. Our EULA was created by EULA Template for DailyKpop.

This EULA agreement governs your acquisition and use of our DailyKpop software ("Software") directly from DailyKpop or indirectly through a DailyKpop authorized reseller or distributor.

Please read this EULA agreement carefully before completing the installation process and using the DailyKpop software. It provides a license to use the DailyKpop software and contains warranty information and liability disclaimers.

If you register for a free trial of the DailyKpop software, this EULA agreement will also govern that trial. By clicking "accept" or installing and/or using the DailyKpop software, you are confirming your acceptance of the Software and agreeing to become bound by the terms of this EULA agreement.

If you are entering into this EULA agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these terms and conditions. If you do not have such authority or if you do not agree with the terms and conditions of this EULA agreement, do not install or use the Software, and you must not accept this EULA agreement.

This EULA agreement shall apply only to the Software supplied by DailyKpop herewith regardless of whether other software is referred to or described herein. The terms also apply to any DailyKpop updates, supplements, Internet-based services, and support services for the Software, unless other terms accompany those items on delivery. If so, those terms apply.

License Grant
DailyKpop hereby grants you a personal, non-transferable, non-exclusive licence to use the DailyKpop software on your devices in accordance with the terms of this EULA agreement.

You are permitted to load the DailyKpop software (for example a PC, laptop, mobile or tablet) under your control. You are responsible for ensuring your device meets the minimum requirements of the DailyKpop software.

You are not permitted to:

Edit, alter, modify, adapt, translate or otherwise change the whole or any part of the Software nor permit the whole or any part of the Software to be combined with or become incorporated in any other software, nor decompile, disassemble or reverse engineer the Software or attempt to do any such things
Reproduce, copy, distribute, resell or otherwise use the Software for any commercial purpose
Allow any third party to use the Software on behalf of or for the benefit of any third party
Use the Software in any way which breaches any applicable local, national or international law
use the Software for any purpose that DailyKpop considers is a breach of this EULA agreement
Intellectual Property and Ownership
DailyKpop shall at all times retain ownership of the Software as originally downloaded by you and all subsequent downloads of the Software by you. The Software (and the copyright, and other intellectual property rights of whatever nature in the Software, including any modifications made thereto) are and shall remain the property of DailyKpop.

DailyKpop reserves the right to grant licences to use the Software to third parties.

Termination
This EULA agreement is effective from the date you first use the Software and shall continue until terminated. You may terminate it at any time upon written notice to DailyKpop.

It will also terminate immediately if you fail to comply with any term of this EULA agreement. Upon such termination, the licenses granted by this EULA agreement will immediately terminate and you agree to stop all access and use of the Software. The provisions that by their nature continue and survive will survive any termination of this EULA agreement.

Governing Law
This EULA agreement, and any dispute arising out of or in connection with this EULA agreement, shall be governed by and construed in accordance with the laws of kr.
`
