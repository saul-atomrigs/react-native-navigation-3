import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';
import { BellRinging, Plus } from 'phosphor-react-native';

import Modal from './Modal';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../src/aws-exports';
import { listEvents } from '../src/graphql/queries';

Amplify.configure(config)

export default function Calendar1(props) {
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
        )} >
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
          <BellRinging size={20} />
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

  // CUSTOM TEXT BELOW DATE
  // function CalendarDayComponent(props) {
  //   const { date, marking, state, onPress, calendarData, children, artist } = props;
  //   const onPressed = () => {
  //     requestAnimationFrame(() => onPress(date));
  //   }
  //   let items = '';

  //   // if (marking.marked) {
  //   //   items = calendarData[date.dateString].length
  //   // }
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.itemsCount}>
  //         {/* {items} */}
  //         {/* black... */}
  //         {props.artist}
  //         {props.date}
  //         {/* .length > 6 ? .substring(0,6) + '..' :  */}
  //       </Text>
  //     </View>
  //   )
  // };
  // const renderDayComponent = (props) => <CalendarDayComponent />;

  function renderDayComponent(props) {
    console.log(props.artist)
    return (
      <>
        <Text style={styles.artist}>{props.artist}</Text>
      </>
    )
  };

  return (
    <>
      {/* <Swiper>test</Swiper> */}
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
        showScrollIndicator={true}

        // dayComponent={renderDayComponent}

        // dayComponent={({ date, state }, props) => {
        //   return (
        //     <View>
        //       <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
        //       <Text style={{ fontSize: 10 }}>{props.artist}</Text>
        //       <Text style={{ fontSize: 10 }}>BLACK...</Text>

        //     </View>
        //   );
        // }}

        theme={{
          textDayFontWeight: '500',
          textMonthFontWeight: '500',
          todayButtonFontWeight: '500',
          textDayHeaderFontWeight: '500',
          calendarBackground: '#fff',
          agendaKnobColor: 'gray',
          agendaTodayColor: 'blue',
          dotColor: '#000',
          textSectionTitleColor: '#000',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#000',
          selectedDayTextColor: '#ffffff',
          monthTextColor: 'blue',
          todayTextColor: 'blue',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          selectedDotColor: '#ffffff',
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
          <Plus color="white" weight='bold' />
        </TouchableOpacity>
      </View>
    </>
  );
}

function renderEmptyDate() {
  return (
    <View style={styles.emptyDate}>
      {/* <Text>Waiting for new activities...</Text> */}
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
        <Modal />
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
    // flex: 1,
    // margin: 12,
  },
  dayItem: {
    textAlign: 'center',
    // fontFamily: 'roboto'
  },
  itemsCount: {
    textAlign: 'center',
    // fontFamily: 'roboto',
    fontSize: 10,
    // color: colors.alert
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
    position: 'relative',
    bottom: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'black',
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