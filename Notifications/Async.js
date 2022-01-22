import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';


export default function App() {
  const [value, setValue] = useState('value');
  const { getItem, setItem } = useAsyncStorage('@storage_key');
  const [isEnabled, setIsEnabled] = useState(false);

  // SAVE TO STORAGE
  const writeItemToStorage = async newValue => {
    await setItem(newValue);
    setValue(newValue);
    setIsEnabled(previousState => !previousState);
  };
  const generateDate = () =>
    writeItemToStorage(
      // Math.random().toString(36)
      new Date().toISOString().substring(0, 10)
    )

  // READ FROM STORAGE
  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);

  };
  useEffect(() => {
    readItemFromStorage();
  }, []);

  // TOGGLE START ----

  function toggleSwitch() {
    setIsEnabled(previousState => !previousState);
  }

  // // SAVE ISENABLED TO ASYNCSTORAGE (SAVE EVERY TIME TOGGLE CHANGES)
  // useEffect(() => {
  //   AsyncStorage.setItem('isEnabled', JSON.stringify(isEnabled));
  //   console.log(isEnabled, 'SAVED');
  // }, [isEnabled]);

  // // READ ISENABLED FROM ASYNCSTORAGE (READ ONCE)
  // useEffect(() => {
  //   AsyncStorage.getItem('isEnabled')
  //     .then(value => {
  //       if (value !== null) {
  //         setIsEnabled(JSON.parse(value));
  //         console.log(value, 'READ');
  //       }
  //     })
  //     .catch(err => {
  //       console.log('에러', err);
  //     });
  // }, []);

  // PUSH NOTIFICATION FUNCTION
  async function schedulePushNotification2() {
    // GET THE DATE FROM PARENT SCREEN (=EVENT DATE)
    // const triggerDate = new Date(date);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Notification from DailyKpop`,
        // body: `There is an upcoming event from ${artist}!`,
        data: { data: 'check now' },
      },
      trigger: { seconds: 3, },
      // trigger: triggerDate,
    });
  }
  // NOTIFICATION ACTIVATE / DEACTIVATE
  useEffect(() => {
    isEnabled ? schedulePushNotification2() : Notifications.cancelAllScheduledNotificationsAsync();
  }, [isEnabled]);

  // ----- TOGGLE END

  return (
    <View style={{ margin: 40 }}>
      <Text>Current value: {value}</Text>
      <TouchableOpacity
        onPress={generateDate}
      >
        <Text>Update value</Text>
      </TouchableOpacity>

      <Switch
        value={isEnabled}
        // onValueChange={toggleSwitch}
        onValueChange={writeItemToStorage}

        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
      // style={styles.switch}
      >
      </Switch>
    </View>
  );
}