import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication';
// NO support lower iOS versions, Android, or web.

export default function AppleAuth() {
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
          console.log('🚀 SIGNED IN');
          console.log(AppleAuthenticationFullName);
          console.log(AppleAuthentication.AppleAuthenticationScope.FULL_NAME);
        } catch (e) {
          if (e.code === 'ERR_CANCELED') {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    />
  );
}