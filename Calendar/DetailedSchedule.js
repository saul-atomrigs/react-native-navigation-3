import React from 'react'
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'

export default function DetailedSchedule() {

  const { param } = useRoute().params

  return (
    <View>
      <Text>{param.artist}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
