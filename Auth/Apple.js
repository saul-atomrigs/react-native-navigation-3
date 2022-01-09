import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication';
// NO support lower iOS versions, Android, or web.

export default function AppleAuth() {
  const navigation = useNavigation();

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={20}
      style={{ width: 300, height: 60, }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          // SIGNED IN 
          console.log('🚀 SIGNED IN APPLE', credential)
          navigation.navigate('Nickname', { param: 'testname' });

        } catch (e) {
          if (e.code === 'ERR_CANCELED') {
            // handle that the user canceled the sign-in flow
            navigation.navigate('Nickname', { param: 'failed(canceled)' });
          } else {
            // handle other errors
            navigation.navigate('Nickname', { param: 'failed' });
          }
        }
      }}
    />
  );
}