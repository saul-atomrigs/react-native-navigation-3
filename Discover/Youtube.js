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
            source={{ uri: 'https://www.youtube.com/watch?v=ORAdcQNyNTs' }}
            style={{ marginTop: 5 }}
        />
    );
}

// Swiper slide images dimensions
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.05,
}

const styles = StyleSheet.create({})
