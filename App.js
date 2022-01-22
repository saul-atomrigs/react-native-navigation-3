import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import { CalendarPlus, ChatsCircle, Compass, Fingerprint } from 'phosphor-react-native';
import { withAuthenticator } from 'aws-amplify-react-native'
import Toast from 'react-native-toast-message';
// import { AuthContext, AuthProvider } from './Notifications/AuthAsync'

import Login from './Auth/Login';
import Apple from './Auth/Apple';
import Google from './Auth/Google';
import Nickname from './Auth/Nickname'
import Welcome from './Auth/Welcome';
import SignedOut from './Auth/SignedOut';
import AddSchedule from './Calendar/AddSchedule';
import Calendar from './Calendar/Calendar';
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
import Youtube from './Discover/Youtube';
import Me from './Me/Me';
import Notifications from './Notifications/Notifications';
import SetupPush from './Notifications/SetupPush';

// STACK NAVIGATOR
export default function App() {
  // const { auth } = useContext(AuthContext);

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style='dark-content' />
      <MenuProvider>
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
          {/* {auth.token ? (
            <Stack.Screen name="Notifications" component={Notifications} />
          ) : (
            <> */}
          <Stack.Screen name="HomeTabNavigation" component={HomeTabNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="Calendar" component={Calendar} options={({ route }) => ({ title: route.params.param })} />
          <Stack.Screen name="DetailedSchedule" component={DetailedSchedule} options={({ route }) => ({ title: route.params.param })} />
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
          <Stack.Screen name="Translate" component={Translate} options={{ title: '' }} />
          <Stack.Screen name="Me" component={Me} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Login" component={Login} options={{ title: '' }} />
          <Stack.Screen name="Connect" component={Connect} options={{ title: '' }} />
          <Stack.Screen name="Google" component={Google} options={{ title: '' }} />
          <Stack.Screen name="Apple" component={Apple} options={{ title: '' }} />
          <Stack.Screen name="Welcome" component={Welcome} options={{ title: '' }} />
          <Stack.Screen name="Nickname" component={Nickname} options={{ title: '' }} />
          <Stack.Screen name="SignedOut" component={SignedOut} options={{ title: '' }} />
          <Stack.Screen name="Notifications" component={Notifications} options={{ title: '' }} />
          <Stack.Screen name="SetupPush" component={SetupPush} options={{ title: '' }} />
          {/* </>
          )} */}
        </Stack.Navigator>
      </MenuProvider>
      <Toast />
    </NavigationContainer>
  );
}

// TAB = 밑에 탭 네비게이션 
function HomeTabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Community" component={Feeds} options={{ tabBarBadge: 'new', tabBarBadgeStyle: { backgroundColor: 'pink' }, }} />
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