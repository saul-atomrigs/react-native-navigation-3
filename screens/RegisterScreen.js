import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function RegisterScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [imageURL, setImageURL] = useState('')

    return (
        <View>
            <Input
                placeholder='Enter your name'
                label='name'
                value={name}
                leftIcon={{ type: 'material', name: 'badge' }}
                onChangeText={(text) => setName(text)}
            />
            <Input
                placeholder='Enter your email'
                label='email'
                leftIcon={{ type: 'material', name: 'badge' }}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label='password'
                leftIcon={{ type: 'material', name: 'badge' }}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Input
                placeholder='Enter your ImageURL'
                label='ImageURL'
                leftIcon={{ type: 'material', name: 'badge' }}
                value={imageURL}
                onChangeText={(text) => setImageURL(text)}
                secureTextEntry
            />
        </View>
    )
}
