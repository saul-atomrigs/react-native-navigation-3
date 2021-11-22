import React, { Component } from 'react'
import { Image, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { Text, Avatar, List, ApplicationProvider } from '@ui-kitten/components'
import { mapping, light as lightTheme } from '@eva-design/eva'

// import { withFirebaseHOC } from '../utils'

export default function MyFeed() {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                // source={{ uri: item.postPhoto.uri }}
                source={{ uri: item.avatarURI }}
                style={styles.cardImage}
            />
            <View style={styles.cardHeader}>
                <Text category='s1' style={styles.cardTitle}>
                    {item.postTitle}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}>
                    <Avatar
                        source={{
                            uri:
                                'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                        }}
                        size='small'
                        style={styles.cardAvatar}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
                <Text category='p2'>{item.postDescription}</Text>
            </View>
        </View>
    )

    // if (DATA != null) {
    return (
        // <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <>
            <Text>dslk</Text>
        </>
        /* <List
            style={styles.container}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={DATA.id}
        // refreshing={isRefreshing}
        // onRefresh={() => this.onRefresh()}
        /> */
        // </ApplicationProvider>

    )
    // } else
    //     return (
    //         <ApplicationProvider mapping={mapping} theme={lightTheme}>

    //             <View
    //                 style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //                 <ActivityIndicator size='large' />
    //             </View>
    //         </ApplicationProvider>

    //     )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        // backgroundColor: theme['color-basic-100'],
        marginBottom: 25
    },
    cardImage: {
        width: '100%',
        height: 300
    },
    cardHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardTitle: {
        // color: theme['color-basic-1000']
    },
    cardAvatar: {
        marginRight: 16
    },
    cardContent: {
        padding: 10,
        borderWidth: 0.25,
        // borderColor: theme['color-basic-600']
    }
})



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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
    {
        id: 2,
        postTitle: 'BTS 방탄소년단',
        avatarURI:
            'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        imageURI:
            'https://pbs.twimg.com/media/FEkEZ0wX0Akq_MW?format=jpg&name=900x900',
        randomText:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sdlfa;sdkf   sdlfkjslfkjdsfie  sldjfid'
    }
]
