import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// @ts-expect-error
import { Agenda } from 'react-native-calendars';
import testIDs from './testIDs';

const getMonthData = () => {
    let loadingData = true
    let dataToReturn = {
        "2021-12-07": [
            { name: "Whats up Food Stuff", start: "2021-12-09T13:45:00", end: "2021-12-09 19:45" }
            , { name: "Whats up second Stuff", start: "2021-12-09T18:45:00", end: "2021-12-09 21:45" }
        ],

        "2021-12-08": [
            { name: "Whats up Food Stuff", start: "2021-12-09T13:45:00", end: "2021-12-09 19:45" }
            , { name: "Whats up second Stuff", start: "2021-12-09T18:45:00", end: "2021-12-09 21:45" }
        ]
    }
    return [dataToReturn, false]
}

export default function AgendaScreen({ props, navigation, route }) {
    const [monthData, loadingData] = getMonthData()

    const renderItem = (item, firstItemInDay) => {
        console.log('rendering', item)
        return (
            <TouchableOpacity>
                <>
                    <Text style={{ color: xtextlink }}>{Moment(item.start).format("hh:mm a")}</Text>
                    <Text style={{ color: '#555' }}>{item.name}</Text>
                </>
            </TouchableOpacity>
        );
    }


    if (loadingData || !monthData) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
    return (

        <View >
            <Agenda
                items={monthData}
                renderItem={(item, firstItemInDay) => { return (renderItem(item, firstItemInDay)) }}
                pastScrollRange={0}
                futureScrollRange={0}
                //renderEmptyData={renderEmptyItem}
                //renderEmptyDate={renderEmptyDate}
                theme={{
                    textDayFontWeight: '900',
                    textMonthFontWeight: '900',
                    todayButtonFontWeight: '900',
                    textDayHeaderFontWeight: '700',
                    calendarBackground: '#FFF2F4',
                    agendaKnobColor: 'gray',
                    'stylesheet.calendar.header': {
                        marginBottom: 80,
                    },
                    // dotColor: 'gray',
                    // 'stylesheet.calendar.header': {
                    //     dayTextAtIndex0: {
                    //         color: 'red'
                    //     },
                    //     dayTextAtIndex1: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex2: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex3: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex4: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex5: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex6: {
                    //         color: 'blue'
                    //     },
                    //     monthText: {
                    //         fontSize: 28,
                    //         color: 'black',
                    //     },
                    // },
                    // 'stylesheet.agenda.header': {
                    //     dayTextAtIndex0: {
                    //         color: 'red'
                    //     },
                    //     dayTextAtIndex1: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex2: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex3: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex4: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex5: {
                    //         color: 'black'
                    //     },
                    //     dayTextAtIndex6: {
                    //         color: 'blue'
                    //     },
                    // }
                }}
            />
        </View>
    );

}
