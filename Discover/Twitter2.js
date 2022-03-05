import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


export default function Twitter() {
  const navigation = useNavigation();
  // const { param } = useRoute().params

  useLayoutEffect(() => {
    navigation.setOptions({
      // LEFT 
      headerTitleAlign: 'left',
    });
  }, [navigation])
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <WebView
        // source={{ uri: param.twtQuery }}
        source={{ url: 'https://twitter.com/aespa_official/status/1472854342789382150' }}
      />
    </SafeAreaView>
  );
}

// Swiper slide images dimensions
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerRightButtons = {
  width: 30,
  height: 30,
  marginRight: WIDTH * 0.05,
}

const styles = StyleSheet.create({})