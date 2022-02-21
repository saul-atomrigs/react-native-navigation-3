import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Modal, Pressable, SafeAreaView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { artistList2 } from './Artists'

import { WebView } from 'react-native-webview';


export default function ArtistPage() {

  const { artist } = useRoute().params
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()

  return (

    <View style={styles.container}>
      <Text style={styles.title}> {artist} </Text>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Albums </Text>
        <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <Text style={styles.content}>
            {artistList2[artist].albums.toString().replaceAll(',', '   ')}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Debut </Text>
        <Text style={styles.content}> {artistList2[artist].debut} </Text>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Members </Text>
        <Text style={styles.content}> {artistList2[artist].members.toString().replaceAll(',', '   ')} </Text>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Leader </Text>
        <Text style={styles.content}> {artistList2[artist].leader} </Text>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Label </Text>
        <Text style={styles.content}> {artistList2[artist].label} </Text>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Fandom </Text>
        <Text style={styles.content}> {artistList2[artist].fandom} </Text>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.subtitle}> Upcoming Events </Text>
        <ScrollView horizontal={true}>
          <View style={[styles.content, styles.eventsWrapper]}>
            <Text>
              MY (마이) MY (마이) MY (마이)MY (마이)MY (마이)MY (마이)MY (마이)
            </Text>
          </View>
          <View style={[styles.content, styles.eventsWrapper]}>
            <Text>
              MY (마이)
            </Text>
          </View>

        </ScrollView>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.subtitle}> On Social Media </Text>

        <ScrollView
          horizontal={true}
        >
          <Pressable
            onPress={() => navigation.navigate(
              'Twitter2'
            )}
          >
            <Image
              style={{ width: 300, height: 150, marginHorizontal: 5, borderRadius: 13 }}
              source={{ uri: 'https://pbs.twimg.com/media/FHCgKeLaIAUsOoU?format=jpg&name=large' }}
            />
          </Pressable>
          <Image
            style={{ width: 300, height: 150, marginHorizontal: 5, borderRadius: 13 }}
            source={{ uri: 'https://pbs.twimg.com/media/FK4pN9KVkAA8L7q?format=jpg&name=large' }}
          />
        </ScrollView>
      </View>

    </View>
  )
}


// STYLES
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666',
    paddingVertical: 5,
    marginRight: 20,
  },
  content: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    marginRight: 5,

  },
  wrapper: {
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  eventsWrapper: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 13,
    width: 250,
  },

  // MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    padding: 10,
    // width: '100%',
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})