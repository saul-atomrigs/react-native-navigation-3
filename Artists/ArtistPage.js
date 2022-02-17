import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function ArtistPage() {

  const { artist } = useRoute().params

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {artist} </Text>

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
        <Text style={styles.subtitle}> {artist} on Social Media </Text>
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
    backgroundColor: '#e6e6e6',
    borderRadius: 13,
    width: 250,
  }
})