import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// @ts-expect-error
import { Agenda } from 'react-native-calendars';
import testIDs from './testIDs';

export default class Calendar extends Component {
    state = {
        items: {}
    };

    render() {
        return (
            // <SafeAreaProvider>
            // <SafeAreaView style={{ width: '100%', height: '100%', }}>
            <Agenda
                testID={testIDs.agenda.CONTAINER} //agenda 
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                // selected={'2021-11-26'}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                showClosingKnob={true}
                markingType={'period'}
                // markedDates={{
                //     '2017-05-08': { textColor: '#43515c' },
                //     '2017-05-09': { textColor: '#43515c' },
                //     '2017-05-14': { startingDay: true, endingDay: true, color: 'blue' },
                //     '2017-05-21': { startingDay: true, color: 'blue' },
                //     '2017-05-22': { endingDay: true, color: 'gray' },
                //     '2017-05-24': { startingDay: true, color: 'gray' },
                //     '2017-05-25': { color: 'gray' },
                //     '2017-05-26': { endingDay: true, color: 'gray' }
                // }}
                // monthFormat={'mm'}
                markedDates={{
                    // '2021-11-26': { selected: true, selectedColor: 'black', textColor: 'white' }
                }}
                theme={{
                    textDayFontWeight: '900',
                    textMonthFontWeight: '900',
                    todayButtonFontWeight: '900',
                    textDayHeaderFontWeight: '700',
                    calendarBackground: 'pink',
                    agendaKnobColor: 'gray',
                    // dotColor: 'gray',
                }}
                renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}
                hideExtraDays={false}
            // style={{ marginBottom: 80 }}
            />

            // </SafeAreaView>
            // </SafeAreaProvider>
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
                testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert(item.name)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
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
    }
});