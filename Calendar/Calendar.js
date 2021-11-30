import { useNavigation } from '@react-navigation/core';
import { AirplaneTakeoff, Cake, MusicNote, Television, VideoCamera } from 'phosphor-react-native';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

// export function RootFunction() {
//     const navigation = useNavigation() // extract navigation prop here 

//     return <Calendar navigation={navigation} /> //pass to your component.
// }
export default function Calendar() {
  const items = {
    "2021-11-27": [
      { name: "TWICE", start: "18:45:00", end: "2021-11-29 19:45" }
    ],
    // "2021-11-28": [],
    "2021-11-29": [
      { name: "TWICE", start: "13:45:00", end: "2021-11-29 19:45" }
      , { name: "aespa", start: "18:45:00", end: "2021-11-29 21:45" }
      , { name: "aespa", start: "18:45:00", end: "2021-11-29 21:45" }
    ],
    "2021-11-30": [
      { name: "TWICE", start: "13:45:00", end: "2021-11-29 19:45" }
      , { name: "aespa", start: "18:45:00", end: "2021-11-29 21:45" }
    ],
    // "2021-12-01": [],
  }
  // const monthData = props.monthData
  return (
    <>
      <Agenda
        // testID={testIDs.agenda.CONTAINER} //agenda 
        items={items}
        dayLoading={false}
        // items={monthData}
        // loadItemsForMonth={loadItems}
        // selected={'2021-11-26'}
        renderItem={renderItem}
        // renderEmptyDate={renderEmptyDate}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={rowHasChanged}
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
        style={styles.container}
        hideExtraDays={false}
      />
      <View style={styles.floatingBtn}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('AddSchedule')}
        // onPress={() => {
        //   props.navigation.navigate('AddSchedule')
        // }}
        >
          <Image
            style={{ width: 20, height: 20, resizeMode: 'contain' }}
            source={require('../assets/icons/plus.png')}
          />
          <Text style={{ fontSize: 15, fontWeight: '700' }}>Add schedule</Text>
        </TouchableOpacity>
      </View>
    </ >
  );
}


// loadItems(day) {
//   setTimeout(() => {
//     for (let i = -15; i < 85; i++) {
//       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//       const strTime = timeToString(time);
//       if (!items[strTime]) {
//         items[strTime] = [];
//         const numItems = Math.floor(Math.random() * 3 + 1);
//         for (let j = 0; j < numItems; j++) {
//           items[strTime].push({
//             name: 'Item for ' + strTime + ' #' + j,
//             height: Math.max(50, Math.floor(Math.random() * 150))
//           });
//         }
//       }
//     }
//     const newItems = {};
//     Object.keys(items).forEach(key => {
//       newItems[key] = items[key];
//     });
//     setState({
//       items: newItems
//     });
//   }, 1000);
// }

function renderItem(item) {
  return (
    <TouchableOpacity
      style={[styles.item, { height: item.height }]}
      onPress={() => null}
    >
      <Text style={{ fontWeight: '800' }}>{item.name}</Text>
      {/* <Text>Event starts: {item.start}</Text> */}
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

function renderEmptyDate() {
  return (
    <View style={styles.emptyDate}>
      <Button title='No schedules yet...'
        style={{ backgroundColor: 'pink', width: '50', height: '30' }} />
    </View>
  );
}

function renderEmptyData() {
  return (
    <View style={styles.emptyDate}>
      <Text>No schedules yet...</Text>
    </View>
  );
}

function rowHasChanged(r1, r2) {
  return r1.name !== r2.name;
}

function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}


// styling 
const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
  },
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
    flexDirection: 'row',
    borderColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    position: 'absolute',
    bottom: 100,
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