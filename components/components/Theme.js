// import { StatusBar } from 'expo-status-bar';
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Switch } from 'react-native';
// // import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';

// export default function Theme() {

//   const [isEnabled, setIsEnabled] = useState(false);

//   const getTheme = async () => {
//     try {
//       const theme = await AsyncStorage.getItem('theme');
//       return theme;
//     } catch (error) {
//       console.log('error', error);
//     };
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: `${isEnabled ? '#000' : '#fff'}`,
//     },
//   });

//   const setTheme = async (theme) => {
//     try {
//       await AsyncStorage.setItem('theme', theme);
//     } catch (error) {
//       console.log('error', error);
//     };
//   };

//   useEffect(() => {
//     getTheme()
//       .then(res => {
//         setIsEnabled(res === 'light');
//       })
//       .catch(err => {
//         console.log('error', err);
//       });
//   }, []);

//   const onChangeHandler = (value) => {
//     if (value) {
//       setIsEnabled(true);
//       setTheme('light');
//     } else {
//       setIsEnabled(false);
//       setTheme('dark');
//     };
//   };

//   return (
//     <View style={styles.container}>
//       <Switch
//         onValueChange={onChangeHandler}
//         value={isEnabled}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// };