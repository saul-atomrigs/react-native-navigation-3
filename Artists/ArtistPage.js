import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Modal, Pressable } from 'react-native'
import { useRoute } from '@react-navigation/native'

import TweetEmbed from 'react-tweet-embed'
import { ProfileHeader } from "react-native-twitter-embed";
import { WebView } from 'react-native-webview';


export default function ArtistPage() {

  const { artist } = useRoute().params
  const [modalVisible, setModalVisible] = useState(false);

  return (

    <View style={{ flex: 1 }}>
      <Text style={styles.title}> {artist} </Text>
      {/* <TweetEmbed id='771763270273294336' options={{ theme: 'dark' }} /> */}
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
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>

            <View style={{ flex: 1, justifyContent: 'center' }}>

              <WebView
                originWhitelist={['*']}
                style={{ width: 300, alignContent: 'center', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'black' }}
                source={{
                  html: `
                <blockquote class="twitter-tweet"><p lang="en" dir="ltr">[STATION] aespa 에스파 &#39;Dreams Come True&#39; MV<br><br>🎬 <a href="https://t.co/aCPr6EgLwK">https://t.co/aCPr6EgLwK</a><a href="https://twitter.com/hashtag/aespa?src=hash&amp;ref_src=twsrc%5Etfw">#aespa</a> <a href="https://twitter.com/hashtag/%C3%A6spa?src=hash&amp;ref_src=twsrc%5Etfw">#æspa</a> <a href="https://twitter.com/hashtag/%EC%97%90%EC%8A%A4%ED%8C%8C?src=hash&amp;ref_src=twsrc%5Etfw">#에스파</a><a href="https://twitter.com/hashtag/DreamsComeTrue?src=hash&amp;ref_src=twsrc%5Etfw">#DreamsComeTrue</a> <a href="https://t.co/f8rjc3oiPS">pic.twitter.com/f8rjc3oiPS</a></p>&mdash; aespa (@aespa_official) <a href="https://twitter.com/aespa_official/status/1472854342789382150?ref_src=twsrc%5Etfw">December 20, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                ` }}
              />

            </View>
          </View>
        </View>


      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Albums </Text>
        <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <Text style={styles.content}> Black Mamba </Text>
          <Text style={styles.content}> Forever </Text>
          <Text style={styles.content}> Next Level </Text>
          <Text style={styles.content}> Black Mamba </Text>
          <Text style={styles.content}> Savage </Text>
          <Text style={styles.content}> Dreams Come True </Text>
        </ScrollView>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Debut </Text>
        <Text style={styles.content}> 2020.11.17 </Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Members </Text>
        <Text style={styles.content}> Winter </Text>
        <Text style={styles.content}> Karina </Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Leader </Text>
        <Text style={styles.content}> Karina </Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Label </Text>
        <Text style={styles.content}> SM Entertainment </Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}> Fandom </Text>
        <Text style={styles.content}> MY (마이) </Text>
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
          <View style={[styles.content, styles.eventsWrapper]}>
            <Text>
              MY (마이)
            </Text>
          </View>
          <View style={[styles.content, styles.eventsWrapper]}>
            <Text>
              MY (마이)
            </Text>
          </View>
          {/* <Image source={require('https://w.namu.la/s/60acbaab9c28ce4ab0b4e789fa270e4b83f5338d44128ed5409d609a98d795a1b3041bb12d2e9b0f4fe3b9d6f127b4fa14fc388304ea3f7ad3ad48e864f07c522da3b67d1519b72a89646f0fe49683e184505c012f0b0499770117dc863827caf99f6098566be22b7c44fac748831ca0')} /> */}
        </ScrollView>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.subtitle}> On Social Media </Text>
        <ScrollView horizontal={true}>
          {/* <Image source={require('https://w.namu.la/s/60acbaab9c28ce4ab0b4e789fa270e4b83f5338d44128ed5409d609a98d795a1b3041bb12d2e9b0f4fe3b9d6f127b4fa14fc388304ea3f7ad3ad48e864f07c522da3b67d1519b72a89646f0fe49683e184505c012f0b0499770117dc863827caf99f6098566be22b7c44fac748831ca0')} /> */}

        </ScrollView>
      </View>

    </View>
  )
}


// STYLES
const styles = StyleSheet.create({
  container: {
    margin: 20,
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
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