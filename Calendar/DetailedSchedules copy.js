// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Agenda } from 'react-native-calendars';

// const getMonthData = () => {
//     let loadingData = true
//     let dataToReturn = {
//         "2021-11-27": [
//             { name: "Whats up Food Stuff", start: "2021-11-29 18:45:00", end: "2021-11-29 19:45" }
//         ],
//         "2021-11-28": [],
//         "2021-11-29": [
//             { name: "Whats up Food Stuff", start: "2021-11-29 13:45:00", end: "2021-11-29 19:45" }
//             , { name: "Whats up second Stuff", start: "2021-11-29T18:45:00", end: "2021-11-29 21:45" }
//             , { name: "Whats up second Stuff", start: "2021-11-29T18:45:00", end: "2021-11-29 21:45" }
//         ],
//         "2021-11-30": [
//             { name: "Whats up Food Stuff", start: "2021-11-29T13:45:00", end: "2021-11-29 19:45" }
//             , { name: "Whats up second Stuff", start: "2021-11-29T18:45:00", end: "2021-11-29 21:45" }
//         ]
//     }
//     return [dataToReturn, false]
// }

// export default function DetailedSchedules({ props, navigation, route }) {
//     const [monthData, loadingData] = getMonthData()

//     const renderItem = (item, firstItemInDay) => {
//         console.log('불러오는 중:', item)
//         return (
//             <TouchableOpacity>
//                 <View style={{ backgroundColor: '#fff', borderColor: 'pink', padding: 10, borderRadius: 13 }}>
//                     {/* <Text>{Moment(item.start).format("hh:mm a")}</Text> */}
//                     <Text>twice {(item.start)}</Text>
//                     {/* <Text style={{ color: '#555' }}>{item.name}</Text> */}
//                     <Text style={{ color: '#555' }}>On air: </Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     }


//     if (loadingData || !monthData) {
//         return (
//             <View>
//                 <Text>Loading</Text>
//             </View>
//         )
//     }
//     return (
//         <View style={styles.item}>
//             <Agenda
//                 items={monthData}
//                 // renderItem={(item, firstItemInDay) => { return (renderItem(item, firstItemInDay)) }}
//                 renderItem={renderItem}
//                 pastScrollRange={0}
//                 futureScrollRange={0}
//                 showClosingKnob={true}
//                 // renderEmptyData={renderEmptyItem}
//                 // renderEmptyDate={renderEmptyDate}

//                 // theme={calendarTheme}
//                 theme={{
//                     textDayFontWeight: '900',
//                     textMonthFontWeight: '900',
//                     todayButtonFontWeight: '900',
//                     textDayHeaderFontWeight: '700',
//                     calendarBackground: '#FFF2F4',
//                     agendaKnobColor: 'black',
//                     'stylesheet.calendar.header': {
//                         marginBottom: 80,
//                     },
//                 }}
//             />
//             <TouchableOpacity style={styles.floatingBtn}
//                 onPress={() => navigation.navigate('AddPost')}
//             >
//                 <Image
//                     style={{ width: 30, height: 30, resizeMode: 'contain' }}
//                     source={require('../assets/icons/plus.png')}
//                 />
//             </TouchableOpacity>
//         </View>
//     );
// }



// // styling 
// const styles = StyleSheet.create({
//     item: {
//         backgroundColor: 'black',
//         flex: 1,
//         borderRadius: 13,
//         padding: 5,
//         // marginRight: 10,
//         marginTop: 5
//     },
//     emptyDate: {
//         height: 15,
//         flex: 1,
//         paddingTop: 30
//     },
//     floatingBtn: {
//         borderWidth: 1,
//         borderColor: 'pink',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 50,
//         height: 50,
//         position: 'absolute',
//         bottom: 120,
//         right: 30,
//         backgroundColor: 'pink',
//         borderRadius: 100,
//         // shadow ios:
//         shadowColor: 'lightgray',
//         shadowOffset: {
//             width: 5,
//             height: 5,
//         },
//         shadowOpacity: 0.5,
//         shadowRadius: 5,
//         // shadow android: 
//         elevation: 0.8,
//     }
// });