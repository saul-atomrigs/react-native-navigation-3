import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Text } from 'react-native'
import { WebView } from 'react-native-webview';
import CommentInput from '../Components/CommentInput';

export default function Discover() {
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
    let JS = '<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>';

    let source = JS + '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">aespa rehearsing ‘Savage’ ahead of the Macy’s Thanksgiving Day Parade, which will be held on November 25th!<br><br>aespa and various other performers participated in rehearsals earlier this evening<a href="https://twitter.com/hashtag/aespa?src=hash&amp;ref_src=twsrc%5Etfw">#aespa</a> <a href="https://twitter.com/hashtag/%EC%97%90%EC%8A%A4%ED%8C%8C?src=hash&amp;ref_src=twsrc%5Etfw">#에스파</a><a href="https://twitter.com/aespa_official?ref_src=twsrc%5Etfw">@aespa_official</a> <br><br> <a href="https://t.co/LCqW1g6v1C">pic.twitter.com/LCqW1g6v1C</a></p>&mdash; aespresso (semi-ia) (@aespresso_SM) <a href="https://twitter.com/aespresso_SM/status/1463050607728549889?ref_src=twsrc%5Etfw">November 23, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';

    return (
        <WebView
            source={{ html: source }}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={true}
            style={{ height: HEIGHT, WIDTH, resizeMode: 'cover', flex: 1 }}
            scalesPageToFit={true}
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
