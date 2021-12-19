import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
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
        <WebView
            // source={{ uri: 'https://entertain.naver.com/home' }}
            source={{ uri: 'https://papago.naver.net/website?locale=en&source=auto&target=en&url=https%3A%2F%2Fentertain.naver.com%2Fhome' }}
            style={{ marginTop: 20 }}
        />
    );
}

// Swiper slide images dimensions
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.04,
    marginRight: WIDTH * 0.05,
}

const styles = StyleSheet.create({})
