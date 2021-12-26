import React, { useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleLogo } from 'phosphor-react-native';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth2() {

  // EXPO-AUTH-SESSION: https://docs.expo.io/versions/latest/sdk/auth-session/
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '398637032546-3rp3jmc6u4cu0vlr335k9ml451qujm5v.apps.googleusercontent.com',
    iosClientId: '398637032546-7t1in86b8gj9unaiojkfj3s903g6o156.apps.googleusercontent.com',
    androidClientId: '398637032546-v65s48oe3eifkf2gheeorvq32vqn0r1b.apps.googleusercontent.com',
    webClientId: '452397277148-dh5p6n7iq8sjq6cfsg6b7b7fk8urdilc.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);

  return (
    <>
      <View style={styles.googleBtn}>
        <GoogleLogo weight='bold' size={18} style={styles.googleLogo} />
        <Button
          disabled={!request}
          title="Login with Google"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  googleBtn: {
    flexDirection: 'row',
    width: 200,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#eee',
  },
  googleLogo: {
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
});