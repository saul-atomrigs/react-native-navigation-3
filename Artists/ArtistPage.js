import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView, Image, Modal, Pressable, SafeAreaView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { artistList2 } from './Artists'

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
  const endpoint = "https://api.twitter.com/2/users/967000437797761024/tweets?max_results=5&expansions=attachments.media_keys&media.fields=url"

  // // GET TWITTER DATA FROM FETCH API:
  const [twitterData, setTwitterData] = useState([])
  const getTwitter = async () => {
    try {
      const response = await fetch(
        endpoint, {
        headers: {
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAACoaZgEAAAAAQYHG4z03eZAbwhH9M7QzTi9QpSE%3Dmgthlks2jpdT6V262QL4VhUCByXCcVkBNrBim53Bw83WD9RBIx',
          'Content-Type': 'application/json'
        }
      }
      );
      const json = await response.json();
      // setTwitterData(json.includes.media)
      setTwitterData(json)
      // console.log(twitterData)
      return json;

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('twitterDATA', twitterData)
    getTwitter();
  }, [])

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

      {/* TEST FOR TWITTER IMAGE */}
      <Text>
        {twitterData.data[1].text}
      </Text>
      {/* <Image
        style={styles.socialMedia}
        // source={{ uri: twitterData.includes.media[0].url }}
        // source={{ uri: twitterData[0].url }}
      // source={{
      //   // uri: twitterData[0].url,
      //   // uri: twitterData.includes.media[0].url,
      //   headers: {
      //     Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAACoaZgEAAAAAgaSVszggYbS86NDGV6glfOSRr7M%3DkHtPVV4FlAns2R4D4fvEPDUflDquTHbDxaNA453XUDMnLeaeyc'
      //   }
      // }}

      /> */}
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Text>{item.title}, {item.releaseYear}</Text>
        )}
      />
      {/*  */}


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
            // .sort((a, b) => new Date(a.date) - new Date(b.date))
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
          // onPress={() => navigation.navigate(
          //   'Twitter2'
          // )}
          >
            <Image
              style={styles.socialMedia}
            // source={{ uri: twitterData.includes.media[0].url }}
            />
            <View style={styles.socialMediaText}>
              <Text>
                {/* {twitterData.data[0].text} */}
              </Text>
            </View>

          </Pressable>

          <Pressable>
            <Image
              style={styles.socialMedia}
            // source={{ uri: twitterData.includes.media[1].url }}
            />
            <View style={styles.socialMediaText}>
              <Text>
                {/* {twitterData.data[1].text} */}
              </Text>
            </View>
          </Pressable>

          <Pressable style={[styles.content, styles.eventsWrapper]}
            onPress={() => navigation.navigate('Twitter2')}>
            <Text>+ More</Text>
          </Pressable>

          <Text>
            {/* {twitterData[1].text} */}
          </Text>

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
    height: 120,
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
  socialMediaText: {
    width: 250,
    margin: 7,
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