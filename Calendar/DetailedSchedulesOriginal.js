import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { StyleService } from '@ui-kitten/components';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
export default function DetailedSchedules() {
    const { param, uri, title } = useRoute().params;
    return (
        <>
            <Agenda
                // Collection of dates that have to be marked. Default = {}
                markedDates={{
                    '2021-11-21': { selected: true, marked: true, selectedColor: 'blue' },
                    '2021-11-22': { marked: true },
                    '2021-11-23': { marked: true, dotColor: 'red', activeOpacity: 0 },
                    '2021-11-24': { disableTouchEvent: true }
                }}
            />
            <ScrollView>
                {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{param}</Text> */}
                {/* <Image style={styles.logo} source={{ uri: uri }} /> */}
                {/* <Calendar style={styles.calendar} /> */}
                <Text style={{ margin: 20, fontSize: 20, fontWeight: 'bold' }}>{date}{title}</Text>
            </ScrollView>
        </>
    );
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

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
