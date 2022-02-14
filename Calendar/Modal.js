import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-community/picker';
import { MagnifyingGlass, X } from 'phosphor-react-native';


const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={{ alignSelf: 'flex-end' }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <X size={30} />

            </Pressable>
            <WheelPicker />
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen,]}
        onPress={() => setModalVisible(true)}
      >
        <MagnifyingGlass color="black" size={30} />

      </Pressable>
    </View>
  );
};


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

      <TouchableOpacity onPress={confirmArtist} style={styles.modalView}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View >
  );
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    marginRight: 10,
    // padding: 3,
  },
  buttonOpen: {
    backgroundColor: "#eee",
    width: 70,
  },
});

export default App;