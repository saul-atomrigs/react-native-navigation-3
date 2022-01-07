import * as React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useAuthRequest } from 'expo-auth-session'
import { Button, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

WebBrowser.maybeCompleteAuthSession()

export default function AWS() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = React.useState(null)
  // Endpoint
  const discoveryDocument = {
    authorizationEndpoint:
      'https://dailykpop63b1ff97-63b1ff97-dev.auth.us-east-2.amazoncognito.com/login'
    // Your domain can be found at User Pool -> Domain Name (under App integration)
  }
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '6ka9girmgpanhl8pcffmtoe7fl',
      // clientID can be found at App Client Settings (Under App integration) 
      scopes: ['email', 'openid', 'aws.cognito.signin.user.admin'],
      responseType: 'code',
      redirectUri:
        'https://dailykpop63b1ff97-63b1ff97-dev.auth.us-east-2.amazoncognito.com/oauth2/idpresponse/'
      // Redirect URI is the Callback URL(s) in App Client Settings (Under App integration)
    },
    discoveryDocument
  )
  React.useEffect(() => {
    if (response) {
      if (response.error) {
        Alert.alert(
          'Authentication error',
          response.params.error_description || 'something went wrong'
        )
        return
      }
      if (response.type === 'success') {
        setLoggedIn(true)
        navigation.navigate('HomeTabNavigation')
        console.log('Successfully logged in')
      }
    }
  }, [response])
  console.log(response)
  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
