import React, { useState, useCallback, useEffect, useRef, createContext, useContext, useReducer } from 'react';
import { Text, View, Button, Platform, Switch, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Async from './Async';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import StatePersist from './StatePersist';

// NOTIFICATION HANDLER FOREGROUND
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SetupPush() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { artist, event, date, id } = useRoute().params

  useEffect(() => {
    // INITIAL SETUP ALERT
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token));

    // FIRED WHEN NOTIFICATION RECEIVED FOREGROUND
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // FIRED WHEN USER TAPS ON NOTIFICATION
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // ASYNC-STORAGE
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      console.log(value, 'GET DATA');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }

  // TOGGLE START ----
  const [isEnabled, setIsEnabled] = useState(previousState => {
    getData().then(value => {
      if (value !== null) {
        setIsEnabled(value)
      }
    })
    return previousState;
  });


  function toggleSwitch() {
    setIsEnabled(previousState => !previousState);
  }

  // SAVE ISENABLED TO ASYNCSTORAGE (SAVE EVERY TIME TOGGLE CHANGES)
  useEffect(() => {
    AsyncStorage.setItem('isEnabled', JSON.stringify(isEnabled));
    console.log(isEnabled, 'SAVED');
  }, [isEnabled]);

  // READ ISENABLED FROM ASYNCSTORAGE (READ ONCE)
  useEffect(() => {
    AsyncStorage.getItem('isEnabled')
      .then(value => {
        if (value !== null) {
          setIsEnabled(JSON.parse(value));
          console.log(value, 'READ');
        }
      })
      .catch(err => {
        console.log('에러', err);
      });
  }, []);

  // PUSH NOTIFICATION FUNCTION
  async function schedulePushNotification2() {
    // GET THE DATE FROM PARENT SCREEN (=EVENT DATE)
    const triggerDate = new Date(date);
    console.log(triggerDate, 'triggerDate');
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Notification from DailyKpop`,
        body: `There is an upcoming event from ${artist}!`,
        data: { data: 'check now' },
      },
      // trigger: { seconds: 3, },
      trigger: triggerDate,
    });
  }

  // isEnabled => NOTIFICATION ACTIVATE/DEACTIVATE
  useEffect(() => {
    isEnabled ? schedulePushNotification2() : Notifications.cancelAllScheduledNotificationsAsync();
  }, [isEnabled]);

  // ----- TOGGLE END

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text
          style={styles.message}
        // onPress={async () => {
        //   await schedulePushNotification2();
        // }}
        > Get notification for {artist}'s {event} on {date} ? </Text>
      </View>

      {/* <Toggle /> */}
      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}

        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        style={styles.switch}
      />

      <Text> {id} </Text>

      {/* <Async /> */}

      {/* <StatePersist /> */}
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    // CHECK PERMISSION SETTINGS
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    // IF NOT ALLOWED, REQUEST PERMISSION
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    // 
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// export function Toggle() {
//   const [isEnabled, setIsEnabled] = useState(false);

//   function toggleSwitch() {
//     setIsEnabled(previousState => !previousState);
//   }

//   // SAVE ISENABLED TO ASYNCSTORAGE
//   useEffect(() => {
//     AsyncStorage.setItem('isEnabled', JSON.stringify(isEnabled));
//     console.log(isEnabled, 'isEnabled');
//   }, [isEnabled]);

//   // READ ISENABLED FROM ASYNCSTORAGE
//   useEffect(() => {
//     AsyncStorage.getItem('isEnabled')
//       .then(value => {
//         if (value !== null) {
//           setIsEnabled(JSON.parse(value));
//           console.log(value, 'value');
//         }
//       })
//       .catch(err => {
//         console.log('에러', err);
//       });
//   }, []);

//   // PUSH NOTIFICATION FUNCTION
//   async function schedulePushNotification2() {
//     // const triggerDate = new Date('2022-01-30');
//     const triggerDate = new Date();
//     console.log(triggerDate, 'triggerDate')

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: `Notification from DailyKpop`,
//         body: `There is an upcoming event from your ${artist}!`,
//         data: { data: 'check now' },
//       },
//       // trigger: triggerDate,
//       trigger: {
//         seconds: 3,
//       },
//     });
//   }

//   if (isEnabled == false) {
//     // CANCEL NOTIFICATION
//     Notifications.cancelAllScheduledNotificationsAsync();
//     console.log('CANCELED');
//   } else {
//     // SCHEDULE NOTIFICATION
//     async () => {
//       await schedulePushNotification2();
//     }
//     console.log('SCHEDULED');
//   }


//   return (
//     <>
//       <Switch

//         value={isEnabled}
//         onValueChange={toggleSwitch}

//         trackColor={{ false: "#767577", true: "#81b0ff" }}
//         thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//         ios_backgroundColor="#3e3e3e"
//         style={styles.switch}
//       />
//     </>
//   );
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    padding: 10,
  },
  message: {
    color: '#000',
    marginBottom: 10,
  },
  switch: {

  }
});
