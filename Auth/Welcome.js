import React, { useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native'

import UserProvider, { UserContext } from './UserProvider';

export default function Welcome() {
  const navigation = useNavigation()
  const param = useRoute().params

  const { userName, setUserName } = useContext(UserContext);
  console.log('유저:', userName);

  // function UserInfo() {
  //   const { userName } = useContext(UserContext);
  //   return (
  //     <>
  //       <Text>{userName}</Text>
  //     </>
  //   )
  // }

  return (
    <View style={styles.component}>
      <Text>Welcome,</Text>
      {/* <Text>{param}</Text> */}

      <Button
        title="Keep navigating on DailyKpop"
        onPress={() => navigation.navigate('HomeTabNavigation')}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
