import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native'

export default function Welcome() {
  const navigation = useNavigation()
  return (
    <View style={styles.component}>
      <Text>Welcome!</Text>
      <Button
        title="Go to Posts"
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
