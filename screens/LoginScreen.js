import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

export default function CommunityScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View >
            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChengeText={(text) => setEmail(text)}
            />
            <ChatScreen />
            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChengeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button title='chat' onPress={() => navigation.navigate('Chat')} />
            <Button title='sign in' />
            <Button title='register' onPress={() => navigation.navigate('Register')} />
        </View>
    );
}