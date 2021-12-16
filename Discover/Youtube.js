import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview';

export default function Twitter() {
  const navigation = useNavigation();
  const { param } = useRoute().params

  useLayoutEffect(() => {
    navigation.setOptions({
      // header button left
      headerTitleAlign: 'left',
    });
  }, [navigation])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: param.ytQuery }}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({})
