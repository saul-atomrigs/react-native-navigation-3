import React from 'react'
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import SetupPush3 from '../Notifications/SetupPush3';

export default function DetailedSchedule() {

  const { artist, event, date, id } = useRoute().params

  return (
    <View style={styles.container}>
      <Text>Would you like to get notification for {artist}'s {event} on {date} ?</Text>
      <SetupPush3 style={styles.push} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  push: {
  }
})
