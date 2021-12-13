import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createEvent, updatePost, deletePost } from '../src/graphql/mutations'
Amplify.configure(config)

export default function AddSchedule() {
  // DATE PICKER 
  const [datePickerVisible, setDatePickerVisibility] = useState(false);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState('');
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    hideDatePicker();
    // for Android problem
    setVisible(false);
    // onChangeText(date.format("yyyy-MM-dd"))
    setDate(date.format("yyyy-MM-dd"))
  };

  // const [formItem, setFormItem] = useState(initialValues)
  // const [item, setItem] = useState([]);
  const [item, setItem] = useState('');

  const initialValues = {
    // date: '',
    date: moment().format('YYYY-MM-DD'),
    artist: '',
    event: ''
  }
  const [values, setValues] = useState(initialValues);

  function handleInputChange(key, value) {
    // setItem({ ...item, [key]: value })
    setValues({ ...values, [key]: value })
  }

  // // CREATE Date
  // async function addDate() {
  //   try {
  //     const date = { ...formDate }
  //     setItem([...item, date])
  //     const result = await API.graphql(graphqlOperation(
  //       createEvent,
  //       {
  //         input: date
  //       }
  //     ))
  //     setDate([...item, result.data.createEvent])
  //     console.log('🚀 date created: ', result.data.createEvent)
  //   } catch (e) {
  //     console.log('error: ', e)
  //   }
  // }


  // CREATE ITEM 
  async function addItem() {
    try {
      // const = { ...formEvent }
      // setItem([...item, event])
      // setFormEvent([...item, event])
      // setValues([...item, values.date, values.artist, values.event])

      const items = { ...values }
      setValues([...item, items])
      const result = await API.graphql(graphqlOperation(
        createEvent,
        {
          input: {
            date: values.date,
            artist: values.artist,
            event: values.event
          }
        }
      ))
      setDate([...item, result.data.createEvent])
      console.log('🚀 date created: ', result.data.createEvent)
    } catch (e) {
      console.log(e, '에러!!: ')
    }
  }

  function setInputDates(name, value) {
    // setDate({ ...formDate, [key]: value })
    setValues({ ...values, [name]: value })
  }

  // update and keep track of our input fields every time they change
  function setInputItems(key, value) {
    setItem({ ...item, [key]: value })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          // value={text}
          // value={formItem.date}
          value={date}
          onChangeText={date => handleInputChange('date', moment(date).format('YYYY-MM-DD'))}
          // onChangeText={value => setInputDates({ date }, value)}
          // onChangeText={value => setInputItems('date', value)}
          // onChangeText={handleInputChange}
          // onChangeText={value => handleInputChange('date', value)}
          // name="date"
          pointerEvents="none"
          style={styles.textInput}
          placeholder="1. When is it happening?"
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
      <TouchableOpacity>
        <TextInput
          // value={formArtists.artist}
          // value={formItem.artist}
          value={values.artist}
          onChangeText={value => handleInputChange('artist', value)}
          // onChangeText={value => setInputItems('artist', value)}
          // onChangeText={val => setInputArtists('artist', val)}
          // onChangeText={handleInputChange}
          name="artist"
          placeholder="2. Which artist?"
          style={styles.textInput}
          placeholderTextColor='#666'
          autoCompleteType="off"
          autoCorrect={false}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <TextInput
          // value={formEvent.event}
          // value={formItem.event}
          value={values.event}
          onChangeText={value => handleInputChange('event', value)}
          // onChangeText={value => setInputItems('event', value)}
          // onChangeText={val => setInputEvents('event', val)}
          // onChangeText={handleInputChange}
          name="event"
          placeholder="3. What's the event?"
          style={styles.textInput}
          placeholderTextColor='#666'
          autoCompleteType="off"
          autoCorrect={false}
        />
      </TouchableOpacity>

      {/* submit button */}
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={addItem}
      >
        <View style={styles.floatingBtn}>
          <Text style={styles.floatingBtnText}>Add item</Text>
        </View>
      </TouchableOpacity>

    </View>
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
    marginBottom: 30,
  },
  floatingBtn: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
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
    color: 'pink',
    textDecorationLine: 'underline'
  },
})
