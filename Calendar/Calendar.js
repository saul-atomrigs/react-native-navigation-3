import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Dimensions, Image, Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Switch } from 'react-native';
import { AirplaneTakeoff, BellRinging, Cake, HandsClapping, MusicNote, Plus, Star, Television, VideoCamera } from 'phosphor-react-native';
import { Agenda } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import SetupPush3 from '../Notifications/SetupPush3';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { listEvents } from '../src/graphql/queries'
Amplify.configure(config)

export default function Calendar(props) {
  const [items, setItems] = useState([])

  const navigation = useNavigation()

  // FETCH ITEMS
  async function fetchItems() {
    try {
      const itemData = await API.graphql(graphqlOperation(listEvents));
      setItems(itemData.data.listEvents.items)
    } catch (err) {
      console.log(err, 'fetching 에러!!');
    }
  }
  useEffect(() => {
    fetchItems()
  }, [])

  // READ ISENABLED FROM ASYNCSTORAGE (READ ONCE)
  const STORAGE_KEY = props.id
  // console.log(STORAGE_KEY, 'STORAGE_KEY')
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          setIsEnabled(JSON.parse(value));
          console.log(value, 'READ');
        }
      })
      .catch(err => {
        console.log('에러', err);
      });
  }, []);

  // EACH COMPONENT IN AGENDA
  function renderItem(props) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate(
          'DetailedSchedule',
          {
            artist: props.artist,
            event: props.event,
            date: props.date,
            id: props.id,
          }
        )}
      >
        <Text style={styles.artist}>{props.artist}</Text>
        <View style={styles.eventContainer}>
          <View>{props.icon}</View>
          <Text style={styles.event}>{props.event}</Text>
        </View>
        <View style={styles.stats}>
          {/* <HandsClapping /> */}
          {/* <Star color='gray' /> */}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.stats}>
          {/* <SetupPush3
            date={props.date}
            artist={props.artist}
            event={props.event}
            id={props.id}
          /> */}
          <BellRinging
            size={17}
          />

        </View>

      </TouchableOpacity >
    );
  }

  // RERENDER AFTER SUBMIT (GOBACK)
  useEffect(() => {
    fetchItems();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      fetchItems();
    });
    return willFocusSubscription;
  }, []);

  // GROUP MULTIPLE SCHEDULES ON THE SAME DAY & CONVERT TO CALENDAR TYPE OBJECT
  let itemsReduced = items.reduce(function (r, a) {
    r[a.date] = r[a.date] || [];
    r[a.date].push(a)
    return r;
  }, Object.create(null))

  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])

  // REFRESH CONTROL
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    fetchItems();
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

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
        refreshing={refreshing}
        onRefresh={onRefresh}
        theme={{
          textDayFontWeight: '500',
          textMonthFontWeight: '500',
          todayButtonFontWeight: '500',
          textDayHeaderFontWeight: '500',
          calendarBackground: '#fff',
          agendaKnobColor: 'gray',
          'stylesheet.calendar.header': {
            // marginBottom: 80,
          },
        }}
        style={styles.container}
        hideExtraDays={false}
      />

      <View style={styles.floatingBtnContainer}>
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => navigation.navigate('AddSchedule')}
        >
          <Plus color="white1" weight='bold' size={20} />
          {/* <Text style={styles.floatingBtnText}>Add Event</Text> */}
        </TouchableOpacity>
      </View>
    </>
  );
}

function renderEmptyDate() {
  return (
    <View style={styles.emptyDate}>

    </View>
  );
}

// RERENDERING AGENDA AFTER SUBMIT
const rowHasChanged = (r1, r2) => r1.text !== r2.text;
// rowHasChanged = (r1, r2) => r1 !== r2;
// export function rowHasChanged() {
//   return true;
// }


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
    width: 30,
    height: 30,
    marginRight: WIDTH * 0.05,
  },
  container: {
    // marginBottom: 40,
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
    marginHorizontal: 10,
    fontSize: 16
  },
  divider: {
    marginVertical: 5
  },
  stats: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'flex-end'
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  floatingBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  floatingBtn: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    position: 'relative',
    bottom: 100,
    // right: 30,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textDecorationLine: 'underline'
  }
});


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