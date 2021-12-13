import React, { useLayoutEffect } from 'react'
import { Dimensions, Button, StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import ShareComponent from '../Components/ShareComponent';
import { UserCirclePlus, HandsClapping } from 'phosphor-react-native';

export default function Me({ navigation }) {
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
    <>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity style={styles.userIcon}>
          <UserCirclePlus size={50} color='#666' />
        </TouchableOpacity>
        <Text>username</Text>
      </View>
      <View style={styles.activityContainer}>
        <Text>My Fandom List</Text>
        <Text>My posts</Text>
        <Text>My Comments</Text>
        <Text>Stats</Text>
        <View style={{ flexDirection: 'row' }}>
          <HandsClapping />
          <Text>5 Claps received</Text>
        </View>
        <Text onPress={() => navigation.push('Connect')}>Feedback (suggest any idea)</Text>
        <ShareComponent />
        {/* <LoginScreen /> */}
        {/* <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} /> */}
      </View>
    </>
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
  userInfoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // borderWidth: 1,
    backgroundColor: '#fff',
  },
  userIcon: {
    paddingTop: 50,
  },
  activityContainer: {
    flex: 3,
    // justifyContent: 'space-evenly',
    alignItems: 'baseline',
    // borderWidth: 1,
    // marginHorizontal: WIDTH * 0.05,
    padding: WIDTH * 0.05,
    marginTop: HEIGHT * 0.01,
    marginBottom: 80,
    backgroundColor: '#fff',
  },
})