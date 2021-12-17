import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { createEvent, updatePost, deletePost } from '../src/graphql/mutations'
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
            // date: values.date,
            date: text,
            artist: values.artist,
            event: values.event
          }
          // input: item
        }
      ))
      const final = result.data.createEvent
      setValues([...items, final])
      console.log('🚀 date created: ', final, final.date, final.artist, final.event)
    } catch (e) {
      console.log(e, '에러!!: ')
    }
  }

  function goBack() {
    navigation.goBack()
  }

  function forceUpdate() {
    setItems([...items])
  }

  // MEMORY LEAK WARNING PREVENTION 
  useEffect(() => {
    return () => {
      setItems([])
    }
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        {/* <Text>{text}</Text> */}
        {/* Date input field */}
        <TextInput
          // value={values.date}
          value={text}
          onChangeText={value => handleInputChange('date', value)}
          // onChangeText={value => handleConfirm('date', value)}
          name="date"
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
      {/* Artist input field */}
      <TouchableOpacity>
        <TextInput
          value={values.artist}
          onChangeText={value => handleInputChange('artist', value)}
          // onChangeText={handleInputChange}
          name="artist"
          placeholder="2. Which artist?"
          style={styles.textInput}
          placeholderTextColor='#666'
          autoCompleteType="off"
          autoCorrect={false}
        />
      </TouchableOpacity>
      {/* Event input field */}
      <TouchableOpacity>
        <TextInput
          value={values.event}
          onChangeText={value => handleInputChange('event', value)}
          // onChangeText={value => setInputItems('event', value)}
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
        onPress={() => {
          addItem();
          goBack();
          forceUpdate()
        }}
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
