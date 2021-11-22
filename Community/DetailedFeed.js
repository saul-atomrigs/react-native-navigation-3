import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DetailedFeed() {
    return (
        <View style={styles.container}>
            <Text>DetailedFeed</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
})
