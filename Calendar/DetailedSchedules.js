import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
export default function DetailedSchedules() {
    const { param, uri, title } = useRoute().params;
    return (
        <ScrollView>
            {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{param}</Text> */}
            {/* <Image style={styles.logo} source={{ uri: uri }} /> */}
            <Calendar style={styles.calendar} />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{date}{title}</Text>
        </ScrollView>
    );
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

// styling 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendar: {
        marginVertical: 10,

    },
    logo: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.5,
    },
});
