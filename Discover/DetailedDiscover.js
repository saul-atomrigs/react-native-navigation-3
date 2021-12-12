import React, { useLayoutEffect, useEffect } from 'react'
import { TouchableHighlight, Dimensions, Button, StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import Twitter from './Twitter';
import Instagram from './Instagram';

export default function DetailedDiscover({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerTitleAlign: 'left',
      // header button right
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={styles.headerRightButtons}
              source={require('../assets/icons/logo.png')}
            />
          </TouchableOpacity>
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
  }, [navigation])
  return (
    // <SafeAreaView>
    // <TouchableOpacity style={center}>
    <View style={styles.tabBar}>
      <TouchableHighlight
        style={[styles.socialIcon, { backgroundColor: '#1D9BF0' }]}
        onPress={() => navigation.push('Twitter')}
      >
        <Text style={styles.socialText}>Twitter</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.socialIcon, { backgroundColor: '#FF0000' }]}
        onPress={() => navigation.push('Youtube')}
      >
        <Text style={styles.socialText}>Youtube</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.socialIcon, { backgroundColor: '#8a3ab9' }]}
        onPress={() => navigation.push('Instagram')}
      >
        <Text style={styles.socialText}>Instagram</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.socialIcon, { backgroundColor: '#000' }]}
        onPress={() => navigation.push('Tiktok')}
      >
        <Text style={styles.socialText}>Tiktok</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.socialIcon, { backgroundColor: '#E60023' }]}
        onPress={() => navigation.push('Pinterest')}
      >
        <Text style={styles.socialText}>Pinterest</Text>
      </TouchableHighlight>
      {/* <Twitter /> */}
      {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          Sign in with Facebook
        </Text>
      </LinearGradient> */}
    </View>
  )
}


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerRightButtons: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginRight: WIDTH * 0.05,
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  socialIcon: {
    marginTop: 15,
    fontSize: 15,
    padding: 5,
    borderRadius: 14,
    // borderWidth: 1,
  },
  socialText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  // linearGradient: {
  //   flex: 1,
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderRadius: 5
  // },
  // buttonText: {
  //   fontSize: 18,
  //   fontFamily: 'Gill Sans',
  //   textAlign: 'center',
  //   margin: 10,
  //   color: '#ffffff',
  //   backgroundColor: 'transparent',
  // },
})
