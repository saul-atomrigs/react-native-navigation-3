import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview';

export default function Pinterest() {
  const navigation = useNavigation();
  const { param } = useRoute().params

  // HEADER BUTTONS
  useLayoutEffect(() => {
    Header({ navigation })
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <WebView
        source={{ uri: param.pinQuery }}
      />
    </SafeAreaView>
  );
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
            style={headerRightButtons}

            source={require('../assets/icons/logo.png')}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            style={headerRightButtons}

            source={require('../assets/icons/dots-nine.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  });
}


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
  width: WIDTH * 0.08,
  height: HEIGHT * 0.03,
}

