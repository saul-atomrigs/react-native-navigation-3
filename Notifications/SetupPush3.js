import React, { useState, useCallback, useEffect, useRef, createContext, useContext, useReducer } from 'react';
import { Text, View, TouchableOpacity, Button, Platform, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BellRinging } from 'phosphor-react-native';
import Toast from 'react-native-toast-message';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


// NOTIFICATION HANDLER FOREGROUND
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SetupPush3({ date, artist, event, id }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

  // // ASYNC-STORAGE //
  const STORAGE_KEY = id
  // // READ DATA FROM ASYNC STORAGE
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      // const value = await AsyncStorage.getItem('@storage_Key')
      console.log(value, 'GET DATA');
      console.log(STORAGE_KEY, 'STORAGE KEY');
      if (value !== null) {
        // value previously stored
        setIsEnabled(value);
        // setIsEnabled(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  }
  // // UPDATE DATA IN ASYNC STORAGE
  const setData = async (value) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value)
      // await AsyncStorage.setItem('@storage_Key', value)
      console.log(value, 'SET DATA');
    } catch (e) {
      // saving error
    }
  }
  useEffect(() => {
    setData()
  }, [])


  // TOGGLE START //
  const [isEnabled, setIsEnabled] = useState(
    previousState => {
      getData()
        .then(value => {
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(isEnabled));
    console.log(isEnabled, 'SAVED');
  }, [isEnabled]);

  // READ ISENABLED FROM ASYNCSTORAGE (READ ONCE)
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
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
  async function schedulePushNotification() {
    // GET THE DATE FROM PARENT SCREEN (=EVENT DATE)
    const triggerDate = new Date(date);
    console.log(triggerDate, 'triggerDate');

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${artist}`,
        body: `There is an upcoming event for ${artist}, check now on DailyKpop!`,
        data: { data: 'check now' },
      },
      trigger: triggerDate,
      // trigger: { seconds: 3, },
    });
  }

  // TOGGLE => NOTIFICATION ACTIVATE/DEACTIVATE
  useEffect(() => {
    // TOGGLE IS ENABLED?
    isEnabled ?
      // ACTIVATE NOTIFICATION
      schedulePushNotification()
      // OTHERWISE, CANCEL NOTIFICATION
      : Notifications.cancelAllScheduledNotificationsAsync();
  }, [isEnabled]);

  // TOGGLE END //

  return (
    <View style={styles.switch}>

      {
        isEnabled == true ?
          <BellRinging
            weight='duotone'
            color='#FF231F7C'
            style={styles.bell}
          />
          : <BellRinging
            style={styles.bell}
          />
      }

      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}

        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        style={styles.switch}
      />
    </View>
  );
}


// INITIAL PERMISSION SETUP
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
    flexDirection: 'row',
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  bell: {
    alignSelf: 'center',
    marginHorizontal: 10,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
  },
});
