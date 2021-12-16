import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Dimensions, Image, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AirplaneTakeoff, Cake, HandsClapping, MusicNote, Plus, Star, Television, VideoCamera } from 'phosphor-react-native';
import { Agenda } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { listEvents } from '../src/graphql/queries'
Amplify.configure(config)

export default function Calendar() {
  const navigation = useNavigation()

  function renderItem(props) {
    return (
      <TouchableOpacity
        style={styles.item}
      // onPress={() => navigation.push(
      //   'DetailedSchedule',
      //   { param: props }
      // )}
      >
        <Text style={styles.artist}>{props.artist}</Text>
        <View style={styles.eventContainer}>
          <View>{props.icon}</View>
          <Text style={styles.event}>{props.event}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.stats}>
          {/* <HandsClapping /> */}
          <Star color='pink' />
        </View>
      </TouchableOpacity >
    );
  }

  const [items, setItems] = useState([])

  // FETCH item:
  useEffect(() => {
    fetchItems()
  }, [])
  async function fetchItems() {
    try {
      const itemData = await API.graphql(graphqlOperation(listEvents));
      setItems(itemData.data.listEvents.items)
    } catch (err) {
      console.log(err, 'fetching 에러!!');
    }
  }

  let itemsReduced = items.reduce(function (acc, curr) {
    acc[curr['date'].toUpperCase()] = [{
      artist: curr.artist,
      event: curr.event,
      icon: <Television />,
    }]
    return acc;
  }, {})

  // const dummyData = {
  //   "2021-12-15": [
  //     {
  //       artist: "aespa",
  //       event: 'tv show on MBC',
  //       icon: <Television />,
  //     },
  //     {
  //       artist: "BTS",
  //       event: 'Birthday',
  //       icon: <Cake />,
  //     },
  //   ],

  //   "2021-12-16": [
  //     {
  //       artist: "ive",
  //       event: 'tv show on MBC',
  //       icon: <Television />,
  //     },
  //   ]
  // }

  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])


  return (
    <>
      <Agenda
        items={itemsReduced}
        dayLoading={false}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        markingType={'custom'}
        theme={{
          textDayFontWeight: '500',
          textMonthFontWeight: '500',
          todayButtonFontWeight: '500',
          textDayHeaderFontWeight: '500',
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
          <Text style={styles.floatingBtnText}>Add schedule</Text>
        </View>
      </TouchableOpacity>
    </ >
  );
}

function renderEmptyDate() {
  return (
    <View style={styles.emptyDate}>
      <Button title='Nothing for this date yet...'
        style={{ backgroundColor: 'pink', width: '50', height: '30' }} />
    </View>
  );
}

function rowHasChanged(r1, r2) {
  return r1.artist !== r2.artist;
}

// HEADER BUTTONS
export const Header = ({ navigation }) => {
  navigation.setOptions({
    // LEFT
    headerTitleAlign: 'left',
    // RIGHT
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            style={headerRightButtons}
            source={require('../assets/icons/logo.png')}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
        >
          <Image
            style={styles.headerRightButtons}
            source={require('../assets/icons/dots-nine.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  });
}

// styling 
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerRightButtons: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.05,
  },
  container: {
    marginBottom: 80,
  },
  item: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 13,
    padding: 10,
    marginTop: 10,
    marginRight: 20,
  },
  artist: {
    fontWeight: '800'
  },
  eventContainer: {
    flexDirection: 'row',
  },
  event: {
    marginHorizontal: 10, fontSize: 18
  },
  divider: {
    marginVertical: 5
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  floatingBtn: {
    borderWidth: 1,
    flexDirection: 'row',
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
  },
  floatingBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'pink',
    textDecorationLine: 'underline'
  }
});