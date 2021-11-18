// firebase + GiftedChat 
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db } from '../firebase'


export default function Connect({ navigation }) {
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            // sign out successful
        }).catch(error => {
            // sign out failed
        })
    }
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
            )
        })
        navigation.setOptions(() => {
            headerLeft: () => (
                <View>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    />
                </View>
            )
            headerRight: () => (
                <TouchableOpacity onPress={signOut}>
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            )
        })
        return () => {
            unsubscribe()
        }
    }, [])
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user,
        } = messages[0]
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user,
        })
    }, [])

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL,
            }}
        />
    )
}
