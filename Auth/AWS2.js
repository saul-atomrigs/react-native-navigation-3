import React, { useEffect, useState } from 'react';
import { Button, Linking, Platform, Text, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          getUser().then((userData) => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then((userData) => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <>
      <View style={styles.googleBtn}>
        {user ? (
          <Button title="Sign Out" onPress={() => Auth.signOut()} />
        ) : (
          <Button title="Sign in" onPress={() => Auth.federatedSignIn()} />
        )}
      </View>
      <Text>{user ? JSON.stringify(user.attributes) : ''}</Text>
      {/* <Button title="Sign Out" onPress={() => Auth.signOut()} /> */}
    </>
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
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#eee',
  },
  googleLogo: {
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
  }
});

export default App;