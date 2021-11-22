import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DetailedSchedules() {
    const { param, uri } = useRoute().params;
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{param}</Text>
                <Image style={styles.logo} source={{ uri: uri }} />
            </View>
        </ScrollView>
    );
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


// styling 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.5,
    },
});
