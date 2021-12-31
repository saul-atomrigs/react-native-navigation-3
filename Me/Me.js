import React, { useLayoutEffect } from 'react';
import { Dimensions, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserCirclePlus } from 'phosphor-react-native';
import UserProvider from '../Auth/UserProvider'
// import ShareComponent from '../Components/ShareComponent';

export default function Me({ navigation }) {
  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])
  return (
    <>
      <View style={styles.userInfoContainer}>
        {/* <UserCirclePlus size={50} color='#666' /> */}
        <UserProvider />
      </View>

      <View style={styles.activityContainer}>
        {/* <Text style={styles.text}>My Fandoms</Text>
        <Text style={styles.text}>My Posts</Text>
      <Text style={styles.text}>My Comments</Text> */}
        <View style={{ flexDirection: 'row' }}>
          {/* <HandsClapping /> */}
          {/* <Text>5 Claps received</Text> */}
        </View>
        <Text style={styles.text} onPress={() => navigation.push('Chat')}>Feedback (suggest any idea)</Text>
        <ShareComponent />
        {/* <LoginScreen /> */}
        {/* <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} /> */}
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
        Share dailykpop
      </Text>
    </View>
  );
};

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerRightButtons: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.04,
    marginRight: WIDTH * 0.05,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 13,
    // borderWidth: 1,
  },
  userIcon: {
    // paddingTop: 30,
  },
  activityContainer: {
    flex: 2,
    // justifyContent: 'space-evenly',
    alignItems: 'baseline',
    // marginHorizontal: WIDTH * 0.05,
    padding: WIDTH * 0.05,
    marginTop: HEIGHT * 0.01,
    marginBottom: 80,
    backgroundColor: '#fff',
  },
  textContainer: {

  },
  text: {
    // borderWidth: 1,
    fontSize: 18,
    marginVertical: 20,
  }
})

// const StyledBg = styled.ImageBackground`
//   background-image: linear-gradient(90deg, rgba(200,0,0,.5) 50%, transparent 50%),
// linear-gradient(rgba(200,0,0,.5) 50%, transparent 50%);
//   background-size:50px 50px;
//   `
