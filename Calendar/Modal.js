import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-community/picker';
import { MagnifyingGlass, NavigationArrow, X } from 'phosphor-react-native';
import { artistList } from '../Artists/Artists'
import { useNavigation } from "@react-navigation/native";


export default function Modal1() {
  const [modalVisible, setModalVisible] = useState(false);

  // ARTIST PICKER
  function WheelPicker() {
    const navigation = useNavigation()

    const PickerItem = Picker.Item;
    const itemList = artistList

    const [selectedIndex, setSelectedIndex] = useState('')

    const onValueChange = (index) => {
      setSelectedIndex(index)
      console.log(index, selectedIndex)
    };

    const onCloseModal = () => {
      setModalVisible(false);
    };

    const confirmArtist = () => {
      // setValues({ ...values, artist: selectedIndex })
      navigation.navigate('ArtistPage', { artist: selectedIndex })
      onCloseModal()
      console.log(selectedIndex)
    }

    return (
      <View>

        <Picker
          selectedValue={selectedIndex}
          onValueChange={onValueChange}
          style={{ width: 250, height: 220 }}
          lineColor="#000000"
          itemStyle={{ color: 'black', fontSize: 16 }}
        >
          {itemList.map((value, index) => (
            <PickerItem label={value} value={value} key={index} />
          ))}
        </Picker>

        <TouchableOpacity
          onPress={confirmArtist}
          style={styles.modalView}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View >
    );
  };

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
            // onPress={onCloseModal}
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


// STYLES
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 0,
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
