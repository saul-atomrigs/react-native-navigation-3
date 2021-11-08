import React, { useState } from 'react'
import { View, Button } from 'react-native'
import { Input } from 'react-native-elements'
import { auth } from '../firebase'

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [imageURL, setImageURL] = useState('')
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // signed in 
                userCredential.user.updateProfile({
                    displayName: name,
                    photoURL: imageURL ? imageURL :
                        "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
                }).then(function () {
                    // update successful
                }).catch(function (error) {
                    // An error happened.
                });
                navigation.popToTop()
            })
            .catch(error => alert(error.message))
    }
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
            <Button
                title="register"
                onPress={() => { register }}
            />
        </View>
    )
}
