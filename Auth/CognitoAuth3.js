import React from 'react';
import { Button, Text, View } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { withOAuth } from "aws-amplify-react-native";
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

function App(props) {
  const {
    oAuthUser,
    oAuthError,
    hostedUISignIn,
    facebookSignIn,
    googleSignIn,
    amazonSignIn,
    customProviderSignIn,
    signOut,
  } = props;

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
          <Button title="Facebook" onPress={facebookSignIn} />
          <Button title="Google" onPress={googleSignIn} />
          <Button title="Amazon" onPress={amazonSignIn} />

          {/* e.g. for OIDC providers */}
          <Button title="Yahoo" onPress={() => customProviderSignIn('Yahoo')} />
        </>
      )}
    </View>
  );
}

export default withOAuth(App);