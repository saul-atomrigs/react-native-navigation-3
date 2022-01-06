import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { withOAuth, AmplifyTheme } from "aws-amplify-react-native";
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

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
      <Text>User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : 'None'}</Text>
      {oAuthUser ? (
        <Button title="Sign Out" onPress={signOut} />
      ) : (
        <>
          {/* Go to the Cognito Hosted UI */}
          <Button title="Cognito" onPress={hostedUISignIn} />

          {/* Go directly to a configured identity provider */}
          <View style={styles.googleBtn}>
            <Button title="Continue with Apple" onPress={appleSignIn} />
          </View>
          <View style={styles.googleBtn}>
            <Button title="Continue with Google " onPress={googleSignIn} />
          </View>

          {/* e.g. for OIDC providers */}
          <Button title="Yahoo" onPress={() => customProviderSignIn('Yahoo')} />
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  googleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#eee',
  },
});

export default withOAuth(App);

