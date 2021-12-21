import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleLogo } from 'phosphor-react-native';
// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth2() {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '398637032546-3rp3jmc6u4cu0vlr335k9ml451qujm5v.apps.googleusercontent.com',
    iosClientId: '398637032546-7t1in86b8gj9unaiojkfj3s903g6o156.apps.googleusercontent.com',
    androidClientId: '398637032546-v65s48oe3eifkf2gheeorvq32vqn0r1b.apps.googleusercontent.com',
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);


  // // Somewhere in your code
  // signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     this.setState({ userInfo });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  return (
    <>
      <View style={styles.googleBtn}>
        <GoogleLogo weight='bold' size={18} style={styles.googleLogo} />
        <Button
          // disabled={!request}
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