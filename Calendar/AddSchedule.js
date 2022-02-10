import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Text, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-community/picker';
import PickerModal from 'react-native-picker-modal-view';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createEvent, updatePost, deletePost } from '../src/graphql/mutations'
import { listEvents } from '../src/graphql/queries'
Amplify.configure(config)

export default function AddSchedule({ navigation }) {

  const initialValues = {
    date: '',
    artist: '',
    event: ''
  }
  const [values, setValues] = useState(initialValues);
  const [items, setItems] = useState([]);

  // DATE PICKER 
  const [datePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, onChangeText] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (text) => {
    hideDatePicker();
    onChangeText(text.format("yyyy-MM-dd"))
    console.log(values.date)
  };


  // UPDATE INPUT FIELDS EVERY TIME THEY CHANGE
  function handleInputChange(key, value) {
    setValues({ ...values, [key]: value })
  }


  // CREATE ITEM 
  async function addItem() {
    try {
      const item = { ...values }
      setItems([...items, item])
      setValues(initialValues)
      const result = await API.graphql(graphqlOperation(
        createEvent,
        {
          input: {
            date: text,
            artist: values.artist,
            event: values.event
          }
        }
      ))
      const final = result.data.createEvent
      setValues([...items, final])
      console.log('🚀 date created: ', final, final.date, final.artist, final.event)
    } catch (e) {
      console.log(e, '에러!!: ')
    }
  }

  // ITEM PICKER
  const WheelPicker = (itemValue, index) => {
    const PickerItem = Picker.Item;
    const itemList = artistList

    const [selectedIndex, setSelectedIndex] = useState('')

    // useEffect(() => {
    //   setValues({ artist: selectedIndex })
    //   console.log(index, 'INDEX')
    //   console.log(selectedIndex, 'SELECTED INDEX')
    // }, [selectedIndex])

    const onValueChange = (index) => {
      setSelectedIndex(index)
      console.log(index, selectedIndex)
    };

    const confirmArtist = () => {
      setValues({ ...values, artist: selectedIndex })
      console.log(selectedIndex)
    }

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

        <Picker
          selectedValue={selectedIndex}
          onValueChange={onValueChange}

          style={{ width: 150, height: 220 }}
          lineColor="#000000"
          itemStyle={{ color: 'black', fontSize: 13 }}
        >
          {itemList.map((value, index) => (
            <PickerItem label={value} value={value} key={index} />
          ))}
        </Picker>

        <TouchableOpacity onPress={confirmArtist} style={styles.confirm}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View >
    );
  };

  // // PICKER MODAL
  // function PickerMo() {
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const [selectedValue, setSelectedValue] = useState(1);

  //   const onValueChange = (index) => {
  //     setSelectedValue(index)
  //     console.log(selectedValue, index)
  //   };

  //   return (
  //     <View style={{ flex: 1 }}>
  //       <PickerModal
  //         renderSelectView={(disabled, selected, showModal) =>
  //           <Button disabled={disabled} title={'Show me!'} onPress={showModal} />
  //         }
  //         items={artistList}
  //         onSelected={() => setModalVisible(false)}
  //         onValueChange={onValueChange}
  //         onCancel={() => setModalVisible(false)}
  //         visible={modalVisible}
  //         selectedValue={selectedValue}
  //         itemStyle={{ color: 'black', fontSize: 13 }}
  //       />
  //     </View>
  //   );
  // }

  // GO BACK
  function goBack() {
    navigation.goBack()
  }

  // UPDATE ITEMS
  async function fetchItems() {
    try {
      const itemData = await API.graphql(graphqlOperation(listEvents));
      setItems(itemData.data.listEvents.items)
    } catch (err) {
      console.log(err, 'fetching 에러!!');
    }
  }
  function forceUpdate() {
    fetchItems()
  }

  // MEMORY LEAK WARNING PREVENTION 
  useEffect(() => {
    return () => {
      setItems([])
    }
  }, [])

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}
      keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <TextInput
          value={values.artist}
          onChangeText={value => handleInputChange('artist', value)}

          name="artist"
          placeholder="1. Who? (write here or pick below)"
          style={styles.textInput}
          placeholderTextColor='#666'
          autoCompleteType="off"
          autoCorrect={false}
        />
        <WheelPicker />

        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            value={text}
            onChangeText={value => handleInputChange('date', value)}
            name="date"
            pointerEvents="none"
            style={styles.textInput}
            placeholder="2. When?"
            placeholderTextColor='#666'
            underlineColorAndroid="transparent"
            editable={false}
          />
          <DateTimePickerModal
            headerTextIOS="1. When is it happening?"
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display="inline" // ios 14.0 new styling
          />
        </TouchableOpacity>

        <TextInput
          value={values.event}
          onChangeText={value => handleInputChange('event', value)}
          name="event"
          placeholder="3. Event (schedule, birthday, release..)"
          style={styles.textInput}
          placeholderTextColor='#666'
          autoCompleteType="off"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          // disabled={!values.date || !values.artist || !values.event}
          onPress={() => {
            addItem();
            goBack();
            forceUpdate();
          }}
        >
          <View style={styles.floatingBtn}>
            <Text style={styles.floatingBtnText}>Add to Calendar</Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 20, marginHorizontal: 50 }}>
          <Text>Feel free to add!</Text>
        </View>
      </View>

    </KeyboardAwareScrollView >
  );
}


Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy": return d.getFullYear();
      case "yy": return (d.getFullYear() % 1000).zf(2);
      case "MM": return (d.getMonth() + 1).zf(2);
      case "dd": return d.getDate().zf(2);
      case "E": return weekName[d.getDay()];
      case "HH": return d.getHours().zf(2);
      case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm": return d.getMinutes().zf(2);
      case "ss": return d.getSeconds().zf(2);
      case "a/p": return d.getHours() < 12 ? "오전" : "오후";
      default: return $1;
    }
  });
};

export const artistList = [
  '',
  'ASTRO',
  'Apink',
  'ATEEZ',
  'BLACKPINK',
  'STAYC',
  'TWICE',
  'EXO',
  'aespa',
  'JENNIE',
  'NCT 127',
  'Stray Kids',
  'ITZY',
  'TXT',
  'Kep1er',
  'IVE',
  'VIVIZ',
]
  .sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    height: 50,
    width: 300,
    borderColor: '#e6e6e6',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    marginVertical: 15,
  },
  confirm: {
    // borderWidth: 1,
    height: 180,
    justifyContent: 'center',
  },
  floatingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 40,
    position: 'relative',
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
    color: '#fff',
    textDecorationLine: 'underline'
  },
})
