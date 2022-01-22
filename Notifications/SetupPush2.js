import React, { useState, useCallback, useEffect, useRef, createContext, useContext, useReducer } from 'react';
import { Text, View, TouchableOpacity, Button, Platform, Switch, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BellRinging } from 'phosphor-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function SetupPush2() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const param = useRoute().params;

  useEffect(() => {
    // INITIAL SETUP ALERT
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={styles.container}
    >
      <Toggle />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Notification from DailyKpop",
      body: '',
      data: { data: 'goes here' },
    },
    trigger: {
      seconds: 3,
      repeats: false
    },
  });
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
    // alert('Must use physical device for Push Notifications');
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

export function Toggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  function toggleSwitch() {
    setIsEnabled(previousState => !previousState);
  }

  // SAVE ISENABLED TO ASYNCSTORAGE
  useEffect(() => {
    AsyncStorage.setItem('isEnabled', JSON.stringify(isEnabled));
    console.log('isEnabled saved to AsyncStorage');
  }, [isEnabled]);


  if (isEnabled == false) {
    Notifications.cancelAllScheduledNotificationsAsync();
    // toastCancel()
    console.log('캔슬');
  } else {
    async () => {
      await schedulePushNotification();
    }
    // toastScheduled()
    console.log('스케쥴!');
    // showAsyncStorageContentInDev()
  }


  return (
    <View style={styles.switch}>

      <TouchableOpacity
        onPress={() => schedulePushNotification()}>
        {
          isEnabled == true ?

            <BellRinging
              weight='duotone'
              color='#FF231F7C'
              style={styles.bell}
            />
            :
            <BellRinging
              style={styles.bell}
            />
        }
      </TouchableOpacity>

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

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  bell: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
  },
});
