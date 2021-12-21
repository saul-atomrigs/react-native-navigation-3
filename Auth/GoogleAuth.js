import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

// import * as Google from 'expo-google-app-auth'; deprecated

export default function GoogleAuth() {
  const [userInfo, setUserInfo] = useState();

  const config = {
    iosClientId: `398637032546-7t1in86b8gj9unaiojkfj3s903g6o156.apps.googleusercontent.com`,
    // androidClientId: ``,
    // iosStandaloneAppClientId: ``,
    // androidStandaloneAppClientId: ``,
    scopes: ['profile', 'email']
  };
  const onPress = async () => {
    await Google.logInAsync(config)
      .then((result) => {
        setUserInfo(result);
      })
      .catch(error => {
        console.log('error logInAsync');
        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <Button
        title='Sign In With google'
        // buttonType='google'
        onPress={onPress}
      />
      <Text>
        {JSON.stringify(userInfo)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
})
