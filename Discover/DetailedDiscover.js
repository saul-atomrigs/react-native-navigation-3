import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { Dimensions, Button, StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

// import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import Twitter from './Twitter';
import Instagram from './Instagram';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailedDiscover({ navigation }) {

  const { param } = useRoute().params

  // HEADER BUTTONS 
  useLayoutEffect(() => {
    navigation.setOptions({
      // LEFT 
      headerTitleAlign: 'left',
    });
  }, [navigation])

  //ROUTES VARIABLES
  // const twtQuery = param
  // const ytQuery = param
  // const igQuery = param
  // const tikQuery = param
  // const pinQuery = param

  const twtQuery = 'https://twitter.com/search?q=%23' + param + '&src=typed_query&f=live'
  const ytQuery = 'https://www.youtube.com/results?search_query=' + param
  const igQuery = 'https://www.instagram.com/explore/tags/' + param
  const tikQuery = 'https://www.tiktok.com/search/?keyword=' + param
  const pinQuery = 'https://www.pinterest.com/search/pins/?q=' + param
  const queries = [twtQuery, ytQuery, igQuery, tikQuery, pinQuery]

  const [query, setQuery] = useState(param)

  console.log(param)



  function someEvent() {
    setQuery(queries[0])
  }

  return (
    <>
      <Text>hello</Text>
      <Text> {param} </Text>
      <WebView
        style={styles.webView}
        source={
          { uri: queries[1] }
          // { uri: `https://twitter.com/search?q=${twtQuery}&src=typed_query` },
          // { uri: `https://www.instagram.com/${igQuery}/?hl=en` },
          // { uri: `https://youtube.com/results?search_query=${ytQuery}` },
          // { uri: `https://www.pinterest.co.kr/search/pins/?q=${pinQuery}&rs=typed&term_meta[]=${pinQuery}%7Ctyped` },
          // { uri: `https://www.tiktok.com/${tikQuery}` }
        }
      />
      {/* <SafeAreaView> */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#1D9BF0' }]}
          onPress={() => navigation.push('Twitter')}
        >
          <Text style={styles.socialText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#FF0000' }]}
          // onPress={() => navigation.push('Youtube')}
          onPress={() => someEvent()}
        >
          <Text style={styles.socialText}>Youtube</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#8a3ab9' }]}
          onPress={() => navigation.push('Instagram')}
        >
          <Text style={styles.socialText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#000' }]}
          onPress={() => navigation.push('Tiktok')}
        >
          <Text style={styles.socialText}>Tiktok</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#E60023' }]}
          onPress={() => navigation.push('Pinterest')}
        >
          <Text style={styles.socialText}>Pinterest</Text>
        </TouchableOpacity>
      </View>
      {/* <Twitter /> */}
      {/* </SafeAreaView> */}
    </>

  )
}

export function mapQueries(query) {
  queries.map(query => {
    return (
      <WebView
        key={query}
        source={{ uri: query }}
        style={{ marginTop: 0, marginBottom: 0, height: Dimensions.get('window').height - 100 }}
      />
    )
  })
}


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerRightButtons: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.05,
  },
  webView: {
    // borderWidth: 1,
    height: HEIGHT * 0.3,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-evenly',
    // backgroundColor: '#fff',
    // marginBottom: 20,
    borderWidth: 0.2,

  },
  socialIcon: {
    marginBottom: 15,
    padding: 8,
    borderRadius: 20,
  },
  socialText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
})
