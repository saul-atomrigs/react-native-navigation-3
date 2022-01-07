import React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { withOAuth, AmplifyTheme } from "aws-amplify-react-native";
import * as WebBrowser from 'expo-web-browser';
import awsconfig from '../src/aws-exports';
import { GoogleLogo } from 'phosphor-react-native';
import Apple from './Apple';
import Google from './Google';

// async function urlOpener(url, redirectUrl) {
//   const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
//     url,
//     redirectUrl
//   );

//   if (type === 'success' && Platform.OS === 'ios') {
//     WebBrowser.dismissBrowser();
//     return Linking.openURL(newUrl);
//   }
// }
WebBrowser.maybeCompleteAuthSession();

Amplify.configure(awsconfig);

// Amplify.configure({
//   ...awsconfig,
//   oauth: {
//     ...awsconfig.oauth,
//     urlOpener,
//   },
// });

function App(props) {
  const {
    oAuthUser,
    oAuthError,
    hostedUISignIn,
    facebookSignIn,
    googleSignIn,
    appleSignIn,
    customProviderSignIn,
    signOut,
  } = props;

  // const user = await Auth.currentAuthenticatedUser().catch(err => console.log(err))

  return (
    <View>
      {/* <Text>User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : 'None'}</Text> */}
      {oAuthUser ? (
        <Button title="Sign Out" onPress={signOut} />
      ) : (
        <>
          {/* Go to the Cognito Hosted UI */}
          {/* <Button title="Cognito" onPress={hostedUISignIn} /> */}

          {/* Go directly to a configured identity provider */}
          {/* APPLE SIGNIN */}
          <Apple />

          {/* GOOGLE SIGNIN */}
          <TouchableOpacity
            onPress={googleSignIn}
            style={styles.googleBtn}>
            <GoogleLogo weight='bold' color='red' size={20} style={styles.googleLogo} />
            <Text style={styles.btnText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* e.g. for OIDC providers */}
          {/* <Button title="Yahoo" onPress={() => customProviderSignIn('Yahoo')} /> */}
        </>
      )}
    </View>
  );
}


// STYLES
const styles = StyleSheet.create({
  googleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 60,
    borderRadius: 28,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  googleLogo: {
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  btnText: {
    fontSize: 21,
    fontWeight: '500',
  }
});

export default withOAuth(App);

