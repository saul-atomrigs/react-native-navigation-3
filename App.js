import React, { useState } from 'react';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import Onboarding from './Components/Onboarding';
import { CalendarPlus, ChatsCircle, Compass, Fingerprint } from 'phosphor-react-native';

import Login from './Auth/Login';
import Apple from './Auth/Apple';
// import Google from './Auth/Google';
import Nickname from './Auth/Nickname'
import Welcome from './Auth/Welcome';
import SignedOut from './Auth/SignedOut';
import AddSchedule from './Calendar/AddSchedule';
import Calendar from './Calendar/Calendar';
import Calendar2 from './Notifications/Calendar2';
import DetailedSchedule from './Calendar/DetailedSchedule';
import AddPost from './Community/AddPost';
import DetailedFeed from './Community/DetailedFeed';
import Feeds from './Community/Feed';
import Chat from './Components/chat/Chat';
import Connect from './Components/chat/Connect';
import DetailedDiscover from './Discover/DetailedDiscover';
import Discover from './Discover/Discover';
import Instagram from './Discover/Instagram';
import Pinterest from './Discover/Pinterest';
import Tiktok from './Discover/Tiktok';
import Translate from './Discover/Translate';
import Twitter from './Discover/Twitter';
import Twitter2 from './Discover/Twitter2';
import Youtube from './Discover/Youtube';
import Me from './Me/Me';
import Notifications from './Notifications/Notifications';
import SetupPush3 from './Notifications/SetupPush3';
import ArtistPage from './Artists/ArtistPage';

import * as SecureStore from 'expo-secure-store';
import { auth } from './firebase1';
import firebase from 'firebase';

// STACK NAVIGATOR
export default function App() {

  const [firstLaunched, setFirstLaunched] = useState('false');
  const [loading, setLoading] = useState(false);

  async function getFirstLaunched() {
    setLoading(true);
    const firstLaunched = await SecureStore.getItemAsync('firstLaunchKey').then(response => {
      if (response) {
        setFirstLaunched(response)
      }
    })
    setLoading(false);
  }
  async function writeData() {
    setLoading(true)
    setFirstLaunched('true')
    await SecureStore.setItemAsync('firstLaunchKey', 'true');
    setLoading(false)
  }


  return (
    // firstLaunched == 'true' && loading ?
    true ?

      <NavigationContainer theme={MyTheme}>
        <StatusBar style='dark-content' />
        <MenuProvider>
          <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
            <>
              <Stack.Screen name="HomeTabNavigation" component={HomeTabNavigation} options={{ headerShown: false }} />
              <Stack.Screen name="Calendar" component={Calendar} options={({ route }) => ({ title: route.params.param })} />
              <Stack.Screen name="Calendar2" component={Calendar2} options={({ route }) => ({ title: route.params.param })} />
              <Stack.Screen name="DetailedSchedule" component={DetailedSchedule} options={({ route }) => ({ title: route.params.artist })} />
              <Stack.Screen name="AddSchedule" component={AddSchedule} options={{ title: '' }} />
              <Stack.Screen name="Community" component={Feeds} options={{ title: 'Community' }} />
              <Stack.Screen name="DetailedFeed" component={DetailedFeed} options={{ title: '' }} />
              <Stack.Screen name="AddPost" component={AddPost} options={{ title: '' }} />
              <Stack.Screen name="Discover" component={Discover} options={{ title: '' }} />
              <Stack.Screen name="DetailedDiscover" component={DetailedDiscover} options={{ title: '' }} />
              <Stack.Screen name="Youtube" component={Youtube} options={{ title: '' }} />
              <Stack.Screen name="Tiktok" component={Tiktok} options={{ title: '' }} />
              <Stack.Screen name="Instagram" component={Instagram} options={{ title: '' }} />
              <Stack.Screen name="Pinterest" component={Pinterest} options={{ title: '' }} />
              <Stack.Screen name="Twitter" component={Twitter} options={{ title: '' }} />
              <Stack.Screen name="Twitter2" component={Twitter2} options={{ title: '' }} />
              <Stack.Screen name="Translate" component={Translate} options={{ title: '' }} />
              <Stack.Screen name="Me" component={Me} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="Login" component={Login} options={{ title: '' }} />
              <Stack.Screen name="Connect" component={Connect} options={{ title: '' }} />
              <Stack.Screen name="Apple" component={Apple} options={{ title: '' }} />
              <Stack.Screen name="Welcome" component={Welcome} options={{ title: '' }} />
              <Stack.Screen name="Nickname" component={Nickname} options={{ title: '' }} />
              <Stack.Screen name="SignedOut" component={SignedOut} options={{ title: '' }} />
              <Stack.Screen name="Notifications" component={Notifications} options={{ title: '' }} />
              <Stack.Screen name="SetupPush3" component={SetupPush3} options={{ title: '' }} />
              <Stack.Screen name="ArtistPage" component={ArtistPage} options={{ title: '' }} />
            </>

          </Stack.Navigator>
        </MenuProvider>
      </NavigationContainer>

      :

      <>
        <Onboarding />
      </>
  );
}

// TAB = 밑에 탭 네비게이션 
function HomeTabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Community" component={Feeds} />
      <Tab.Screen name="Calendar" component={Calendar} options={{ tabBarBadge: 'new', tabBarBadgeStyle: { backgroundColor: 'pink' }, }} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Me" component={Me} />
      {/* <Tab.Screen name="Korean" component={Korean} options={{ tabBarBadge: 2, tabBarBadgeStyle: { backgroundColor: 'pink' } }} /> */}
    </Tab.Navigator>
  );
}

// REACT NAVIGATION 
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// TAB BAR ICONS 
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconSource
    if (route.name === 'Community') {
      iconSource = focused ? <ChatsCircle weight='fill' size={30} /> : <ChatsCircle weight='duotone' size={25} />
    } else if (route.name === 'Calendar') {
      iconSource = focused ? <CalendarPlus weight='fill' size={30} /> : <CalendarPlus weight='duotone' size={25} />
    } else if (route.name === 'Me') {
      iconSource = focused ? <Fingerprint weight='fill' size={30} /> : <Fingerprint weight='duotone' size={25} />
    } else if (route.name === 'Discover') {
      iconSource = focused ? <Compass weight='fill' size={30} /> : <Compass size={25} />
    }
    return (
      <>
        {iconSource}
      </>
    )
  },
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'gray',
  tabBarActiveBackgroundColor: '#eaf1f8',
  tabBarItemStyle: {
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5
  },
  tabBarStyle: { position: 'absolute' },
  tabBarLabelPosition: 'below-icon'
})


// STYLES 
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    background: '#fff'
  },
};