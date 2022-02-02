// import { Linking } from 'expo';
// import * as WebBrowser from 'expo-web-browser';

// const urlOpenerExpo = async (url, redirectUrl) => {
//   const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

//   if (type === 'success') {
//     await WebBrowser.dismissBrowser();

//     if (Platform.OS === 'ios') {
//       return Linking.openURL(newUrl);
//     }
//   }

// };


// const oauth = {
//   // Domain name //********.auth.us-east-1.amazoncognito.com
//   domain: '<Cognito Pool OAuth DOMAIN name>',

//   // Authorized scopes
//   scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],

//   // Callback URL
//   redirectSignIn: 'dailykpop://', // http://www.example.com/signin/ or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

//   // Sign out URL
//   redirectSignOut: 'dailykpop://', // 'http://www.example.com/signout/' or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

//   // 'code' for Authorization code grant, 
//   // 'token' for Implicit grant
//   // Note that REFRESH token will only be generated when the responseType is code
//   responseType: 'code',

//   // optional, for Cognito hosted ui specified options
//   options: {
//     // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
//     AdvancedSecurityDataCollectionFlag: true
//   },

//   urlOpener: urlOpenerExpo
// }
// awsconfig.oauth = oauth;


// const expoScheme = "dailykpop://"
// let redirectUrl = Linking.makeUrl();
// console.log(redirectUrl)
// // simulator on localhost and devices on LAN
// if (redirectUrl.startsWith('exp://1')) {
//   redirectUrl = redirectUrl + '/--/';
// } else
//   if (redirectUrl === expoScheme) {
//     // no change required
//   } else {
//     // for expo client
//     redirectUrl = redirectUrl + '/'
//   }

// awsconfig.oauth.redirectSignIn = redirectUrl;
// awsconfig.oauth.redirectSignOut = redirectUrl;

// Amplify.configure(awsconfig);