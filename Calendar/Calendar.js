import { useNavigation } from '@react-navigation/core';
import { AirplaneTakeoff, Cake, MusicNote, Television, VideoCamera } from 'phosphor-react-native';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

// export function RootFunction() {
//     const navigation = useNavigation() // extract navigation prop here 

//     return <Calendar navigation={navigation} /> //pass to your component.
// }
export default class Calendar extends Component {
    state = {
        items: {
            "2021-11-27": [
                { name: "TWICE", start: "18:45:00", end: "2021-11-29 19:45" }
            ],
            "2021-11-28": [],
            "2021-11-29": [
                { name: "TWICE", start: "13:45:00", end: "2021-11-29 19:45" }
                , { name: "aespa", start: "18:45:00", end: "2021-11-29 21:45" }
                , { name: "aespa", start: "18:45:00", end: "2021-11-29 21:45" }
            ],
            "2021-11-30": [
                { name: "TWICE", start: "13:45:00", end: "2021-11-29 19:45" }
                , { name: "aespa", start: "18:45:00", end: "2021-11-29 21:45" }
            ],
            "2021-12-01": [],
        }
    };
    render() {
        // const monthData = this.props.monthData
        return (
            <>
                <Agenda
                    // testID={testIDs.agenda.CONTAINER} //agenda 
                    items={this.state.items}
                    // items={monthData}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    // selected={'2021-11-26'}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    showClosingKnob={true}
                    markingType={'custom'}
                    theme={{
                        textDayFontWeight: '900',
                        textMonthFontWeight: '900',
                        todayButtonFontWeight: '900',
                        textDayHeaderFontWeight: '700',
                        calendarBackground: '#fff',
                        agendaKnobColor: 'gray',
                        'stylesheet.calendar.header': {
                            marginBottom: 80,
                        },
                    }}
                    hideExtraDays={false}
                />
                <TouchableOpacity style={styles.floatingBtn}
                    // onPress={() => navigation.navigate('AddSchedule')}
                    onPress={() => {
                        this.props.navigation.navigate('AddSchedule')
                    }}>
                    <Image
                        style={{ width: 30, height: 30, resizeMode: 'contain' }}
                        source={require('../assets/icons/plus.png')}
                    />
                </TouchableOpacity>
            </ >
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                style={[styles.item, { height: item.height }]}
                onPress={() => null}
            >
                <Text style={{ fontWeight: '800' }}>{item.name}</Text>
                <Text>Event starts: {item.start}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <AirplaneTakeoff />
                    <Text>World Tour / International Schedules</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Cake />
                    <Text>Birthday / Anniversaries </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <MusicNote />
                    <Text>Release</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Television />
                    <Text>TV Schedule</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <VideoCamera />
                    <Text>Movie / TV Show</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Button title='Add schedule / anniversary / events'
                    style={{ backgroundColor: 'pink', width: '50', height: '30' }} />
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}


// styling 
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 13,
        padding: 10,
        // marginRight: 10,
        marginTop: 10
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    floatingBtn: {
        borderWidth: 1,
        borderColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 120,
        right: 30,
        backgroundColor: 'pink',
        borderRadius: 100,
        // shadow ios:
        shadowColor: 'lightgray',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // shadow android: 
        elevation: 0.8,
    }
});