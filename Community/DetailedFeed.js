import { useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Avatar, ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import CommentInput from '../Components/CommentInput'
export default function DetailedFeed() {
    const { param } = useRoute().params
    const navigation = useNavigation();
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

        <>
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <TouchableOpacity
                                onPress={() => navigation.push('Home')}
                                style={{ flexDirection: 'row' }}
                            >
                                <Text style={styles.cardTitle}>
                                    {param.postTitle}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={{ fontSize: 18, fontWeight: '700' }} >{param.randomText}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={{ fontWeight: '500' }}>{param.randomText}</Text>
                            <Image source={{ uri: param.imageURI }} style={{ height: '80%', width: '100%' }} />
                        </View>
                        <View style={styles.cardStats}>
                            <Text style={styles.cardStatsDetails}>{param.views} Views</Text>
                            <Text style={styles.cardStatsDetails}>{param.likes} Likes</Text>
                            <Text style={styles.cardStatsDetails}>{param.comments} Comments</Text>
                        </View>
                    </View>
                </ScrollView>
                <CommentInput />
            </View>
            {/* <SafeAreaView style={{ flex: 1 }}> */}
            {/* </SafeAreaView> */}
        </>
        // </ApplicationProvider >
    )
}


// dimensions
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.05,
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 9,
    },
    card: {
        marginTop: 10,
        backgroundColor: '#fff',
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
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
