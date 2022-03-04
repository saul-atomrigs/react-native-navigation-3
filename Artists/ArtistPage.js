import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Modal, Pressable, SafeAreaView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { artistList2 } from './Artists'

import { WebView } from 'react-native-webview';

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
import { listEvents } from '../src/graphql/queries'
Amplify.configure(config)

export default function ArtistPage() {

  const { artist } = useRoute().params
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([])
  const navigation = useNavigation()

  const TWITTER_API_KEY = '5uV1QEfBWR6sNbcFjAuUHj3Np'
  const TWITTER_API_KEY_SECRET = 'to52SOvNSZt8tyV0VwIkiwa95ylQvdYKy7WCPGtqmvriwQ5kzy'
  const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAACoaZgEAAAAA%2FrOfCNrnhwph9Q9qZbbnhLweZbM%3DHPFqwB7RlYzDf72Rypqch1uw46iLdye4kaUic84G7KNn8AMD76'
  // const twitterClient = new TwitterApi('<TWITTER_BEARER_TOKEN>');

  // FETCH EVENTS ITEMS
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
        <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>

          {items
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((item, index) => {
              if (item.artist === artist) {
                return (
                  <View style={[styles.content, styles.eventsWrapper]}>
                    <View key={index}>
                      <Text style={styles.date}> {item.date} </Text>
                      <Text > {item.event} </Text>
                    </View>
                  </View>
                )
              }
            })}

        </ScrollView>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.subtitle}> On Social Media </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >

          <Pressable
            onPress={() => navigation.navigate(
              'Twitter2'
            )}
          >
            <Image
              style={styles.socialMedia}
              source={{ uri: 'https://pbs.twimg.com/media/FHCgKeLaIAUsOoU?format=jpg&name=large' }}
            />
          </Pressable>

          <Image
            style={styles.socialMedia}
            source={{ uri: 'https://pbs.twimg.com/media/FK4pN9KVkAA8L7q?format=jpg&name=large' }}
          />
        </ScrollView>
      </View>

      {/* <StreamConnect /> */}

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
    marginRight: 2,

  },
  wrapper: {
    marginTop: 20,
  },
  text: {
    fontSize: 13,
  },
  date: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666',
    marginRight: 20,
    marginBottom: 5,
  },
  eventsWrapper: {
    width: 250,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 13,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  socialMedia: {
    width: 250,
    height: 120,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 13
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