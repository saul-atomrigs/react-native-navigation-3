import React from 'react'
import { StyleSheet, Text, Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function SignedOut() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text>Successfully signed out!</Text>
      <Button
        title='Back to DailyKpop'
        onPress={() => navigation.replace('HomeTabNavigation')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
