import React from "react"
import { View, StyleSheet } from "react-native"
import { Agenda } from 'react-native-calendars';


const getMonthData = () => {
  let loadingData = true
  let dataToReturn = {
    "2020-06-07": [
      { name: "Whats up Food Stuff", start: "2020-06-09T13:45:00", end: "2020-06-09 19:45" }
      , { name: "Whats up second Stuff", start: "2020-06-09T18:45:00", end: "2020-06-09 21:45" }
    ],

    "2020-06-08": [
      { name: "Whats up Food Stuff", start: "2020-06-09T13:45:00", end: "2020-06-09 19:45" }
      , { name: "Whats up second Stuff", start: "2020-06-09T18:45:00", end: "2020-06-09 21:45" }
    ]
  }
  return [dataToReturn, false]
}

export default function ThatOneScreen({ props, navigation, route }) {
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
        style={styles.container}

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
      />
    </View>
  );

}


const styles = StyleSheet.create({
  headerRightButtons: {
    width: 30,
    height: 30,
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