import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            })
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('Chat')
            } else {
                navigation.canGoBack() &&
                    navigation.popToTop()
            }
        })
        return unsubscribe
    }, [])
    return (
        <View >
            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChengeText={(text) => setEmail(text)}
            />
            {/* <ChatScreen /> */}
            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChengeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button title='chat' onPress={() => navigation.navigate('Chat')} />
            <Button title='sign in' onPress={{ signIn }} />
            <Button title='register' onPress={() => navigation.navigate('Register')} />
        </View>
    );
}


// alternative: 
// const onLogin = async(email, password) => {
//     try{
//         await firebase.auth().signInWithEmailAndPassword(email, password) {
//             console.log('success', email)
//         } catch (error) {
//             alert(error.message)
//     }
// }