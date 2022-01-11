import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CalendarPlus, ChatsCircle, Compass, Fingerprint } from 'phosphor-react-native';
import { withAuthenticator } from 'aws-amplify-react-native'
import Login from './Auth/Login';
import Apple from './Auth/Apple';
// import signInWithApple from './Auth/Apple.ts';
import Google from './Auth/Google';
import AWS from './Auth/AWS';
import AWS2 from './Auth/AWS2';
import AWS3 from './Auth/AWS3';
import Nickname from './Auth/Nickname'
import Welcome from './Auth/Welcome';
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


// STACK NAVIGATOR
export default function App() {
  return (
    // <AppContainer>
    <NavigationContainer theme={MyTheme}>
      <StatusBar style='dark-content' />
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
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
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Login" component={Login} options={{ title: '' }} />
        <Stack.Screen name="Connect" component={Connect} options={{ title: '' }} />
        <Stack.Screen name="Google" component={Google} options={{ title: '' }} />
        <Stack.Screen name="Apple" component={Apple} options={{ title: '' }} />
        <Stack.Screen name="AWS3" component={AWS3} options={{ title: '' }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ title: '' }} />
        <Stack.Screen name="Nickname" component={Nickname} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
    // </AppContainer>
  );
}
// export default withAuthenticator(App)
// TAB = 밑에 탭 네비게이션 
function HomeTabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Community" component={Feeds} options={{ tabBarBadge: 'new', tabBarBadgeStyle: { backgroundColor: 'pink' }, }} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Me" component={Me} />
      {/* <Tab.Screen name="Korean" component={Korean} options={{ tabBarBadge: 2, tabBarBadgeStyle: { backgroundColor: 'pink' } }} /> */}
    </Tab.Navigator>
  );
}
// NOTIFICATION COMPOENT  
function Notifications({ navigation }) {
  return (
    <View style={center}>
      <Apple />
      {/* <signInWithApple /> */}
      <Google />
    </View>
  )
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
  tabBarStyle: { position: 'absolute' }
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
const center = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
}