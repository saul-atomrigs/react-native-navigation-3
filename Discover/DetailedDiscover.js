import React, { useLayoutEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function DetailedDiscover({ navigation }) {

  const { param } = useRoute().params

  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])

  //ROUTES VARIABLES
  const twtQuery = 'https://twitter.com/search?q=' + param + `&src=typed_query`
  const ytQuery = 'https://www.youtube.com/results?search_query=' + param
  const igQuery = 'https://www.instagram.com/explore/tags/' + param
  const tikQuery = 'https://www.tiktok.com/search/?keyword=' + param
  const pinQuery = 'https://www.pinterest.com/search/pins/?q=' + param

  return (
    <>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#1D9BF0' }]}
          onPress={() => navigation.push(
            'Twitter',
            { param: { twtQuery } }
          )}
        >
          <Text style={styles.socialText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#FF0000' }]}
          onPress={() => navigation.push(
            'Youtube',
            { param: { ytQuery } }
          )}
        >
          <Text style={styles.socialText}>Youtube</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#8a3ab9' }]}
          onPress={() => navigation.push(
            'Instagram',
            { param: { igQuery } }
          )}
        >
          <Text style={styles.socialText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#000' }]}
          onPress={() => navigation.push(
            'Tiktok',
            { param: { tikQuery } }
          )}
        >
          <Text style={styles.socialText}>Tiktok</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialIcon, { backgroundColor: '#E60023' }]}
          onPress={() => navigation.push(
            'Pinterest',
            { param: { pinQuery } }
          )}
        >
          <Text style={styles.socialText}>Pinterest</Text>
        </TouchableOpacity>
      </View>

      <WebView
        source={{ uri: ytQuery }}
      />

    </>
  )
}


// HEADER BUTTONS
export const Header = ({ navigation }) => {
  navigation.setOptions({
    // LEFT
    headerTitleAlign: 'left',
    // RIGHT
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            style={headerRightButtons}
            source={require('../assets/icons/logo.png')}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
        >
          <Image
            style={styles.headerRightButtons}
            source={require('../assets/icons/dots-nine.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  });
}


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const center = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

const styles = StyleSheet.create({
  headerRightButtons: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.05,
  },
  webView: {
    height: HEIGHT * 0.3,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-evenly',
    borderWidth: 0.2,

  },
  socialIcon: {
    // marginBottom: 15,
    padding: 8,
    borderRadius: 20,
  },
  socialText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
})
