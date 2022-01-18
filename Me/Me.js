import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Dimensions, Image, Share, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

export default function Me({ navigation }) {

  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])

  return (
    <>
      {/* <View style={styles.userInfoContainer}>
      </View> */}


      <View style={styles.activityContainer}>
        {/* <Text style={styles.text}>My Fandoms</Text>
        <Text style={styles.text}>My Posts</Text>
      <Text style={styles.text}>My Comments</Text> */}
        <View style={{ flexDirection: 'row' }}>
          {/* <HandsClapping /> */}
          {/* <Text>5 Claps received</Text> */}
        </View>
        <Button title='Sign in / sign out' onPress={() => navigation.navigate('Notifications')} />
        <Text style={styles.text} onPress={() => navigation.push('Chat')}>Feedback (suggest any idea)</Text>
        <ShareComponent />

      </View>
    </>
  )
}

// HEADER BUTTONS 
const Header = ({ navigation }) => {
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
            style={styles.headerRightButtons}
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

// SHARE BUTTON
const ShareComponent = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Share dailyKPOP ❤️🌏',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <Text
        style={styles.text}
        onPress={onShare}
      >
        Share DailyKpop
      </Text>
    </View>
  );
};

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerRightButtons: {
    width: 30,
    height: 30,
    marginRight: WIDTH * 0.05,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 13,
  },
  activityContainer: {
    flex: 2,
    alignItems: 'baseline',
    padding: WIDTH * 0.05,
    marginTop: HEIGHT * 0.01,
    marginBottom: 80,
    backgroundColor: '#fff',
  },
  textContainer: {

  },
  text: {
    fontSize: 18,
    marginVertical: 20,
  }
})
