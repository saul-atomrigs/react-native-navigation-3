import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';

export default function Twitter() {
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
                            style={{ width: WIDTH * 0.08, height: HEIGHT * 0.03, marginRight: WIDTH * 0.05, }}

                            source={require('../assets/icons/logo.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Image
                            style={{ width: WIDTH * 0.08, height: HEIGHT * 0.03, marginRight: WIDTH * 0.05, }}

                            source={require('../assets/icons/dots-nine.png')}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])
    return (
        <WebView
            source={{ uri: 'https://twitter.com/G_I_DLE' }}
            style={{ marginTop: 20 }}
        />
    );
}

// Swiper slide images dimensions
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({})
