import React from 'react';
import { AirplaneTakeoff, Cake, HandsClapping, MusicNote, Plus, Star, Television, VideoCamera } from 'phosphor-react-native';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';


export default function Calendar() {
  const navigation = useNavigation()

  function renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height, marginRight: 20 }]}
        // onPress={() => navigation.push('DetailedSchedule', { param: item })}
        onPress={() => null}
      >
        <Text style={styles.artist}>{item.artist}</Text>
        <View style={styles.eventContainer}>
          <View>{item.icon}</View>
          <Text style={styles.event}>{item.event}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.stats}>
          {/* <HandsClapping /> */}
          <Star color='pink' />
        </View>
      </TouchableOpacity>
    );
  }

  const items = {
    "2021-12-12": [
      {
        artist: "aespa",
        event: 'tv show on MBC',
        icon: <Television />,
      },
      {
        artist: "BTS",
        event: 'Birthday',
        icon: <Cake />,
      }
    ],
    "2021-12-13": [
      {
        artist: "aespa",
        event: 'tv show on MBC',
        icon: <Television />,
      },
      {
        artist: "BTS",
        event: 'Birthday',
        icon: <Cake />,
      }
    ],
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
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate('AddSchedule')}
      >
        <View style={styles.floatingBtn}>
          <Plus color="pink" size={20} />
          <Text style={{ fontSize: 15, fontWeight: '700', color: 'pink' }}>Add schedule</Text>
        </View>
      </TouchableOpacity>
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
//             artist: 'Item for ' + strTime + ' #' + j,
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


function renderEmptyDate() {
  // const navigation = useNavigation();
  return (
    <View style={styles.emptyDate}>
      <Button title='No schedules yet...'
        // onPress={() => navigation.navigate('AddSchedule')}
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
  return r1.artist !== r2.artist;
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
  artist: { fontWeight: '800' },
  eventContainer: { flexDirection: 'row', },
  event: { marginHorizontal: 10, fontSize: 18 },
  divider: { marginVertical: 5 },
  stats: { flexDirection: 'row', justifyContent: 'flex-end' },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  floatingBtn: {
    borderWidth: 1,
    flexDirection: 'row',
    // borderColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 40,
    position: 'absolute',
    bottom: 100,
    right: 30,
    backgroundColor: 'black',
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