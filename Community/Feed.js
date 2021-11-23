import React, { Component, Fragment, useLayoutEffect } from 'react'
import { Image, View, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { Text, Avatar, List, ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { Divider } from 'react-native-elements';
import { mapping, light as lightTheme } from '@eva-design/eva'
import { useNavigation } from '@react-navigation/core';
import Firebase, { FirebaseProvider } from '../src/utils'
import AddPost from './AddPost';
import Icon from 'react-native-vector-icons/Ionicons';
// import ActionButton from 'react-native-action-button';

export default function Feed() {
    const navigation = useNavigation();
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.push('DetailedFeed', {
                param: item,
            })}>
            <Divider />
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <TouchableOpacity
                        onPress={() => navigation.push('Home')}
                        style={{ flexDirection: 'row' }}
                    >
                        <Avatar
                            source={{ uri: item.avatarURI }}
                            size='small'
                            style={styles.cardAvatar}
                        />
                        <Text category='p1' style={styles.cardTitle}>
                            {item.postTitle}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                    <Icon style={{ marginRight: 5, marginTop: 5 }} name="ellipse" size={7} color="orange" />
                    <Text category='s1'>{item.randomText}</Text>
                </View>
                <View style={styles.cardStats}>
                    <Text style={styles.cardStatsDetails}>{item.views} Views</Text>
                    <Text style={styles.cardStatsDetails}>{item.likes} Likes</Text>
                    <Text style={styles.cardStatsDetails}>{item.comments} Comments</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
    return (
        <Fragment>
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <FirebaseProvider value={Firebase}>
                    <List
                        style={styles.container}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={DATA.id}
                        maxLength={8}
                    />
                </FirebaseProvider>
            </ApplicationProvider>
        </Fragment>
    )
}

// data 
const DATA = [
    {
        id: 1,
        postTitle: 'aespa',
        avatarURI:
            'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        imageURI:
            'https://pbs.twimg.com/media/FEi4-HRWYAEFDZh?format=jpg&name=900x900',
        randomText:
            'this is title example 1, dlskfjslk sldkfjsldkfj sldie dlkfs!!',
        views: '39',
        likes: '3',
        comments: '2',

    },
    {
        id: 2,
        postTitle: 'BTS 방탄소년단',
        avatarURI:
            'https://media.istockphoto.com/photos/young-asian-woman-with-glitter-makeup-wearing-sporty-fashion-picture-id1286624383',
        imageURI:
            'https://pbs.twimg.com/media/FEkEZ0wX0Akq_MW?format=jpg&name=900x900',
        randomText:
            'this is example 2',
        views: '34',
        likes: '5',
        comments: '1',
    },
    {
        id: 2,
        postTitle: 'BTS 방탄소년단',
        avatarURI:
            'https://media.istockphoto.com/photos/portrait-of-a-young-asian-woman-wearing-street-fashion-picture-id1304661616',
        imageURI:
            'https://pbs.twimg.com/media/FEkEZ0wX0Akq_MW?format=jpg&name=900x900',
        randomText:
            'this is example 2dslfk,sdfjsei? emoji!!❤️❤️',
        views: '102',
        likes: '9',
        comments: '5',
    },
]


//  Styling 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    card: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    cardImage: {
        width: '90%',
        height: 300,
        alignSelf: 'center',
        borderRadius: 13,
    },
    cardHeader: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    cardTitle: {
        marginTop: 5,
    },
    cardAvatar: {
        marginRight: 10,
        marginLeft: 20
    },
    cardContent: {
        marginLeft: 50,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        color: 'gray',
        flexDirection: 'row',
    },
    cardStats: {
        flexDirection: 'row',
        marginLeft: 5,
        marginTop: 5,
        justifyContent: 'flex-end'
    },
    cardStatsDetails: {
        marginRight: 20,
        marginBottom: 10,
        fontSize: 12,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

})