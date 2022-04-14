import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { artistList2 } from '../Artists/Artists'

export default function Twitter() {
  const navigation = useNavigation();
  const { twitterIDurl } = useRoute().params

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
        source={{ url: `https://twitter.com/${twitterIDurl}` }}
      />
    </SafeAreaView>
  );
}