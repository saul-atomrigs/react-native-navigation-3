import React, { useState, useEffect } from 'react';
import { Linking, Platform, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        // Only restore state if there's no deep link and we're not on web
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {

          // READ FROM ASYNCSTORAGE
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsEnabled(true);
      }
    };

    if (!isEnabled) {
      restoreState();
    }
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <Switch
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }

        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
      >
        {/* ... */}

      </Switch>
    </>
  );
}