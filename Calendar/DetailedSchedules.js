import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
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


// styling 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 66,
        height: 58,
    },
});
