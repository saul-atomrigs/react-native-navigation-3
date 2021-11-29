import React, { useLayoutEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommentInput from '../Components/CommentInput';
import { Avatar } from 'react-native-elements';
import { CommunityData } from '../data/CommunityData';
// import RefreshControl from '../Components/RefreshControl';
import { POSTS } from '../data/posts'
import Post from '../Components/Post';


export default function DetailedFeed() {
    const { param } = useRoute().params
    const navigation = useNavigation();

    // Refresh Control 
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
            // header button left
            headerTitleAlign: 'left',
            // header button right
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Image
                            style={headerRightButtons}
                            source={require('../assets/icons/logo.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Image
                            style={headerRightButtons}
                            source={require('../assets/icons/dots-nine.png')}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])

    return (
        // <ApplicationProvider {...eva} theme={eva.light}>
        <KeyboardAwareScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <TouchableOpacity
                            onPress={() => navigation.push('Home')}
                            style={{ flexDirection: 'row' }}
                        >
                            <Avatar
                                rounded
                                // source={{ uri: item.avatarURI }}
                                source={{ uri: param.avatarURI }}
                                containerStyle={styles.cardAvatar}
                            />
                            <Text style={styles.cardTitle}>
                                {param.postTitle}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={{ fontSize: 18, fontWeight: '700' }} >{param.randomText}</Text>
                        {/* <Image source={{ uri: param.imageURI }} style={styles.cardImage} /> */}
                        <Text style={{ fontWeight: '500', marginVertical: 20 }}>{param.randomText}</Text>
                    </View>
                    <View style={styles.cardStats}>
                        <Text style={styles.cardStatsDetails}>{param.views} Views</Text>
                        <Text style={styles.cardStatsDetails}>{param.likes} Likes</Text>
                        <Text style={styles.cardStatsDetails}>{param.comments} Comments</Text>
                    </View>
                    <View>
                    </View>
                    <CommentInput />
                    <Text>

                    </Text>
                </View>
            </View>
        </KeyboardAwareScrollView>
        // </ApplicationProvider >
    )
}

// <View>
// {POSTS.map((post, index) => {
//     <Post post={post} key={index} />
// })}
// </View>

// Refresh Control 
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// Comment section 
// const CommentSection = ({ param }) => {
//     return (
//         <Text>
//             {param.commentsSection.length > 1 ? param.commentsSection[0].comment : 'comment'}
//         </Text>
//     )
// }


// dimensions
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.03,
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 5,
    },
    card: {
        marginTop: 10,
        backgroundColor: '#fff',
        flex: 5,
    },
    cardImage: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.3,
        // alignSelf: 'center',
        borderRadius: 13,
        resizeMode: 'cover'
    },
    cardAvatar: {
        marginRight: 10,
        marginLeft: 20
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 10,
        paddingVertical: 5,
        color: '#fff',
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
    textInput: {
        position: 'absolute',
        height: HEIGHT * 0.05,
        width: WIDTH * 0.9,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: '#fff',
        padding: 13,
    },
    newsArticleCommentInput: {
        height: 40,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: '#fff',
        padding: 10,
    }
})
