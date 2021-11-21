import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function SalonListDetails({ navigation, route }) {
    // const { item } = route.params
    return (
        <View style={{ flex: 1 }}>
            <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
