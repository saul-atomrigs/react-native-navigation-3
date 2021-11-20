import React, { Component, Fragment } from 'react'
import { Image, View, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { Text, Avatar, List, ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { Divider } from 'react-native-elements';
import { mapping, light as lightTheme } from '@eva-design/eva'
import Firebase, { FirebaseProvider } from '../src/utils'
import AddPost from './AddPost';
export default function Feeds() {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imageURI }}
                style={styles.cardImage} />
            <View style={styles.cardHeader}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Profile')}>
                    <Avatar
                        source={{ uri: item.avatarURI }}
                        size='small'
                        style={styles.cardAvatar}
                    />
                </TouchableOpacity>
                <Text category='s1' style={styles.cardTitle}>
                    {item.postTitle}
                </Text>
            </View>
            <View style={styles.cardContent}>
                <Text category='p2'>{item.randomText}</Text>
            </View>
            <View style={styles.cardStats}>
                <Text style={styles.cardStatsDetails}>3 Likes</Text>
                <Text style={styles.cardStatsDetails}>2 Comments</Text>
            </View>
            <Divider />
        </View>
    )

    return (
        <Fragment>
            {/* <IconRegistry icons={EvaIconsPack} /> */}
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <FirebaseProvider value={Firebase}>
                    <Button
                        title="Add a post"
                        onPress={() => this.props.navigation.navigate('AddPost')}
                    />
                    <AddPost />
                    <List
                        style={styles.container}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={DATA.id}
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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    }
]



//  Styling 
// export default Feed = withStyles(_Feed, theme => ({
// styled-component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    card: {
        // backgroundColor: theme['color-basic-100'],
        // marginBottom: 25,
    },
    cardImage: {
        marginTop: 20,
        width: '90%',
        height: 300,
        alignSelf: 'center',
        borderRadius: 13,
    },
    cardHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    cardTitle: {
        // color: theme['color-basic-1000']
    },
    cardAvatar: {
        marginRight: 10,
        marginLeft: 20
    },
    cardContent: {
        marginLeft: 20,
        marginRight: 20,
        color: 'gray',
        // borderWidth: 0.25,
        // borderColor: theme['color-basic-600']
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
    }
})
// }))
